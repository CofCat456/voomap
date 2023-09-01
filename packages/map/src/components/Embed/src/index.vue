<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  apiKey: string
}

const props = withDefaults(defineProps<Props & {
  width: string
  height: string
  style: string
}>(), {
  width: '450',
  height: '250',
  style: 'border:0',
});

const getUrl = computed(() => {
  return `https://www.google.com/maps/embed/v1/place?key=${props.apiKey}&q=Eiffel+Tower,Paris+France`;
});
</script>

<template>
  <iframe
    frameborder="0"
    referrerpolicy="no-referrer-when-downgrade"
    allowfullscreen
    :src="getUrl"
    :width="width"
    :height="height"
    :style="style"
  />
</template>
