<script setup lang="ts">
import { provide, ref } from 'vue';
import { useMap } from '@/composables/index';
import { markerEvents } from '@/utlis/events';
import type { MapMouseEvent } from '@/types';
import { markerSymbol } from '@/inject';

// FIXME: Cannot use betterDefine, need detailed testing.
interface MarkerOptions {
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

// NOTE: not support import props
const props = withDefaults(defineProps<MarkerOptions>(), {
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
  (e: 'title_changed'): void
  (e: 'visible_changed'): void
  (e: 'zindex_changed'): void
  (e: 'rightclick'): void
}>();

// FIXME: emit type
const marker = useMap('Marker', markerEvents, ref(props), emit as any);
provide(markerSymbol, marker);
</script>

<template>
  <div class="marker">
    <slot />
  </div>
</template>
