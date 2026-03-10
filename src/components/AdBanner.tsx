'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
    className?: string;
    adClient?: string;
    adSlot?: string;
    adFormat?: string;
    fullWidthResponsive?: boolean;
    label?: string;
}

export default function AdBanner({
    className,
    adClient = 'ca-pub-5152627364584775', // Real Pub ID
    adSlot = '6394554629',                // Placeholder Slot ID (User should update this)
    adFormat = 'auto',
    fullWidthResponsive = true,
    label = 'مساحة إعلانية'
}: AdBannerProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('Adsense error', err);
        }
    }, []);

    // In development or if IDs are placeholders, show a styled fallback block
    const isDevOrPlaceholder = process.env.NODE_ENV === 'development' || adClient.includes('XXXXXXXX');

    if (isDevOrPlaceholder) {
        return (
            <div
                className={cn(
                    "w-full bg-gray-100 border border-dashed border-gray-300 h-24 flex flex-col items-center justify-center text-gray-400 text-sm rounded-lg my-8",
                    className
                )}
            >
                <div className="font-bold mb-1">{label}</div>
                <div className="text-xs opacity-70">AdSense Unit (Disabled in Dev)</div>
            </div>
        );
    }

    return (
        <div className={cn("w-full overflow-hidden flex justify-center my-8", className)}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
            />
        </div>
    );
}
