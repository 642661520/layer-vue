<template>
  <div>
    <Demo />
    <!-- <layer-vue
      :maxmin="[1, 1]"
      destroyOnClose
      :area="[700, 300]"
      :minArea="[400,400]"
      :maxArea='[900,900]'
      :anim="0"
      ratio
      id="test"
      slider
      append-to-body
      @cancel="cancel"
      @success="success"
      @resizing="resizing"
      @end="end"
      @full="full"
      @moveEnd="moveEnd"
      @min="min"
      @restore="restore"
      @resizeEnd="resizeEnd"
      shade="#1233"
      :skin="{
        shade: {
          background: '#59a',
        },
        slider:{
          background: '#59a',
        },
      }"
    >
      <video style="width: 100%"></video>
    </layer-vue> -->
    <layer-vue
      :maxmin="[1, 1]"
      destroyOnClose
      :area="[700, 300]"
      :minArea="[400, 100]"
      :maxArea="[900, 900]"
      :moveOutPadding="[10, 20, 30, 40]"
      :anim="0"
      id="test"
      slider
      append-to-body
      shade="#1233"
      :skin="{
        shade: {
          background: '#59a',
        },
        slider: {
          background: '#59a',
        },
      }"
    >
      <video style="width: 100%"></video>
    </layer-vue>
    <!--  // 关闭窗口回调
    // 移动结束回调
    moveEnd: { type: Function },
    cancel: { type: Function },
    // 打开窗口回调
    success: { type: Function },
    // 销毁窗口回调
    end: { type: Function },
    // 最大化回调
    full: { type: Function },
    // 最小化回调
    min: { type: Function },
    // 还原回调
    restore: { type: Function },
    // 拉伸时回调
    resizing: { type: Function },
    // 拉伸结束回调
    resizeEnd: { type: Function }, -->
  </div>
</template>
<script>
import Demo from "./demo/Demo.vue";
export default {
  components: {
    Demo,
  },
  name: "app",
  mounted() {
    console.log(this.$layer.reloadAutoArea("13222222222222"));
  },
  methods: {
    cancel(a, b, c) {
      console.log("cancel", a, b, c);
    },
    success(a, b, c) {
      console.log("success", a, b, c);
    },
    resizing(a, b, c) {
      console.log("resizing", a, b, c);
    },
    end(a, b, c) {
      console.log("end", a, b, c);
    },
    full(a, b, c) {
      console.log("full", a, b, c);
    },
    moveEnd(a, b, c) {
      console.log("moveEnd", a, b, c);
    },
    min(a, b, c) {
      console.log("min", a, b, c);
    },
    restore(a, b, c) {
      console.log("restore", a, b, c);
    },
    resizeEnd(a, b, c) {
      console.log("resizeEnd", a, b, c);
    },
    // @min="min"
    // @restore="restore"
    // @resizeEnd="resizeEnd"
  },
};
</script>
