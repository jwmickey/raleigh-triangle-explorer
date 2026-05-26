import { createControls } from './controls.js';
import { addPopulationLayer, setPopulationVisibility } from './layers/population.js';
import { addRoadLayer } from './layers/roads.js';

const map = new maplibregl.Map({
  container: 'map',
  center: [-78.64, 35.78],
  zoom: 10,
  maxBounds: [
    [-79.3, 35.45],
    [-78.1, 36.15],
  ],
  style: {
    version: 8,
    sources: {},
    layers: [],
  },
});

map.addControl(new maplibregl.NavigationControl(), 'top-left');

map.on('load', async () => {
  addRoadLayer(map);

  const controls = createControls({
    populationVisible: true,
    onPopulationToggle: (visible) => setPopulationVisibility(map, visible),
  });

  await addPopulationLayer(map, controls);
});
