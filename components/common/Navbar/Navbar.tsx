// components/Navbar/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';

// Interface för navigationsobjekt - definierar struktur för varje länk
interface NavItem {
  label: string;  // Text som visas för länken
  href: string;   // URL som länken pekar till
}

// Array med alla navigationsalternativ
const navItems: NavItem[] = [
  { label: 'Hem', href: '/' },              // Startsida
  { label: 'Pokédx', href: '/pokedex' },    // Fullständig Pokemon-lista
  { label: 'Typer', href: '/types' },       // Pokemon-typer översikt
  { label: 'Favoriter', href: '/favourites' }, // Sparade Pokemon
];

// Huvudkomponent för navigationsmeny
const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        
        {/* Logo-sektion som fungerar som länk till startsidan */}
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            {/* Pokédx logotyp-bild */}
            <Image
              src="/Logo.png"
              alt="Pokédx logotyp"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            {/* Pokédx text bredvid logotypen */}
            <span className={styles.logoText}>Pokédx</span>
          </div>
        </Link>

        {/* Navigationslänkar */}
        <ul className={styles.navList}>
          {/* Mappa över alla navigationsobjekt och skapa länkar */}
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                {item.label} {/* Visa länktexten */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;