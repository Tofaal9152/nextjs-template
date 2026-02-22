import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
