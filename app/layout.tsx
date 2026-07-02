import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LenisProvider } from "@/components/lenis-provider";
import ClickSpark from "@/components/click-spark";
import "./globals.css";

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Terong Zumba | Zumba & Fitness di Binong Curug",
  description:
    "Ikuti kelas Zumba dan Fitness seru di Binong Curug. Bakar kalori, sehatkan tubuh, dan dapatkan energi positif bersama Terong Zumba!",
  keywords: [
    "zumba",
    "fitness",
    "binong curug",
    "terong zumba",
    "kelas zumba",
    "olahraga",
  ],
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#AFFF00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`font-sans antialiased`}>
        <ClickSpark
          sparkColor="#AFFF00"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  );
}
