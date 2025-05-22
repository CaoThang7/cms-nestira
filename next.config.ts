import type { NextConfig } from "next";

const apiBase = process.env.NEXT_PUBLIC_API_NESTIRA;

if (!apiBase || (!apiBase.startsWith("/") && !apiBase.startsWith("http"))) {
  throw new Error(
    "❌ Environment variable NEXT_PUBLIC_API_NESTIRA is invalid or undefined"
  );
}

const cleanedApiBase = apiBase.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${cleanedApiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
