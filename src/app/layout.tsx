import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://adowatak.com'), // Using a placeholder domain since we don't have the final one
  title: {
    template: '%s | أدواتك',
    default: 'أدواتك | مجموعة أدوات مجانية',
  },
  description: "مجموعة أدوات مجانية تساعدك في حساباتك اليومية مثل التقسيط، الذهب، الزكاة، ومعالجة ملفاتك مثل ضغط الصور وتحويلها إلى PDF بسهولة وأمان وبدون تسجيل دخول.",
  keywords: ["أدوات مجانية", "حاسبة التقسيط", "سعر الذهب اليوم", "حاسبة الزكاة", "ضغط الصور", "تحويل صيغ", "أدواتك"],
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
    url: 'https://adowatak.com',
    title: 'أدواتك | مجموعة أدوات مجانية',
    description: 'تسهل مهامك اليومية بأدوات مجانية بالكامل. بدون تسجيل دخول.',
    siteName: 'أدواتك',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أدواتك | مجموعة أدوات مجانية',
    description: 'تسهل مهامك اليومية بأدوات مجانية بالكامل. بدون تسجيل دخول.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" style={{ colorScheme: 'light', backgroundColor: '#f8f9ff' }}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body style={{ backgroundColor: '#f8f9ff', color: '#0f172a' }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

