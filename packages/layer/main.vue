<template>
  <div
    v-cloak
    οndragstart="return false;"
    :data-id="id"
    v-if="destroyOnClose ? (visible === undefined ? defaultvisible : visible) : true"
    v-show="visible === undefined ? defaultvisible : visible"
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
  name: "SuiLayer",
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
    };
  },
  props: {
    title: { type: [String, Boolean], default: "信息" },
    area: { type: [String, Array], default: "auto" },
    offset: { type: [String, Array, Number], default: "auto" },
    settop: { type: Boolean, default: false },
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
  computed: {
    contentheight: function () {
      return this.height - (this.title ? 42 : 0);
    },
  },
  watch: {
    visible: function (newvalue) {
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
      let display = "";
      if (this.content && this.content.component) {
        let instance = new this.content.component({
          parent: this.content.parent,
          propsData: this.content.data,
        });
        instance.vm = instance.$mount();
        document[v.gid]("layer-vue-" + this.id)
          [v.qs](".layer-vue-content")
          [v.ac](instance.vm.$el);
      }

      if (this.$refs.content.children.length) {
        display = this.$refs.content.children[0].style.display;
        this.$refs.content.children[0].style.display = "none";
      }
      if (this.visible || this.visible === undefined) {
        this.init();
        if (this.$refs.content.children.length) {
          this.$refs.content.children[0].style.display = display;
        }
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
      this.transition = t;
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
        width = this.Transformation(this.area[0], [v.cw]);
        if (this.area[1]) {
          height = this.Transformation(this.area[1], [v.ch]) + (this.title ? 42 : 0);
        } else {
          height = this.$refs.content ? this.$refs.content.scrollHeight : 0 + 42;
        }
      } else {
        if (this.area === "auto") {
          width = this.$refs.content ? this.$refs.content.scrollWidth : 0;
        } else {
          width = this.Transformation(this.area, [v.cw]);
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
          x = this.Transformation(offset[1], [v.cw]);
        } else {
          x = (de[v.cw] - width) * 0.5;
        }
        y = this.Transformation(offset[0], [v.ch]);
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
    Transformation(value, client) {
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
    closeLayer(appid = "app") {
      if (this.model) {
        this.defaultvisible = false;
        this.amininit();
      } else {
        this.$emit("update:visible", false);
        if (this.destroyOnClose) {
          this.end && this.end();
        } else {
          this.cancel && this.cancel();
        }
      }
      const instances = this.$LayerOptions.instances[this.id];
      if (instances) {
        if (instances.Vuecomponent) {
          instances.Vuecomponent.$destroy();
        }
        if (instances.instance.ishtml && d[v.gid]("layer-vue-" + this.id)) {
          let parentDiv = d[v.gid]("layer-vue-" + this.id).parentNode;
          parentDiv.insertBefore(d[v.qs]('[data-id="' + this.id + '"]')[v.qs](".layer-vue-content").children[0], d[v.gid]("layer-vue-" + this.id));
        }
      }
      let node = d.body;
      if (d[v.gid](appid)) {
        node = d[v.gid](appid);
      }
      if (d[v.gid]("layer-vue-" + this.id)) {
        node.removeChild(d[v.gid]("layer-vue-" + this.id));
        delete this.$LayerOptions.instances[this.id];
      } else {
        console.warn("[layer-warn]:未找到id为：layer-vue-" + this.id + " 的layer窗口");
      }
    },
    getthis() {
      return this;
    },
  },
};
export { c, p, v, d, de, n, t };
</script>
