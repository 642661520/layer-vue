<template>
  <div>
    <LayerVue :visible.sync="visible1" :settop="true" :title="false"><div>不显示标题</div></LayerVue>
      <LayerVue :visible.sync="visible2" :settop="true" :title="inputtitle"><div>自定义标题</div></LayerVue>
      <LayerVue :visible.sync="visible3" :settop="true" :titleheight="inputtitleheight">
        <div>标题高度{{ inputtitleheight }}，layer未限制该值大小，请勿设置离谱儿的数值</div>
      </LayerVue>
    <h2>标题</h2>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="visible1 = !visible1">{{ !visible1 ? "不显示标题" : "关闭" }}</el-button>
        </el-col>
        <el-col :span="4">
          <el-input v-model="inputtitle" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="visible2 = !visible2">{{ !visible2 ? "自定义标题" : "关闭" }}</el-button>
        </el-col>
        <el-col :span="5">
          <el-input-number v-model="inputtitleheight" controls-position="right" :min="1" :max="100" placeholder="请输入标题高度"></el-input-number>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="visible3 = !visible3">{{ !visible3 ? "自定义标题高度" : "关闭" }}</el-button>
        </el-col>
      </el-row>
      <show-code codename="title"/>
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue'
export default {
  components: { showCode },
  data() {
    return {
      visible1:false,
      visible2:false,
      visible3:false,
      inputtitle:"自定义标题",
      inputtitleheight:42
    }
  },
}
</script>

<style>

</style>