import { Metadata } from 'next';
import DownloaderPage from './DownloaderPage';

export const metadata: Metadata = {
    title: 'تحميل فيديوهات تيك توك بدون علامة مائية ويوتيوب | أدواتك',
    description: 'أفضل أداة مجانية لتحميل الفيديوهات من يوتيوب، تيك توك (بدون علامة مائية)، إنستجرام وفيس بوك بأعلى جودة. تحميل سريع وآمن 100%.',
    keywords: [
        'تحميل فيديوهات تيك توك بدون علامة مائية', 'تحميل فيديو يوتيوب',
        'TikTok Downloader no watermark', 'تحميل فيديوهات انستجرام',
        'تنزيل فيديوهات فيسبوك', 'فيديو داونلودر مجاني', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/downloader',
    },
    openGraph: {
        title: 'تحميل الفيديوهات من السوشيال ميديا بدون علامة مائية | أدواتك',
        description: 'حمل فيديوهاتك المفضلة من يوتيوب، تيك توك، وغيرها بأعلى جودة وبكل سهولة.',
        url: 'https://tools.daleel-al-suez.com/tools/downloader',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محمل الفيديوهات الشامل",
        "operatingSystem": "All",
        "applicationCategory": "MultimediaApplication",
        "description": "أداة مجانية لتحميل الفيديوهات من مختلف منصات التواصل الاجتماعي بدون علامة مائية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحميل من تيك توك بدون علامة مائية, تحميل يوتيوب MP4, تحميل انستجرام فيديوهات"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <DownloaderPage />
        </>
    );
}
