# Raleigh Triangle Explorer

Starter web map for exploring geographic, road, and ZIP-level population data for Raleigh and the NC Triangle region.

## Project Structure

```
index.html
style.css
src/
  map.js
  controls.js
  layers/
    roads.js
    population.js
data/
  triangle_zipcodes.geojson
  population_by_zip.json
```

## Features

- MapLibre GL JS map centered on the Triangle (Raleigh, Durham, Chapel Hill)
- OpenStreetMap raster base layer (roads/highways visible in the basemap)
- ZIP-code choropleth population layer (light yellow → orange → dark red)
- Hover popups with ZIP, city, population, and density
- Layer toggles in a dark top-right control panel with room for future transit layers
- Full-viewport, mobile-friendly UI

## How to Run

No build step is required.

- Option 1: Open `/index.html` directly in your browser
- Option 2: Serve locally for best compatibility:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.


## Publish for Phone Access (GitHub Pages)

This repo includes a GitHub Actions workflow at `/tmp/workspace/jwmickey/raleigh-triangle-explorer/.github/workflows/deploy-pages.yml` that deploys the site to GitHub Pages on every push to `main`.

1. In GitHub, open **Settings → Pages** for this repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push changes to `main` (or run the workflow manually from **Actions**).
4. Open your live site at: `https://jwmickey.github.io/raleigh-triangle-explorer/`

Once deployed, open that URL from your phone to view the map.

## Data Sources

The data included here is sample/approximate starter data for prototyping.

- **ZIP boundaries (real source):** US Census TIGER/Line shapefiles
- **Population data (real source):** US Census ACS
- **Road/tiles:** OpenStreetMap
- **Transit data (future):** NC DOT

## Future Layers

- Triangle transit routes and stops
- Park-and-ride and mobility hubs
- Points of interest (schools, parks, healthcare)
- Demographic overlays and time-series change

## Notes

`data/triangle_zipcodes.geojson` and `data/population_by_zip.json` are realistic but approximate examples. Replace them with official Census boundaries and ACS values for production analysis.
