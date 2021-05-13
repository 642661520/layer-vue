<template>
  <div
    v-cloak
    οndragstart="return false;"
    :data-index="index"
    v-if="destroyOnClose ? defvisible : true"
    v-show="destroyOnClose ? true : defvisible"
    class="layer-vue"
    :id="'layer-vue-' + index"
    :class="{ 'layer-vue-ismax': maxbtn, 'layer-vue-ismin': minbtn }"
    v-layer="{ getthis }"
    :style="{
      '--mch': this.defskin.maxmin.colorHover,
      '--cch': this.defskin.close.colorHover,
      '--mbch': this.defskin.maxmin.backgroundColorHover,
      '--cbch': this.defskin.close.backgroundColorHover,
      'background-color': this.defskin.title.backgroundColor,
      'box-shadow': '1px 1px 50px ' + this.defskin.shadowColor,
      width: width + 'px',
      height: height + 'px',
      transform: 'translate(' + x + 'px,' + y + 'px)',
      'z-index': zIndex,
      transition: transition,
    }"
  >
    <div
      v-if="title !== false"
      class="layer-vue-title"
      :title="title"
      :style="{
        'background-color': this.defskin.title.backgroundColor,
        color: this.defskin.title.color,
        'border-bottom': '1px solid ' + this.defskin.title.borderColor,
        height: titleheight + 'px',
        'line-height': titleheight + 'px',
      }"
    >
      {{ title }}
    </div>
    <div class="layer-vue-tools" :style="{ height: titleheight + 'px', 'line-height': titleheight + 'px' }">
      <span v-show="maxmin[1]" class="layer-vue-min"><i class="iconfont" :class="{ 'icon-min': !minbtn, 'icon-restore': minbtn }"></i></span>
      <span v-show="maxmin[0] && !minbtn" class="layer-vue-max"><i class="iconfont" :class="{ 'icon-max': !maxbtn, 'icon-restore': maxbtn }"></i></span>
      <span v-show="closeBtn" class="layer-vue-close" @click="close"><i class="iconfont icon-close"></i></span>
    </div>
    <div v-if="resize[0]" class="layer-vue-resize"></div>
    <div v-if="resize[1]" class="layer-vue-lbresize"></div>
    <div
      ref="content"
      class="layer-vue-content"
      :style="{
        'background-color': this.defskin.content.backgroundColor,
        color: this.defskin.content.color,
        height: contentheight + 'px',
        overflow: overflow,
        transition: transition,
      }"
    >
      <slot>{{ !model ? content : null }}</slot>
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
  pn: "parentNode",
};
const p = parseInt;
const c = {
  ismax: "layer-vue-ismax",
  ismin: "layer-vue-ismin",
  max: ".layer-vue-max",
  min: ".layer-vue-min",
  rz: ".layer-vue-resize",
  lbrz: ".layer-vue-lbresize",
  p: "prototype",
  l: "$layer",
  c: "content",
  t: "component",
};
const merge = (options, def) => {
  for (let key in def) {
    if (options[key] === undefined) {
      options[key] = def[key];
    } else if (typeof options[key] === "object") {
      merge(options[key], def[key]);
    }
  }
  return options;
};

export default {
  name: "LayerVue",
  data() {
    return {
      // 默认开启
      defvisible: true,
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
      transition: n,
      overflow: "hidden",
      index: 0,
      model: undefined,
      display: undefined,
      defskin: {},
      initdata: { x: 0, y: 0, width: 300, height: 200 },
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
    resize: { type: Array, default: () => [1, 1] },
    moveEnd: { type: Function },
    move: { type: [String, Boolean], default: ".layer-vue-title" },
    cancel: { type: Function },
    success: { type: Function },
    end: { type: Function },
    full: { type: Function },
    min: { type: Function },
    restore: { type: Function },
    resizing: { type: Function },
    resizeEnd: { type: Function },
    destroyOnClose: { type: [Number, Boolean], default: false },
    amin: { type: Number, default: 0 },
    content: {},
    titleheight: { type: Number, default: 42 },
    skin: { type: Object },
    id: { default: undefined },
    reset: { typeof: Boolean },
    el: {},
  },
  computed: {
    contentheight: function () {
      return this.height - (this.title ? this.titleheight : 0);
    },
  },
  watch: {
    visible: function (newvalue) {
      this.defvisible = newvalue;
    },
    defvisible: function (newvalue) {
      if (newvalue) {
        if (this.settop) {
          const zindex = this[c.l].o.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.$nextTick(() => {
          this.init();
          this.success && this.success();
        });
      } else {
        this.amininit();
      }
    },
    reset: function () {
      this.resetfun();
    },
  },
  created() {
    if (!this.visible) {
      this.defvisible = this.visible;
    }
    console.log(this.destroyOnClose);
    this.defskin = this[c.l].o.skin;
    window[v.add]("resize", this.resizefun);
    if (this.visible || this.visible === undefined) {
      if (this.settop) {
        const zindex = this[c.l].o.settop();
        this.zIndex = zindex;
      } else {
        this.zIndex = this.zindex;
      }
    }
  },
  mounted() {
    if (!this.model) {
      console.log(this.$layer.o.instances);
      this.index = this.$layer.o.instances.length;
      this.$layer.o.instances.push({ index: this.index, instance: this });
    }
    if (this.skin) {
      this.defskin = merge(this.skin, this.defskin);
    }
    this.amininit();
    this.$nextTick(() => {
      if (this[c.c] && this[c.c][c.t]) {
        let instance = new this[c.c][c.t]({
          parent: this[c.c].parent,
          propsData: this[c.c].data,
        });
        instance.vm = instance.$mount();
        this[c.l].o.instances[this.index].Vuecomponent = instance;
        document[v.gid]("layer-vue-" + this.index)
          [v.qs](".layer-vue-content")
          [v.ac](instance.vm.$el);
      }
      try {
        if (this.$refs[c.c].children.length) {
            this.display = this.$refs[c.c].children[0].style.display;
          }
      } catch (error) {
        console.log('[layer warn]:not find children');
      }
      if (this.visible || this.visible === undefined) {
        if (this.settop) {
          const zindex = this[c.l].o.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.init();
        this.success && this.success();
      }
    });
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    window.removeEventListener("resize", this.resizefun);
  },
  methods: {
    resizefun() {
      if (this.maxbtn) {
        this.width = de[v.cw];
        return;
      }
      if (this.x + this.width >= de[v.cw]) {
        this.x = de[v.cw] - this.width;
      }
      if (this.x <= 0) {
        this.x = 0;
      }
      if (this.minbtn) {
        this.y = de[v.ch] - this.height;
        return;
      }
      if (this.y + this.height >= de[v.ch]) {
        this.y = de[v.ch] - this.height;
      }
      if (this.y <= 0) {
        this.y = 0;
      }
      if (this.resize[0] || this.resize[1]) {
        if (this.width >= de[v.cw]) {
          this.width = de[v.cw];
        }
        if (this.width <= this.minwidth) {
          this.width = this.minwidth;
        }
        if (this.height >= de[v.ch]) {
          this.height = de[v.ch];
        }
        if (this.height <= this.minheight) {
          this.height = this.minheight;
        }
      }
    },
    resetfun() {
      this.x = this.initdata.x;
      this.y = this.initdata.y;
      this.width = this.initdata.width;
      this.height = this.initdata.height;
    },
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
      this.maxbtn = false;
      this.minbtn = false;
      if (this.$refs[c.c].children.length) {
        if (this.display === "none" || getComputedStyle(this.$refs[c.c].children[0]).display === "none") {
          this.$refs[c.c].children[0].style.display = "block";
        }
      }
      this.transition = t;
      const { height, width } = this.areainit();
      const { x, y } = this.offsetinit(this.offset, width, height);
      this.initdata = { width, height, x, y };
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
          height = this.tf(this.area[1], [v.ch]) + (this.title ? this.titleheight : 0);
        } else {
          height = this.$refs[c.c] ? this.$refs[c.c].scrollHeight : 0 + this.titleheight;
        }
      } else {
        if (this.area === "auto") {
          width = this.$refs[c.c] ? this.$refs[c.c].scrollWidth : 0;
        } else {
          width = this.tf(this.area, [v.cw]);
        }
        height = this.$refs[c.c] ? this.$refs[c.c].scrollHeight : 0 + this.titleheight;
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
    close() {
      console.log(this.el);
      console.log(this.index);

      // 隐藏窗口
      this.defvisible = false;
      if (!this.model) {
        // 若传入了visible，则更新visible为false
        if (this.visible) {
          this.$emit("update:visible", false);
        }
      }
      this.cancel && this.cancel();
      if (!this.destroyOnClose) {
        return;
      }
      // 获取窗口DOM元素
      const layerDOM = d[v.gid]("layer-vue-" + this.index);
      const warn = () => console.log("[layer-warn]:No layer with id ：layer-vue-" + this.index + "found");
      // 判断当前layer窗口打开模式（true：以$layer.open()打开，false:以组件形式）
      if (this.model) {
        // this.visible=false
        // 窗口配置项，关闭后则为null
        const instances = this[c.l].o.instances[this.index];
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
                // 判断窗口父元素是否存在
                if (layerDOM[v.pn]) {
                  // 还原内容区位置
                  const parentDiv = layerDOM[v.pn];
                  content.children[0].style.display = this.display;
                  parentDiv.insertBefore(content.children[0], layerDOM);
                  parentDiv.removeChild(layerDOM);
                  this.$destroy();
                  delete this[c.l].o.instances[this.index];
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
            instances.Vuecomponent.$destroy();
          }
        }
        let node = d.body;
        // 判断#app是否存在
        if (d[v.qs](this.el)) {
          node = d[v.qs](this.el);
        }
        // 判断layer窗口是否存在
        if (layerDOM) {
          // 删除layerDOM
          console.log(node);

          node.removeChild(layerDOM);
          this.$destroy();
          delete this[c.l].o.instances[this.index];
        } else {
          warn();
          return;
        }
      }
      this.end && this.end();
    },
    getthis() {
      return this;
    },
  },
};
export { c, p, v, d, de, n, t, merge };
</script>
