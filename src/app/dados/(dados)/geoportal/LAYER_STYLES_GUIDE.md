# Layer Styles Integration Guide

This guide explains how to integrate Mapbox Studio layer styles into your geoportal application.

## Overview

The application now supports custom layer styles from Mapbox Studio. When a layer has a custom style defined, it will use that style instead of the default blue fill style.

## How to Add New Layer Styles

### 1. Export Style from Mapbox Studio

1. Go to your Mapbox Studio project
2. Select the layer you want to style
3. Copy the layer configuration from the "Data" tab or export the style
4. The layer configuration should look like this:

```json
{
  "type": "fill",
  "source": "composite",
  "id": "your-layer-id",
  "paint": {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "your-property"],
      0, "#color1",
      100, "#color2"
    ]
  },
  "source-layer": "your-source-layer"
}
```

### 2. Add Style to layer-styles.ts

Add your layer style to the `layerStyles` object in `src/app/projetos/(projetos)/geoportal/lib/layer-styles.ts`:

```typescript
export const layerStyles: Record<string, LayerStyle> = {
  // ... existing styles
  "your-source-layer": {
    "type": "fill",
    "source": "composite",
    "id": "your-layer-id",
    "paint": {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "your-property"],
        0, "#color1",
        100, "#color2"
      ]
    },
    "source-layer": "your-source-layer"
  }
}
```

### 3. Update City Layer Configuration

In `src/app/projetos/(projetos)/geoportal/lib/city-layers.ts`, add `hasCustomStyle: true` to the layer configuration:

```typescript
{
  id: "your-layer-id",
  name: "Your Layer Name",
  description: "Description of your layer",
  tilesetId: "your-tileset-id",
  sourceLayer: "your-source-layer",
  layerType: "fill",
  hasCustomStyle: true // Add this line
}
```

## How It Works

1. When a user toggles a layer on/off, the system checks if `hasCustomStyle` is true
2. If true, it looks up the custom style in `layerStyles` using the `sourceLayer` name
3. If a custom style is found, it uses that style; otherwise, it falls back to the default blue style
4. The layer is added to the map with the appropriate styling

## Example: Adding a New Styled Layer

Let's say you want to add a "Population Density" layer with a custom color scale:

1. **Add to layer-styles.ts:**
```typescript
"population-density": {
  "type": "fill",
  "source": "composite",
  "id": "population-density",
  "paint": {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "density"],
      0, "#f7f7f7",
      100, "#2166ac",
      1000, "#762a83"
    ],
    "fill-opacity": 0.8
  },
  "source-layer": "population-density"
}
```

2. **Add to city-layers.ts:**
```typescript
{
  id: "population-density",
  name: "Densidade Populacional",
  description: "Densidade populacional por região",
  tilesetId: "your-tileset-id",
  sourceLayer: "population-density",
  layerType: "fill",
  hasCustomStyle: true
}
```

## Supported Layer Types

The system currently supports these layer types:
- `fill` - For polygon data
- `line` - For line data
- `circle` - For point data
- `symbol` - For text/label data

## Troubleshooting

- **Layer not showing custom style**: Check that the `sourceLayer` name in `layerStyles` matches exactly with the `sourceLayer` in your city layer configuration
- **Style not found**: Ensure `hasCustomStyle: true` is set in the layer configuration
- **Console errors**: Check the browser console for detailed error messages about layer loading

## Best Practices

1. Always test your styles in Mapbox Studio before adding them to the code
2. Use meaningful names for your source layers
3. Keep your paint properties optimized for performance
4. Document your color scales and what they represent
