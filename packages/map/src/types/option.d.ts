export type MapOptions = google.maps.MapOptions;

export type MarkerOptions = google.maps.MarkerOptions;

export interface InfoWindowOptions {
  ariaLabel?: string;
  content?: string | Element | Text;
  disableAutoPan?: boolean;
  maxWidth?: number;
  minWidth?: number;
  pixelOffset?: google.maps.Size;
  position?: google.maps.LatLng | google.maps.LatLngLiteral | null;
  zIndex?: number;
}

export type InfoWindowOpenOptions = google.maps.InfoWindowOpenOptions;
