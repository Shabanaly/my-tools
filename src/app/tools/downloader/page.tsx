import { Metadata } from 'next';
import DownloaderPage from './DownloaderPage';

export const metadata: Metadata = {
    title: 'تحميل الفيديوهات (Video Downloader) | أدواتك',
    description: 'حمل فيديوهاتك المفضلة من يوتيوب، تيك توك، إنستجرام وفيسبوك بأعلى جودة وبدون علامة مائية مجاناً.',
    keywords: ['تحميل فيديو', 'يوتيوب', 'تيك توك بدون علامة مائية', 'انستجرام', 'فيديو داونلودر', 'أدواتك'],
    openGraph: {
        title: 'تحميل الفيديوهات (Video Downloader) | أدواتك',
        description: 'حمل فيديوهاتك المفضلة من يوتيوب، تيك توك، وغيرها بأعلى جودة.',
        url: 'https://tools.daleel-al-suez.com/tools/downloader',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'أداة تحميل الفيديوهات | أدواتك',
        description: 'حمل أي فيديو من السوشيال ميديا بضغطة زر.',
    },
};

export default function Page() {
    return <DownloaderPage />;
}
