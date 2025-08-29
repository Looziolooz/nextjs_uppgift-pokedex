// src/components/common/FeaturedPokemon/FeaturedPokemon.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedCard.module.css';
import { SimplePokemon } from '../../../app/types/pokemon';

// Funktion för att få ljusa färger för Pokemon typer (används för chips och ramar)
const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF6B6B',      // Eld - ljus röd
    water: '#4ECDC4',     // Vatten - turkos
    electric: '#FFD93D',  // Elektrisk - gul
    grass: '#6BCF7F',     // Gräs - ljus grön
    ice: '#74C0FC',       // Is - ljusblå
    fighting: '#FF8787',  // Kamp - rosa-röd
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

// Funktion för att få mörkare färger för Pokemon typer (används för borders och bakgrunder)
const getTypeColorBg = (type: string): string => {
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
  
  return typeColors[type] || '#9E9E9E'; // Fallback-färg
};

// Huvudkomponent för Featured Pokemon sektion
const FeaturedPokemon: React.FC = () => {
  // State för att lagra de 4 utvalda Pokemon
  const [featuredPokemon, setFeaturedPokemon] = useState<SimplePokemon[]>([]);
  // State för loading-tillstånd
  const [loading, setLoading] = useState(true);

  // Asynkron funktion för att hämta 4 slumpmässiga Pokemon
  const fetchFeaturedPokemon = async () => {
    try {
      // Array för att lagra Promise-objekt för parallella API-anrop
      const promises: Promise<Response>[] = [];
      // Array för att lagra unika slumpmässiga Pokemon ID:n
      const randomIds: number[] = [];
      
      // Generera 4 unika slumpmässiga ID:n från första 151 Pokemon (klassiska)
      while (randomIds.length < 4) {
        const id = Math.floor(Math.random() * 151) + 1; // ID mellan 1-151
        // Kontrollera att ID:t inte redan finns för att undvika dubletter
        if (!randomIds.includes(id)) {
          randomIds.push(id);
        }
      }
      
      // Skapa API-anrop för varje unikt Pokemon ID
      for (const id of randomIds) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
      }
      
      // Vänta på att alla API-anrop ska slutföras parallellt
      const responses = await Promise.all(promises);
      // Parsa JSON-data från alla svar
      const pokemonData = await Promise.all(
        responses.map(response => response.json())
      );
      
      // Transformera API-data till SimplePokemon format för UI
      const formattedPokemon: SimplePokemon[] = pokemonData.map(data => ({
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Formatera namn
        image: data.sprites.other['official-artwork'].front_default || 
               data.sprites.front_default, // Använd bästa tillgängliga bild
        types: data.types.map((type: { type: { name: string } }) => type.type.name), // Extrahera typnamn
        stats: {
          // Hitta och extrahera specifika statistik från API-data
          hp: data.stats.find((stat: { stat: { name: string }; base_stat: number }) => 
            stat.stat.name === 'hp')?.base_stat || 0,
          attack: data.stats.find((stat: { stat: { name: string }; base_stat: number }) => 
            stat.stat.name === 'attack')?.base_stat || 0,
          defense: data.stats.find((stat: { stat: { name: string }; base_stat: number }) => 
            stat.stat.name === 'defense')?.base_stat || 0
        }
      }));
      
      // Uppdatera state med formaterad Pokemon-data
      setFeaturedPokemon(formattedPokemon);
    } catch (error) {
      console.error('Fel vid hämtning av utvalda Pokemon:', error);
      // Här kunde vi visa ett felmeddelande till användaren
    } finally {
      setLoading(false); // Sätt loading till false oavsett resultat
    }
  };

  // useEffect hook som körs när komponenten mountas för att hämta Pokemon
  useEffect(() => {
    fetchFeaturedPokemon();
  }, []); // Tom dependency array = kör endast en gång vid mount

  // Visa loading-tillstånd med spinner medan data hämtas
  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Utvalda Pokémon</h2>
          <div className={styles.grid}>
            {/* Skapa 4 loading-kort med spinner */}
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

  // Huvudrendering när data är laddad
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Utvalda Pokémon</h2>
        <div className={styles.grid}>
          {/* Mappa över varje Pokemon och skapa ett kort */}
          {featuredPokemon.map((pokemon) => (
            <Link 
              href={`/pokemon/${pokemon.id.toString().padStart(3, '0')}`} // Zero-padded ID i URL
              key={pokemon.id}
              className={styles.cardLink}
            >
              <div className={styles.card}>
                {/* Bildsektion med cirkulär ram */}
                <div className={styles.imageContainer}>
                  <div 
                    className={styles.imageCircle}
                    style={{ borderColor: getTypeColor(pokemon.types[0]) }} // Färgad ram baserat på första typen
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
                
                {/* Pokemon ID med färgad bakgrund - Notera: Duplicerad struktur här behöver fixas */}
                <div 
                  className={styles.pokemonId}
                  style={{ 
                    background: getTypeColorBg(pokemon.types[0]), // Bakgrundsfärg från första typen
                    '--type-color': getTypeColorBg(pokemon.types[0])
                  } as React.CSSProperties}
                >
                  <div className={styles.pokemonId}>
                    #{pokemon.id.toString().padStart(3, '0')} {/* Zero-padded ID */}
                  </div>
                </div>
                
                {/* Pokemon namn som rubrik */}
                <h3 className={styles.pokemonName}>{pokemon.name}</h3>
                
                {/* Container för typ-chips */}
                <div className={styles.typesContainer}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={styles.typeChip}
                      style={{ backgroundColor: getTypeColor(type) }} // Färgad bakgrund för varje typ
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)} {/* Formaterat typnamn */}
                    </span>
                  ))}
                </div>
                
                {/* Statistik-sektion med HP, Attack och Defense */}
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