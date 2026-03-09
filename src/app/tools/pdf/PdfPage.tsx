'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { FileImage, Upload, Download, X, Plus, ArrowLeft } from 'lucide-react';

interface ImageFile {
    file: File;
    preview: string;
    id: string;
}

export default function ImageToPdf() {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const newImages: ImageFile[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                newImages.push({ file, preview: URL.createObjectURL(file), id: Math.random().toString(36).substr(2, 9) });
            }
        }
        setImages((prev) => [...prev, ...newImages]);
        e.target.value = '';
    };

    const generatePdf = async () => {
        if (images.length === 0) return;
        setIsGenerating(true);
        try {
            const printWindow = window.open('', '_blank');
            if (!printWindow) { alert('يرجى السماح بالنوافذ المنبثقة'); setIsGenerating(false); return; }
            const imagesHtml = images.map((img) =>
                `<div style="page-break-after:always;display:flex;justify-content:center;align-items:center;height:100vh;">
                    <img src="${img.preview}" style="max-width:100%;max-height:100%;object-fit:contain;" />
                </div>`
            ).join('');
            printWindow.document.write(`<!DOCTYPE html><html><head><title>PDF</title>
                <style>*{margin:0;padding:0;box-sizing:border-box;}@media print{@page{margin:0;}}</style></head>
                <body>${imagesHtml}<script>window.onload=function(){setTimeout(function(){window.print();window.close();},500);};<\/script></body></html>`);
            printWindow.document.close();
        } catch { alert('حدث خطأ أثناء الإنشاء'); }
        setIsGenerating(false);
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
                    style={{ color: '#e03131' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="p-8 pb-7 text-center text-white"
                        style={{ background: 'linear-gradient(135deg, #e03131 0%, #f03e3e 100%)' }}>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <FileImage className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-1">تحويل صور إلى PDF</h1>
                        <p className="text-red-100 text-sm font-medium">ادمج عدة صور في ملف PDF واحد بضغطة زر</p>
                    </div>

                    <div className="p-8">
                        {images.length === 0 ? (
                            <div className="max-w-xl mx-auto py-6">
                                <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" id="pdf-upload" />
                                <label htmlFor="pdf-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center gap-5 border-2 border-dashed rounded-3xl p-14 text-center transition-all hover:border-red-300"
                                    style={{ borderColor: 'rgba(224,49,49,0.25)', background: 'rgba(224,49,49,0.03)' }}>
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                        style={{ background: 'rgba(224,49,49,0.1)' }}>
                                        <Upload className="w-8 h-8" style={{ color: '#e03131' }} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>اختر الصور للتحويل</p>
                                        <p className="text-sm mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>PNG, JPG, WEBP — ملفات متعددة</p>
                                    </div>
                                </label>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>ترتيب الصور ({images.length})</h3>
                                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>الصفحات ستكون بنفس هذا الترتيب</p>
                                    </div>
                                    <button onClick={generatePdf} disabled={isGenerating}
                                        className="flex items-center gap-2 px-6 py-3 font-black text-white rounded-xl transition-all disabled:opacity-50"
                                        style={{ background: 'linear-gradient(135deg, #e03131 0%, #f03e3e 100%)', boxShadow: '0 6px 20px rgba(224,49,49,0.35)' }}>
                                        <Download className="w-5 h-5" />
                                        {isGenerating ? 'جاري الإنشاء...' : 'تحميل PDF'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {images.map((img, index) => (
                                        <div key={img.id} className="relative group" style={{ aspectRatio: '3/4' }}>
                                            <img src={img.preview} alt="" className="w-full h-full object-cover rounded-2xl"
                                                style={{ border: '2px solid var(--border)' }} />
                                            <div className="absolute top-2 end-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                                                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                                                {index + 1}
                                            </div>
                                            <button onClick={() => setImages((prev) => prev.filter((i) => i.id !== img.id))}
                                                className="absolute -top-2 -start-2 w-7 h-7 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ background: '#e03131' }}>
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    <label htmlFor="pdf-upload-more" className="cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-2 transition-all"
                                        style={{ aspectRatio: '3/4', border: '2px dashed rgba(224,49,49,0.25)', background: 'rgba(224,49,49,0.03)', color: '#e03131' }}>
                                        <Plus className="w-8 h-8" />
                                        <span className="text-xs font-bold">إضافة</span>
                                        <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" id="pdf-upload-more" />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <AdBanner />
            </div>
        </PageLayout>
    );
}
