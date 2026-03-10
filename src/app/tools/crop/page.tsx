import { Metadata } from 'next';
import CropperApp from './CropperApp';
import SEOArticle from '@/components/SEOArticle';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
    title: 'قص الصور اونلاين مجاناً (Image Cropper) | أدواتك',
    description: 'أداة قص الصور الاحترافية. حدد الأبعاد التي تريدها أو استخدم المقاسات الجاهزة (1:1, 16:9) وقص صورك بدقة فائقة وبشخصية آمنة تماماً على جهازك.',
    keywords: [
        'قص الصور اونلاين', 'اقتصاص الصور', 'Image Cropper free',
        'تعديل ابعاد الصور', 'قص الصور بجودة عالية', 'أدواتك'
    ],
    alternates: {
        canonical: 'https://tools.daleel-al-suez.com/tools/crop',
    },
    openGraph: {
        title: 'قص الصور اونلاين بدقة فائقة وبأمان | أدواتك',
        description: 'أداة بسيطة واحترافية لقص صورك بالمقاسات التي تريدها وبدون رفعها لأي سيرفر.',
        url: 'https://tools.daleel-al-suez.com/tools/crop',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "أداة قص الصور",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "description": "أداة سريعة لقص الصور وتغيير أبعادها داخل المتصفح مع الحفاظ على الجودة.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EGP"
        },
        "featureList": "اقتصاص حر، أبعاد ثابتة، حفظ بجودة عالية"
    };

    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CropperApp />
            <SEOArticle
                title="أداة قص الصور الاحترافية (Image Cropper) مجاناً وبدون تسريب لبياناتك"
                content={
                    <>
                        <p>
                            هل التقطت صورة رائعة ولكن يوجد بها أجزاء غير مرغوب فيها على الجوانب؟ تتيح لك أداة <strong>قص الصور (Crop Image)</strong> من "أدواتك" اقتطاع الأجزاء الزائدة من صورتك بكل سهولة وسرعة، وبشكل مجاني تماماً.
                        </p>

                        <h3>لماذا نستخدم أداة قص الصور؟</h3>
                        <p>
                            يعتبر قص الصور (Cropping) من أهم وأكثر أدوات التعديل استخداماً، وذلك لعدة أسباب جوهرية:
                        </p>
                        <ul>
                            <li><strong>التركيز على الهدف الأساسي (Focus):</strong> في كثير من الأحيان نلتقط صورة وتحتوي الخلفية أو الأطراف على عناصر تشتت الانتباه. قص الصورة يساعدك على إبراز الشخص أو الشيء الأهم في إطار الصورة.</li>
                            <li><strong>تحسين التكوين (Composition):</strong> يمكنك استخدام الأداة لتطبيق "قاعدة الأثلاث" أو تصحيح وضعية الصورة إذا تم التقاطها بشكل مائل أو غير متناسق.</li>
                            <li><strong>التوافق مع السوشيال ميديا:</strong> إنستجرام يحتاج صور مربعة (1:1) أو (4:5)، يوتيوب يحتاج صور عرضية (16:9) للغلاف المصغر. أداتنا توفر لك هذه المقاسات الجاهزة بضغطة زر لضمان عدم اقتصاص الصورة بشكل عشوائي عند رفعها.</li>
                        </ul>

                        <h3>مميزات أداة قص الصور من "أدواتك"</h3>
                        <ul>
                            <li><strong>نسب المربع (Aspect Ratios) جاهزة:</strong> لا داعي للقلق حول الحسابات المعقدة. اختر من قائمة النسب الجاهزة (1:1, 4:3, 16:9) أو اختر (Free) للقص الحر المخصص بالماوس.</li>
                            <li><strong>معالجة بنسبة 100% على جهازك:</strong> نحن نحترم خصوصيتك. عندما تضغط على "حفظ الصورة المقصوصة"، يتم القص والمعالجة محلياً داخل متصفحك. لا يتم رفع صورتك لأي موقع أو سيرفر.</li>
                            <li><strong>جودة التصدير الفائقة:</strong> عملية القص لا تقلل من جودة أو دقة الألوان الأصلية للصورة، فالصورة الناتجة تظل نقية وعالية الجودة.</li>
                            <li><strong>واجهة بسيطة وتفاعلية:</strong> يمكنك التكبير (Zoom) والتصغير بالسحب المباشر لاختيار الجزء الدقيق الذي تريد الحفاظ عليه.</li>
                        </ul>
                    </>
                }
                faqs={[
                    {
                        question: "هل القص الحر يقلل من جودة الصورة؟",
                        answer: "لا، عملية القص (Cropping) بحد ذاتها لا تبطئ أو تقلل جودة البكسلات المتبقية في الصورة. هي ببساطة تقوم بمسح الحواف الزائدة التي حددتها مع الاحتفاظ بنفس الدقة للجزء المُقتطع."
                    },
                    {
                        question: "كيف يمكنني قص الصورة بشكل دائري؟",
                        answer: "حالياً الأداة تدعم القص المربع والمستطيل بنسب مختلفة. للحصول على قص دائري، ننصح بقص الصورة بشكل مربع (1:1) أولاً هنا، ثم استخدامها في تطبيقات أو مواقع تدعم الإطارات الدائرية."
                    },
                    {
                        question: "ما هي صيغ الصور التي أدعمها لعملية القص؟",
                        answer: "تدعم أداتنا جميع الصيغ الشائعة بلا استثناء مثل (JPG, PNG, WEBP, JPEG)."
                    }
                ]}
                relatedTools={[
                    { title: "أداة تغيير الأبعاد (Resize)", url: "/tools/resize" },
                    { title: "تصغير حجم الصورة (Compress)", url: "/tools/compress" },
                    { title: "تحويل صور Webp إلى JPG", url: "/tools/image-converter" },
                    { title: "إزالة خلفية الصورة", url: "/tools/remove-bg" },
                ]}
            />
        </PageLayout>
    );
}
