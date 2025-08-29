// src/app/components/PokemonCard.tsx
import Image from 'next/image';
import styles from './PokemonCard.module.css';
import { SimplePokemon } from '../../../app/types/pokemon';

// Props-interface för PokemonCard komponenten
interface PokemonCardProps {
  pokemon: SimplePokemon; // Pokemon-data som ska visas i kortet
}

// Funktion för att få ljusa färger baserat på Pokemon-typ (används för type chips och bildramar)
const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF6B6B',      // Eld - ljus röd
    water: '#4ECDC4',     // Vatten - turkos  
    electric: '#FFD93D',  // Elektrisk - gul
    grass: '#6BCF7F',     // Gräs - ljus grön
    ice: '#74C0FC',       // Is - ljusblå
    fighting: '#FF8787',  // Kamp - ljus röd
    poison: '#DA77F2',    // Gift - ljuslila
    ground: '#FECA57',    // Mark - gul-orange
    flying: '#74C0FC',    // Flygande - ljusblå
    psychic: '#FDA7DF',   // Psykisk - ljusrosa
    bug: '#82ca9d',       // Insekt - ljusgrön
    rock: '#FDCB6E',      // Sten - orange
    ghost: '#A29BFE',     // Spöke - ljuslila
    dragon: '#6C5CE7',    // Drake - blålila
    dark: '#636e72',      // Mörker - grå
    steel: '#ddd',        // Stål - ljusgrå
    fairy: '#FD79A8',     // Fe - rosa
    normal: '#A8A8A8'     // Normal - grå
  };
  
  return typeColors[type] || '#A8A8A8'; // Fallback-färg om typ inte hittas
};

// Funktion för att få mörkare färger för Pokemon-typer (används för kort-borders)
const getTypeColorBorder = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF5722',      // Eld - mörk röd
    water: '#2196F3',     // Vatten - mörk blå
    electric: '#FFC107',  // Elektrisk - mörk gul
    grass: '#4CAF50',     // Gräs - mörk grön
    ice: '#03A9F4',       // Is - mörk blå
    fighting: '#F44336',  // Kamp - mörk röd
    poison: '#9C27B0',    // Gift - mörk lila
    ground: '#795548',    // Mark - brun
    flying: '#607D8B',    // Flygande - blågrå
    psychic: '#E91E63',   // Psykisk - mörk rosa
    bug: '#8BC34A',       // Insekt - mörk grön
    rock: '#FF9800',      // Sten - mörk orange
    ghost: '#673AB7',     // Spöke - mörk lila
    dragon: '#3F51B5',    // Drake - mörk blå
    dark: '#424242',      // Mörker - mörkgrå
    steel: '#9E9E9E',     // Stål - grå
    fairy: '#E91E63',     // Fe - mörk rosa
    normal: '#9E9E9E'     // Normal - grå
  };
  
  return typeColors[type] || '#9E9E9E'; // Fallback-färg om typ inte hittas
};

// Huvudkomponent för Pokemon-kort (används på startsidan efter Random Pokemon-knapp)
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div 
      className={styles.card}
      style={{ 
        borderColor: getTypeColorBorder(pokemon.types[0]) // Färgad border baserat på första typen
      }}
    >
      {/* Bildsektion med cirkulär container */}
      <div className={styles.imageContainer}>
        <div 
          className={styles.imageCircle}
          style={{ borderColor: getTypeColor(pokemon.types[0]) }} // Färgad ram runt bilden
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={80}
            height={80}
            className={styles.pokemonImage}
            priority // Ladda denna bild med hög prioritet
          />
        </div>
      </div>
      
      {/* Pokemon ID med färgad bakgrund baserat på typ */}
      <div 
        className={styles.pokemonId}
        style={{ 
          backgroundColor: getTypeColor(pokemon.types[0]), // Bakgrundsfärg från första typen
          color: 'white' // Vit text för god kontrast
        }}
      >
        #{pokemon.id.toString().padStart(3, '0')} {/* Zero-padded ID (ex: #025) */}
      </div>
      
      {/* Pokemon namn som rubrik */}
      <h3 className={styles.pokemonName}>{pokemon.name}</h3>
      
      {/* Container för Pokemon-typer */}
      <div className={styles.typesContainer}>
        {/* Mappa över alla typer och skapa färgade chips */}
        {pokemon.types.map((type: string) => (
          <span
            key={type}
            className={styles.typeChip}
            style={{ backgroundColor: getTypeColor(type) }} // Färgad bakgrund för varje typ
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} {/* Formaterat typnamn */}
          </span>
        ))}
      </div>
      
      {/* Statistik-sektion med grundläggande stats */}
      <div className={styles.statsContainer}>
        {/* HP (Health Points) rad */}
        <div className={styles.statRow}>
          <span className={styles.statLabel}>HP</span>
          <span className={styles.statValue}>{pokemon.stats.hp}</span>
        </div>
        
        {/* Attack statistik rad */}
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Attack</span>
          <span className={styles.statValue}>{pokemon.stats.attack}</span>
        </div>
        
        {/* Defense statistik rad */}
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Defense</span>
          <span className={styles.statValue}>{pokemon.stats.defense}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;