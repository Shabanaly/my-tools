import { Metadata } from 'next';
import SalaryPage from './SalaryPage';

export const metadata: Metadata = {
    title: 'حاسبة الراتب الصافي (Net Salary) | أدواتك',
    description: 'احسب راتبك الصافي بدقة بعد خصم التأمينات والضرائب وإضافة البدلات والمكافآت من خلال حاسبة الراتب المجانية.',
    keywords: ['حاسبة الراتب', 'الراتب الصافي', 'Net Salary Calculator', 'حساب التأمينات', 'حساب الضرائب', 'أدواتك'],
    openGraph: {
        title: 'حاسبة الراتب الصافي (Net Salary) | أدواتك',
        description: 'احسب راتبك الصافي بدقة بعد خصم التأمينات والضرائب وإضافة البدلات والمكافآت.',
        url: 'https://tools.daleel-al-suez.com/tools/salary',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'حاسبة الراتب الصافي | أدواتك',
        description: 'حاسبة دقيقة لمعرفة راتبك الصافي بعد الاستقطاعات.',
    },
};

export default function Page() {
    return <SalaryPage />;
}
