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

        const finalFormats: any[] = [];
        const seenResolutions = new Set();

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
            const rawQuality = m.quality || '';
            const type = m.type || (ext === 'mp3' || ext === 'm4a' ? 'audio' : 'video');

            // Deduplicate roughly by quality label and extension
            const key = `${rawQuality}-${ext}`;
            if (seenResolutions.has(key)) continue;
            seenResolutions.add(key);

            // Translate or clean label
            let label = qualityMap[rawQuality] || rawQuality;
            if (type === 'audio' && !label.includes('صوتي')) {
                label = `تحميل صوتي (${rawQuality})`;
            }

            finalFormats.push({
                resolution: label,
                size: m.formattedSize || 'غير معروف',
                type: ext,
                url: m.url,
                isAudio: type === 'audio',
                isNoWatermark: /no[\s-]*watermark/i.test(rawQuality) || rawQuality === 'hd_no_watermark'
            });
        }

        // Final sorting: Audio first, then No Watermark videos, then quality descending
        const sortedFormats = finalFormats.sort((a, b) => {
            if (a.isAudio && !b.isAudio) return -1;
            if (!a.isAudio && b.isAudio) return 1;
            if (a.isNoWatermark && !b.isNoWatermark) return -1;
            if (!a.isNoWatermark && b.isNoWatermark) return 1;

            const resA = parseInt(a.resolution.match(/\d+/)?.[0] || '0');
            const resB = parseInt(b.resolution.match(/\d+/)?.[0] || '0');
            return resB - resA;
        });

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
