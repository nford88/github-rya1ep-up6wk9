<template>
  <div class="main">
    <h1>Debug Nuxt Logger</h1>
    <p>
      We have setup consola in nuxt.config.ts according to this guide AsyncData
      f
    </p>
    <p>
      Press the button below to force the error undefined error in the page and
      examine the terminal
    </p>
    <button @click="forceFail()">Force Error</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  methods: {
    forceFail() {
      const test = null;
      return test.dummy; // this is undefined and will break the async function
    },
  },
  mounted() {
    this.forceFail();
  },
  async asyncData(context) {
    // this is undefined and will break the async function
    // comment the two lines below to see the api fail and formatted correctly manually
    const test = null;
    return test.dummy;

    const { app, $serverLogging } = context;

    // failed api error with console
    try {
      app.$axios.create({
        httpsAgent: new https.Agent({ keepAlive: true }),
      });
      //mispelt API so it will error
      const response1 = app.$axios.get(
        'https://poetrydb.org/title/Shakespeare/lines2.json'
      );
      return { response1 };
    } catch (err) {
      console.log(err.message);
    }

    // failed api error with console
    try {
      app.$axios.create({
        httpsAgent: new https.Agent({ keepAlive: true }),
      });
      //mispelt API so it will error
      const response2 = app.$axios.get(
        'https://poetrydb.org/title/Shakespeare/lines3.json'
      );
      return { response2 };
    } catch (err) {
      $serverLogging.error({ message: 'Error in API2' });
    }
  },
});
</script>
