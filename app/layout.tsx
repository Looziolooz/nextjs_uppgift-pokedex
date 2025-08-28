// src/app/layout.tsx
import type { Metadata } from "next";
import { Jaldi, Jersey_10 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";

const jaldi = Jaldi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jaldi"
});

const jersey = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey"
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explore the world of Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jaldi.variable} ${jersey.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}