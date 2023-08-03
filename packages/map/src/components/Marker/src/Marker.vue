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

const emit = defineEmits<{
  (e: 'animation_changed', id: number): void
  (e: 'click', value: string): void
  (e: 'clickable_changed', value: string): void
  (e: 'contextmenu', value: string): void
  (e: 'cursor_changed', value: string): void
  (e: 'dblclick', value: string): void
  (e: 'drag', value: string): void
  (e: 'dragend', value: string): void
  (e: 'draggable_changed', value: string): void
  (e: 'dragstart', value: string): void
  (e: 'flat_changed', value: string): void
  (e: 'icon_changed', value: string): void
  (e: 'mousedown', value: string): void
  (e: 'mouseout', value: string): void
  (e: 'mouseover', value: string): void
  (e: 'mouseup', value: string): void
  (e: 'position_changed', value: string): void
  (e: 'shape_changed', value: string): void
  (e: 'hape_changed', value: string): void
  (e: 'visible_changed', value: string): void
  (e: 'zindex_changed', value: string): void
  (e: 'rightclick', value: string): void
}>();

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
