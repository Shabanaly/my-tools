'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { ArrowLeft, ImageIcon, UploadCloud, RefreshCw, CheckCircle, Download } from 'lucide-react';

type FileState = {
    file: File;
    preview: string;
    convertedUrl: string | null;
    convertedName: string | null;
    converting: boolean;
    error: string | null;
};

export default function ImageConverterPage() {
    const [fileState, setFileState] = useState<FileState | null>(null);
    const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png'>('image/jpeg');
    const [quality, setQuality] = useState(0.9);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('الرجاء اختيار صورة صالحة.');
            return;
        }

        const preview = URL.createObjectURL(file);
        setFileState({
            file,
            preview,
            convertedUrl: null,
            convertedName: null,
            converting: false,
            error: null,
        });
    };

    const convertImage = () => {
        if (!fileState) return;

        setFileState(prev => prev ? { ...prev, converting: true, error: null } : null);

        const img = new window.Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                setFileState(prev => prev ? { ...prev, converting: false, error: 'فشل تهيئة الـ Canvas' } : null);
                return;
            }

            // Draw white background for transparent images converting to JPEG
            if (targetFormat === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            try {
                const extension = targetFormat === 'image/jpeg' ? 'jpg' : 'png';
                // Remove existing extension and add new one
                const originalName = fileState.file.name;
                const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
                const newName = `${baseName}_converted.${extension}`;

                const dataUrl = canvas.toDataURL(targetFormat, quality);

                setFileState(prev => prev ? {
                    ...prev,
                    converting: false,
                    convertedUrl: dataUrl,
                    convertedName: newName
                } : null);
            } catch (err) {
                setFileState(prev => prev ? { ...prev, converting: false, error: 'تعذر تحويل الصورة. قد يكون هناك مشكلة في المتصفح.' } : null);
            }
        };

        img.onerror = () => {
            setFileState(prev => prev ? { ...prev, converting: false, error: 'خطأ في تحميل الصورة، الرجاء محاولة صورة أخرى.' } : null);
        };

        img.src = fileState.preview;
    };

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#0ea5e9' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8">
                    {/* Header */}
                    <div className="p-8 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' }}>
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2"></div>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 backdrop-blur-sm">
                            <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-2 relative z-10">محول صيغ الصور</h1>
                        <p className="text-blue-50 text-sm font-medium relative z-10 w-full max-w-lg mx-auto">
                            حول صور WebP أو أي صيغة أخرى إلى JPG أو PNG بسهولة. العملية تتم داخل متصفحك للحفاظ على خصوصيتك.
                        </p>
                    </div>

                    <div className="p-8 space-y-8">
                        {!fileState ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-3 border-dashed border-blue-200 rounded-3xl p-12 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center min-h-[300px]"
                            >
                                <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-6">
                                    <UploadCloud className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-black text-gray-800 mb-2">اختر الصورة للتحويل</h3>
                                <p className="text-gray-500 text-sm font-medium">يدعم WebP, PNG, JPG للاستيراد</p>
                                <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                                    تصفح الملفات
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-1/2 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <p className="text-xs font-bold text-gray-500 mb-3 text-center">الصورة الأصلية</p>
                                        <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={fileState.preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <p className="mt-3 text-center text-sm font-medium text-gray-600 truncate px-2" dir="ltr">
                                            {fileState.file.name}
                                        </p>
                                    </div>

                                    <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold block text-gray-600">
                                                    الصيغة المطلوبة
                                                </label>
                                                <select
                                                    value={targetFormat}
                                                    onChange={(e) => setTargetFormat(e.target.value as any)}
                                                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:border-blue-400 cursor-pointer"
                                                >
                                                    <option value="image/jpeg">JPG / JPEG</option>
                                                    <option value="image/png">PNG</option>
                                                </select>
                                            </div>

                                            {targetFormat === 'image/jpeg' && (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold block text-gray-600">
                                                        جودة الـ JPG
                                                    </label>
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="range"
                                                            min="0.1"
                                                            max="1"
                                                            step="0.1"
                                                            value={quality}
                                                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                                                            className="flex-1 accent-blue-600"
                                                        />
                                                        <span className="w-12 text-center font-bold text-gray-700 bg-gray-100 py-1 rounded-lg text-sm">
                                                            {Math.round(quality * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {fileState.error && (
                                            <p className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg">
                                                {fileState.error}
                                            </p>
                                        )}

                                        {!fileState.convertedUrl ? (
                                            <button
                                                onClick={convertImage}
                                                disabled={fileState.converting}
                                                className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all"
                                                style={{
                                                    background: fileState.converting ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                                                    boxShadow: fileState.converting ? 'none' : '0 8px 20px rgba(59,130,246,0.25)',
                                                    cursor: fileState.converting ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                {fileState.converting ? (
                                                    <><RefreshCw className="w-5 h-5 animate-spin" /> جاري التحويل...</>
                                                ) : (
                                                    <><ImageIcon className="w-5 h-5" /> حوّل الصورة الآن</>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center space-y-4">
                                                <div className="flex items-center justify-center gap-2 text-green-600 font-bold mb-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    تم التحويل بنجاح!
                                                </div>
                                                <a
                                                    href={fileState.convertedUrl}
                                                    download={fileState.convertedName || 'converted_image'}
                                                    className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                                                >
                                                    <Download className="w-5 h-5" /> تحميل الصورة الجديدة
                                                </a>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => setFileState(null)}
                                            className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            اختيار صورة أخرى
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 glass-card rounded-3xl p-6 text-sm leading-relaxed text-gray-500 text-center">
                    <p>
                        <strong>أمان وخصوصية 100%:</strong> أداة محول الصور المتاحة هنا تعمل كلياً داخل المتصفح الخاص بك (Client-side).
                        صورك <strong>لا يتم رفعها</strong> لأي خادم (سيرفر) خارجي على الإطلاق، وكل العمليات تتم على جهازك بشكل مباشر ولحظي.
                    </p>
                </div>

            </div>
        </PageLayout >
    );
}
