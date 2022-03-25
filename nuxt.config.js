import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - portfolio',
    title: 'portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  pwa: {
    manifest: {
      name: 'portfolio',
      short_name: 'portfolio',
      description: 'portfolio',
      start_url: '/?standalone=true',
      display: 'standalone',
      background_color: '#ffffff'
    },
    workbox: {
      importScripts: [
        'firebase-messaging-sw.js'
      ],
      dev: process.env.NODE_ENV === 'development'
      // runtimeCaching: [
      //   {
      //     handler: 'CacheFirst',
      //     urlPattern: '/*'
      //   }
      // ]
    }
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyDSTw8xqokcFAjOUD4-aNdTmVe_ivroNiI',
      authDomain: 'portfolio-6ba9b.firebaseapp.com',
      projectId: 'portfolio-6ba9b',
      storageBucket: 'portfolio-6ba9b.appspot.com',
      messagingSenderId: '933434969739',
      appId: '1:933434969739:web:578a3dd196fab98a714e8e',
      measurementId: 'G-TG4TCZXHXQ'
    },
    services: {
      messaging: {
        createServiceWorker: true,
        fcmPublicVapidKey: 'BMP0ys3NZO2SUM2-l7d_2kpkLBHRoYYDBUqIh0sLjRodyHh2ylhf8UybFsZxzsECR27f_wWY5v9UKoRLjJ_tTP0'
      }
    }
  },

  proxy: {
    '/v1/projects': {
      target: 'https://fcm.googleapis.com',
      changeOrigin: true
    }
  }
}
