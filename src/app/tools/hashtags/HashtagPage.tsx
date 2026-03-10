'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { ArrowLeft, Hash, Copy, CheckCircle2, Search, Zap, TrendingUp } from 'lucide-react';

const hashtagCategories = {
    'متنوعة (Trending)': [
        '#اكسبلور', '#explore', '#فولو', '#لايك', '#كومنت', '#السعودية', '#مصر', '#الامارات', '#fyp', '#viral', '#trending', '#tiktok', '#instagram'
    ],
    'تسويق وبزنس': [
        '#تسويق', '#بزنس', '#تجارة_الكترونية', '#ريادة_أعمال', '#تسويق_رقمي', '#marketing', '#business', '#entrepreneur', '#success', '#money', '#عقلية_النجاح', '#مبيعات'
    ],
    'تقنية وبرمجة': [
        '#تقنية', '#تكنولوجيا', '#برمجة', '#مطور', '#تطبيقات', '#ذكاء_اصطناعي', '#tech', '#programming', '#developer', '#coding', '#ai', '#software'
    ],
    'صحة ولياقة (Fitness)': [
        '#دايت', '#صحة', '#لياقة', '#تمرين', '#رياضة', '#جيم', '#fitness', '#gym', '#health', '#workout', '#motivation', '#دايت_صحي', '#تخسيس'
    ],
    'سفر وسياحة': [
        '#سياحة', '#سفر', '#رحلات', '#طبيعة', '#تصوير', '#travel', '#nature', '#photography', '#vacation', '#wanderlust', '#travelgram'
    ]
};

export default function HashtagPage() {
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof hashtagCategories>('متنوعة (Trending)');
    const [copied, setCopied] = useState(false);

    const activeHashtags = hashtagCategories[selectedCategory];

    // Simple filter: if user types, filter the currently selected category (or just show all matching from all if we want, but let's keep it simple to exact matches or just show category)
    const displayedHashtags = keyword.trim()
        ? activeHashtags.filter(tag => tag.includes(keyword.trim().toLowerCase()) || tag.includes(keyword.trim().replace(/^#/, '')))
        : activeHashtags;

    const finalHashtags = displayedHashtags.length > 0 ? displayedHashtags : activeHashtags;
    const hashtagString = finalHashtags.join(' ');

    const handleCopy = () => {
        navigator.clipboard.writeText(hashtagString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
                    style={{ color: '#ec4899' }}>
                    <ArrowLeft className="w-4 h-4" />
                    العودة للرئيسية
                </Link>

                <div className="glass-card rounded-3xl overflow-hidden mb-8">
                    {/* Header */}
                    <div className="p-8 md:p-12 text-center text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto relative z-10 backdrop-blur-md shadow-lg border border-white/10">
                            <Hash className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black mb-3 relative z-10">مولد الهاشتاجات الذكي</h1>
                        <p className="text-pink-50 text-sm md:text-base font-medium relative z-10 max-w-xl mx-auto">
                            احصل على أفضل الهاشتاجات جاهزة للنسخ لزيادة وصول منشوراتك في إنستجرام، تيك توك، وتويتر.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 space-y-8 relative">
                        {/* Search and Categories */}
                        <div className="space-y-6">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="ابحث عن هاشتاج محدد داخل التصنيف..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pr-12 pl-4 py-4 font-bold text-gray-700 focus:outline-none focus:border-pink-400 focus:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {Object.keys(hashtagCategories).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat as keyof typeof hashtagCategories);
                                            setKeyword('');
                                        }}
                                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${selectedCategory === cat
                                            ? 'bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-md shadow-pink-500/20 translate-y-[-2px]'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cat === 'متنوعة (Trending)' ? <TrendingUp className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hashtag Result Area */}
                        <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 relative group">
                            <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                                <Hash className="w-5 h-5 text-pink-500" />
                                الهاشتاجات المقترحة ({finalHashtags.length})
                            </h3>

                            <div className="min-h-[120px] text-gray-700 font-medium leading-relaxed" dir="ltr" style={{ textAlign: 'left' }}>
                                {finalHashtags.map((tag, idx) => (
                                    <span key={idx} className="inline-block mr-2 mb-2 text-pink-600 font-bold hover:text-pink-800 cursor-pointer transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleCopy}
                                    className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center gap-2 ${copied
                                        ? 'bg-green-500 shadow-green-500/25 scale-95'
                                        : 'bg-linear-to-r from-pink-500 to-orange-400 hover:shadow-pink-500/40 hover:-translate-y-1'
                                        }`}
                                >
                                    {copied ? (
                                        <><CheckCircle2 className="w-5 h-5" /> تم النسخ بنجاح!</>
                                    ) : (
                                        <><Copy className="w-5 h-5" /> نسخ {finalHashtags.length} هاشتاج</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 mb-8 text-sm leading-relaxed text-gray-500 text-center bg-orange-50/50 border border-orange-100">
                    <p>
                        <strong>نصيحة احترافية:</strong> لا تستخدم دائماً الهاشتاجات المليونية فقط، قم بدمجها مع هاشتاجات متوسطة للمنافسة بشكل أفضل وتصدر نتائج البحث في منصات مثل إنستجرام وتيك توك.
                    </p>
                </div>

            </div>
        </PageLayout>
    );
}
