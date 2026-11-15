# Transmissão ao Vivo na Home — Sexta da Mobilidade

## Como funciona (visão geral)

```
Admin acessa o Firebase Console e cadastra o link da transmissão
         ↓
Campo `url` preenchido no Firestore (coleção site-config, documento live-stream)
         ↓
Home do site busca GET /api/live-stream a cada carregamento de página
         ↓
Resposta com URL válida → exibe seção "Transmissão ao Vivo" (fundo vermelho, ponto pulsante)
Resposta sem URL       → seção não aparece
```

A seção aparece e desaparece **em tempo real**, sem necessidade de novo deploy. Basta cadastrar ou remover o link no Firebase Console.

---

## Passo a passo: ativar a transmissão

### 1. Acessar o Firestore

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Selecione o projeto **`observatorio-qualionibus`**
3. No menu lateral esquerdo, clique em **"Build" → "Firestore Database"**

---

### 2. Criar o documento (primeira vez)

Se a coleção `site-config` ainda não existir:

1. Clique em **"+ Start collection"**
2. Em **"Collection ID"**, digite: `site-config`
3. Clique em **"Next"**
4. Em **"Document ID"**, digite: `live-stream`
5. Adicione os campos abaixo e clique em **"Save"**

Se a coleção já existir, clique em `site-config` → `live-stream` → **"Edit document"** (ícone de lápis).

---

### 3. Campos do documento

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `url` | string | **Sim** | Link da transmissão (Zoom, YouTube etc.) |
| `title` | string | Não | Título exibido na seção (padrão: "Sexta da Mobilidade") |
| `description` | string | Não | Texto auxiliar exibido abaixo do título (ex: "30/11 · 12h–14h") |

**Exemplo com todos os campos preenchidos:**

```
url:         https://zoom.us/j/123456789?pwd=...
title:       Sexta da Mobilidade — Novembro 2025
description: 30/11 · 12h – 14h
```

**Exemplo mínimo (somente `url`):**

```
url:   https://zoom.us/j/123456789?pwd=...
```

Neste caso, o título exibido será "Sexta da Mobilidade" (valor padrão).

---

### 4. Verificar na home

Abra (ou recarregue) o site. A seção de transmissão ao vivo aparecerá entre o carrossel de vídeos e o GeoPortal, com:

- Ponto vermelho pulsante + texto **"Transmissão ao vivo"**
- Título do evento
- Descrição (se preenchida)
- Botão **"Assistir agora"** apontando para a URL cadastrada

---

## Passo a passo: desativar a transmissão

Após o evento, remova a seção de uma destas formas:

**Opção A — Deletar o documento (mais simples):**

1. Firestore → `site-config` → `live-stream`
2. Clique nos três pontos `⋮` → **"Delete document"**
3. Confirme

**Opção B — Apagar o campo `url` (mantém o documento para reusar depois):**

1. Firestore → `site-config` → `live-stream`
2. Passe o mouse sobre o campo `url` → clique no ícone de lixeira
3. Clique em **"Update"**

A seção desaparece no próximo carregamento de qualquer página do site.

---

## Arquitetura técnica

### Arquivos envolvidos

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/firebase-admin.ts` | Inicializa o SDK Admin do Firebase (Auth + Firestore) |
| `src/lib/live-stream.ts` | Lê o documento `site-config/live-stream` via Admin SDK |
| `src/app/api/live-stream/route.ts` | Endpoint `GET /api/live-stream` — sem cache, sempre fresco |
| `src/components/live-stream-section.tsx` | Componente React que busca a API e renderiza o banner |
| `src/components/home-content.tsx` | Layout da home — inclui `<LiveStreamSection />` após o hero |

### Fluxo de dados

```
Browser                     Servidor Next.js              Firebase Firestore
  │                               │                              │
  │  GET /api/live-stream         │                              │
  │──────────────────────────────>│                              │
  │                               │  db.collection("site-config")│
  │                               │     .doc("live-stream").get()│
  │                               │─────────────────────────────>│
  │                               │<─────────────────────────────│
  │                               │  { url, title, description } │
  │  { url, title, description }  │                              │
  │<──────────────────────────────│                              │
  │                               │                              │
  │  Renderiza <LiveStreamSection>│                              │
```

### Decisões de design

**Por que a API não usa cache?**

A home principal usa ISR (Incremental Static Regeneration) com revalidação a cada hora. Se o link fosse buscado no servidor junto com o resto da página, poderia demorar até 60 minutos para aparecer ou desaparecer após uma mudança no Firestore — inaceitável para um evento ao vivo. O endpoint `GET /api/live-stream` tem `dynamic = "force-dynamic"`, garantindo que cada requisição vai direto ao Firestore.

**Por que o componente não renderiza nada enquanto carrega?**

Para evitar *layout shift* (a página "pulando" ao revelar a seção). O componente fica invisível até a resposta da API chegar. Se o usuário recarregar a página durante a transmissão, a seção aparece em frações de segundo.

**Por que usar o Admin SDK e não o SDK client-side?**

O Firestore ainda não tem regras de segurança configuradas no projeto. Usar o Admin SDK (somente servidor) garante que as credenciais de serviço nunca chegam ao browser. A API route é pública por design — retorna apenas a URL de uma transmissão, sem dados sensíveis.

---

## Perguntas frequentes

**Quanto tempo leva para a seção aparecer depois de salvar no Firebase?**

Menos de 1 segundo. O próximo carregamento de qualquer página do site já vai buscar o valor atualizado.

**E para sumir depois que eu deletar o documento?**

Também imediato: o próximo carregamento não encontrará o documento e a seção não será renderizada.

**O que acontece se o Firebase ficar fora do ar durante a transmissão?**

A função `getLiveStream()` captura erros em silêncio e retorna `null`. A seção simplesmente não aparece — a home não quebra.

**Posso reutilizar isso para outras edições da Sexta da Mobilidade?**

Sim. O documento `site-config/live-stream` pode ser editado quantas vezes quiser. Atualize o campo `url` (e opcionalmente `title` e `description`) antes de cada edição.

**É possível agendar a ativação automática (ex: aparecer exatamente às 12h)?**

Não nesta implementação. O controle é manual: o admin cadastra o link quando quiser que a seção apareça e remove quando o evento terminar. Para automação futura, seria possível adicionar campos `startsAt` e `endsAt` no documento e filtrar no servidor.
