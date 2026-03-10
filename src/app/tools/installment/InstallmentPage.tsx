'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, CreditCard, Calendar, BarChart3, TrendingUp, Info } from 'lucide-react';

export default function InstallmentPage() {
    const [amount, setAmount] = useState('');
    const [months, setMonths] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [result, setResult] = useState<{
        monthlyPayment: number;
        totalAmount: number;
        totalInterest: number;
    } | null>(null);

    const calculate = () => {
        const principal = parseFloat(amount);
        const period = parseInt(months);
        const rate = parseFloat(interestRate) / 100;
        if (isNaN(principal) || isNaN(period) || isNaN(rate)) return;
        const totalInterest = principal * rate * (period / 12);
        const totalAmount = principal + totalInterest;
        const monthlyPayment = totalAmount / period;
        setResult({
            monthlyPayment: Math.round(monthlyPayment * 100) / 100,
            totalAmount: Math.round(totalAmount * 100) / 100,
            totalInterest: Math.round(totalInterest * 100) / 100,
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                style={{ color: '#3b5bdb' }}>
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
            </Link>

            <div className="glass-card rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="p-8 pb-7 text-center text-white"
                    style={{ background: 'linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 100%)' }}>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black mb-1">حاسبة التقسيط</h1>
                    <p className="text-blue-100 text-sm font-medium">احسب القسط الشهري وإجمالي المبلغ بدقة</p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                المبلغ الأصلي (جنيه)
                            </label>
                            <input type="number" placeholder="50000" value={amount}
                                onChange={(e) => setAmount(e.target.value)} className="input-field" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                عدد الأشهر
                            </label>
                            <input type="number" placeholder="12" value={months}
                                onChange={(e) => setMonths(e.target.value)} className="input-field" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                نسبة الفائدة السنوية (%)
                            </label>
                            <input type="number" placeholder="15" value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)} className="input-field" />
                        </div>
                    </div>

                    <button onClick={calculate} className="btn-primary"
                        style={{
                            background: 'linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 100%)',
                            boxShadow: '0 8px 24px rgba(59,91,219,0.35)'
                        }}>
                        احسب الآن
                    </button>

                    {result && (
                        <div className="result-card" style={{ background: 'rgba(59,91,219,0.06)', border: '1.5px solid rgba(59,91,219,0.12)' }}>
                            <p className="text-sm font-bold mb-2" style={{ color: '#3b5bdb' }}>القسط الشهري</p>
                            <p className="text-5xl font-black mb-1" style={{ color: '#3b5bdb' }}>
                                {result.monthlyPayment.toLocaleString('ar-EG')}
                            </p>
                            <p className="text-sm font-bold mb-6" style={{ color: '#3b5bdb' }}>جنيه / شهر</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'إجمالي الفائدة', value: result.totalInterest },
                                    { label: 'إجمالي المبلغ', value: result.totalAmount },
                                ].map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                        <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                                        <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                                            {item.value.toLocaleString('ar-EG')} ج
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
