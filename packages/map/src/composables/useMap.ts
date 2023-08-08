import type { Ref } from 'vue';
import { inject, onBeforeUnmount, ref, unref, watch } from 'vue';
import { apiSymbol, mapSymbol } from '../utlis/symbol';
import { hasChanged } from '../utlis';
import type { Marker, MarkerOptions } from '@/types';
import type { MarkerEvent } from '@/utlis/events';

type GoogleComponentsKey = 'Marker' | 'Polyline' | 'Polygon' | 'Rectangle' | 'Circle';

type GoogleMapComponentType<T> = T extends 'Marker'
  ? Marker
  : T extends 'Polyline'
    ? google.maps.Polyline
    : T extends 'Polygon'
      ? google.maps.Polygon
      : T extends 'Rectangle'
        ? google.maps.Rectangle
        : T extends 'Circle'
          ? google.maps.Circle
          : never;

type GoogleMapComponentEvents<T> = T extends 'Marker'
  ? MarkerEvent
  : T extends 'Polyline'
    ? MarkerEvent
    : T extends 'Polygon'
      ? MarkerEvent
      : T extends 'Rectangle'
        ? MarkerEvent
        : T extends 'Circle'
          ? MarkerEvent
          : never;

type GoogleMapComponentOptions<T> = T extends 'Marker'
  ? MarkerOptions
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
  events: GoogleMapComponentEvents<T>,
  options: Ref<GoogleMapComponentOptions<T>>,
  emit: (event: any, ...args: any) => void,
): Ref<GoogleMapComponentType<T> | undefined> {
  const component = ref<GoogleMapComponentType<T>>();
  const map = inject(mapSymbol, ref());
  const api = inject(apiSymbol, ref());

  // NOTE: avoiding redundant rendering.
  watch([map, options], (_, [oldMap, oldOptions]) => {
    if (!map.value || !api.value || !(hasChanged(options.value, oldOptions) || hasChanged(map.value, oldMap)))
      return;

    const marker = new api.value.Marker({
      ...unref(options),
      map: map.value,
    });

    if (component.value) {
      component.value.setOptions(
        options as (
          MarkerOptions
          & google.maps.PolylineOptions
          & google.maps.PolygonOptions
          & google.maps.RectangleOptions
          & google.maps.CircleOptions
        ) | null);
    }
    else {
      component.value = marker as GoogleMapComponentType<typeof key>;

      events.forEach((event) => {
        component.value?.addListener(event, (e: any) => emit(event, e));
      });
    }
  },
  {
    immediate: true,
  });

  onBeforeUnmount(() => {
    if (component.value)
      api.value?.event.clearInstanceListeners(component.value);
  });

  return component;
}
