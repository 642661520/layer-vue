<template>
  <div
    v-cloak
    οndragstart="return false;"
    v-if="destroyOnClose ? (visible === undefined ? defaultvisible : visible) : true"
    v-show="visible === undefined ? defaultvisible : visible"
    class="layer-vue"
    :class="{ 'layer-vue-ismax': maxbtn, 'layer-vue-ismin': minbtn }"
    v-drag="{
      visible,
      moveOut,
      settop,
      x,
      y,
      width,
      height,
      minwidth,
      minheight,
      getx,
      setx,
      gety,
      sety,
      setwidth,
      getwidth,
      getheight,
      setheight,
      setmax,
      getmax,
      setmin,
      getmin,
      setzIndex,
      moveEnd,
      move,
      full,
      min,
      restore,
      settransition,
      setoverflow,
    }"
    :style="{
      width: width + 'px',
      height: height + 'px',
      transform: 'translate(' + x + 'px,' + y + 'px)',
      'z-index': zIndex,
      transition: transition,
    }"
  >
    <div v-if="title !== false" class="layer-vue-title" :title="title">
      {{ title }}
    </div>
    <div class="layer-vue-tools">
      <span v-if="maxmin[1]" class="layer-vue-min">-</span>
      <span v-if="maxmin[0]" class="layer-vue-max">口</span>
      <span v-if="closeBtn" class="layer-vue-close" @click="closeLayer">X</span>
    </div>
    <div v-if="resize" class="layer-vue-resize"></div>
    <div v-if="lbresize" class="layer-vue-lbresize"></div>
    <div ref="content" class="layer-vue-content" :style="{ height: contentheight + 'px', overflow: overflow }">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "layer",
  data() {
    return {
      // 默认开启
      defaultvisible: true,
      // 最大化按钮
      maxbtn: false,
      minbtn: false,
      // 最小宽度
      minwidth: 300,
      // 最小高度
      minheight: 200,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 1,
      transition: "none",
      overflow: "hidden",
    };
  },
  computed: {
    contentheight: function () {
      return this.height - (this.title ? 42 : 0);
    },
  },
  props: {
    title: { type: [String, Boolean], default: "信息" },
    area: { type: [String, Array], default: "auto" },
    offset: { type: [String, Array, Number], default: "auto" },
    settop: { type: Function },
    moveOut: { type: Array, default: () => [0, 0, 0, 0] },
    visible: {},
    zindex: { type: Number, default: 1 },
    closeBtn: { type: [Number, Boolean], default: true },
    maxmin: { type: Array, default: () => [0, 0] },
    resize: { type: [Number, Boolean], default: true },
    lbresize: { type: [Number, Boolean], default: true },
    moveEnd: { type: Function },
    move: { type: [String, Boolean], default: ".layer-vue-title" },
    cancel: { type: Function },
    success: { type: Function },
    end: { type: Function },
    full: { type: Function },
    min: { type: Function },
    restore: { type: Function },
    destroyOnClose: { type: [Number, Boolean], default: false },
    amin: { type: Number, default: 0 },
    content: {},
  },
  watch: {
    visible: function (newvalue) {
      if (newvalue) {
        if (this.settop) {
          const zindex = this.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.$nextTick(() => {
          this.init();
          this.success && this.success(this);
        });
      }
    },
  },
  directives: {
    drag: {
      bind: function (el, binding) {
        // 置顶事件
        el.onmousedown = () => {
          if (binding.value.settop) {
            const zindex = binding.value.settop();
            binding.value.setzIndex(zindex);
          }
        };
        el.addEventListener("transitionend", (e) => {
          if (e.propertyName === "width") {
            binding.value.setoverflow("auto");
          }
        });
        // 窗口移动事件
        if (el.querySelector(binding.value.move)) {
          el.querySelector(binding.value.move).style.cursor = "move";
          el.querySelector(binding.value.move).onmousedown = (e1) => {
            if (el.className.indexOf("layer-vue-ismax") >= 0) {
              return;
            }
            binding.value.settransition();
            if (el.className.indexOf("layer-vue-ismin") >= 0) {
              const x = binding.value.getx();
              let clientX = e1.clientX;
              document.onmousemove = (e2) => {
                e2.preventDefault();
                let moveX = e2.clientX - clientX;
                let X = parseInt(x) + parseInt(moveX);
                if (!parseInt(binding.value.moveOut[3]) && X <= 0) {
                  X = 0;
                }
                if (!parseInt(binding.value.moveOut[1]) && X >= document.documentElement.clientWidth - binding.value.minwidth) {
                  X = document.documentElement.clientWidth - binding.value.minwidth;
                }
                binding.value.setx(X);
              };
              document.onmouseup = (e) => {
                e.preventDefault();
                binding.value.settransition(true);
                document.onmousemove = null;
                document.onmouseup = null;
              };
            } else {
              const x = binding.value.getx();
              const y = binding.value.gety();
              let clientX = e1.clientX;
              let clientY = e1.clientY;
              document.onmousemove = (e2) => {
                e2.preventDefault();
                let moveX = e2.clientX - clientX;
                let moveY = e2.clientY - clientY;
                binding.value.x = parseInt(x) + parseInt(moveX);
                if (!parseInt(binding.value.moveOut[3]) && binding.value.x <= 0) {
                  binding.value.x = 0;
                }
                if (!parseInt(binding.value.moveOut[1]) && binding.value.x >= document.documentElement.clientWidth - binding.value.getwidth()) {
                  binding.value.x = document.documentElement.clientWidth - binding.value.getwidth();
                }
                binding.value.y = parseInt(y) + parseInt(moveY);
                if (!parseInt(binding.value.moveOut[0]) && binding.value.y <= 0) {
                  binding.value.y = 0;
                }
                if (!parseInt(binding.value.moveOut[2]) && binding.value.y >= document.documentElement.clientHeight - binding.value.getheight()) {
                  binding.value.y = document.documentElement.clientHeight - binding.value.getheight();
                }
                binding.value.setx(binding.value.x);
                binding.value.sety(binding.value.y);
              };
              document.onmouseup = (e) => {
                e.preventDefault();
                binding.value.settransition(true);
                binding.value.moveEnd && binding.value.moveEnd();
                document.onmousemove = null;
                document.onmouseup = null;
              };
            }
          };
        }

        // 最大化按钮
        if (el.querySelector(".layer-vue-max")) {
          el.querySelector(".layer-vue-max").onclick = () => {
            binding.value.setmax();
            if (binding.value.getmax()) {
              if (binding.value.move) {
                el.querySelector(binding.value.move).style.cursor = "not-allowed";
              }
              if (binding.value.getmin()) {
                binding.value.setmin(false);
              } else {
                binding.value.x = binding.value.getx();
                binding.value.y = binding.value.gety();
                binding.value.width = binding.value.getwidth();
                binding.value.height = binding.value.getheight();
              }
              binding.value.setx(0);
              binding.value.sety(0);
              binding.value.setwidth(document.documentElement.clientWidth);
              binding.value.setheight(document.documentElement.clientHeight);
              binding.value.full && binding.value.full();
            } else {
              binding.value.setx(binding.value.x);
              binding.value.sety(binding.value.y);
              binding.value.setwidth(binding.value.width);
              binding.value.setheight(binding.value.height);
              binding.value.restore && binding.value.restore();
              if (binding.value.move) {
                el.querySelector(binding.value.move).style.cursor = "move";
              }
            }
          };
        }

        // 最小化按钮
        if (el.querySelector(".layer-vue-min")) {
          el.querySelector(".layer-vue-min").onclick = () => {
            binding.value.setmin();
            if (binding.value.getmin()) {
              if (binding.value.move) {
                el.querySelector(binding.value.move).style.cursor = "move";
              }
              if (binding.value.getmax()) {
                binding.value.setmax(false);
              } else {
                binding.value.x = binding.value.getx();
                binding.value.y = binding.value.gety();
                binding.value.width = binding.value.getwidth();
                binding.value.height = binding.value.getheight();
              }

              binding.value.setx(binding.value.getx());
              binding.value.sety(document.documentElement.clientHeight - 42);
              binding.value.setheight(42);
              binding.value.setwidth(binding.value.minwidth);
              binding.value.min && binding.value.min();
            } else {
              binding.value.setx(binding.value.x);
              binding.value.sety(binding.value.y);
              binding.value.setwidth(binding.value.width);
              binding.value.setheight(binding.value.height);
              binding.value.restore && binding.value.restore();
            }
          };
        }
        // 右下拉伸
        el.querySelector(".layer-vue-resize").onmousedown = (e1) => {
          e1.preventDefault();
          binding.value.settransition();
          const { minwidth, minheight } = binding.value;
          const width = binding.value.getwidth();
          const height = binding.value.getheight();
          const x = binding.value.getx();
          const y = binding.value.gety();
          let clientX = e1.clientX;
          let clientY = e1.clientY;
          document.onmousemove = (e2) => {
            e2.preventDefault();
            let moveX = e2.clientX - clientX;
            let moveY = e2.clientY - clientY;
            binding.value.width = parseInt(width) + parseInt(moveX);
            binding.value.height = parseInt(height) + parseInt(moveY);
            if (binding.value.width <= minwidth) {
              binding.value.width = minwidth;
            }
            if (binding.value.width + x >= document.documentElement.clientWidth) {
              binding.value.width = document.documentElement.clientWidth - x;
            }
            if (binding.value.height <= minheight) {
              binding.value.height = minheight;
            }
            if (binding.value.height + y >= document.documentElement.clientHeight) {
              binding.value.height = document.documentElement.clientHeight - y;
            }
            binding.value.setwidth(binding.value.width);
            binding.value.setheight(binding.value.height);
          };
          document.onmouseup = (e) => {
            e.preventDefault();
            binding.value.settransition(true);
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
        // 左下拉伸
        el.querySelector(".layer-vue-lbresize").onmousedown = (e1) => {
          e1.preventDefault();
          binding.value.settransition();
          const { minwidth, minheight } = binding.value;
          const width = binding.value.getwidth();
          const height = binding.value.getheight();
          const x = binding.value.getx();
          let clientX = e1.clientX;
          let clientY = e1.clientY;
          document.onmousemove = (e2) => {
            e2.preventDefault();
            let moveX = e2.clientX - clientX;
            let moveY = e2.clientY - clientY;
            binding.value.width = parseInt(width) - parseInt(moveX);
            binding.value.height = parseInt(height) + parseInt(moveY);
            binding.value.x = parseInt(x) + parseInt(moveX);
            if (binding.value.width <= minwidth) {
              binding.value.width = minwidth;
            }
            if (binding.value.width + binding.value.x >= x + width) {
              binding.value.x = x + width - binding.value.width;
            }
            if (binding.value.height <= minheight) {
              binding.value.height = minheight;
            }
            if (!parseInt(binding.value.moveOut[3]) && binding.value.x <= 0) {
              binding.value.x = 0;
              binding.value.width = x + width;
            }
            binding.value.setwidth(binding.value.width);
            binding.value.setheight(binding.value.height);
            binding.value.setx(binding.value.x);
          };
          document.onmouseup = (e) => {
            e.preventDefault();
            binding.value.settransition(true);
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
  created() {
    this.amininit();
    window.addEventListener("resize", this.init);
    if (this.visible || this.visible === undefined) {
      if (this.settop) {
        const zindex = this.settop();
        this.zIndex = zindex;
      } else {
        this.zIndex = this.zindex;
      }
      this.success && this.success(this);
    }
  },
  beforeUpdate() {},
  updated() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.content.children[0].style.display = "none";
      if (this.visible || this.visible === undefined) {
        this.init();
        this.$refs.content.children[0].style.display = "";
      }
    });
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    amininit() {
      this.overflow = "hidden";
      if (this.amin === 0) {
        const { height, width } = this.areainit();
        const { x, y } = this.offsetinit(this.offset, width * 0.5, height * 0.5, true);
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
      }
    },
    init() {
      this.settransition(true);
      const { height, width } = this.areainit();
      const { x, y } = this.offsetinit(this.offset, width, height);
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    },
    areainit() {
      let height = 0;
      let width = 0;
      if (this.area instanceof Array) {
        width = this.Transformation(this.area[0], "clientWidth");
        if (this.area[1]) {
          height = this.Transformation(this.area[1], "clientHeight") + (this.title ? 42 : 0);
        } else {
          height = this.$refs.content ? this.$refs.content.scrollHeight : 0 + 42;
        }
      } else {
        if (this.area === "auto") {
          width = this.$refs.content ? this.$refs.content.scrollWidth : 0;
        } else {
          width = this.Transformation(this.area, "clientWidth");
        }
        height = this.$refs.content ? this.$refs.content.scrollHeight : 0 + 42;
      }
      if (width > document.documentElement.clientWidth && document.documentElement.clientWidth > this.minwidth) {
        width = document.documentElement.clientWidth;
      } else if (width <= this.minwidth) {
        width = this.minwidth;
      }
      if (height > document.documentElement.clientHeight && document.documentElement.clientHeight > this.minheight) {
        height = document.documentElement.clientHeight;
      } else if (height <= this.minheight) {
        height = this.minheight;
      }
      if (isNaN(height)) {
        height = this.minheight;
      }
      if (isNaN(width)) {
        width = this.minwidth;
      }
      return { height, width };
    },
    offsetinit(offset, width, height, amin = false) {
      let x = 0;
      let y = 0;
      let w = width;
      let h = height;
      if (amin) {
        x = width * 0.5;
        y = height * 0.5;
        width = 0;
        height = 0;
      }
      if (offset instanceof Array) {
        if (offset[1]) {
          x = this.Transformation(offset[1], "clientWidth");
        } else {
          x = (document.documentElement.clientWidth - width) * 0.5;
        }
        y = this.Transformation(offset[0], "clientHeight");
      } else if (typeof offset === "number") {
        y = offset;
        x = (document.documentElement.clientWidth - width) * 0.5;
      } else if (offset.substr(-2).indexOf("px") === 0) {
        y = parseInt(offset.slice(0, -2));
      } else if (offset.substr(-1).indexOf("%") === 0) {
        y = document.documentElement.clientHeight * parseInt(offset.slice(0, -1)) * 0.01;
      } else {
        switch (offset) {
          case "auto":
            x = (document.documentElement.clientWidth - width) * 0.5;
            y = (document.documentElement.clientHeight - height) * 0.5;
            break;
          case "t":
            x = (document.documentElement.clientWidth - width) * 0.5;
            break;
          case "r":
            x = document.documentElement.clientWidth - w;
            y = (document.documentElement.clientHeight - height) * 0.5;
            break;
          case "b":
            x = (document.documentElement.clientWidth - width) * 0.5;
            y = document.documentElement.clientHeight - h;
            break;
          case "l":
            y = (document.documentElement.clientHeight - height) * 0.5;
            break;
          case "lt":
            break;
          case "lb":
            y = document.documentElement.clientHeight - h;
            break;
          case "rt":
            x = document.documentElement.clientWidth - w;
            break;
          case "rb":
            x = document.documentElement.clientWidth - w;
            y = document.documentElement.clientHeight - h;
            break;
        }
      }
      if (isNaN(x)) {
        x = 0;
      }
      if (isNaN(y)) {
        y = 0;
      }
      return { x, y };
    },
    Transformation(value, client) {
      let name = 0;
      if (typeof value === "number") {
        name = value;
      } else if (value.substr(-2).indexOf("px") === 0) {
        name = parseInt(value.slice(0, -2));
      } else if (value.substr(-1).indexOf("%") === 0) {
        name = document.documentElement[client] * parseInt(value.slice(0, -1)) * 0.01;
      } else {
        name = parseInt(value);
      }
      return name;
    },
    // 关闭窗口函数
    closeLayer() {
      if (this.visible === undefined) {
        this.defaultvisible = false;
      } else {
        this.$emit("update:visible", false);
      }
      this.amininit();
      if (this.destroyOnClose) {
        this.end && this.end();
      } else {
        this.cancel && this.cancel();
      }
    },
    setoverflow(overflow) {
      this.overflow = overflow;
    },
    getx() {
      return this.x;
    },
    setx(x) {
      this.x = x;
    },
    gety() {
      return this.y;
    },
    sety(y) {
      this.y = y;
    },
    getwidth() {
      return this.width;
    },
    setwidth(width) {
      this.width = width;
    },
    getheight() {
      return this.height;
    },
    setheight(height) {
      this.height = height;
    },
    setmax(isclick = true) {
      if (isclick) {
        this.maxbtn = !this.maxbtn;
      } else {
        this.maxbtn = isclick;
      }
    },
    getmax() {
      return this.maxbtn;
    },
    setmin(isclick = true) {
      if (isclick) {
        this.minbtn = !this.minbtn;
      } else {
        this.minbtn = isclick;
      }
    },
    getmin() {
      return this.minbtn;
    },
    setzIndex(zIndex) {
      this.zIndex = zIndex;
    },
    settransition(transition = false) {
      if (transition) {
        this.transition = "all 0.2s";
      } else {
        this.transition = "none";
      }
    },
  },
};
</script>
<style>
[v-cloak] {
  display: none;
}
.layer-vue {
  position: fixed;
  display: inline-block;
  background-color: #fff;
  box-shadow: 1px 1px 50px rgb(0 0 0 / 30%);
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 2px;
}
.layer-vue-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  user-select: none;
  padding: 0 80px 1px 20px;
  line-height: 42px;
  border-bottom: 1px solid #f0f0f0;
}
.layer-vue-tools {
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.layer-vue-tools span {
  display: inline-block;
  width: 30px;
  text-align: center;
  line-height: 42px;
}
.layer-vue-tools span:hover {
  color: #008afc;
}
.layer-vue-resize {
  user-select: none;
  position: absolute;
  cursor: se-resize;
  width: 10px;
  height: 10px;
  bottom: 0px;
  right: 0px;
  z-index: 1;
}
.layer-vue-lbresize {
  user-select: none;
  position: absolute;
  cursor: sw-resize;
  width: 10px;
  height: 10px;
  bottom: 0px;
  left: 0px;
  z-index: 1;
}
.layer-vue-content {
  position: relative;
}
</style>
