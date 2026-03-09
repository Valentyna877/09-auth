import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;