'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { ArrowLeft, DownloadCloud, Link as LinkIcon, Youtube, Instagram, Twitter, Music, Play, AlertCircle, RefreshCw } from 'lucide-react';

export default function DownloaderPage() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null); // Placeholder for video metadata

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url) {
            setError('الرجاء إدخال رابط الفيديو أولاً');
            return;
        }

        try {
            const urlObj = new URL(url);
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                throw new Error('رابط غير صالح');
            }
        } catch (_) {
            setError('الرجاء إدخال رابط صحيح يبدأ بـ http أو https');
            return;
        }

        setError(null);
        setIsLoading(true);
        setResult(null);

        // TODO: Replace this with actual API call (e.g., to a Next.js API route that calls RapidAPI)
        // For now, we simulate a network delay and return a mock successful response to showcase the UI.
        setTimeout(() => {
            let platform = 'موقع غير معروف';
            if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'يوتيوب';
            else if (url.includes('tiktok.com')) platform = 'تيك توك';
            else if (url.includes('instagram.com')) platform = 'إنستجرام';
            else if (url.includes('twitter.com') || url.includes('x.com')) platform = 'إكس (تويتر)';
            else if (url.includes('facebook.com') || url.includes('fb.watch')) platform = 'فيسبوك';

            setResult({
                title: `فيديو ${platform} (هذا مجرد معاينة للتصميم)`,
                thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
                platform: platform,
                formats: [
                    { resolution: '1080p (HD)', size: '25 MB', type: 'mp4' },
                    { resolution: '720p', size: '12 MB', type: 'mp4' },
                    { resolution: 'Audio Only', size: '3 MB', type: 'mp3' }
                ]
            });
            setIsLoading(false);

            // In a real scenario, you would uncomment the following code and remove the mock above:
            /*
            try {
                const res = await fetch('/api/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'فشل جلب الفيديو');
                setResult(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
            */

        }, 1500);
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#8b5cf6' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8 shadow-xl shadow-purple-900/5">
                    {/* Header */}
                    <div className="p-8 md:p-12 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-2xl translate-y-1/2 translate-x-1/2"></div>

                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto relative z-10 backdrop-blur-md shadow-lg border border-white/10">
                            <DownloadCloud className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black mb-3 relative z-10">تحميل الفيديوهات الشامل</h1>
                        <p className="text-purple-100 text-sm md:text-base font-medium relative z-10 max-w-xl mx-auto">
                            حمل الفيديوهات من يوتيوب، تيك توك بـدون علامة مائية، إنستجرام، وغيرها بجودات متعددة بسهولة ووضوح.
                        </p>

                        <div className="flex justify-center gap-4 mt-8 relative z-10">
                            <Youtube className="w-6 h-6 text-white/70" />
                            <Music className="w-6 h-6 text-white/70" />
                            <Instagram className="w-6 h-6 text-white/70" />
                            <Twitter className="w-6 h-6 text-white/70" />
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* URL Input Form */}
                        <form onSubmit={handleDownload} className="relative max-w-2xl mx-auto">
                            <div className="relative group">
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                    <LinkIcon className={`w-5 h-5 transition-colors ${url ? 'text-purple-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="ألصق رابط الفيديو هنا..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="block w-full px-4 pr-12 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-lg font-medium text-gray-800 focus:ring-0 focus:border-purple-400 focus:bg-white transition-all shadow-sm"
                                    dir="ltr"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !url}
                                    className={`absolute left-2 top-2 bottom-2 px-6 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${isLoading || !url
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-linear-to-r from-purple-500 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5'
                                        }`}
                                >
                                    {isLoading ? (
                                        <><RefreshCw className="w-4 h-4 animate-spin" /> جاري البحث...</>
                                    ) : (
                                        <>تحميل <DownloadCloud className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Results Area */}
                        {result && (
                            <div className="max-w-2xl mx-auto border-2 border-purple-100 rounded-3xl p-6 bg-white animate-in zoom-in-95 duration-500">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-1/3 shrink-0">
                                        <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner group">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={result.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50">
                                                    <Play className="w-5 h-5 ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3 flex flex-col justify-center">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold w-fit mb-3">
                                            {result.platform}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 leading-tight">
                                            {result.title}
                                        </h3>

                                        <div className="space-y-3 mt-auto">
                                            <p className="text-xs font-bold text-gray-500">اختر الجودة للتحميل:</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                {result.formats.map((format: any, idx: number) => (
                                                    <a
                                                        key={idx}
                                                        href="#"
                                                        onClick={(e) => { e.preventDefault(); alert('تحميل تجريبي. يتطلب ربط API حقيقي للعمل.'); }}
                                                        className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all group ${idx === 0
                                                            ? 'border-purple-500 bg-purple-50 hover:bg-purple-100 text-purple-700'
                                                            : 'border-gray-100 hover:border-purple-300 hover:bg-gray-50 text-gray-700'
                                                            }`}
                                                    >
                                                        <span className="font-bold flex items-center gap-2 text-sm">
                                                            {format.resolution}
                                                            <span className="text-xs font-medium px-2 py-0.5 bg-white/60 rounded-md uppercase border border-black/5 opacity-70">
                                                                {format.type}
                                                            </span>
                                                        </span>
                                                        <span className="text-xs font-bold opacity-70 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
                                                            {format.size}
                                                            <DownloadCloud className="w-4 h-4" />
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 text-sm leading-relaxed text-gray-500 text-center border border-purple-100/30">
                    <p>
                        <strong>ملاحظة هامة:</strong> لتحميل الفيديوهات فعلياً، يلزم الاشتراك في خدمة API خارجية (مثل عبر RapidAPI) وربطها بالخادم الخاص بالموقع لضمان عدم حظر النطاق الخاص بك من قبل المنصات. الواجهة الحالية جاهزة تماماً للربط الفوري.
                    </p>
                </div>

                <AdBanner />
            </div>
        </PageLayout>
    );
}
