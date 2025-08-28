// src/app/pokemon/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PokemonDetailClient from './PokemonDetailClient';
import { Pokemon, PokemonSpecies } from '../../types/pokemon';

// Interface för sidan props med dynamic route parameter
interface PokemonPageProps {
  params: {
    id: string; // Pokemon ID från URL:en
  };
}

// Interface för API-svar som returnerar både pokemon och species data
interface FetchPokemonResult {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

// Asynkron funktion för att hämta Pokemon data från API
async function fetchPokemon(id: string): Promise<FetchPokemonResult | null> {
  try {
    // Konvertera ID från string till number för API-anrop
    const pokemonId = parseInt(id, 10);
    
    // Validera att ID är inom giltigt intervall (1-1010)
    if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 1010) {
      return null;
    }

    // Hämta grundläggande Pokemon data med caching (1 timme)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, {
      next: { revalidate: 3600 } // Cache för 1 timme
    });
    
    // Kontrollera om API-svaret är ok
    if (!response.ok) {
      return null;
    }
    
    // Parsa JSON-data till Pokemon interface
    const pokemonData: Pokemon = await response.json();
    
    // Hämta species data för beskrivning och övrig information
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData: PokemonSpecies = await speciesResponse.json();
    
    // Returnera kombinerad data
    return {
      pokemon: pokemonData,
      species: speciesData
    };
  } catch (error) {
    console.error('Fel vid hämtning av Pokemon:', error);
    return null;
  }
}

// Generera metadata för SEO och browser tabs
export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const data = await fetchPokemon(params.id);
  
  // Fallback metadata om Pokemon inte hittas
  if (!data) {
    return {
      title: 'Pokémon Not Found | Pokédx',
      description: 'Den begärda Pokémonen kunde inte hittas.'
    };
  }
  
  // Formatera Pokemon namn med stor bokstav
  const pokemonName = data.pokemon.name.charAt(0).toUpperCase() + data.pokemon.name.slice(1);
  
  // Returnera dynamiska metadata baserat på Pokemon
  return {
    title: `${pokemonName} #${params.id} | Pokédx`,
    description: `Upptäck ${pokemonName}, en ${data.pokemon.types.map((t) => t.type.name).join('/')} typ Pokémon. Se stats, förmågor och mer information.`,
  };
}

// Huvudkomponent för Pokemon detail sidan (Server Component)
export default async function PokemonPage({ params }: PokemonPageProps) {
  // Hämta Pokemon data på server-sidan
  const data = await fetchPokemon(params.id);
  
  // Visa 404 sida om Pokemon inte hittas
  if (!data) {
    notFound();
  }
  
  // Rendera Client Component med Pokemon data
  return <PokemonDetailClient pokemonData={data.pokemon} />;
}