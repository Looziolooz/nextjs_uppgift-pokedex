// src/components/common/FeaturedPokemon/FeaturedPokemon.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedCard.module.css';
import { SimplePokemon } from '../../../app/types/pokemon';

const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF6B6B',
    water: '#4ECDC4',
    electric: '#FFD93D',
    grass: '#6BCF7F',
    ice: '#74C0FC',
    fighting: '#FF8787',
    poison: '#DA77F2',
    ground: '#FECA57',
    flying: '#74C0FC',
    psychic: '#FDA7DF',
    bug: '#82ca9d',
    rock: '#FDCB6E',
    ghost: '#A29BFE',
    dragon: '#6C5CE7',
    dark: '#636e72',
    steel: '#ddd',
    fairy: '#FD79A8',
    normal: '#A8A8A8'
  };
  
  return typeColors[type] || '#A8A8A8';
};

const getTypeColorBg = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF5722',
    water: '#2196F3',
    electric: '#FFC107',
    grass: '#4CAF50',
    ice: '#03A9F4',
    fighting: '#F44336',
    poison: '#9C27B0',
    ground: '#795548',
    flying: '#607D8B',
    psychic: '#E91E63',
    bug: '#8BC34A',
    rock: '#FF9800',
    ghost: '#673AB7',
    dragon: '#3F51B5',
    dark: '#424242',
    steel: '#9E9E9E',
    fairy: '#E91E63',
    normal: '#9E9E9E'
  };
  
  return typeColors[type] || '#9E9E9E';
};

const FeaturedPokemon: React.FC = () => {
  const [featuredPokemon, setFeaturedPokemon] = useState<SimplePokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedPokemon = async () => {
    try {
      const promises: Promise<Response>[] = [];
      const randomIds: number[] = [];
      
      // Genera 4 ID casuali unici
      while (randomIds.length < 4) {
        const id = Math.floor(Math.random() * 151) + 1; // Primi 151 Pokémon
        if (!randomIds.includes(id)) {
          randomIds.push(id);
        }
      }
      
      // Fetch dei 4 Pokémon
      for (const id of randomIds) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
      }
      
      const responses = await Promise.all(promises);
      const pokemonData = await Promise.all(
        responses.map(response => response.json())
      );
      
      const formattedPokemon: SimplePokemon[] = pokemonData.map(data => ({
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
        stats: {
          hp: data.stats.find((stat: { stat: { name: string }; base_stat: number }) => stat.stat.name === 'hp')?.base_stat || 0,
          attack: data.stats.find((stat: { stat: { name: string }; base_stat: number }) => stat.stat.name === 'attack')?.base_stat || 0,
          defense: data.stats.find((stat: { stat: { name: string }; base_stat: number }) => stat.stat.name === 'defense')?.base_stat || 0
        }
      }));
      
      setFeaturedPokemon(formattedPokemon);
    } catch (error) {
      console.error('Error fetching featured Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedPokemon();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Pokémon</h2>
          <div className={styles.grid}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.loadingCard}>
                <div className={styles.loadingSpinner}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Pokémon</h2>
        <div className={styles.grid}>
          {featuredPokemon.map((pokemon) => (
            <Link 
              href={`/pokemon/${pokemon.id.toString().padStart(3, '0')}`} 
              key={pokemon.id}
              className={styles.cardLink}
            >
              <div 
                className={styles.card}
              >
                <div className={styles.imageContainer}>
                  <div 
                    className={styles.imageCircle}
                    style={{ borderColor: getTypeColor(pokemon.types[0]) }}
                  >
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      width={80}
                      height={80}
                      className={styles.pokemonImage}
                    />
                  </div>
                </div>
                <div 
                className={styles.pokemonId}
                style={{ 
                  background: getTypeColorBg(pokemon.types[0]),
                  '--type-color': getTypeColorBg(pokemon.types[0])
                } as React.CSSProperties}
              >
                <div className={styles.pokemonId}>
                  #{pokemon.id.toString().padStart(3, '0')}
                  </div>
                </div>
                
                <h3 className={styles.pokemonName}>{pokemon.name}</h3>
                
                <div className={styles.typesContainer}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={styles.typeChip}
                      style={{ backgroundColor: getTypeColor(type) }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
                
                <div className={styles.statsContainer}>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>HP</span>
                    <span className={styles.statValue}>{pokemon.stats.hp}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Attack</span>
                    <span className={styles.statValue}>{pokemon.stats.attack}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Defense</span>
                    <span className={styles.statValue}>{pokemon.stats.defense}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPokemon;