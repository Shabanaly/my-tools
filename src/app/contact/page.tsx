import PageLayout from '@/components/PageLayout';
import { Mail, MessageSquare, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';

export const metadata = {
    title: 'اتصل بنا | أدواتك',
    description: 'لديك اقتراح أو واجهت مشكلة؟ نحن هنا للمساعدة. تواصل معنا عبر البريد الإلكتروني أو قنوات التواصل الاجتماعي.',
};

export default function ContactPage() {
    const contactMethods = [
        {
            icon: Mail,
            label: 'البريد الإلكتروني',
            value: 'contact@daleel-al-suez.com',
            link: 'mailto:sa676185@gmail.com',
            color: 'bg-blue-50 text-blue-600 border-blue-100'
        },
        {
            icon: MessageSquare,
            label: 'الدعم الفني',
            value: 'متاح 24/7 عبر البريد',
            link: '#',
            color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
        },
        {
            icon: MapPin,
            label: 'المقر',
            value: 'السويس، مصر',
            link: '#',
            color: 'bg-amber-50 text-amber-600 border-amber-100'
        }
    ];

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
                        <Send className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-800 mb-4">اتصل بنا</h1>
                    <p className="text-lg text-gray-600 font-medium text-balance">نحن نقدر رأيك! تواصل معنا للاقتراحات، التبليغ عن مشاكل، أو طلب أدوات جديدة.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {contactMethods.map((method, idx) => (
                        <a
                            key={idx}
                            href={method.link}
                            className={`p-8 rounded-[32px] border text-center transition-all hover:-translate-y-2 hover:shadow-lg ${method.color}`}
                        >
                            <method.icon className="w-8 h-8 mx-auto mb-4" />
                            <h3 className="font-black mb-1">{method.label}</h3>
                            <p className="text-sm font-bold opacity-80" dir="ltr">{method.value}</p>
                        </a>
                    ))}
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center">
                    <h2 className="text-2xl font-black text-gray-800 mb-6">تابعنا على منصات التواصل</h2>
                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors border border-gray-100">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-sky-500 transition-colors border border-gray-100">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="#" className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors border border-gray-100">
                            <Instagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
