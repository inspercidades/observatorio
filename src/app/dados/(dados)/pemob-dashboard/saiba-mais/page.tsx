'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SaibaMais() {
  const router = useRouter()

  return (
    <div className="bg-[#f3f3f3] min-h-screen w-full flex items-start justify-center p-4 md:p-4 relative">
        {/* Botão de voltar no canto superior direito */}
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="default"
          className="hover:cursor-pointer absolute top-8 right-8 md:top-8 md:right-8 z-10 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="bg-white rounded-lg p-8 pt-16 md:p-12">

          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8">
            O que é a PEMOB?
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              A Pesquisa Nacional de Mobilidade Urbana (PEMOB) apresenta um panorama da mobilidade urbana nas principais cidades do Brasil. A PEMOB é realizada anualmente, desde 2018, pelo Ministério das Cidades e inclui todas os municípios com mais de 250 mil habitantes. Os dados são apresentados em nível de cidade e, desde 2019, também em nível de região metropolitana.
            </p>
            
            <p>
              A pesquisa tem objetivo de padronizar a coleta de dados de mobilidade entre os municípios brasileiros, visando estruturar o Sistema Nacional de Informações em Mobilidade Urbana (SIMU). Ela fornece informações relevantes para aprimorar a qualidade do sistema de transporte nas cidades, auxiliando governos a desenhar políticas públicas mais eficientes.
            </p>
            
            <p>
              A amostra total da PEMOB engloba 116 municípios, incluindo todas as capitais, que representam cerca de 42% da população brasileira. Em sua versão mais recente, entretano, a PEMOB 2024 conseguiu reunir informações de apenas 70 dos 116 municípios (60%) e de 29 das principais regiões metropolitanas do país.
            </p>
            
            <p>
              A pesquisa reúne dados sobre o desempenho operacional do transporte coletivo, indicadores de qualidade dos serviços, instrumentos de gestão utilizados, preços de tarifas e reajustes, entre outros. As informações da pesquisa são declaratórias e de responsabilidade das prefeituras e dos órgãos competentes. O grau de completude das respostas varia significativamente entre as cidades.
            </p>
            
            <p>
              O Dashboard da PEMOB foi criado para facilitar o acesso e dar mais visibilidade a este importante conjunto de dados, permitindo a fácil comparação da disponibilidade de informações em cada cidade.
            </p>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
              <p className="text-gray-700">
                Os dados brutos originais podem ser acessados também através do site do{' '}
                <Link 
                  href="https://simu.cidades.gov.br/pesquisa-nacional-de-mobilidade-urbana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  Sistema Nacional Informações em Mobilidade Urbana (Simu)
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}