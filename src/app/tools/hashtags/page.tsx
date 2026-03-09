import { Metadata } from 'next';
import HashtagPage from './HashtagPage';

export const metadata: Metadata = {
    title: 'مولد الهاشتاجات (Hashtag Generator) | أدواتك',
    description: 'احصل على أفضل الهاشتاجات الرائجة لمنصات التواصل الاجتماعي (إنستجرام، تيك توك، تويتر) لزيادة التفاعل والمشاهدات بضغطة زر.',
    keywords: ['مولد هاشتاجات', 'هاشتاجات انستقرام', 'هاشتاجات تيك توك', 'Hashtag Generator', 'زيادة المتابعين', 'أدواتك'],
    openGraph: {
        title: 'مولد الهاشتاجات (Hashtag Generator) | أدواتك',
        description: 'احصل على أفضل الهاشتاجات الرائجة لزيادة التفاعل والمشاهدات على السوشيال ميديا.',
        url: 'https://tools.daleel-al-suez.com/tools/hashtags',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'مولد الهاشتاجات | أدواتك',
        description: 'أفضل الهاشتاجات الرائجة جاهزة للنسخ لمنصات التواصل الاجتماعي.',
    },
};

export default function Page() {
    return <HashtagPage />;
}
