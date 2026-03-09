import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface PageProps {
    children?: React.ReactNode;
    className?: string;
}

export default function PageLayout({ children, className }: PageProps) {
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

            {/* ── Main ── */}
            <main className={cn('flex-1', className)}>
                {children}
            </main>

            {/* ── Footer ── */}
            <footer className="py-10" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
                    <p className="font-black text-base gradient-text">أدواتك</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        © {new Date().getFullYear()} — أدوات مجانية
                    </p>
                </div>
            </footer>
        </div>
    );
}
