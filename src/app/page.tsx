import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { Calculator, Coins, CircleDollarSign, ImageDown, FileImage, DollarSign, CalendarClock, ImageIcon, Wallet, Hash, Layers, DownloadCloud, Type } from 'lucide-react';

const tools = [
  {
    id: 'currency',
    title: 'تحويل العملات',
    description: 'أسعار الصرف اللحظية لأهم العملات بخطوة واحدة',
    icon: DollarSign,
    path: '/tools/currency',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    shadow: 'rgba(13,148,136,0.25)',
    accent: '#0d9488',
  },
  {
    id: 'ocr',
    title: 'استخراج النص من الصور',
    description: 'حول أي صورة لنص مكتوب باللغة العربية والإنجليزية',
    icon: Type,
    path: '/tools/ocr',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
    shadow: 'rgba(56,189,248,0.25)',
    accent: '#38bdf8',
  },
  {
    id: 'downloader',
    title: 'تحميل الفيديوهات',
    description: 'تنزيل فيديوهات من يوتيوب وتيك توك بدون علامة مائية',
    icon: DownloadCloud,
    path: '/tools/downloader',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    shadow: 'rgba(139,92,246,0.25)',
    accent: '#8b5cf6',
  },
  {
    id: 'pdf-merge',
    title: 'دمج وتجميع الـ PDF',
    description: 'اجمع عدة مستندات في ملف واحد بأمان كامل',
    icon: Layers,
    path: '/tools/pdf-merge',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    shadow: 'rgba(225,29,72,0.25)',
    accent: '#e11d48',
  },
  {
    id: 'hashtags',
    title: 'مولد الهاشتاجات',
    description: 'هاشتاجات رائجة وجاهزة لزيادة المشاهدات',
    icon: Hash,
    path: '/tools/hashtags',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    shadow: 'rgba(236,72,153,0.25)',
    accent: '#ec4899',
  },
  {
    id: 'salary',
    title: 'حاسبة الراتب',
    description: 'احسب راتبك الصافي بدقة بعد الضرائب والتأمينات',
    icon: Wallet,
    path: '/tools/salary',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
    shadow: 'rgba(22,163,74,0.25)',
    accent: '#16a34a',
  },
  {
    id: 'age',
    title: 'حاسبة العمر',
    description: 'احسب عمرك بدقة ومتى موعد ميلادك القادم',
    icon: CalendarClock,
    path: '/tools/age',
    gradient: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
    shadow: 'rgba(217,70,239,0.25)',
    accent: '#d946ef',
  },
  {
    id: 'converter',
    title: 'تحويل صيغ الصور',
    description: 'حوّل صور WebP إلى JPG/PNG في ثوانٍ مجاناً',
    icon: ImageIcon,
    path: '/tools/image-converter',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    shadow: 'rgba(14,165,233,0.25)',
    accent: '#0ea5e9',
  },
  {
    id: 'installment',
    title: 'حاسبة التقسيط',
    description: 'احسب القسط الشهري لأي مبلغ بسهولة ودقة',
    icon: Calculator,
    path: '/tools/installment',
    gradient: 'linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 100%)',
    shadow: 'rgba(59,91,219,0.25)',
    accent: '#3b5bdb',
  },
  {
    id: 'zakat',
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
    title: 'حاسبة الذهب',
    description: 'تابع أسعار الذهب واحسب قيمة مدخراتك',
    icon: CircleDollarSign,
    path: '/tools/gold',
    gradient: 'linear-gradient(135deg, #e67700 0%, #f59f00 100%)',
    shadow: 'rgba(245,159,0,0.25)',
    accent: '#e67700',
  },
  {
    id: 'compress',
    title: 'ضغط الصور',
    description: 'صغّر حجم الصور بدون فقدان الجودة لتوفير المساحة',
    icon: ImageDown,
    path: '/tools/compress',
    gradient: 'linear-gradient(135deg, #7048e8 0%, #9775fa 100%)',
    shadow: 'rgba(112,72,232,0.25)',
    accent: '#7048e8',
  },
  {
    id: 'pdf',
    title: 'تحويل صور إلى PDF',
    description: 'ادمج مجموعة صور في ملف PDF واحد بضغطة زر',
    icon: FileImage,
    path: '/tools/pdf',
    gradient: 'linear-gradient(135deg, #e03131 0%, #f03e3e 100%)',
    shadow: 'rgba(224,49,49,0.25)',
    accent: '#e03131',
  },
];

export default function Home() {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <AdBanner />

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
              <span className="gradient-text">اليومية</span>
            </h1>
            <p className="text-lg md:text-xl max-w-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}>
              مجموعة أدوات مجانية وسريعة تسهّل مهامك. بسيطة، آمنة، بدون تسجيل دخول، ومصممة خصيصاً لتوفير وقتك.
            </p>
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

        {/* ── Tools Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.path}>
              <div className="group glass-card rounded-3xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-2"
                style={{ '--accent': tool.accent } as React.CSSProperties}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: tool.gradient, boxShadow: `0 8px 24px ${tool.shadow}` }}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                  {tool.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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

        <AdBanner className="mt-20" />
      </div>
    </PageLayout>
  );
}
