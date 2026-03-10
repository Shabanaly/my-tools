import { Metadata } from 'next';
import PdfPage from './PdfPage';
import SEOArticle from '@/components/SEOArticle';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
    title: 'تحويل الصور إلى PDF مجاناً (JPG to PDF) | أدواتك',
    description: 'حوّل صورك (JPG, PNG) إلى ملف PDF واحد عالي الجودة في ثوانٍ. أداة بسيطة، سريعة، وآمنة تماماً حيث تتم المعالجة على جهازك ولا نطلع على ملفاتك.',
    keywords: [
        'تحويل الصور لـ PDF', 'JPG to PDF converter', 'تحويل PNG الى PDF',
        'دمج الصور في ملف واحد', 'عمل ملف PDF من الصور', 'تحويل الصور اونلاين',
        'أدواتك', 'pdf converter free'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/pdf',
    },
    openGraph: {
        title: 'تحويل الصور إلى PDF مجاناً وبجودة عالية | أدواتك',
        description: 'ادمج صورك في ملف PDF واحد بضغطة زر واحدة وبدون رفع ملفاتك لأي خادم.',
        url: 'https://tools.daleel-al-suez.com/tools/pdf',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محول الصور إلى PDF",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة لتحويل ودمج الصور في ملف PDF واحد مع الحفاظ على الخصوصية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحويل JPG إلى PDF, تحويل PNG إلى PDF, دمج عدة صور"
    };

    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PdfPage />
            <SEOArticle
                title="أداة تحويل الصور إلى ملف PDF واحد مجاناً (JPG/PNG to PDF)"
                content={
                    <>
                        <p>
                            هل لديك مجموعة من صور المستندات، الهوية الشخصية، الإيصالات، أو المذكرات الدراسية وتريد إرسالها كملف واحد مرتب ومحمي؟ أداة <strong>تحويل الصور إلى PDF</strong> من "أدواتك" هي الحل الأسرع والأكثر أماناً. تتيح لك الأداة تجميع العشرات من الصور مهما كانت صيغتها (JPG, PNG) وتحويلها إلى مستند PDF احترافي بضغطة زر.
                        </p>

                        <h3>لماذا يعتبر الـ PDF أفضل من الصور للمستندات؟</h3>
                        <ul>
                            <li><strong>ترتيب وتنسيق ثابت:</strong> عند إرسال 10 صور عبر واتساب أو البريد، قد تصل بترتيب عشوائي للمستلم. ملف الـ PDF يضمن عرض الصور بالترتيب الدقيق الذي اخترته كصفحات في كتاب.</li>
                            <li><strong>سهولة الطباعة والمشاركة:</strong> معظم الجهات الحكومية والشركات تطلب المستندات بصيغة PDF فقط لأنها الأسهل في أرشفة والطباعة دون فقدان الهوامش.</li>
                            <li><strong>جودة لا تتغير:</strong> تطبيق الواتساب يقوم بضغط جودة الصور عند إرسالها بشكل فردي مما يصعّب قراءة النصوص عليها. دمج الصور في PDF يحافظ على جودتها عند الإرسال.</li>
                        </ul>

                        <h3>مميزات محول الـ PDF من "أدواتك"</h3>
                        <ol>
                            <li><strong>إعادة الترتيب التفاعلية (Drag & Drop):</strong> بعد رفع كل الصور، يمكنك مسك أي صورة بالماوس أو بإصبعك وسحبها لتغيير ترتيبها لتكون الصفحة الأولى أو الأخيرة كما تحب.</li>
                            <li><strong>تسمية سلسة للملف:</strong> يمكنك كتابة اسم مخصص لملف الـ PDF النهائي قبل تحميله ليكون منظماً على جهازك.</li>
                            <li><strong>أمان محلي 100%:</strong> نحن نعلم أن مستنداتك تحتوي على بيانات حساسة (مثل البطاقة أو جواز السفر أو القروض). أداتنا <strong>لا ترفع صورك للإنترنت أبداً</strong>. المتصفح الخاص بك هو من يقوم ببرمجة وتجميع الـ PDF داخلياً، مما يضمن سرية تامة.</li>
                            <li><strong>بدون حدود (Unlimited):</strong> على عكس المواقع البديلة التي تسمح لك بتحويل 5 أو 10 صور فقط لتدفع اشتراك، أداتنا تسمح لك بدمج عدد كبير من الصور مجاناً.</li>
                        </ol>
                    </>
                }
                faqs={[
                    {
                        question: "هل يمكنني دمج صور بصيغ مختلفة (JPG و PNG) معاً في نفس الـ PDF؟",
                        answer: "نعم بالتأكيد! يمكنك رفع مجموعة صور بصيغة JPG وصور أخرى بصيغة PNG، وستقوم الأداة بمعالجتها ودمجها معاً في ملف PDF واحد متناسق."
                    },
                    {
                        question: "هل دمج الصور يقلل من جودة المستند النهائي؟",
                        answer: "لا، الأداة تقوم بوضع الصور بكامل جودتها ودقتها الأصلية على صفحات مستند الـ PDF، لذا تأكد من أن الصور التي ترفعها واضحة من البداية."
                    },
                    {
                        question: "كيف أقوم بتعديل أو حذف صورة بعد دمجها؟",
                        answer: "بمجرد حفظ ملف الـ PDF لا يمكنك فك الدمج بسهولة هنا. لذا احرص على ترتيب و إزالة الصور غير المرغوب فيها عبر (علامة X الموجودة على سطح كل صورة) قبل الضغط على زر التصدير (تنزيل PDF)."
                    }
                ]}
                relatedTools={[
                    { title: "دمج ملفات PDF منفصلة", url: "/tools/pdf-merge" },
                    { title: "تصغير حجم صور المستند", url: "/tools/compress" },
                    { title: "استخراج النص من صورة المستند (OCR)", url: "/tools/ocr" },
                    { title: "حساب ضرائب الراتب (مصر)", url: "/tools/salary" },
                ]}
            />
        </PageLayout>
    );
}
