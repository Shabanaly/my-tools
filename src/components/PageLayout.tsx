import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

interface PageProps {
    children?: React.ReactNode;
    className?: string;
    hideTopAd?: boolean;
}

export default function PageLayout({ children, className, hideTopAd }: PageProps) {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--hero-gradient)' }}>
            {/* ── Header ── */}
            <header className="sticky top-0 z-50" style={{
                background: 'rgba(248,249,255,0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(232,234,240,0.9)',
            }}>
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-blue-100 transition-transform group-hover:scale-110"
                            style={{ background: 'linear-gradient(135deg, #3b5bdb, #7048e8)' }}>
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black gradient-text tracking-tight">
                            أدواتك
                        </span>
                    </Link>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full"
                        style={{ background: 'rgba(59,91,219,0.08)', color: '#3b5bdb' }}>
                        مجاني بالكامل
                    </span>
                </div>
            </header>

            {!hideTopAd && (
                <div className="max-w-6xl mx-auto w-full px-6 pt-6 -mb-8">
                    <AdBanner />
                </div>
            )}

            {/* ── Main ── */}
            <main className={cn('flex-1', className)}>
                {children}
            </main>

            <div className="max-w-6xl mx-auto w-full px-6 pb-6 -mt-8 text-center">
                <AdBanner />
            </div>

            {/* ── Footer ── */}
            <footer className="py-12 bg-white mt-auto" style={{ borderTop: '1px solid rgba(232,234,240,0.8)' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #3b5bdb, #7048e8)' }}>
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-black gradient-text">أدواتك</span>
                        </div>

                        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                            <Link href="/about" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">من نحن</Link>
                            <Link href="/privacy" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">سياسة الخصوصية</Link>
                            <Link href="/terms" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">شروط الاستخدام</Link>
                            <Link href="/contact" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">اتصل بنا</Link>
                        </nav>
                    </div>

                    <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            © {new Date().getFullYear()} — جميع الحقوق محفوظة لموقع أدواتك
                        </p>
                        <p className="text-xs font-bold text-gray-400">
                            صنع بكل ❤️ لخدمة العالم العربي
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
