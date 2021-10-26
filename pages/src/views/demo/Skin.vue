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
        <el-button type="success" @click="open">自定义皮肤</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <textarea  id="skin" @keydown="textareaTab" v-model="skin" contenteditable="true"></textarea>
      </el-col>
    </el-row>
    <show-code codename="skin"/>
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue';
export default {
  components: { showCode },
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      skin:`{
          //窗口阴影
          boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
          background: "linear-gradient(to right, #bfa , #5ba)",
          //标题栏
          title: {
            //标题栏背景
            background: "transparent",
            //标题栏文本色
            color: "#07a",
            //标题栏和内容区分割线
            borderBottom: "1px solid transparent"
          },
          //内容区
          content: {
            //内容区背景
            background: "transparent",
            //内容区文本色
            color: "#07a"
          },
          //最大化最小化按钮
          maxmin: {
            //最大化最小化按钮背景
            background: "#fff",
            //最大化最小化按钮
            color: "#000",
            //鼠标移入时最大化最小化按钮文本色
            backgroundHover: "#6666",
            //鼠标移入时最大化最小化按钮
            colorHover: "#008afc"
          },
          //关闭按钮
          close: {
            //关闭按钮背景
            background: "transparent",
            //关闭按钮文本色
            color: "#07a",
            //鼠标移入时关闭按钮背景
            backgroundHover: "transparent",
            //鼠标移入时关闭按钮文本色
            colorHover: "#f00"
          }
        }`
    }
  },
  methods: {
    textareaTab(e) {
      if (e.keyCode === 9) {
        if (e && e.preventDefault) {
          var CaretPos = document.getElementById("skin").selectionStart; // 创建选定区域
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
      eval(`Vue.prototype.$layer({
        skin:${skin},
        content:'<div>{boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)"}</div>',
        area:[500,300],
        title:'自定义皮肤',
      })`)
      
    }
  },
};
</script>

<style lang="less">
#skin {
  border-radius: 5px;
  padding: 10px;
  margin-right:20px ;
  font-family: Courier New;
  background: #444;
  font-size: 12px;
  color: white;
  height: 170px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
}

</style>
