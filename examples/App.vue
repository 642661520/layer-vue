// app.vue
<template>
  <div id="app">
    <button @click="log">打开</button>
    <sui-layer></sui-layer>
    <SuiLayer></SuiLayer>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
    zindex: 100
    }
  },
  created(){
    console.log();
  },
  methods: {
    // 置顶函数
    settop() {
      this.zindex = this.zindex + 1;
      return this.zindex;
    },
    log(){
      this.$Layer.open({x:388,y:1})
    },
    success(a){
      this.log(a)
    }
  }
};
</script>
