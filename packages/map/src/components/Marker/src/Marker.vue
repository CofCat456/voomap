<script setup lang="ts">
import { ref } from 'vue';
import { useMap } from '@/composables/index';
import { markerEvents } from '@/utlis/events';
import type { MapMouseEvent, MarkerOptions } from '@/types';

// NOTE: not support import props
interface Props extends MarkerOptions {}

const props = withDefaults(defineProps<Props>(), {
  clickable: true,
  crossOnDrag: true,
  cousor: 'pointer',
  draggable: false,
  visible: true,
});

const emit = defineEmits<{
  (e: 'animation_changed'): void
  (e: 'click', event: MapMouseEvent): void
  (e: 'clickable_changed'): void
  (e: 'contextmenu', event: MapMouseEvent): void
  (e: 'cursor_changed'): void
  (e: 'dblclick', event: MapMouseEvent): void
  (e: 'drag', event: MapMouseEvent): void
  (e: 'dragend', event: MapMouseEvent): void
  (e: 'draggable_changed'): void
  (e: 'dragstart', event: MapMouseEvent): void
  (e: 'flat_changed'): void
  (e: 'icon_changed'): void
  (e: 'mousedown', event: MapMouseEvent): void
  (e: 'mouseout', event: MapMouseEvent): void
  (e: 'mouseover', event: MapMouseEvent): void
  (e: 'mouseup', event: MapMouseEvent): void
  (e: 'position_changed'): void
  (e: 'shape_changed'): void
  (e: 'hape_changed'): void
  (e: 'visible_changed'): void
  (e: 'zindex_changed'): void
  (e: 'rightclick'): void
}>();

// FIXME: emit type
const marker = useMap('Marker', markerEvents, ref(props), emit as any);

// DEV: Marker config
if (__DEV__) {
  /* eslint-disable no-console */
  console.log('marker components', marker);
  console.log('marker options:', props);
  /* eslint-enable */
}
</script>

<template>
  <slot />
</template>
