import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Loading from "@/components/Loading";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // metadataBase: new URL("your base url"),
  title: "shoalter-frontend-test",
  description: "shoalter-frontend-test",
  category: "website",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <AntdRegistry>{children}</AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
