<template>
  <div>
    <LayerVue :visible.sync="visible6" :setTop="true"><div>300*158（内容区加标题的最小高度是200px）</div></LayerVue>
    <h2>窗口大小</h2>
    <el-row>
      <el-col :span="4" style="text-align: center;">
        宽度
      </el-col>
      <el-col :span="4" style="text-align: center;">
        高度
      </el-col>
      <el-col :span="4" style="text-align: center;">
        最小宽度
      </el-col>
      <el-col :span="4" style="text-align: center;">
        最小高度
      </el-col>
      <el-col :span="4" style="text-align: center;">
        最大宽度
      </el-col>
      <el-col :span="4" style="text-align: center;">
        最大高度
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input v-model="inputWidth" placeholder="请输入宽度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputHeight" placeholder="请输入高度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input  v-model="inputMinWidth" placeholder="请输入最小宽度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputMinHeight" placeholder="请输入最小高度"></el-input>
      </el-col>
            <el-col :span="4">
        <el-input  v-model="inputMaxWidth" placeholder="请输入最大宽度"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="inputMaxHeight" placeholder="请输入最大高度"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="open2">指定窗口大小</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible6 = !visible6">{{ !visible6 ? "默认大小" : "关闭" }}</el-button>
      </el-col>
    </el-row>
      <show-code codename="area"/>
  </div>

</template>

<script>
import showCode from '../../components/show-code.vue';
export default {
  components: { showCode },
  data() {
    return {
      visible6: false,
      inputWidth: "30%",
      inputHeight: "300",
      inputMinWidth: "20%",
      inputMinHeight: "200",
      inputMaxWidth: "50%",
      inputMaxHeight: "700",
    };
  },
  methods: {
    open2() {
      this.$layer.closeAll();
      this.$layer({
        setTop: true,
        content: `可设置打开时的尺寸，拉伸后的最大、最小尺寸，支持百分比和数值`,
        id: "open2",
        destroyOnClose: true,
        area: [this.inputWidth, this.inputHeight],
        minArea: [this.inputMinWidth === "" ? 300 : this.inputMinWidth, this.inputMinHeight === "" ? 200 : this.inputMinHeight],
        maxArea:[this.inputMaxWidth === "" ? 300 : this.inputMaxWidth, this.inputMaxHeight === "" ? 200 : this.inputMaxHeight],
      });
    },
  },
};
</script>

<style></style>
