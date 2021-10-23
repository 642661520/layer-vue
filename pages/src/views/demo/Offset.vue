<template>
  <div>
    <LayerVue :visible.sync="visible1" :setTop="true"><div>offset="auto"</div></LayerVue>
    <LayerVue :visible.sync="visible2" offset="lt" :setTop="true"><div>offset="lt"</div></LayerVue>
    <LayerVue :visible.sync="visible3" offset="rt" :setTop="true"><div>offset="rt"</div></LayerVue>
    <LayerVue :visible.sync="visible4" offset="lb" :setTop="true"><div>offset="lb"</div></LayerVue>
    <LayerVue :visible.sync="visible5" offset="rb" :setTop="true"><div>offset="rb"</div></LayerVue>
    <h2>打开位置</h2>
    <el-row>
      <el-col :span="5">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "打开在中间（默认）" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "打开在左上角" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "打开在右上角" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible4 = !visible4">{{ !visible4 ? "打开在左下角" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible5 = !visible5">{{ !visible5 ? "打开在右下角" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">
        top
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputtop" placeholder="请输入top"></el-input>
      </el-col>
      <el-col :span="1">
        left
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputleft" placeholder="请输入left"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="open1">打开在指定位置</el-button>
      </el-col>
    </el-row>
    <show-code codename="offset" />
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
      inputtop: "10%",
      inputleft: "100",
    };
  },
  methods: {
    open1() {
      this.$layer.closeAll();
      this.$layer({
        setTop: true,
        content: `打开位置：top:${this.inputtop === "" ? "auto" : this.inputtop},left:${this.inputleft === "" ? "auto" : this.inputleft}`,
        id: "open1",
        destroyOnClose: true,
        offset: [this.inputtop, this.inputleft],
      });
    },
  },
};
</script>

<style></style>
