import type { InjectionKey, Ref } from 'vue';
import type { Map, Marker } from '../types';

export const mapSymbol: InjectionKey<Ref<Map | null>> = Symbol('map');
export const apiSymbol: InjectionKey<Ref<typeof google.maps | null>> = Symbol('api');
export const markerSymbol: InjectionKey<Ref<Marker | undefined>> = Symbol('marker');
