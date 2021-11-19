<template>
  <div>
    <h2>动画</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="$layer.msg()">默认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
    };
  },
};
</script>


