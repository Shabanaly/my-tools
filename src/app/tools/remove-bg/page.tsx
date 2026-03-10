import { Metadata } from 'next';
import BgRemoverApp from './BgRemoverApp';

export const metadata: Metadata = {
    title: 'إزالة خلفية الصور بالذكاء الاصطناعي مجاناً وبدقة 100% | أدواتك',
    description: 'أداة إزالة خلفية الصور المتقدمة بضغطة زر. معالجة آمنة تماماً داخل متصفحك للحفاظ على خصوصيتك. أفضل بديل مجاني لـ Remove.bg في الوطن العربي.',
    keywords: [
        'إزالة خلفية الصور اونلاين', 'مسح خلفية الصورة بالذكاء الاصطناعي',
        'تفريغ الصور مجاناً', 'Background Remover AI', 'Transparent background',
        'أدواتك', 'تعديل الصور اونلاين'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/remove-bg',
    },
    openGraph: {
        title: 'إزالة خلفية الصور بالذكاء الاصطناعي مجاناً | أدواتك',
        description: 'أزل خلفية صورك بدقة فائقة وبسرعة وبدون اشتراك أو تسجيل.',
        url: 'https://tools.daleel-al-suez.com/tools/remove-bg',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "مزيل الخلفية بالذكاء الاصطناعي",
        "operatingSystem": "All",
        "applicationCategory": "DesignApplication",
        "description": "أداة ذكاء اصطناعي متطورة لإزالة خلفيات الصور في ثوانٍ مع الحفاظ على الخصوصية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "إزالة خلفية بتقنيات AI، معالجة فورية، أمان تام للبيانات"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BgRemoverApp />
        </>
    );
}
