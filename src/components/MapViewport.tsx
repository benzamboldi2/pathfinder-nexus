import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapLayer, Viewport } from '@/types/map';

interface MapViewportProps {
  viewport: Viewport;
  activeLayer: MapLayer;
}

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const getMapStyle = (layer: MapLayer): string => {
  const baseUrl = 'https://api.maptiler.com/maps';

  switch (layer) {
    case 'terrain':
      return `${baseUrl}/outdoor-v2/style.json?key=${MAPTILER_API_KEY}`;
    case 'traffic':
      return `${baseUrl}/streets-v2/style.json?key=${MAPTILER_API_KEY}`;
    case 'transit':
      return `${baseUrl}/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
    default:
      return `${baseUrl}/streets-v2/style.json?key=${MAPTILER_API_KEY}`;
  }
};

const MapViewport = ({ viewport, activeLayer }: MapViewportProps) => {
  const { latitude, longitude, zoom } = viewport;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [currentCoords, setCurrentCoords] = useState({ lat: latitude, lng: longitude, zoom });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getMapStyle(activeLayer),
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('move', () => {
      if (!map.current) return;
      const center = map.current.getCenter();
      setCurrentCoords({
        lat: center.lat,
        lng: center.lng,
        zoom: map.current.getZoom(),
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map style when layer changes
  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(getMapStyle(activeLayer));
  }, [activeLayer]);

  // Update map position when viewport prop changes
  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: zoom,
    });
  }, [latitude, longitude, zoom]);

  return (
    <section className="map-viewport" aria-label="Interactive map">
      <div className="map-overlay">
        <p className="map-coordinates">
          Lat {currentCoords.lat.toFixed(4)} · Lng {currentCoords.lng.toFixed(4)} · Zoom {currentCoords.zoom.toFixed(1)}
        </p>
        <span className="map-layer">Layer: {activeLayer}</span>
      </div>
      <div ref={mapContainer} className="map-container" />
    </section>
  );
};

export default MapViewport;
