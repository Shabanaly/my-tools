import { Metadata } from 'next';
import ZakatPage from './ZakatPage';

export const metadata: Metadata = {
    title: 'حاسبة الزكاة اونلاين - حساب نصاب الزكاة بدقة | أدواتك',
    description: 'احسب زكاة مالك وفق الشريعة الإسلامية بسهولة. أداة دقيقة تحسب لك نصاب الزكاة بناءً على أسعار الذهب المباشرة اليوم، ومقدار الزكاة الواجبة مجاناً.',
    keywords: [
        'حاسبة الزكاة', 'حساب زكاة المال', 'نصاب الزكاة اليوم في مصر',
        'كيفية حساب الزكاة', 'زكاة الذهب والفضة', 'أدواتك الإسلامية'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/zakat',
    },
    openGraph: {
        title: 'حاسبة الزكاة الإلكترونية - حساب نصاب الزكاة بدقة | أدواتك',
        description: 'احسب زكاة مالك بسهولة ودقة بناءً على أسعار الذهب والفضة اللحظية.',
        url: 'https://tools.daleel-al-suez.com/tools/zakat',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "حاسبة الزكاة الشرعية",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة لحساب زكاة المال والذهب بناءً على أسعار السوق والنصاب الشرعي.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحديث نصاب الزكاة، حساب زكاة الذهب، حساب زكاة الأموال"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ZakatPage />
        </>
    );
}
