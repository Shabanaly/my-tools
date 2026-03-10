import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    const filename = searchParams.get('filename') || 'download';
    const range = req.headers.get('range');

    if (!url) {
        return new NextResponse('URL is required', { status: 400 });
    }

    try {
        const fetchHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Referer': 'https://www.youtube.com/',
            'Accept': '*/*',
            'Accept-Encoding': 'identity',
            'Connection': 'keep-alive'
        };

        if (range) {
            fetchHeaders['Range'] = range;
        }

        const response = await fetch(url, {
            headers: fetchHeaders,
        });

        if (!response.ok && response.status !== 206) {
            throw new Error(`Failed to fetch from source: ${response.status} ${response.statusText}`);
        }

        const stream = response.body;
        if (!stream) {
            throw new Error('No body in response');
        }

        const headers = new Headers();

        // Forward essential headers from the original response
        const forwardHeaders = ['content-type', 'content-length', 'content-range', 'accept-ranges'];
        forwardHeaders.forEach(h => {
            const val = response.headers.get(h);
            if (val) headers.set(h, val);
        });

        // Ensure proper filename for download
        headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

        return new NextResponse(stream as any, {
            status: response.status,
            headers,
        });

    } catch (error: any) {
        console.error('Proxy Error:', error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
