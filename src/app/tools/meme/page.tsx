import { Metadata } from 'next';
import MemeApp from './MemeApp';

export const metadata: Metadata = {
    title: 'صانع الميمز اونلاين مجاناً (Meme Generator) | أدواتك',
    description: 'اصنع ميمز احترافية ومضحكة بسهولة مجاناً. أضف نصوصاً فوق الصور مع التحكم الكامل في الخطوط والأنماط. أفضل صانع ميمز عربي سريع وآمن تماماً.',
    keywords: [
        'صانع ميمز', 'Meme generator Arabic', 'عمل كوميكس اونلاين',
        'تعديل صور مضحكة', 'صناعة تريندات', 'أدواتك', 'تحويل الصور لميمز'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/meme',
    },
    openGraph: {
        title: 'صانع الميمز اونلاين مجاناً - اصنع ميمز احترافية | أدواتك',
        description: 'اصنع ميمز احترافية ومضحكة بسهولة مجاناً وبدون تسجيل.',
        url: 'https://tools.daleel-al-suez.com/tools/meme',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محرك صناعة الميمز",
        "operatingSystem": "All",
        "applicationCategory": "DesignApplication",
        "description": "أداة سهلة وسريعة لصناعة الميمز والكوميكس باللغة العربية والإنجليزية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "إضافة نصوص، تغيير خطوط، تحميل فوري"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <MemeApp />
        </>
    );
}
