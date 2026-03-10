import PageLayout from '@/components/PageLayout';
import { Gavel, Scale, FileText, Ban, AlertTriangle } from 'lucide-react';

export const metadata = {
    title: 'شروط الاستخدام | أدواتك',
    description: 'شروط وبنود استخدام موقع أدواتك. يرجى قراءة الشروط قبل البدء في استخدام خدماتنا.',
};

export default function TermsPage() {
    const sections = [
        {
            title: 'قبول الشروط',
            icon: Scale,
            content: 'باستخدامك لموقع "أدواتك"، فإنك توافق على الالتزام بشروط الاستخدام المذكورة هنا. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام الموقع.'
        },
        {
            title: 'الاستخدام المقبول',
            icon: FileText,
            content: 'يُسمح باستخدام الأدوات للأغراض الشخصية والتجارية المشروعة. يمنع استخدام الموقع في أي نشاط غير قانوني، أو محاولة قرصنة الموقع أو التدخل في عمل الأدوات.'
        },
        {
            title: 'حقوق الملكية الفكرية',
            icon: Gavel,
            content: 'جميع الأدوات والبرمجيات والعلامات التجارية الموجودة في الموقع هي ملك لـ "أدواتك". لا يجوز نسخ أو إعادة توزيع أي جزء من شفرة الموقع دون إذن كتابي مسبق.'
        },
        {
            title: 'إخلاء المسؤولية',
            icon: AlertTriangle,
            content: 'نحن نسعى جاهدين لتقديم أدوات دقيقة وفعالة، ومع ذلك، نقدم خدماتنا "كما هي" دون أي ضمانات. لا نتحمل المسؤولية عن أي خسارة أو ضرر ناتج عن استخدام الأدوات أو الاعتماد على نتائجها.'
        },
        {
            title: 'التعديلات',
            icon: Ban,
            content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يعتبر استمرارك في استخدام الموقع بعد إجراء التعديلات قبولاً ضمنياً لها.'
        }
    ];

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-100 shadow-sm">
                        <Gavel className="w-10 h-10 text-amber-600" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-800 mb-4">شروط الاستخدام</h1>
                    <p className="text-gray-500 font-medium">اتفاقية استخدام خدمات موقع "أدواتك"</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-hover hover:border-amber-200">
                            <h2 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-3">
                                <section.icon className="w-6 h-6 text-amber-500" />
                                {section.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
