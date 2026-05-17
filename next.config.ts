import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spotify-recently-played-readme.vercel.app",
      },
      {
        protocol: "https",
        hostname: "ets-readme-counter.vercel.app",
      },
    ],
  },
};

export default nextConfig;
