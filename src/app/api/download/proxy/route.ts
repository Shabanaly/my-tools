import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    const filename = searchParams.get('filename') || 'download';

    if (!url) {
        return new NextResponse('URL is required', { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win 64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://www.youtube.com/',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from source: ${response.statusText}`);
        }

        // Forward the stream
        const stream = response.body;
        if (!stream) {
            throw new Error('No body in response');
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const contentLength = response.headers.get('content-length');

        const headers = new Headers();
        headers.set('Content-Type', contentType);
        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        // Force download as a file
        headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

        return new NextResponse(stream as any, {
            status: 200,
            headers,
        });

    } catch (error: any) {
        console.error('Proxy Error:', error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
