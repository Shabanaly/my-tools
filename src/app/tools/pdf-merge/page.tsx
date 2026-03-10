import { Metadata } from 'next';
import PdfMergePage from './PdfMergePage';

export const metadata: Metadata = {
    title: 'دمج ملفات PDF اونلاين مجاناً وبأمان تام | أدواتك',
    description: 'ادمج عدة مستندات PDF في ملف واحد بسهولة وسرعة فائقة. أداة دمج الـ PDF تعمل بالكامل داخل متصفحك لضمان خصوصية مستنداتك وسرية بياناتك.',
    keywords: [
        'دمج ملفات PDF', 'PDF Merge online free', 'تجميع ملفات PDF',
        'دمج بي دي اف', 'Merge PDF locally', 'أدواتك', 'تنظيم ملفات PDF'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/pdf-merge',
    },
    openGraph: {
        title: 'دمج وتجميع ملفات PDF اونلاين مجاناً | أدواتك',
        description: 'اجمع عدة مستندات PDF في ملف واحد بأمان كامل وبدون رفعها لأي سيرفر.',
        url: 'https://tools.daleel-al-suez.com/tools/pdf-merge',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة دمج ملفات PDF",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة مجانية لدمج وتجميع ملفات PDF المتعددة في ملف واحد داخل المتصفح.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "دمج غير محدود، معالجة أوفلاين، أمان تام للخصوصية"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PdfMergePage />
        </>
    );
}
