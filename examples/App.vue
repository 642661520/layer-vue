<template>
  <div id="app1">
    <el-button @click="open1">打开窗口1</el-button>
    <el-button @click="close1">关闭窗口1</el-button>
    <el-button @click="restore">还原窗口1</el-button>
    <el-button @click="open2">打开窗口2</el-button>
    <el-button @click="close2">关闭窗口2</el-button>
    <el-button @click="close3">窗口3</el-button>
    <el-button @click="reset = !reset">重置窗口3</el-button>
    <el-button @click="closeAll">关闭全部</el-button>
    <div id="test">test<Test :id="visible"></Test></div>
    <layer-vue :isMax="isMax" :reset="reset" id="31321" :end="end" :cancel="cancel" skin="win7" :maxmin="[1, 1]" content="3131">
      <!-- <Test :id="visible"></Test> -->
    </layer-vue>
    <LayerVue :visible="true" :maxmin="[1, 1]" :end="end" offset="l" :cancel="cancel" skin="mac" :resize="[0, 1]" :destroyOnClose="true"
      ><div id="videobox">
        <video muted autoplay="true" id="video" controls="true" controlsList="nodownload"></video>
        <button class="btn" id="download" onclick="download()">下载</button>
      </div>
    </LayerVue>
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
      isMax: true,
      title: "313131",
      data: { id: 3 },
    };
  },
  watch: {
    title: function (newvalue) {
      this.$layer.setTitle(this.layer1, newvalue);
    },
    data: {
      handler: function (newvalue) {
        this.$layer.setContent(this.layer1, newvalue);
        //或 this.$layer.setContent('layer1', newvalue);
      },
      deep: true,
    },
  },
  mounted() {
    this.open1();
    this.open2();
  },
  methods: {
    open1() {
      this.layer1 = this.$layer({
        // isMax: true,
        parent: this,
        // id: "{id:1}",
        zindex: 999,
        shade: [1, 1],
        el: "#app1",
        // skin: {
        //   //窗口阴影
        //   boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
        //   background: "url(" + require("./bg.png") + ")  0 0/100% 100%",
        //   //标题栏
        //   title: {
        //     //标题栏背景
        //     background: "none",
        //     //标题栏文本色
        //     color: "#000",
        //     //标题栏和内容区分割线颜色
        //     // borderColor: "#00000000",
        //   },
        //   //内容区
        //   content: {
        //     //内容区背景
        //     background: "none",
        //     //内容区文本色
        //     color: "#000",
        //   },
        //   //最大化最小化按钮
        //   maxmin: {
        //     //最大化最小化按钮背景
        //     background: "#fff",
        //     //最大化最小化按钮
        //     color: "#000",
        //     //鼠标移入时最大化最小化按钮文本色
        //     backgroundHover: "#6666",
        //     //鼠标移入时最大化最小化按钮
        //     colorHover: "#008afc",
        //   },
        //   //关闭按钮
        //   close: {
        //     //关闭按钮背景
        //     background: "#fff",
        //     //关闭按钮文本色
        //     color: "#000",
        //     //鼠标移入时关闭按钮背景
        //     backgroundHover: "#f00",
        //     //鼠标移入时关闭按钮文本色
        //     colorHover: "#fff",
        //   },
        // },
        // destroyOnClose: false,
        titleheight: 30,
        title: this.title,
        // move: "#movetest",
        maxmin: [1, 1],
        area: [200, 250],
        // isOutAnim: 0,
        // minarea: ["123", "112"],
        offset: "b",
        settop: true,
        // content: this.visible,
        // content: document.getElementById('test'),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        content: false,
        content: {
          component: Test,
          data: this.data,
        },
      });
    },
    async close1() {
      let state = await this.$layer.close(this.layer1);
      console.log(state);
      if (!state) {
        this.$message.warning("窗口不存在或已经关闭");
      }
    },
    async open2() {
      this.zindex += 1;
      await this.$layer.close(this.layer2);
      this.layer2 = this.$layer({
        parent: this,
        destroyOnClose: false,
        area: [466, 355],
        offset: "r",
        settop: true,
        // anim:0,
        skin: "winxp",
        id: "123",
        content: document.getElementById("test"),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        success: function (e, width, height) {
          console.log(e, width, height);
        },
        resizing: (e, width, height) => {
          // console.log(e,width,height);
        },
        // content: {
        //   component: Test,
        //   data: { id: this.zindex },
        // },
      });
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
    async closeAll() {
      let a = await this.$layer.closeAll();
      console.log(a);
    },
  },
};
</script>
