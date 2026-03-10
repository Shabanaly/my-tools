'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import {
    ArrowLeft, UploadCloud, Crop, CheckCircle, Download,
    Settings, Loader2, Image as ImageIcon, MousePointer2, Minus, Plus,
    DownloadCloud,
    X,
    AlertCircle
} from 'lucide-react';

import ReactCrop, { type Crop as CropType, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

// Center aspect crop by default
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            { unit: '%', width: 90 },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

// Draw cropped part onto canvas
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
    imageMimeType: string
): Promise<{ file: File; url: string }> {
    const image = new Image();
    image.src = imageSrc;
    await new Promise(resolve => { image.onload = resolve; });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    // Set physical dimensions to match the crop
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve, reject) => {
        // Avoid WebP bugs by forcing output to PNG if original was PNG, otherwise JPEG
        const outMime = imageMimeType === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Canvas is empty'));
                return;
            }
            const fileUrl = URL.createObjectURL(blob);
            const ext = outMime === 'image/png' ? 'png' : 'jpg';
            const file = new File([blob], `cropped_image.${ext}`, { type: outMime });
            resolve({ file, url: fileUrl });
        }, outMime, 0.95);
    });
}

// ---------------------------------------------------------------------------
// MAIN APP COMPONENT
// ---------------------------------------------------------------------------
export default function CropperApp() {
    const [imgSrc, setImgSrc] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileSize, setFileSize] = useState(0);

    const imgRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [crop, setCrop] = useState<CropType>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(undefined);

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorObj, setErrorObj] = useState<string | null>(null);

    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [croppedUrl, setCroppedUrl] = useState<string | null>(null);

    // Drag state
    const [isDragOver, setIsDragOver] = useState(false);

    // -- Add Files
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            loadFileData(e.target.files[0]);
        }
    };

    const loadFileData = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setErrorObj('يرجى اختيار ملف صورة صالح.');
            return;
        }
        setErrorObj(null);
        setCrop(undefined); // Reset crop
        setCompletedCrop(undefined);
        setCroppedFile(null);
        if (croppedUrl) URL.revokeObjectURL(croppedUrl);
        setCroppedUrl(null);

        setFileName(file.name);
        setFileType(file.type);
        setFileSize(file.size);

        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(file);
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
            loadFileData(e.dataTransfer.files[0]);
        }
    };

    // -- Image loaded into Crop tool
    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        // Generate initial crop
        const { width, height } = e.currentTarget;
        if (aspect) {
            setCrop(centerAspectCrop(width, height, aspect));
        } else {
            // Default initial free crop: 90% in center
            setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 1, width, height), width, height));
        }
    }

    // -- Change Aspect Ratio
    const handleToggleAspect = (newAspect: number | undefined) => {
        if (newAspect) {
            setAspect(newAspect);
            if (imgRef.current) {
                const { width, height } = imgRef.current;
                setCrop(centerAspectCrop(width, height, newAspect));
            }
        } else {
            setAspect(undefined);
            if (imgRef.current) {
                const { width, height } = imgRef.current;
                setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 1, width, height), width, height));
            }
        }
    };

    // -- Do Crop Operation
    const handleCropImage = async () => {
        if (!completedCrop || !imgRef.current || !imgSrc) return;
        if (completedCrop.width === 0 || completedCrop.height === 0) return;

        setIsProcessing(true);
        setErrorObj(null);

        try {
            const { file, url } = await getCroppedImg(imgSrc, completedCrop, fileType);

            if (croppedUrl) URL.revokeObjectURL(croppedUrl); // Clean old ones
            setCroppedFile(file);
            setCroppedUrl(url);

        } catch (err: any) {
            setErrorObj(err.message || 'حدث خطأ أثناء القص.');
        } finally {
            setIsProcessing(false);
        }
    };

    // -- Reset
    const handleReset = () => {
        setImgSrc('');
        setFileName('');
        if (croppedUrl) URL.revokeObjectURL(croppedUrl);
        setCroppedFile(null);
        setCroppedUrl(null);
        setCrop(undefined);
        setCompletedCrop(undefined);
    };

    const hasImage = !!imgSrc;
    const isDone = !!croppedUrl;

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70" style={{ color: '#f59e0b' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <AdBanner />

                {/* ── HEADER ── */}
                <div className="text-center mb-10 mt-6">
                    <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 10px 30px rgba(245,158,11,0.3)' }}>
                        <Crop className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">قص الصور (Crop)</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        حدد الجزء الذي تريده من صورتك واقطع الباقي بدقة. ادعم أبعاد ثابتة للترويج على السوشيال ميديا
                        بدون فقدان الجودة. الأداة تعمل 100% في متصفحك.
                    </p>
                </div>

                {/* ── MAIN LAYOUT (WORKSPACE + SIDEBAR) ── */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* UPLOAD / WORKSPACE AREA */}
                    <div className="flex-1 order-2 lg:order-1 flex flex-col min-w-0">
                        {!hasImage ? (
                            <div
                                className={`relative h-full min-h-[400px] flex flex-col items-center justify-center border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${isDragOver ? 'border-amber-500 bg-amber-50/50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-amber-300'}`}
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
                                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 pointer-events-none">
                                    <UploadCloud className="w-12 h-12 text-amber-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-2 pointer-events-none">حدد الصورة المراد قصّها</h3>
                                <p className="text-gray-500 font-medium mb-6 pointer-events-none">أو اسحب وأفلت الصورة هنا</p>
                                <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-amber-500/30">
                                    اختيار صورة
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col flex-1">
                                {/* TOOLBAR */}
                                <div className="bg-gray-50 border-b border-gray-100 p-4 shrink-0 flex items-center justify-between">
                                    <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                                            <ImageIcon className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-gray-800 text-sm truncate" dir="ltr">{fileName}</p>
                                            <p className="text-xs text-gray-500">{formatSize(fileSize)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 ml-2"
                                        title="إزالة الصورة"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* EDITING / PREVIEW AREA */}
                                <div className="flex-1 bg-gray-900 overflow-hidden flex items-center justify-center p-4 relative min-h-[400px]">
                                    {isDone ? (
                                        <div className="flex flex-col items-center justify-center fade-in">
                                            <img
                                                src={croppedUrl!}
                                                alt="Cropped Preview"
                                                className="max-w-full max-h-[50vh] rounded-xl shadow-2xl border-4 border-white/10"
                                            />
                                            <div className="mt-6 flex gap-4">
                                                <a
                                                    href={croppedUrl!}
                                                    download={croppedFile?.name || 'cropped-image.jpg'}
                                                    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg transition-all"
                                                >
                                                    <DownloadCloud className="w-5 h-5" />
                                                    تحميل الصورة ({formatSize(croppedFile?.size || 0)})
                                                </a>
                                                <button
                                                    onClick={() => {
                                                        setCroppedUrl(null);
                                                        setCroppedFile(null);
                                                    }}
                                                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                                                >
                                                    تعديل مجدداً
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            aspect={aspect}
                                            className="max-h-full max-w-full my-auto mx-auto object-contain flex items-center justify-center"
                                        >
                                            <img
                                                ref={imgRef}
                                                alt="Crop target"
                                                src={imgSrc}
                                                onLoad={onImageLoad}
                                                className="max-h-[60vh] md:max-h-[70vh] max-w-full w-auto object-contain"
                                            />
                                        </ReactCrop>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR SETTINGS */}
                    <div className="w-full lg:w-[320px] order-1 lg:order-2 shrink-0">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-6">
                            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                                <Settings className="w-6 h-6 text-amber-500" />
                                خيارات نسبة القص
                            </h2>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleToggleAspect(undefined)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-bold
                    ${aspect === undefined ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="flex items-center gap-2"><MousePointer2 className="w-4 h-4" /> حر (Freeform)</span>
                                    <span className="text-xs text-gray-400 font-normal">تحديد يدوي</span>
                                </button>

                                <button
                                    onClick={() => handleToggleAspect(1)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-bold
                    ${aspect === 1 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 rounded-sm inline-block" /> مربع</span>
                                    <span className="text-xs text-gray-400 font-normal" dir="ltr">1:1</span>
                                </button>

                                <button
                                    onClick={() => handleToggleAspect(16 / 9)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-bold
                    ${aspect === 16 / 9 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="flex items-center gap-2"><span className="w-5 h-3 border-2 rounded-sm inline-block" /> فيديو</span>
                                    <span className="text-xs text-gray-400 font-normal" dir="ltr">16:9</span>
                                </button>

                                <button
                                    onClick={() => handleToggleAspect(4 / 3)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-bold
                    ${aspect === 4 / 3 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="flex items-center gap-2"><span className="w-4 h-3 border-2 rounded-sm inline-block" /> صورة قياسية</span>
                                    <span className="text-xs text-gray-400 font-normal" dir="ltr">4:3</span>
                                </button>

                                <button
                                    onClick={() => handleToggleAspect(9 / 16)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-bold
                    ${aspect === 9 / 16 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="flex items-center gap-2"><span className="w-3 h-5 border-2 rounded-sm inline-block" /> ستوري/تيك توك</span>
                                    <span className="text-xs text-gray-400 font-normal" dir="ltr">9:16</span>
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
                                {errorObj && (
                                    <p className="text-xs font-bold text-red-500 flex items-center justify-center gap-1 mb-2 bg-red-50 rounded-lg py-2">
                                        <AlertCircle className="w-4 h-4" /> {errorObj}
                                    </p>
                                )}

                                {!hasImage ? (
                                    <button disabled className="w-full py-3.5 bg-gray-200 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed">
                                        قص الصورة الآن
                                    </button>
                                ) : isDone ? (
                                    <div className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700 rounded-xl font-bold border border-green-200">
                                        <CheckCircle className="w-5 h-5" /> اكتمل القص بنجاح
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleCropImage}
                                        disabled={isProcessing || !completedCrop?.width}
                                        className={`w-full py-3.5 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2
                      ${isProcessing || !completedCrop?.width
                                                ? 'bg-amber-300 cursor-not-allowed shadow-none'
                                                : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'}`}
                                    >
                                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Crop className="w-5 h-5" />}
                                        {isProcessing ? 'جاري القص...' : 'قص الصورة الآن'}
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
