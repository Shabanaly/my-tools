import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface InternalLink {
    title: string;
    url: string;
}

interface SEOArticleProps {
    title: string;
    content: React.ReactNode;
    faqs?: FAQItem[];
    relatedTools?: InternalLink[];
}

export default function SEOArticle({ title, content, faqs, relatedTools }: SEOArticleProps) {
    // Generate FAQ Schema JSON-LD if FAQs exist
    const faqSchema = faqs && faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <article className="max-w-4xl mx-auto mt-24 mb-12 px-6">
            {/* ── JSON-LD Schema For FAQs ── */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            {/* ── Main SEO Content ── */}
            <div className="prose prose-lg prose-emerald rtl:prose-reverse max-w-none text-gray-700 leading-relaxed">
                {/* We use an H2 here because the tool itself (e.g. BgRemoverApp) should contain the main H1 */}
                <h2 className="text-3xl font-black text-gray-800 mb-8 pb-4 border-b border-gray-100">{title}</h2>

                {content}
            </div>

            {/* ── FAQs Section ── */}
            {faqs && faqs.length > 0 && (
                <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                        <HelpCircle className="w-7 h-7 text-emerald-500" />
                        الأسئلة الشائعة حول الأداة
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Internal Links (Related Tools) ── */}
            {relatedTools && relatedTools.length > 0 && (
                <div className="mt-16 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">أدوات قد تهمك أيضاً:</h3>
                    <div className="flex flex-wrap gap-3">
                        {relatedTools.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className="px-5 py-3 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl text-sm font-bold border border-gray-100 hover:border-emerald-200 transition-colors"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
