import { Metadata } from 'next';
import GoldPage from './GoldPage';

export const metadata: Metadata = {
    title: 'حاسبة الذهب | أدواتك',
    description: 'احسب قيمة مدخراتك من الذهب بناءً على الوزن والعيار مع تحديث فوري ولحظي لأسعار الذهب (عيار 21، 24 وغيرها) بأسواق الصاغة.',
    keywords: ['سعر الذهب اليوم', 'حاسبة الذهب', 'جرام الذهب عيار 21', 'أسعار الصاغة', 'قيمة الذهب', 'أدواتك'],
    openGraph: {
        title: 'حاسبة الذهب - أسعار لحظية | أدواتك',
        description: 'احسب قيمة مدخراتك من الذهب بناءً على الوزن والعيار وتحديث فوري للأسعار.',
        url: 'https://tools.daleel-al-suez.com/tools/gold',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'حاسبة الذهب - أسعار لحظية | أدواتك',
        description: 'احسب قيمة مدخراتك من الذهب بناءً على الوزن والعيار وتحديث فوري للأسعار.',
    }
};

export default function Page() {
    return <GoldPage />;
}
