<template>
  <div id="app">
    <button @click="log">打开</button>
    <button @click="close">close</button>
    <button @click="log2">打开2</button>
    <button @click="close2">close2</button>
    <button @click="close3">close3</button>
    <button @click="restore">还原</button>
    <!-- <sui-layer></sui-layer> -->
    <div>
      <div>
        <div id="test">test<Test></Test></div>
      </div>
    </div>

    <div id="test2">test2</div>
    <LayerVue :maxmin="[1, 1]" :content='{a:1}' :titleheight='30'></LayerVue>
    <LayerVue :visible.sync="visible" :maxmin="[1, 1]"
      >1231
      <div>test<Test></Test>
      <input type="text" name="" id="">
      </div
    ></LayerVue>
  </div>
</template>
<script>
import Test from "./test.vue";
let span = document.createElement("span");
span.innerHTML = "<div>13123</div>";
export default {
  components: {
    Test,
  },

  name: "app",
  layer1: null,
  layer2: null,
  data() {
    return {
      zindex: 100,
      visible: true,
    };
  },
  created() {
    console.log();
  },
  methods: {
    // 置顶函数
    log() {
      this.layer1 = this.$Layer({
         skin: {
        title: {
          backgroundColor: "#fff",
          color: "#000",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
        },
        maxmin: {
          backgroundColorHover: "#6666",
          colorHover: "#008afc",
        },
        close: {
          backgroundColorHover: "#543",
          colorHover: "#123",
        },
      },
        destroyOnClose: true,
        titleheight:30,
        maxmin: [1, 1],
        area: [599, 655],
        offset: "r",
        settop: true,
        // content:document.getElementById('test')
        // content: span,
        // content:1
        content: {
          component: Test,
          parent: this,
          data: { id: 3 },
        },
      });
    },
    log2() {
      this.layer2 = this.$Layer({
        destroyOnClose: true,
        area: [766, 355],
        offset: "1",
        settop: true,
        // content:document.getElementById('test2')
        content: {
          component: Test,
          parent: this,
          data: { id: 3 },
        },
      });
    },
    success(a) {
      this.log(a);
    },
    close() {
      this.$Layer.close(this.layer1);
    },
    close2() {
      this.$Layer.close(this.layer2);
    },
    close3() {
      this.visible = !this.visible;
    },
    restore(){
      this.$Layer.restore(this.layer1)
    }
  },
};
</script>
