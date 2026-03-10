import { Metadata } from 'next';
import CompressPage from './CompressPage';

export const metadata: Metadata = {
    title: 'ضغط الصور اونلاين بدون فقدان الجودة (Image Compressor) | أدواتك',
    description: 'صغّر مساحة صورك (JPG, PNG, WebP) بنسبة تصل إلى 80% مع الحفاظ على جودتها الأصلية. أداة ضغط مجانية وسريعة تدعم المعالجة الجماعية للصور.',
    keywords: [
        'ضغط الصور اونلاين', 'تصغير حجم الصور', 'تقليل مساحة الصورة',
        'Image Compressor online', 'ضغط صور JPG', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/compress',
    },
    openGraph: {
        title: 'أفضل أداة لضغط الصور اونلاين مجاناً | أدواتك',
        description: 'صغّر حجم صورك بسرعة فائقة وبجودة مذهلة وبأمان تام على متصفحك.',
        url: 'https://tools.daleel-al-suez.com/tools/compress',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ضاغط الصور الذكي",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة متطورة لتقليل حجم الصور مع الحفاظ على وضوحها وجودتها.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "ضغط صور JPG، ضغط صور PNG، معالجة فورية"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CompressPage />
        </>
    );
}
