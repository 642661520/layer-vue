```html
<template>
  <div>
    <layer-vue :visible.sync="visible1" :anim="0">:anim="0"</layer-vue>
    <layer-vue :visible.sync="visible2" :anim="1">:anim="1"</layer-vue>
    <layer-vue :visible.sync="visible3" :anim="2">:anim="2"</layer-vue>
    <layer-vue :visible.sync="visible4" :anim="3">:anim="3"</layer-vue>
    <layer-vue :visible.sync="visible5" :anim="4">:anim="4"</layer-vue>
    <layer-vue :visible.sync="visible6" :anim="5">:anim="5"</layer-vue>
    <layer-vue :visible.sync="visible7" :anim="1" :isOutAnim="false">:anim="1" :isOutAnim="false"</layer-vue>
    <h2>动画</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "没有动画" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "平滑放大（默认）" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "上方滑下" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible4 = !visible4">{{ !visible4 ? "下方飞入" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible5 = !visible5">{{ !visible5 ? "左侧滑入" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible6 = !visible6">{{ !visible6 ? "左侧旋转飞入" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible7 = !visible7">{{ !visible7 ? "没有关闭时动画" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <ShowCode codename="anim" />
  </div>
</template>
<script>
import ShowCode from '../../components/show-code.vue'
export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      code:``
    };
  },
  components:{
    ShowCode
  },
};
</script>

<style></style>

```