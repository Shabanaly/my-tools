'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import {
    ArrowLeft, UploadCloud, Scissors, CheckCircle, DownloadCloud,
    X, Loader2, Image as ImageIcon, Sparkles, AlertCircle
} from 'lucide-react';
// @ts-ignore
import { removeBackground, Config } from '@imgly/background-removal';

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ---------------------------------------------------------------------------
// MAIN APP COMPONENT
// ---------------------------------------------------------------------------
export default function BgRemoverApp() {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [originalFile, setOriginalFile] = useState<File | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [progressText, setProgressText] = useState('');
    const [progressPercent, setProgressPercent] = useState(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    // -- Handle File Selection
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            loadFile(e.target.files[0]);
        }
    };

    const loadFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setErrorMsg('يرجى اختيار ملف صورة صالح.');
            return;
        }
        setErrorMsg(null);
        handleReset();

        setOriginalFile(file);
        const url = URL.createObjectURL(file);
        setImgSrc(url);
    };

    // -- Drag & Drop
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const onDragLeave = () => setIsDragOver(false);
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            loadFile(e.dataTransfer.files[0]);
        }
    };

    // -- Process Image with imgly
    const processImage = async () => {
        if (!originalFile || !imgSrc) return;

        setIsProcessing(true);
        setErrorMsg(null);
        setProgressText('تهيئة الذكاء الاصطناعي... (قد يستغرق بعض الوقت في المرة الأولى)');
        setProgressPercent(5);

        try {
            const config: Config = {
                output: {
                    format: 'image/png', // Explicitly request PNG for transparency
                },
                progress: (key, current, total) => {
                    // key is like 'fetch:model', 'compute:inference'
                    const label = key.includes('fetch') ? 'جاري تحميل نماذج الذكاء الاصطناعي...' : 'جاري معالجة الصورة وفصل الخلفية...';
                    setProgressText(label);

                    const p = Math.round((current / total) * 100);
                    // limit progress bar visually since fetching is only part of it
                    const scaledProgress = key.includes('fetch') ? 10 + (p * 0.4) : 50 + (p * 0.4);
                    setProgressPercent(Math.min(scaledProgress, 99));
                }
            };

            // @ts-ignore
            const blob = await removeBackground(imgSrc, config);

            setProgressPercent(100);
            setProgressText('اكتملت الإزالة بنجاح!');

            const newUrl = URL.createObjectURL(blob);
            setResultBlob(blob);
            setResultUrl(newUrl);

        } catch (err: any) {
            console.error('Removal Error:', err);
            setErrorMsg('حدث خطأ أثناء المعالجة. يرجى التأكد من تحديث متصفحك. إذا استمرت المشكلة، فقد يكون حجم الصورة كبيراً جداً على ذاكرة جهازك. حاول استخدام صورة أصغر.');
        } finally {
            setIsProcessing(false);
        }
    };

    // -- Reset
    const handleReset = () => {
        if (imgSrc) URL.revokeObjectURL(imgSrc);
        if (resultUrl) URL.revokeObjectURL(resultUrl);

        setImgSrc('');
        setOriginalFile(null);
        setResultUrl(null);
        setResultBlob(null);
        setProgressPercent(0);
        setProgressText('');
        setErrorMsg(null);
    };

    const hasImage = !!imgSrc;
    const isDone = !!resultUrl;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70" style={{ color: '#10b981' }}>
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
            </Link>

            {/* ── HEADER ── */}
            <div className="text-center mb-10 mt-6">
                <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 10px 30px rgba(16,185,129,0.3)' }}>
                    <Scissors className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">إزالة الخلفية بالذكاء الاصطناعي</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                    قم بإزالة خلفية أي صورة بدقة متناهية. لا حاجة لرفع الصورة لأي خادم، يتم كل شيء محلياً داخل متصفحك مباشرة لحماية خصوصيتك وصورك الحساسة.
                </p>
            </div>

            {/* ── MAIN WORKSPACE ── */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">

                    {/* TOOLBAR */}
                    {hasImage && (
                        <div className="bg-gray-50 border-b border-gray-100 p-4 shrink-0 flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                                    <ImageIcon className="w-5 h-5 text-gray-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-gray-800 text-sm truncate" dir="ltr">{originalFile?.name}</p>
                                    <p className="text-xs text-gray-500">{formatSize(originalFile?.size || 0)}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 ml-2"
                                title="إلغاء واختيار صورة أخرى"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* WORK AREA */}
                    <div className="flex-1 flex flex-col relative bg-gray-50/50">
                        {!hasImage ? (
                            // UPLOAD VIEW
                            <div
                                className={`absolute inset-0 m-6 flex flex-col items-center justify-center border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${isDragOver ? 'border-emerald-500 bg-emerald-50/50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-emerald-300'}`}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={onSelectFile}
                                    title=""
                                />
                                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 pointer-events-none">
                                    <UploadCloud className="w-12 h-12 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-2 pointer-events-none">حدد الصورة لإزالة خلفيتها</h3>
                                <p className="text-gray-500 font-medium mb-6 pointer-events-none">أو اسحب وأفلت الصورة هنا</p>
                                <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/30">
                                    اختيار صورة
                                </button>
                            </div>
                        ) : (
                            // PREVIEW & PROCESSING VIEW
                            <div className="flex-1 flex flex-col p-6 items-center justify-center w-full">

                                <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-gray-100 flex items-center justify-center shadow-inner">
                                    <img
                                        src={isDone ? resultUrl! : imgSrc}
                                        alt="Preview"
                                        className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${isProcessing && !isDone ? 'opacity-30 blur-sm' : 'opacity-100'}`}
                                        style={isDone ? { backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nw2wAAODAhBw0ACDQYBBw0ADDAwAFzIHRtT7cT0AAAAASUVORK5CYII=")' } : {}}
                                    />

                                    {isProcessing && !isDone && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
                                            <p className="text-gray-800 font-bold bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                                                {progressText}
                                            </p>
                                            <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                                                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {errorMsg && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 font-bold flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {errorMsg}
                                    </div>
                                )}

                                {!isProcessing && !isDone && !errorMsg && (
                                    <button
                                        onClick={processImage}
                                        className="mt-8 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-3 transform hover:scale-105"
                                    >
                                        <Sparkles className="w-6 h-6" />
                                        إزالة الخلفية الآن سحرياً
                                    </button>
                                )}

                                {isDone && (
                                    <div className="mt-8 flex gap-4 w-full max-w-sm">
                                        <a
                                            href={resultUrl!}
                                            download={originalFile?.name.replace(/\.[^/.]+$/, "") + "_nobg.png"}
                                            className="flex-1 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex flex-col items-center justify-center gap-1 shadow-lg shadow-emerald-500/30 transition-all text-center"
                                        >
                                            <DownloadCloud className="w-6 h-6" />
                                            <span>تحميل بصيغة PNG</span>
                                            <span className="text-xs font-medium opacity-80">({formatSize(resultBlob?.size || 0)})</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}
