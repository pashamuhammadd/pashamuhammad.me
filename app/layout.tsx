import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://pashamuhammad.me"),
  title: {
    default: "Pasha Muhammad | Founder, Web3 Builder, GameFi Entrepreneur",
    template: "%s | Pasha Muhammad",
  },
  description:
    "Personal website of Pasha Muhammad, founder of Nimia Games and Lifetopia World. Building digital ventures across gaming, Web3, AI, and emerging technologies.",
  keywords: [
    "Pasha Muhammad",
    "Muhammad Nur Ibrahim Pasha",
    "Nimia Games",
    "Lifetopia World",
    "Web3 Founder",
    "GameFi",
    "Solana Builder",
    "AI Products",
    "Digital Startup",
    "Indonesia Founder",
  ],
  authors: [{ name: "Pasha Muhammad" }],
  creator: "Pasha Muhammad",
  publisher: "Pasha Muhammad",
  openGraph: {
    title: "Pasha Muhammad | Founder, Web3 Builder, GameFi Entrepreneur",
    description:
      "Founder of Nimia Games and Lifetopia World. Building digital ventures across gaming, Web3, AI, and emerging technologies.",
    url: "https://pashamuhammad.me",
    siteName: "Pasha Muhammad",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pasha Muhammad Personal Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasha Muhammad | Founder, Web3 Builder, GameFi Entrepreneur",
    description:
      "Founder of Nimia Games and Lifetopia World. Building digital ventures across gaming, Web3, AI, and emerging technologies.",
    images: ["/og-image.png"],
    creator: "@mochnuribrahimpasha",
  },
  alternates: {
    canonical: "https://pashamuhammad.me",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}