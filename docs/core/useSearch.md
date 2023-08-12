# useSearch

By inputting a location, you will obtain the coordinates of that address.

## Usage

```vue
<script setup lang="ts">
import { useSearch } from "@voomap/core";

const { isLoading, coordinates, getCoordinates } = useSearch(YOUR_GOOGLE_MAPS_API_KEY);
</script>

<template>
  <input
    type="text"
    @blur="(value) => getCoordinates"
  />
  You will get Coordinates : {{ coordinates }}
</template>
```
