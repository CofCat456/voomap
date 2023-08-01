<script setup lang="ts">
import { GoogleMap } from '@cofcat/vue3-google-map';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;
</script>

<template>
  <GoogleMap :api-key="VITE_GOOGLE_MAP_API_KEY" />
</template>
