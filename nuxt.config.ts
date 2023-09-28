import gql from '@rollup/plugin-graphql';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  app: {
    head: {
      script: [
        {
          type: 'module',
          src: 'https://sandbox.web.squarecdn.com/v1/square.js',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  modules: [
    // Modules
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
    '@unocss/nuxt',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',
    '@sidebase/nuxt-pdf',
    'nuxt-lodash',
    'vue-email/nuxt',
  ],

  css: ['@unocss/reset/tailwind.css'],

  runtimeConfig: {
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      senderEmail: process.env.SENDGRID_SENDER_MAIL,
      receiverEmail: process.env.SENDGRID_RECEIVER_MAIL,
    },
    public: {
      SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
      // SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    },
  },

  vite: {
    plugins: [gql()],
  },

  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },

  router: {
    options: {
      linkActiveClass: 'text-black font-bold',
    },
  },

  routeRules: {
    '/contacto': { prerender: true },
  },

  pwa: {
    meta: {
      title: 'Coracuero',
      name: 'Coracuero Aplicación web',
      author: 'Novanet Studio <info@novanet.studio>',
      description: 'Tienda en online para vender tus productos online',
      theme_color: '#31150C',
      lang: 'es',
    },
    manifest: {
      name: 'Coracuero Aplicación web',
      short_name: 'Coracuero',
      description: 'Tienda en online para vender tus productos online',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#31150C',
    },
    icon: { source: 'static/favicon.png' },
    /*workbox: {
      enabled: true,
    },*/
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },
  devtools: {
    enabled: true,
  },

  nitro: {
    preset: 'netlify-edge',
  },
});
