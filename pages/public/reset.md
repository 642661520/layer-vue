```html
<template>
  <div>
    <layer-vue :visible.sync="visible1" :setTop="true" id="reset">
      移动或拉伸窗口后点击<el-button type="primary"  @click="reset">重置窗口</el-button>
    </layer-vue>
    <h2>重置窗口</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1=true">打开窗口</el-button>
      </el-col>
    </el-row>
    <show-code codename="reset" />
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue'
export default {
  components: { showCode },
data() {
  return {
    visible1:false,
  }
},
methods: {
  reset(){
    this.$layer.reset('reset')
  }
},
}
</script>

<style>

</style>
```