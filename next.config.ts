import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
/*   async headers() {
    return [
      {
        source: "/api/payment/notification/:path",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "Get,POST",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-Width, Accept, Accept-Version, Content-Length, Content-MDS, Content-Type, Date, X-API-Version",
          },
        ],
      },
    ];
  }, */

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
