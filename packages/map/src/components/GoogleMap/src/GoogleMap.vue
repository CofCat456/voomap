<script setup lang="ts">
import { computed, markRaw, onMounted, provide, reactive, ref, toRef, unref, watch } from 'vue';
import { useMap } from '@vue3-google-map/core';
import { apiSymbol, mapSymbol } from '../../../inject';
import { handleCenter, handleZoom, taiwanRestriction } from '../../../utlis/mapUtlis';

interface CofMap {
  cGoogle: typeof google | null
  cApi: typeof google.maps | null
  cMap: google.maps.Map | null
}

// google.maps.MapOptions
export interface MapProps {
  backgroundColor?: string
  center?: google.maps.LatLng | null | google.maps.LatLngLiteral
  clickableIcons?: boolean
  controlSize?: number
  disableDefaultUI?: boolean
  disableDoubleClickZoom?: boolean
  draggable?: boolean
  draggableCursor?: string
  draggingCursor?: string
  fullscreenControl?: boolean
  fullscreenControlOptions?: google.maps.FullscreenControlOptions | null
  gestureHandling?: string
  heading?: number
  isFractionalZoomEnabled?: boolean
  keyboardShortcuts?: boolean
  mapId?: string
  mapTypeControl?: boolean
  mapTypeControlOptions?: google.maps.MapTypeControlOptions | null
  mapTypeId?: string
  maxZoom?: number
  minZoom?: number
  noClear?: boolean
  panControl?: boolean
  panControlOptions?: google.maps.PanControlOptions
  restriction?: google.maps.MapRestriction
  rotateControl?: boolean
  rotateControlOptions?: google.maps.RotateControlOptions
  scaleControl?: boolean
  scaleControlOptions?: google.maps.ScaleControlOptions
  scrollwheel?: boolean
  streetView?: google.maps.StreetViewPanorama
  streetViewControl?: boolean
  streetViewControlOptions?: google.maps.StreetViewControlOptions
  styles?: google.maps.MapTypeStyle[]
  tilt?: number
  zoom?: number
  zoomControl?: boolean
  zoomControlOptions?: google.maps.ZoomControlOptions
}

const props = withDefaults(defineProps<{
  // custom props
  apiKey: string
  inTaiwan?: boolean
} & MapProps>(), {
  center: () => ({ lat: 25.0855388, lng: 121.4791004 }),
  clickableIcons: true,
  draggable: true,
  fullscreenControl: true,
  gestureHandling: 'auto',
  isFractionalZoomEnabled: true,
  maxZoom: 15,
  minZoom: 8,
  scaleControl: true,
  scrollwheel: true,
  zoom: 11,
  zoomControl: true,
});

const mapRef = ref<HTMLElement | null>(null);
const cofMap: CofMap = reactive({
  cGoogle: null,
  cApi: null,
  cMap: null,
});

provide(apiSymbol, toRef(() => cofMap.cApi));
provide(mapSymbol, toRef(() => cofMap.cMap));

const getMapOption = computed<google.maps.MapOptions>(() => {
  const {
    // eslint-disable-next-line unused-imports/no-unused-vars
    apiKey,
    inTaiwan,
    restriction,
    disableDefaultUI,
    zoomControl,
    mapTypeControl,
    scaleControl,
    streetViewControl,
    rotateControl,
    fullscreenControl,
    ...mapOptions
  } = unref(props);

  const mapRestriction = inTaiwan
    ? taiwanRestriction
    : restriction;

  return {
    ...unref(mapOptions),
    restriction: mapRestriction,
    disableDefaultUI,
    zoomControl: disableDefaultUI ? false : zoomControl,
    mapTypeControl: disableDefaultUI ? false : mapTypeControl,
    scaleControl: disableDefaultUI ? false : scaleControl,
    streetViewControl: disableDefaultUI ? false : streetViewControl,
    rotateControl: disableDefaultUI ? false : rotateControl,
    fullscreenControl: disableDefaultUI ? false : fullscreenControl,
  };
});

watch(() => props.zoom, (newZoom) => {
  if (newZoom)
    handleZoom(cofMap.cMap, newZoom);
});

watch(
  () => props.center,
  (newCenter) => {
    if (newCenter)
      handleCenter(cofMap.cMap, newCenter);
  },
  {
    deep: true,
  },
);

onMounted(async () => {
  const { loader } = useMap(props.apiKey);
  cofMap.cGoogle = markRaw(await loader.load());
  cofMap.cApi = markRaw(cofMap.cGoogle.maps);

  if (mapRef.value)
    cofMap.cMap = markRaw(new cofMap.cApi.Map(mapRef.value, getMapOption.value));

  // DEV: Map config
  if (__DEV__) {
    console.log('init: ', cofMap);
    console.log('map options:', getMapOption.value);
  }
});
</script>

<template>
  <div id="map" ref="mapRef" />
  <slot />
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
