<script setup lang="ts">
import { ref } from 'vue';
import { useMap } from '../../../composables/index';
import { markerEvents } from '../../../utlis/events';

// google.maps.MarkerOptions
interface MarkerProps {
  anchorPoint?: google.maps.Point
  animation?: google.maps.Animation
  clickable?: boolean
  collisionBehavior?: string
  crossOnDrag?: boolean
  cursor?: string
  draggable?: boolean
  icon?: string | google.maps.Icon | null | google.maps.Symbol
  label?: string | google.maps.MarkerLabel
  opacity?: number
  optimized?: boolean
  position?: google.maps.LatLng | null | google.maps.LatLngLiteral
  shape?: google.maps.MarkerShape
  title?: string
  visible?: boolean
  zIndex?: number
}

const props = withDefaults(defineProps<MarkerProps>(), {
  clickable: true,
  crossOnDrag: true,
  cousor: 'pointer',
  draggable: false,
  visible: true,
});

const emit = defineEmits(markerEvents);

const marker = useMap('Marker', markerEvents, ref(props), emit);

// DEV: Marker config
if (__DEV__) {
  /* eslint-disable no-console */
  console.log('marker components', marker);
  console.log('marker options:', props);
  console.log('marker events:', markerEvents);
  /* eslint-enable */
}
</script>

<template>
  <slot />
</template>
