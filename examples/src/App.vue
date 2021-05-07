// app.vue
<template>
  <div id="app">
    <VueLayer :content="a"></VueLayer>
  </div>
</template>

<script>
import VueLayer from "../../src/lib/vuelayer.vue";
export default {
  components: {
    VueLayer
  },
  name: "app",
  data() {
    return {
      a:{a:123,b:456}
    };
  },
};
</script>
<style></style>
