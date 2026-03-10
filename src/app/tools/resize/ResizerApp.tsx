'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import {
    ArrowLeft, UploadCloud, Maximize, CheckCircle, Download,
    Settings, X, Loader2, DownloadCloud, Image as ImageIcon,
    AlertCircle
} from 'lucide-react';
import JSZip from 'jszip';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type ProcessStatus = 'pending' | 'processing' | 'done' | 'error';
type ResizeMode = 'pixels' | 'percentage';

interface ResizerFileInfo {
    id: string;
    file: File;
    originalUrl: string;
    originalWidth: number;
    originalHeight: number;

    status: ProcessStatus;
    progress: number;
    errorMsg?: string;

    resizedFile?: File;
    resizedUrl?: string;
    resizedWidth?: number;
    resizedHeight?: number;
}

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

const getImageDimensions = (url: string): Promise<{ w: number, h: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.width, h: img.height });
        img.onerror = reject;
        img.src = url;
    });
};

// ---------------------------------------------------------------------------
// MAIN APP COMPONENT
// ---------------------------------------------------------------------------
export default function ResizerApp() {
    const [files, setFiles] = useState<ResizerFileInfo[]>([]);
    const [isProcessingAll, setIsProcessingAll] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // -- Settings
    const [resizeMode, setResizeMode] = useState<ResizeMode>('pixels');

    // By Pixels
    const [targetWidth, setTargetWidth] = useState<number | ''>('');
    const [targetHeight, setTargetHeight] = useState<number | ''>('');
    const [maintainAspect, setMaintainAspect] = useState(true);

    // By Percentage
    const [percentage, setPercentage] = useState<number>(50);

    // -- Add Files
    const handleAddFiles = async (newFiles: FileList | File[]) => {
        const arr = Array.from(newFiles).filter(f => f.type.startsWith('image/'));
        if (arr.length === 0) return;

        const newInfos: ResizerFileInfo[] = [];

        for (const f of arr) {
            const url = URL.createObjectURL(f);
            try {
                const { w, h } = await getImageDimensions(url);

                // Auto-fill width/height from the FIRST image uploaded
                if (files.length === 0 && newInfos.length === 0) {
                    setTargetWidth(w);
                    setTargetHeight(h);
                }

                newInfos.push({
                    id: Math.random().toString(36).substring(2, 9),
                    file: f,
                    originalUrl: url,
                    originalWidth: w,
                    originalHeight: h,
                    status: 'pending',
                    progress: 0
                });
            } catch (err) {
                URL.revokeObjectURL(url);
            }
        }

        setFiles(prev => [...prev, ...newInfos]);
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
        if (e.dataTransfer.files) handleAddFiles(e.dataTransfer.files);
    };

    // -- Remove File
    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => {
            if (f.id === id) {
                if (f.originalUrl) URL.revokeObjectURL(f.originalUrl);
                if (f.resizedUrl) URL.revokeObjectURL(f.resizedUrl);
            }
            return f.id !== id;
        }));
    };

    // -- Handle Aspect Ratio changes
    const handleWidthChange = (val: string) => {
        const w = parseInt(val) || '';
        setTargetWidth(w);

        if (w && maintainAspect && files.length > 0) {
            // ratio from the first image
            const first = files[0];
            const ratio = first.originalHeight / first.originalWidth;
            setTargetHeight(Math.round(w * ratio));
        }
    };

    const handleHeightChange = (val: string) => {
        const h = parseInt(val) || '';
        setTargetHeight(h);

        if (h && maintainAspect && files.length > 0) {
            const first = files[0];
            const ratio = first.originalWidth / first.originalHeight;
            setTargetWidth(Math.round(h * ratio));
        }
    };

    // -- Process Single File
    const processFile = async (info: ResizerFileInfo): Promise<void> => {
        if (info.status === 'done' || info.status === 'processing') return;

        setFiles(prev => prev.map(f => f.id === info.id ? { ...f, status: 'processing', progress: 10 } : f));

        try {
            // 1) Calc target W / H
            let finalW = info.originalWidth;
            let finalH = info.originalHeight;

            if (resizeMode === 'percentage') {
                const factor = percentage / 100;
                finalW = Math.round(info.originalWidth * factor);
                finalH = Math.round(info.originalHeight * factor);
            } else {
                if (targetWidth && !targetHeight) {
                    finalW = Number(targetWidth);
                    finalH = Math.round(info.originalHeight * (finalW / info.originalWidth));
                } else if (!targetWidth && targetHeight) {
                    finalH = Number(targetHeight);
                    finalW = Math.round(info.originalWidth * (finalH / info.originalHeight));
                } else if (targetWidth && targetHeight) {
                    finalW = Number(targetWidth);
                    finalH = Number(targetHeight);
                }
            }

            setFiles(prev => prev.map(f => f.id === info.id ? { ...f, progress: 40 } : f));

            // 2) Draw to Canvas
            const img = new Image();
            img.src = info.originalUrl;
            await new Promise((resolve) => { img.onload = resolve; });

            const canvas = document.createElement('canvas');
            canvas.width = finalW;
            canvas.height = finalH;
            const ctx = canvas.getContext('2d');

            // smooth scaling
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, finalW, finalH);
            }

            setFiles(prev => prev.map(f => f.id === info.id ? { ...f, progress: 80 } : f));

            // 3) Export Blob (force PNG or JPEG to avoid corrupt webp saves)
            const mime = info.file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            const blob: Blob = await new Promise((resolve, reject) => {
                canvas.toBlob((b) => {
                    if (b) resolve(b); else reject(new Error('Canvas export failed'));
                }, mime, 0.95);
            });

            const outputName = info.file.name.replace(/\.[^/.]+$/, "") + "_resized" + (mime === 'image/png' ? '.png' : '.jpg');
            const resizedFile = new File([blob], outputName, { type: mime });
            const resizedUrl = URL.createObjectURL(blob);

            setFiles(prev => prev.map(f => f.id === info.id ? {
                ...f,
                status: 'done',
                progress: 100,
                resizedFile,
                resizedUrl,
                resizedWidth: finalW,
                resizedHeight: finalH
            } : f));

        } catch (err: any) {
            setFiles(prev => prev.map(f => f.id === info.id ? { ...f, status: 'error', errorMsg: err.message, progress: 0 } : f));
        }
    };

    // -- Process All
    const handleProcessAll = async () => {
        setIsProcessingAll(true);
        const pendings = files.filter(f => f.status === 'pending' || f.status === 'error');

        // Process sequentially so browser canvas doesn't crash on many large files
        for (const f of pendings) {
            await processFile(f);
        }
        setIsProcessingAll(false);
    };

    // -- Download All as ZIP
    const handleDownloadAll = async () => {
        const doneFiles = files.filter(f => f.status === 'done' && f.resizedFile);
        if (doneFiles.length === 0) return;

        if (doneFiles.length === 1) {
            const link = document.createElement('a');
            link.href = doneFiles[0].resizedUrl!;
            link.download = doneFiles[0].resizedFile!.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        const zip = new JSZip();
        doneFiles.forEach(f => {
            zip.file(f.resizedFile!.name, f.resizedFile!);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resized_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Delay revocation so the browser has time to start the download
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    };

    const allDone = files.length > 0 && files.every(f => f.status === 'done' || f.status === 'error');
    const hasPending = files.some(f => f.status === 'pending');

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70" style={{ color: '#0ea5e9' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                {/* ── HEADER ── */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', boxShadow: '0 10px 30px rgba(14,165,233,0.3)' }}>
                        <Maximize className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">تغيير حجم الصور</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        غيّر أبعاد صورك بدقة متناهية (بالبيكسل أو بالنسبة المئوية). جميع العمليات تتم داخل متصفحك للحفاظ على خصوصيتك بنسبة 100%.
                    </p>
                </div>

                {/* ── MAIN LAYOUT (WORKSPACE + SIDEBAR) ── */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* UPLOAD / FILES AREA */}
                    <div className="flex-1 order-2 lg:order-1">
                        {files.length === 0 ? (
                            <div
                                className={`relative h-full min-h-[400px] flex flex-col items-center justify-center border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${isDragOver ? 'border-sky-500 bg-sky-50/50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-sky-300'}`}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={e => e.target.files && handleAddFiles(e.target.files)}
                                    title=""
                                />
                                <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 pointer-events-none">
                                    <UploadCloud className="w-12 h-12 text-sky-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-2 pointer-events-none">اسحب وأفلت الصور هنا</h3>
                                <p className="text-gray-500 font-medium mb-6 pointer-events-none">أو اضغط لاختيار الملفات من جهازك</p>
                                <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-sky-500/30 pl-12 pr-12">
                                    اختيار الصور
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full flex flex-col">
                                {/* TOOLBAR */}
                                <div className="bg-gray-50 border-b border-gray-100 p-4 shrink-0 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                        >
                                            <UploadCloud className="w-4 h-4" />
                                            إضافة المزيد
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            onChange={e => e.target.files && handleAddFiles(e.target.files)}
                                        />
                                    </div>
                                    <div className="text-sm font-bold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                        {files.length} صور
                                    </div>
                                </div>

                                {/* FILES LIST */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                                    {files.map(f => (
                                        <div key={f.id} className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-sky-200 transition-all group">

                                            <div className="flex items-center gap-4 w-full sm:w-1/2 min-w-0">
                                                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden relative">
                                                    <img src={f.originalUrl} alt={f.file.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-bold text-gray-800 text-sm truncate" dir="ltr">{f.file.name}</p>
                                                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                                                        {f.originalWidth}×{f.originalHeight}px • {formatSize(f.file.size)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status/Progress */}
                                            <div className="w-full sm:w-1/3 px-2">
                                                {f.status === 'processing' && (
                                                    <div className="w-full flex items-center gap-2">
                                                        <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                                                        <div className="h-1.5 flex-1 bg-sky-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-sky-500 transition-all duration-200" style={{ width: `${f.progress}%` }} />
                                                        </div>
                                                    </div>
                                                )}
                                                {f.status === 'done' && (
                                                    <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg justify-center border border-green-100">
                                                        <CheckCircle className="w-4 h-4" />
                                                        {f.resizedWidth}×{f.resizedHeight}px
                                                    </div>
                                                )}
                                                {f.status === 'error' && (
                                                    <p className="text-xs font-bold text-red-500 flex items-center justify-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> فشل التعديل
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-end gap-2 shrink-0">
                                                {f.status === 'done' && (
                                                    <a
                                                        href={f.resizedUrl}
                                                        download={f.resizedFile?.name}
                                                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                                        title="تحميل"
                                                    >
                                                        <Download className="w-5 h-5" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => removeFile(f.id)}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="إزالة"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR SETTINGS */}
                    <div className="w-full lg:w-[350px] order-1 lg:order-2 shrink-0">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-6">
                            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                                <Settings className="w-6 h-6 text-sky-500" />
                                خيارات التغيير
                            </h2>

                            {/* Mode Toggle */}
                            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                <button
                                    onClick={() => setResizeMode('pixels')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${resizeMode === 'pixels' ? 'bg-white shadow-sm text-sky-600' : 'text-gray-500 hover:text-gray-800'}`}
                                >
                                    بالبيكسل
                                </button>
                                <button
                                    onClick={() => setResizeMode('percentage')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${resizeMode === 'percentage' ? 'bg-white shadow-sm text-sky-600' : 'text-gray-500 hover:text-gray-800'}`}
                                >
                                    بالنسبة المئوية
                                </button>
                            </div>

                            {/* Pixels Mode */}
                            {resizeMode === 'pixels' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">العرض (Width)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={targetWidth}
                                                    onChange={e => handleWidthChange(e.target.value)}
                                                    placeholder="مثال: 1080"
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-left font-mono font-bold text-gray-800 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                                                    dir="ltr"
                                                />
                                                <span className="absolute right-3 top-3 text-xs font-bold text-gray-400">px</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">الارتفاع (Height)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={targetHeight}
                                                    onChange={e => handleHeightChange(e.target.value)}
                                                    placeholder="مثال: 1080"
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-left font-mono font-bold text-gray-800 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                                                    dir="ltr"
                                                />
                                                <span className="absolute right-3 top-3 text-xs font-bold text-gray-400">px</span>
                                            </div>
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-100/50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={maintainAspect}
                                            onChange={e => setMaintainAspect(e.target.checked)}
                                            className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500 cursor-pointer"
                                        />
                                        <span className="text-sm font-bold text-sky-800 select-none">الحفاظ على نسبة العرض للارتفاع</span>
                                    </label>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                        عند ترك حقل فارغ، سيتم حسابه تلقائياً للحفاظ على شكل الصورة.
                                    </p>
                                </div>
                            )}

                            {/* Percentage Mode */}
                            {resizeMode === 'percentage' && (
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-sm font-bold text-gray-700">نسبة التصغير</label>
                                            <span className="text-lg font-black text-sky-600" dir="ltr">{percentage}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="10"
                                            max="200"
                                            step="10"
                                            value={percentage}
                                            onChange={e => setPercentage(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[25, 50, 75, 100, 150, 200].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setPercentage(p)}
                                                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${percentage === p ? 'bg-sky-50 border-sky-500 text-sky-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                                                dir="ltr"
                                            >
                                                {p}%
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                                {files.length === 0 ? (
                                    <button disabled className="w-full py-3.5 bg-gray-200 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed">
                                        غيّر الحجم الآن
                                    </button>
                                ) : hasPending ? (
                                    <button
                                        onClick={handleProcessAll}
                                        disabled={isProcessingAll || (!targetWidth && !targetHeight && resizeMode === 'pixels')}
                                        className={`w-full py-3.5 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2
                      ${isProcessingAll || (!targetWidth && !targetHeight && resizeMode === 'pixels')
                                                ? 'bg-sky-300 cursor-not-allowed shadow-none'
                                                : 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/30'}`}
                                    >
                                        {isProcessingAll ? <Loader2 className="w-5 h-5 animate-spin" /> : <Maximize className="w-5 h-5" />}
                                        {isProcessingAll ? 'جاري المعالجة...' : 'تغيير الحجم الآن'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDownloadAll}
                                        className="w-full py-3.5 bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <DownloadCloud className="w-5 h-5" />
                                        تحميل الكل
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </PageLayout>
    );
}
