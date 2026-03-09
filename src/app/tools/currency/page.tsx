import { Metadata } from 'next';
import CurrencyPage from './CurrencyPage';

export const metadata: Metadata = {
    title: 'حاسبة تحويل العملات اللحظية | أدواتك',
    description: 'حوّل بين العملات المختلفة (دولار، يورو، ريال، درهم، جنيه إلخ) بأسعار الصرف اللحظية المحدثة يومياً مجاناً ومباشرة.',
    keywords: ['تحويل عملات', 'حاسبة العملات', 'سعر الدولار اليوم', 'سعر اليورو', 'سعر الريال السعودي', 'سعر الدرهم', 'أدواتك'],
    openGraph: {
        title: 'حاسبة تحويل العملات اللحظية | أدواتك',
        description: 'حوّل بين العملات المختلفة (دولار، يورو، ريال، درهم، جنيه إلخ) بأسعار الصرف اللحظية المحدثة يومياً.',
        url: 'https://tools.daleel-al-suez.com/tools/currency',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'حاسبة تحويل العملات اللحظية | أدواتك',
        description: 'حوّل بين العملات المختلفة بأسعار الصرف اللحظية المحدثة يومياً مجاناً ومباشرة.',
    },
};

export default function Page() {
    return <CurrencyPage />;
}
