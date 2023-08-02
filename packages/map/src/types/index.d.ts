import { MapConfig } from "@vue3-google-map/types";
import { DefineComponent } from "vue";

declare module "@cofcat/vue3-google-map" {
  export const GoogleMap: DefineComponent<MapConfig> ;
}
