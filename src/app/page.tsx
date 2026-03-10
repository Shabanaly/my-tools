import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import {
  Calculator, Coins, CircleDollarSign, ImageDown, FileImage,
  DollarSign, CalendarClock, ImageIcon, Wallet, Hash, Layers,
  DownloadCloud, Type, Maximize, Crop, Scissors, LayoutGrid,
  SmilePlus, Image as ImageIconLucide, CreditCard, FileText,
  Sparkles, MousePointer2
} from 'lucide-react';

const tools = [
  // 🖼️ أدوات الصور
  {
    id: 'remove-bg',
    category: 'images',
    title: 'إزالة الخلفية بالذكاء الاصطناعي',
    description: 'أزل خلفية الصور بدقة فائقة بدون رفع الصورة لأي سيرفر بدعم AI',
    icon: Scissors,
    path: '/tools/remove-bg',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    shadow: 'rgba(16,185,129,0.25)',
    accent: '#10b981',
  },
  {
    id: 'resize',
    category: 'images',
    title: 'تغيير حجم الصور',
    description: 'غيّر أبعاد صورك بدقة وسهولة لتناسب أي منصة',
    icon: Maximize,
    path: '/tools/resize',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    shadow: 'rgba(14,165,233,0.25)',
    accent: '#0ea5e9',
  },
  {
    id: 'crop',
    category: 'images',
    title: 'قص الصور',
    description: 'حدد الجزء الذي تريده من صورتك واقطع الباقي بدقة',
    icon: Crop,
    path: '/tools/crop',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    shadow: 'rgba(245,158,11,0.25)',
    accent: '#f59e0b',
  },
  {
    id: 'compress',
    category: 'images',
    title: 'ضغط الصور',
    description: 'صغّر حجم الصور بدون فقدان الجودة لتوفير المساحة',
    icon: ImageDown,
    path: '/tools/compress',
    gradient: 'linear-gradient(135deg, #7048e8 0%, #9775fa 100%)',
    shadow: 'rgba(112,72,232,0.25)',
    accent: '#7048e8',
  },
  {
    id: 'watermark',
    category: 'images',
    title: 'إضافة علامة مائية',
    description: 'احمِ حقوق صورك بإضافة نص أو شعار كعلامة مائية بسهولة',
    icon: LayoutGrid,
    path: '/tools/watermark',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    shadow: 'rgba(14,165,233,0.25)',
    accent: '#0ea5e9',
  },
  {
    id: 'meme',
    category: 'images',
    title: 'صانع الميمز',
    description: 'اصنع ميمز مضحكة واحترافية بسهولة وشاركها مع أصدقائك',
    icon: SmilePlus,
    path: '/tools/meme',
    gradient: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)',
    shadow: 'rgba(217,70,239,0.25)',
    accent: '#d946ef',
  },
  {
    id: 'converter',
    category: 'images',
    title: 'تحويل صيغ الصور',
    description: 'حوّل صور WebP إلى JPG/PNG في ثوانٍ مجاناً',
    icon: ImageIcon,
    path: '/tools/image-converter',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    shadow: 'rgba(14,165,233,0.25)',
    accent: '#0ea5e9',
  },
  {
    id: 'ocr',
    category: 'content',
    title: 'استخراج النص من الصور',
    description: 'حول أي صورة لنص مكتوب باللغة العربية والإنجليزية',
    icon: Type,
    path: '/tools/ocr',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
    shadow: 'rgba(56,189,248,0.25)',
    accent: '#38bdf8',
  },

  // 💰 أدوات مالية
  {
    id: 'installment',
    category: 'financial',
    title: 'حاسبة التقسيط',
    description: 'احسب القسط الشهري لأي مبلغ بسهولة ودقة',
    icon: Calculator,
    path: '/tools/installment',
    gradient: 'linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 100%)',
    shadow: 'rgba(59,91,219,0.25)',
    accent: '#3b5bdb',
  },
  {
    id: 'currency',
    category: 'financial',
    title: 'تحويل العملات',
    description: 'أسعار الصرف اللحظية لأهم العملات بخطوة واحدة',
    icon: DollarSign,
    path: '/tools/currency',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    shadow: 'rgba(13,148,136,0.25)',
    accent: '#0d9488',
  },
  {
    id: 'zakat',
    category: 'financial',
    title: 'حاسبة الزكاة',
    description: 'احسب زكاة مالك وفقاً للشريعة الإسلامية',
    icon: Coins,
    path: '/tools/zakat',
    gradient: 'linear-gradient(135deg, #0ca678 0%, #20c997 100%)',
    shadow: 'rgba(12,166,120,0.25)',
    accent: '#0ca678',
  },
  {
    id: 'gold',
    category: 'financial',
    title: 'حاسبة الذهب',
    description: 'تابع أسعار الذهب واحسب قيمة مدخراتك',
    icon: CircleDollarSign,
    path: '/tools/gold',
    gradient: 'linear-gradient(135deg, #e67700 0%, #f59f00 100%)',
    shadow: 'rgba(245,159,0,0.25)',
    accent: '#e67700',
  },
  {
    id: 'salary',
    category: 'financial',
    title: 'حاسبة الراتب',
    description: 'احسب راتبك الصافي بدقة بعد الضرائب والتأمينات',
    icon: Wallet,
    path: '/tools/salary',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
    shadow: 'rgba(22,163,74,0.25)',
    accent: '#16a34a',
  },

  // 📂 أدوات الملفات والمحتوى
  {
    id: 'pdf',
    category: 'content',
    title: 'تحويل صور إلى PDF',
    description: 'ادمج مجموعة صور في ملف PDF واحد بضغطة زر',
    icon: FileImage,
    path: '/tools/pdf',
    gradient: 'linear-gradient(135deg, #e03131 0%, #f03e3e 100%)',
    shadow: 'rgba(224,49,49,0.25)',
    accent: '#e03131',
  },
  {
    id: 'pdf-merge',
    category: 'content',
    title: 'دمج وتجميع الـ PDF',
    description: 'اجمع عدة مستندات في ملف واحد بأمان كامل',
    icon: Layers,
    path: '/tools/pdf-merge',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    shadow: 'rgba(225,29,72,0.25)',
    accent: '#e11d48',
  },
  {
    id: 'downloader',
    category: 'content',
    title: 'تحميل الفيديوهات',
    description: 'تنزيل فيديوهات من يوتيوب وتيك توك بدون علامة مائية',
    icon: DownloadCloud,
    path: '/tools/downloader',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    shadow: 'rgba(139,92,246,0.25)',
    accent: '#8b5cf6',
  },
  {
    id: 'hashtags',
    category: 'content',
    title: 'مولد الهاشتاجات',
    description: 'هاشتاجات رائجة وجاهزة لزيادة المشاهدات',
    icon: Hash,
    path: '/tools/hashtags',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    shadow: 'rgba(236,72,153,0.25)',
    accent: '#ec4899',
  },
  {
    id: 'age',
    category: 'content',
    title: 'حاسبة العمر',
    description: 'احسب عمرك بدقة ومتى موعد ميلادك القادم',
    icon: CalendarClock,
    path: '/tools/age',
    gradient: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
    shadow: 'rgba(217,70,239,0.25)',
    accent: '#d946ef',
  },
];

const categories = [
  { id: 'images', title: 'أدوات الصور', icon: ImageIconLucide, color: '#10b981' },
  { id: 'financial', title: 'الأدوات المالية', icon: CreditCard, color: '#3b5bdb' },
  { id: 'content', title: 'أدوات الملفات والمحتوى', icon: FileText, color: '#8b5cf6' },
];

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "أدواتك",
      "url": "https://tools.daleel-al-suez.com",
      "description": "أرقى وأسرع مجموعة أدوات مجانية وقوية للمهنيين والمستخدمين في مصر والوطن العربي.",
      "inLanguage": "ar",
      "publisher": {
        "@type": "Organization",
        "name": "أدواتك",
        "url": "https://tools.daleel-al-suez.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tools.daleel-al-suez.com/icon.svg"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "أدوات أدواتك المجانية",
      "description": "مجموعة أدوات مجانية لمعالجة الصور، تحويل الملفات، والحسابات المالية",
      "numberOfItems": 19,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "إزالة الخلفية بالذكاء الاصطناعي", "url": "https://tools.daleel-al-suez.com/tools/remove-bg" },
        { "@type": "ListItem", "position": 2, "name": "تغيير حجم الصور", "url": "https://tools.daleel-al-suez.com/tools/resize" },
        { "@type": "ListItem", "position": 3, "name": "قص الصور", "url": "https://tools.daleel-al-suez.com/tools/crop" },
        { "@type": "ListItem", "position": 4, "name": "ضغط الصور", "url": "https://tools.daleel-al-suez.com/tools/compress" },
        { "@type": "ListItem", "position": 5, "name": "إضافة علامة مائية", "url": "https://tools.daleel-al-suez.com/tools/watermark" },
        { "@type": "ListItem", "position": 6, "name": "صانع الميمز", "url": "https://tools.daleel-al-suez.com/tools/meme" },
        { "@type": "ListItem", "position": 7, "name": "تحويل صيغ الصور", "url": "https://tools.daleel-al-suez.com/tools/image-converter" },
        { "@type": "ListItem", "position": 8, "name": "استخراج النص من الصور (OCR)", "url": "https://tools.daleel-al-suez.com/tools/ocr" },
        { "@type": "ListItem", "position": 9, "name": "حاسبة التقسيط", "url": "https://tools.daleel-al-suez.com/tools/installment" },
        { "@type": "ListItem", "position": 10, "name": "تحويل العملات", "url": "https://tools.daleel-al-suez.com/tools/currency" },
        { "@type": "ListItem", "position": 11, "name": "حاسبة الزكاة", "url": "https://tools.daleel-al-suez.com/tools/zakat" },
        { "@type": "ListItem", "position": 12, "name": "حاسبة الذهب", "url": "https://tools.daleel-al-suez.com/tools/gold" },
        { "@type": "ListItem", "position": 13, "name": "حاسبة الراتب المصري", "url": "https://tools.daleel-al-suez.com/tools/salary" },
        { "@type": "ListItem", "position": 14, "name": "تحويل صور إلى PDF", "url": "https://tools.daleel-al-suez.com/tools/pdf" },
        { "@type": "ListItem", "position": 15, "name": "دمج وتجميع الـ PDF", "url": "https://tools.daleel-al-suez.com/tools/pdf-merge" },
        { "@type": "ListItem", "position": 16, "name": "تحميل الفيديوهات", "url": "https://tools.daleel-al-suez.com/tools/downloader" },
        { "@type": "ListItem", "position": 17, "name": "مولد الهاشتاجات", "url": "https://tools.daleel-al-suez.com/tools/hashtags" },
        { "@type": "ListItem", "position": 18, "name": "حاسبة العمر", "url": "https://tools.daleel-al-suez.com/tools/age" },
      ]
    }
  ];

  return (
    <PageLayout hideTopAd={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Hero ── */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12 mt-12">
          {/* Text Content */}
          <div className="text-start space-y-6 flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-2 w-fit"
              style={{ background: 'rgba(59,91,219,0.08)', color: '#3b5bdb', border: '1px solid rgba(59,91,219,0.15)' }}>
              ✨ أدوات مجانية بالكامل
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight"
              style={{ color: 'var(--text-primary)' }}>
              أدواتك{' '}
              <br className="hidden md:block" />
              <span className="gradient-text">الذكية والمجانية</span>
            </h1>
            <h2 className="text-lg md:text-xl max-w-lg leading-relaxed font-bold"
              style={{ color: 'var(--text-secondary)' }}>
              أسرع مجموعة أدوات اونلاين في مصر والوطن العربي. بسيطة، آمنة، بدون تسجيل دخول، ومصممة خصيصاً لتوفير وقتك في معالجة الصور والملفات والحسابات المالية.
            </h2>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative flex justify-center hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-100/40 to-purple-100/40 blur-3xl rounded-full scale-75 -z-10"></div>
            <Image
              src="/hero-illustration.png"
              alt="أدواتك اليومية - حاسبات وتحويل ملفات"
              width={500}
              height={500}
              className="w-full max-w-[400px] md:max-w-[500px] object-contain drop-shadow-2xl saturate-125"
              priority
            />
          </div>
        </div>

        {/* ── Tools by Category ── */}
        {categories.map((cat) => (
          <section key={cat.id} className="mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100" style={{ color: cat.color }}>
                <cat.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800 mb-1">{cat.title}</h2>
                <div className="h-1.5 w-12 rounded-full" style={{ background: cat.color }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(t => t.category === cat.id).map((tool) => (
                <Link key={tool.id} href={tool.path}>
                  <div className="group glass-card rounded-3xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
                    style={{ '--accent': tool.accent } as React.CSSProperties}>
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0"
                      style={{ background: tool.gradient, boxShadow: `0 8px 24px ${tool.shadow}` }}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                      {tool.title}
                    </h3>
                    <p className="text-base leading-relaxed grow" style={{ color: 'var(--text-secondary)' }}>
                      {tool.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-3"
                      style={{ color: tool.accent }}>
                      استخدم الآن
                      <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* ── AI Visibility Section (Semantic for LLMs) ── */}
        <section className="mt-24 p-8 glass-card rounded-3xl border-dashed border-2 border-blue-100 bg-blue-50/20">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-600">
            <Sparkles className="w-6 h-6" />
            لماذا يفضل المحترفون موقع "أدواتك"؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-gray-600">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">سرعة فائقة وخصوصية كاملة</h3>
              <p>تتم معظم عمليات معالجة الصور وتحويل الملفات داخل متصفحك مباشرة (Client-side)، مما يعني أن بياناتك لا ترفع إلى خوادم خارجية، مما يضمن أقصى درجات الأمان والخصوصية السرعة.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">مصمم خصيصاً للمنطقة العربية</h3>
              <p>ندعم جميع الحسابات المالية الخاصة بالسوق المصري والعربي مثل حاسبة المرتبات المصرية، أسعار الذهب اللحظية، والتقسيط بما يتوافق مع الاحتياجات المحلية.</p>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
