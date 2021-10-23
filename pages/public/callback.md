```html
<template>
  <div>
    <layer-vue :visible.sync="visible1" setTop @resizing="resizing" @cancel="width=300;height=200;">
      拉伸窗口，下列大小同步变化<br />
      当前宽度:{{ width }}px,当前高度:{{ height }}px</layer-vue
    >
    <h2>回调函数</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="open1">success</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="open2">cancel</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="open3">end</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="open4">moveEnd</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="open5">resizeEnd</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="open6">full/min/restore</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = !visible1">resizing</el-button>
      </el-col>
    </el-row>
    <show-code codename="callback"/>
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue';
export default {
  components: { showCode },
  data() {
    return {
      width: 300,
      height: 200,
      visible1: false,
    };
  },
  methods: {
    resizing(e, w, h) {
      this.width = w;
      this.height = h;
    },
    open1() {
      this.$layer({
        success: () => {
          this.$message.success("窗口打开啦！");
        },
      });
    },
    open2() {
      this.$layer({
        id: 'this.$layer3',
        destroyOnClose: false,
        content: `id:'layerxxx',
        destroyOnClose:false,
        窗口不销毁的情况下关闭后，只执行cancel，不执行end
        `,
        cancel: () => {
          this.$message.success("窗口隐藏了！");
        },
        end: () => {
          setTimeout(() => {
            this.$message.success("窗口销毁了！");
          }, 0);
        },
      });
    },
    open3() {
      this.$layer({
        content: `窗口销毁的情况下关闭后，cancel和end同时执行`,
        cancel: () => {
          this.$message.success("窗口隐藏了！");
        },
        end: () => {
          setTimeout(() => {
            this.$message.success("窗口销毁了！");
          }, 0);
        },
      });
    },
    open4() {
      this.$layer({
        content: "停止拖动窗口后执行",
        moveEnd: () => {
          this.$message.success("拖动结束");
        },
      });
    },
    open5() {
      this.$layer({
        content: "停止拉伸窗口后执行",
        resizeEnd: () => {
          this.$message.success("拉伸结束");
        },
      });
    },
    open6() {
      this.$layer({
        maxmin: [1, 1],
        content: "窗口最大化、最小化、还原后执行",
        full: () => {
          this.$message.success("窗口全屏了");
        },
        min: () => {
          this.$message.success("窗口最小化了");
        },
        restore: () => {
          this.$message.success("窗口还原了");
        },
      });
    },
  },
};
</script>

<style></style>

```