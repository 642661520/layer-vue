<template>
  <div>
    <layer-vue :visible.sync="visible1" setTop> 默认8个方向均可拉伸 </layer-vue>
    <layer-vue :visible.sync="visible2" setTop :resize="[0, 1, 0, 0]" :borderResize="[0, 0, 0, 0]">:resize="[0, 1, 0, 0]" :borderResize="[0, 0, 0, 0] 只允许左下角拉伸 </layer-vue>
    <layer-vue :visible.sync="visible3" setTop :resize="[1, 0, 0, 0]" :borderResize="[0, 0, 0, 0]">:resize="[1, 0, 0, 0]" :borderResize="[0, 0, 0, 0] 只允许右下角拉伸 </layer-vue>
    <layer-vue :visible.sync="visible7" setTop :resize="[0, 0, 0, 1]" :borderResize="[0, 0, 0, 0]">:resize="[0, 0, 0, 1]" :borderResize="[0, 0, 0, 0] 只允许右上角拉伸 </layer-vue>
    <layer-vue :visible.sync="visible6" setTop :resize="[0, 0, 1, 0]" :borderResize="[0, 0, 0, 0]">:resize="[0, 0, 1, 0]" :borderResize="[0, 0, 0, 0] 只允许左上角拉伸 </layer-vue>
    <layer-vue :visible.sync="visible4" setTop :resize="[0, 0, 0, 0]" :borderResize="[0, 0, 0, 0]">:resize="[0, 0, 0, 0]" :borderResize="[0, 0, 0, 0] 不允许拉伸 </layer-vue>
    <layer-vue :visible.sync="visible8" setTop :resize="[0, 0, 0, 0]" :borderResize="[1, 0, 0, 0]">:resize="[0, 0, 0, 0]" :borderResize="[1, 0, 0, 0] 右拉伸 </layer-vue>
    <layer-vue :visible.sync="visible9" setTop :moveOutPadding="[100, 100, 100, 100]">:moveOutPadding="[100, 100, 100, 100]" 限制拉伸区域 设置moveOutPadding 移动和拉伸的区域会附加padding【右，下，左，上】； </layer-vue>
    <layer-vue :visible.sync="visible10" setTop :resize="[0, 0, 0, 0]" :borderResize="[0, 1, 0, 0]">:resize="[0, 0, 0, 0]" :borderResize="[0, 1, 0, 0]"</layer-vue>
    <layer-vue :visible.sync="visible11" setTop :resize="[0, 0, 0, 0]" :borderResize="[0, 0, 1, 0]">:resize="[0, 0, 0, 0]" :borderResize="[0, 0, 1, 0]"</layer-vue>
    <layer-vue :visible.sync="visible12" setTop :resize="[0, 0, 0, 0]" :borderResize="[0, 0, 0, 1]">:resize="[0, 0, 0, 0]" :borderResize="[0, 0, 0, 1]"</layer-vue>
    <layer-vue :visible.sync="visible5" setTop ratio>ratio 内容区等比例拉伸 </layer-vue>
    <h2>窗口拉伸</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "默认拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible4 = !visible4">{{ !visible4 ? "不允许拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "左下拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "右下拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible7 = !visible7">{{ !visible7 ? "右上拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible6 = !visible6">{{ !visible6 ? "左上拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="success" @click="visible5 = !visible5">{{ !visible5 ? "内容区等比例拉伸" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible8 = !visible8">{{ !visible8 ? "右拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible10 = !visible10">{{ !visible10 ? "下拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible11 = !visible11">{{ !visible11 ? "左拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible12 = !visible12">{{ !visible12 ? "上拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="success" @click="visible9 = !visible9">{{ !visible9 ? "限制区域" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <show-code codename="resize" />
  </div>
</template>

<script>
import showCode from "../../components/show-code.vue";
export default {
  components: { showCode },
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      visible9: false,
      visible10: false,
      visible11: false,
      visible12: false,
    };
  },
};
</script>

<style></style>
