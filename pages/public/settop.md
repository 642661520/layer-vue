```html
<!-- Settop.vue -->
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
import Settop2 from './Settop2.vue';
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
        settop:1,
        content:{
          component:Settop2,
        }
      })
    }
  },
};
</script>

<!-- Settop2.vue -->
<template>
  <div id="newlayer">
    新置顶窗口总是在最上层（不与其他组件冲突的情况下），点击某个在下面置顶窗口，对应的窗口则置顶
    <el-button type="primary" @click="open">继续弹出置顶窗口</el-button>
    <el-button type="primary" @click="close">关闭全部</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$parent.$parent.open()
    },
    close() {
      this.$layer.closeAll();
    },
  },
};
</script>

<style></style>

```