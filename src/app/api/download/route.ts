import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ message: 'الرابط مطلوب' }, { status: 400 });
        }

        const rapidApiKey = process.env.RAPIDAPI_KEY;

        if (!rapidApiKey) {
            return NextResponse.json({
                message: 'لم يتم إعداد مفتاح API (RAPIDAPI_KEY) في خادم الموقع بعد. يرجى إضافته لتفعيل التحميل.'
            }, { status: 501 });
        }

        const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.error || !data.medias) {
            return NextResponse.json({ message: data.message || 'فشل استخراج بيانات الفيديو من هذا الرابط' }, { status: 400 });
        }

        const qualityLabel: Record<string, string> = {
            'hd_no_watermark': 'جودة HD (بدون علامة مائية)',
            'no_watermark': 'جودة عادية (بدون علامة مائية)',
            'watermark': 'جودة عادية (مع علامة مائية)',
            'audio': 'صوت فقط',
            '1080p': '1080p — جودة فائقة',
            '720p': '720p — جودة عالية',
            '480p': '480p — جودة متوسطة',
            '360p': '360p — جودة عادية',
            '240p': '240p — جودة منخفضة',
            '144p': '144p — جودة ضعيفة',
        };

        // Map<deduplication-key, entry> — ensures one entry per resolution level
        const videoMap = new Map<string, any>();
        const audioMap = new Map<string, any>();

        for (const m of data.medias) {
            const ext = (m.extension || '').toLowerCase();
            if (ext !== 'mp4' && ext !== 'mp3') continue;

            // YouTube CDN links need server-side proxying
            const needsProxy = m.url?.includes('googlevideo.com') ?? false;

            const rawQuality = (m.quality || '').toString();
            const isAudioExt = ext === 'mp3';
            const mediaType = m.type || (isAudioExt ? 'audio' : 'video');

            // Skip video-only (muted) DASH streams
            if (mediaType === 'video' && /no[\s-]*audio|mute|video[\s-]*only/i.test(rawQuality)) continue;

            const isNoWatermark = /no[\s-]*watermark/i.test(rawQuality) || rawQuality.includes('hd_no');

            const resMatch = rawQuality.match(/(\d{3,4}p)/i);
            const resKey = resMatch ? resMatch[1].toLowerCase() : rawQuality || 'unknown';
            const resValue = parseInt(resKey) || 0;

            const label = qualityLabel[rawQuality]
                || qualityLabel[resKey]
                || (mediaType === 'audio' ? `صوت (${rawQuality || ext})` : `فيديو ${resKey || rawQuality}`);

            const entry = { label, size: m.formattedSize || null, ext: mediaType === 'audio' ? 'mp3' : 'mp4', url: m.url, needsProxy, isNoWatermark, resValue };

            if (mediaType === 'audio') {
                // For audio: keep the first one per quality key, prefer no-watermark
                const existing = audioMap.get(resKey);
                if (!existing || (!existing.isNoWatermark && isNoWatermark)) {
                    audioMap.set(resKey, entry);
                }
            } else {
                // For video: dedup by resolution, prefer no-watermark
                const existing = videoMap.get(resKey);
                if (!existing || (!existing.isNoWatermark && isNoWatermark)) {
                    videoMap.set(resKey, entry);
                }
            }
        }

        const videoFormats = Array.from(videoMap.values())
            .sort((a, b) => b.resValue - a.resValue);

        const audioFormats = Array.from(audioMap.values());

        return NextResponse.json({
            title: data.title || 'فيديو',
            thumbnail: data.thumbnail || '',
            platform: data.platform || data.source || '',
            videoFormats,
            audioFormats,
        });

    } catch (error: any) {
        console.error('Downloader Error:', error);
        return NextResponse.json({ message: 'حدث خطأ داخلي أثناء معالجة الطلب' }, { status: 500 });
    }
}
