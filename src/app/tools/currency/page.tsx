import { Metadata } from 'next';
import CurrencyPage from './CurrencyPage';

export const metadata: Metadata = {
    title: 'محول العملات اللحظي - أسعار الصرف اليوم في مصر | أدواتك',
    description: 'حوّل بين جميع العملات العالمية (دولار، يورو، ريال، درهم) مقابل الجنيه المصري بأسعار صرف لحظية محدثة. أدق حاسبة تحويل عملات اونلاين مجاناً.',
    keywords: [
        'تحويل عملات', 'سعر الدولار اليوم في مصر', 'سعر الريال السعودي مقابل الجنيه',
        'تحويل من دولار لجنيه', 'أسعار العملات لحظة بلحظة', 'أدواتك المالية'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/currency',
    },
    openGraph: {
        title: 'محول العملات اللحظي - أسعار الصرف المباشرة | أدواتك',
        description: 'تابع أسعار الصرف وحوّل بين العملات بضغطة زر وبدقة متناهية.',
        url: 'https://tools.daleel-al-suez.com/tools/currency',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محول العملات العالمي",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "أداة لتحويل العملات بأسعار صرف لحظية ومحدثة من الأسواق العالمية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحويل من دولار لجنيه، تحويل ريال سعودي، أسعار صرف لحظية"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CurrencyPage />
        </>
    );
}
