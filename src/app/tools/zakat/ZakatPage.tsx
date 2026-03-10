'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { Coins, ArrowLeft } from 'lucide-react';

export default function ZakatPage() {
    const [totalMoney, setTotalMoney] = useState('');
    const [goldPrice, setGoldPrice] = useState('8000');
    const [result, setResult] = useState<{
        zakatAmount: number;
        nisabAmount: number;
        isEligible: boolean;
    } | null>(null);

    const calculate = () => {
        const money = parseFloat(totalMoney);
        const gold = parseFloat(goldPrice);
        if (isNaN(money) || isNaN(gold)) return;
        const nisab = gold * 85;
        const isEligible = money >= nisab;
        setResult({ zakatAmount: isEligible ? money * 0.025 : 0, nisabAmount: nisab, isEligible });
    };

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#0ca678' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="p-8 pb-7 text-center text-white"
                        style={{ background: 'linear-gradient(135deg, #0ca678 0%, #20c997 100%)' }}>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <Coins className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-1">حاسبة الزكاة</h1>
                        <p className="text-green-50 text-sm font-medium">احسب زكاة مالك بسهولة وفقاً للضوابط الشرعية</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                    إجمالي المال (جنيه)
                                </label>
                                <input type="number" placeholder="100000" value={totalMoney}
                                    onChange={(e) => setTotalMoney(e.target.value)} className="input-field" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                    سعر جرام الذهب عيار 24 (لحساب النصاب)
                                </label>
                                <input type="number" placeholder="8000" value={goldPrice}
                                    onChange={(e) => setGoldPrice(e.target.value)} className="input-field" />
                                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                    * النصاب = 85 جرام ذهب عيار 24
                                </p>
                            </div>
                        </div>

                        <button onClick={calculate} className="btn-primary"
                            style={{
                                background: 'linear-gradient(135deg, #0ca678 0%, #20c997 100%)',
                                boxShadow: '0 8px 24px rgba(12,166,120,0.35)'
                            }}>
                            احسب الزكاة
                        </button>

                        {result && (
                            <div className="result-card" style={{
                                background: result.isEligible ? 'rgba(12,166,120,0.06)' : 'rgba(248,249,255,0.9)',
                                border: `1.5px solid ${result.isEligible ? 'rgba(12,166,120,0.15)' : 'var(--border)'}`
                            }}>
                                {result.isEligible ? (
                                    <>
                                        <p className="text-sm font-bold mb-2" style={{ color: '#0ca678' }}>مبلغ الزكاة الواجب</p>
                                        <p className="text-5xl font-black mb-1" style={{ color: '#0ca678' }}>
                                            {result.zakatAmount.toLocaleString('ar-EG', { maximumFractionDigits: 0 })}
                                        </p>
                                        <p className="text-sm font-bold" style={{ color: '#0ca678' }}>جنيه مصري</p>
                                        <p className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            تجاوز مالك حد النصاب ({result.nisabAmount.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} جنيه)
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-base font-medium py-4" style={{ color: 'var(--text-secondary)' }}>
                                        لم يبلغ مالك حد النصاب بعد ({result.nisabAmount.toLocaleString('ar-EG', { maximumFractionDigits: 0 })} جنيه). لا تجب الزكاة.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
