# Voomap 

Easy use of Google Maps with Vue 3

> Voomap is built using Vue 3 and TypeScript.

## Installation
```bash
npm i @voomap/map
```

## Usage

Before using `voomap`, the only thing you need to do is to [apply for a Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key).

```html
<script setup lang="ts">
import { GoogleMap } from '@voomap/map';
import { reactive, ref } from 'vue';
import { createRandomCoordinate } from '../mock';

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
});
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
  />
</template>
```

### Options

You can use all the **MapOptions** provided by Google Maps to construct your map. 
<br />
[(View the complete `MapOptions`.)](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)

```html
<script setup lang="ts">
import { GoogleMap } from '@voomap/map';
import { reactive, ref } from 'vue';
import { createRandomCoordinate } from '../mock';

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
});
</script>

<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    :zoom="11"
    :max-zoom="20"
    :min-zoom="10"
  />
</template>
```

### Events

You can use `emit` to listen for [events](https://developers.google.com/maps/documentation/javascript/reference/map?hl=zh-tw#Map-Events) on the Map.

## Components

### Marker

To make it easy for you to use **Google Map**, you can simply add the components you need as child components, just as easily as with `element-ui`!

```html
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map';
import { reactive, ref } from 'vue';

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
});
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="11"
  >
    <Marker :position="center" />
  </GoogleMap>
</template>
```

#### Options

Of course, you can pass in all the [MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) to construct your `marker`.

```html
<script setup lang="ts">
import { GoogleMap, Marker } from '@voomap/map';
import { reactive, ref } from 'vue';

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
});
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="11"
  >
    <Marker 
      title="I'm your first marker!"
      :draggable: true
      :position="center"
    />
  </GoogleMap>
</template>
```

> Please note that when using `voomap`, you need to pass individual parameters instead of an options `object`. If you are using [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), you can benefit from excellent intelligent suggestions. Of course, if you want to directly pass an `object`, you can use `v-bind`.

#### Events

You can use `emit` to listen for [events](https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#Marker-Events) on the Marker.

### Info Window

Use the `InfoWindow` component to display content in a popup window on the map.

#### Options

Of course, you can pass in all the [InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference/info-window?hl=zh-cn#InfoWindowOptions) to construct your `infowindow`.

```html
<script setup lang="ts">
import { GoogleMap, InfoWindow } from '@voomap/map';
import { reactive, ref } from 'vue';

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
});
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="12"
  >
    <InfoWindow
      content="I'm single qq"
      :position="center"
    />
  </GoogleMap>
</template>
```

#### Use with Marker

Certainly, the optimal way to use `InfoWindow` is in conjunction with a `Marker`.

```html
<script setup lang="ts">
import { GoogleMap, InfoWindow, Marker } from '@voomap/map';
import { reactive, ref } from 'vue';

const center = reactive<google.maps.LatLngLiteral>({
  lat: 25.0855388,
  lng: 121.4791004
});
</script>

<template>
  <GoogleMap
    :api-key="VITE_GOOGLE_MAP_API_KEY"
    :center="center"
    :zoom="12"
  >
    <Marker
      title="I'm your first marker!"
      :position="center"
    >
      <InfoWindow>
        <div style="padding: 8px;">
          {{ `I'm your ${item} infoWindow!` }}
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```

> You can use the `:content` attribute to determine the content of the InfoWindow, or you can use a [Slot](https://vuejs.org/guide/components/slots.html) to customize the window.

#### Events

You can use `emit` to listen for [events](https://developers.google.com/maps/documentation/javascript/reference/info-window?hl=zh-cn#InfoWindow-Events) on the InfoWindow.

## Code Style
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## Future Plans

The reason I'm considering building this project is that I've noticed most other `Vue3-google-map` packages are no longer actively maintained. As a result, I'm planning to create my own solution.

I'll incorporate additional components like `Polyline`, `Polygon`, and `Rectangle` into the project to ensure it caters to all needs.

I intend to use [Vitepress](https://vitepress.dev/) for building documentation.

I'm also thinking of adding a feature for **coordinate lookup** within the project, which will be included in the core module. This way, users can choose to install different functionalities based on their requirements.

# Contributors

This project is not yet complete, and I warmly welcome feature requests and improvement suggestions. You can create an issue to initiate a discussion with me!

# License

[MIT](./LICENSE) License &copy; 2023 [CofCat](https://github.com/CofCat456)
