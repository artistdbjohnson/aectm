import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "aectm.pt" },
      { protocol: "https", hostname: "**.aectm.pt" },
    ],
  },
};

export default nextConfig;
