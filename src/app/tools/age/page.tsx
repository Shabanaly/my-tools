import { Metadata } from 'next';
import AgePage from './AgePage';

export const metadata: Metadata = {
    title: 'حاسبة العمر الدقيقة | أدواتك',
    description: 'احسب عمرك بالتفصيل (سنوات، شهور، أيام) واعرف متى موعد عيد ميلادك القادم وتفاصيل أخرى ممتعة عن عمرك بدقة.',
    keywords: ['حاسبة العمر', 'احسب عمرك', 'العمر بالشهور والأيام', 'تاريخ الميلاد', 'أدواتك'],
    openGraph: {
        title: 'حاسبة العمر الدقيقة | أدواتك',
        description: 'احسب عمرك بالتفصيل (سنوات، شهور، أيام) واعرف متى موعد عيد ميلادك القادم.',
        url: 'https://tools.daleel-al-suez.com/tools/age',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'حاسبة العمر الدقيقة | أدواتك',
        description: 'احسب عمرك بالتفصيل وتعرف على موعد عيد ميلادك القادم.',
    },
};

export default function Page() {
    return <AgePage />;
}
