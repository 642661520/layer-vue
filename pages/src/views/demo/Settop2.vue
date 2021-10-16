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
