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
    default: "Pasha Muhammad | Software Developer & Founder of Nimia Studio",
    template: "%s | Pasha Muhammad",
  },
  description:
    "Software developer and founder of Nimia Studio in Cianjur, Indonesia. I build web platforms, games, and products on Solana.",
  keywords: [
    "Pasha Muhammad",
    "Muhammad Nur Ibrahim Pasha",
    "Nimia Studio",
    "Software Developer",
    "Next.js Developer",
    "Solana Developer",
    "Game Developer",
    "Lifetopia World",
    "Cianjur",
    "Indonesia",
  ],
  authors: [{ name: "Pasha Muhammad" }],
  creator: "Pasha Muhammad",
  publisher: "Pasha Muhammad",
  openGraph: {
    title: "Pasha Muhammad | Software Developer & Founder of Nimia Studio",
    description:
      "Software developer and founder of Nimia Studio in Cianjur, Indonesia. I build web platforms, games, and products on Solana.",
    url: "https://pashamuhammad.me",
    siteName: "Pasha Muhammad",
    type: "website",
    locale: "en_US",
    // The preview image is generated automatically by app/opengraph-image.tsx,
    // no need to list a static image here.
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasha Muhammad | Software Developer & Founder of Nimia Studio",
    description:
      "Software developer and founder of Nimia Studio in Cianjur, Indonesia. I build web platforms, games, and products on Solana.",
    // The preview image is generated automatically by app/twitter-image.tsx.
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}