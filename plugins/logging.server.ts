import { serverLogging } from '~~/utils/loggingUtils';

export default defineNuxtPlugin((nuxtApp) => {
  const { provide, vueApp } = nuxtApp;

  provide('serverLogging', serverLogging);

  vueApp.config.errorHandler = (err: Error) => {
    console.log('THIS HAS BEEN HIT IN THE ERROR HANDLER');
    if (err) {
      serverLogging.error({ message: err.toString() });
    }
  };
});
