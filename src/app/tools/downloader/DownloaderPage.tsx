'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, DownloadCloud, Link as LinkIcon, Youtube, Instagram, Twitter,
    Music2, Video, Play, X, AlertCircle, RefreshCw, CheckCircle, ChevronDown
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Format {
    label: string;
    size: string | null;
    ext: string;
    url: string;
    needsProxy?: boolean;
    isNoWatermark: boolean;
    resValue: number;
}


interface DownloadResult {
    title: string;
    thumbnail: string;
    platform: string;
    videoFormats: Format[];
    audioFormats: Format[];
}

// ---------------------------------------------------------------------------
// Inline preview modal
// ---------------------------------------------------------------------------
function PreviewModal({ format, title, onClose }: { format: Format; title: string; onClose: () => void }) {
    const isAudio = ['mp3', 'm4a'].includes(format.ext);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <p className="font-bold text-gray-800 text-sm line-clamp-1 flex-1 ml-3">{title}</p>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                {/* Player */}
                <div className="p-4">
                    {isAudio ? (
                        <audio controls autoPlay className="w-full mt-2" src={format.url}>
                            متصفحك لا يدعم تشغيل الصوت
                        </audio>
                    ) : (
                        <video
                            controls
                            autoPlay
                            className="w-full rounded-2xl max-h-[60vh] bg-black"
                            src={format.url}
                        >
                            متصفحك لا يدعم تشغيل الفيديو
                        </video>
                    )}
                </div>

                {/* Download from modal */}
                <div className="px-4 pb-4">
                    <a
                        href={format.url}
                        {...(!format.needsProxy ? { download: `${title.substring(0, 60)}.${format.ext}` } : {})}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-white transition-all"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
                    >
                        <DownloadCloud className="w-5 h-5" />
                        {format.needsProxy ? 'فتح في تبويب جديد' : `تحميل ${format.label}`}
                    </a>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Format row component
// ---------------------------------------------------------------------------
function FormatRow({ format, title, isAudio }: { format: Format; title: string; isAudio?: boolean }) {
    const [previewing, setPreviewing] = useState(false);

    return (
        <>
            {previewing && (
                <PreviewModal format={format} title={title} onClose={() => setPreviewing(false)} />
            )}

            <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition-all
                ${format.isNoWatermark
                    ? 'border-green-400 bg-green-50'
                    : isAudio
                        ? 'border-purple-100 bg-purple-50/40'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
            >
                {/* Label */}
                <div className="flex items-center gap-2 min-w-0">
                    <span className={`font-bold text-sm truncate ${format.isNoWatermark ? 'text-green-800' : isAudio ? 'text-purple-800' : 'text-gray-800'}`}>
                        {format.label}
                    </span>
                    {format.isNoWatermark && (
                        <span className="shrink-0 text-[10px] px-1.5 py-0.5 bg-green-200 text-green-900 rounded-md font-black">✓ بدون علامة</span>
                    )}
                    {format.size && (
                        <span className="shrink-0 text-[10px] text-gray-400 font-medium">{format.size}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Preview */}
                    <button
                        onClick={() => setPreviewing(true)}
                        title="معاينة"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-600 hover:text-purple-700 transition-all"
                    >
                        <Play className="w-3 h-3" />
                        معاينة
                    </button>

                    {/* Download / Open */}
                    <a
                        href={format.url}
                        {...(!format.needsProxy ? { download: `${title.substring(0, 60)}.${format.ext}` } : {})}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={format.needsProxy ? 'فتح في تبويب جديد' : 'تحميل مباشر'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all
                            ${format.isNoWatermark
                                ? 'bg-green-500 hover:bg-green-600'
                                : isAudio
                                    ? 'bg-purple-500 hover:bg-purple-600'
                                    : 'bg-gray-700 hover:bg-gray-900'
                            }`}
                    >
                        <DownloadCloud className="w-3 h-3" />
                        {format.needsProxy ? 'فتح' : 'تحميل'}
                    </a>
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function DownloaderPage() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<DownloadResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('الرجاء إدخال رابط الفيديو أولاً');
            return;
        }

        try {
            const urlObj = new URL(url);
            if (!['http:', 'https:'].includes(urlObj.protocol)) throw new Error('invalid');
        } catch {
            setError('الرجاء إدخال رابط صحيح يبدأ بـ http أو https');
            return;
        }

        setError(null);
        setIsLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'فشل جلب بيانات الفيديو');
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const hasFormats = result && (result.videoFormats.length > 0 || result.audioFormats.length > 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70" style={{ color: '#8b5cf6' }}>
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
            </Link>

            <div className="glass-card rounded-3xl overflow-hidden mb-8 shadow-xl shadow-purple-900/5">
                {/* ── Header ── */}
                <div className="p-8 md:p-12 text-center text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />

                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto relative z-10 backdrop-blur-md shadow-lg border border-white/10">
                        <DownloadCloud className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black mb-3 relative z-10">تحميل الفيديوهات الشامل</h1>
                    <p className="text-purple-100 text-sm md:text-base font-medium relative z-10 max-w-xl mx-auto">
                        ألصق رابط الفيديو، اختر الجودة، استعرض أو حمّل مباشرة
                    </p>

                    <div className="flex justify-center gap-4 mt-6 relative z-10">
                        <Youtube className="w-5 h-5 text-white/70" />
                        <Music2 className="w-5 h-5 text-white/70" />
                        <Instagram className="w-5 h-5 text-white/70" />
                        <Twitter className="w-5 h-5 text-white/70" />
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {/* ── URL Input ── */}
                    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <LinkIcon className={`w-5 h-5 transition-colors ${url ? 'text-purple-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                type="text"
                                placeholder="ألصق رابط الفيديو هنا..."
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                className="block w-full pl-40 pr-12 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-lg font-medium text-gray-800 focus:ring-0 focus:border-purple-400 focus:bg-white transition-all shadow-sm"
                                dir="ltr"
                            />
                            <button
                                type="submit"
                                aria-label="تحميل الفيديو"
                                disabled={isLoading || !url}
                                className={`absolute left-2 top-2 bottom-2 px-6 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${isLoading || !url
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-linear-to-r from-purple-500 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5'
                                    }`}
                            >
                                {isLoading
                                    ? <><RefreshCw className="w-4 h-4 animate-spin" /> جاري البحث...</>
                                    : <><DownloadCloud className="w-4 h-4" /> استخراج</>
                                }
                            </button>
                        </div>
                    </form>

                    {/* ── Error ── */}
                    {error && (
                        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* ── Results ── */}
                    {result && (
                        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">

                            {/* Video info card */}
                            <div className="flex gap-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                                {result.thumbnail && (
                                    <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={result.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex flex-col justify-center min-w-0">
                                    {result.platform && (
                                        <span className="text-[11px] font-bold text-purple-500 uppercase tracking-wider mb-1">{result.platform}</span>
                                    )}
                                    <h3 className="font-black text-gray-800 text-sm leading-snug line-clamp-3">{result.title}</h3>
                                </div>
                            </div>

                            {/* No formats found */}
                            {!hasFormats && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-sm font-medium text-center flex items-center gap-2 justify-center">
                                    <AlertCircle className="w-4 h-4" />
                                    لم يتم العثور على صيغ قابلة للتحميل لهذا الرابط.
                                </div>
                            )}

                            {/* Video formats */}
                            {result.videoFormats.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Video className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs font-black text-gray-500 uppercase tracking-wide">صيغ الفيديو</span>
                                    </div>
                                    <div className="space-y-2">
                                        {result.videoFormats.map((f, i) => (
                                            <FormatRow key={i} format={f} title={result.title} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Audio formats */}
                            {result.audioFormats.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Music2 className="w-4 h-4 text-purple-500" />
                                        <span className="text-xs font-black text-purple-500 uppercase tracking-wide">صيغ الصوت</span>
                                    </div>
                                    <div className="space-y-2">
                                        {result.audioFormats.map((f, i) => (
                                            <FormatRow key={i} format={f} title={result.title} isAudio />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
