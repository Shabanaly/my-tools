import PageLayout from '@/components/PageLayout';
import { Sparkles, Zap, Heart, Info, Target } from 'lucide-react';

export const metadata = {
    title: 'من نحن | أدواتك',
    description: 'تعرف على قصة موقع أدواتك ومهمتنا في توفير أدوات مجانية وسهلة الاستخدام للجميع.',
};

export default function AboutPage() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-100 shadow-sm">
                        <Info className="w-10 h-10 text-purple-600" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-800 mb-4">من نحن</h1>
                    <p className="text-lg text-gray-600 font-medium">قصة "أدواتك" ومهمتنا الرقمية</p>
                </div>

                <div className="space-y-16">
                    <section className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                                <Target className="w-7 h-7 text-purple-500" />
                                مهمتنا
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                وُلد موقع **"أدواتك"** من فكرة بسيطة: الإنترنت يجب أن يكون مكاناً يسهل حياة الناس. مهمتنا هي توفير مجموعة أدوات رقمية عالية الجودة، مجانية تماماً، وسهلة الاستخدام للجميع دون الحاجة لمهارات تقنية معقدة.
                            </p>
                        </div>
                        <div className="flex-1 bg-linear-to-br from-purple-500 to-indigo-600 p-8 rounded-[40px] shadow-2xl shadow-purple-500/20 rotate-3">
                            <Sparkles className="w-24 h-24 text-white/20 absolute top-4 left-4" />
                            <div className="relative z-10 text-white">
                                <p className="text-2xl font-black mb-2 font-mono">100%</p>
                                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">مجاني بالكامل</p>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <Zap className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="text-xl font-black text-gray-800 mb-2">السرعة</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                أدواتنا مصممة لتعمل بسرعة فائقة داخل متصفحك مباشرة دون انتظار.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                            <h3 className="text-xl font-black text-gray-800 mb-2">الخصوصية</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                لا نقوم برفع ملفاتك إلى أي سيرفر، كل شيء يتم محلياً على جهازك.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <Heart className="w-10 h-10 text-pink-500 mb-4" />
                            <h3 className="text-xl font-black text-gray-800 mb-2">البساطة</h3>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                واجهة مستخدم نظيفة وبديهية تركز على إنجاز المهمة بذكاء.
                            </p>
                        </div>
                    </div>

                    <section className="bg-gray-50 p-10 rounded-[40px] text-center border border-gray-100">
                        <h2 className="text-2xl font-black text-gray-800 mb-4">لماذا "أدواتك"؟</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                            لأننا نؤمن بالإنترنت المفتوح والآمن. نحن نسعى لتقديم بديل احترافي وبسيط للأدوات المدفوعة أو المعقدة، مع الحفاظ على أعلى معايير حماية الخصوصية الرقمية.
                        </p>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}

import { ShieldCheck } from 'lucide-react';
