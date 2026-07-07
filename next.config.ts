import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "d7bnll1h35b3b.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "api.mapman.in",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
