// src/app/layout.tsx
import type { Metadata } from "next";
import { Jaldi, Jersey_10 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";

// Konfiguration för Jaldi font - används för brödtext och labels
const jaldi = Jaldi({
  subsets: ["latin"],          // Stöd för latinska tecken
  weight: "400",               // Normal vikt
  variable: "--font-jaldi"     // CSS variabel som används i komponenter
});

// Konfiguration för Jersey 10 font - används för titlar och Pokémon namn
const jersey = Jersey_10({
  subsets: ["latin"],          // Stöd för latinska tecken
  weight: "400",               // Normal vikt (Jersey har bara en vikt)
  variable: "--font-jersey"    // CSS variabel för rubriker
});

// Metadata för SEO och sociala medier
export const metadata: Metadata = {
  title: "Pokédex",                    // Titel som visas i browser tab
  description: "Utforska Pokémons värld", // Meta beskrivning för sökresultat
};

// Root layout komponent som wrapppar alla sidor
export default function RootLayout({
  children,                    // Sidinnehåll som renderas inne i layouten
}: Readonly<{
  children: React.ReactNode;   // Typ för React komponenter/element
}>) {
  return (
    <html lang="sv">             {/* Språk satt till svenska */}
      <body
        className={`${jaldi.variable} ${jersey.variable} antialiased`}  
        /* Applicera båda font-variabler och antialiasing för smidigare text */
      >
        {/* Navigationsmeny som visas på alla sidor */}
        <Navbar />
        
        {/* Dynamiskt innehåll från varje sida */}
        {children}
        
        {/* Footer som visas på alla sidor */}
        <Footer />
      </body>
    </html>
  );
}