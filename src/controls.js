export function createControls({
  onPopulationToggle,
  populationVisible = true,
}) {
  const panel = document.createElement('aside');
  panel.className = 'map-controls';

  panel.innerHTML = `
    <h2>Layers</h2>
    <label class="control-row">
      <input id="population-toggle" type="checkbox" ${
        populationVisible ? 'checked' : ''
      } />
      <span>Population heatmap</span>
    </label>
    <label class="control-row">
      <input type="checkbox" disabled />
      <span>Transit routes (future)</span>
    </label>
  `;

  panel
    .querySelector('#population-toggle')
    .addEventListener('change', (event) => {
      onPopulationToggle(event.target.checked);
    });

  document.body.appendChild(panel);
  return panel;
}
