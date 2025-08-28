// src/app/pokemon/[id]/PokemonDetailClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './PokemonDetail.module.css';
import { Pokemon } from '../../../app/types/pokemon';

// Props interface för komponenten
interface PokemonDetailClientProps {
  pokemonData: Pokemon;
}

// Funktion för att få färg baserat på Pokemon typ
const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF6B6B',      // Eld - röd
    water: '#4ECDC4',     // Vatten - turkos
    electric: '#FFD93D',  // Elektrisk - gul
    grass: '#6BCF7F',     // Gräs - grön
    ice: '#74C0FC',       // Is - ljusblå
    fighting: '#FF8787',  // Kamp - röd/rosa
    poison: '#DA77F2',    // Gift - lila
    ground: '#FECA57',    // Mark - brun/gul
    flying: '#74C0FC',    // Flygande - ljusblå
    psychic: '#FDA7DF',   // Psykisk - rosa
    bug: '#82ca9d',       // Insekt - grön
    rock: '#FDCB6E',      // Sten - orange
    ghost: '#A29BFE',     // Spöke - lila
    dragon: '#6C5CE7',    // Drake - mörklila
    dark: '#636e72',      // Mörker - grå
    steel: '#ddd',        // Stål - grå
    fairy: '#FD79A8',     // Fe - rosa
    normal: '#A8A8A8'     // Normal - grå
  };
  
  return typeColors[type] || '#A8A8A8'; // Fallback färg
};

// Funktion för att få border-färg (mörkare varianter)
const getTypeColorBorder = (type: string): string => {
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
  
  return typeColors[type] || '#9E9E9E'; // Fallback border-färg
};

// Huvudkomponent för Pokemon detaljer (Client Component)
const PokemonDetailClient: React.FC<PokemonDetailClientProps> = ({ pokemonData }) => {
  // State för att hantera bildladdningsfel
  const [imageError, setImageError] = useState(false);
  
  const pokemon = pokemonData;
  
  // Extrahera grundläggande statistik från API-data
  const hp = pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0;
  const attack = pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat || 0;
  const defense = pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat || 0;
  
  // Formatera Pokemon namn med stor första bokstav
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Bestäm bästa bild-URL med fallback alternativ
  const mainImage = pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.front_default || 
                   '/images/pokemon/placeholder.png';

  return (
    <div className={styles.container}>
      {/* Header med bakåt-knapp och titel */}
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Tillbaka till Start
        </Link>
        <h1 className={styles.title}>Pokémon Detaljer</h1>
      </div>
      
      {/* Container för att centrera Pokemon kortet */}
      <div className={styles.pokemonCardContainer}>
        <div 
          className={styles.pokemonCard}
          style={{ 
            borderColor: getTypeColorBorder(pokemon.types[0].type.name) // Dynamisk border-färg
          }}
        >
          {/* Bild-sektion med cirkulär ram */}
          <div className={styles.imageContainer}>
            <div 
              className={styles.imageCircle}
              style={{ borderColor: getTypeColor(pokemon.types[0].type.name) }} // Färgad ram runt bilden
            >
              <Image
                src={imageError ? '/images/pokemon/placeholder.png' : mainImage}
                alt={pokemonName}
                width={120}
                height={120}
                className={styles.pokemonImage}
                onError={() => setImageError(true)} // Hantera bildladdningsfel
                priority // Ladda denna bild med hög prioritet
              />
            </div>
          </div>
          
          {/* Pokemon ID med färgad bakgrund */}
          <div 
            className={styles.pokemonId}
            style={{ 
              backgroundColor: getTypeColor(pokemon.types[0].type.name), // Bakgrundsfärg baserat på typ
              color: 'white'
            }}
          >
            #{pokemon.id.toString().padStart(3, '0')} {/* Zero-padded ID */}
          </div>
          
          {/* Pokemon namn */}
          <h2 className={styles.pokemonName}>{pokemonName}</h2>
          
          {/* Pokemon typer som färgade chips */}
          <div className={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={styles.typeChip}
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </span>
            ))}
          </div>
          
          {/* Grundläggande statistik (HP, Attack, Defense) */}
          <div className={styles.statsContainer}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>HP</span>
              <span className={styles.statValue}>{hp}</span>
            </div>
            
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Attack</span>
              <span className={styles.statValue}>{attack}</span>
            </div>
            
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Defense</span>
              <span className={styles.statValue}>{defense}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailClient;