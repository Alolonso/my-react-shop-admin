/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['tailwindui.com', 'images.unsplash.com', 'alolonso.github.io'],
  },
};

module.exports = nextConfig;
