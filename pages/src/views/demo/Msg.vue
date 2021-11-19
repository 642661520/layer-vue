<template>
  <div>
    <h2>不同类型</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="$msg()">默认</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="$msg.success()">成功</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="$msg.warning()">警告</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="$msg.error()">失败</el-button>
      </el-col>
    </el-row>
    <h2>配置</h2>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="$msg('info', { showClose: true })">可手动关闭</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="$msg('time 设置为0则不会自动关闭', { time: 5000 })">关闭时间</el-button>
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          @click="$msg('关闭回调', { onCancel: () => { $msg.success('我是新来的！') } })"
        >关闭回调</el-button>
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          @click="$msg('销毁回调', { onClose: () => { $msg.success('我是新来的！') } })"
        >销毁回调</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="handleRestartInfiniteonCancel">关闭套娃</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="handleRestartInfiniteonClose">销毁套娃</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="$msg.closeAll()">关闭全部</el-button>
      </el-col>
    </el-row>
    <show-code codename="msg" />
  </div>
</template>

<script>
import showCode from "../../components/show-code.vue";
export default {
  components: { showCode },
  data() {
    return {
      Infinite: true,
      number1: 1,
      number2: 1
    };
  },
  methods: {
    handleInfiniteonClose() {
      const that = this
      if (this.number1 < 100) {
        this.$msg(this.number1++, { time: 100, onClose: that.handleInfiniteonClose })
      }
    },
    handleRestartInfiniteonClose() {
      this.number1 = 1;
      this.handleInfiniteonClose();
    },
    handleInfiniteonCancel() {
      const that = this
      if (this.number2 < 100) {
        this.$msg(this.number2++, { time: 100, onCancel: that.handleInfiniteonCancel })
      }
    },
    handleRestartInfiniteonCancel() {
      this.number2 = 1;
      this.handleInfiniteonCancel();
    },
  }
};
</script>

<style></style>
