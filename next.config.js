/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
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
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './src'),
        };
    },
};

module.exports = nextConfig;
