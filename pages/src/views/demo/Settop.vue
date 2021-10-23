<template>
  <div>
    <h2>置顶窗口</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="open">打开一个置顶窗口</el-button>
      </el-col>
    </el-row>
    <show-code codename="setTop"/>
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue';
import Settop2 from './Settop2.vue';
export default {
  components: { showCode },
  data() {
    return {
      c:1
    };
  },
  methods: {
    open(){
      this.$layer({
        parent:this,
        offset: [Math.random() * 90 + "%", Math.random() * 90 + "%"],
        setTop:1,
        content:{
          component:Settop2,
        }
      })
    }
  },
};
</script>

<style></style>
