// Map Config
export interface MapConfig extends google.maps.MapOptions {
  apiKey: string
}

// CofCat Map
// NOTE: I don't know what name to use.
export interface CofMap {
  map: google.maps.Map | null
}
