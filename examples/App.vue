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
    <div>
      <div>
        <div id="test" >test<Test :id="visible"></Test></div>
      </div>
    </div>
    <layer-vue :visible.sync="visible" :isMax='isMax' :reset="reset" id="31321" :end="end" :cancel="cancel" :destroyOnClose="false" skin='win7' :maxmin="[1,1]" content='3131'>
      <!-- <Test :id="visible"></Test> -->
    </layer-vue>
    <LayerVue :visible="true" :maxmin="[1, 1]" :end="end" offset='l' :cancel="cancel" skin='mac' :resize="[0, 1]" :destroyOnClose="true" 
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
      isMax:true,
      title:'313131',
    };
  },
  watch:{
    title:function(newvalue){
        this.$layer.setTitle(this.layer1,newvalue)
    }
  },
  mounted(){
    this.open1()
    this.open2()
  },
  methods: {
    open1() {
      this.layer1 = this.$layer({
        isMax:true,
        parent: this,
        title:['title'],
        id: '{id:1}',
        skin: {
          background: "none",
          title: {
            background: "url(" + require("./bg.png") + ")  0 0/100% 100%",
            color: "#333",
          },
          content: {
            background: "url(" + require("./bg.png") + ")  0 0/100% 100%",
            color: "#000",
          },
          maxmin: {
            backgroundHover: "#6666",
            colorHover: "#008afc",
          },
          close: {
            colorHover: "#123",
          },
        },
        anim: 5,
        destroyOnClose: false,
        titleheight: 30,
        // title:0,
        move: "#movetest",
        maxmin: [1, 1],
        area: [200, 170],
        // isOutAnim: 0,
        minarea: ["123", "112"],
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
        content:false,
        // content: {
        //   component: Test,
        //   data: { id: 3 },
        // },
      });
    },
    async close1() {
      let state = await this.$layer.close(this.layer1);
      console.log(state);
      if(!state){
        this.$message.warning('窗口不存在或已经关闭')
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
        skin:'winxp',
        id: "123",
        content: document.getElementById("test"),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        success: function(e,width,height){
    console.log(e,width,height);
  },resizing:(e,width,height)=>{
    // console.log(e,width,height);
    
  }
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
