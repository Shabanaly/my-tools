import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Cairo } from 'next/font/google';
import "./globals.css";

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

export const viewport = {
  themeColor: '#3b5bdb',
};

export const metadata: Metadata = {
  applicationName: 'أدواتك',
  appleWebApp: {
    capable: true,
    title: 'أدواتك',
    statusBarStyle: 'black-translucent',
  },
  metadataBase: new URL('https://tools.daleel-al-suez.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    template: '%s | أدواتك - مجموعة أدواتك اليومية المجانية بالكامل',
    default: 'أدواتك | أرقى وأسرع مجموعة أدوات مجانية للمصريين والعرب',
  },
  description: "أضخم وأسرع مجموعة أدوات مجانية وقوية للمهنيين والمستخدمين في مصر والوطن العربي. احسب مرتبك الصافي، سعر الذهب بمصر، الزكاة، التقسيط، وحمل فيديوهات تيك توك بدون علامة مائية، بالإضافة لأدوات تحويل الـ PDF ومعالجة الصور بالذكاء الاصطناعي مجاناً وبأمان تام.",
  keywords: [
    "أدوات مجانية", "حاسبة المرتب المصري", "سعر الذهب اليوم في مصر", "حاسبة الزكاة",
    "ضغط الصور", "تحويل صيغ", "تحميل فيديوهات تيك توك", "تحميل فيديوهات يوتيوب",
    "تحويل PDF", "إزالة الخلفية بالذكاء الاصطناعي", "أدواتك", "أدوات اونلاين",
    "حساب القسط", "حساب العمر بالهجري والميلادي", "استخراج النص من الصور", "OCR عربي"
  ],
  authors: [{ name: "أدواتك" }],
  creator: "أدواتك",
  publisher: "أدواتك",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://tools.daleel-al-suez.com',
    title: 'أدواتك | أرقى وأسرع مجموعة أدوات مجانية للمصريين والعرب',
    description: 'كل ما تحتاجه من أدوات مالية، تقنية، وأدوات ملفات في مكان واحد. مجاناً، سريع، وبأمان صارم على جهازك.',
    siteName: 'أدواتك',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'أدواتك - مجموعة أدواتك اليومية المجانية',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أدواتك | مجموعة أدوات مجانية للمصريين والعرب',
    description: 'أدوات مالية، تحويل ملفات، ومعالجة صور بالذكاء الاصطناعي - مجانية 100% وبدون تسجيل.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} style={{ colorScheme: 'light', backgroundColor: '#f8f9ff' }}>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
      </head>
      <body style={{ backgroundColor: '#f8f9ff', color: '#0f172a' }}>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5152627364584775"
          crossOrigin="anonymous"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

