import { Metadata } from 'next';
import CompressPage from './CompressPage';

export const metadata: Metadata = {
    title: 'ضغط الصور اونلاين | أدواتك',
    description: 'صغّر حجم الصور وتقليل مساحتها بدون فقدان الجودة. أداة ضغط مجانية وسريعة تدعم JPEG و PNG و WEBP.',
    keywords: ['ضغط الصور', 'تصغير حجم الصورة', 'تقليل مساحة الصور', 'ضغط jpg', 'ضغط png', 'أدواتك'],
    openGraph: {
        title: 'ضغط الصور اونلاين بدون فقدان الجودة | أدواتك',
        description: 'صغّر حجم الصور وتقليل مساحتها بدون فقدان الجودة. أداة ضغط مجانية وسريعة.',
        url: 'https://tools.daleel-al-suez.com/tools/compress',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ضغط الصور اونلاين بدون فقدان الجودة | أدواتك',
        description: 'صغّر حجم الصور وتقليل مساحتها بدون فقدان الجودة. أداة ضغط مجانية وسريعة.',
    }
};

export default function Page() {
    return <CompressPage />;
}
