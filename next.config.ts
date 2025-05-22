import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_NESTIRA;
    
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_NESTIRA is not defined, skipping API rewrites');
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;