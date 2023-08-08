<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map';
import { reactive, ref } from 'vue';
import { createRandomCoordinate } from '../mock';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const zoom = ref(12);
const center = reactive<google.maps.LatLngLiteral>(createRandomCoordinate());
const singleRef = ref<InstanceType<typeof InfoWindow> | null>(null);

function handleClick(e: google.maps.MapMouseEvent) {
  // eslint-disable-next-line no-console
  console.log('click', e.latLng);
}

function handleCloseClick() {
  // eslint-disable-next-line no-console
  console.log('closeClick');
}
</script>

<template>
  <GoogleMap
    disable-default-u-i
    in-taiwan
    :clickable-icons="false"
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :zoom="zoom"
    :center="center"
  >
    <Marker
      v-for="item in 2"
      :key="item"
      :title="`I'm your ${item} marker!`"
      :position="createRandomCoordinate()"
      @dblclick="handleClick"
    >
      <InfoWindow open-event="mouseover" close-event="mouseout">
        <div style="padding: 8px;">
          {{ `I'm your ${item} infoWindow!` }}
        </div>
      </InfoWindow>
    </Marker>
    <InfoWindow
      ref="singleRef"
      content="I'm single qq"
      :position="createRandomCoordinate()"
      @closeclick="handleCloseClick"
    />
  </GoogleMap>
</template>
