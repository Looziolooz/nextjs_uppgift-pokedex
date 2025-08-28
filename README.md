📖 Pokédex Projektinstruktion
Välkommen till ditt Next.js-projekt! 🎉 I den här uppgiften får du möjlighet att tillämpa dina kunskaper om React, Next.js, API-anrop och komponentbaserad design genom att bygga en dynamisk Pokédex 🐾

🎯 Mål för projektet
🔗 Välja API-strategi: Använd antingen REST-API eller GraphQL från PokeAPI.
🧩 Komponentbaserad design: Skapa återanvändbara och logiska komponenter.
📡 Datahämtning: Hämta data från PokeAPI för att visa Pokémon.
🛣️ Routing & felhantering: Använd Next.js routing + en dedikerad 404-sida.
⚡ Dynamiskt innehåll: Möjlighet att interagera med Pokémon-data.
🛠️ Funktionskrav
🏠 Startsida (/)
Visa en Featured-sektion med fyra slumpmässigt utvalda Pokémon.
Möjlighet att slumpa fram en enskild Pokémon med knapptryck.
🔍 Söksida (/search)
Sökfält för att skriva in Pokémon-namn.
Visa detaljer om den Pokémonen vid sökning.
Använd dynamisk routing eller searchParams.
🧩 Filtreringssida (/types)
Lista alla Pokémontyper (t.ex. Fire 🔥, Water 💧, Grass 🌱).
Klick på typ → visa alla Pokémon av den typen.
🚫 404-sida (/not-found.tsx)
Anpassad sida för ogiltiga länkar, felaktiga API-anrop.
⚙️ Tekniska krav
⚛️ Next.js + React (med app router).
🖥️ Serverkomponenter för all datahämtning.
🎨 Styling med CSS Modules eller global CSS.
💡 Tips & Att tänka på
📂 Komponentstruktur (exempel):

PokemonCard.tsx → visar en Pokémon.
FeaturedList.tsx → hanterar fyra utvalda Pokémon.
SearchForm.tsx → sökfält.
❌ Felhantering: Tänk på om API-anrop misslyckas eller om Pokémon inte finns.

⏳ Loading-state: Använd loading.tsx för att visa en indikator.

⌛ Async/Await: Hantera API-anrop snyggt i serverkomponenter.

⚛️ Bolierplate: Ni hittar en liten startkod till projektet här

✨ Lycka till med ditt Pokédex-projekt – fånga dem alla! ⚡🐉