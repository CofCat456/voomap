import Vue from '@vitejs/plugin-vue';

/** @type {import('unplugin-vue-macros').Options} */
export default {
  betterDefine: true,
  plugins: {
    vue: Vue({
      include: [/\.vue$/, /\.setup\.[cm]?[jt]sx?$/],
      reactivityTransform: true,
    }),
  },
};
