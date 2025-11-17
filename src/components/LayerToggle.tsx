import type { MapLayer } from '@/types/map';

interface LayerToggleProps {
  activeLayer: MapLayer;
  onChange: (layer: MapLayer) => void;
}

const layers: MapLayer[] = ['traffic', 'terrain', 'transit'];

const LayerToggle = ({ activeLayer, onChange }: LayerToggleProps) => {
  return (
    <div className="layer-toggle" role="group" aria-label="Layer selection">
      {layers.map((layer) => (
        <button
          key={layer}
          type="button"
          className={layer === activeLayer ? 'active' : ''}
          onClick={() => onChange(layer)}
        >
          {layer.charAt(0).toUpperCase() + layer.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default LayerToggle;
