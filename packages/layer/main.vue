<template>
  <div
    v-cloak
    οndragstart="return false;"
    :data-id="id"
    v-if="destroyOnClose ? defaultvisible : true"
    v-show="destroyOnClose ? true : defaultvisible"
    class="layer-vue"
    :id="'layer-vue-' + id"
    :class="{ 'layer-vue-ismax': maxbtn, 'layer-vue-ismin': minbtn }"
    v-drag="{ getthis }"
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
      <slot></slot>
    </div>
  </div>
</template>
<script>
const t = "all 0.2s";
const n = "none";
const d = document;
const de = d.documentElement;
const v = {
  up: "onmouseup",
  move: "onmousemove",
  d: "onmousedown",
  add: "addEventListener",
  qs: "querySelector",
  on: "onclick",
  cw: "clientWidth",
  ch: "clientHeight",
  gid: "getElementById",
  ac: "appendChild",
};
const p = parseInt;
const c = {
  ismax: "layer-vue-ismax",
  ismin: "layer-vue-ismin",
  max: ".layer-vue-max",
  min: ".layer-vue-min",
  rz: ".layer-vue-resize",
  lbrz: ".layer-vue-lbresize",
};
export default {
  name: "LayerVue",
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
      id: Math.random() + Math.random(),
      model: undefined,
      display: undefined,
    };
  },
  props: {
    title: { type: [String, Boolean], default: "信息" },
    area: { type: [String, Array], default: "auto" },
    offset: { type: [String, Array, Number], default: "auto" },
    settop: { type: Boolean, default: false },
    moveOut: { type: Array, default: () => [0, 0, 0, 0] },
    visible: { visible: [Number, Boolean], default: true },
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
  computed: {
    contentheight: function () {
      return this.height - (this.title ? 42 : 0);
    },
  },
  watch: {
    visible: function (newvalue) {
      this.defaultvisible = newvalue;
    },
    defaultvisible: function (newvalue) {
      if (newvalue) {
        if (this.settop) {
          const zindex = this.$LayerOptions.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.$nextTick(() => {
          this.init();
          this.success && this.success(this);
        });
      } else {
        this.amininit();
      }
    },
  },
  created() {
    window[v.add]("resize", this.init);
    if (this.visible || this.visible === undefined) {
      if (this.settop) {
        const zindex = this.$LayerOptions.settop();
        this.zIndex = zindex;
      } else {
        this.zIndex = this.zindex;
      }
      this.success && this.success(this);
    }
  },
  mounted() {
    this.amininit();
    this.$nextTick(() => {
      if (this.content && this.content.component) {
        let instance = new this.content.component({
          parent: this.content.parent,
          propsData: this.content.data,
        });
        instance.vm = instance.$mount();
        this.$LayerOptions.instances[this.id].Vuecomponent = instance;
        document[v.gid]("layer-vue-" + this.id)
          [v.qs](".layer-vue-content")
          [v.ac](instance.vm.$el);
      }
      if (this.$refs.content.children.length) {
        this.display = this.$refs.content.children[0].style.display;
      }
      if (this.visible || this.visible === undefined) {
        if (this.settop) {
          const zindex = this.$LayerOptions.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.init();
      }
    });
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    // 动画初始化函数
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
    // 初始化函数
    init() {
      if (this.$refs.content.children.length) {
        if (this.display === "none" || getComputedStyle(this.$refs.content.children[0]).display === "none") {
          this.$refs.content.children[0].style.display = "block";
        }
      }
      this.transition = t;
      const { height, width } = this.areainit();
      const { x, y } = this.offsetinit(this.offset, width, height);
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    },
    // 高宽初始化函数
    areainit() {
      let height = 0;
      let width = 0;
      if (this.area instanceof Array) {
        width = this.tf(this.area[0], [v.cw]);
        if (this.area[1]) {
          height = this.tf(this.area[1], [v.ch]) + (this.title ? 42 : 0);
        } else {
          height = this.$refs.content ? this.$refs.content.scrollHeight : 0 + 42;
        }
      } else {
        if (this.area === "auto") {
          width = this.$refs.content ? this.$refs.content.scrollWidth : 0;
        } else {
          width = this.tf(this.area, [v.cw]);
        }
        height = this.$refs.content ? this.$refs.content.scrollHeight : 0 + 42;
      }
      if (width > de[v.cw] && de[v.cw] > this.minwidth) {
        width = de[v.cw];
      } else if (width <= this.minwidth) {
        width = this.minwidth;
      }
      if (height > de[v.ch] && de[v.ch] > this.minheight) {
        height = de[v.ch];
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
    // 偏移量初始化函数
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
          x = this.tf(offset[1], [v.cw]);
        } else {
          x = (de[v.cw] - width) * 0.5;
        }
        y = this.tf(offset[0], [v.ch]);
      } else if (typeof offset === "number") {
        y = offset;
        x = (de[v.cw] - width) * 0.5;
      } else if (offset.substr(-2).indexOf("px") === 0) {
        y = p(offset.slice(0, -2));
      } else if (offset.substr(-1).indexOf("%") === 0) {
        y = de[v.ch] * p(offset.slice(0, -1)) * 0.01;
      } else {
        switch (offset) {
          case "auto":
            x = (de[v.cw] - width) * 0.5;
            y = (de[v.ch] - height) * 0.5;
            break;
          case "t":
            x = (de[v.cw] - width) * 0.5;
            break;
          case "r":
            x = de[v.cw] - w;
            y = (de[v.ch] - height) * 0.5;
            break;
          case "b":
            x = (de[v.cw] - width) * 0.5;
            y = de[v.ch] - h;
            break;
          case "l":
            y = (de[v.ch] - height) * 0.5;
            break;
          case "lt":
            break;
          case "lb":
            y = de[v.ch] - h;
            break;
          case "rt":
            x = de[v.cw] - w;
            break;
          case "rb":
            x = de[v.cw] - w;
            y = de[v.ch] - h;
            break;
          default:
            x = (de[v.cw] - width) * 0.5;
            y = (de[v.ch] - height) * 0.5;
            break;
        }
      }

      if (isNaN(x)) {
        x = (de[v.cw] - width) * 0.5;
      }
      if (isNaN(y)) {
        y = (de[v.ch] - height) * 0.5;
      }
      return { x, y };
    },
    // 长度处理函数
    tf(value, client) {
      let name = 0;
      if (typeof value === "number") {
        name = value;
      } else if (value.substr(-2).indexOf("px") === 0) {
        name = p(value.slice(0, -2));
      } else if (value.substr(-1).indexOf("%") === 0) {
        name = de[client] * p(value.slice(0, -1)) * 0.01;
      } else {
        name = p(value);
      }
      return name;
    },
    // 关闭窗口函数
    closeLayer(el, appid = "app") {
      // 获取窗口DOM元素
      const layerDOM = d[v.gid]("layer-vue-" + this.id);
      const warn = () => console.log("[layer-warn]:No layer with id ：layer-vue-" + this.id + "found");
      // 判断当前layer窗口打开模式（true：以$layer.open()打开，false:以组件形式）
      if (this.model) {
        // 隐藏窗口
        this.defaultvisible = false;
        // this.visible=false
        // 窗口配置项，关闭后则为null
        const instances = this.$LayerOptions.instances[this.id];
        // 判断窗口配置项是否存在
        if (instances) {
          // 判断内容区是否是DOM
          if (instances.instance.ishtml) {
            // 判断窗口DOM元素是否存在
            if (layerDOM) {
              // 获取内容区外层DOM
              const content = layerDOM[v.qs](".layer-vue-content");
              // 判断内容区是否是新建DOM
              if (instances.instance.isnewDOM) {
                // 删除新建DOM
                content.removeChild(content.children[0]);
              } else {
                // 判断窗口父元素是否存在，以元素选择器获取的dom有缓存，需要以父元素判断其是否被删除
                if (layerDOM.parentNode) {
                  // 还原内容区位置
                  const parentDiv = layerDOM.parentNode;
                  content.children[0].style.display = this.display;
                  parentDiv.insertBefore(content.children[0], layerDOM);
                  parentDiv.removeChild(layerDOM);
                  delete this.$LayerOptions.instances[this.id];
                  // 销毁窗口回调
                  this.end && this.end();
                } else {
                  // 窗口不存在或已经关闭
                  warn();
                }
                return;
              }
            } else {
              // 窗口不存在或已经关闭
              warn();
              return;
            }
            // 判断子组件是否存在
          } else if (instances.Vuecomponent) {
            // destroyOnClose为真 卸载子组件
            if (this.destroyOnClose) {
              instances.Vuecomponent.$destroy();
            } else {
              // 隐藏窗口
              this.defaultvisible = false;
              this.cancel && this.cancel();
              return;
            }
          }
        }
        let node = d.body;
        // 判断#app是否存在
        if (d[v.gid](appid)) {
          node = d[v.gid](appid);
        }
        // 判断layer窗口是否存在
        if (layerDOM) {
          // 删除layerDOM
          node.removeChild(layerDOM);
          delete this.$LayerOptions.instances[this.id];
          this.end && this.end();
        } else {
          warn();
        }
      }
      // 静态组件模式
      else {
        // 隐藏窗口
        this.defaultvisible = false;
        // 若传入了visible，则更新visible为false
        if (this.visible) {
          this.$emit("update:visible", false);
        }
        // 执行回调
        if (this.destroyOnClose) {
          this.end && this.end();
        } else {
          this.cancel && this.cancel();
        }
      }
    },
    getthis() {
      return this;
    },
  },
};
export { c, p, v, d, de, n, t };
</script>
