<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  mapMode: 'place' | 'view' | 'directions' | 'streetview' | 'search'
  apiKey: string
  width?: string
  height?: string
  style?: string
  allowfullscreen?: boolean
  address?: string
  center?: string
  zoom?: number
  mapType?: 'roadmap' | 'satellite'
}

const props = withDefaults(defineProps<Props>(), {
  mapMode: 'place',
  width: '450',
  height: '250',
  style: 'border:0',
  allowfullscreen: true,
  address: 'Eiffel+Tower,Paris+France',
});

const baseUrl = ref('https://www.google.com/maps/embed/v1');

const getUrl = computed(() => {
  let url = `${baseUrl.value}/${props.mapMode}?key=${props.apiKey}`;

  if (props.address)
    url += `&q=${props.address}`;

  if (props.center)
    url += `&center=${props.center}`;

  if (props.zoom)
    url += `&zoom=${props.zoom}`;

  if (props.mapType)
    url += `&mapType=${props.mapType}`;

  return url;
});
</script>

<template>
  <iframe
    frameborder="0"
    referrerpolicy="no-referrer-when-downgrade"
    :allowfullscreen="allowfullscreen"
    :src="getUrl"
    :width="width"
    :height="height"
    :style="style"
  />
</template>
