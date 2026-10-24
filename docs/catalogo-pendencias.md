# Catálogo de dados — o que já entrou e o que falta no JSON

Arquivo de referência: `src/lib/data/new-catalog/catalog.json` (e `categories.json` para as listas dos filtros).

O JSON atual já traz título, descrição, tema, assunto, cidades, região, período, formatos e fonte. Com isso deu para fazer a maior parte da revisão. Dois pontos não estão no arquivo, então o catálogo ainda não os exibe.

## O que já está no ar

- Título da página: **Catálogo de Dados** (`/dados/catalogo-de-dados`).
- Botão "Mais recentes" removido. Os cards entram em ordem alfabética do título.
- Busca sem acento. `transito` e `niteroi` encontram os conjuntos.
- Filtro **Tema** ganhou `Logística Urbana Sustentável` e `Mobilidade a Pé`. Nenhum conjunto do JSON usa esses temas ainda, então o filtro volta vazio até os itens serem marcados.
- Filtro **Cidade** virou **Região**, em menu (uma opção por vez). As opções são as cidades que já estão no JSON, inclusive `Recife (RM)` e `Brasil`.
- O rótulo **Assunto** virou **Categoria**. As opções continuam as de hoje (Linhas e horários, Sinistros de trânsito, etc.).
- Card mostra título, descrição (3 linhas, reticências no fim da última), tag de tema e tag de categoria. Sem tag de cidade e sem tag de formato.
- Rodapé do card em texto: `2022–2025 · Tabela, Georreferenciado`.
- Modal sem o subtítulo `Segurança Viária • São Paulo`. O campo de fonte passou a se chamar **Fonte original dos dados**.
- Links novos, com redirecionamento dos endereços antigos:
  - `/dados/catalogo-de-dados`
  - `/dados/pemob-dashboard`
  - `/dados/pemob-tabela`
  - `/dados/wri-dashboard`
  - `/dados/geoportal`

## O que precisa vir no próximo JSON

### 1. Abrangência geográfica

Não existe campo para isso. Sem ele o card não mostra Municipal, Metropolitana, Estadual ou Federal, e o filtro correspondente não foi criado.

Em cada item, um valor só, entre estes quatro:

`Municipal` · `Metropolitana` · `Estadual` · `Federal`

```json
"geographicScope": "Municipal"
```

Sugestão para conferir, não para assumir:

| Conjunto | Sugestão |
| --- | --- |
| Uma cidade (São Paulo, Niterói, …) | Municipal |
| Recife (RM) | Metropolitana |
| PEMOB (`region`: Brasil) | Federal |
| Motiva (Salvador, São Paulo e Rio de Janeiro) | a definir — não cabe numa metrópole só nem num estado só |
| Estadual | nenhum item atual parece ser estadual |

### 2. Categorias novas

A revisão pedia trocar Assunto por Categoria **com opções novas**. O JSON ainda usa a lista antiga no campo `subject`. O filtro já se chama Categoria, mas as opções são as de sempre.

Precisamos de duas coisas:

1. A lista fechada de categorias.
2. O valor de cada conjunto.

Pode continuar no campo `subject`, desde que o valor seja uma das categorias novas. Exemplo do que falta definir:

```json
"subjects": ["…lista fechada…"]
```

```json
"subject": "nome exato de uma categoria da lista"
```

### 3. Temas novos, se houver conjunto

Os filtros já existem. Para um card aparecer neles, o `theme` do item tem que ser exatamente:

- `Logística Urbana Sustentável`
- `Mobilidade a Pé`

### 4. Região, só se a lista for outra

Hoje o menu Região lista as cidades do JSON. Se Região for outra coisa (estado, macrorregião, nome diferente de `Recife (RM)`), manda a lista e o valor de cada item.
