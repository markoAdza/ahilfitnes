import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vse slikovno gradivo je v /public — oddaljeni nalagalniki niso potrebni.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /*
   * Poti so bile prevedene v slovenščino. Stare angleške ostanejo trajno
   * preusmerjene, da nobena že deljena povezava ali zadetek v iskalniku ne
   * pripelje na 404.
   */
  async redirects() {
    return [
      { source: "/equipment", destination: "/oprema", permanent: true },
      { source: "/pricing", destination: "/cenik", permanent: true },
      { source: "/faq", destination: "/pogosta-vprasanja", permanent: true },
    ];
  },
};

export default nextConfig;
