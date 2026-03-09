import { Metadata } from 'next';
import InstallmentPage from './InstallmentPage';

export const metadata: Metadata = {
    title: 'حاسبة التقسيط | أدواتك',
    description: 'احسب القسط الشهري وإجمالي المبلغ المستحق بوضوح وببساطة. أفضل حاسبة تقسيط مجانية في مصر والوطن العربي لمعرفة الفوائد والأقساط.',
    keywords: ['حاسبة التقسيط', 'حساب أقساط', 'فوائد بنكية', 'حاسبة قروض', 'قسط شهري', 'أدواتك'],
    openGraph: {
        title: 'حاسبة التقسيط | أدواتك',
        description: 'احسب القسط الشهري وإجمالي المبلغ المستحق بوضوح وببساطة مجاناً.',
        url: 'https://adowatak.com/tools/installment',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'حاسبة التقسيط | أدواتك',
        description: 'احسب القسط الشهري وإجمالي المبلغ المستحق بوضوح وببساطة مجاناً.',
    }
};

export default function Page() {
    return <InstallmentPage />;
}
