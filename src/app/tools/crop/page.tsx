import { Metadata } from 'next';
import CropperApp from './CropperApp';

export const metadata: Metadata = {
    title: 'قص الصور اونلاين بصيغ JPG و PNG | أدواتك',
    description: 'قص أجزاء من صورك بدقة عالية وأبعاد مخصصة. أداة قص مجانية وسريعة تدعم تحديد أبعاد ثابتة مثل المربع أو المستطيل بدون رفع الصورة لأي سيرفر.',
    keywords: ['قص الصور', 'اقتصاص الصورة', 'تعديل مقاسات الصور', 'قص اونلاين', 'أدواتك', 'crop image'],
    openGraph: {
        title: 'قص الصور اونلاين بدون رفع للسيرفر | أدواتك',
        description: 'قص أجزاء من صورك بدقة عالية وأبعاد مخصصة مجاناً.',
        url: 'https://tools.daleel-al-suez.com/tools/crop',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'قص الصور اونلاين بدون رفع للسيرفر | أدواتك',
        description: 'قص أجزاء من صورك بدقة عالية وأبعاد مخصصة مجاناً.',
    }
};

export default function CropPage() {
    return <CropperApp />;
}
