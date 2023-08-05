import { DefineComponent } from "vue";

declare const GoogleMap: DefineComponent<
  {
    title: {
      type: string;
      default: string;
    };
  }
>;

export { GoogleMap };
