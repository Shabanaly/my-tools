'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import {
    ArrowLeft, UploadCloud, Type, DownloadCloud, X, Settings,
    Palette, Sliders, Type as TypeIcon, Image as ImageIcon,
    SmilePlus
} from 'lucide-react';

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

const FONTS = ['Impact', 'Arial', 'Inter', 'Roboto', 'Comic Sans MS'];

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function MemeApp() {
    // -- Image State
    const [imgSrc, setImgSrc] = useState<string>('');
    const [fileName, setFileName] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    // -- Meme Text State
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');

    // -- Styling State
    const [fontSizePercent, setFontSizePercent] = useState(10);
    const [fontFamily, setFontFamily] = useState('Impact');
    const [textColor, setTextColor] = useState('#ffffff');
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [isUpperCase, setIsUpperCase] = useState(true);

    // -- Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // -- Load Local Image
    const handleFileChange = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setImgSrc(url);

        const img = new Image();
        img.onload = () => {
            imgRef.current = img;
            renderMeme();
        };
        img.src = url;
    };

    // -- Render Logic
    const renderMeme = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw background image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Styling
        const fontSize = (canvas.height * fontSizePercent) / 100;
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = (fontSize * strokeWidth) / 20;
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';

        const drawText = (text: string, y: number) => {
            const processedText = isUpperCase ? text.toUpperCase() : text;
            ctx.strokeText(processedText, canvas.width / 2, y);
            ctx.fillText(processedText, canvas.width / 2, y);
        };

        if (topText) {
            ctx.textBaseline = 'top';
            drawText(topText, canvas.height * 0.05);
        }

        if (bottomText) {
            ctx.textBaseline = 'bottom';
            drawText(bottomText, canvas.height * 0.95);
        }
    }, [topText, bottomText, fontSizePercent, fontFamily, textColor, strokeColor, strokeWidth, isUpperCase, imgSrc]);

    useEffect(() => {
        renderMeme();
    }, [renderMeme]);

    // -- Actions
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.href = url;
        link.download = `meme_${fileName.replace(/\.[^/.]+$/, "")}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleReset = () => {
        setImgSrc('');
        setTopText('');
        setBottomText('');
        imgRef.current = null;
    };

    const hasImage = !!imgSrc;

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70" style={{ color: '#d946ef' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <AdBanner />

                <div className="text-center mb-10 mt-6">
                    <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)', boxShadow: '0 10px 30px rgba(217,70,239,0.3)' }}>
                        <SmilePlus className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">صانع الميمز الاحترافي</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        اصنع الميمز الخاصة بك وشاركها مع أصدقائك في ثوانٍ. سهلة، سريعة، وبدون علامة مائية.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* WORK AREA */}
                    <div className="flex-1 min-w-0">
                        {!hasImage ? (
                            <div
                                className={`h-full min-h-[450px] flex flex-col items-center justify-center border-3 border-dashed rounded-3xl p-12 text-center transition-all bg-white relative ${isDragOver ? 'border-purple-500 bg-purple-50/50' : 'border-gray-200 hover:border-purple-300'}`}
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]); }}
                            >
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])} accept="image/*" />
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                    <UploadCloud className="w-10 h-10 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-2">اختر الصورة لتبدأ</h3>
                                <p className="text-gray-500 font-medium">اسحب الصورة أو اضغط هنا لرفعها</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <ImageIcon className="w-5 h-5 text-purple-500 shrink-0" />
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

                    {/* SETTINGS SIDEBAR */}
                    {hasImage && (
                        <div className="w-full lg:w-[360px] space-y-6 slide-in">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 overflow-hidden">
                                <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                                    <Settings className="w-6 h-6 text-purple-500" />
                                    تعديل الميم
                                </h2>

                                <div className="space-y-5">
                                    {/* Text Inputs */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">النص العلوي</label>
                                        <input
                                            type="text"
                                            value={topText}
                                            onChange={(e) => setTopText(e.target.value)}
                                            placeholder="اكتب هنا..."
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">النص السفلي</label>
                                        <input
                                            type="text"
                                            value={bottomText}
                                            onChange={(e) => setBottomText(e.target.value)}
                                            placeholder="اكتب هنا..."
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-bold"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <label className="text-sm font-bold text-gray-700">حروف كبيرة تلقائياً</label>
                                        <button
                                            onClick={() => setIsUpperCase(!isUpperCase)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isUpperCase ? 'bg-purple-500' : 'bg-gray-200'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isUpperCase ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    {/* Font Settings */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <TypeIcon className="w-4 h-4 text-purple-400" /> نوع الخط
                                        </label>
                                        <select
                                            value={fontFamily}
                                            onChange={(e) => setFontFamily(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-bold appearance-none"
                                        >
                                            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                        </select>
                                    </div>

                                    {/* Colors */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">لون الخط</label>
                                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                                                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded shrink-0 cursor-pointer" />
                                                <span className="text-xs font-mono font-bold uppercase">{textColor}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">لون الإطار</label>
                                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                                                <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="w-8 h-8 rounded shrink-0 cursor-pointer" />
                                                <span className="text-xs font-mono font-bold uppercase">{strokeColor}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sliders */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <Sliders className="w-4 h-4 text-purple-400" /> حجم الخط
                                            </label>
                                            <span className="text-xs font-black text-purple-600">{fontSizePercent}%</span>
                                        </div>
                                        <input type="range" min="3" max="25" value={fontSizePercent} onChange={(e) => setFontSizePercent(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm font-bold text-gray-700">سمك الإطار</label>
                                            <span className="text-xs font-black text-purple-600">{strokeWidth}</span>
                                        </div>
                                        <input type="range" min="0" max="10" value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                    </div>

                                    <button
                                        onClick={handleDownload}
                                        className="w-full mt-6 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2"
                                    >
                                        <DownloadCloud className="w-6 h-6" /> حفظ الميم
                                    </button>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
                                <h3 className="font-black text-purple-900 mb-2 flex items-center gap-2">
                                    <SmilePlus className="w-5 h-5" /> نصيحة المحترفين
                                </h3>
                                <p className="text-sm text-purple-700 font-medium leading-relaxed">
                                    للحصول على المظهر التقليدي للميمز، استخدم خط **Impact** مع لون نص **أبيض** وإطار **أسود** بسمك 2-4.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
