import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: 'https://tools.daleel-al-suez.com/sitemap.xml',
        host: 'https://tools.daleel-al-suez.com',
    };
}

