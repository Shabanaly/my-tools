import { Metadata } from 'next';
import ResizerApp from './ResizerApp';

export const metadata: Metadata = {
    title: 'تغيير حجم الصور ومقاساتها اونلاين مجاناً | أدواتك',
    description: 'أفضل أداة لتغيير حجم الصور ومقاساتها بالبكسل أو النسبة المئوية. حافظ على جودة صورك وخصوصيتك، حيث تتم المعالجة فوراً داخل متصفحك.',
    keywords: [
        'تغيير حجم الصور اونلاين', 'تصغير مقاس الصور', 'تكبير الصور بجودة عالية',
        'Image Resizer free', 'تعديل ابعاد الصورة', 'أدواتك', 'تحجيم الصور'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/resize',
    },
    openGraph: {
        title: 'تغيير حجم ومقاسات الصور اونلاين مجاناً | أدواتك',
        description: 'غيّر أبعاد صورك بدقة وسهولة لتناسب أي منصة وبأمان تام على جهازك.',
        url: 'https://tools.daleel-al-suez.com/tools/resize',
        type: 'website',
    },
};

export default function ResizePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة تغيير حجم الصور",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة لتغيير أبعاد ومقاسات الصور بالبكسل أو النسبة المئوية داخل المتصفح.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تغيير الحجم بالبكسل، تغيير الحجم بالنسبة المئوية، الحفاظ على النسبة"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ResizerApp />
        </>
    );
}
