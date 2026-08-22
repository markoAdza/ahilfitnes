import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // All imagery is bundled in /public — no remote loaders needed.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
