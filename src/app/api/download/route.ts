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

        // Simplified aggregation: One MP3 + One per Resolution for MP4
        const finalFormats: any[] = [];
        let audioAdded = false;
        const videoMap = new Map(); // resolution -> best media object

        if (data.medias) {
            for (const m of data.medias) {
                const ext = m.extension?.toLowerCase();
                const url = m.url;
                if (!url) continue;

                // 1. Handle Audio (Highest quality MP3/M4A)
                if ((ext === 'mp3' || ext === 'm4a') && !audioAdded) {
                    finalFormats.push({
                        resolution: 'تحميل صوتي (MP3 High Quality)',
                        size: m.formattedSize || 'غير معروف',
                        type: 'mp3',
                        url: url,
                        isAudio: true
                    });
                    audioAdded = true;
                    continue;
                }

                // 2. Handle Video (MP4)
                if (ext === 'mp4') {
                    const quality = m.quality || '';
                    const resMatch = quality.match(/(\d{3,4}p)/i);
                    const res = resMatch ? resMatch[1] : '360p'; // Default 360p if not found

                    const isNoWatermark = /no[\s-]*watermark/i.test(quality);
                    const currentBest = videoMap.get(res);

                    // Prefer "No Watermark" versions
                    if (!currentBest || (isNoWatermark && !currentBest.isNoWatermark)) {
                        videoMap.set(res, {
                            resolution: `فيديو بجودة ${res}${isNoWatermark ? ' (بدون علامة مائية)' : ''}`,
                            size: m.formattedSize || 'غير معروف',
                            type: 'mp4',
                            url: url,
                            isNoWatermark: isNoWatermark,
                            resValue: parseInt(res)
                        });
                    }
                }
            }
        }

        // Add videos to final list sorted by resolution
        const sortedVideos = Array.from(videoMap.values()).sort((a, b) => b.resValue - a.resValue);
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
