import { Metadata } from 'next';
import ImageConverterPage from './ImageConverterPage';

export const metadata: Metadata = {
    title: 'محول صيغ الصور WebP إلى JPG/PNG | أدواتك',
    description: 'حول صور WebP بسهولة وسرعة إلى صيغ JPG أو PNG باستخدام متصفحك مباشرة وبدون رفع أية ملفات لحفظ الخصوصية.',
    keywords: ['تحويل صور', 'محول WebP', 'WebP to JPG', 'WebP to PNG', 'أدواتك'],
    openGraph: {
        title: 'محول صيغ الصور WebP إلى JPG/PNG | أدواتك',
        description: 'حول صور WebP بسهولة وسرعة إلى صيغ JPG أو PNG باستخدام متصفحك مباشرة وبدون رفع أية ملفات لحفظ الخصوصية.',
        url: 'https://tools.daleel-al-suez.com/tools/image-converter',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'محول صيغ الصور WebP إلى JPG/PNG | أدواتك',
        description: 'حول صور WebP بسهولة لـ JPG أو PNG في ثواني.',
    },
};

export default function Page() {
    return <ImageConverterPage />;
}
