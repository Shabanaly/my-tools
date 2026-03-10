import { Metadata } from 'next';
import WatermarkApp from './WatermarkApp';

export const metadata: Metadata = {
    title: 'إضافة علامة مائية للصور اونلاين مجاناً | أدواتك',
    description: 'أضف نصاً أو شعاراً كعلامة مائية لصورك بسهولة. أداة مجانية لحماية حقوق ملكية صورك، تعمل بالكامل داخل المتصفح وبدقة عالية.',
    keywords: ['علامة مائية', 'إضافة لوجو للصور', 'حماية الصور', 'watermark online', 'أدواتك', 'إضافة نص للصور'],
    openGraph: {
        title: 'إضافة علامة مائية للصور اونلاين مجاناً | أدواتك',
        description: 'أضف نصاً أو شعاراً كعلامة مائية لصورك بسهولة وبدقة عالية.',
        url: 'https://tools.daleel-al-suez.com/tools/watermark',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'إضافة علامة مائية للصور اونلاين مجاناً | أدواتك',
        description: 'أضف نصاً أو شعاراً كعلامة مائية لصورك بسهولة وبدقة عالية.',
    }
};

export default function WatermarkPage() {
    return <WatermarkApp />;
}
