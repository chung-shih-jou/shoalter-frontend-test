import type { NextConfig } from "next";
// import withSerwistInit from "@serwist/next";

const withPWA = require("@ducanh2912/next-pwa").default({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    image: "/static/images/fallback.png",
    document: "/offline", // if you want to fallback to a custom page rather than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});

const nextConfig: NextConfig = {
  swcMinify: true,
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

export default withPWA(nextConfig);
