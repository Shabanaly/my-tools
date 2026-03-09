import { Metadata } from 'next';
import OcrPage from './OcrPage';

export const metadata: Metadata = {
    title: 'استخراج النص من الصور (OCR) | أدواتك',
    description: 'حوّل صورك إلى نصوص مكتوبة وقابلة للنسخ أو التعديل بكل سهولة ومجاناً. يدعم اللغتين العربية والإنجليزية.',
    keywords: ['استخراج النص من الصور', 'تحويل صورة الى نص', 'Image to Text', 'Arabic OCR', 'نسخ الكلام من الصور', 'أدواتك'],
    openGraph: {
        title: 'استخراج النص من الصور (Image to Text) | أدواتك',
        description: 'استخرج النصوص العربية والإنجليزية من أي صورة بنقرة زر واحدة.',
        url: 'https://tools.daleel-al-suez.com/tools/ocr',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'أداة استخراج النص من الصورة | أدواتك',
        description: 'نسخ الكلام والنصوص من داخل الصور بسهولة ودقة عالية.',
    },
};

export default function Page() {
    return <OcrPage />;
}
