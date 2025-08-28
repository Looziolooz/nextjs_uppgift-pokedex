// components/Navbar/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Pokedex', href: '/pokedex' },
  { label: 'Types', href: '/types' },
  { label: 'Favourites', href: '/favourites' },
];

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <Image
              src="/Logo.png"
              alt="Pokédex"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>Pokédex</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;