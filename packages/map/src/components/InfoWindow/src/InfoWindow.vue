<script setup lang="ts">
import { inject, markRaw, onBeforeMount, onMounted, ref, unref, useSlots, watch } from 'vue';
import { apiSymbol, mapSymbol, markerSymbol } from '@/inject';
import type { InfoWindow, InfoWindowOpenOptions, InfoWindowOptions } from '@/types';
import { infoWindowEvents } from '@/utlis/events';

const props = defineProps<InfoWindowOptions>();

const emit = defineEmits<{
  (e: 'closeclick'): void
  (e: 'content_changed'): void
  (e: 'domready'): void
  (e: 'position_changed'): void
  (e: 'visible'): void
  (e: 'zindex_changed'): void
}>();

const infoWindow = ref<InfoWindow | null>(null);
const infoWindowRef = ref<HTMLElement | null>(null);

const map = inject(mapSymbol, ref());
const api = inject(apiSymbol, ref());
const marker = inject(markerSymbol, ref());

const hasSlotDefault = !!useSlots().default;

function open(opts?: InfoWindowOpenOptions) {
  return infoWindow.value?.open({ map: map.value, anchor: marker.value, ...opts });
}
const close = () => infoWindow.value?.close();

onMounted(() => {
  watch(map, (_) => {
    if (map.value && api.value && marker.value) {
      infoWindow.value = markRaw(
        new api.value.InfoWindow({
          ...unref(props),
          content: hasSlotDefault ? infoWindowRef.value : props.content ? props.content : marker.value.getTitle(),
        }),
      );

      marker.value.addListener('click', open);

      infoWindowEvents.forEach((event) => {
        infoWindow.value?.addListener(event, () => emit(event as never));
      });
    }
  },
  {
    deep: true,
    immediate: true,
  });
});

onBeforeMount(() => {
  if (infoWindow.value) {
    api.value?.event.clearInstanceListeners(infoWindow.value);
    close();
  }
});
</script>

<template>
  <div v-if="hasSlotDefault" class="info-window-container">
    <div ref="infoWindowRef" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>
