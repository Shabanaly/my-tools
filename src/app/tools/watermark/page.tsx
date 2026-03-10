import { Metadata } from 'next';
import WatermarkApp from './WatermarkApp';
import SEOArticle from '@/components/SEOArticle';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
    title: 'إضافة علامة مائية للصور اونلاين (Watermark) | أدواتك',
    description: 'احمِ حقوق صورك بإضافة علامة مائية (نص أو شعار) بسهولة وسرعة. أداة مجانية واحترافية تعمل بالكامل داخل متصفحك لضمان أقصى درجات الخصوصية.',
    keywords: [
        'إضافة علامة مائية للصور', 'Watermark online free', 'حماية حقوق الصور',
        'وضع شعار على الصور', 'إضافة نص للصور اونلاين', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/watermark',
    },
    openGraph: {
        title: 'إضافة علامة مائية للصور اونلاين مجاناً وباحترافية | أدواتك',
        description: 'أضف نصاً أو شعاراً كعلامة مائية لصورك بسهولة وقم بحماية حقوقك بضغطة زر.',
        url: 'https://tools.daleel-al-suez.com/tools/watermark',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة العلامة المائية",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة مجانية وسريعة لحماية الصور بإضافة علامات مائية نصية أو صورية.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "إضافة شعار، إضافة نصوص، معالجة على المتصفح"
    };

    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WatermarkApp />
            <SEOArticle
                title="أداة إضافة علامة مائية للصور اونلاين مجاناً وبسهولة"
                content={
                    <>
                        <p>
                            هل تخشى سرقة صورك وتصاميمك الأصلية عند نشرها على الإنترنت؟ توفر لك أداة <strong>إضافة العلامة المائية (Watermark)</strong> من "أدواتك" حماية فورية لمحتواك. يمكنك إضافة نصوص أو شعارات (Logos) فوق صورك بلمسة احترافية لضمان حفظ حقوقك الملكية ومنع الاستخدام غير المصرح به.
                        </p>

                        <h3>مزايا أداة "أدواتك" لحماية الصور</h3>
                        <ul>
                            <li><strong>خيارات متعددة (نص أو صورة):</strong> يمكنك كتابة اسمك أو اسم شركتك كعلامة مائية نصية، أو رفع شعار (Logo) شفاف ووضعه في أي مكان على الصورة.</li>
                            <li><strong>تحكم كامل في المظهر:</strong> تحكم في مستوى الشفافية (Opacity)، الحجم، اللون، وحتى الزاوية (Rotation) ليكون ظهور العلامة المائية متناسقاً ولا يفسد جمال الصورة.</li>
                            <li><strong>التكرار الذكي (Tile):</strong> إذا كنت تخشى قص العلامة المائية، يمكنك تكرارها بنمط مائل يغطي كامل الصورة كحماية إضافية.</li>
                            <li><strong>خصوصية 100%:</strong> كبقية أدواتنا، تتم المعالجة بالكامل <strong>داخل متصفحك</strong>. لا يتم رفع صورك لشعاراتك لأي مكان، فما يتم على جهازك يظل على جهازك.</li>
                        </ul>

                        <h3>كيف تستخدم أداة وضع العلامة المائية؟</h3>
                        <ol>
                            <li><strong>رفع الصورة:</strong> ابدأ برفع الصورة الأصلية التي تريد حمايتها.</li>
                            <li><strong>تخصيص العلامة المائية:</strong>
                                <ul>
                                    <li><strong>نصية:</strong> اكتب النص، اختر الخط والحجم واللون ومستوى الشفافية.</li>
                                    <li><strong>صورة (Logo):</strong> ارفع شعارك وقم بضبط مكانه وحجمه فوق الصورة الأصلية.</li>
                                </ul>
                            </li>
                            <li><strong>المعاينة والحفظ:</strong> شاهد النتيجة مباشرة في مساحة العمل، وإذا أعجبتك، اضغط تحميل لتحصل عليها فوراً بجودتها العالية.</li>
                        </ol>
                    </>
                }
                faqs={[
                    {
                        question: "هل يمكنني إزالة العلامة المائية لاحقاً؟",
                        answer: "هذه الأداة تقوم بـ 'دمج' العلامة المائية في الصورة لجعلها جزءاً منها. يُنصح دائماً بالاحتفاظ بنسخة من الصورة الأصلية بدون علامة مائية قبل البدء."
                    },
                    {
                        question: "ما هي أفضل شفافية للعلامة المائية؟",
                        answer: "للمحترفين، يُفضل استخدام شفافية تتراوح بين 20% إلى 40%. هذا يجعلها ظاهرة بما يكفي لحماية الحقوق، وغير مزعجة للعين عند مشاهدة الصورة."
                    },
                    {
                        question: "هل تدعم الأداة اللغة العربية في النصوص؟",
                        answer: "نعم، تدعم الأداة إدراج النصوص باللغة العربية والإنجليزية وبأنواع خطوط واضحة ومتنوعة."
                    }
                ]}
                relatedTools={[
                    { title: "تغيير مقاسات الصور", url: "/tools/resize" },
                    { title: "صانع الميمز (Meme Maker)", url: "/tools/meme" },
                    { title: "تحويل الصور إلى PDF", url: "/tools/pdf" },
                    { title: "استخراج النص من الصور", url: "/tools/ocr" },
                ]}
            />
        </PageLayout>
    );
}
