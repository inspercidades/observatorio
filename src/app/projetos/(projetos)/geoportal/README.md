# Geoportal

The geoportal displays Mapbox vector layers for Brazilian metropolitan regions (RMs and RIDEs). Select a region, then optionally select a municipality. The map fits the selected area and filters the modal data to its municipalities.

The sidebar groups layers into modal shares, commute time, and local context. In the normal view, one polygon fill and up to two line or point overlays can be active. Comparison mode keeps one independently selected layer on each side.

## Data and layer configuration

- `lib/region-manifest.json` is the shared region and municipality list, including map bounds. It is derived from the ONMS Phase 3 geographic data. Grande Vitória uses mainland focused bounds because its municipality geometry includes distant Atlantic islands.
- `lib/city-layers.ts` assigns layers to RM IDs. Existing local layers remain associated with their municipalities.
- `lib/layer-texts.ts` holds every layer's text. The (i) tooltip shows what the layer maps; the legend shows how to read it and, when set, its source. Edit wording there, not in the layer list.
- `lib/modal-map.json` defines the five mapped metrics, their labels, class breaks, and colors. Each metric reads the `areas` source layer from `observatorio-nacional.onms_divisao_modal_2022`; `lib/modal-style.ts` builds its map style, legend, and formatted hover value. The share of other modes stays in the tileset but off the map.
- `lib/demographic-map.json` defines the demographic groups and the minimum sample. Cells below it appear hollow, as "Amostra insuficiente".
- `public/geoportal/region-profiles.json` feeds the "Perfil da região" dialog, which fetches it on first open. Copy it from the pipeline's `data/region-profiles.json`.

The pipeline's [methodology note](https://github.com/inspercidades/onms-divisao-modal/blob/main/METODOLOGIA.md) defines the Census universe, weights, denominators, missing areas, and SIDRA comparison. Catalogue publication still awaits IBGE confirmation.

Set `NEXT_PUBLIC_MAPBOX_TOKEN` to a token that can read the Observatório tilesets. The wider site also needs its normal environment variables. Run `npm run dev` from the repository root and open `/projetos/geoportal`.

For a focused check, run `node --test tests/geoportal.test.mjs`. The tests cover layer selection, layer texts, modal styles and formatting, and the RM manifest.

## Layer text conventions

Layer titles, tooltips, and legends follow the rules below. `tests/geoportal.test.mjs` checks the ones marked (tested).

- **Titles** (`name` in `lib/city-layers.ts`) use sentence case in Portuguese and plural nouns where the layer shows many features: "Renda domiciliar média", "Rotas de ônibus", "Ciclovias". Titles carry no year. Each title is unique within a municipality (tested).
- **Tooltip** (`summary` in `lib/layer-texts.ts`) says what the layer maps and at what geography, with the year when the data is dated. It never cites a source (tested).
- **Legend note** (`reading`) says how to read the colours and states the unit once. `source`, when set, is appended as "Fonte: …". Leave `source` out rather than writing a placeholder (tested).
- **Numeric classes** use pt-BR numbers without decimals and the same range format as the modal layers: "< 1.500", "1.500–< 6.000", "≥ 95.000" (tested). `lib/layer-styles.ts` formats them from the paint expressions.
- **Category labels** come from the tileset values. Map raw codes to readable names in `categoryLabels` in `lib/layer-styles.ts` (tested for Belo Horizonte and Salvador bike lanes).
