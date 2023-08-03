import type { InjectionKey, Ref } from 'vue';

export const mapSymbol: InjectionKey<Ref<google.maps.Map | null>> = Symbol('map');
export const apiSymbol: InjectionKey<Ref<typeof google.maps | null>> = Symbol('api');
