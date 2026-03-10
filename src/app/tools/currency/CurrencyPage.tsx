'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, ArrowRightLeft, DollarSign } from 'lucide-react';

const popularCurrencies = [
    { code: 'USD', name: 'دولار أمريكي 🇺🇸' },
    { code: 'EUR', name: 'يورو 🇪🇺' },
    { code: 'GBP', name: 'جنيه إسترليني 🇬🇧' },
    { code: 'SAR', name: 'ريال سعودي 🇸🇦' },
    { code: 'AED', name: 'درهم إماراتي 🇦🇪' },
    { code: 'KWD', name: 'دينار كويتي 🇰🇼' },
    { code: 'QAR', name: 'ريال قطري 🇶🇦' },
    { code: 'OMR', name: 'ريال عماني 🇴🇲' },
    { code: 'BHD', name: 'دينار بحريني 🇧🇭' },
    { code: 'JOD', name: 'دينار أردني 🇯🇴' },
    { code: 'EGP', name: 'جنيه مصري 🇪🇬' },
];

export default function CurrencyPage() {
    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EGP');
    const [rates, setRates] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdate, setLastUpdate] = useState('');

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            setError(false);
            try {
                // Fetching base USD rates
                const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setRates(data.rates);

                // Format the last update date
                const date = new Date(data.time_last_updated * 1000);
                setLastUpdate(date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
            } catch (err) {
                console.error("Failed to fetch exchange rates", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const calculateResult = () => {
        if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

        const numericAmount = parseFloat(amount) || 0;

        // Convert to USD first (base), then to target
        const amountInUSD = numericAmount / rates[fromCurrency];
        const result = amountInUSD * rates[toCurrency];

        return result;
    };

    const result = calculateResult();

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                style={{ color: '#0d9488' }}>
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
            </Link>

            <div className="glass-card rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="p-8 pb-7 text-center text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 backdrop-blur-sm shadow-inner">
                        <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black mb-2 relative z-10">تحويل العملات</h1>
                    <p className="text-teal-50 text-sm font-medium relative z-10">أسعار الصرف اللحظية لأهم العملات العالمية والعربية</p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">
                            عذراً، لم نتمكن من جلب أسعار الصرف الحالية. حاول مرة أخرى لاحقاً.
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                المبلغ
                            </label>
                            <input type="number" placeholder="1000" value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-2xl font-black focus:outline-none focus:border-teal-500 transition-colors"
                                style={{ color: 'var(--text-primary)' }} min="0" />
                        </div>

                        {/* Currency Selection Grid */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="space-y-2 w-full">
                                <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                    من عملة
                                </label>
                                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                                    className="input-field cursor-pointer appearance-none text-lg font-bold">
                                    {popularCurrencies.map(c => (
                                        <option key={`from-${c.code}`} value={c.code}>{c.name} ({c.code})</option>
                                    ))}
                                </select>
                            </div>

                            <button onClick={handleSwap}
                                className="md:mt-7 p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors mx-auto shrink-0 flex items-center justify-center"
                                title="تبديل العملات">
                                <ArrowRightLeft className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="space-y-2 w-full">
                                <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                    إلى عملة
                                </label>
                                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                                    className="input-field cursor-pointer appearance-none text-lg font-bold">
                                    {popularCurrencies.map(c => (
                                        <option key={`to-${c.code}`} value={c.code}>{c.name} ({c.code})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Result Display */}
                    <div className="relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500"
                        style={{
                            background: loading ? 'rgba(243,244,246,0.6)' : 'rgba(13,148,136,0.06)',
                            border: loading ? '1.5px dashed #e5e7eb' : '1.5px solid rgba(13,148,136,0.15)'
                        }}>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-6">
                                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mb-3" />
                                <p className="text-gray-500 font-medium">جاري تحديث الأسعار...</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm font-bold mb-3" style={{ color: '#0d9488' }}>
                                    النتيجة التقديرية (حسب الأسعار العالمية)
                                </p>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-5xl md:text-6xl font-black tabular-nums break-all" style={{ color: '#0d9488' }}>
                                        {result.toLocaleString('ar-EG', { maximumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-xl font-bold opacity-80" style={{ color: '#0d9488' }}>
                                        {popularCurrencies.find(c => c.code === toCurrency)?.name || toCurrency}
                                    </p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-teal-500/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                        1 {fromCurrency} = {((rates[toCurrency] || 0) / (rates[fromCurrency] || 1)).toLocaleString('ar-EG', { maximumFractionDigits: 4 })} {toCurrency}
                                    </div>
                                    <div>
                                        آخر تحديث: {lastUpdate}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>

            <div className="mt-8 glass-card rounded-3xl p-6 text-sm leading-relaxed text-gray-500 text-center">
                <p>
                    <strong>ملاحظة هامة:</strong> الأسعار المعروضة هي أسعار الصرف العالمية المرجعية (Interbank Rates) ويتم تحديثها يومياً.
                    قد تختلف هذه الأسعار قليلاً عن أسعار التداول الفعلية في البنوك المحلية أو شركات الصرافة في بلدك بسبب العمولات وهوامش الربح.
                </p>
            </div>

        </div>
    );
}
