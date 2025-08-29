// src/app/page.tsx
'use client';

import Image from "next/image";
import { useState } from 'react';
import styles from './page.module.css';
import PokemonCard from '../components/common/PokemonCard/PokemonCard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import { SimplePokemon } from './types/pokemon';
import FeaturedPokemon from "@/components/common/FeaturedCard/FeaturedCard";

// Huvudkomponent för startsidan (Client Component för interaktivitet)
export default function Home() {
  // State för att lagra slumpmässigt vald Pokemon
  const [pokemon, setPokemon] = useState<SimplePokemon | null>(null);
  // State för att visa loading-tillstånd under API-anrop
  const [loading, setLoading] = useState(false);

  // Funktion för att hämta en slumpmässig Pokemon från API
  const fetchRandomPokemon = async () => {
    setLoading(true); // Visa loading spinner
    try {
      // Generera slumpmässigt ID mellan 1 och 1010 (totalt antal Pokemon)
      const randomId = Math.floor(Math.random() * 1010) + 1;
      
      // Gör API-anrop till PokéAPI
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      
      // Kontrollera om request lyckades
      if (!response.ok) {
        throw new Error('Misslyckades att hämta Pokemon');
      }
      
      // Parsa JSON-svar från API
      const data = await response.json();
      
      // Extrahera grundläggande statistik från API-svaret med typsäkerhet
      const hp = data.stats.find((stat: { stat: { name: string }; base_stat: number }) => 
        stat.stat.name === 'hp')?.base_stat || 0;
      const attack = data.stats.find((stat: { stat: { name: string }; base_stat: number }) => 
        stat.stat.name === 'attack')?.base_stat || 0;
      const defense = data.stats.find((stat: { stat: { name: string }; base_stat: number }) => 
        stat.stat.name === 'defense')?.base_stat || 0;
      
      // Skapa förenklat Pokemon-objekt för UI
      const pokemonData: SimplePokemon = {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Formatera namn
        image: data.sprites.other['official-artwork'].front_default || 
               data.sprites.front_default || 
               '/placeholder.png', // Fallback-bild om ingen officiell artwork finns
        types: data.types.map((type: { type: { name: string } }) => type.type.name), // Extrahera typnamn
        stats: {
          hp,
          attack,
          defense
        }
      };
      
      // Uppdatera state med den hämtade Pokemon
      setPokemon(pokemonData);
    } catch (error) {
      console.error('Fel vid hämtning av Pokemon:', error);
      // Här kunde vi visa en error-notifikation till användaren
    } finally {
      setLoading(false); // Göm loading spinner oavsett resultat
    }
  };

  return (
    <main className={styles.main}>
      {/* Hero-sektion med titel och Random Pokemon knapp */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* Huvudtitel */}
          <h1 className={styles.heroTitle}>
            Gotta catch &apos;em all!
          </h1>
          
          {/* Underrubrik med beskrivning */}
          <p className={styles.heroSubtitle}>
            Upptäck, sök och utforska Pokémons fantastiska värld. Hitta
            <br />
            dina favoriter och lär dig om deras statistik.
          </p>
          
          {/* Random Pokemon knapp med dynamisk text beroende på loading-state */}
          <button 
            className={styles.randomButton}
            onClick={fetchRandomPokemon}
            disabled={loading} // Inaktivera knapp under loading
          >
            <Image
              src="/Dice.svg"
              width={25}
              height={25}
              alt="Tärning ikon"
            />
            {loading ? 'Laddar...' : 'Slumpmässig Pokémon'}
          </button>
          
          {/* Visa Pokemon-kort endast om en Pokemon har hämtats */}
          {pokemon && <PokemonCard pokemon={pokemon} />}
        </div>
      </section>
      
      {/* Sökfunktion - placerad utanför hero-sektionen */}
      <SearchBar />
      
      {/* Featured Pokemon sektion - visar 4 slumpmässiga Pokemon vid sidladdning */}
      <FeaturedPokemon />
    </main>
  );
}