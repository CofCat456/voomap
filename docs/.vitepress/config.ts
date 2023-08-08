import { defineConfig } from 'vitepress';

const guide = [
  {
    text: 'Get Started',
    link: '/guide/',
  },
];

const api = [
  {
    text: 'Map',
    link: '/api/map',
  },
  {
    text: 'Marker',
    link: '/api/marker',
  },
  {
    text: 'InfoWindow',
    link: '/api/info-window',
  },
  {
    text: 'MarkerClusterer',
    link: '/api/marker-clusterer',
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Voomap',
  titleTemplate: 'Easy use of Google Maps with Composition API',
  description: 'Easy use of Google Maps with Composition API',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'CofCat' }],
    ['meta', { property: 'og:title', content: 'Voomap' }],
    ['meta', { property: 'og:description', content: 'Easy use of Google Maps with Composition API' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API', link: '/api/map', activeMatch: '/api/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: guide,
      },
      {
        text: 'Google Maps',
        items: api,
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 CofCat',
    },
  },
});
