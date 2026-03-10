import PageLayout from '@/components/PageLayout';
import { ShieldCheck, Eye, Lock, Globe, Cookie } from 'lucide-react';

export const metadata = {
    title: 'سياسة الخصوصية | أدواتك',
    description: 'تعرف على كيفية حماية خصوصيتك في موقع أدواتك. نحن نلتزم بأعلى معايير الأمان ومعالجة البيانات محلياً.',
};

export default function PrivacyPage() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
                        <ShieldCheck className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-800 mb-4">سياسة الخصوصية</h1>
                    <p className="text-gray-500 font-medium">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
                </div>

                <div className="prose prose-lg max-w-none space-y-12">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-blue-500" />
                            التزامنا بالخصوصية
                        </h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            في موقع "أدواتك"، نضع خصوصيتك في المقام الأول. نحن نؤمن بأن بياناتك هي ملكك وحدك، ولذلك صممنا جميع أدواتنا لتعمل بأمان وشفافية تامة.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                            <Eye className="w-6 h-6 text-blue-500" />
                            معالجة البيانات محلياً (Client-Side)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2">معالجة الصور والملفات</h3>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    تتم معالجة جميع الصور والملفات التي تقوم برفعها (مثل أدوات قص الصور، إزالة الخلفية، تحويل PDF) **بالكامل داخل متصفحك**. لا يتم إرسال أي من ملفاتك إلى خوادمنا.
                                </p>
                            </div>
                            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                                <h3 className="font-bold text-purple-900 mb-2">عدم التخزين</h3>
                                <p className="text-sm text-purple-800 leading-relaxed">
                                    بما أن المعالجة تتم محلياً، فنحن لا نقوم بتخزين أو الاحتفاظ بأي نسخة من ملفاتك أو بياناتك الشخصية على خوادم الموقع. بمجرد إغلاق الصفحة، تنتهي جلسة المعالجة تماماً.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                            <Globe className="w-6 h-6 text-blue-500" />
                            خدمات الطرف الثالث والإعلانات
                        </h2>
                        <p className="text-gray-600 leading-relaxed font-medium mb-4">
                            نستخدم بعض الخدمات الخارجية لتحسين تجربة المستخدم وتمويل الموقع:
                        </p>
                        <ul className="space-y-4 text-gray-600 list-disc list-inside px-4 font-medium">
                            <li><strong>Google AdSense:</strong> نستخدم إعلانات جوجل لتغطية تكاليف تشغيل الموقع. تستخدم جوجل ملفات تعريف الارتباط لعرض الإعلانات بناءً على زياراتك السابقة.</li>
                            <li><strong>Google Analytics:</strong> نستخدمها لجمع معلومات إحصائية مجهولة المصدر (مثل عدد الزوار، الصفحات الأكثر زيارة) للمساعدة في تحسين الموقع.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                            <Cookie className="w-6 h-6 text-blue-500" />
                            ملفات تعريف الارتباط (Cookies)
                        </h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            نستخدم ملفات تعريف الارتباط لتحسين أداء الموقع وتذكر تفضيلاتك وتخصيص تجربة الإعلانات. يمكنك التحكم في ملفات تعريف الارتباط أو تعطيلها من خلال إعدادات متصفحك.
                        </p>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
