import { defineNuxtConfig } from '@nuxt/bridge';
import type { NuxtConfig } from '@nuxt/schema';


// import { serverLogging } from './utils/loggingUtils'
// serverLogging() # will not work for some reason ?


/* This logger is setup for Nitro / Build Logs as JSON */

import consola from 'consola';

  consola.setReporters([
    {
      log: (e) => {
        process.stdout.write(JSON.stringify(e) + '\n');
      },
    },
  ]);
}


export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/newrelic.server.js',
    '~/plugins/logging.server.ts',
  ],
  router: {},

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxtjs/router',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@drunomics/nuxtjs-newrelic',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: process.env.CDN_URL || '/',
    analyze: process.env.ENVIRONMENT == 'devint' ? true : false,
    optimization: {
      runtimeChunk: 'single',
      minimize: true,
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    transpile: ['consola'],
    extend(config: NuxtConfig, { isClient }: { isClient: boolean }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 122000;
      }
    },
  },
} as NuxtConfig);
