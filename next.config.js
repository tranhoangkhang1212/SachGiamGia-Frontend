/** @type {import('next').NextConfig} */
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
        domains: ['localhost'],
    },
};

module.exports = nextConfig;
