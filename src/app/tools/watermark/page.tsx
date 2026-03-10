import { Metadata } from 'next';
import WatermarkApp from './WatermarkApp';

export const metadata: Metadata = {
    title: 'إضافة علامة مائية للصور اونلاين (Watermark) | أدواتك',
    description: 'احمِ حقوق صورك بإضافة علامة مائية (نص أو شعار) بسهولة وسرعة. أداة مجانية واحترافية تعمل بالكامل داخل متصفحك لضمان أقصى درجات الخصوصية.',
    keywords: [
        'إضافة علامة مائية للصور', 'Watermark online free', 'حماية حقوق الصور',
        'وضع شعار على الصور', 'إضافة نص للصور اونلاين', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/watermark',
    },
    openGraph: {
        title: 'إضافة علامة مائية للصور اونلاين مجاناً وباحترافية | أدواتك',
        description: 'أضف نصاً أو شعاراً كعلامة مائية لصورك بسهولة وقم بحماية حقوقك بضغطة زر.',
        url: 'https://tools.daleel-al-suez.com/tools/watermark',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة العلامة المائية",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة مجانية وسريعة لحماية الصور بإضافة علامات مائية نصية أو صورية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "إضافة شعار، إضافة نصوص، معالجة على المتصفح"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WatermarkApp />
        </>
    );
}
