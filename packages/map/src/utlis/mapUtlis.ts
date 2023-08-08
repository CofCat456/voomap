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
