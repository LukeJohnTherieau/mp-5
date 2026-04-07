import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "URL Shortener",
  description: "URL Shortener for MET CS 601",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
