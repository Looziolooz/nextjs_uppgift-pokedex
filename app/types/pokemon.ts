// src/types/pokemon.ts

// Interface för Pokemon statistik från API
export interface PokemonStat {
  base_stat: number;    // Grundvärde för statistik (HP, Attack, etc.)
  effort: number;       // EV-värde (Effort Value) för träning
  stat: {
    name: string;       // Namn på statistik ("hp", "attack", "defense")
    url: string;        // API URL för mer detaljer om statistiken
  };
}

// Interface för Pokemon typ information
export interface PokemonType {
  slot: number;         // Position/ordning av typen (1 för primär, 2 för sekundär)
  type: {
    name: string;       // Namn på typen ("fire", "water", "electric")
    url: string;        // API URL för mer detaljer om typen
  };
}

// Interface för Pokemon förmågor/abilities
export interface PokemonAbility {
  ability: {
    name: string;       // Namn på förmågan
    url: string;        // API URL för mer detaljer om förmågan
  };
  is_hidden: boolean;   // Om förmågan är dold/hidden ability
  slot: number;         // Position/ordning av förmågan
}

// Interface för alla Pokemon bilder och sprites
export interface PokemonSprites {
  // Standard sprites (kan vara null om inte tillgängliga)
  front_default: string | null;        // Standardbild framifrån
  front_shiny: string | null;          // Shiny variant framifrån
  front_female: string | null;         // Kvinnlig variant framifrån
  front_shiny_female: string | null;   // Shiny kvinnlig variant framifrån
  back_default: string | null;         // Standardbild bakifrån
  back_shiny: string | null;           // Shiny variant bakifrån
  back_female: string | null;          // Kvinnlig variant bakifrån
  back_shiny_female: string | null;    // Shiny kvinnlig variant bakifrån
  
  // Specialbilder från olika källor
  other: {
    dream_world: {
      front_default: string | null;    // Dream World artwork
      front_female: string | null;     // Dream World kvinnlig variant
    };
    home: {
      front_default: string | null;    // Pokemon Home bilder
      front_female: string | null;     // Pokemon Home kvinnlig
      front_shiny: string | null;      // Pokemon Home shiny
      front_shiny_female: string | null; // Pokemon Home shiny kvinnlig
    };
    'official-artwork': {
      front_default: string | null;    // Officiell artwork (högsta kvalitet)
      front_shiny: string | null;      // Officiell shiny artwork
    };
  };
  versions: Record<string, unknown>;   // Bilder från olika spel-versioner
}

// Huvudinterface för komplett Pokemon data från API
export interface Pokemon {
  id: number;                          // Unikt Pokemon ID (1-1010)
  name: string;                        // Pokemon namn på engelska
  base_experience: number;             // Bas-experience för leveling
  height: number;                      // Höjd i decimeter (10 = 1 meter)
  is_default: boolean;                 // Om det är standard-formen
  order: number;                       // Sorteringsordning i Pokedex
  weight: number;                      // Vikt i hektogram (10 = 1 kg)
  abilities: PokemonAbility[];         // Array av Pokemon förmågor
  
  // Formrelaterad data
  forms: Array<{
    name: string;                      // Namn på form
    url: string;                       // URL för formdata
  }>;
  
  // Spelrelaterad data
  game_indices: Array<{
    game_index: number;                // Index i specifikt spel
    version: {
      name: string;                    // Spelversion namn
      url: string;                     // URL för spelversion
    };
  }>;
  
  held_items: Array<unknown>;          // Items som Pokemon kan hålla
  location_area_encounters: string;   // URL för var Pokemon kan hittas
  moves: Array<unknown>;               // Attacker som Pokemon kan lära sig
  
  species: {
    name: string;                      // Art-namn
    url: string;                       // URL för species-data
  };
  
  sprites: PokemonSprites;             // Alla bilder för Pokemon
  stats: PokemonStat[];                // Array av alla statistik
  types: PokemonType[];                // Array av Pokemon typer (1-2 st)
}

// Interface för flavor text (beskrivningar) från spelen
export interface FlavorTextEntry {
  flavor_text: string;                 // Beskrivningstext
  language: {
    name: string;                      // Språk ("en", "sv", "jp")
    url: string;                       // URL för språkdata
  };
  version: {
    name: string;                      // Spelversion som beskrivningen kommer från
    url: string;                       // URL för versiondata
  };
}

// Interface för Pokemon species (art) data - utökad information
export interface PokemonSpecies {
  id: number;                          // Species ID (samma som Pokemon ID)
  name: string;                        // Species namn
  order: number;                       // Ordning i nationella Pokedex
  gender_rate: number;                 // Könsfördelning (-1 = könlös, 0-8 = kvinnlig chans)
  capture_rate: number;                // Hur lätt Pokemon är att fånga (0-255)
  base_happiness: number;              // Grundnivå av vänskap
  is_baby: boolean;                    // Om det är en baby Pokemon
  is_legendary: boolean;               // Om det är en legendary Pokemon
  is_mythical: boolean;                // Om det är en mythical Pokemon
  hatch_counter: number;               // Steg som krävs för att kläcka ägg
  has_gender_differences: boolean;     // Om det finns skillnader mellan kön
  forms_switchable: boolean;           // Om former kan bytas under strid
  
  growth_rate: {
    name: string;                      // Tillväxttakt ("fast", "slow", etc.)
    url: string;                       // URL för tillväxtdata
  };
  
  pokedex_numbers: Array<{
    entry_number: number;              // Nummer i specifik Pokedex
    pokedex: {
      name: string;                    // Pokedex namn ("national", "kanto")
      url: string;                     // URL för Pokedex data
    };
  }>;
  
  egg_groups: Array<{
    name: string;                      // Ägggrupp namn
    url: string;                       // URL för ägggrupp data
  }>;
  
  color: {
    name: string;                      // Huvudfärg på Pokemon
    url: string;                       // URL för färgdata
  };
  
  shape: {
    name: string;                      // Kroppsform
    url: string;                       // URL för formdata
  };
  
  evolves_from_species: {
    name: string;                      // Vad Pokemon evolved från
    url: string;                       // URL för tidigare evolution
  } | null;                            // null om det är basen i evolutionskedjan
  
  evolution_chain: {
    url: string;                       // URL för komplett evolutionskedja
  };
  
  habitat: {
    name: string;                      // Naturlig habitat
    url: string;                       // URL för habitat data
  } | null;                            // null om habitat är okänd
  
  generation: {
    name: string;                      // Generation Pokemon introducerades
    url: string;                       // URL för generationsdata
  };
  
  names: Array<{
    language: {
      name: string;                    // Språkkod
      url: string;                     // URL för språkdata
    };
    name: string;                      // Pokemon namn på det språket
  }>;
  
  flavor_text_entries: FlavorTextEntry[];  // Alla beskrivningar från olika spel
  form_descriptions: Array<unknown>;       // Beskrivningar av olika former
  
  genera: Array<{
    genus: string;                     // Pokemon kategori ("Seed Pokemon")
    language: {
      name: string;                    // Språk för kategorin
      url: string;                     // URL för språkdata
    };
  }>;
  
  varieties: Array<{
    is_default: boolean;               // Om det är standardvarianten
    pokemon: {
      name: string;                    // Variantnamn
      url: string;                     // URL för variantdata
    };
  }>;
}

// Förenklad interface för komponenter som endast behöver grunddata
export interface SimplePokemon {
  id: number;                          // Pokemon ID
  name: string;                        // Formaterat namn (första bokstaven stor)
  image: string;                       // URL till bästa tillgängliga bild
  types: string[];                     // Array av typnamn som strings
  stats: {
    hp: number;                        // Health Points
    attack: number;                    // Attack statistik
    defense: number;                   // Defense statistik
  };
}

// Interface för utökade statistik (används ej för närvarande)
export interface DetailedPokemonStats {
  hp: number;                          // Health Points
  attack: number;                      // Fysisk attack
  defense: number;                     // Fysisk defense
  specialAttack: number;               // Special attack
  specialDefense: number;              // Special defense
  speed: number;                       // Hastighet
}