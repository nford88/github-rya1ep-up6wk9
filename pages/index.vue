<template>
  <div class="main">
    <h1>Debug NuxtBridge Logger SSR</h1>
    <ul>
      Setup consola from serverLogging in utils/loggingUtils'
    </ul>
    <ul>
      Imported this into nuxt.config.ts where it transforms all the nitro logs
      (see terminal on startup)
    </ul>
    <ul>
      Created plugins/logging.ts where the injected function to context
      $serverLogging and also set the vue errorHandler as per description
    </ul>
    <ul>
      index.vue contains an asyncData which throws 2 errors, one which reutrns a
      standard console.log, the other which injects a message using
      $serverLogging
    </ul>
    <ul>
      Call 1 is just printing console.log message and bypassing consola handler
      set in nuxt.config.ts
    </ul>
    <ul>
      Call 2 is getting formatted as JSON as we directly call consola
    </ul>
    <ul>
      Lets try force an internal error and check the Vue errorHandler -
      uncomment lines 48 and 49 of index.vue
    </ul>
    <ul>
      Check terminal, vue error handler is not catching any errors and the
      messages are being printed as verbose when they should be formatted
    </ul>
    <ul></ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  async asyncData(context) {
    // this is undefined and will break the async function
    // comment the two lines below to see the function fail
    // const test = null;
    // return test.dummy;

    const { $serverLogging } = context;

    try {
      //mispelt API so it will error
      throw new Error();
    } catch (err) {
      console.log('Error in First Call');
    }

    try {
      throw new Error();
    } catch (err) {
      $serverLogging.error('Error in Second Call');
    }
  },
});
</script>
