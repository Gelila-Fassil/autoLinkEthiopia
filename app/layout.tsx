import type React from "react";
import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autolink Ethiopia | Luxury Cars & High-End Rentals",
  description:
    "The premier destination for luxury automotive sales and exclusive vehicle services in Ethiopia.",
  generator: "v0.app",

  verification: {
    google: "Dqi3tQQ5vT4N0PEyEb_Zz4Oo_xMytjIvvEiSxxzIjaw",
  },

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="font-sans antialiased overflow-x-hidden">
        {children}
      </body>

      <GoogleTagManager gtmId="GTM-XXXXXXX" />
    </html>
  );
}
