// Map Options
export interface MapOptions {
  apiKey: string
  center?: MapCenter
  zoom?: number
}

// Map Center
export interface MapCenter {
  lat: number
  lng: number
}
