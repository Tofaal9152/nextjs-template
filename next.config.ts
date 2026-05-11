import { env } from "@/lib/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: !env.isDevelopment && process.env.DOCKER_ENV === 'true' ? 'standalone' : undefined,
  compiler: {
    removeConsole: !env.isDevelopment,
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
