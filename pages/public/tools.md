```html
<template>
  <div>
    <LayerVue :visible.sync="visible1" :setTop="true" :title='false'><div>没有标题栏时</div></LayerVue>
    <LayerVue :visible.sync="visible2" :setTop="true" :closeBtn="false"><div>不显示关闭按钮
      <el-button type="primary" @click="visible2=false">关闭</el-button>
      </div></LayerVue>
    <LayerVue :visible.sync="visible3" :setTop="true" :maxmin="[1, 0]"><div>显示最大化按钮</div></LayerVue>
    <LayerVue :visible.sync="visible4" :setTop="true" :maxmin="[0, 1]"><div>显示最小化按钮</div></LayerVue>
    <LayerVue :visible.sync="visible5" :setTop="true" :maxmin="[1, 1]"><div>同时显示最大最小化</div></LayerVue>
    <h2>自带按钮</h2>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "显示关闭按钮" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "不显示关闭按钮" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "显示最大化按钮" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible4 = !visible4">{{ !visible4 ? "显示最小化按钮" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible5 = !visible5">{{ !visible5 ? "同时显示最大最小化" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <show-code codename="tools"/>
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
      visible5: false,
    };
  },
};
</script>

<style></style>

```