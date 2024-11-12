import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "is1-ssl.mzstatic.com/image/thumb",
      port: "",
      pathname: "/**",
    },
  ],
};

export default nextConfig;
