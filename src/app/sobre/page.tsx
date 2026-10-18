"use client"
import { Header } from "@/components/header";

// Import team member images
import adriano_borges from "@/app/assets/images/adriano_borges.png";
import antonio_henrique from "@/app/assets/images/antonio_henrique.png";
import beatriz_vanzolini from "@/app/assets/images/beatriz_vanzolini.png";
import caio_jacintho from "@/app/assets/images/caio.png";
import denis_andia from "@/app/assets/images/denis_andia.png";
import eliana_silva from "@/app/assets/images/eliana_silva.png";
import gabriel_fajardo from "@/app/assets/images/gabriel_fajardo.png";
import gabriela_vasconcelos from "@/app/assets/images/gabriela_vasconcelos.png";
import heloisa_escudeiro from "@/app/assets/images/heloisa_escudeiro.png";
import ivanice_schutz from "@/app/assets/images/ivanice_schutz.png";
import jose_police_neto from "@/app/assets/images/jose_police_neto.png";
import juan_sebastian from "@/app/assets/images/juan_sebastian.png";
import laryssa_kruger from "@/app/assets/images/laryssa_kruger.png";
import lucas_tavares from "@/app/assets/images/lucas-tavares-da-silva-ferreira.png";
import lucelio_moraes from "@/app/assets/images/lucelio_moraes.png";
import marcela_costa from "@/app/assets/images/marcela_costa.png";
import mauricio_bouskela from "@/app/assets/images/mauricio_bouskela.png";
import miguel_setas from "@/app/assets/images/miguel_setas.png";
import paulina_insper from "@/app/assets/images/paulina_insper.png";
import renata_ruggiero from "@/app/assets/images/renata_ruggiero.png";
import ricardo_balestreri from "@/app/assets/images/ricardo_balestreri.png";
import rinaldo_gama from "@/app/assets/images/rinaldo_gama.png";
import rodnei from "@/app/assets/images/rodnei.png";
import centroDadosLogo from "@/app/assets/images/insper_logo_2.png";
import sergio_avelleda from "@/app/assets/images/sergio_avelleda.png";
import suzana_nogueira from "@/app/assets/images/suzana.webp";
import tomas_alvim from "@/app/assets/images/tomas_alvim.png";
import vanessa_duarte from "@/app/assets/images/vanessa_duarte.png";
import vinicius_oike_reginatto from "@/app/assets/images/vinicius_oike_reginatto.png";

import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface TeamMember {
  id: string
  name: string
  role: string
  image?: StaticImageData
  email?: string
}
interface DevelopmentTeamMember {
  id: string
  name: string
  role: string
}

// Equipe Observatório
const equipeObservatorio: TeamMember[] = [
  {
    id: '1',
    name: 'Sérgio Avelleda',
    role: 'Coordenador',
    image: sergio_avelleda,
    email: 'sergiohpa1@insper.edu.br'
  },
  {
    id: '2',
    name: 'Suzana Nogueira',
    role: 'Coordenadora-adjunta',
    image: suzana_nogueira,
    email: 'suzanaln@insper.edu.br'
  },
  {
    id: '3',
    name: 'Vinicius Oike',
    role: 'Cientista de dados',
    image: vinicius_oike_reginatto,
    email: 'viniciusor@insper.edu.br'
  }
]

// Conselho Gestor - Observatório
const conselhoGestor: TeamMember[] = [
  {
    id: '1',
    name: 'Rodnei Souza',
    role: 'Presidente do Conselho Gestor',
    image: rodnei
  },
  {
    id: '2',
    name: 'Sergio Avelleda',
    role: 'Membro técnico do conselho gestor',
    image: sergio_avelleda
  },
  {
    id: '3',
    name: 'Suzana Nogueira',
    role: 'Membro técnico do conselho gestor',
    image: suzana_nogueira
  },
  {
    id: '4',
    name: 'Gabriel Fajardo',
    role: 'Conselho estratégico',
    image: gabriel_fajardo
  },
  {
    id: '5',
    name: 'Renata Ruggiero',
    role: 'Comitê gestor',
    image: renata_ruggiero
  },
  {
    id: '6',
    name: 'Vanessa Duarte',
    role: 'Comitê gestor',
    image: vanessa_duarte
  },
  {
    id: '7',
    name: 'Lucélio de Moraes',
    role: 'Comitê gestor',
    image: lucelio_moraes
  },
  {
    id: '8',
    name: 'Marcela Costa',
    role: 'Comitê de pesquisa',
    image: marcela_costa
  },
  {
    id: '9',
    name: 'Adriano Borges',
    role: 'Comitê de pesquisa',
    image: adriano_borges
  },
  {
    id: '10',
    name: 'Miguel Setas',
    role: 'Conselho estratégico',
    image: miguel_setas
  },
  {
    id: '12',
    name: 'Denis Andia',
    role: 'Conselho estratégico',
    image: denis_andia
  },
  {
    id: '13',
    name: 'Ivanice Schutz',
    role: 'Conselho estratégico / Niterói',
    image: ivanice_schutz
  },
  {
    id: '14',
    name: 'Antonio Henrique',
    role: 'Conselho estratégico / Recife',
    image: antonio_henrique
  }
]

// Equipe Insper Cidades
const equipeInsperCidades: TeamMember[] = [
  {
    id: '1',
    name: 'Tomas Alvim',
    role: 'Coordenador',
    image: tomas_alvim,
    email: 'TomasAMMPA@insper.edu.br'
  },
  {
    id: '2',
    name: 'Gabriela Vasconcelos',
    role: 'Coordenadora',
    image: gabriela_vasconcelos,
    email: 'gabiva1@insper.edu.br'
  },
  {
    id: '3',
    name: 'Adriano Borges',
    role: 'Coordenador',
    image: adriano_borges,
    email: 'AdrianoBFC@insper.edu.br'
  },
  {
    id: '4',
    name: 'Paulina Achurra',
    role: 'Coordenadora',
    image: paulina_insper,
    email: 'paulina.achurra@insper.edu.br'
  },
  {
    id: '5',
    name: 'Beatriz Vanzolini',
    role: 'Coordenadora',
    image: beatriz_vanzolini,
    email: 'BeatrizVM2@insper.edu.br'
  },
  {
    id: '6',
    name: 'Rinaldo Gama',
    role: 'Coordenador',
    image: rinaldo_gama,
    email: 'rinaldog@insper.edu.br'
  },
  {
    id: '7',
    name: 'Eliana Silva',
    role: 'Coordenadora',
    image: eliana_silva,
    email: 'ElianaSS@insper.edu.br'
  },
  {
    id: '8',
    name: 'Ricardo Balestreri',
    role: 'Coordenador',
    image: ricardo_balestreri,
    email: 'ricardobb2@insper.edu.br'
  },
  {
    id: '9',
    name: 'Laryssa Kruger',
    role: 'Coordenadora-adjunta',
    image: laryssa_kruger,
    email: 'laryssakc1@insper.edu.br'
  },
  {
    id: '10',
    name: 'Juan Sebastian',
    role: 'Coordenador',
    image: juan_sebastian,
    email: 'juansbf@insper.edu.br'
  },
  {
    id: '11',
    name: 'Heloisa Escudeiro',
    role: 'Coordenadora-adjunta',
    image: heloisa_escudeiro,
    email: 'heloisale1@insper.edu.br'
  },
  {
    id: '12',
    name: 'Police Neto',
    role: 'Coordenador',
    image: jose_police_neto,
    email: 'JosePN1@insper.edu.br'
  },
  {
    id: '13',
    name: 'Mauricio Bouskela',
    role: 'Coordenador',
    image: mauricio_bouskela,
    email: 'mauriciosb4@insper.edu.br'
  }
]
// Equipe de desenvolvimento 
const equipeDeDesenvolvimento: DevelopmentTeamMember[] = [
  {
    id: '1',
    name: 'Sérgio Avelleda',
    role: 'Coordenador'
  },
  {
    id: '2',
    name: 'Suzana Nogueira',
    role: 'Coordenadora-adjunta',
  },
  {
    id: '3',
    name: 'Adriano Borges e Maurício Bouskela',
    role: 'Coordenação Portal de Dados',
  },
  {
    id: '4',
    name: 'Rinaldo Gama',
    role: 'Coordenação e revisão de conteúdos'
  },
  {
    id: '5',
    name: 'Vinicius Oike',
    role: 'Cientista de dados',
  },
  {
    id: '7',
    name: 'Lucas Tavares',
    role: 'Desenvolvedor',
  },
]

export default function Sobre() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <div className="bg-[#f9f9f6]">
      <Header className="bg-[#f9f9f6]" />
      <div className="px-4 2xl:px-16 pt-20">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-medium leading-none">O Observatório</h2>
            {/* <p className="text-4xl text-gray-400 leading-none font-medium">projeto</p> */}
          </div>
          <div className="hidden md:block h-[1.2px] flex-grow mx-16 bg-gray-300" />
          <div className="hidden md:block w-4 h-4 bg-[#2F2C2C]" />
        </div>
      </div>
      {/* About Section */}
      <section className="pb-16 px-4 2xl:px-16">
        <div className="mx-auto">
          {/* História Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-medium text-gray-900">História</h2>
            </div>
            <div className="lg:col-span-4 lg:max-w-[50vw] lg:justify-self-end">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  O Observatório Nacional de Mobilidade Sustentável (ONMS), fundado em setembro de 2023, é uma iniciativa do Centro de Estudos das Cidades do Insper. Em parceria com a Motiva, o ONMS pretende consolidar-se como um centro de referência para produção, integração e aplicação de conhecimento voltado à mobilidade sustentável. O portal do ONMS, lançado em janeiro de 2026, reúne todas as produções do Observatório e é peça central para que as decisões em mobilidade no Brasil sejam qualificadas por evidências, conhecimento e aprendizagem coletiva.
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="h-[1px] w-full bg-gray-200 mb-12"></div>

          {/* Missão Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-medium text-gray-900">Missão</h2>
            </div>
            <div className="lg:col-span-4 lg:max-w-[50vw] lg:justify-self-end">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Produzir, integrar, organizar e disseminar conhecimento baseado em evidências, promovendo sua aplicação para qualificar decisões relacionadas à mobilidade sustentável.
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="h-[1px] w-full bg-gray-200 mb-12"></div>

          {/* Objetivos Section */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-medium text-gray-900">Objetivos</h2>
            </div>
            <div className="lg:col-span-4 lg:max-w-[50vw] lg:justify-self-end">
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-6 text-gray-700 leading-relaxed">
                  <li>Disponibilizar um ambiente de dados abertos para fomentar a mobilidade urbana inclusiva, segura e ambientalmente sustentável, com foco na priorização do transporte público coletivo, mobilidade a pé, cicloviário, logística urbana, e que promova a segurança viária nas cidades brasileiras.</li>
                  <li>Elaborar estudos, pesquisas e análises acadêmicas que promovam conhecimento na mobilidade sustentável e permitam orientar políticas públicas;</li>
                  <li>Produzir ferramentas e indicadores estratégicos que apoiem municípios no uso de dados.</li>
                  <li>Promover articulação entre municípios através da Rede de Cidades, visando ampliar o conhecimento e troca de informações.</li>
                  <li>Organizar eventos periódicos para debates e divulgação dos temas da mobilidade urbana sustentável;</li>
                  <li>Promover cursos de educação executiva e disciplinas eletivas para as turmas de graduação que promovam o conhecimento do tema.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xs font-medium">Arraste</span>
        </div>
      </div>

      {/* Section 1: Equipe Observatório */}
      <section className="py-16 mx-auto pt-30">
        <div className="mx-auto">
          <h2 className="lg:absolute text-xl font-medium text-gray-900 px-4 2xl:px-16 pb-6 lg:pb-0">Equipe Observatório</h2>
          <div
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden ml-0! pl-4! md:ml-0! lg:ml-100!"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={false}
              modules={[FreeMode]}
              className="!overflow-visible"
            >
              {equipeObservatorio.map((member) => (
                <SwiperSlide key={member.id} className="!w-[250px] md:!w-[350px] group relative">
                  <div className="relative overflow-hidden h-[350px] w-[250px] md:h-[450px] md:w-[350px] bg-[#ECECEC]">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
                      />
                    )}
                  </div>
                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.role}
                    </p>
                    {member.email && (
                      <p className="text-sm text-gray-500 mt-6">
                        {member.email}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xs font-medium">Arraste</span>
        </div>
      </div>

      {/* Section 2: Conselho Gestor - Observatório */}
      <section className="py-16 mx-auto">
        <div className="mx-auto">
          <h2 className="lg:absolute text-xl font-medium text-gray-900 px-4 2xl:px-16 pb-6 lg:pb-0">Conselho Gestor - Observatório</h2>
          <div
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden ml-0! pl-4! md:ml-0! lg:ml-100!"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={false}
              modules={[FreeMode]}
              className="!overflow-visible"
            >
              {conselhoGestor.map((member) => (
                <SwiperSlide key={member.id} className="!w-[250px] md:!w-[350px] group relative">
                  <div className="relative overflow-hidden h-[350px] w-[250px] md:h-[450px] md:w-[350px] bg-[#ECECEC]">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
                      />
                    )}
                  </div>
                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.role}
                    </p>
                    {member.email && (
                      <p className="text-sm text-gray-500 mt-6">
                        {member.email}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xs font-medium">Arraste</span>
        </div>
      </div>

      {/* Section 3: Equipe Insper Cidades */}
      <section className="py-16 mx-auto">
        <div className="mx-auto">
          <h2 className="lg:absolute text-xl font-medium text-gray-900 px-4 2xl:px-16 pb-6 lg:pb-0">Equipe Insper Cidades</h2>
          <div
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden ml-0! pl-4! md:ml-0! lg:ml-100!"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={false}
              modules={[FreeMode]}
              className="!overflow-visible"
            >
              {equipeInsperCidades.map((member) => (
                <SwiperSlide key={member.id} className="!w-[250px] md:!w-[350px] group relative">
                  <div className="relative overflow-hidden h-[350px] w-[250px] md:h-[450px] md:w-[350px] bg-[#ECECEC]">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
                      />
                    )}
                  </div>
                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.role}
                    </p>
                    {member.email && (
                      <p className="text-sm text-gray-500 mt-6">
                        {member.email}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* Section 4: Equipe de Desenvolvimento */}
      <section className="py-16 mx-auto">
        <div className="mx-auto">
          <h2 className="lg:absolute text-xl font-medium text-gray-900 px-4 2xl:px-16 pb-6 lg:pb-0">Equipe de Desenvolvimento</h2>
          <div className="px-4 2xl:px-16 pb-4 ml-0! pl-4! md:ml-0! lg:ml-100!">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {equipeDeDesenvolvimento.map((member) => (
                <div key={member.id} className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-8 mx-auto pb-40">
        <div className="mx-auto">
          <h2 className="lg:absolute text-xl font-medium text-gray-900 px-4 2xl:px-16 pb-6 lg:pb-0">Apoiadores</h2>
          <div className="px-4 2xl:px-16 ml-0! pl-4! md:ml-0! lg:ml-100!">
            <Image
              src={centroDadosLogo}
              alt="Centro de Dados e IA"
              width={235}
              height={73}
              className="h-12 md:h-14 w-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}