<template>
  <div>
    <layer-vue :visible.sync="visible1" :setTop="true" :reset='reset' id="reset">
      移动或拉伸窗口后点击<el-button type="primary"  @click="reset">重置窗口</el-button>
    </layer-vue>
    <h2>重置窗口</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1=true">打开窗口</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
data() {
  return {
    visible1:false,
  }
},
methods: {
    reset(){
      this.$layer.reset("reset")
    }
  },
}
</script>

