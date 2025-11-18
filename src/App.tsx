import { useState, useEffect } from 'react';
import ApplicationShell from './layout/ApplicationShell';
import SearchBar from './components/SearchBar';
import MapViewport from './components/MapViewport';
import LayerToggle from './components/LayerToggle';
import InfoPanel from './components/InfoPanel';
import { featuredDestinations } from './lib/placeholderData';
import type { MapLayer, SearchResult, Viewport } from './types/map';

type Theme = 'light' | 'dark';

const App = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('traffic');
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });
  const [results, setResults] = useState<SearchResult[]>(featuredDestinations);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
          <header className="sidebar-header">
            <div className="header-content">
              <h1>Meridian</h1>
              <p>The modern mapping app</p>
            </div>
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
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
