import * as maptilersdk from '@maptiler/sdk';
import type { SearchResult } from '@/types/map';

// Ensure API key is set
maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

export interface GeocodingOptions {
  limit?: number;
}

export async function geocodeLocation(
  query: string,
  options: GeocodingOptions = {}
): Promise<SearchResult[]> {
  const { limit = 5 } = options;

  if (!query.trim()) {
    return [];
  }

  try {
    const response = await maptilersdk.geocoding.forward(query, {
      limit,
    });

    if (!response.features || response.features.length === 0) {
      return [];
    }

    return response.features.map((feature, index) => ({
      id: feature.id?.toString() || `result-${index}`,
      name: feature.place_name || feature.text || 'Unknown location',
      description: feature.place_type?.join(', ') || '',
      longitude: feature.center[0],
      latitude: feature.center[1],
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
}
