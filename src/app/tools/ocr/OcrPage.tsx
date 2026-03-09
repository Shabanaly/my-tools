'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { ArrowLeft, Type, UploadCloud, RefreshCw, Copy, CheckCircle2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { createWorker } from 'tesseract.js';

export default function OcrPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressStatus, setProgressStatus] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('الرجاء اختيار ملف صورة صالح (JPG, PNG, WebP).');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setExtractedText('');
        setError(null);
        setProgress(0);
        setProgressStatus('');
    };

    const processImage = async () => {
        if (!selectedImage) return;

        setIsProcessing(true);
        setError(null);
        setExtractedText('');
        setProgress(0);

        try {
            // Initialize tesseract worker for Arabic and English
            const worker = await createWorker('ara+eng', 1, {
                logger: (m) => {
                    setProgressStatus(m.status === 'recognizing text' ? 'جارِ تحليل النص...' : 'تحميل حزمة اللغات...');
                    if (m.status === 'recognizing text' && m.progress) {
                        setProgress(Math.round(m.progress * 100));
                    }
                }
            });

            const { data: { text } } = await worker.recognize(selectedImage);

            if (!text.trim()) {
                setError('لم يتم العثور على أي نصوص واضحة في هذه الصورة. يرجى تجربة صورة بدقة أعلى.');
            } else {
                setExtractedText(text);
            }

            await worker.terminate();
        } catch (err: any) {
            console.error(err);
            setError('حدث خطأ أثناء معالجة الصورة. الرجاء التأكد من جودة الصورة والمحاولة مرة أخرى.');
        } finally {
            setIsProcessing(false);
            setProgressStatus('');
            setProgress(0);
        }
    };

    const handleCopy = () => {
        if (!extractedText) return;
        navigator.clipboard.writeText(extractedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Cleanup blob URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (selectedImage) URL.revokeObjectURL(selectedImage);
        };
    }, [selectedImage]);

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#0ea5e9' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8 shadow-xl shadow-sky-900/5">
                    {/* Header bg-gradient */}
                    <div className="p-8 md:p-12 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto relative z-10 backdrop-blur-md shadow-lg border border-white/10">
                            <Type className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black mb-3 relative z-10">استخراج النص من الصور (OCR)</h1>
                        <p className="text-sky-50 text-sm md:text-base font-medium relative z-10 max-w-xl mx-auto">
                            حول أي صورة تحتوي على كلام إلى نص مكتوب قابل للنسخ والتعديل بسهولة لدعم اللغتين العربية والإنجليزية بذكاء.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Upload Zone */}
                        <div
                            onClick={() => !isProcessing && fileInputRef.current?.click()}
                            className={`border-3 border-dashed rounded-3xl p-8 text-center transition-all flex flex-col items-center justify-center min-h-[250px] ${isProcessing ? 'border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed' : 'border-sky-200 bg-sky-50/30 cursor-pointer hover:border-sky-400 hover:bg-sky-50/50'
                                }`}
                        >
                            {!selectedImage ? (
                                <>
                                    <div className="w-16 h-16 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                        <UploadCloud className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-800 mb-2">انقر هنا لاختيار صورة</h3>
                                    <p className="text-gray-500 text-sm font-medium">يدعم صيغ JPG, PNG, WebP</p>
                                    <p className="text-sky-600 text-xs font-bold mt-3 bg-sky-100 px-3 py-1 rounded-full">نصيحة: استخدم صوراً عالية الدقة لنتائج أفضل</p>
                                </>
                            ) : (
                                <div className="relative w-full max-w-md mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-sky-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={selectedImage} alt="Selected" className="w-full h-full object-contain bg-black/5" />

                                    {isProcessing && (
                                        <div className="absolute inset-0 bg-sky-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                                            <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                                            <p className="font-bold mb-2">{progressStatus}</p>
                                            <div className="w-full max-w-xs bg-white/20 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className="bg-sky-400 h-2.5 rounded-full transition-all duration-300"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-sm mt-2">{progress}%</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                                disabled={isProcessing}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-4 rounded-xl text-sm font-bold flex items-center gap-2 text-right">
                                <AlertCircle className="w-6 h-6 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Actions */}
                        {selectedImage && !extractedText && !error && (
                            <div className="flex justify-center">
                                <button
                                    onClick={(e) => { e.stopPropagation(); processImage(); }}
                                    disabled={isProcessing}
                                    className={`px-10 py-4 text-lg rounded-2xl font-black text-white shadow-xl transition-all flex items-center gap-3 w-full md:w-auto justify-center ${isProcessing
                                            ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                            : 'bg-linear-to-r from-sky-500 to-blue-600 hover:shadow-sky-500/40 hover:-translate-y-1'
                                        }`}
                                >
                                    {isProcessing ? (
                                        <>جاري المعالجة... <RefreshCw className="w-5 h-5 animate-spin" /></>
                                    ) : (
                                        <>استخراج النص الآن <ImageIcon className="w-5 h-5" /></>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Result Display */}
                        {extractedText && (
                            <div className="bg-gray-50 border-2 border-sky-100 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 border-b border-gray-200 pb-4">
                                    <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                                        <Type className="w-6 h-6 text-sky-500" />
                                        النص المستخرج
                                    </h3>

                                    <button
                                        onClick={handleCopy}
                                        className={`px-5 py-2.5 rounded-xl font-bold text-white transition-all flex items-center gap-2 text-sm ${copied
                                                ? 'bg-green-500'
                                                : 'bg-sky-500 hover:bg-sky-600'
                                            }`}
                                    >
                                        {copied ? (
                                            <><CheckCircle2 className="w-4 h-4" /> تم النسخ!</>
                                        ) : (
                                            <><Copy className="w-4 h-4" /> نسخ النص المستخرج</>
                                        )}
                                    </button>
                                </div>

                                <textarea
                                    readOnly
                                    value={extractedText}
                                    className="w-full min-h-[250px] bg-white border border-gray-200 rounded-2xl p-5 text-gray-700 leading-relaxed font-medium focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all resize-y shadow-inner"
                                    dir="auto"
                                ></textarea>

                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setExtractedText('');
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="text-sky-600 font-bold hover:text-sky-800 underline underline-offset-4"
                                    >
                                        استخراج نص من صورة أخرى
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 border-l-4 border-sky-400 bg-sky-50/50">
                    <h4 className="font-bold text-sky-800 mb-2">كيف تعمل الأداة؟</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        نستخدم تقنية التعرف البصري على الحروف (OCR) المتطورة لتحليل هيكل الصورة وفهم الحروف المكتوبة داخلها.
                        أداتنا مزودة بحزمة لغوية ذكية تتعرف على <strong>النصوص العربية والإنجليزية</strong> معاً داخل نفس الصورة
                        بكفاءة عالية دون الحاجة لرفع صورك الخاصة إلى أي خادم (معالجة محمية وآمنة 100% داخل جهازك).
                    </p>
                </div>

                <AdBanner />
            </div>
        </PageLayout>
    );
}
