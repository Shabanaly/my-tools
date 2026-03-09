'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { ArrowLeft, Wallet, MinusCircle, PlusCircle, Receipt, PieChart } from 'lucide-react';

export default function SalaryPage() {
    const [baseSalary, setBaseSalary] = useState('');
    const [allowances, setAllowances] = useState('');
    const [bonuses, setBonuses] = useState('');
    const [insurance, setInsurance] = useState('');
    const [taxes, setTaxes] = useState('');
    const [otherDeductions, setOtherDeductions] = useState('');

    const calculateSalary = () => {
        const base = parseFloat(baseSalary) || 0;
        const allow = parseFloat(allowances) || 0;
        const bns = parseFloat(bonuses) || 0;

        const ins = parseFloat(insurance) || 0;
        const tax = parseFloat(taxes) || 0;
        const otherDed = parseFloat(otherDeductions) || 0;

        const totalIncome = base + allow + bns;
        const totalDeductions = ins + tax + otherDed;
        const netSalary = totalIncome - totalDeductions;

        return {
            totalIncome,
            totalDeductions,
            netSalary: netSalary > 0 ? netSalary : 0,
            base,
            allow,
            bns,
            ins,
            tax,
            otherDed
        };
    };

    const result = calculateSalary();
    const isCalculated = result.totalIncome > 0;

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#16a34a' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8">
                    {/* Header */}
                    <div className="p-8 pb-7 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 backdrop-blur-sm shadow-inner">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-2 relative z-10">حاسبة الراتب الصافي</h1>
                        <p className="text-green-50 text-sm font-medium relative z-10">احسب راتبك الدقيق بعد إضافة البدلات وخصم الاستقطاعات</p>
                    </div>

                    {/* Form and Results Grid */}
                    <div className="p-6 md:p-8">

                        {/* Summary Result Banner - Fixed at top when calculations exist */}
                        {isCalculated && (
                            <div className="mb-8 p-6 rounded-2xl text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500"
                                style={{ background: 'rgba(22,163,74,0.06)', border: '1.5px solid rgba(22,163,74,0.15)' }}>
                                <div className="absolute top-0 right-0 w-full h-1 bg-green-500 rounded-t-2xl"></div>
                                <p className="text-sm font-bold mb-2 flex items-center justify-center gap-2 text-green-600">
                                    <Receipt className="w-4 h-4" /> الراتب الصافي النهائي (Net Salary)
                                </p>
                                <p className="text-5xl md:text-6xl font-black tabular-nums break-all text-green-600 mb-2">
                                    {result.netSalary.toLocaleString('ar-EG', { maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm font-bold opacity-80 text-green-600">عملة محلية</p>

                                <div className="mt-6 pt-5 border-t border-green-500/10 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm font-bold">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <PlusCircle className="w-4 h-4 text-green-500" />
                                        إجمالي الدخل: <span className="text-green-600 tabular-nums">{result.totalIncome.toLocaleString('ar-EG')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MinusCircle className="w-4 h-4 text-red-500" />
                                        إجمالي الخصومات: <span className="text-red-500 tabular-nums">{result.totalDeductions.toLocaleString('ar-EG')}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Incomes Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-black flex items-center gap-2 text-gray-800 pb-2 border-b border-gray-100">
                                    <PlusCircle className="w-5 h-5 text-green-500" />
                                    المستحقات (الدخل)
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold block text-gray-600">الراتب الأساسي</label>
                                        <input type="number" placeholder="مثال: 10000" value={baseSalary}
                                            onChange={(e) => setBaseSalary(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-green-400 transition-colors" min="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold block text-gray-600">بدلات (سكن، انتقال، إلخ)</label>
                                        <input type="number" placeholder="مثال: 2000" value={allowances}
                                            onChange={(e) => setAllowances(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-green-400 transition-colors" min="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold block text-gray-600">مكافآت (Bonuses)</label>
                                        <input type="number" placeholder="مثال: 1500" value={bonuses}
                                            onChange={(e) => setBonuses(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-green-400 transition-colors" min="0" />
                                    </div>
                                </div>
                            </div>

                            {/* Deductions Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-black flex items-center gap-2 text-gray-800 pb-2 border-b border-gray-100">
                                    <MinusCircle className="w-5 h-5 text-red-500" />
                                    الاستقطاعات (الخصومات)
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold block text-gray-600">تأمينات اجتماعية</label>
                                        <input type="number" placeholder="مثال: 500" value={insurance}
                                            onChange={(e) => setInsurance(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-red-400 transition-colors" min="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold block text-gray-600">ضرائب الدخل</label>
                                        <input type="number" placeholder="مثال: 1200" value={taxes}
                                            onChange={(e) => setTaxes(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-red-400 transition-colors" min="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold block text-gray-600">خصومات أخرى</label>
                                        <input type="number" placeholder="مثال: 300" value={otherDeductions}
                                            onChange={(e) => setOtherDeductions(e.target.value)}
                                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-red-400 transition-colors" min="0" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 mb-8 text-sm leading-relaxed text-gray-500 text-center flex items-start sm:items-center gap-4 bg-blue-50/30 border border-blue-100/50">
                    <PieChart className="w-8 h-8 text-blue-400 shrink-0" />
                    <p className="text-start">
                        <strong>كيف تعمل هذه الحاسبة؟</strong> تقوم بجمع كافة المستحقات (الراتب الأساسي + البدلات والمكافآت) وتطرح منها كافة الاستقطاعات (التأمينات والضرائب والخصومات الأخرى) لتعطيك مبلغ <strong>الراتب الصافي</strong> الذي ستستلمه فعلياً.
                    </p>
                </div>

                <AdBanner />
            </div>
        </PageLayout>
    );
}
