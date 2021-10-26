<template>
  <div>
    <layer-vue :visible.sync="visible1" :setTop="true" :shade='true' append-to-body>
    </layer-vue>
    <layer-vue :visible.sync="visible2" :setTop="true" :shade='shade' destroyOnClose  append-to-body>
    </layer-vue>
    <layer-vue :visible.sync="visible3" :setTop="true" :shade='true' shadeClose destroyOnClose  append-to-body>
      shadeClose 点击遮罩触发关闭
    </layer-vue>
    <h2>遮罩</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible1=true">默认遮罩</el-button>
      </el-col>
      <el-col :span="3">
        <el-input v-model="shade" placeholder="请设置遮罩"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="visible2=true">自定义遮罩颜色和透明度</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="visible3=true">点击遮罩触发关闭</el-button>
      </el-col>
    </el-row>
    <show-code codename="shade" />
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue'
export default {
  components: { showCode },
data() {
  return {
    shade:"#bfa9",
    visible1:false,
    visible2:false,
    visible3:false
  }
},
methods: {
},
}
</script>

<style>

</style>