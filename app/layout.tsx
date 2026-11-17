import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sahā | Respite · Re-align — Executive Recovery Retreat",
  description: "A private recovery experience for founders, leaders, and decision-makers whose work demands sustained focus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#FAF9F5] text-[#23251D] flex flex-col selection:bg-[#B79A2B]/20 selection:text-[#3B4616]">
        {children}
      </body>
    </html>
  );
}
