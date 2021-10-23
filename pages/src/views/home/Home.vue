<template>
  <Index />
</template>
<script>
import Index from "@/components/index.vue";
export default {
  name: "Home",
  components: {
    Index
  },
  created() {
    this.$layer && (this.$layer.o.instances = []);
  },
  mounted() {}
};
</script>
