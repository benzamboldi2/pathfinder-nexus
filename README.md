# Pathfinder Nexus

A minimal-yet-extensible mapping shell built with React, TypeScript, and Vite. The starter experience mirrors a modern mapping app layout (sidebar search + map viewport) so you can focus on implementing routing logic, fetching real map tiles, or connecting to geospatial APIs.

## Features

- Responsive application shell with dedicated sidebar and map canvas regions
- Accessible search bar, map layer toggles, and featured-destination list ready for wiring into data sources
- Type-safe state management primitives for viewport, layers, and search results
- Modern tooling (Vite, React 18, TypeScript) with ESLint + path aliases configured for easy scaling

## Project structure

```
pathfinder-nexus/
├─ index.html                # SPA entry and metadata
├─ package.json              # Scripts + dependencies
├─ tsconfig*.json            # TypeScript settings w/ path aliases
├─ vite.config.ts            # Vite dev/build configuration
├─ src/
│  ├─ main.tsx               # Application bootstrap
│  ├─ App.tsx                # High-level layout & state wiring
│  ├─ components/            # Reusable UI widgets (search bar, map viewport…)
│  ├─ layout/                # ApplicationShell frame
│  ├─ lib/placeholderData.ts # Mocked destinations for the MVP
│  ├─ styles/global.css      # Global styles + layout system
│  └─ types/                 # Shared map-related TypeScript types
└─ eslint.config.js          # Flat ESLint config for the project
```

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```
   Vite will boot on `http://localhost:5173` with hot module reloading.

3. **Build for production**
   ```bash
   npm run build
   npm run preview   # Optional: serve the production build locally
   ```

## Next steps

- Replace the `MapViewport` placeholder grid with a real map provider (Mapbox GL JS, MapLibre, Google Maps JS SDK, etc.)
- Connect the search form to a live geocoding / routing API and hydrate the `InfoPanel` with real results
- Layer in state management (Zustand, Redux Toolkit, TanStack Query) as routing complexity grows
- Add integration tests (e.g., Playwright) and visual regression coverage once UI hardens

With this scaffold you can iteratively add routing algorithms, map tiles, and domain-specific features without reworking the base structure.
