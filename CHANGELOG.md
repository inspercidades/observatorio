# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [1.2.0] - 2026-09-24

### Adicionado

- Relatório de Indicadores QualiÔnibus – Edição 2026 (PDF em
  `public/2026_relatorio_qualionibus.pdf`), publicado em `/publicacoes` na nova
  categoria "Relatórios", com filtro próprio e suporte a tags nas publicações.

### Alterado

- Menu "Publicações" do header e do footer passa a ser um link direto para
  `/publicacoes`, sem o submenu Livros / Policy Papers.

### Removido

- Página `/pesquisas` (eixos temáticos prioritários), seus links no header e no
  footer e a imagem `pesquisas_intro.jpg`. A rota não recebeu redirect.

## [1.1.0] - 2026-09-21

### Adicionado

- Tela administrativa de e-mails WRI em `/projetos/admin/wri-emails`, com validação
  prévia do CSV (novos / existentes / inválidos) e importação add-only, restrita à
  allowlist `ADMIN_EMAILS`.
- APIs `/api/admin/me`, `/api/admin/wri-emails/preview` e `/api/admin/wri-emails/apply`.
- Integração com Google Analytics 4 (`@next/third-parties/google`) e Microsoft Clarity.
- Firebase Admin SDK para as operações de autenticação no servidor.
- Fluxo de "Esqueci a senha" na tela de login e "Trocar senha" no menu do usuário.
- Persistência do estado da tabela na URL (filtros, ordenação e paginação).
- Manual de Acesso ao Painel QualiOnibus (PDF) e documentação de analytics e do
  fluxo admin (`docs/ANALYTICS.md`, `docs/ADMIN_WRI_EMAILS.md`).

### Alterado

- CSP liberada para os domínios de Google Analytics e Clarity em `script-src`,
  `connect-src` e `img-src`.
- `/projetos/admin` incluído nas rotas protegidas do proxy.
- Barra do usuário passa a exibir o link de administração quando o e-mail
  autenticado está na allowlist.
- `output: 'standalone'` passa a ser condicionado por `BUILD_STANDALONE`.
- Dockerfile e pipeline de build passam a receber as variáveis de analytics
  como build-args.

### Removido

- Seção de notícias: página `/noticias` (agora redirecionada), componente,
  dados e tipos associados.

## [1.0.0] - 2026-05-27

- Primeira versão publicada em produção.

[1.2.0]: https://github.com/techinsper/observatorio/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/techinsper/observatorio/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/techinsper/observatorio/releases/tag/v1.0.0
