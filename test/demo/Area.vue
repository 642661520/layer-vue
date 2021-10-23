<template>
  <div>
    <LayerVue :visible.sync="visible6" :setTop="true"><div>300*158（内容区加标题的最小高度是200px）</div></LayerVue>
    <h2>窗口大小</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible6 = !visible6">{{ !visible6 ? "默认大小" : "关闭" }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputminwidth" placeholder="请输入最小宽度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputminheight" placeholder="请输入最小高度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputwidth" placeholder="请输入宽度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputheight" placeholder="请输入高度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="open2">指定窗口大小</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible6: false,
      inputwidth: "",
      inputheight: "",
      inputminwidth: "",
      inputminheight: "",
    };
  },
  methods: {
    open2() {
      this.$layer.closeAll();
      this.$layer({
        setTop: true,
        content: `窗口大小：宽度:${this.inputwidth === "" || this.inputwidth < 300 ? 300 : this.inputwidth},高度:${this.inputheight === "" || this.inputheight < 200 ? 200 : this.inputheight}；layer未限制最小高宽大小，请勿设置离谱儿的数值`,
        id: "open2",
        destroyOnClose: true,
        area: [this.inputwidth, this.inputheight],
        minarea: [this.inputminwidth === "" ? 300 : this.inputminwidth, this.inputminheight === "" ? 200 : this.inputminheight],
      });
    },
  },
};
</script>

