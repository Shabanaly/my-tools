import { Metadata } from 'next';
import SalaryPage from './SalaryPage';

export const metadata: Metadata = {
    title: 'حاسبة الراتب الصافي في مصر (Net Salary) | أدواتك',
    description: 'أدق حاسبة راتب في مصر لصناعة حساباتك المالية. احسب مرتبك الصافي بعد خصم التأمينات الاجتماعية والضرائب وإضافات البدلات والمكافآت مجاناً وبأمان تام.',
    keywords: [
        'حاسبة الراتب', 'الراتب الصافي في مصر', 'Net Salary Egypt',
        'حساب التأمينات الاجتماعية 2024', 'حساب ضرائب الدخل', 'حساب المرتب',
        'أدواتك المالية', 'زيادة المرتبات', 'قانون العمل المصري'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/salary',
    },
    openGraph: {
        title: 'حاسبة الراتب الصافي (Net Salary) بمصر | أدواتك',
        description: 'احسب مرتبك الصافي بدقة بعد خصم التأمينات والضرائب وإضافة البدلات مجاناً.',
        url: 'https://tools.daleel-al-suez.com/tools/salary',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "حاسبة الراتب الصافي",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "أداة لحساب الراتب الصافي بعد الاستقطاعات القانونية والضرائب في مصر.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "حساب التأمينات الاجتماعية, حساب الضرائب, حساب البدلات, حساب المكافآت"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SalaryPage />
        </>
    );
}
