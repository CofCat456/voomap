import { Loader } from '@googlemaps/js-api-loader'

export function useMap(apiKey: string, language?: string) {
  const loader: Loader = new Loader({
    apiKey,
    version: 'weekly',
    libraries: ['places'],
    language,
  })

  return {
    loader,
  }
}
