import { Metadata } from 'next';
import HashtagPage from './HashtagPage';

export const metadata: Metadata = {
    title: 'مولد الهاشتاجات الرائجة (Hashtag Generator) | أدواتك',
    description: 'احصل على أقوى الهاشتاجات الرائجة لعام 2024 لزيادة تفاعل منشوراتك على إنستاجرام، تيك توك، وإكس. أداة توليد هاشتاجات سريعة وفعالة بضغطة زر.',
    keywords: [
        'مولد هاشتاجات', 'هاشتاجات انستقرام نشطة', 'هاشتاجات تيك توك ترند',
        'Hashtag Generator 2024', 'زيادة المشاهدات', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/hashtags',
    },
    openGraph: {
        title: 'مولد الهاشتاجات الرائجة لزيادة التفاعل | أدواتك',
        description: 'انسخ أفضل الهاشتاجات لبوستاتك لزيادة الوصول والمتابعين مجاناً.',
        url: 'https://tools.daleel-al-suez.com/tools/hashtags',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محرك توليد الهاشتاجات",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة ذكية لتوليد ونسخ الهاشتاجات الأكثر رواجاً لمنصات التواصل الاجتماعي.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "هاشتاجات انستجرام، هاشتاجات تيك توك، نسخ فوري"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HashtagPage />
        </>
    );
}
