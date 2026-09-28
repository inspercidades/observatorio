# Geoportal

The geoportal displays Mapbox vector layers for Brazilian metropolitan regions (RMs and RIDEs). Select a region, then optionally select a municipality. The map fits the selected area and filters the modal data to its municipalities.

The sidebar groups layers into modal shares, commute time, and local context. In the normal view, one polygon fill and up to two line or point overlays can be active. Comparison mode keeps one independently selected layer on each side.

## Data and layer configuration

- `lib/region-manifest.json` is the shared region and municipality list, including map bounds. It is derived from the ONMS Phase 3 geographic data. Grande Vitória uses mainland focused bounds because its municipality geometry includes distant Atlantic islands.
- `lib/city-layers.ts` assigns layers to RM IDs and keeps the optional `demographicCut` field available for Phase 6. Existing local layers remain associated with their municipalities. The income layers are labelled as 2010 data.
- `lib/modal-map.json` defines the six modal metrics, their labels, class breaks, and colors. Each metric reads the `areas` source layer from `observatorio-nacional.onms_divisao_modal_2022`; `lib/modal-style.ts` builds its map style, legend, and formatted hover value.

The pipeline's [methodology note](https://github.com/inspercidades/onms-divisao-modal/blob/main/METODOLOGIA.md) defines the Census universe, weights, denominators, missing areas, and SIDRA comparison. Catalogue publication still awaits IBGE confirmation.

Set `NEXT_PUBLIC_MAPBOX_TOKEN` to a token that can read the Observatório tilesets. The wider site also needs its normal environment variables. Run `npm run dev` from the repository root and open `/projetos/geoportal`.

For a focused check, run `node --test tests/geoportal.test.mjs`. The tests cover layer selection, modal styles and formatting, and the RM manifest.
