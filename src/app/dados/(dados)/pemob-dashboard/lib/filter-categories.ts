// SVG icon imports from assets directory
import aeromovelIcon from "@/app/assets/images/aeromovel.svg"
import bandeiraIcon from "@/app/assets/images/bandeira.svg"
import barcoIcon from "@/app/assets/images/barco.svg"
import bicicletaIcon from "@/app/assets/images/bicicleta.svg"
import carroIcon from "@/app/assets/images/carro.svg"
import equipamentosIcon from "@/app/assets/images/equipamentos.svg"
import monotrilhoIcon from "@/app/assets/images/monotrilho.svg"
import mototaxisIcon from "@/app/assets/images/mototaxis.svg"
import multasIcon from "@/app/assets/images/multas.svg"
import onibusIcon from "@/app/assets/images/onibus.svg"
import pedestreIcon from "@/app/assets/images/pedestre.svg"
import subsidiosIcon from "@/app/assets/images/subsidios.svg"
import taxisIcon from "@/app/assets/images/taxis.svg"
import trabalhadoresIcon from "@/app/assets/images/trabalhadores.svg"
import tremIcon from "@/app/assets/images/trem.svg"
import tributosIcon from "@/app/assets/images/tributos.svg"
import valoresIcon from "@/app/assets/images/valores.svg"
import vanIcon from "@/app/assets/images/van.svg"
import viagensIcon from "@/app/assets/images/viagens.svg"
import vltIcon from "@/app/assets/images/VLT.svg"

import { FilterCategoriesType } from "./types"

// Complete filter categories extracted from CSV data
export const filterCategories: FilterCategoriesType =
{
  "Arrecadação": {
    "Multas": {
      "icon": multasIcon.src,
      "options": [
        "Valor Arrecadado com Multas de Trânsito"
      ]
    },
    "Tributos": {
      "icon": tributosIcon.src,
      "options": [
        "Valor Arrecadado com Cobrança de Estacionamento"
      ]
    }
  },
  "Custos": {
    "Aeromóvel": {
      "icon": aeromovelIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Aeromóvel)",
        "Impostos e Taxas - Taxa de Gerenciamento (Aeromóvel)",
        "Impostos e Taxas - PIS (Aeromóvel)",
        "Impostos e Taxas - Cofins (Aeromóvel)",
        "Impostos e Taxas - Alíquota Outros Impostos (Aeromóvel)",
        "Impostos e Taxas - Outros Impostos (Aeromóvel)",
        "Custos (Aeromóvel) - Operação (Ônibus)",
        "Custos (Aeromóvel) - Administrativo (Ônibus)",
        "Custos (Aeromóvel) - Combustível (Ônibus)",
        "Custos (Aeromóvel) - Depreciação (Ônibus)",
        "Custos (Aeromóvel) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Aeromóvel) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Aeromóvel) - Impostos e Tributação (Ônibus)",
        "Custos (Aeromóvel) - Despesas Administrativas (Ônibus)",
        "Custos (Aeromóvel) - Energia (Ônibus)",
        "Custos (Aeromóvel) - IPTU (Ônibus)",
        "Custos (Aeromóvel) - Outros insumos (Ônibus)"
      ]
    },
    "Barco": {
      "icon": barcoIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Barco)",
        "Impostos e Taxas - Taxa de Gerenciamento (Barco)",
        "Impostos e Taxas - PIS (Barco)",
        "Impostos e Taxas - Cofins (Barco)",
        "Impostos e Taxas - Alíquota Outros Impostos (Barco)",
        "Impostos e Taxas - Outros Impostos (Barco)",
        "Custos (Barco) - Operação (Ônibus)",
        "Custos (Barco) - Administrativo (Ônibus)",
        "Custos (Barco) - Combustível (Ônibus)",
        "Custos (Barco) - Depreciação (Ônibus)",
        "Custos (Barco) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Barco) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Barco) - Impostos e Tributação (Ônibus)",
        "Custos (Barco) - Despesas Administrativas (Ônibus)",
        "Custos (Barco) - Outros insumos (Ônibus)"
      ]
    },
    "Metrô": {
      "icon": tremIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Metrô)",
        "Impostos e Taxas - Taxa de Gerenciamento (Metrô)",
        "Impostos e Taxas - PIS (Metrô)",
        "Impostos e Taxas - Cofins (Metrô)",
        "Impostos e Taxas - Alíquota Outros Impostos (Metrô)",
        "Impostos e Taxas - Outros Impostos (Metrô)",
        "Custos (Metrô) - Operação (Ônibus)",
        "Custos (Metrô) - Administrativo (Ônibus)",
        "Custos (Metrô) - Combustível (Ônibus)",
        "Custos (Metrô) - Depreciação (Ônibus)",
        "Custos (Metrô) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Metrô) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Metrô) - Impostos e Tributação (Ônibus)",
        "Custos (Metrô) - Despesas Administrativas (Ônibus)",
        "Custos (Metrô) - Energia (Ônibus)",
        "Custos (Metrô) - IPTU (Ônibus)",
        "Custos (Metrô) - Outros insumos (Ônibus)"
      ]
    },
    "Monotrilho": {
      "icon": monotrilhoIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Monotrilho)",
        "Impostos e Taxas - Taxa de Gerenciamento (Monotrilho)",
        "Impostos e Taxas - PIS (Monotrilho)",
        "Impostos e Taxas - Cofins (Monotrilho)",
        "Impostos e Taxas - Alíquota Outros Impostos (Monotrilho)",
        "Impostos e Taxas - Outros Impostos (Monotrilho)",
        "Custos (Monotrilho) - Operação (Ônibus)",
        "Custos (Monotrilho) - Administrativo (Ônibus)",
        "Custos (Monotrilho) - Combustível (Ônibus)",
        "Custos (Monotrilho) - Depreciação (Ônibus)",
        "Custos (Monotrilho) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Monotrilho) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Monotrilho) - Impostos e Tributação (Ônibus)",
        "Custos (Monotrilho) - Despesas Administrativas (Ônibus)",
        "Custos (Monotrilho) - Energia (Ônibus)",
        "Custos (Monotrilho) - IPTU (Ônibus)",
        "Custos (Monotrilho) - Outros insumos (Ônibus)"
      ]
    },
    "Trem": {
      "icon": tremIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Trem)",
        "Impostos e Taxas - Taxa de Gerenciamento (Trem)",
        "Impostos e Taxas - PIS (Trem)",
        "Impostos e Taxas - Cofins (Trem)",
        "Impostos e Taxas - Alíquota Outros Impostos (Trem)",
        "Impostos e Taxas - Outros Impostos (Trem)",
        "Custos (Trem) - Operação (Ônibus)",
        "Custos (Trem) - Administrativo (Ônibus)",
        "Custos (Trem) - Combustível (Ônibus)",
        "Custos (Trem) - Depreciação (Ônibus)",
        "Custos (Trem) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Trem) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Trem) - Impostos e Tributação (Ônibus)",
        "Custos (Trem) - Despesas Administrativas (Ônibus)",
        "Custos (Trem) - Energia (Ônibus)",
        "Custos (Trem) - IPTU (Ônibus)",
        "Custos (Trem) - Outros insumos (Ônibus)"
      ]
    },
    "VLT": {
      "icon": vltIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (VLT)",
        "Impostos e Taxas - Taxa de Gerenciamento (VLT)",
        "Impostos e Taxas - PIS (VLT)",
        "Impostos e Taxas - Cofins (VLT)",
        "Impostos e Taxas - Alíquota Outros Impostos (VLT)",
        "Impostos e Taxas - Outros Impostos (VLT)",
        "Custos (VLT) - Operação (Ônibus)",
        "Custos (VLT) - Administrativo (Ônibus)",
        "Custos (VLT) - Combustível (Ônibus)",
        "Custos (VLT) - Depreciação (Ônibus)",
        "Custos (VLT) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (VLT) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (VLT) - Impostos e Tributação (Ônibus)",
        "Custos (VLT) - Despesas Administrativas (Ônibus)",
        "Custos (VLT) - Energia (Ônibus)",
        "Custos (VLT) - IPTU (Ônibus)",
        "Custos (VLT) - Outros insumos (Ônibus)"
      ]
    },
    "Vans/Microônibus": {
      "icon": vanIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Vans/Microônibus)",
        "Impostos e Taxas - Taxa de Gerenciamento (Vans/Microônibus)",
        "Impostos e Taxas - PIS (Vans/Microônibus)",
        "Impostos e Taxas - Cofins (Vans/Microônibus)",
        "Impostos e Taxas - Alíquota Outros Impostos (Vans/Microônibus)",
        "Impostos e Taxas - Outros Impostos (Vans/Microônibus)",
        "Custos (Vans/Microônibus) - Operação (Ônibus)",
        "Custos (Vans/Microônibus) - Administrativo (Ônibus)",
        "Custos (Vans/Microônibus) - Combustível (Ônibus)",
        "Custos (Vans/Microônibus) - Depreciação (Ônibus)",
        "Custos (Vans/Microônibus) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Vans/Microônibus) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Vans/Microônibus) - Impostos e Tributação (Ônibus)",
        "Custos (Vans/Microônibus) - Despesas Administrativas (Ônibus)",
        "Custos (Vans/Microônibus) - Outros insumos (Ônibus)"
      ]
    },
    "Ônibus": {
      "icon": onibusIcon.src,
      "options": [
        "Impostos e taxas - Alíquota ISS (Ônibus)",
        "Impostos e Taxas - Taxa de Gerenciamento (Ônibus)",
        "Impostos e Taxas - PIS (Ônibus)",
        "Impostos e Taxas - Cofins (Ônibus)",
        "Impostos e Taxas - Alíquota Outros Impostos (Ônibus)",
        "Impostos e Taxas - Outros Impostos (Ônibus)",
        "Custos (Ônibus) - Operação (Ônibus)",
        "Custos (Ônibus) - Administrativo (Ônibus)",
        "Custos (Ônibus) - Combustível (Ônibus)",
        "Custos (Ônibus) - Depreciação (Ônibus)",
        "Custos (Ônibus) - Remuneração pelo Serviço Prestado (Ônibus)",
        "Custos (Ônibus) - Peças, acessórios e material de rodagem (Ônibus)",
        "Custos (Ônibus) - Impostos e Tributação (Ônibus)",
        "Custos (Ônibus) - Despesas Administrativas (Ônibus)",
        "Custos (Ônibus) - Outros insumos (Ônibus)"
      ]
    }
  },
  "Demanda": {
    "Aeromóvel": {
      "icon": aeromovelIcon.src,
      "options": [
        "Passageiros de Aeromóvel (Comum)",
        "Passageiros de Aeromóvel (Vale Transporte)",
        "Passageiros de Aeromóvel (Estudante)",
        "Passageiros de Aeromóvel (Integração)",
        "Passageiros de Aeromóvel (Gratuidade)",
        "Passageiros de Aeromóvel (Equivalentes)"
      ]
    },
    "Automóvel": {
      "icon": carroIcon.src,
      "options": [
        "Passageiros de Transporte por Aplicativo"
      ]
    },
    "Barco": {
      "icon": barcoIcon.src,
      "options": [
        "Passageiros de Barco (Comum)",
        "Passageiros de Barco (Vale Transporte)",
        "Passageiros de Barco (Estudante)",
        "Passageiros de Barco (Integração)",
        "Passageiros de Barco (Gratuidade)",
        "Passageiros de Barco (Equivalentes)"
      ]
    },
    "Metrô": {
      "icon": tremIcon.src,
      "options": [
        "Passageiros de Metrô (Comum)",
        "Passageiros de Metrô (Vale Transporte)",
        "Passageiros de Metrô (Estudante)",
        "Passageiros de Metrô (Integração)",
        "Passageiros de Metrô (Gratuidade)",
        "Passageiros de Metrô (Equivalentes)"
      ]
    },
    "Monotrilho": {
      "icon": monotrilhoIcon.src,
      "options": [
        "Passageiros de Monotrilho (Comum)",
        "Passageiros de Monotrilho (Vale Transporte)",
        "Passageiros de Monotrilho (Estudante)",
        "Passageiros de Monotrilho (Integração)",
        "Passageiros de Monotrilho (Gratuidade)",
        "Passageiros de Monotrilho (Equivalentes)"
      ]
    },
    "Trem": {
      "icon": tremIcon.src,
      "options": [
        "Passageiros de Trem (Comum)",
        "Passageiros de Trem (Vale Transporte)",
        "Passageiros de Trem (Estudante)",
        "Passageiros de Trem (Integração)",
        "Passageiros de Trem (Gratuidade)",
        "Passageiros de Trem (Equivalentes)"
      ]
    },
    "VLT": {
      "icon": vltIcon.src,
      "options": [
        "Passageiros de VLT (Comum)",
        "Passageiros de VLT (Vale Transporte)",
        "Passageiros de VLT (Estudante)",
        "Passageiros de VLT (Integração)",
        "Passageiros de VLT (Gratuidade)",
        "Passageiros de VLT (Equivalentes)"
      ]
    },
    "Vans/Microônibus": {
      "icon": vanIcon.src,
      "options": [
        "Passageiros de Vans/Microônibus (Comum)",
        "Passageiros de Vans/Microônibus (Vale Transporte)",
        "Passageiros de Vans/Microônibus (Estudante)",
        "Passageiros de Vans/Microônibus (Integração)",
        "Passageiros de Vans/Microônibus (Gratuidade)",
        "Passageiros de Vans/Microônibus (Equivalentes)"
      ]
    },
    "Ônibus": {
      "icon": onibusIcon.src,
      "options": [
        "Passageiros de Ônibus (Comum)",
        "Passageiros de Ônibus (Vale Transporte)",
        "Passageiros de Ônibus (Estudante)",
        "Passageiros de Ônibus (Integração)",
        "Passageiros de Ônibus (Gratuidade)",
        "Passageiros de Ônibus (Equivalentes)"
      ]
    }
  },
  "Frota": {
    "Aeromóvel": {
      "icon": aeromovelIcon.src,
      "options": [
        "Frota (composição) de Aeromóvel",
        "Aeromóvel (capacidade média)",
        "Quilômetros Percorridos (Aeromóvel)",
        "Idade Média da Frota de Aeromóvel"
      ]
    },
    "Automóvel": {
      "icon": carroIcon.src,
      "options": [
        "Quilômetros Percorridos de Transporte por Aplicativo"
      ]
    },
    "Barco": {
      "icon": barcoIcon.src,
      "options": [
        "Frota de Barcos",
        "Barcos (capacidade média)",
        "Quilômetros Percorridos (Barco)"
      ]
    },
    "Bicicletas": {
      "icon": bicicletaIcon.src,
      "options": [
        "Frota de Bicicletas Compartilhadas",
        "Extensão de Ciclovias Exclusivas",
        "Extensão de Ciclofaixas Exclusivas"
      ]
    },
    "Metrô": {
      "icon": tremIcon.src,
      "options": [
        "Frota (composição) de Metrôs",
        "Metrô (capacidade média)",
        "Quilômetros Percorridos (Metrô)",
        "Idade Média da Frota de Metrô"
      ]
    },
    "Monotrilho": {
      "icon": monotrilhoIcon.src,
      "options": [
        "Frota (composição) de Monotrilhos",
        "Monotrilho (capacidade média)",
        "Quilômetros Percorridos (Monotrilho)",
        "Idade Média da Frota de Monotrilho"
      ]
    },
    "Mototáxis": {
      "icon": mototaxisIcon.src,
      "options": [
        "Frota de Mototáxis"
      ]
    },
    "Trem": {
      "icon": tremIcon.src,
      "options": [
        "Frota de Trens",
        "Trem (capacidade média)",
        "Quilômetros Percorridos (Trem)",
        "Idade Média da Frota de Trens"
      ]
    },
    "Táxis": {
      "icon": taxisIcon.src,
      "options": [
        "Frota de Táxis",
        "Idade Média da Frota de Táxis",
        "Frota de Táxis com Fontes de Energia Alternativa",
        "Frota de Táxis Movido a Etanol (%)",
        "Frota de Táxis Movido a Eletricidade (%)",
        "Frota de Táxis Movido a Gás Natural (%)",
        "Frota de Táxis Híbridos (Eletricidade + Gasolina) (%)"
      ]
    },
    "VLT": {
      "icon": vltIcon.src,
      "options": [
        "Frota (composição) de VLTs",
        "VLT (capacidade média)",
        "Quilômetros Percorridos (VLT)",
        "Idade Média da Frota de VLTs"
      ]
    },
    "Vans/Microônibus": {
      "icon": vanIcon.src,
      "options": [
        "Frota de Microônibus",
        "Microônibus (capacidade média)",
        "Quilômetros Percorridos (Microônibus)",
        "Idade Média da Frota de Microônibus"
      ]
    },
    "Ônibus": {
      "icon": onibusIcon.src,
      "options": [
        "Frota de ônibus",
        "Ônibus (capacidade média)",
        "Ônibus (piso baixo)",
        "Ônibus (com plataforma)",
        "Frota de Ônibus Articulados",
        "Ônibus Articulados (capacidade média)",
        "Ônibus Articulados (piso baixo)",
        "Ônibus Articulados (com plataforma)",
        "Frota de Ônibus Biarticulados",
        "Ônibus Biarticulados (cap. média)",
        "Ônibus Biarticulados (piso baixo)",
        "Ônibus Biarticulados (com plataforma)",
        "Frota de Veículos Fretados para Passageiros",
        "Frota de Veículos Escolares",
        "Extensão de Vias Exclusivas para BRT",
        "Extensão de Corredores Exclusivos de Ônibus",
        "Extensão de Faixas Exclusivas",
        "Quilômetros Percorridos (Ônibus)",
        "Idade Média da Frota de Ônibus",
        "Frota de Ônibus com Fontes de Energia Alternativa",
        "Frota de Ônibus Movido a Etanol (%)",
        "Frota de Ônibus Movido a Eletricidade (%)",
        "Frota de Ônibus Movido a Gás Natural (%)",
        "Frota de Ônibus Movido a Hidrogênio (%)",
        "Frota de Ônibus Movido a Biodiesel (%)",
        "Frota de Ônibus Híbridos (Eletricidade + Diesel) (%)"
      ]
    }
  },
  "Infraestrutura": {
    "Aeromóvel": {
      "icon": aeromovelIcon.src,
      "options": [
        "Extensão da malha (aeromóvel)",
        "Velocidade Média do Aeromóvel (pico)",
        "Existe informação sobre pontualidade e regularidade (Aeromóvel)",
        "Viagens de Aeromóvel Realizadas no Horário Programado (%)",
        "Viagens de Aeromóvel Incompletas (%)"
      ]
    },
    "Automóvel": {
      "icon": carroIcon.src,
      "options": [
        "Vagas de Estacionamento Reguladas",
        "Percentual de Vagas de Estacionamento para Deficientes",
        "Percentual de Vagas de Estacionamento para Idosos",
        "Percentual de Vagas de Estacionamento para Gestantes",
        "Existe Fiscalização para Cobrança em Vagas Públicas"
      ]
    },
    "Barco": {
      "icon": barcoIcon.src,
      "options": [
        "Existe informação sobre pontualidade e regularidade (Barco)",
        "Viagens de Barco Realizadas no Horário Programado (%)",
        "Viagens de Barco Incompletas (%)"
      ]
    },
    "Equipamentos": {
      "icon": equipamentosIcon.src,
      "options": [
        "Equipamentos de Fiscalização"
      ]
    },
    "Metrô": {
      "icon": tremIcon.src,
      "options": [
        "Extensão da malha (metrô)",
        "Velocidade Média do Metrô (pico)",
        "Existe informação sobre pontualidade e regularidade (Metrô)",
        "Viagens de Metrô Realizadas no Horário Programado (%)",
        "Viagens de Metrô Incompletas (%)"
      ]
    },
    "Metrô/Trem": {
      "icon": tremIcon.src,
      "options": [
        "Número de Metroviárias",
        "Número de Metroviárias (acessibilidade, def. física)",
        "Número de Metroviárias (acessibilidade, def. visual)",
        "Número de Metroviárias com Intregração",
        "Estações Metroviárias com Itinerários",
        "Estações Metroviárias com Informações sobre Horários",
        "Estações Metroviárias com Informações sobre Tarifas",
        "Estações Metroviárias com Informações sobre Integrações"
      ]
    },
    "Monotrilho": {
      "icon": monotrilhoIcon.src,
      "options": [
        "Extensão da malha (monotrilho)",
        "Velocidade Média do Monotrilho (pico)",
        "Existe informação sobre pontualidade e regularidade (Monotrilho)",
        "Viagens de Monotrilho Realizadas no Horário Programado (%)",
        "Viagens de Monotrilho Incompletas (%)"
      ]
    },
    "Pedestre": {
      "icon": pedestreIcon.src,
      "options": [
        "Extensão de Vias Exclusivas para Pedestres",
        "Extensão de Vias Exclusivas Temporárias para Pedestres",
        "Extensão de Calçadas para Pedestres"
      ]
    },
    "Trabalhadores": {
      "icon": trabalhadoresIcon.src,
      "options": [
        "Agentes de Trânsito em Exercício"
      ]
    },
    "Trem": {
      "icon": tremIcon.src,
      "options": [
        "Extensão da malha (trem)",
        "Velocidade Média do Trem (pico)",
        "Existe informação sobre pontualidade e regularidade (Trem)",
        "Viagens de Trem Realizadas no Horário Programado (%)",
        "Viagens de Trem Incompletas (%)"
      ]
    },
    "Táxis": {
      "icon": taxisIcon.src,
      "options": [
        "Táxi no Corredor de Ônibus"
      ]
    },
    "VLT": {
      "icon": vltIcon.src,
      "options": [
        "Extensão da malha (VLT)",
        "Velocidade Média do VLT (pico)",
        "Existe informação sobre pontualidade e regularidade (VLT)",
        "Viagens de VLT Realizadas no Horário Programado (%)",
        "Viagens de VLT Incompletas (%)"
      ]
    },
    "Vans/Microônibus": {
      "icon": vanIcon.src,
      "options": [
        "Existe informação sobre pontualidade e regularidade (Microônibus)",
        "Viagens de Microônibus Realizadas no Horário Programado (%)",
        "Viagens de Ônibus Incompletas Microônibus(%)"
      ]
    },
    "Ônibus": {
      "icon": onibusIcon.src,
      "options": [
        "Número de Rodoviárias",
        "Número de Rodoviárias (acessibilidade, def. física)",
        "Número de Rodoviárias (acessibilidade, def. visual)",
        "Número de Rodoviárias com Integração",
        "Pontos de Embarque/Desembarque (Total)",
        "Pontos de Embarque com abrigo",
        "Pontos de Embarque (em nível)",
        "Pontos de Embarque Georreferenciados",
        "Velocidade Média do BRT em faixas prioritárias (pico)",
        "Velocidade Média do Ônibus nos Corredores (pico)",
        "Velocidade Média do Ônibus nas Faixas Exclusivas (pico)",
        "Velocidade Média do Transporte Público em Vias Mistas",
        "Terminais Rodoviários com Itinerários",
        "Terminais Rodoviários com Informações sobre Horários",
        "Terminais Rodoviários com Informações sobre Tarifas",
        "Terminais Rodoviários com Informações sobre Integrações",
        "Pontos de Embarque com Itinerários",
        "Pontos de Embarque com Informações sobre Horários",
        "Pontos de Embarque com Informações sobre Tarifas",
        "Pontos de Embarque com Informações sobre Integrações",
        "Existe informação sobre pontualidade e regularidade (Ônibus)",
        "Viagens de Ônibus Realizadas no Horário Programado (%)",
        "Viagens de Ônibus Incompletas (%)"
      ]
    }
  },
  "Outros": {
    "Governança e Leis": {
      "icon": bandeiraIcon.src,
      "options": [
        "Existe Pesquisa de Satisfação de Usuário",
        "Plano Diretor",
        "Ano Plano Diretor",
        "Lei de Zoneamento ou Uso e Ocupação do Solo",
        "Contemplado em Plano de Mobilidade Urbana",
        "Conselho Municipal de Transporte e/ou Mobilidade Urbana"
      ]
    },
    "Origem e Destino": {
      "icon": viagensIcon.src,
      "options": [
        "POD - Número médio de viagens diárias",
        "POD - Distância média das viagens",
        "POD - Tempo médio das viagens",
        "POD - Percentual de viagens a pé",
        "POD - Percentual de viagens de bicicleta",
        "POD - Percentual de viagens por transporte público",
        "POD - Percentual de viagens por automóvel individual",
        "POD - Percentual de viagens por moto",
        "POD - Percentual de viagens por táxi ou carro de aplicativo",
        "POD - Percentual de viagens por outros modais"
      ]
    }
  },
  "Receita": {
    "Aeromóvel": {
      "icon": aeromovelIcon.src,
      "options": [
        "Receita Tarifária (Aeromóvel)",
        "Subsídios a Passageiros (Aeromóvel)",
        "Subsídios ao Sistema (Aeromóvel)",
        "Receita Extratarifária com Publicidade (Aeromóvel)",
        "Receita Extratarifária de Outras Fontes (Aeromóvel)"
      ]
    },
    "Barco": {
      "icon": barcoIcon.src,
      "options": [
        "Receita Tarifária (Barco)",
        "Subsídios a Passageiros (Barco)",
        "Subsídios ao Sistema (Barco)",
        "Receita Extratarifária com Publicidade (Barco)",
        "Receita Extratarifária de Outras Fontes (Barco)"
      ]
    },
    "Metrô": {
      "icon": tremIcon.src,
      "options": [
        "Receita Tarifária (Metrô)",
        "Subsídios a Passageiros (Metrô)",
        "Subsídios ao Sistema (Metrô)",
        "Receita Extratarifária com Publicidade (Metrô)",
        "Receita Extratarifária de Outras Fontes (Metrô)"
      ]
    },
    "Monotrilho": {
      "icon": monotrilhoIcon.src,
      "options": [
        "Receita Tarifária (Monotrilho)",
        "Subsídios a Passageiros (Monotrilho)",
        "Subsídios ao Sistema (Monotrilho)",
        "Receita Extratarifária com Publicidade (Monotrilho)",
        "Receita Extratarifária de Outras Fontes (Monotrilho)"
      ]
    },
    "Trem": {
      "icon": tremIcon.src,
      "options": [
        "Receita Tarifária (Trem)",
        "Subsídios a Passageiros (Trem)",
        "Subsídios ao Sistema (Trem)",
        "Receita Extratarifária com Publicidade (Trem)",
        "Receita Extratarifária de Outras Fontes (Trem)"
      ]
    },
    "VLT": {
      "icon": vltIcon.src,
      "options": [
        "Receita Tarifária (VLT)",
        "Subsídios a Passageiros (VLT)",
        "Subsídios ao Sistema (VLT)",
        "Receita Extratarifária com Publicidade (VLT)",
        "Receita Extratarifária de Outras Fontes (VLT)"
      ]
    },
    "Vans/Microônibus": {
      "icon": vanIcon.src,
      "options": [
        "Receita Tarifária (Vans/Microônibus)",
        "Subsídios a Passageiros (Vans/Microônibus)",
        "Subsídios ao Sistema (Vans/Microônibus)",
        "Receita Extratarifária com Publicidade (Vans/Microônibus)",
        "Receita Extratarifária de Outras Fontes (Vans/Microônibus)"
      ]
    },
    "Ônibus": {
      "icon": onibusIcon.src,
      "options": [
        "Receita Tarifária (Ônibus)",
        "Subsídios a Passageiros (Ônibus)",
        "Subsídios ao Sistema (Ônibus)",
        "Receita Extratarifária com Publicidade (Ônibus)",
        "Receita Extratarifária de Outras Fontes (Ônibus)"
      ]
    }
  },
  "Tarifas": {
    "Mototáxis": {
      "icon": mototaxisIcon.src,
      "options": [
        "Táxi - Valor da Bandeirada",
        "Táxi - Valor da Bandeirada 1",
        "Táxi - Valor da Bandeirada 2",
        "Táxi - Valor Hora Parada",
        "Táxi - Valor Tarifa Aeroporto"
      ]
    },
    "Subsídios": {
      "icon": subsidiosIcon.src,
      "options": [
        "Baixa Renda - Percentual de Desconto",
        "Idosos - Tarifa Paga",
        "Deficientes - Tarifa Paga",
        "Estudantes de Rede Pública - Percentual de Desconto",
        "Estudantes de Rede Privada - Percentual de Desconto"
      ]
    },
    "Táxis": {
      "icon": taxisIcon.src,
      "options": [
        "Táxi - Valor da Bandeirada",
        "Táxi - Valor da Bandeirada 1",
        "Táxi - Valor da Bandeirada 2",
        "Táxi - Valor Hora Parada",
        "Táxi - Valor Tarifa Aeroporto"
      ]
    },
    "Valores": {
      "icon": valoresIcon.src,
      "options": [
        "Valor da Tarifa",
        "Valor Anterior da Tarifa"
      ]
    }
  }
}
