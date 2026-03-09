import { Metadata } from 'next';
import PdfMergePage from './PdfMergePage';

export const metadata: Metadata = {
    title: 'دمج ملفات PDF (مجاناً وبدون إنترنت) | أدواتك',
    description: 'قم بدمج عدة ملفات PDF في ملف واحد بسهولة وسرعة ومجاناً. العملية تتم بالكامل داخل متصفحك للحفاظ على خصوصية مستنداتك.',
    keywords: ['دمج pdf', 'pdf merge', 'تجميع ملفات pdf', 'دمج ملفات بي دي اف', 'أدواتك'],
    openGraph: {
        title: 'دمج ملفات PDF (مجاناً وبدون إنترنت) | أدواتك',
        description: 'قم بدمج عدة ملفات PDF في ملف واحد بسهولة وسرعة ومجاناً حفاظاً على خصوصيتك.',
        url: 'https://tools.daleel-al-suez.com/tools/pdf-merge',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'دمج ملفات PDF | أدواتك',
        description: 'ادمج مستنداتك في ملف PDF واحد بسهولة ومن متصفحك مباشرة.',
    },
};

export default function Page() {
    return <PdfMergePage />;
}
