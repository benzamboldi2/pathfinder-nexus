import { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import type { MapLayer, Viewport } from '@/types/map';

interface MapViewportProps {
  viewport: Viewport;
  activeLayer: MapLayer;
}

// Set the API key globally for Maptiler SDK
maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

const getMapStyle = (layer: MapLayer): maptilersdk.ReferenceMapStyle | maptilersdk.MapStyleVariant => {
  switch (layer) {
    case 'terrain':
      return maptilersdk.MapStyle.OUTDOOR;
    case 'traffic':
      return maptilersdk.MapStyle.STREETS;
    case 'transit':
      return maptilersdk.MapStyle.BASIC;
    default:
      return maptilersdk.MapStyle.STREETS;
  }
};

const MapViewport = ({ viewport, activeLayer }: MapViewportProps) => {
  const { latitude, longitude, zoom } = viewport;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const [currentCoords, setCurrentCoords] = useState({ lat: latitude, lng: longitude, zoom });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: getMapStyle(activeLayer) as any,
      center: [longitude, latitude],
      zoom,
      navigationControl: false,
    });

    map.current.addControl(new maptilersdk.NavigationControl(), 'top-right');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map style when layer changes
  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(getMapStyle(activeLayer) as any);
  }, [activeLayer]);

  // Update map position when viewport prop changes
  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [longitude, latitude],
      zoom,
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
