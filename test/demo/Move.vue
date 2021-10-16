<template>
  <div>
    <layer-vue :visible.sync="visible1" :move="false">:move="false"</layer-vue>
    <layer-vue :visible.sync="visible2" :anim="1">move="layer-vue-title"</layer-vue>
    <layer-vue :visible.sync="visible3" move=".layer-vue-content" :maxmin="[1,1]">move=".layer-vue-content"</layer-vue>
    <layer-vue :visible.sync="visible4" :moveOut="[1, 1, 1, 1]">:moveOut="[1, 1, 1, 1]" <br/>可以移动到浏览器视口外，可以分别指定4个方向(默认只能在浏览器视口内)</layer-vue>
    <h2>拖动窗口</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "禁止拖动" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "按下标题可拖动（默认）" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "自定义移动区域" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="7">
        <el-button type="primary" @click="visible4 = !visible4">{{ !visible4 ? "可以移动到浏览器视口外" : "关闭" }}</el-button>
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
    };
  },
};
</script>

