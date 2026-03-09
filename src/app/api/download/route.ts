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

        if (!response.ok) {
            return NextResponse.json({ message: data.message || 'فشل استخراج بيانات الفيديو' }, { status: response.status });
        }

        // Advanced aggregation: Priorities Combined (Audio+Video) and Compatibility (H.264)
        const finalFormats: any[] = [];
        const audioMap = new Map(); // label -> best audio object
        const videoMap = new Map(); // resolution -> best media object

        if (data.medias) {
            for (const m of data.medias) {
                const ext = m.extension?.toLowerCase();
                const url = m.url;
                if (!url) continue;

                const quality = m.quality || '';
                const isNoWatermark = /no[\s-]*watermark/i.test(quality);

                // Detect if it's Audio only, Video only, or Combined
                // Some APIs explicitely say "no audio" or similar
                const isMuted = /no[\s-]*audio|mute|video[\s-]*only/i.test(quality);
                const isAudioOnly = ext === 'mp3' || ext === 'm4a' || /audio[\s-]*only/i.test(quality);
                const isCombined = !isAudioOnly && !isMuted;

                // 1. Handle Audio
                if (isAudioOnly) {
                    const audioLabel = quality || 'Standard';
                    if (!audioMap.has(audioLabel)) {
                        audioMap.set(audioLabel, {
                            resolution: `تحميل صوتي (MP3) - ${audioLabel}`,
                            size: m.formattedSize || 'غير معروف',
                            type: 'mp3',
                            url: url,
                            isAudio: true
                        });
                    }
                    continue;
                }

                // 2. Handle Video (Focus on MP4 and Compatibility)
                if (ext === 'mp4' || ext === 'webm') {
                    const resMatch = quality.match(/(\d{3,4}p)/i);
                    const res = resMatch ? resMatch[1] : 'جودة تلقائية';

                    const isAVC = /avc1|h264/i.test(quality) || ext === 'mp4'; // MP4 usually container for AVC
                    const currentBest = videoMap.get(res);

                    // Scoring system for "The Best" version of a resolution:
                    // Combined (+100) > No Watermark (+50) > AVC/H264 (+25)
                    let score = 0;
                    if (isCombined) score += 100;
                    if (isNoWatermark) score += 50;
                    if (isAVC) score += 25;

                    if (!currentBest || score > currentBest.score) {
                        videoMap.set(res, {
                            resolution: `فيديو ${res}${isNoWatermark ? ' (بدون علامة مائية)' : ''}${isMuted ? ' (بدون صوت)' : ''}`,
                            size: m.formattedSize || 'غير معروف',
                            type: ext,
                            url: url,
                            isNoWatermark: isNoWatermark,
                            isMuted: isMuted,
                            resValue: parseInt(res) || 0,
                            score: score
                        });
                    }
                }
            }
        }

        // Add Audios (Max 2 to avoid clutter, usually Original + English)
        finalFormats.push(...Array.from(audioMap.values()).slice(0, 2));

        // Add videos to final list sorted by resolution
        const sortedVideos = Array.from(videoMap.values())
            .filter(v => !v.isMuted) // Only show videos with sound to regular users
            .sort((a, b) => b.resValue - a.resValue);

        finalFormats.push(...sortedVideos);

        const result = {
            title: data.title || 'فيديو من السوشيال ميديا',
            thumbnail: data.thumbnail || '',
            platform: data.platform || 'فيديو',
            formats: finalFormats
        };

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Downloader Error:', error);
        return NextResponse.json({ message: 'حدث خطأ داخلي أثناء معالجة الطلب' }, { status: 500 });
    }
}
