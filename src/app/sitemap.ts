import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tools.daleel-al-suez.com';

    return [
        // ── الصفحة الرئيسية ──────────────────────────────────────────────
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },

        // ── أدوات ذات أولوية عالية جداً ──────────────────────────────────
        {
            url: encodeURI(`${baseUrl}/tools/ocr`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.95,
        },
        {
            url: encodeURI(`${baseUrl}/tools/downloader`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.95,
        },
        {
            url: encodeURI(`${baseUrl}/tools/currency`),
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.95,
        },
        {
            url: encodeURI(`${baseUrl}/tools/gold`),
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.95,
        },

        // ── أدوات صور - معالجة وتحويل ────────────────────────────────────
        {
            url: encodeURI(`${baseUrl}/tools/image-converter`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: encodeURI(`${baseUrl}/tools/compress`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: encodeURI(`${baseUrl}/tools/remove-bg`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: encodeURI(`${baseUrl}/tools/crop`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: encodeURI(`${baseUrl}/tools/resize`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: encodeURI(`${baseUrl}/tools/watermark`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: encodeURI(`${baseUrl}/tools/meme`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // ── أدوات PDF ────────────────────────────────────────────────────
        {
            url: encodeURI(`${baseUrl}/tools/pdf-merge`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: encodeURI(`${baseUrl}/tools/pdf`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },

        // ── أدوات مالية وحاسبات ──────────────────────────────────────────
        {
            url: encodeURI(`${baseUrl}/tools/salary`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: encodeURI(`${baseUrl}/tools/zakat`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: encodeURI(`${baseUrl}/tools/installment`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: encodeURI(`${baseUrl}/tools/age`),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.85,
        },

        // ── أدوات أخرى ───────────────────────────────────────────────────
        {
            url: encodeURI(`${baseUrl}/tools/hashtags`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },

        // ── الصفحات الثابتة ──────────────────────────────────────────────
        {
            url: encodeURI(`${baseUrl}/about`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: encodeURI(`${baseUrl}/contact`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: encodeURI(`${baseUrl}/privacy`),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: encodeURI(`${baseUrl}/terms`),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
    ];

}

