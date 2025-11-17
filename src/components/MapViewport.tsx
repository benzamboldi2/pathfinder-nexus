import type { MapLayer, Viewport } from '@/types/map';

interface MapViewportProps {
  viewport: Viewport;
  activeLayer: MapLayer;
}

const MapViewport = ({ viewport, activeLayer }: MapViewportProps) => {
  const { latitude, longitude, zoom } = viewport;

  return (
    <section className="map-viewport" aria-label="Map canvas placeholder">
      <div className="map-overlay">
        <p className="map-coordinates">
          Lat {latitude.toFixed(4)} · Lng {longitude.toFixed(4)} · Zoom {zoom}
        </p>
        <span className="map-layer">Layer: {activeLayer}</span>
      </div>
      <div className="map-grid" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </section>
  );
};

export default MapViewport;
