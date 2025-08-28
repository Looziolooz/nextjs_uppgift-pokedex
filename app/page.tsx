// src/app/page.tsx
'use client';

import Image from "next/image";
import { useState } from 'react';
import styles from './page.module.css';
import PokemonCard from '../components/common/PokemonCard/PokemonCard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import { SimplePokemon } from './types/pokemon';
import FeaturedPokemon from "@/components/common/FeaturedCard/FeaturedCard";

export default function Home() {
  const [pokemon, setPokemon] = useState<SimplePokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      // Genera un ID casuale tra 1 e 1010 (numero totale di Pokémon)
      const randomId = Math.floor(Math.random() * 1010) + 1;
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }
      
      const data = await response.json();
      
      // Estrai le statistiche necessarie con tipizzazione
      const hp = data.stats.find((stat: { stat: { name: string }; base_stat: number }) => stat.stat.name === 'hp')?.base_stat || 0;
      const attack = data.stats.find((stat: { stat: { name: string }; base_stat: number }) => stat.stat.name === 'attack')?.base_stat || 0;
      const defense = data.stats.find((stat: { stat: { name: string }; base_stat: number }) => stat.stat.name === 'defense')?.base_stat || 0;
      
      const pokemonData: SimplePokemon = {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default || '/placeholder.png',
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
        stats: {
          hp,
          attack,
          defense
        }
      };
      
      setPokemon(pokemonData);
    } catch (error) {
      console.error('Errore nel caricamento del Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Gotta catch &apos;em all!
          </h1>
          <p className={styles.heroSubtitle}>
            Discover, search and explore the amazing world of Pokémon. Find
            <br />
            your favourite and learn about their stats.
          </p>
          
          <button 
            className={styles.randomButton}
            onClick={fetchRandomPokemon}
            disabled={loading}
          >
            <Image
              src="/Dice.svg"
              width={25}
              height={25}
              alt="Dice"
            />
            {loading ? 'Loading...' : 'Random Pokémon'}
          </button>
          
          {pokemon && <PokemonCard pokemon={pokemon} />}

        </div>
      </section>
          {/* Search Bar */}
          <SearchBar />
          <FeaturedPokemon />
    </main>
  );
}