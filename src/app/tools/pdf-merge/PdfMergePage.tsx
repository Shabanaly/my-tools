'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import AdBanner from '@/components/AdBanner';
import { ArrowLeft, FileText, UploadCloud, RefreshCw, CheckCircle, Download, X, Layers } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PdfMergePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
            if (selectedFiles.length === 0) {
                alert('يرجى اختيار ملفات PDF فقط بصيغة صحيحة.');
                return;
            }
            setFiles(prev => [...prev, ...selectedFiles]);
            setMergedPdfUrl(null);
            setError(null);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setMergedPdfUrl(null);
    };

    const mergePdfs = async () => {
        if (files.length < 2) {
            setError('يرجى اختيار ملفين (2) على الأقل لعملية الدمج.');
            return;
        }

        setIsMerging(true);
        setError(null);
        setMergedPdfUrl(null);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setMergedPdfUrl(url);
        } catch (err) {
            console.error('Error merging PDFs:', err);
            setError('حدث خطأ أثناء دمج الملفات. تأكد من أن الملفات غير تالفة أو محمية بكلمة مرور.');
        } finally {
            setIsMerging(false);
        }
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#e11d48' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8 shadow-xl shadow-red-900/5">
                    {/* Header bg-gradient */}
                    <div className="p-8 md:p-12 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto relative z-10 backdrop-blur-md shadow-lg border border-white/10">
                            <Layers className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black mb-3 relative z-10">دمج ملفات PDF المتقدم</h1>
                        <p className="text-red-50 text-sm md:text-base font-medium relative z-10 max-w-xl mx-auto">
                            ادمج عدة ملفات PDF بسهولة في ملف واحد. كافة العمليات تتم داخل متصفحك للحفاظ على سرية وأمان مستنداتك بنسبة 100%.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Upload Zone */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-3 border-dashed border-red-200 bg-red-50/30 rounded-3xl p-10 text-center cursor-pointer transition-all hover:border-red-400 hover:bg-red-50/50 flex flex-col items-center justify-center"
                        >
                            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                <UploadCloud className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-2">اضغط هنا لاختيار ملفات PDF</h3>
                            <p className="text-gray-500 text-sm font-medium">يمكنك تحديد أكثر من ملف في نفس الوقت (الحد الأقصى يعتمد على متصفحك)</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="application/pdf"
                                multiple
                                className="hidden"
                            />
                        </div>

                        {/* File List */}
                        {files.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-700 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-red-500" />
                                    الملفات المحددة ({files.length})
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="bg-white border text-right border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative group">
                                            <div className="flex flex-col overflow-hidden pl-2">
                                                <span className="font-medium text-sm text-gray-800 truncate" dir="ltr">{file.name}</span>
                                                <span className="text-xs text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                            </div>
                                            <button
                                                onClick={() => removeFile(idx)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                title="حذف الملف"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        {/* Actions */}
                        {files.length > 0 && !mergedPdfUrl && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => { setFiles([]); setError(null); }}
                                    className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    إفراغ الكل
                                </button>
                                <button
                                    onClick={mergePdfs}
                                    disabled={isMerging || files.length < 2}
                                    className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isMerging || files.length < 2
                                        ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                        : 'bg-linear-to-r from-red-500 to-rose-600 hover:shadow-red-500/40 hover:-translate-y-1'
                                        }`}
                                >
                                    {isMerging ? (
                                        <><RefreshCw className="w-5 h-5 animate-spin" /> جاري دمج الملفات...</>
                                    ) : (
                                        <><Layers className="w-5 h-5" /> دمج المتسندات الآن</>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Success State */}
                        {mergedPdfUrl && (
                            <div className="bg-green-50/50 border border-green-200 rounded-2xl p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-800 mb-2">تم الدمج بنجاح!</h3>
                                    <p className="text-gray-600">تم تجميع كافة الملفات المحددة في ملف PDF واحد جاهز للتحميل.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href={mergedPdfUrl}
                                        download="Merged_Document.pdf"
                                        className="px-8 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                                    >
                                        <Download className="w-5 h-5" /> تحميل الملف الجديد
                                    </a>
                                    <button
                                        onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
                                        className="px-8 py-4 rounded-xl font-bold text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300 transition-all"
                                    >
                                        دمج ملفات أخرى
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 text-sm leading-relaxed text-gray-500 text-center border border-red-50">
                    <p>
                        <strong>أمان وخصوصية تامة:</strong> أداة دمج ملفات الـ PDF تعمل بشكل كلي داخل متصفحك (Client-side).
                        مستنداتك <strong>لا يتم رفعها</strong> لأي خادم (سيرفر) على الإطلاق.
                    </p>
                </div>

                <AdBanner />
            </div>
        </PageLayout>
    );
}
