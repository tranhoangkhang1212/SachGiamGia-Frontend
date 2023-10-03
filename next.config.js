/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/danh-muc/:slug',
                destination: '/products?slug=:slug',
            },
            {
                source: '/chi-tiet/:slug',
                destination: '/product-detail?slug=:slug',
            },
        ];
    },
    images: {
        domains: ['localhost', 's3.sachgiamgia.vn'],
    },
};

module.exports = nextConfig;
