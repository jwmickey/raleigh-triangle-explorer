const SOURCE_ID = 'triangle-zipcodes';
const FILL_LAYER_ID = 'population-fill';
const OUTLINE_LAYER_ID = 'population-outline';

let popup;

function buildLegend(container) {
  const legend = document.createElement('div');
  legend.className = 'legend';
  legend.innerHTML = `
    <div class="legend-title">Population density (people / sq mi)</div>
    <div class="legend-scale" aria-hidden="true"></div>
    <div class="legend-labels">
      <span>Low</span>
      <span>Medium</span>
      <span>High</span>
    </div>
  `;
  container.appendChild(legend);
}

export async function addPopulationLayer(map, controlsContainer) {
  const [zipGeoJson, populationByZip] = await Promise.all([
    fetch('./data/triangle_zipcodes.geojson').then((res) => res.json()),
    fetch('./data/population_by_zip.json').then((res) => res.json()),
  ]);

  for (const feature of zipGeoJson.features) {
    const zip = feature.properties.ZIP;
    const populationRecord = populationByZip[zip];
    feature.properties.population = populationRecord?.population ?? 0;
    feature.properties.density = populationRecord?.density ?? 0;
    feature.properties.city = populationRecord?.city ?? 'Unknown';
  }

  map.addSource(SOURCE_ID, {
    type: 'geojson',
    data: zipGeoJson,
  });

  map.addLayer({
    id: FILL_LAYER_ID,
    type: 'fill',
    source: SOURCE_ID,
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'density'],
        1500,
        '#fff7bc',
        3500,
        '#fe9929',
        6500,
        '#cc4c02',
      ],
      'fill-opacity': 0.62,
    },
  });

  map.addLayer({
    id: OUTLINE_LAYER_ID,
    type: 'line',
    source: SOURCE_ID,
    paint: {
      'line-color': '#4b5563',
      'line-width': 1,
    },
  });

  popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on('mousemove', FILL_LAYER_ID, (event) => {
    const feature = event.features?.[0];
    if (!feature) return;
    const { ZIP, city, population, density } = feature.properties;

    popup
      .setLngLat(event.lngLat)
      .setHTML(
        `<strong>ZIP ${ZIP}</strong><br/>${city}<br/>Population: ${Number(population).toLocaleString()}<br/>Density: ${Number(density).toLocaleString()} / sq mi`
      )
      .addTo(map);

    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', FILL_LAYER_ID, () => {
    popup.remove();
    map.getCanvas().style.cursor = '';
  });

  if (controlsContainer) {
    buildLegend(controlsContainer);
  }
}

export function setPopulationVisibility(map, visible) {
  const visibility = visible ? 'visible' : 'none';
  if (map.getLayer(FILL_LAYER_ID)) {
    map.setLayoutProperty(FILL_LAYER_ID, 'visibility', visibility);
  }
  if (map.getLayer(OUTLINE_LAYER_ID)) {
    map.setLayoutProperty(OUTLINE_LAYER_ID, 'visibility', visibility);
  }
  if (!visible && popup) {
    popup.remove();
  }
}
