import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Overlays from "@/components/Overlays";
import { BRAND } from "@/lib/data";
import { StoreProvider } from "@/lib/store";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: {
    default: `${BRAND.full} — Cricket Bats, Gloves, Pads & Team Gear`,
    template: `%s | ${BRAND.full}`,
  },
  description:
    "Shop Run Machine cricket bats, gloves, pads, helmets and kit bags. Cash on Delivery across India, real-time bat videos on WhatsApp, and gear tested by Run Machine XI.",
  openGraph: {
    title: BRAND.full,
    description: "Cricket gear tested by our own team. COD available across India.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0a0c0f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Overlays />
        </StoreProvider>
      </body>
    </html>
  );
}
