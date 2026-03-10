import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ message: 'الرابط مطلوب' }, { status: 400 });
        }

        const rapidApiKey = process.env.RAPIDAPI_KEY;

        if (!rapidApiKey) {
            // If No API Key is set yet, we return a helpful error for the developer
            return NextResponse.json({
                message: 'لم يتم إعداد مفتاح API (RAPIDAPI_KEY) في خادم الموقع بعد. يرجى إضافته لتفعيل التحميل.'
            }, { status: 501 });
        }

        // Using a popular Video Downloader API from RapidAPI (e.g., "All Video Downloader")
        // Note: The specific host and endpoint might vary based on chosen RapidAPI service.
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        };

        const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', options);
        const data = await response.json();

        if (data.error || !data.medias) {
            return NextResponse.json({ message: data.message || 'فشل استخراج بيانات الفيديو من هذا الرابط' }, { status: 400 });
        }

        const audioMap = new Map();
        const videoMap = new Map(); // resolution -> best media object

        const qualityMap: Record<string, string> = {
            'hd_no_watermark': 'فيديو عالي الجودة (بدون علامة مائية)',
            'no_watermark': 'فيديو بجودة عادية (بدون علامة مائية)',
            'watermark': 'فيديو (مع علامة مائية)',
            'audio': 'تحميل صوتي (MP3)',
            '1080p': 'جودة فائقة (1080p)',
            '720p': 'جودة عالية (720p)',
            '480p': 'جودة متوسطة (480p)',
            '360p': 'جودة عادية (360p)',
            '240p': 'جودة منخفضة (240p)',
            '144p': 'جودة ضعيفة (144p)'
        };

        for (const m of data.medias) {
            const ext = m.extension?.toLowerCase();
            if (ext !== 'mp4' && ext !== 'mp3') continue;

            const rawQuality = m.quality || '';
            const type = m.type || (ext === 'mp3' ? 'audio' : 'video');

            // Filter out "Video Only" (Muted) DASH streams as they don't work for direct download
            const isMuted = /no[\s-]*audio|mute|video[\s-]*only/i.test(rawQuality);
            if (type === 'video' && isMuted) continue;

            if (type === 'audio') {
                if (!audioMap.has(rawQuality)) {
                    audioMap.set(rawQuality, {
                        resolution: qualityMap[rawQuality] || `تحميل صوتي (${rawQuality})`,
                        size: m.formattedSize || 'غير معروف',
                        type: 'mp3',
                        url: m.url,
                        isAudio: true
                    });
                }
                continue;
            }

            // Video logic: Determine resolution key and score reliability
            const resMatch = rawQuality.match(/(\d{3,4}p)/i);
            const resKey = resMatch ? resMatch[1] : rawQuality;

            // Reliability Scoring: Combined (+100) > No Watermark (+50)
            let score = 0;
            const isNoWatermark = /no[\s-]*watermark/i.test(rawQuality) || rawQuality.includes('hd_no');
            if (isNoWatermark) score += 50;
            if (!isMuted) score += 100;

            const currentBest = videoMap.get(resKey);
            if (!currentBest || score > currentBest.score) {
                videoMap.set(resKey, {
                    resolution: qualityMap[rawQuality] || `فيديو جودة ${resKey}${isNoWatermark ? ' (بدون علامة)' : ''}`,
                    size: m.formattedSize || 'غير معروف',
                    type: 'mp4',
                    url: m.url,
                    isNoWatermark,
                    score,
                    resValue: parseInt(resKey) || 0
                });
            }
        }

        // Final Sort: One best audio, then videos by resolution
        const sortedFormats = [];
        const bestAudio = Array.from(audioMap.values())[0];
        if (bestAudio) sortedFormats.push(bestAudio);

        const sortedVideos = Array.from(videoMap.values())
            .sort((a, b) => b.resValue - a.resValue);

        sortedFormats.push(...sortedVideos);

        const result = {
            title: data.title || 'فيديو من السوشيال ميديا',
            thumbnail: data.thumbnail || '',
            platform: data.platform || data.source || 'فيديو',
            formats: sortedFormats
        };

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Downloader Error:', error);
        return NextResponse.json({ message: 'حدث خطأ داخلي أثناء معالجة الطلب' }, { status: 500 });
    }
}
