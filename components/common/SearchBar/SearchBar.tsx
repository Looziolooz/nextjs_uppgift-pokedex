// src/components/common/SearchBar/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

// SearchBar-komponent för att söka efter specifika Pokemon
const SearchBar: React.FC = () => {
  // State för att hantera användarens sökinput
  const [searchTerm, setSearchTerm] = useState('');
  // State för loading-tillstånd under API-anrop
  const [loading, setLoading] = useState(false);
  // State för felmeddelanden
  const [error, setError] = useState('');
  // Next.js router för programmatisk navigation
  const router = useRouter();

  // Funktion som hanterar sökformuläret när det skickas
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindra standardformulär-skickning
    
    // Validera att användaren har skrivit in något
    if (!searchTerm.trim()) {
      setError('Vänligen ange ett Pokémon-namn');
      return;
    }

    setLoading(true); // Starta loading-tillstånd
    setError(''); // Rensa tidigare felmeddelanden

    try {
      // Konvertera namn till lowercase för API-anrop (PokéAPI är känsligt för gemener)
      const pokemonName = searchTerm.toLowerCase().trim();
      
      // Gör API-anrop för att verifiera att Pokemon finns
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      
      // Kontrollera om Pokemon hittades
      if (!response.ok) {
        throw new Error('Pokémon hittades inte');
      }
      
      // Parsa API-svar för att få Pokemon data
      const pokemonData = await response.json();
      
      // Formatera ID med nollor framför (ex: 25 blir 025)
      const formattedId = pokemonData.id.toString().padStart(3, '0');
      
      // Navigera till Pokemon-detaljsidan med formaterat ID
      router.push(`/pokemon/${formattedId}`);
      
    } catch (error) {
      // Visa användarvänligt felmeddelande
      setError('Pokémon hittades inte. Kontrollera namnet och försök igen.');
      console.error('Sökfel:', error);
    } finally {
      setLoading(false); // Avsluta loading-tillstånd oavsett resultat
    }
  };

  // Funktion som hanterar ändringar i sökfältet
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Uppdatera söktermen
    if (error) setError(''); // Rensa felmeddelande när användaren börjar skriva
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        {/* Input-wrapper som innehåller sökfält och knapp */}
        <div className={styles.inputWrapper}>
          {/* Sökfält */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Sök efter en Pokémon..." // Svenskt placeholder-text
            className={`${styles.searchInput} ${error ? styles.inputError : ''}`} // Dynamisk CSS-klass vid fel
            disabled={loading} // Inaktivera under loading
          />
          
          {/* Sök-knapp */}
          <button
            type="submit"
            className={styles.searchButton}
            disabled={loading || !searchTerm.trim()} // Inaktivera om loading eller tomt fält
            aria-label="Sök Pokémon" // Tillgänglighet för skärmläsare
          >
            {loading ? (
              // Visa spinner under loading
              <div className={styles.spinner}></div>
            ) : (
              // Visa sök-ikon (SVG) när inte loading
              <svg
                className={styles.searchIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" // SVG-path för förstoringsglasikon
                />
              </svg>
            )}
          </button>
        </div>
        
        {/* Visa felmeddelande om det finns något */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;