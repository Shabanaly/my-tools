import { Metadata } from 'next';
import PdfPage from './PdfPage';

export const metadata: Metadata = {
    title: 'تحويل صور إلى PDF | أدواتك',
    description: 'ادمج مجموعة صور في ملف PDF واحد بضغطة زر وبسهولة تامة. سريع وآمن ولا يحتفظ بملفاتك بعد التحويل.',
    keywords: ['تحويل صور ل pdf', 'صور الى pdf', 'JPG to PDF', 'دمج الصور', 'إنشاء ملف PDF', 'أدواتك'],
    openGraph: {
        title: 'تحويل صور إلى PDF | أدواتك',
        description: 'ادمج مجموعة صور في ملف PDF واحد بضغطة زر وبسهولة تامة.',
        url: 'https://adowatak.com/tools/pdf',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'تحويل صور إلى PDF | أدواتك',
        description: 'ادمج مجموعة صور في ملف PDF واحد بضغطة زر وبسهولة تامة.',
    }
};

export default function Page() {
    return <PdfPage />;
}
