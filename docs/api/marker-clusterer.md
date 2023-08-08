# MarkerClusterer

Using the `MarkerClusterer` allows you to display a large number of markers on the map.

> The `MarkerClusterer` is implemented through `@googlemaps/js-markerclusterer.` You can refer to their [documentation](https://googlemaps.github.io/js-markerclusterer/#md:description) for instructions on how to use it.

## Usage

The following code excerpt demonstrates a basic usage example:

```vue
<script setup lang="ts">
import { GoogleMap, Marker, MarkerClusterer } from '@voomap/map';
import { reactive, ref } from 'vue';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const zoom = ref(12);
const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004,
});
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  >
    <MarkerClusterer>
      <Marker
        v-for="marker in 500"
        :key="marker"
        :position="center"
      />
    </MarkerClusterer>
  </GoogleMap>
</template>
```
## Params

### MarkerClustererOptions

import options from `@googlemaps/js-markerclusterer`.

- Type `MarkerClustererOptions`

 ```ts
 import type { MarkerClustererOptions } from '@googlemaps/markerclusterer';
  ```

## Events

import events from `@googlemaps/js-markerclusterer`.

- Example

```vue
<script setup lang="ts">
import { GoogleMap, Marker, MarkerClusterer } from '@voomap/map';
import { reactive, ref } from 'vue';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const zoom = ref(12);
const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004,
});

function handleClick() {
  console.log('click');
}
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  >
    <MarkerClusterer @click="handleClick">
      <Marker
        v-for="marker in 500"
        :key="marker"
        :position="center"
      />
    </MarkerClusterer>
  </GoogleMap>
</template>
```

## Expose

If you want to further manipulate the map, you can use the public instance of the component.

### markerClusterer

- Type `MarkerClusterer`

 ```ts
import { MarkerClusterer } from '@googlemaps/markerclusterer';
  ```

## Automatic updates

When **dynamically passing parameters**, the `markerClusterer` will automatically determine whether an instance already exists to decide whether to **update** or **create** a new one.
