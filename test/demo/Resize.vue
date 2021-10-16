<template>
  <div>
    <layer-vue :visible.sync="visible1" :settop="true"> 默认左下角，右下角均可拉伸 </layer-vue>
    <layer-vue :visible.sync="visible2" :settop="true" :resize="[0, 1]">:resize="[0, 1]" 左下角拉伸 </layer-vue>
    <layer-vue :visible.sync="visible3" :settop="true" :resize="[1, 0]">:resize="[1, 0]" 右下角拉伸 </layer-vue>
    <layer-vue :visible.sync="visible4" :settop="true" :resize="[0, 0]">:resize="[0, 0]" 不允许拉伸 </layer-vue>
    <h2>窗口拉伸</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = true">{{ !visible1 ? "打开窗口" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible2 = true">{{ !visible2 ? "左下拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible3 = true">{{ !visible3 ? "右下拉伸" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible4 = true">{{ !visible4 ? "不允许拉伸" : "关闭" }}</el-button>
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


