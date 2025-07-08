import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
  protocol: 'https',
  hostname: '**.contentstack.com', 
},
{
  protocol: 'https',
  hostname: 'cdn-wp.thesportsrush.com',
},
{
  protocol: 'https',
  hostname: 'images.unsplash.com',
      },
{
        protocol: 'https',
        hostname: 'e0.365dm.com',
      },

    ],
  },
};

export default nextConfig;
