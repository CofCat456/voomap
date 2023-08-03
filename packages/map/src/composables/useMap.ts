import type { Ref } from 'vue';
import { inject, ref, unref, watch } from 'vue';
import { apiSymbol, mapSymbol } from '../inject';

type GoogleComponentsKey = 'Marker' | 'Polyline' | 'Polygon' | 'Rectangle' | 'Circle';

type GoogleMapComponentType<T> = T extends 'Marker'
  ? google.maps.Marker
  : T extends 'Polyline'
    ? google.maps.Polyline
    : T extends 'Polygon'
      ? google.maps.Polygon
      : T extends 'Rectangle'
        ? google.maps.Rectangle
        : T extends 'Circle'
          ? google.maps.Circle
          : never;

type GoogleMapComponentOptions<T> = T extends 'Marker'
  ? google.maps.MarkerOptions
  : T extends 'Polyline'
    ? google.maps.PolylineOptions
    : T extends 'Polygon'
      ? google.maps.PolygonOptions
      : T extends 'Rectangle'
        ? google.maps.RectangleOptions
        : T extends 'Circle'
          ? google.maps.CircleOptions
          : never;

export function useMap<T extends GoogleComponentsKey>(
  key: T,
  events: string[],
  options: Ref<GoogleMapComponentOptions<T>>,
  emit: (event: string, ...args: unknown[]) => void,
): Ref<GoogleMapComponentType<T> | undefined> {
  const component = ref<GoogleMapComponentType<T>>();
  const map = inject(mapSymbol, ref());
  const api = inject(apiSymbol, ref());

  watch([map, options], ([newMap, newOptions]) => {
    if (!map.value || !api.value)
      return;

    // DEV: Watch CofMap
    if (__DEV__) {
      console.log('map:', newMap);
      console.log('api:', api?.value);
    }

    const marker = new api.value.Marker({
      ...unref(newOptions),
      map: newMap,
    });

    // DEV: Watch marker
    if (__DEV__)
      console.log(marker);

    if (component.value) {
    // FIXME: setOptions type error
      component.value.setOptions(
        newOptions as (
          google.maps.MarkerOptions
          & google.maps.PolylineOptions
          & google.maps.PolygonOptions
          & google.maps.RectangleOptions
          & google.maps.CircleOptions
        ) | null);
    }
    else {
      component.value = marker as GoogleMapComponentType<typeof key>;

      events.forEach((event) => {
        component.value?.addListener(event, (e: unknown) => emit(event, e));
      });
    }
  },
  {
    deep: true,
  });

  return component;
}
