import { Loader } from '@googlemaps/js-api-loader';

export function useMap(apiKey: string) {
  const loader = new Loader({
    apiKey,
    version: 'weekly',
    libraries: ['places'],
    language: 'zh-TW',
  });

  return {
    loader,
  };
}
