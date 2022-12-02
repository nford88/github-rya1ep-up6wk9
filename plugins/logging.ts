import { serverLogging } from '../utils/loggingUtils';

export default defineNuxtPlugin((nuxtApp) => {
  const { provide, vueApp } = nuxtApp;

  provide('serverLogging', serverLogging);

  vueApp.config.errorHandler = (err: Error) => {
    console.log(
      'vueApp.config - expect error to be found and Consola to format this as JSON'
    );
    if (err) {
      serverLogging.error({ message: err.toString() });
    }
  };
});
