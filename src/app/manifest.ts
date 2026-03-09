import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'أدواتك اليومية - أدوات مجانية',
        short_name: 'أدواتك',
        description: 'مجموعة أدوات مجانية وسريعة تسهّل مهامك اليومية بدون تسجيل دخول.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8f9ff',
        theme_color: '#3b5bdb',
        icons: [
            {
                src: '/icon-192.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'any',
            },
        ],
    };
}
