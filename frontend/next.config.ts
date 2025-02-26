import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/:path*' // Proxy to backend
      }
    ]
  },
  // Enable standalone mode for Docker deployment
  output: 'standalone',
};

export default nextConfig;
