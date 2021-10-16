<template>
  <div class="msg-no">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {type:String,default:  "没有更多了~"},
  },
};
</script>

<style lang="less">
.msg-no {
  position: relative;
  text-align: center;
  height: 900px;
  > div {
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
