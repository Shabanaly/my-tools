import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { Calculator, Coins, CircleDollarSign, ImageDown, FileImage } from 'lucide-react';

const tools = [
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
        <div className="text-center mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: 'rgba(59,91,219,0.08)', color: '#3b5bdb', border: '1px solid rgba(59,91,219,0.15)' }}>
            ✨ أدوات مجانية بالكامل
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none"
            style={{ color: 'var(--text-primary)' }}>
            أدواتك{' '}
            <span className="gradient-text">اليومية</span>
          </h1>
          <p className="text-xl max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}>
            مجموعة أدوات مجانية وسريعة تسهّل مهامك. بسيطة، آمنة، بدون تسجيل دخول.
          </p>
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
