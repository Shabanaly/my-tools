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

        // Consolidating data and cleaning technical strings
        const commonExtensions = ['mp4', 'mp3', 'm4a', 'webm'];
        const uniqueFormats: any[] = [];
        const seenLinks = new Set();

        if (data.medias) {
            for (const m of data.medias) {
                const ext = m.extension?.toLowerCase();
                const url = m.url;
                if (!commonExtensions.includes(ext) || !url) continue;

                // Avoid duplicate identical links
                if (seenLinks.has(url)) continue;
                seenLinks.add(url);

                // Clean-up resolution string
                let originalQuality = m.quality || '';
                let label = originalQuality;

                // Detect special attributes
                const isWatermark = /watermark/i.test(originalQuality) && !/no[\s-]*watermark/i.test(originalQuality);
                const isNoWatermark = /no[\s-]*watermark/i.test(originalQuality);
                const isAudioOnly = ext === 'mp3' || ext === 'm4a';

                // Extract resolution (e.g. 1080p)
                const resMatch = originalQuality.match(/(\d{3,4}p)/i);
                const resolution = resMatch ? resMatch[1] : '';

                if (isAudioOnly) {
                    label = `تحميل صوتي (MP3) ${m.quality || ''}`.trim();
                } else {
                    let qualityText = resolution || 'جودة متوفرة';
                    if (isNoWatermark) qualityText += ' (بدون علامة مائية)';
                    else if (isWatermark) qualityText += ' (مع علامة مائية)';

                    // Clean technical codec noise from label
                    label = qualityText.replace(/\s*(avc1|av01|vp9|h264|dash|hdr).*/gi, '').trim();
                }

                uniqueFormats.push({
                    resolution: label,
                    size: m.formattedSize || 'غير معروف',
                    type: ext,
                    url: url,
                    isNoWatermark: isNoWatermark
                });
            }
        }

        // Sort: MP3/Audio first, then "No Watermark" videos, then by resolution descending
        const sortedFormats = uniqueFormats.sort((a, b) => {
            const isAudioA = a.type === 'mp3' || a.type === 'm4a';
            const isAudioB = b.type === 'mp3' || b.type === 'm4a';

            if (isAudioA && !isAudioB) return -1;
            if (!isAudioA && isAudioB) return 1;
            if (isAudioA && isAudioB) return 0;

            // For videos: No watermark first
            if (a.isNoWatermark && !b.isNoWatermark) return -1;
            if (!a.isNoWatermark && b.isNoWatermark) return 1;

            // Then by resolution number (e.g. 1080 vs 720)
            const resA = parseInt(a.resolution.match(/\d+/)?.[0] || '0');
            const resB = parseInt(b.resolution.match(/\d+/)?.[0] || '0');
            return resB - resA;
        });

        const result = {
            title: data.title || 'فيديو من السوشيال ميديا',
            thumbnail: data.thumbnail || '',
            platform: data.platform || 'فيديو',
            formats: sortedFormats
        };

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Downloader Error:', error);
        return NextResponse.json({ message: 'حدث خطأ داخلي أثناء معالجة الطلب' }, { status: 500 });
    }
}
