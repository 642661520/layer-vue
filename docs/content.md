```html
<template>
  <div>
    <LayerVue :visible.sync="visible1" :setTop="true" :content="inputcontent"></LayerVue>
    <h2>内容区</h2>
    <div id="content1" style="color: #409EFF;margin-right:20px ; background: #444;text-align: center;line-height: 30px;  border-radius:5px">内容区是这个dom元素,提前绑定响应式数据，是方法模式下改变内容区的最佳方案｛{{ input }}｝</div>
    <el-row>
      <el-col :span="5">
        <el-button type="primary" @click="open">内容区是上面的div</el-button>
      </el-col>
      <el-col :span="7">
        <el-input v-model="input" placeholder="请输入文本"></el-input>
      </el-col>
      <el-col :span="5">
        <el-input v-model="inputcontent" placeholder="请输入内容区文本"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "自定义内容区文本" : "关闭" }}</el-button>
      </el-col>
    </el-row>
    <show-code codename="content"/>
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue';
export default {
  components: { showCode },
  data() {
    return {
      visible1: false,
      inputcontent: "",
      input: "响应式内容，尝试改变这个内容",
    };
  },
  methods: {
    async open() {
      this.layer3 = await this.$layer({
        setTop: true,
        el:'body',
        content: document.getElementById("content1"),
      });
    },
  },
};
</script>

<style></style>

```