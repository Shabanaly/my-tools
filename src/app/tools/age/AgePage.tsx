'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { ArrowLeft, User, CalendarDays, Clock, Heart } from 'lucide-react';

export default function AgePage() {
    const [birthDate, setBirthDate] = useState('');
    const [result, setResult] = useState<{
        years: number;
        months: number;
        days: number;
        nextBirthdayDays: number;
        nextBirthdayMonths: number;
        totalDays: number;
        totalWeeks: number;
        totalMonths: number;
    } | null>(null);

    const calculateAge = () => {
        if (!birthDate) return;

        const dob = new Date(birthDate);
        const now = new Date();

        if (dob > now) {
            alert('تاريخ الميلاد لا يمكن أن يكون في المستقبل!');
            return;
        }

        // Calculate precise age
        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            // Get days in the previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate next birthday
        let nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
        if (now > nextBday) {
            nextBday.setFullYear(now.getFullYear() + 1);
        }
        const diffTimeNextBday = Math.abs(nextBday.getTime() - now.getTime());
        const diffDaysNextBday = Math.ceil(diffTimeNextBday / (1000 * 60 * 60 * 24));
        const nextBdayMonths = Math.floor(diffDaysNextBday / 30);
        const nextBdayDaysLeft = diffDaysNextBday % 30;

        // Total stats
        const diffTimeTotal = Math.abs(now.getTime() - dob.getTime());
        const totalDays = Math.ceil(diffTimeTotal / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = (years * 12) + months;

        setResult({
            years,
            months,
            days,
            nextBirthdayMonths: nextBdayMonths,
            nextBirthdayDays: nextBdayDaysLeft,
            totalDays,
            totalWeeks,
            totalMonths
        });
    };

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#d946ef' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8">
                    {/* Header */}
                    <div className="p-8 pb-7 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)' }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 backdrop-blur-sm">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-2 relative z-10">حاسبة العمر الدقيقة</h1>
                        <p className="text-fuchsia-100 text-sm font-medium relative z-10">تعرف على تفاصيل عمرك بالسنوات، الشهور، الأيام</p>
                    </div>

                    {/* Form */}
                    <div className="p-8 space-y-8">
                        <div className="space-y-3">
                            <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                أدخل تاريخ ميلادك
                            </label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-xl font-bold focus:outline-none focus:border-fuchsia-400 transition-colors"
                                style={{ color: 'var(--text-primary)' }}
                            />
                        </div>

                        <button onClick={calculateAge} className="btn-primary w-full"
                            style={{
                                background: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
                                boxShadow: '0 8px 24px rgba(217,70,239,0.3)',
                                padding: '16px',
                                fontSize: '1.1rem'
                            }}>
                            احسب عمري
                        </button>

                        {/* Result Section */}
                        {result && (
                            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                {/* Main Age */}
                                <div className="result-card text-center relative overflow-hidden"
                                    style={{ background: 'rgba(217,70,239,0.05)', border: '1.5px solid rgba(217,70,239,0.15)' }}>

                                    <h3 className="text-sm font-bold mb-6 text-fuchsia-600">عمرك الحالي هو</h3>

                                    <div className="flex justify-center items-center gap-4 md:gap-8 rtl:flex-row-reverse text-fuchsia-600">
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl md:text-5xl font-black">{result.years}</span>
                                            <span className="text-sm font-bold mt-1 opacity-80">سنة</span>
                                        </div>
                                        <span className="text-3xl font-light opacity-30">:</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl md:text-5xl font-black">{result.months}</span>
                                            <span className="text-sm font-bold mt-1 opacity-80">شهر</span>
                                        </div>
                                        <span className="text-3xl font-light opacity-30">:</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl md:text-5xl font-black">{result.days}</span>
                                            <span className="text-sm font-bold mt-1 opacity-80">يوم</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Extra Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Next Birthday */}
                                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                                            <CalendarDays className="w-5 h-5 text-pink-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-1">عيد ميلادك القادم</p>
                                            <p className="font-black text-lg text-gray-800">
                                                {result.nextBirthdayMonths > 0 && `${result.nextBirthdayMonths} شهور و `}
                                                {result.nextBirthdayDays} أيام
                                            </p>
                                        </div>
                                    </div>

                                    {/* Total Lived */}
                                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-1">إجمالي الأيام</p>
                                            <p className="font-black text-lg text-gray-800">
                                                {result.totalDays.toLocaleString('ar-EG')} <span className="text-sm font-medium">يوم</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                                            <Heart className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-1">إجمالي الأسابيع</p>
                                            <p className="font-black text-lg text-gray-800">
                                                {result.totalWeeks.toLocaleString('ar-EG')} <span className="text-sm font-medium">أسبوع</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                            <User className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-1">إجمالي الشهور</p>
                                            <p className="font-black text-lg text-gray-800">
                                                {result.totalMonths.toLocaleString('ar-EG')} <span className="text-sm font-medium">شهر</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <AdBanner />
            </div>
        </PageLayout>
    );
}
