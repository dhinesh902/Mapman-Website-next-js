import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import FloatingContact from "@/components/layout/FloatingContact";
import ScrollToTop from "@/components/layout/ScrollToTop";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAPMAN - Discover Nearby Businesses & Local Shops",
  description:
    "Mapman is your ultimate local search platform. Find trusted shops, services, and local businesses around you instantly using our interactive map and business directory.",
  applicationName: "Mapman",
  keywords: [
    "Mapman",
    "Nearby Shops",
    "Local Businesses",
    "Business Directory",
    "Shop Near Me",
    "Local Search",
    "Business Finder",
    "Store Locator",
    "Maps Navigation",
    "Local Services",
    "Business Listings",
    "Nearby Services",
    "Discover Businesses",
    "Business Reviews",
    "Explore Nearby",
    "Local Marketplace",
  ],
  authors: [{ name: "Mapman" }],
  creator: "Mapman",
  publisher: "Mapman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mapman.in/",
    siteName: "Mapman",
    title: "MAPMAN - Discover Nearby Businesses",
    description: "Find trusted shops, services, and local businesses around you instantly using Mapman's interactive local search platform.",
    images: [
      {
        url: "/app-logo.png",
        width: 1200,
        height: 630,
        alt: "Mapman - Local Business Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAPMAN - Discover Nearby Businesses",
    description: "Find trusted shops, services, and local businesses around you instantly.",
    images: ["/app-logo.png"],
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
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <QueryProvider>
          <AuthProvider>
            <ScrollToTop />
            <Header />
            <main className="flex-1 pt-[112px]">{children}</main>

            <Footer />
            <FloatingContact />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
