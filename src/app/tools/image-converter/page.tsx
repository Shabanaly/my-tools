import { Metadata } from 'next';
import ImageConverterPage from './ImageConverterPage';
import SEOArticle from '@/components/SEOArticle';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
    title: 'محول صيغ الصور اونلاين (WebP to JPG, PNG) | أدواتك',
    description: 'حوّل صورك بين مختلف الصيغ (WebP, JPG, PNG) بسهولة وبجودة عالية. أداة تحويل صور سريعة وآمنة تماماً حيث تتم المعالجة بالكامل داخل متصفحك.',
    keywords: [
        'تحويل صيغ الصور', 'WebP to JPG converter', 'تحويل الصور الى PNG',
        'محول صور اونلاين', 'تغيير صيغة الصورة', 'تحويل WebP الى JPG',
        'أدواتك', 'image format converter'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/image-converter',
    },
    openGraph: {
        title: 'محول صيغ الصور اونلاين (WebP/JPG/PNG) | أدواتك',
        description: 'حوّل صورك بين مختلف الصيغ بسهولة وبجودة عالية وبأمان تام على جهازك.',
        url: 'https://tools.daleel-al-suez.com/tools/image-converter',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "محول صيغ الصور الذكي",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة وآمنة للتحويل بين صيغ الصور المختلفة مثل WebP و JPG و PNG.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "تحويل WebP إلى JPG, تحويل WebP إلى PNG, تحويل JPG إلى PNG"
    };

    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ImageConverterPage />
            <SEOArticle
                title="محول صيغ الصور اونلاين - تحويل سريع ومجاني وعالي الجودة"
                content={
                    <>
                        <p>
                            هل تحتاج إلى تحويل صورة من PNG إلى JPG؟ أو ربما ترغب في استخدام أحدث صيغ الويب WEBP لتسريع موقعك؟ <strong>محول صيغ الصور</strong> من موقع "أدواتك" هو رفيقك المثالي للقيام بهذه المهمة في لحظات وبجودة فائقة.
                        </p>

                        <h3>لماذا تستخدم محول الصور الخاص بنا؟</h3>
                        <ul>
                            <li><strong>دعم كافة الصيغ الشائعة:</strong> يمكنك التحويل بين (JPG, PNG, WEBP, JPEG) والعديد من الصيغ الأخرى بسهولة تامة.</li>
                            <li><strong>التحويل الجماعي (Bulk Conversion):</strong> لا داعي لتحويل الصور واحدة تلو الأخرى. اختر مجموعة صور كاملة وقم بتحويلها جميعاً إلى الصيغة المطلوبة بضغطة زر واحدة.</li>
                            <li><strong>أعلى جودة ممكنة:</strong> المحول يحافظ على تفاصيل الصورة ودقة الألوان ولا يقوم بضغط الصورة بشكل مبالغ فيه إلا إذا طلبت ذلك، مما يضمن أفضل نتيجة بصرية.</li>
                            <li><strong>خصوصية لا مثيل لها:</strong> عملية التحويل تتم <strong>محلياً داخل متصفحك</strong>. صورك لا يتم رفعها لأي سيرفر، مما يعني أنها تظل آمنة ومحمية على جهازك الشخصي طوال الوقت.</li>
                        </ul>

                        <h3>كيف تقوم بتحويل صيغ الصور؟</h3>
                        <ol>
                            <li><strong>رفع الصور:</strong> اضغط على زر "اختيار صور" أو اسحب الصور لمساحة العمل.</li>
                            <li><strong>اختيار الصيغة المُستهدفة:</strong> حدد الصيغة التي تريد التحويل إليها (مثلاً JPG).</li>
                            <li><strong>بدء التحويل:</strong> فور التحديد، سيقوم المحول بمعالجة الصور في ثوانٍ.</li>
                            <li><strong>تحميل النتائج:</strong> يمكنك تحميل كل صورة منفصلة أو تحميل جميع الصور المحولة في ملف مضغوط واحد.</li>
                        </ol>
                    </>
                }
                faqs={[
                    {
                        question: "ما هي أفضل صيغة لاستخدامها في المواقع؟",
                        answer: "صيغة WEBP هي الأفضل حالياً للمواقع الإلكترونية لأنها توفر جودة عالية بحجم ملف صغير جداً مقارنة بـ JPG و PNG."
                    },
                    {
                        question: "هل يمكنني تحويل الصور إلى PDF هنا؟",
                        answer: "نحن نوفر أداة 'تحويل الصور إلى PDF' مخصصة لهذا الغرض، وهي الأنسب إذا كنت تريد تجميع عدة صور في مستند PDF واحد."
                    },
                    {
                        question: "هل التحويل مجاني ومحدود؟",
                        answer: "التحويل مجاني بالكامل 100% وبدون أي حدود لعدد الصور أو مرات الاستخدام يومياً."
                    }
                ]}
                relatedTools={[
                    { title: "تحويل الصور إلى PDF", url: "/tools/pdf" },
                    { title: "تغيير مقاس الصور", url: "/tools/resize" },
                    { title: "ضغط حجم الصور", url: "/tools/compress" },
                    { title: "اقتصاص الصور (Crop)", url: "/tools/crop" },
                ]}
            />
        </PageLayout>
    );
}
