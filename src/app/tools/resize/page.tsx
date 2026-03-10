import { Metadata } from 'next';
import ResizerApp from './ResizerApp';

export const metadata: Metadata = {
    title: 'تغيير حجم الصور اونلاين بصيغ JPG و PNG | أدواتك',
    description: 'غيّر أبعاد صورك بدقة وسهولة لتناسب أي منصة. تصغير وتكبير الصور بالبيكسل أو النسبة المئوية مجاناً بدون رفع الصور لسيرفرات خارجية.',
    keywords: ['تغيير حجم الصور', 'تصغير ابعاد الصور', 'تكبير الصور', 'تعديل مقاس الصورة', 'أدواتك'],
    openGraph: {
        title: 'تغيير حجم الصور بصيغ JPG و PNG اونلاين | أدواتك',
        description: 'غيّر أبعاد مقاسات صورك بدقة وسهولة لتناسب أي منصة. أداة سريعة وآمنة.',
        url: 'https://tools.daleel-al-suez.com/tools/resize',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'تغيير حجم الصور بصيغ JPG و PNG اونلاين | أدواتك',
        description: 'غيّر أبعاد مقاسات صورك بدقة وسهولة لتناسب أي منصة. أداة سريعة وآمنة.',
    }
};

export default function ResizePage() {
    return <ResizerApp />;
}
