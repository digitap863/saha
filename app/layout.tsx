import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Playfair_Display, Inter_Tight } from "next/font/google";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { Navbar, Footer, SmoothScroll, Preloader } from "@/components/common";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-playfair-display",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahā | Respite · Re-align — Executive Recovery Retreat",
  description:
    "A private recovery experience for founders, leaders, and decision-makers whose work demands sustained focus.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} ${playfair.variable} ${interTight.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-white text-[#23251D] flex flex-col selection:bg-[#B79A2B]/20 selection:text-[#3B4616]">
        <Preloader />
        <EnquiryProvider>
          <SmoothScroll>
            <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#22251B]">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </EnquiryProvider>
      </body>
    </html>
  );
}
