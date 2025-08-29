// src/components/common/Footer/Footer.tsx
import Image from 'next/image';
import styles from './Footer.module.css';

// Footer-komponent som visas på alla sidor
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Logo-sektion med bild och text */}
        <div className={styles.logoSection}>
          <Image
            src="/Logo.png"
            alt="Pokédx logotyp"
            width={40}
            height={40}
            className={styles.logo}
          />
          <span className={styles.logoText}>Pokédx</span>
        </div>

        {/* Tagline/slogan för appen */}
        <p className={styles.tagline}>
          Utforska Pokémons värld
        </p>

        {/* Sociala medier-länkar */}
        <div className={styles.socialLinks}>
          {/* Facebook-länk */}
          <a
            href="https://facebook.com"
            target="_blank" // Öppna i ny flik
            rel="noopener noreferrer" // Säkerhetsåtgärd för externa länkar
            className={styles.socialLink}
            aria-label="Besök vår Facebook-sida" // Tillgänglighet för skärmläsare
          >
            <Image
              src="/facebook.svg"
              alt="Facebook ikon"
              width={24}
              height={24}
              className={styles.socialIcon}
            />
          </a>
          
          {/* Instagram-länk */}
          <a
            href="https://instagram.com"
            target="_blank" // Öppna i ny flik
            rel="noopener noreferrer" // Säkerhetsåtgärd för externa länkar
            className={styles.socialLink}
            aria-label="Besök vår Instagram-sida" // Tillgänglighet för skärmläsare
          >
            <Image
              src="/instagram.svg"
              alt="Instagram ikon"
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