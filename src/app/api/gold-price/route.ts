import { NextResponse } from 'next/server';

// Returns live gold prices per gram for all karats in EGP
// Sources (no API key required):
//   - api.gold-api.com  → XAU spot price in USD per troy oz (24k)
//   - api.exchangerate-api.com → USD/EGP rate

export async function GET() {
    try {
        const [goldRes, fxRes] = await Promise.all([
            fetch('https://api.gold-api.com/price/XAU', {
                next: { revalidate: 300 }, // cache 5 minutes
                headers: { 'Accept': 'application/json' }
            }),
            fetch('https://api.exchangerate-api.com/v4/latest/USD', {
                next: { revalidate: 3600 }, // cache 1 hour
                headers: { 'Accept': 'application/json' }
            })
        ]);

        if (!goldRes.ok || !fxRes.ok) throw new Error('Upstream fetch failed');

        const goldData = await goldRes.json();
        const fxData = await fxRes.json();

        const xauUsd = goldData.price as number;  // 24k, per troy oz in USD
        const egpRate = fxData.rates?.EGP as number;

        if (!xauUsd || !egpRate) throw new Error('Missing values from APIs');

        // 1 troy oz = 31.1035 grams
        const pricePerGram24k = (xauUsd * egpRate) / 31.1035;

        // Calculate per-gram price for each karat by scaling from 24k
        const karats: Record<string, number> = {};
        [24, 22, 21, 18, 14, 10].forEach((k) => {
            karats[`k${k}`] = Math.round((pricePerGram24k * k) / 24);
        });

        return NextResponse.json({
            karats,               // { k24, k22, k21, k18, k14, k10 } — EGP per gram
            xauUsd,               // spot price used
            egpRate,              // exchange rate used
            source: 'gold-api.com + exchangerate-api.com',
            success: true,
        });

    } catch (error) {
        console.error('[gold-price]', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}
