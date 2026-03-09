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

        const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autodetect', options);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ message: data.message || 'فشل استخراج بيانات الفيديو' }, { status: response.status });
        }

        // Consolidating data to match our frontend expectations
        const result = {
            title: data.title || 'فيديو من السوشيال ميديا',
            thumbnail: data.thumbnail || '',
            platform: data.medias?.[0]?.extension || 'فيديو',
            formats: data.medias?.map((m: any) => ({
                resolution: m.quality || m.extension,
                size: m.formattedSize || 'غير معروف',
                type: m.extension,
                url: m.url
            })) || []
        };

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Downloader Error:', error);
        return NextResponse.json({ message: 'حدث خطأ داخلي أثناء معالجة الطلب' }, { status: 500 });
    }
}
