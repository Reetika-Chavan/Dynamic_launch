/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: 'dev11-images.csnonprod.com', 
      },
      {
        protocol: 'https',
        hostname: 'cdn-wp.thesportsrush.com',
      },
      {
        protocol: 'https',
        hostname: 'e0.365dm.com',
      },
    ],
  },
};

export default nextConfig;
