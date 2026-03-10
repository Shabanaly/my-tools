import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'أدواتك اليومية - أدوات مجانية',
        short_name: 'أدواتك',
        description: 'مجموعة أدوات مجانية وسريعة تسهّل مهامك اليومية بدون تسجيل دخول.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        background_color: '#f8f9ff',
        theme_color: '#3b5bdb',
        orientation: 'portrait-primary',
        lang: 'ar',
        dir: 'rtl',
        categories: ['utilities', 'productivity'],
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-maskable-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}

