'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import {
    ArrowLeft, UploadCloud, Type, Image as ImageIcon,
    DownloadCloud, X, Settings, LayoutGrid,
    AlignCenter, AlignLeft, AlignRight,
    Palette, Sliders
} from 'lucide-react';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type WatermarkType = 'text' | 'image';
type Position = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

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
// COMPONENT
// ---------------------------------------------------------------------------
export default function WatermarkApp() {
    // -- Main Source Image
    const [imgSrc, setImgSrc] = useState<string>('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });

    // -- Watermark Settings
    const [watermarkType, setWatermarkType] = useState<WatermarkType>('text');
    const [position, setPosition] = useState<Position>('bottom-right');
    const [opacity, setOpacity] = useState(0.5);

    // -- Text Settings
    const [wmText, setWmText] = useState('© أدواتك');
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontSizePercent, setFontSizePercent] = useState(5); // % of image height
    const [fontFamily, setFontFamily] = useState('Arial');

    // -- Image Watermark Settings
    const [wmImgSrc, setWmImgSrc] = useState<string>('');
    const [wmImgSize, setWmImgSize] = useState({ w: 0, h: 0 });
    const [wmScale, setWmScale] = useState(0.2); // % of image width

    // -- Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainImgRef = useRef<HTMLImageElement | null>(null);
    const wmImgRef = useRef<HTMLImageElement | null>(null);

    // -- Drag & Drop Main Image
    const [isDragOver, setIsDragOver] = useState(false);

    const handleMainFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setFileName(file.name);
        setFileType(file.type);
        const url = URL.createObjectURL(file);
        setImgSrc(url);

        const img = new Image();
        img.onload = () => {
            setOriginalSize({ w: img.width, h: img.height });
            mainImgRef.current = img;
            renderCanvas();
        };
        img.src = url;
    };

    const handleWmFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        setWmImgSrc(url);

        const img = new Image();
        img.onload = () => {
            setWmImgSize({ w: img.width, h: img.height });
            wmImgRef.current = img;
            renderCanvas();
        };
        img.src = url;
    };

    // -- Rendering Logic
    const renderCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const mainImg = mainImgRef.current;
        if (!canvas || !mainImg) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to original dimensions
        canvas.width = mainImg.width;
        canvas.height = mainImg.height;

        // Clear and draw background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(mainImg, 0, 0);

        // Apply Watermark
        ctx.globalAlpha = opacity;

        if (watermarkType === 'text') {
            const size = (canvas.height * fontSizePercent) / 100;
            ctx.font = `bold ${size}px ${fontFamily}`;
            ctx.fillStyle = textColor;
            ctx.textBaseline = 'middle';

            const metrics = ctx.measureText(wmText);
            const textWidth = metrics.width;
            const padding = canvas.width * 0.03;

            let x = padding;
            let y = padding + size / 2;

            // Positioning logic
            if (position.includes('center')) x = (canvas.width - textWidth) / 2;
            if (position.includes('right')) x = canvas.width - textWidth - padding;
            if (position.includes('bottom')) y = canvas.height - padding - size / 2;
            if (position === 'center') y = canvas.height / 2;

            ctx.fillText(wmText, x, y);
        } else if (watermarkType === 'image' && wmImgRef.current) {
            const wmImg = wmImgRef.current;
            const targetWidth = canvas.width * wmScale;
            const targetHeight = wmImg.height * (targetWidth / wmImg.width);
            const padding = canvas.width * 0.03;

            let x = padding;
            let y = padding;

            if (position.includes('center')) x = (canvas.width - targetWidth) / 2;
            if (position.includes('right')) x = canvas.width - targetWidth - padding;
            if (position.includes('bottom')) y = canvas.height - targetHeight - padding;
            if (position === 'center') y = (canvas.height - targetHeight) / 2;

            ctx.drawImage(wmImg, x, y, targetWidth, targetHeight);
        }

        ctx.globalAlpha = 1.0;
    }, [imgSrc, wmImgSrc, watermarkType, position, opacity, wmText, textColor, fontSizePercent, fontFamily, wmScale]);

    useEffect(() => {
        renderCanvas();
    }, [renderCanvas]);

    // -- Download
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const outMime = fileType === 'image/png' ? 'image/png' : 'image/jpeg';
        const url = canvas.toDataURL(outMime, 0.9);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName.replace(/\.[^/.]+$/, "") + "_watermarked." + (outMime === 'image/png' ? 'png' : 'jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleReset = () => {
        setImgSrc('');
        setWmImgSrc('');
        mainImgRef.current = null;
        wmImgRef.current = null;
    };

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70" style={{ color: '#0ea5e9' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="text-center mb-10 mt-6">
                    <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', boxShadow: '0 10px 30px rgba(14,165,233,0.3)' }}>
                        <LayoutGrid className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">إضافة علامة مائية للصور</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        احمِ حقوقك وأضف هويتك البصرية (نص أو شعار) على صورك بسهولة وبسرعة فائقة. كل شيء يتم داخل متصفحك.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* WORKSPACE */}
                    <div className="flex-1 min-w-0">
                        {!imgSrc ? (
                            <div
                                className={`h-full min-h-[450px] flex flex-col items-center justify-center border-3 border-dashed rounded-3xl p-12 text-center transition-all bg-white relative ${isDragOver ? 'border-sky-500 bg-sky-50/50' : 'border-gray-200 hover:border-sky-300'}`}
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files[0]) handleMainFile(e.dataTransfer.files[0]); }}
                            >
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && handleMainFile(e.target.files[0])} accept="image/*" />
                                <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                                    <UploadCloud className="w-10 h-10 text-sky-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-2">اختر الصورة الأساسية</h3>
                                <p className="text-gray-500 font-medium">اسحب الصورة لتبدأ في حماية حقوقك</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <ImageIcon className="w-5 h-5 text-sky-500 shrink-0" />
                                        <span className="font-bold text-gray-700 truncate text-sm" dir="ltr">{fileName}</span>
                                    </div>
                                    <button onClick={handleReset} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6 bg-gray-900 flex items-center justify-center min-h-[400px]">
                                    <canvas ref={canvasRef} className="max-w-full max-h-[70vh] rounded shadow-2xl" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    {imgSrc && (
                        <div className="w-full lg:w-[360px] flex flex-col gap-6 slide-in">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                                <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                                    <Settings className="w-6 h-6 text-sky-500" />
                                    إعدادات العلامة
                                </h2>

                                {/* Type Toggle */}
                                <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                    <button
                                        onClick={() => setWatermarkType('text')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${watermarkType === 'text' ? 'bg-white shadow text-sky-600' : 'text-gray-500'}`}
                                    >
                                        <Type className="w-4 h-4" /> نص
                                    </button>
                                    <button
                                        onClick={() => setWatermarkType('image')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${watermarkType === 'image' ? 'bg-white shadow text-sky-600' : 'text-gray-500'}`}
                                    >
                                        <ImageIcon className="w-4 h-4" /> شعار
                                    </button>
                                </div>

                                {watermarkType === 'text' ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                <Type className="w-4 h-4 text-sky-400" /> النص المكتوب
                                            </label>
                                            <input
                                                type="text"
                                                value={wmText}
                                                onChange={(e) => setWmText(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                    <Palette className="w-4 h-4 text-sky-400" /> اللون
                                                </label>
                                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                                                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded shrink-0 cursor-pointer" />
                                                    <span className="text-xs font-mono font-bold uppercase">{textColor}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                    <Sliders className="w-4 h-4 text-sky-400" /> الحجم (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={fontSizePercent}
                                                    onChange={(e) => setFontSizePercent(Number(e.target.value))}
                                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold text-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-sky-400 transition-colors">
                                            {!wmImgSrc ? (
                                                <>
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && handleWmFile(e.target.files[0])} accept="image/*" />
                                                    <ImageIcon className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                                                    <p className="text-xs font-bold text-gray-600">اضغط لرفع الشعار (PNG شفاف)</p>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-between gap-3">
                                                    <img src={wmImgSrc} className="h-12 w-12 object-contain bg-gray-50 rounded" alt="WM Logo" />
                                                    <button onClick={() => setWmImgSrc('')} className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-sm font-bold text-gray-700">مقياس الشعار</label>
                                                <span className="text-xs font-black text-sky-600">{Math.round(wmScale * 100)}%</span>
                                            </div>
                                            <input type="range" min="0.05" max="0.8" step="0.01" value={wmScale} onChange={(e) => setWmScale(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-gray-700">الشفافية</label>
                                        <span className="text-xs font-black text-sky-600">{Math.round(opacity * 100)}%</span>
                                    </div>
                                    <input type="range" min="0.1" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <label className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                        <LayoutGrid className="w-4 h-4 text-sky-400" /> موقع العلامة
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'] as Position[]).map((pos) => (
                                            <button
                                                key={pos}
                                                onClick={() => setPosition(pos)}
                                                className={`h-12 rounded-lg border-2 transition-all flex items-center justify-center ${position === pos ? 'border-sky-500 bg-sky-50 shadow-inner' : 'border-gray-100 hover:border-sky-200'}`}
                                            >
                                                <div className={`w-3 h-3 rounded-full ${position === pos ? 'bg-sky-500' : 'bg-gray-200'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleDownload}
                                    className="w-full mt-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2"
                                >
                                    <DownloadCloud className="w-6 h-6" /> تحميل الصورة النهائية
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
