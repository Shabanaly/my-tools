import { Metadata } from 'next';
import InstallmentPage from './InstallmentPage';

export const metadata: Metadata = {
    title: 'حاسبة التقسيط والقروض اونلاين - احسب قسطك بسهولة | أدواتك',
    description: 'أفضل حاسبة تقسيط لمعرفة القسط الشهري، الفوائد بنسبة مئوية واضحة، وإجمالي المبلغ المستحق. احسب قسط سيارتك أو قرضك الشخصي مجاناً وبسرعة.',
    keywords: [
        'حاسبة التقسيط', 'حساب أقساط البنوك', 'فوائد القروض',
        'حاسبة قسط السيارة', 'حساب القسط الشهري', 'أدواتك المالية'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/installment',
    },
    openGraph: {
        title: 'حاسبة التقسيط والقروض - احسب قسطك الشهري بدقة | أدواتك',
        description: 'احسب القسط الشهري وإجمالي الفوائد والمبلغ المستحق بوضوح وببساطة مجاناً.',
        url: 'https://tools.daleel-al-suez.com/tools/installment',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "حاسبة التقسيط الذكية",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "أداة لحساب الأقساط الشهرية والفوائد وإجمالي المبالغ المستحقة بوضوح.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "حساب الفائدة المركبة، حساب القسط الشهري، عرض إجمالي المبلغ"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <InstallmentPage />
        </>
    );
}
