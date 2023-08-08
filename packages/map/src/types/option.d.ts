import { LatLng, LatLngLiteral, Size } from "@/types";

// Map Options
export type MapOptions = google.maps.MapOptions;
export type FullscreenControlOptions = google.maps.FullscreenControlOptions;
export type MapTypeControlOptions = google.maps.MapTypeControlOptions;
export type PanControlOptions = google.maps.PanControlOptions;
export type RotateControlOptions = google.maps.RotateControlOptions;
export type ScaleControlOptions = google.maps.ScaleControlOptions;
export type StreetViewControlOptions = google.maps.StreetViewControlOptions;
export type ZoomControlOptions = google.maps.ZoomControlOptions;

export type MarkerOptions = google.maps.MarkerOptions;

export interface InfoWindowOptions {
  ariaLabel?: string;
  content?: string | Element | Text;
  disableAutoPan?: boolean;
  maxWidth?: number;
  minWidth?: number;
  pixelOffset?: Size;
  position?: LatLng | LatLngLiteral | null;
  zIndex?: number;
}

export type InfoWindowOpenOptions = google.maps.InfoWindowOpenOptions;

