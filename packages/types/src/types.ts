// Map Config
export interface MapConfig extends google.maps.MapOptions {
  apiKey: string
}

// CofCat Map
// NOTE: I don't know what name to use.
export interface CofMap {
  google: typeof google | null
  map: google.maps.Map | null
}
