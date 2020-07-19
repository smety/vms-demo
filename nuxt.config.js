require('dotenv').config()

export default {
  mode: 'universal',

  head: {
    title: `${process.env.npm_package_name} VMS - Pilulka` || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#4dbd74',
    height: '5px'
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-tables.js',
    '~/plugins/vuelidate.js',
    '~/plugins/filters.js',
    '~/plugins/axios.js',
    {
      src: '~/plugins/vuex.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-click-outside.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [['@nuxtjs/dotenv', { filename: '.env' }]],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
    '@nuxtjs/sentry',
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'cs',
            file: 'cs-CZ.js'
          },
          {
            code: 'en',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'cs'
      }
    ]
  ],

  sentry: {
    dsn: 'https://b3c5f8376ce144a485b4c4cbb4ecb606@sentry.ipilulka.cz/8',

    config: {
      // release: '', // todo add released version
      environment: process.env.NODE_ENV,
      include: ['.nuxt/dist/client']
    }
  },

  toast: {
    position: 'top-center',
    theme: 'bubble',
    duration: 3500
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: __dirname + 'coreui/src/assets/scss/style.scss'
  },

  dev: process.env.NODE_ENV !== 'production',

  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
  },

  axios: {
    proxy: true,
    baseURL: process.env.API_RESOURCE,
    browserBaseURL: process.env.API_RESOURCE,
    progress: true
  },

  build: {
    extend() {}
  }
}
