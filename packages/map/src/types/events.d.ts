export type MapMouseEvent = google.maps.MapMouseEvent

export type MaybeArray<T> = T | T[]

export interface MapEvents {
  dbclick: (e: MapMouseEvent) => string;
}
