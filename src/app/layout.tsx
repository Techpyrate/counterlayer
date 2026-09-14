import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import { DisclaimerBanner, Footer, Nav } from "@/components/Shell";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CounterLayer — Diligence & Guidance",
  description:
    "Diligence tools and practical guides for competition, consumer protection, and public compliance. Not a law firm. Not a substitute for counsel.",
  appleWebApp: {
    capable: true,
    title: "CounterLayer",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#f4faf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="grain flex min-h-full flex-col antialiased">
        <AuthProvider>
          <DisclaimerBanner />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
