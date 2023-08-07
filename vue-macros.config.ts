import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';

/** @type {import('unplugin-vue-macros').Options} */
export default {
  betterDefine: true,
  plugins: {
    vue: Vue({
      include: [/\.vue$/, /\.setup\.[cm]?[jt]sx?$/],
      reactivityTransform: true,
    }),
    vueJsx: VueJsx(),
  },
};
