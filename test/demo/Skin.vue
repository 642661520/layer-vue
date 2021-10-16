<template>
  <div>
    <layer-vue :visible.sync="visible1" skin="winxp" :maxmin="[1,1]">skin='winxp'</layer-vue>
    <layer-vue :visible.sync="visible2" skin="win7" :maxmin="[1,1]">skin='win7'</layer-vue>
    <layer-vue :visible.sync="visible3" skin="mac" :maxmin="[1,1]">skin='mac'</layer-vue>
    <layer-vue :visible.sync="visible4">默认皮肤</layer-vue>
    <h2>皮肤</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "winxp风格" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "win7风格" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "mac风格" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible4 = !visible4">{{ !visible4 ? "默认皮肤" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="open">自定义皮肤</el-button>
      </el-col>
    </el-row>
   
    <el-row>
      <el-col>
        <textarea  id="skin" @keydown="textareaTab" v-model="skin" contenteditable="true"></textarea>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      skin:`{
  title: {
    background: "#888",
    color: "#000",
    borderColor:"#888",
  },
  content: {
    background: "#ddd",
  },
}`
    }
  },
  methods: {
    textareaTab(e) {
      if (e.keyCode === 9) {
        if (e && e.preventDefault) {
          var CaretPos = document.getElementById("skin").selectionStart; // 创建选定区域
          console.log(CaretPos);
          this.skin = this.skin.slice(0, CaretPos) + "  " + this.skin.slice(CaretPos);
          this.$nextTick(() => {
            document.getElementById("skin").setSelectionRange(CaretPos + 2, CaretPos + 2);
          });
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      }
    },
    open(){
      let {skin}=this
      console.log(skin);
      
      eval(`Vue.prototype.$layer({
        skin:${skin}
      })`)
      
    }
  },
};
</script>


