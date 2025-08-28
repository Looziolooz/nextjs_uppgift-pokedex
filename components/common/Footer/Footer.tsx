// src/components/common/Footer/Footer.tsx
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Image
            src="/Logo.png"
            alt="Pokédex"
            width={40}
            height={40}
            className={styles.logo}
          />
          <span className={styles.logoText}>Pokédex</span>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>
          Explore the world of Pokémon
        </p>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Visit our Facebook page"
          >
            <Image
              src="/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
              className={styles.socialIcon}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Visit our Instagram page"
          >
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
              className={styles.socialIcon}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;