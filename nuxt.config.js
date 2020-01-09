
require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Quick Start',
    titleTemplate: '%s | Quick Start',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon', href: '/favicon.ico',
    }]
  },
  server: {
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    //
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/filters/common.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  axios: {
    prefix: process.env.API_URL,
  },
  /**
   * Keys are strategy name and values are configuration.
   */
  auth: {
    plugins: [ '~/plugins/auth.js' ],
    resetOnError: true,
    redirect: {
      login: '/auth/sign-in',
      logout: '/auth/sign-in',
      callback: '/auth/sign-in',
      user: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'data.token' },
          user: { url: 'users/me', method: 'get', propertyName: 'data.user' },
          logout: false,
        },
        tokenRequired: true,
        globalToken: true,
        tokenType: 'Bearer',
        tokenName: 'Authorization',
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //     options : {
      //       fix : true,
      //     },
      //   })
      // }
    }
  },
  router: {
    middleware: ['auth']
  }
}
