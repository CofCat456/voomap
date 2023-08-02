<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref, watch } from 'vue';
import type { CofMap } from '@vue3-google-map/types';
import { useMap } from '@vue3-google-map/core';
import { handleCenter, handleZoom, taiwanRestriction } from './utlis';

const props = withDefaults(defineProps<{
  apiKey: string
  center?: google.maps.LatLngLiteral
  zoom?: number
  minZoom?: number
  maxZoom?: number
  gestureHandling?: 'none' | 'auto'
  disableDefaultUI?: boolean
  inTaiwan?: boolean
  restriction?: google.maps.MapRestriction | null
  zoomControl?: boolean
  mapTypeControl?: boolean
  scaleControl?: boolean
  streetViewControl?: boolean
  rotateControl?: boolean
  fullscreenControl?: boolean
}>(), {
  center: () => ({ lat: 25.0855388, lng: 121.4791004 }),
  zoom: 11,
  minZoom: 8,
  maxZoom: 15,
  gestureHandling: 'auto',
  zoomControl: true,
  scaleControl: true,
  fullscreenControl: true,
});

const mapRef = ref<HTMLElement | null>(null);
const cofMap: CofMap = reactive({
  map: null,
});

const getMapOption = computed(() => {
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

  // DEV: console
  // eslint-disable-next-line no-console
  console.log(mapOptions);

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
  handleZoom(cofMap?.map, newZoom);
});

watch(
  () => props.center,
  (newCenter) => {
    handleCenter(cofMap?.map, newCenter);
  },
  {
    deep: true,
  },
);

onMounted(() => {
  const { loader } = useMap(props.apiKey);

  loader
    .load()
    .then((_google: typeof google) => {
      if (mapRef.value)
        cofMap.map = new google.maps.Map(mapRef.value, getMapOption.value);

      // DEV: console
      // eslint-disable-next-line no-console
      console.log(cofMap.map);
    });
});
</script>

<template>
  <div id="map" ref="mapRef" />
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
