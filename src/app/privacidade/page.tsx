import { Header } from "@/components/header"
import { CookiePreferencesLink } from "@/components/cookie-consent"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacidade | Observatório",
  description:
    "Como o Observatório Nacional de Mobilidade Sustentável usa cookies e ferramentas de audiência.",
}

export default function PrivacidadePage() {
  return (
    <div className="bg-[#f9f9f6] min-h-screen">
      <Header className="bg-[#f9f9f6]" />

      <article className="px-4 2xl:px-16 py-16 pb-28 max-w-3xl">
        <h1 className="text-4xl font-medium text-gray-900">Privacidade e cookies</h1>
        <p className="mt-4 text-sm text-gray-500">Atualizado em 26 de setembro de 2026.</p>

        <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-medium text-gray-900">Quem é responsável</h2>
            <p>
              Este site é do Observatório Nacional de Mobilidade Sustentável, iniciativa do Centro de Estudos das Cidades — Laboratório Arq.Futuro do Insper. O Insper é o controlador dos dados pessoais tratados aqui.
            </p>
            <p>
              Dúvidas sobre este aviso ou pedidos relacionados a dados pessoais podem ser encaminhados pelos canais institucionais indicados na página{" "}
              <Link href="/sobre" className="underline underline-offset-2 hover:text-gray-900">
                Sobre
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-medium text-gray-900">O que são cookies</h2>
            <p>
              Cookies são pequenos arquivos gravados no navegador. Este site também usa identificadores semelhantes, definidos pelas ferramentas de audiência descritas abaixo. Há cookies indispensáveis para o funcionamento e cookies opcionais, usados só se você autorizar.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium text-gray-900">Cookies que usamos</h2>
            <div className="overflow-x-auto border border-gray-200 bg-white">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-medium">Cookie</th>
                    <th className="px-4 py-3 font-medium">Categoria</th>
                    <th className="px-4 py-3 font-medium">Finalidade</th>
                    <th className="px-4 py-3 font-medium">Duração</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 align-top">AuthToken</td>
                    <td className="px-4 py-3 align-top">Necessário</td>
                    <td className="px-4 py-3 align-top">
                      Mantém a sessão depois do login nas áreas restritas. É httpOnly e não é lido por scripts do site.
                    </td>
                    <td className="px-4 py-3 align-top">14 dias</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">cookie-consent</td>
                    <td className="px-4 py-3 align-top">Necessário</td>
                    <td className="px-4 py-3 align-top">
                      Guarda a sua escolha de aceitar ou recusar os cookies de audiência.
                    </td>
                    <td className="px-4 py-3 align-top">12 meses</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">_ga, _ga_*</td>
                    <td className="px-4 py-3 align-top">Analítico</td>
                    <td className="px-4 py-3 align-top">
                      Google Analytics 4. Mede visitas, páginas e eventos de uso. Os dados são enviados ao Google.
                    </td>
                    <td className="px-4 py-3 align-top">Até 2 anos</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">_clck, _clsk e identificadores do Clarity</td>
                    <td className="px-4 py-3 align-top">Analítico</td>
                    <td className="px-4 py-3 align-top">
                      Microsoft Clarity. Gera mapas de calor e gravações de sessão (cliques, movimento e rolagem). Os dados são enviados à Microsoft.
                    </td>
                    <td className="px-4 py-3 align-top">Até 12 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Os cookies necessários funcionam sem o banner. Google Analytics e Microsoft Clarity só são carregados se você clicar em Aceitar. Não usamos cookies de publicidade.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-medium text-gray-900">Base legal</h2>
            <p>
              Os cookies necessários existem para autenticar o acesso restrito, proteger a sessão e lembrar a preferência de cookies. Os cookies analíticos e a gravação de sessão dependem do seu consentimento, que pode ser recusado ou retirado a qualquer momento.
            </p>
            <p>
              Google e Microsoft podem tratar esses dados fora do Brasil, conforme as políticas de cada serviço. O endereço IP e identificadores do navegador podem ser dados pessoais.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-medium text-gray-900">Como alterar ou revogar</h2>
            <p>
              Você pode mudar a escolha quando quiser. Recusar ou retirar o consentimento não impede o uso do conteúdo público do site. A sessão de login, quando houver, continua necessária para as áreas restritas.
            </p>
            <CookiePreferencesLink className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90" />
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-medium text-gray-900">Seus direitos</h2>
            <p>
              Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir confirmação do tratamento, acesso, correção, anonimização, eliminação ou informação sobre o compartilhamento dos seus dados, além de revogar o consentimento. Use os canais institucionais do Insper para esses pedidos.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
