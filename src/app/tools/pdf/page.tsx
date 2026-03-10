import { Metadata } from 'next';
import PdfPage from './PdfPage';

export const metadata: Metadata = {
    title: 'تحويل الصور إلى PDF مجاناً (JPG to PDF) | أدواتك',
    description: 'حوّل صورك (JPG, PNG) إلى ملف PDF واحد عالي الجودة في ثوانٍ. أداة بسيطة، سريعة، وآمنة تماماً حيث تتم المعالجة على جهازك ولا نطلع على ملفاتك.',
    keywords: [
        'تحويل الصور لـ PDF', 'JPG to PDF converter', 'تحويل PNG الى PDF',
        'دمج الصور في ملف واحد', 'عمل ملف PDF من الصور', 'تحويل الصور اونلاين',
        'أدواتك', 'pdf converter free'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/pdf',
    },
    openGraph: {
        title: 'تحويل الصور إلى PDF مجاناً وبجودة عالية | أدواتك',
        description: 'ادمج صورك في ملف PDF واحد بضغطة زر واحدة وبدون رفع ملفاتك لأي خادم.',
        url: 'https://tools.daleel-al-suez.com/tools/pdf',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محول الصور إلى PDF",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة لتحويل ودمج الصور في ملف PDF واحد مع الحفاظ على الخصوصية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحويل JPG إلى PDF, تحويل PNG إلى PDF, دمج عدة صور"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PdfPage />
        </>
    );
}
