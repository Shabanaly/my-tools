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
        const commonExtensions = ['mp4', 'mp3', 'm4a'];
        const uniqueFormats: any[] = [];
        const seenResolutions = new Set();

        if (data.medias) {
            for (const m of data.medias) {
                const ext = m.extension?.toLowerCase();
                if (!commonExtensions.includes(ext)) continue;

                // Clean-up resolution string: e.g. "mp4 (1080p) avc1" -> "1080p"
                let cleanRes = m.quality || '';
                const match = cleanRes.match(/\((.*?)\)/);
                if (match) {
                    cleanRes = match[1]; // Get just the part inside brackets like 1080p
                } else {
                    cleanRes = cleanRes.replace(/\s*(avc1|av01|vp9|h264|dash).*/gi, '').trim();
                }

                if (!cleanRes || cleanRes.toLowerCase() === 'video') cleanRes = 'جودة عادية';
                if (ext === 'mp3' || ext === 'm4a') {
                    cleanRes = 'تحميل صوتي (MP3)';
                }

                // Check for duplicates (we only want one 1080p, one 720p, etc.)
                const duplicateKey = `${cleanRes}-${ext}`;
                if (seenResolutions.has(duplicateKey)) continue;

                uniqueFormats.push({
                    resolution: cleanRes,
                    size: m.formattedSize || 'غير معروف',
                    type: ext,
                    url: m.url
                });
                seenResolutions.add(duplicateKey);
            }
        }

        // Sort: Audio first, then descending video quality
        const sortedFormats = uniqueFormats.sort((a, b) => {
            const isAudioA = a.type === 'mp3' || a.type === 'm4a';
            const isAudioB = b.type === 'mp3' || b.type === 'm4a';
            if (isAudioA && !isAudioB) return -1;
            if (!isAudioA && isAudioB) return 1;

            // For videos, sort by resolution (extract number if possible)
            const resA = parseInt(a.resolution) || 0;
            const resB = parseInt(b.resolution) || 0;
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
