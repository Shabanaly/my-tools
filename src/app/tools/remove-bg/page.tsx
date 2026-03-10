import { Metadata } from 'next';
import BgRemoverApp from './BgRemoverApp';

export const metadata: Metadata = {
    title: 'إزالة خلفية الصور اونلاين بالذكاء الاصطناعي مجاناً | أدواتك',
    description: 'أزل خلفية الصور بدقة وبسرعة فائقة بالذكاء الاصطناعي مجاناً. حافظ على خصوصيتك، حيث تتم معالجة الصور بالكامل داخل متصفحك ولا يتم رفعها لأي سيرفر.',
    keywords: ['إزالة الخلفية', 'مسح خلفية الصورة', 'تفريغ الصورة', 'بدون خلفية', 'الذكاء الاصطناعي', 'remove background', 'background eraser'],
    openGraph: {
        title: 'إزالة خلفية الصور اونلاين بالذكاء الاصطناعي مجاناً | أدواتك',
        description: 'أزل خلفية الصور بدقة وبسرعة فائقة بالذكاء الاصطناعي مجاناً. حافظ على خصوصيتك.',
        url: 'https://tools.daleel-al-suez.com/tools/remove-bg',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'إزالة خلفية الصور اونلاين بالذكاء الاصطناعي مجاناً | أدواتك',
        description: 'أزل خلفية الصور بدقة وبسرعة فائقة بالذكاء الاصطناعي مجاناً.',
    }
};

export default function RemoveBgPage() {
    return <BgRemoverApp />;
}
