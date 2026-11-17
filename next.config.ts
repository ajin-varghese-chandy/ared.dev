import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 95],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
