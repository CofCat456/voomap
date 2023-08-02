<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { MapCenter } from '@vue3-google-map/types';
import { useMap } from '@vue3-google-map/core';

const props = withDefaults(defineProps<{
  apiKey: string
  center?: MapCenter
  zoom?: number
}>(), {
  center: () => ({ lat: 0, lng: 0 }),
  zoom: 4,
});

const mapRef = ref<HTMLElement | null>(null);

// TEST: Data
const mapOptions = {
  center: {
    lat: 25.0855388,
    lng: 121.4791004,
  },
  zoom: 11,
};

onMounted(() => {
  const { loader } = useMap(props.apiKey);

  loader
    .load()
    .then((_google: typeof google) => {
      if (mapRef.value)
        /* eslint-disable no-new */
        new google.maps.Map(mapRef.value, mapOptions);
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
