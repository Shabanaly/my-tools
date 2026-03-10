import { Metadata } from 'next';
import AgePage from './AgePage';

export const metadata: Metadata = {
    title: 'حاسبة العمر الدقيقة باليوم والشهر والساعة | أدواتك',
    description: 'احسب عمرك بدقة فائقة باليوم، الشهر، والسنة. تعرف على موعد عيد ميلادك القادم، والبرج الفلكي، وتفاصيل ممتعة عن رحلتك في الحياة مجاناً.',
    keywords: [
        'حاسبة العمر', 'احسب عمرك بالهجري والميلادي', 'حساب فرق السنين',
        'موعد عيد ميلادي القادم', 'كم عمرك الآن', 'أدواتك اليومية'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/age',
    },
    openGraph: {
        title: 'حاسبة العمر الدقيقة - اعرف عمرك بالتفصيل | أدواتك',
        description: 'احسب عمرك باليوم والشهر والثانية واعرف متى عيد ميلادك القادم وتفاصيل أخرى.',
        url: 'https://tools.daleel-al-suez.com/tools/age',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "حاسبة العمر الذكية",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة دقيقة لحساب العمر الزمني بالتفصيل ومعرفة المناسبات القادمة.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "حساب السن باليوم والشهر، حساب عيد الميلاد القادم، حساب الأيام المتبقية"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AgePage />
        </>
    );
}
