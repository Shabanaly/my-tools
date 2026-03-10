import { Metadata } from 'next';
import CropperApp from './CropperApp';

export const metadata: Metadata = {
    title: 'قص الصور اونلاين مجاناً (Image Cropper) | أدواتك',
    description: 'أداة قص الصور الاحترافية. حدد الأبعاد التي تريدها أو استخدم المقاسات الجاهزة (1:1, 16:9) وقص صورك بدقة فائقة وبشخصية آمنة تماماً على جهازك.',
    keywords: [
        'قص الصور اونلاين', 'اقتصاص الصور', 'Image Cropper free',
        'تعديل ابعاد الصور', 'قص الصور بجودة عالية', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/crop',
    },
    openGraph: {
        title: 'قص الصور اونلاين بدقة فائقة وبأمان | أدواتك',
        description: 'أداة بسيطة واحترافية لقص صورك بالمقاسات التي تريدها وبدون رفعها لأي سيرفر.',
        url: 'https://tools.daleel-al-suez.com/tools/crop',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة قص الصور",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة لقص الصور وتغيير أبعادها داخل المتصفح مع الحفاظ على الجودة.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "اقتصاص حر، أبعاد ثابتة، حفظ بجودة عالية"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CropperApp />
        </>
    );
}
