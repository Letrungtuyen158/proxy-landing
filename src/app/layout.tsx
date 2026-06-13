import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { brand } from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${brand.name} | Premium IP Proxy Infrastructure`,
  description:
    "Time-based IP proxy plans with unlimited bandwidth. Fast, reliable proxy access for developers and data teams.",
  keywords: ["proxy", "IP proxy", "residential proxy", "datacenter proxy", "web scraping"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-black font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
