<template>
  <div>
    <h2>置顶窗口</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="open">打开一个置顶窗口</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import setTop2 from './setTop2.vue';
export default {
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
          component:setTop2,
        }
      })
    }
  },
};
</script>


