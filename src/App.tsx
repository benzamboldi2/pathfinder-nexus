import { useState } from 'react';
import ApplicationShell from './layout/ApplicationShell';
import SearchBar from './components/SearchBar';
import MapViewport from './components/MapViewport';
import LayerToggle from './components/LayerToggle';
import InfoPanel from './components/InfoPanel';
import { featuredDestinations } from './lib/placeholderData';
import type { MapLayer, SearchResult, Viewport } from './types/map';

const App = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('traffic');
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });
  const [results, setResults] = useState<SearchResult[]>(featuredDestinations);

  const handleSearch = (query: string) => {
    if (!query) {
      setResults(featuredDestinations);
      return;
    }

    const lowered = query.toLowerCase();
    const filtered = featuredDestinations.filter((destination) =>
      destination.name.toLowerCase().includes(lowered)
    );

    setResults(filtered);
  };

  const handleFocus = (result: SearchResult) => {
    setViewport({
      latitude: result.latitude,
      longitude: result.longitude,
      zoom: 15,
    });
  };

  return (
    <ApplicationShell
      sidebar={
        <div className="sidebar-content">
          <header>
            <h1>Pathfinder Nexus</h1>
            <p>Prototype shell for advanced routing experiments.</p>
          </header>
          <SearchBar onSearch={handleSearch} />
          <LayerToggle activeLayer={activeLayer} onChange={setActiveLayer} />
          <section>
            <h2>Featured destinations</h2>
            <InfoPanel results={results} onFocus={handleFocus} />
          </section>
        </div>
      }
      content={<MapViewport viewport={viewport} activeLayer={activeLayer} />}
    />
  );
};

export default App;
