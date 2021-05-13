<template>
  <div id="app">
    <button @click="log">打开</button>
    <button @click="close">close</button>
    <button @click="log2">打开2</button>
    <button @click="close2">close2</button>
    <button @click="close3">close3</button>
    <button @click="restore">还原</button>
    <button @click="reset = !reset">重置</button>
    <button @click="aaaa" >关闭全部</button>
    <button @click="close" >关闭全部</button>
    <!-- <sui-layer></sui-layer> -->
    <div>
      <div>
        <div id="test">test<Test></Test></div>
      </div>
    </div>

    <div id="test2">test2</div>
    <!-- <LayerVue :maxmin="[1, 1]" :content="{ a: 1 }" :titleheight="30" :skin="{ content: { color: '#58a' } }" :end="end" :cancel="cancel" :destroyOnClose="false"></LayerVue> -->
    <LayerVue :visible.sync="visible" :maxmin="[1, 1]" :end="end" :cancel="cancel" :resize="[0, 1]" :destroyOnClose="false" :reset="reset"><div id="videobox">
          <video muted autoplay="true" id="video"  controls='true' controlsList="nodownload"></video>
          <button   class="btn" id="download" onclick="download()">下载</button>
        </div></LayerVue>
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

  data() {
    return {
      zindex: 100,
      visible: false,
      layer1: null,
      layer2: null,
      reset: true,
    };
  },
  created() {
    console.log();
  },
  methods: {
    // 置顶函数
    log() {
      this.layer1 = this.$layer({
        // id:'213',
        skin: {
          title: {
            backgroundColor: "#bfa",
            color: "#333",
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
        destroyOnClose: false,
        titleheight: 30,
        maxmin: [1, 1],
        // area: [599, 655],
        offset: "r",
        settop: true,
        // content:document.getElementById('test'),
        // content: span,
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        content: 1,
        // content: {
        //   component: Test,
        //   parent: this,
        //   data: { id: 3 },
        // },
      });
    },
    log2() {
      this.layer2 = this.$layer({
        destroyOnClose: false,
        area: [766, 355],
        offset: "1",
        settop: true,
        // content: document.getElementById("test"),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
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
      this.$layer.close(this.layer1);
    },
    close2() {
      this.$layer.close(this.layer2);
    },
    close3() {
      this.visible = !this.visible;
    },
    restore() {
      this.$layer.reset(this.layer1);
    },
    end: () => {
      console.log("end");
    },
    cancel: () => {
      console.log("cancel");
    },
    aaaa(){
      this.$layer.closeAll();
    },
  },
};
</script>
