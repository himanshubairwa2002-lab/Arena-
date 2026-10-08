/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The sandbox preview is served from https://{port}-{sandboxId}.e2b.app, so the
  // dev server has to accept that Origin for HMR + server actions.
  allowedDevOrigins: ['*.e2b.app', '*.e2b.dev', 'localhost', '127.0.0.1'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
