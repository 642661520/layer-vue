// app.vue
<template>
  <div id="app">
    <Layer :settop='settop' :maxmin="[1,1]" :moveEnd="function(){log('moveend')}"
    :success="success"><div class="adada">1231321</div></Layer>
  </div>
</template>
<script>

import Layer from "../../src/lib/layer.vue";
export default {
  components: {
    Layer
  },
  name: "app",
  data() {
    return {
    zindex: 100
    }
  },
  methods: {
    // 置顶函数
    settop() {
      this.zindex = this.zindex + 1;
      return this.zindex;
    },
    log(value){
      return console.log(value)
    },
    success(a){
      this.log(a)
    }
  }
};
</script>
