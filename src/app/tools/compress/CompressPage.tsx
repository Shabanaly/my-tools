'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { ImageDown, Upload, Download, Check, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompressedImage {
    originalFile: File;
    compressedBlob: Blob;
    originalSize: number;
    compressedSize: number;
    preview: string;
}

export default function ImageCompressor() {
    const [images, setImages] = useState<CompressedImage[]>([]);
    const [quality, setQuality] = useState(0.7);
    const [isProcessing, setIsProcessing] = useState(false);

    const compressImage = async (file: File, q: number): Promise<CompressedImage> =>
        new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) resolve({ originalFile: file, compressedBlob: blob, originalSize: file.size, compressedSize: blob.size, preview: URL.createObjectURL(blob) });
                }, 'image/jpeg', q);
            };
            img.src = URL.createObjectURL(file);
        });

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        setIsProcessing(true);
        const results: CompressedImage[] = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.startsWith('image/')) results.push(await compressImage(files[i], quality));
        }
        setImages((prev) => [...prev, ...results]);
        setIsProcessing(false);
        e.target.value = '';
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' كيلوبايت';
        return (bytes / (1024 * 1024)).toFixed(1) + ' ميجابايت';
    };

    const savings = (img: CompressedImage) =>
        Math.round((1 - img.compressedSize / img.originalSize) * 100);

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
                    style={{ color: '#7048e8' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="p-8 pb-7 text-center text-white"
                        style={{ background: 'linear-gradient(135deg, #7048e8 0%, #9775fa 100%)' }}>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <ImageDown className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-1">ضغط الصور</h1>
                        <p className="text-purple-100 text-sm font-medium">صغّر حجم صورك مع الحفاظ على الجودة</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Quality slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>جودة الضغط</span>
                                <span className="text-sm font-black px-3 py-1 rounded-full"
                                    style={{ background: 'rgba(112,72,232,0.1)', color: '#7048e8' }}>
                                    {Math.round(quality * 100)}%
                                </span>
                            </div>
                            <input type="range" min="0.1" max="1" step="0.05" value={quality}
                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-purple-600"
                                style={{ background: `linear-gradient(to left, #7048e8 ${quality * 100}%, #e8eaf0 ${quality * 100}%)` }} />
                            <div className="flex justify-between text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                <span>ضغط أقوى (حجم أصغر)</span>
                                <span>جودة أعلى (حجم أكبر)</span>
                            </div>
                        </div>

                        {/* Upload zone */}
                        <input type="file" accept="image/*" multiple onChange={handleFileSelect}
                            className="hidden" id="image-upload" disabled={isProcessing} />
                        <label htmlFor="image-upload"
                            className={cn('cursor-pointer flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-3xl p-12 text-center transition-all',
                                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-300')}
                            style={{ borderColor: 'rgba(112,72,232,0.25)', background: 'rgba(112,72,232,0.03)' }}>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                style={{ background: 'rgba(112,72,232,0.1)' }}>
                                <Upload className="w-8 h-8" style={{ color: '#7048e8' }} />
                            </div>
                            <div>
                                <p className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
                                    {isProcessing ? 'جاري الضغط...' : 'اختر الصور أو اسحبها هنا'}
                                </p>
                                <p className="text-sm mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                                    PNG, JPG, WEBP — ملفات متعددة
                                </p>
                            </div>
                        </label>

                        {/* Results */}
                        {images.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-lg" style={{ color: 'var(--text-primary)' }}>الصور المضغوطة</h3>
                                    <span className="text-sm font-bold px-3 py-1 rounded-full"
                                        style={{ background: 'rgba(112,72,232,0.1)', color: '#7048e8' }}>
                                        {images.length} صورة
                                    </span>
                                </div>
                                {images.map((image, index) => (
                                    <div key={index} className="flex gap-4 p-4 rounded-2xl transition-all"
                                        style={{ background: 'rgba(248,249,255,1)', border: '1.5px solid var(--border)' }}>
                                        <img src={image.preview} alt="" className="w-20 h-20 object-cover rounded-xl" />
                                        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                            <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                                                {image.originalFile.name}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span style={{ color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                                                    {formatSize(image.originalSize)}
                                                </span>
                                                <span>→</span>
                                                <span className="font-black" style={{ color: '#0ca678' }}>
                                                    {formatSize(image.compressedSize)}
                                                </span>
                                                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                                    style={{ background: 'rgba(12,166,120,0.1)', color: '#0ca678' }}>
                                                    <Check className="w-3 h-3 inline me-0.5" />
                                                    -{savings(image)}%
                                                </span>
                                            </div>
                                        </div>
                                        <button onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = image.preview;
                                            link.download = `compressed_${image.originalFile.name}`;
                                            link.click();
                                        }} className="self-center p-3 rounded-xl transition-all"
                                            style={{ background: 'rgba(112,72,232,0.1)', color: '#7048e8' }}>
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
