import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParallaxClientProvider from "@/components/ParallaxClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team 21 - Fortnite",
  description: "Official Team 21 - Fortnite Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white relative min-h-screen`}
        style={{
          backgroundImage: "url(/images/banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 bg-black/70 z-0"
          aria-hidden="true"
        ></div>
        <ParallaxClientProvider>
          <div className="relative z-10">{children}</div>
        </ParallaxClientProvider>
      </body>
    </html>
  );
}
