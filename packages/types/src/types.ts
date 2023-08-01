// Map Config
export interface MapConfig extends MapOptions {
  apiKey: string
}

// Map Options
export interface MapOptions {
  center?: MapCenter
  zoom?: number
}

// Map Center
export interface MapCenter {
  lat: number
  lng: number
}
