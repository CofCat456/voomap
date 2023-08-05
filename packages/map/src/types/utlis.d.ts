// Options
export interface MapOptions {
  backgroundColor?: string
  center?: google.maps.LatLng | null | google.maps.LatLngLiteral
  clickableIcons?: boolean
  controlSize?: number
  disableDefaultUI?: boolean
  disableDoubleClickZoom?: boolean
  draggable?: boolean
  draggableCursor?: string
  draggingCursor?: string
  fullscreenControl?: boolean
  fullscreenControlOptions?: google.maps.FullscreenControlOptions | null
  gestureHandling?: string
  heading?: number
  isFractionalZoomEnabled?: boolean
  keyboardShortcuts?: boolean
  mapId?: string
  mapTypeControl?: boolean
  mapTypeControlOptions?: google.maps.MapTypeControlOptions | null
  mapTypeId?: string
  maxZoom?: number
  minZoom?: number
  noClear?: boolean
  panControl?: boolean
  panControlOptions?: google.maps.PanControlOptions
  restriction?: google.maps.MapRestriction
  rotateControl?: boolean
  rotateControlOptions?: google.maps.RotateControlOptions
  scaleControl?: boolean
  scaleControlOptions?: google.maps.ScaleControlOptions
  scrollwheel?: boolean
  streetView?: google.maps.StreetViewPanorama
  streetViewControl?: boolean
  streetViewControlOptions?: google.maps.StreetViewControlOptions
  styles?: google.maps.MapTypeStyle[]
  tilt?: number
  zoom?: number
  zoomControl?: boolean
  zoomControlOptions?: google.maps.ZoomControlOptions
}

export interface MarkerOptions {
  anchorPoint?: google.maps.Point
  animation?: google.maps.Animation
  clickable?: boolean
  collisionBehavior?: string
  crossOnDrag?: boolean
  cursor?: string
  draggable?: boolean
  icon?: string | google.maps.Icon | null | google.maps.Symbol
  label?: string | google.maps.MarkerLabel
  opacity?: number
  optimized?: boolean
  position?: google.maps.LatLng | null | google.maps.LatLngLiteral
  shape?: google.maps.MarkerShape
  title?: string
  visible?: boolean
  zIndex?: number
  onDrag?: MaybeArray<(index: number) => void>
}

// Events
export type MapMouseEvent = google.maps.MapMouseEvent;
export type IconMouseEvent = google.maps.IconMouseEvent;
