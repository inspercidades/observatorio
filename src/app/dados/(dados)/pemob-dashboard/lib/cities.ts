// Cities included in the PEMOB (Pesquisa Nacional de Mobilidade Urbana) project
export const cities = [
  "Anápolis", "Aparecida de Goiânia", "Aracaju", "Barueri", "Belo Horizonte", "Blumenau", "Boa Vista", "Brasília", "Camaçari", "Campina Grande",
  "Campinas", "Campo Grande", "Campos dos Goytacazes", "Carapicuíba", "Cariacica", "Caruaru", "Caucaia", "Chapecó", "Cotia", "Cuiabá",
  "Curitiba", "Feira de Santana", "Florianópolis", "Foz do Iguaçu", "Franca", "Goiânia", "Gravataí", "Itajaí", "Itaquaquecetuba", "Jaboatão dos Guararapes",
  "Jundiaí", "Limeira", "Londrina", "Maceió", "Manaus", "Maringá", "Mauá", "Nova Iguaçu", "Osasco", "Parnamirim",
  "Petrolina", "Petrópolis", "Ponta Grossa", "Porto Alegre", "Praia Grande", "Recife", "Ribeirão das Neves", "Rio Branco", "Rio de Janeiro", "Salvador",
  "Santa Maria", "Santarém", "Santo André", "Santos", "São Bernardo do Campo", "São Gonçalo", "São João de Meriti", "São José", "São José do Rio Preto", "São José dos Campos",
  "São José dos Pinhais", "São Paulo", "São Vicente", "Serra", "Sorocaba", "Taubaté", "Teresina", "Uberaba", "Vila Velha", "Vitória da Conquista"
];

// Utility function to get cities sorted alphabetically
export function getCitiesSorted(): string[] {
  return [...cities].sort();
}

// Utility function to search cities
export function searchCities(query: string): string[] {
  if (!query.trim()) return cities;
  
  const searchTerm = query.toLowerCase().trim();
  return cities.filter(city => 
    city.toLowerCase().includes(searchTerm)
  );
}

// Get city by exact name match
export function getCityByName(name: string): string | undefined {
  return cities.find(city => city.toLowerCase() === name.toLowerCase());
} 