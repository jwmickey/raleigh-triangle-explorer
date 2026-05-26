const OSM_SOURCE_ID = 'osm-raster-source';
const OSM_LAYER_ID = 'osm-raster-layer';

export function addRoadLayer(map) {
  if (!map.getSource(OSM_SOURCE_ID)) {
    map.addSource(OSM_SOURCE_ID, {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
  }

  if (!map.getLayer(OSM_LAYER_ID)) {
    map.addLayer({
      id: OSM_LAYER_ID,
      type: 'raster',
      source: OSM_SOURCE_ID,
      minzoom: 0,
      maxzoom: 19,
    });
  }
}
