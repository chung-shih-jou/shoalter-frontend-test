import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "shoalter-frontend-test",
    short_name: "shoalter-frontend-test",
    description: "shoalter-frontend-test",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.svg",
        sizes: "192x192",
        type: "image/svg",
        purpose: "maskable",
      },
    ],
  };
}
