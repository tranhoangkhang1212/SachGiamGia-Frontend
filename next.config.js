/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/danh-muc/:slug',
                destination: '/products/menu?slug=:slug',
            },
            {
                source: '/chi-tiet/:slug',
                destination: '/product-detail?slug=:slug',
            },
            {
                source: '/tim-kiem/:slug',
                destination: '/products/search?slug=:slug',
            },
        ];
    },
    images: {
        domains: ['localhost', 's3.sachgiamgia.vn'],
    },
};

module.exports = nextConfig;
