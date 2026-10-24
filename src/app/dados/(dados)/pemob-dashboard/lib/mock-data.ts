import { Municipality, TransportData } from "./types"

// List of municipalities for mock data generation
const municipios: Municipality[] = [
  { nome: "São Paulo", uf: "SP" },
  { nome: "Rio de Janeiro", uf: "RJ" },
  { nome: "Belo Horizonte", uf: "MG" },
  { nome: "Porto Alegre", uf: "RS" },
  { nome: "Salvador", uf: "BA" },
  { nome: "Brasília", uf: "DF" },
  { nome: "Fortaleza", uf: "CE" },
  { nome: "Curitiba", uf: "PR" },
  { nome: "Recife", uf: "PE" },
  { nome: "Manaus", uf: "AM" },
  { nome: "Belém", uf: "PA" },
  { nome: "Goiânia", uf: "GO" },
  { nome: "Guarulhos", uf: "SP" },
  { nome: "Campinas", uf: "SP" },
  { nome: "São Luís", uf: "MA" },
  { nome: "São Gonçalo", uf: "RJ" },
  { nome: "Maceió", uf: "AL" },
  { nome: "Duque de Caxias", uf: "RJ" },
  { nome: "Natal", uf: "RN" },
  { nome: "Campo Grande", uf: "MS" },
  { nome: "Teresina", uf: "PI" },
  { nome: "São Bernardo do Campo", uf: "SP" },
  { nome: "João Pessoa", uf: "PB" },
  { nome: "Nova Iguaçu", uf: "RJ" },
  { nome: "São José dos Campos", uf: "SP" },
  { nome: "Santo André", uf: "SP" },
  { nome: "Ribeirão Preto", uf: "SP" },
  { nome: "Jaboatão dos Guararapes", uf: "PE" },
  { nome: "Osasco", uf: "SP" },
  { nome: "Uberlândia", uf: "MG" },
]

// Seeded random number generator for consistent values
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate consistent mock data based on indicator
export function generateMockData(indicador: string): TransportData[] {
  const data: TransportData[] = []

  municipios.forEach((municipio, index) => {
    // Use a deterministic seed based on index and indicator
    const seed = index + indicador.charCodeAt(0)
    const randomValue = seededRandom(seed)
    
    data.push({
      id: String(index + 1),
      municipio: municipio.nome,
      unidadeFederativa: municipio.uf,
      value: indicador.includes("Valor") || indicador.includes("Receita") || indicador.includes("Taxa") || indicador.includes("ISS") 
        ? `R$ ${(randomValue * 10000).toFixed(2).replace('.', ',')}`
        : indicador.includes("Capacidade")
        ? Math.floor(randomValue * 100) + 20
        : Math.floor(randomValue * 50) + 1,
    })
  })

  return data
} 