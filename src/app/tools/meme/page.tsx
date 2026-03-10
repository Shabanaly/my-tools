import { Metadata } from 'next';
import MemeApp from './MemeApp';

export const metadata: Metadata = {
    title: 'صانع الميمز اونلاين مجاناً - اصنع ميمز احترافية | أدواتك',
    description: 'اصنع ميمز احترافية ومضحكة بسهولة مجاناً. أضف نصوصاً فوق الصور مع التحكم الكامل في الخطوط والأنماط. كل شيء يتم داخل متصفحك.',
    keywords: ['صانع ميمز', 'Meme generator', 'صناعة كوميكس', 'تعديل صور مضحكة', 'أدواتك', 'ميمز بالعربي'],
    openGraph: {
        title: 'صانع الميمز اونلاين مجاناً - اصنع ميمز احترافية | أدواتك',
        description: 'اصنع ميمز احترافية ومضحكة بسهولة مجاناً. أضف نصوصاً فوق الصور مع التحكم الكامل في الخطوط والأنماط.',
        url: 'https://tools.daleel-al-suez.com/tools/meme',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'صانع الميمز اونلاين مجاناً - اصنع ميمز احترافية | أدواتك',
        description: 'اصنع ميمز احترافية ومضحكة بسهولة مجاناً.',
    }
};

export default function MemePage() {
    return <MemeApp />;
}
