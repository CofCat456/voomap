type Map = google.maps.Map | null

// Map Center
export function handleCenter(map: Map, value: google.maps.LatLngLiteral) {
  map?.setCenter(value);
}

// Map Zoom
export function handleZoom(map: Map, value: number) {
  map?.setZoom(value);
}

// Map Restriction latLngBounds
export const taiwanBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral = {
  north: 26.1423668,
  south: 21.0551639,
  east: 123.5381745,
  west: 118.9068964,
};

export const taiwanRestriction: google.maps.MapRestriction = {
  latLngBounds: taiwanBounds,
};
