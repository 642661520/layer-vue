<template>
  <div id="app1">
    <button @click="log">打开</button>
    <button @click="close">close</button>
    <button @click="log2">打开2</button>
    <button @click="close2">close2</button>
    <button @click="close3">close3</button>
    <button @click="restore">还原</button>
    <button @click="reset = !reset">重置</button>
    <button @click="aaaa">关闭全部</button>
    <button @click="close">关闭全部</button>
    <!-- <sui-layer></sui-layer> -->
    <div>
      <div>
        <div id="test">test<Test></Test></div>
      </div>
    </div>

    <div id="test2">test2</div>
    <layer-vue :skin="{ content: { color: '#58a' } }" :end="end" :cancel="cancel" :destroyOnClose="true" :title="false">
      <Test :id="visible"></Test>
    </layer-vue>
    <LayerVue :visible.sync="visible" :maxmin="[1, 1]" :end="end" :cancel="cancel" :resize="[0, 1]" :destroyOnClose="false" :reset="reset"
      ><div id="videobox">
        <video muted autoplay="true" id="video" controls="true" controlsList="nodownload"></video>
        <button class="btn" id="download" onclick="download()">下载</button>
      </div></LayerVue
    >
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
      console.log(this.parent);

      this.layer1 = this.$layer({
        parent: this,
        id: "213",
        skin: {
          background: "none",
          title: {
            background: "url(" + require("./右侧里框.png") + ")  0 0/100% 100%",
            color: "#333",
          },
          content: {
            background: "url(" + require("./右侧里框.png") + ")  0 0/100% 100%",
            color: "#000",
          },
          maxmin: {
            backgroundHover: "#6666",
            colorHover: "#008afc",
          },
          close: {
            // backgroundHover: "url('./右侧里框.png')",
            colorHover: "#123",
          },
        },
        anim: 5,
        destroyOnClose: false,
        titleheight: 30,
        // title:0,
        move: ".layer-vue-content",
        maxmin: [1, 1],
        area: [200, 170],
        minarea: ["123", "112"],
        offset: "b",
        settop: true,
        content: this.visible,
        // content: span,
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        // content: 1,
        // content: {
        //   component: Test,
        //   parent: this,
        //   data: { id: 3 },
        // },
      });
    },
    async log2() {
      this.zindex += 1;
      await this.$layer.close(this.layer2);
      this.layer2 = this.$layer({
        parent: this,
        destroyOnClose: false,
        area: [766, 355],
        offset: "1",
        settop: true,
        // anim:0,
        id: "123",
        // content: document.getElementById("test"),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        content: {
          component: Test,
          data: { id: this.zindex },
        },
      });
    },
    success(a) {
      this.log(a);
    },
    async close() {
      let a = await this.$layer.close(this.layer1);
      console.log(a);
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
    async aaaa() {
      let a = await this.$layer.closeAll();
      console.log(a);
    },
  },
};
</script>
