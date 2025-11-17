export type MapLayer = 'traffic' | 'terrain' | 'transit';

export interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
