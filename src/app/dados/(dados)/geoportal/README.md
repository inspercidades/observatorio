# Geoportal - Mapbox Layer Management

This geoportal application allows users to visualize different data layers on an interactive map using Mapbox GL JS.

## Features

- **City Selection**: Choose from multiple Brazilian cities (São Paulo, Rio de Janeiro, Belo Horizonte, etc.)
- **Dynamic Layer Management**: Toggle different data layers on/off for each city
- **Real-time Layer Loading**: Visual feedback showing layer loading states
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar

## São Paulo Layers

The following layers are currently available for São Paulo:

| Filter Name | Source Layer Name | Tileset ID | Type |
|-------------|-------------------|-------------|------|
| IPTU Census | sp_censo_iptu-2emtek | observatorio-nacional.cqpa7k1p | Polygon |
| General Census | sp_censo-8o4mbb | observatorio-nacional.d8lmd7ji | Polygon |
| Population Density | sp_density-d1vpm8 | observatorio-nacional.63ptdyhl | Polygon |

## How It Works

1. **Map Initialization**: The map loads with Mapbox GL JS and centers on the selected city
2. **Layer Selection**: Users can toggle layers using the sidebar switches
3. **Dynamic Loading**: When a layer is selected:
   - A Mapbox vector source is added using the tileset ID
   - A layer is added with the specified source layer name
   - Loading states are tracked and displayed
4. **City Switching**: When changing cities, all existing layers are removed and the map centers on the new city

## Technical Implementation

### Layer Management
- Uses Mapbox GL JS `addSource()` and `addLayer()` methods
- Sources are vector tilesets from Mapbox
- Layers are configured with appropriate paint properties for visualization

### State Management
- `selectedLayers`: Array of currently active layer IDs
- `layerLoadingStates`: Object tracking loading/loaded/error states for each layer
- `mapLoaded`: Boolean indicating when the map is ready for layer operations

### Error Handling
- Try-catch blocks around layer addition
- Console logging for debugging
- Visual feedback for loading states

## Adding New Cities/Layers

To add new cities or layers:

1. Update `city-layers.ts` with new city configurations
2. Add tileset ID and source layer name for Mapbox layers
3. Specify layer type (fill, line, circle, symbol)
4. The UI will automatically update to show new options

## Environment Variables

Make sure to set:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token
```

## Usage

1. Open the geoportal page
2. Select a city from the dropdown
3. Use the sidebar to toggle different data layers
4. Watch for loading indicators and status icons
5. Layers will appear on the map when loaded successfully

## Future Enhancements

- Click interactions on map features
- Popup information panels
- Layer styling customization
- Data filtering options
- Export functionality
