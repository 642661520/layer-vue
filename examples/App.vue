<template>
  <div>
    <el-button @click="open1">打开窗口1</el-button>
    <el-button @click="close1">关闭窗口1</el-button>
    <el-button @click="restore">还原窗口1</el-button>
    <el-button @click="open2">打开窗口2</el-button>
    <el-button @click="close2">关闭窗口2</el-button>
    <el-button @click="close3">窗口3</el-button>
    <el-button @click="reset = !reset">重置窗口3</el-button>
    <el-button @click="closeAll">关闭全部</el-button>
    <div id="test">test<Test :id="visible" ref="test"></Test></div>
    <!-- <layer-vue
      :isMax="isMax"
      :reset="reset"
      id="31321"
      :end="end"
      :cancel="cancel"
      skin="win7"
      :maxmin="[1, 1]"
      content="3131"
    >
      <Test :id="visible"></Test>
    </layer-vue> -->
    <!-- <LayerVue :visible="true" :maxmin="[1, 1]" :end="end" offset="l" :cancel="cancel" skin="mac" :resize="[0, 1]" :destroyOnClose="true"
      ><div id="videobox">
        <video muted autoplay="true" id="video" controls="true" controlsList="nodownload"></video>
        <button class="btn" id="download" onclick="download()">下载</button>
      </div>
    </LayerVue> -->
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
    // this.open1();
    // this.open2();
    setTimeout(() => {
      this.$layer.close("31321");
    }, 2000);
  },
  methods: {
    open1() {
      this.layer1 = this.$layer.open({
        // isMax: true,
        id: "site_w",
        // el:"#123",
        ratio: true,
        moveOut: [1, 1, 1, 1],
        parent: this,
        // id: "{id:1}",
        zindex: 999,
        shade: [0.8, "#ffff49"],
        // shadeClose:true,
        el: "#app1",
        skin: {
          //窗口阴影
          // boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
          // background: "url(" + require("./bg.png") + ")  0 0/100% 100%",
          //标题栏
          // title: {
          //   //标题栏背景
          //   background: "#5ba",
          //   //标题栏文本色
          //   color: "#bfa",
          //   //标题栏和内容区分割线颜色
          //   borderBottom: "5px solid #123",
          // },
          // //内容区
          // content: {
          //   //内容区背景
          //   background: "red",
          //   //内容区文本色
          //   color: "#ddd",
          // },
          // //最大化最小化按钮
          // maxmin: {
          //   //最大化最小化按钮背景
          //   background: "#fff",
          //   //最大化最小化按钮
          //   color: "#000",
          //   //鼠标移入时最大化最小化按钮文本色
          //   backgroundHover: "#6666",
          //   //鼠标移入时最大化最小化按钮
          //   colorHover: "#008afc",
          // },
          // //关闭按钮
          // close: {
          //   //关闭按钮背景
          //   background: "#323",
          //   //关闭按钮文本色
          //   color: "red",
          //   //鼠标移入时关闭按钮背景
          //   backgroundHover: "#999",
          //   //鼠标移入时关闭按钮文本色
          //   colorHover: "#fff",
          // },
        },
        // destroyOnClose: false,
        titleheight: 30,
        title: true,
        // move: "#movetest",
        maxmin: [1, 1],
        area: [120, 550],
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
      console.log(this.$refs.test.$el);
      this.zindex += 1;
      await this.$layer.close(this.layer2);
      this.layer2 = this.$layer({
        parent: this,
        destroyOnClose: true,
        // shade:'1',
        el: "body",
        maxmin: [1, 1],
        // area: [466, 355],
        offset: "r",
        settop: true,
        resize: [0, 0],
        // anim:0,
        // skin: "winxp",
        move: ".layer-vue-content",
        id: "123",
        content: document.getElementById("test"),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        success: function (e, index, id) {
          console.log(e, index, id);
          setTimeout(() => {
            document.getElementById("test").style.height = 300 + "px";
            this.$layer.reloadAutoArea(index);
          },2000);
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
