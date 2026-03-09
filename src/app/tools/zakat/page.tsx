import { Metadata } from 'next';
import ZakatPage from './ZakatPage';

export const metadata: Metadata = {
    title: 'حاسبة الزكاة | أدواتك',
    description: 'احسب زكاة مالك وفقاً للشريعة الإسلامية مع مراعاة حد النصاب وتحديث أسعار الذهب لحظياً. أداة مجانية ودقيقة لحساب زكاة المال.',
    keywords: ['حاسبة الزكاة', 'زكاة المال', 'حساب النصاب', 'أحكام الزكاة', 'إخراج الزكاة', 'أدواتك'],
    openGraph: {
        title: 'حاسبة الزكاة | أدواتك',
        description: 'احسب زكاة مالك وفقاً للشريعة الإسلامية مع مراعاة حد النصاب.',
        url: 'https://tools.daleel-al-suez.com/tools/zakat',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'حاسبة الزكاة | أدواتك',
        description: 'احسب زكاة مالك وفقاً للشريعة الإسلامية مع مراعاة حد النصاب.',
    }
};

export default function Page() {
    return <ZakatPage />;
}
