import { Metadata } from 'next';
import GoldPage from './GoldPage';

export const metadata: Metadata = {
    title: 'سعر الذهب اليوم في مصر وحاسبة قيمة الذهب | أدواتك',
    description: 'تابع أسعار الذهب لحظة بلحظة في سوق الصاغة المصري. احسب قيمة مدخراتك من الذهب (عيار 21، 24، 18) بناءً على الوزن والأسعار المباشرة مجاناً وبدقة.',
    keywords: [
        'سعر الذهب اليوم في مصر', 'حاسبة الذهب', 'جرام الذهب عيار 21 اليوم',
        'أسعار الصاغة الآن', 'قيمة الذهب بالجنيه المصري', 'أسعار سبائك الذهب',
        'أدواتك المالية', 'توقعات أسعار الذهب'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/gold',
    },
    openGraph: {
        title: 'سعر الذهب اليوم وحاسبة الذهب المباشرة | أدواتك',
        description: 'احسب قيمة مدخراتك من الذهب بناءً على الوزن والأسعار المباشرة في مصر.',
        url: 'https://tools.daleel-al-suez.com/tools/gold',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "حاسبة الذهب",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "أداة لمتابعة أسعار الذهب وحساب قيمتها بناءً على الوزن والعيار في السوق المصري.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحديث أسعار الذهب عيار 21 و 24 و 18, حساب قيمة المشغولات الذهبية"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GoldPage />
        </>
    );
}
