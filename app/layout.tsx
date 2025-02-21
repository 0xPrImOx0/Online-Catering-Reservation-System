import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Catering Reservation System",
  description: "PIT made by Cipher Sentinels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
