// src/app/components/PokemonCard.tsx
import Image from 'next/image';
import styles from './PokemonCard.module.css';
import { SimplePokemon } from '../../../app/types/pokemon';

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

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
  
  return typeColors[type] || '#9E9E9E';
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div 
      className={styles.card}
      style={{ 
        borderColor: getTypeColorBorder(pokemon.types[0])
      }}
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
            priority
          />
        </div>
      </div>
      
      <div 
        className={styles.pokemonId}
        style={{ 
          backgroundColor: getTypeColor(pokemon.types[0]),
          color: 'white'
        }}
      >
        #{pokemon.id.toString().padStart(3, '0')}
      </div>
      
      <h3 className={styles.pokemonName}>{pokemon.name}</h3>
      
      <div className={styles.typesContainer}>
        {pokemon.types.map((type: string) => (
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
  );
};

export default PokemonCard;