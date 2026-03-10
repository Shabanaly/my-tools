import { Metadata } from 'next';
import ImageConverterPage from './ImageConverterPage';

export const metadata: Metadata = {
    title: 'محول صيغ الصور اونلاين (WebP to JPG, PNG) | أدواتك',
    description: 'حوّل صورك بين مختلف الصيغ (WebP, JPG, PNG) بسهولة وبجودة عالية. أداة تحويل صور سريعة وآمنة تماماً حيث تتم المعالجة بالكامل داخل متصفحك.',
    keywords: [
        'تحويل صيغ الصور', 'WebP to JPG converter', 'تحويل الصور الى PNG',
        'محول صور اونلاين', 'تغيير صيغة الصورة', 'تحويل WebP الى JPG',
        'أدواتك', 'image format converter'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/image-converter',
    },
    openGraph: {
        title: 'محول صيغ الصور اونلاين (WebP/JPG/PNG) | أدواتك',
        description: 'حوّل صورك بين مختلف الصيغ بسهولة وبجودة عالية وبأمان تام على جهازك.',
        url: 'https://tools.daleel-al-suez.com/tools/image-converter',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محول صيغ الصور الذكي",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة وآمنة للتحويل بين صيغ الصور المختلفة مثل WebP و JPG و PNG.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحويل WebP إلى JPG, تحويل WebP إلى PNG, تحويل JPG إلى PNG"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ImageConverterPage />
        </>
    );
}
