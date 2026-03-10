import { Metadata } from 'next';
import OcrPage from './OcrPage';

export const metadata: Metadata = {
    title: 'استخراج النص من الصور (OCR) بالعربي بجودة عالية | أدواتك',
    description: 'أفضل أداة مجانية لاستخراج النصوص من الصور (OCR) تدعم اللغة العربية والإنجليزية بدقة فائقة. حول صورك إلى نصوص قابلة للنسخ والتعديل فوراً وبأمان تام.',
    keywords: [
        'استخراج النص من الصور', 'تحويل صورة الى نص', 'Arabic OCR online',
        'نسخ الكلام من الصور', 'قراءة النصوص من الصور', 'Image to Text Converter',
        'أدواتك', 'تحويل الصور إلى Word'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/ocr',
    },
    openGraph: {
        title: 'استخراج النص من الصور (Arabic OCR) بدقة عالية | أدواتك',
        description: 'حوّل أي صورة لنص مكتوب باللغة العربية والإنجليزية بسرعة فائقة وبدون رفع صورتك.',
        url: 'https://tools.daleel-al-suez.com/tools/ocr',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة استخراج النصوص OCR",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة مجانية لاستخراج النصوص من الصور تدعم اللغة العربية والإنجليزية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "دعم اللغة العربية, معالجة على المتصفح, تصدير النصوص كملف أو نسخها"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <OcrPage />
        </>
    );
}
