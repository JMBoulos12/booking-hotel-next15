import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "8cut96bsjmbl6yrl.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
