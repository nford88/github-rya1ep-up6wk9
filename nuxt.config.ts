import { defineNuxtConfig } from '@nuxt/bridge';
import type { NuxtConfig } from '@nuxt/schema';
import { serverLogging } from './utils/loggingUtils';

/* This logger is setup for Nitro / Build Logs as JSON */
serverLogging;

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/logging.ts'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['consola'],
    extend(config: NuxtConfig, { isClient }: { isClient: boolean }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 122000;
      }
    },
  },
} as NuxtConfig);
