<template>
  <transition name="layer-msg-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="layer-msg"
      :class="'layer-msg-' + type"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      :style="{
        top: 'calc(' + myOffset[0] + ' + ' + top + 'px)',
        left: 'calc(' + myOffset[1] + ' + ' + 0 + 'px)',
      }"
    >
      <IconSuccess v-if="type === 'success'" />
      <IconError v-else-if="type === 'error'" />
      <IconWarning v-else-if="type === 'warning'" />
      <span style="padding-left: 10px;">{{ msg }}</span>
      <span class="layer-msg-close" v-if="showClose ||time===0" @click="close">
        <IconClose />
      </span>
    </div>
  </transition>
</template>
<script>
import IconClose from "../../theme/icon/IconClose.vue";
import IconSuccess from "../../theme/icon/IconSuccess.vue";
import IconError from "../../theme/icon/IconError.vue";
import IconWarning from "../../theme/icon/IconWarning.vue";
export default {
  name: "LayerMsg",
  components: { IconClose, IconSuccess, IconError, IconWarning },
  data() {
    return {
      visible: false,
      top: 0,
      closed: false,
      timer: undefined,
      // offset: ["50%", "50%"],
    };
  },
  props: {
    msg: { type: String, default: "" },
    type: { type: String, default: "info" },
    time: { type: Number, default: 3000 },
    onClose: { type: Function, default: () => { } },
    onCancel: { type: Function, default: () => { } },
    showClose: { type: Boolean, default: false },

  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },

  computed: {
    myOffset: function () {
      const offset = ["50%", "50%"];
      switch (typeof this.offset) {
        case "object":
          if (this.offset instanceof Array) {
            this.offset.forEach((e, index) => {
              switch (typeof e) {
                case "number":
                  offset[index] = e + 30 + "px";
                  break;
                case "string":
                  offset[index] = e;
                default:
                  break;
              }
            });
          }
          break;
        case "number":
          offset[0] = this.offset + "px";
          break;
        case "string":
          offset[0] = this.offset;
        default:
          break;
      }
      return offset;
    },
  },

  mounted() {
    this.startTimer();
  },
  methods: {
    handleAfterLeave() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
      this.onClose && this.onClose();
    },
    close() {
      this.closed = true;
      this.$msg.close(this.id);
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.time > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.time);
      }
    },
  },
};
</script>
