'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { CircleDollarSign, ArrowLeft, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GoldCalculator() {
    const [weight, setWeight] = useState('');
    const [karat, setKarat] = useState('21');
    const [pricePerGram, setPricePerGram] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [allPrices, setAllPrices] = useState<Record<string, number> | null>(null);

    const fetchPrice = async () => {
        setIsLoadingPrice(true);
        try {
            const res = await fetch('/api/gold-price');
            const data = await res.json();
            if (data.success && data.karats) {
                setAllPrices(data.karats);
                const price = data.karats[`k${karat}`];
                if (price) setPricePerGram(price.toString());
                setLastUpdated(new Date().toLocaleTimeString('ar-EG'));
            }
        } catch { /* silent */ } finally { setIsLoadingPrice(false); }
    };

    useEffect(() => { fetchPrice(); }, []);

    const handleKaratChange = (newKarat: string) => {
        setKarat(newKarat);
        if (allPrices) {
            const price = allPrices[`k${newKarat}`];
            if (price) setPricePerGram(price.toString());
        }
        setResult(null);
    };

    const calculate = () => {
        const w = parseFloat(weight);
        const p = parseFloat(pricePerGram);
        if (isNaN(w) || isNaN(p)) return;
        setResult(Math.round(w * p * 100) / 100);
    };

    const karatOptions = [
        { value: '24', label: 'عيار 24 (ذهب خالص)' },
        { value: '22', label: 'عيار 22' },
        { value: '21', label: 'عيار 21 (الأكثر شيوعاً)' },
        { value: '18', label: 'عيار 18' },
        { value: '14', label: 'عيار 14' },
        { value: '10', label: 'عيار 10' },
    ];

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
                    style={{ color: '#e67700' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden">
                    {/* Header */}
                    <div className="p-8 pb-7 text-center text-white"
                        style={{ background: 'linear-gradient(135deg, #e67700 0%, #f59f00 100%)' }}>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <CircleDollarSign className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-1">حاسبة الذهب</h1>
                        <p className="text-amber-50 text-sm font-medium">أسعار لحظية لجميع العيارات</p>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Karat quick select pills */}
                        <div>
                            <label className="text-sm font-bold block mb-3" style={{ color: 'var(--text-secondary)' }}>العيار</label>
                            <div className="flex flex-wrap gap-2">
                                {karatOptions.map((opt) => (
                                    <button key={opt.value} onClick={() => handleKaratChange(opt.value)}
                                        className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                        style={karat === opt.value
                                            ? { background: 'linear-gradient(135deg, #e67700 0%, #f59f00 100%)', color: '#fff', boxShadow: '0 4px 12px rgba(230,119,0,0.3)' }
                                            : { background: 'rgba(248,249,255,1)', color: 'var(--text-secondary)', border: '1.5px solid var(--border)' }
                                        }>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold block" style={{ color: 'var(--text-secondary)' }}>
                                    الوزن (جرام)
                                </label>
                                <input type="number" placeholder="مثال: 10" value={weight}
                                    onChange={(e) => setWeight(e.target.value)} className="input-field" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
                                        السعر / جرام اليوم
                                    </label>
                                    {lastUpdated && !isLoadingPrice && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: 'rgba(12,166,120,0.1)', color: '#0ca678' }}>
                                            🟢 مباشر {lastUpdated}
                                        </span>
                                    )}
                                    {isLoadingPrice && (
                                        <span className="text-[10px] font-bold animate-pulse" style={{ color: '#3b5bdb' }}>
                                            جاري التحديث...
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <input type="number" placeholder="—" value={pricePerGram}
                                        onChange={(e) => setPricePerGram(e.target.value)}
                                        className={cn('input-field', isLoadingPrice && 'opacity-50')} />
                                    <button onClick={fetchPrice} disabled={isLoadingPrice}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 disabled:opacity-40 transition-opacity"
                                        style={{ color: '#e67700' }}>
                                        <RefreshCcw className={cn('w-5 h-5', isLoadingPrice && 'animate-spin')} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button onClick={calculate} className="btn-primary"
                            style={{
                                background: 'linear-gradient(135deg, #e67700 0%, #f59f00 100%)',
                                boxShadow: '0 8px 24px rgba(245,159,0,0.35)'
                            }}>
                            احسب القيمة
                        </button>

                        {result !== null && (
                            <div className="result-card" style={{ background: 'rgba(230,119,0,0.06)', border: '1.5px solid rgba(245,159,0,0.2)' }}>
                                <p className="text-sm font-bold mb-2" style={{ color: '#e67700' }}>
                                    إجمالي القيمة التقديرية
                                </p>
                                <p className="text-5xl font-black mb-1" style={{ color: '#e67700' }}>
                                    {result.toLocaleString('ar-EG')}
                                </p>
                                <p className="text-sm font-bold" style={{ color: '#e67700' }}>جنيه مصري</p>
                                <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
                                    {weight} جرام × {parseFloat(pricePerGram).toLocaleString('ar-EG')} ج/جرام
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
