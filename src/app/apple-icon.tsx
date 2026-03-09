import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 100,
                    background: 'linear-gradient(135deg, #3b5bdb 0%, #7048e8 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: 40,
                    fontFamily: 'sans-serif',
                    fontWeight: 900,
                }}
            >
                أ
            </div>
        ),
        {
            ...size,
        }
    );
}
