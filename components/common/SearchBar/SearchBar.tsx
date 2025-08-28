// src/components/common/SearchBar/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a Pokémon name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Converti il nome in lowercase per l'API
      const pokemonName = searchTerm.toLowerCase().trim();
      
      // Fetch per verificare se il Pokémon esiste
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      
      const pokemonData = await response.json();
      
      // Formatta l'ID con zero padding (es: 025)
      const formattedId = pokemonData.id.toString().padStart(3, '0');
      
      // Redirect alla pagina del Pokémon
      router.push(`/pokemon/${formattedId}`);
      
    } catch (error) {
      setError('Pokémon not found. Please check the name and try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a Pokémon..."
            className={`${styles.searchInput} ${error ? styles.inputError : ''}`}
            disabled={loading}
          />
          <button
            type="submit"
            className={styles.searchButton}
            disabled={loading || !searchTerm.trim()}
            aria-label="Search Pokémon"
          >
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>
        
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