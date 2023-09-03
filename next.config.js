/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/san-pham/:slug',
                destination: '/products?slug=:slug',
            },
        ];
    },
};

module.exports = nextConfig;
