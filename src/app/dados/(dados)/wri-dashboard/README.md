# Dashboard WRI Brasil (Power BI)

Integração do dashboard QualiÔnibus (parceria ONMS & WRI Brasil) na aplicação.

## Integração atual: iframe

O relatório é exibido via **iframe** usando o componente `PowerBiEmbed` (`@/components/power-bi-embed`), que recebe a URL do relatório.

- **Onde está**: a URL do dashboard é definida em `page.tsx` na constante `POWER_BI_DASHBOARD_URL` e passada para `<PowerBiEmbed embedUrl={…} />`.
- **Link de compartilhamento**: use a URL do Power BI no formato **`https://app.powerbi.com/view?r=...`**, onde `r` é o parâmetro com o identificador do relatório (o mesmo que o Power BI gera ao compartilhar o dashboard). Pode exigir login dentro do iframe. O Power BI pode bloquear embed em outros domínios (`X-Frame-Options`); nesse caso o iframe pode ficar em branco.

### Segurança da solução com iframe

- **Origem da URL**: a URL do iframe é definida em código (não vem de input do usuário). Evite construir a URL dinamicamente a partir de parâmetros não confiáveis para reduzir risco de abuso (ex.: abrir outros domínios no iframe).
- **CSP**: o projeto já permite `https://*.powerbi.com/` e `https://*.outlook.com/` no `frame-src` (em `proxy.ts` ou headers de segurança) para o iframe carregar. Não amplie permissões sem necessidade.
- **Link Safelinks (Outlook)**: se o link vier por e-mail (Safelinks), ele redireciona para a URL do Power BI. Preferir usar no código a URL direta `https://app.powerbi.com/view?r=...` do dashboard; se usar o Safelinks, mantenha apenas de fontes confiáveis.

## Como alterar a URL do dashboard

Edite a constante `POWER_BI_DASHBOARD_URL` em `src/app/projetos/(projetos)/dashboard-wri-brasil/page.tsx`. Use a URL do Power BI no formato **`https://app.powerbi.com/view?r=...`** (a mesma que o Power BI mostra ao compartilhar o relatório).
