<script setup lang="ts">
import { computed, markRaw, onMounted, provide, reactive, ref, toRef, unref, watch } from 'vue';
import { useMap } from '@voomap/core';
import { apiSymbol, mapSymbol } from '@/inject';
import { handleCenter, handleZoom, taiwanRestriction } from '@/utlis/mapUtlis';
import type { IconMouseEvent, Map, MapMouseEvent } from '@/types';

interface CofMap {
  cGoogle: typeof google | null
  cApi: typeof google.maps | null
  cMap: Map | null
}

// FIXME: Cannot use betterDefine, need detailed testing.
interface MapOptions {
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

interface Props extends MapOptions {
  apiKey: string
  inTaiwan?: boolean
}

const props = withDefaults(defineProps<Props>(), {
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

defineEmits<{
  (e: 'bounds_changed'): void
  (e: 'center_changed'): void
  (e: 'click', event: MapMouseEvent | IconMouseEvent): void
  (e: 'contextmenu', event: MapMouseEvent): void
  (e: 'dblclick', event: MapMouseEvent): void
  (e: 'drag'): void
  (e: 'dragend'): void
  (e: 'dragstart'): void
  (e: 'heading_changed'): void
  (e: 'idle'): void
  (e: 'isfractionalzoomenabled_changed'): void
  (e: 'mapcapabilities_changed'): void
  (e: 'maptypeid_changed'): void
  (e: 'mousemove', event: MapMouseEvent): void
  (e: 'mouseout', event: MapMouseEvent): void
  (e: 'mouseover', event: MapMouseEvent): void
  (e: 'projection_changed'): void
  (e: 'renderingtype_changed'): void
  (e: 'tilesloaded'): void
  (e: 'tilt_changed'): void
  (e: 'zoom_changed'): void
  (e: 'rightclick'): void
}>();

const mapRef = ref<HTMLElement | null>(null);
const cofMap: CofMap = reactive({
  cGoogle: null,
  cApi: null,
  cMap: null,
});

provide(apiSymbol, toRef(() => cofMap.cApi));
provide(mapSymbol, toRef(() => cofMap.cMap));

const getMapOption = computed<MapOptions>(() => {
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

async function initMap() {
  const { loader } = useMap(props.apiKey);
  cofMap.cGoogle = markRaw(await loader.load());
  cofMap.cApi = markRaw(cofMap.cGoogle.maps);

  if (mapRef.value)
    cofMap.cMap = markRaw(new cofMap.cApi.Map(mapRef.value, getMapOption.value));

  // FIXME: zoom center change
  watch(
    getMapOption,
    (options) => {
      // FIXME: google map catn render
      // eslint-disable-next-line no-console
      console.log('watch option: ', options);

      cofMap.cMap?.setOptions(options);
    },
  );
}

onMounted(() => {
  initMap();
});
</script>

<template>
  <div class="map-container">
    <div id="map" ref="mapRef" />
    <slot :map="cofMap.cMap" :api="cofMap.cApi" />
  </div>
</template>

<style scoped>
.map-container,
#map {
  width: 100%;
  height: 100%;
  color: rgb(82, 82, 91);
}
</style>
