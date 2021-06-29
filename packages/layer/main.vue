<template>
  <div
    v-cloak
    v-if="destroyOnClose ? defvisible : true"
    οndragstart="return false;"
    :data-index="index"
    :data-anim="anim"
    :data-id="id"
    class="layer-vue"
    :id="'layer-vue-' + index"
    :data-skin="typeof defskin === 'string' ? defskin : ''"
    :class="{ 'layer-vue-ismax': maxbtn, 'layer-vue-ismin': minbtn, startanim: defvisible, endanim: isOutAnim && (!visible || endanim) }"
    :style="{
      '--mch': defskin.maxmin ? defskin.maxmin.colorHover : '',
      '--cch': defskin.close ? defskin.close.colorHover : '',
      '--mbch': defskin.maxmin ? defskin.maxmin.backgroundHover : '',
      '--cbch': defskin.close ? defskin.close.backgroundHover : '',
      'box-shadow': defskin.boxShadow,
      background: defskin.background,
      width: width + 'px',
      height: height + 'px',
      top: y + 'px',
      left: x + 'px',
      'z-index': zIndex,
      display: defvisible ? '' : 'none',
      position: fixed ? 'fixed' : 'absolute',
    }"
    @mousedown="settopfun"
  >
    <div
      v-if="deftitle"
      class="layer-vue-title"
      :style="{
        background: defskin.title ? defskin.title.background : '',
        color: defskin.title ? defskin.title.color : '',
        'border-bottom': defskin.title ? defskin.title.borderBottom : '',
        height: titleheight + 'px',
        'line-height': titleheight + 'px',
      }"
      @mousedown="minmovefun"
    >
      <div class="layer-vue-title-text" :title="deftitle" :style="{ width: textwidth + 'px' }">{{ deftitle }}</div>
      <div class="layer-vue-tools" :style="{ height: titleheight + 'px', 'line-height': titleheight + 'px' }">
        <span v-show="maxmin[1]" class="layer-vue-min" @click="minfun">
          <svg v-show="!minbtn" t="1623989554257" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2299" width="16" height="16">
            <path d="M128 512h768a25.6 25.6 0 1 1 0 51.2h-768a25.6 25.6 0 1 1 0-51.2z" p-id="2300"></path>
          </svg>
          <svg v-show="minbtn" t="1623989831113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2537" width="16" height="16">
            <path
              d="M959.72 0H294.216a63.96 63.96 0 0 0-63.96 63.96v127.92H64.28A63.96 63.96 0 0 0 0.32 255.84V959.4a63.96 63.96 0 0 0 63.96 63.96h703.56a63.96 63.96 0 0 0 63.96-63.96V792.465h127.92a63.96 63.96 0 0 0 63.96-63.96V63.96A63.96 63.96 0 0 0 959.72 0zM767.84 728.505V959.4H64.28V255.84h703.56z m189.322 0H831.8V255.84a63.96 63.96 0 0 0-63.96-63.96H294.216V63.96H959.72z"
              p-id="2538"
            ></path>
          </svg>
        </span>
        <span v-show="maxmin[0] && !minbtn" class="layer-vue-max" @click="maxfun">
          <svg v-show="!maxbtn" t="1623988846084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1720" width="16" height="16">
            <path
              d="M918.14912 546.53952l0 282.50112c0 48.85504-39.76192 88.59648-88.6272 88.59648l-634.9824 0c-48.87552 0-88.63744-39.74144-88.63744-88.59648L105.90208 194.74432c0-48.85504 39.76192-88.60672 88.63744-88.60672L477.7984 106.1376c-15.24736 15.64672-25.38496 36.29056-27.60704 59.22816L194.52928 165.36576c-16.20992 0-29.39904 13.17888-29.39904 29.37856l0 634.29632c0 16.18944 13.18912 29.36832 29.39904 29.36832l634.9824 0c16.20992 0 29.39904-13.17888 29.39904-29.36832L858.91072 574.1056C881.2032 571.96544 901.888 562.37056 918.14912 546.53952zM573.93152 188.90752l193.6384 0L454.13376 502.35392c-17.34656 17.34656-17.34656 45.47584 0 62.8224 17.34656 17.34656 45.47584 17.34656 62.8224 0.01024l313.43616-313.4464 0 193.64864c0 24.53504 19.88608 44.42112 44.42112 44.42112 12.26752 0 23.37792-4.95616 31.41632-13.0048 8.0384-8.05888 13.01504-19.1488 13.01504-31.41632L919.2448 144.47616c0-24.53504-19.88608-44.42112-44.42112-44.42112L573.93152 100.05504c-24.53504 0-44.42112 19.88608-44.42112 44.43136C529.50016 169.02144 549.39648 188.90752 573.93152 188.90752z"
              p-id="1721"
            ></path>
          </svg>
          <svg v-show="maxbtn" t="1623989831113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2537" width="16" height="16">
            <path
              d="M959.72 0H294.216a63.96 63.96 0 0 0-63.96 63.96v127.92H64.28A63.96 63.96 0 0 0 0.32 255.84V959.4a63.96 63.96 0 0 0 63.96 63.96h703.56a63.96 63.96 0 0 0 63.96-63.96V792.465h127.92a63.96 63.96 0 0 0 63.96-63.96V63.96A63.96 63.96 0 0 0 959.72 0zM767.84 728.505V959.4H64.28V255.84h703.56z m189.322 0H831.8V255.84a63.96 63.96 0 0 0-63.96-63.96H294.216V63.96H959.72z"
              p-id="2538"
            ></path>
          </svg>
        </span>
        <span v-show="closeBtn" class="layer-vue-close" @click="closefun">
          <svg t="1623989504811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="16" height="16">
            <path
              d="M563.3 509l352.3-352.3c13.9-13.9 13.9-36.4 0-50.3-13.9-13.9-36.4-13.9-50.3 0L513 458.7 160.7 106.4c-13.9-13.9-36.4-13.9-50.3 0-13.9 13.9-13.9 36.4 0 50.3L462.7 509 110.4 861.3c-13.9 13.9-13.9 36.4 0 50.3 6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4L513 559.3l352.3 352.3c6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4c13.9-13.9 13.9-36.4 0-50.3L563.3 509z"
              p-id="2062"
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <span v-show="closeBtn && !title" :class="{ 'layer-vue-close2': !title }" @click="closefun">
      <svg t="1623989504811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="16" height="16">
        <path
          d="M563.3 509l352.3-352.3c13.9-13.9 13.9-36.4 0-50.3-13.9-13.9-36.4-13.9-50.3 0L513 458.7 160.7 106.4c-13.9-13.9-36.4-13.9-50.3 0-13.9 13.9-13.9 36.4 0 50.3L462.7 509 110.4 861.3c-13.9 13.9-13.9 36.4 0 50.3 6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4L513 559.3l352.3 352.3c6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4c13.9-13.9 13.9-36.4 0-50.3L563.3 509z"
          p-id="2062"
        ></path>
      </svg>
    </span>
    <div v-if="resize[0] && !maxbtn" class="layer-vue-resize" @mousedown="rbresizefun"></div>
    <div v-if="resize[1] && !maxbtn" class="layer-vue-lbresize" @mousedown="lbresizefun"></div>
    <div
      ref="content"
      class="layer-vue-content"
      :style="{
        'border-radius': title ? '0 0 2px 2px' : '2px',
        background: defskin.content ? defskin.content.background : '',
        color: defskin.content ? defskin.content.color : '',
        height: contentheight + 'px',
      }"
    >
      <slot>{{ !model ? content : null }}</slot>
    </div>
  </div>
</template>
<script>
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
  // TODO 添加isMax,初始化时全屏显示，多一种方式全屏 √
  // TODO 组件如何使用全局方法(index/id) full,min,restore openAgain √
  // TODO 方法下 title content 可修改 非直接响应 √
  // TODO bug修复：reset window.resizing √
  // TODO 修改高度计算，修改skin borderColor->borderBottom √
  // TODO 优化 删除自定义指令
  name: "LayerVue",
  data() {
    return {
      // 默认开启
      defvisible: true,
      endanim: false,
      // 最大化按钮
      maxbtn: false,
      minbtn: false,
      // 最小宽度
      minwidth: 300,
      // 最小高度
      minheight: 200,
      // left
      x: 0,
      // top
      y: 0,
      width: 0,
      height: 0,
      zIndex: 1,
      // 序号
      index: undefined,
      // 模式
      model: undefined,
      // display
      display: undefined,
      // 皮肤
      defskin: {},
      // 用于记录初始状态
      initdata: { x: 0, y: 0, width: 300, height: 200 },
      defborderwidth: 0,
      l: {},
      deftitle: undefined,
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
    move: { type: [String, Boolean], default: ".layer-vue-title-text" },
    cancel: { type: Function },
    success: { type: Function },
    end: { type: Function },
    full: { type: Function },
    min: { type: Function },
    restore: { type: Function },
    resizing: { type: Function },
    resizeEnd: { type: Function },
    destroyOnClose: { type: [Number, Boolean], default: false },
    anim: { type: Number, default: 1 },
    content: {},
    titleheight: { type: Number, default: 42 },
    skin: { type: [Object, String] },
    id: { type: String, default: undefined },
    reset: { type: Boolean },
    el: {},
    fixed: { type: Boolean, default: true },
    minarea: { type: [Number, Array], default: () => [300, 200] },
    isOutAnim: { type: [Boolean, Number], default: true },
    boderwidth: { type: Number, default: 0 },
    isMax: { type: Boolean, default: false },
    shape: { type: Array, default: () => [0, 0] },
  },
  computed: {
    contentheight: function () {
      let h = this.height - (this.title ? this.titleheight : 0);
      if (this.boderwidth <= 0) {
        if (typeof this.skin === "string") {
          this.defborderwidth = 3;
        } else {
          this.defborderwidth = 0;
        }
      }
      h = h - this.defborderwidth * 2;
      h <= 0 ? (h = 0) : null;
      return h;
    },
    textwidth: function () {
      return this.width - ((this.maxmin[0] ? 35 : 0) + (this.maxmin[1] ? 35 : 0) + 50);
    },
  },
  watch: {
    visible: function (newvalue) {
      if (this.anim) {
        setTimeout(() => {
          this.defvisible = newvalue;
        }, 300);
      } else {
        this.defvisible = newvalue;
      }
    },
    defvisible: function (newvalue) {
      if (newvalue) {
        if (this.settop) {
          const zindex = this.$layer.o.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.$nextTick(() => {
          this.endanim = false;
          this.init();
          this.success && this.success(this.$el, this.index, this.id);
        });
      }
    },
    reset: function () {
      this.resetfun();
    },
    isMax: function (newvalue) {
      if (newvalue !== this.maxbtn && this.$el.querySelector(this.move)) {
        this.maxfun();
      }
    },
    minbtn: function (newvalue) {
      if (this.move != ".layer-vue-title-text") {
        if (newvalue) {
          this.$el.querySelector(".layer-vue-title-text").style.cursor = "move";
        } else {
          this.$el.querySelector(".layer-vue-title-text").style.cursor = "";
        }
      }
    },
  },
  created() {
    if (!this.visible) {
      this.defvisible = this.visible;
    }
    this.deftitle = this.title;
    this.defskin = this.$layer.o.skin;
    window.addEventListener("resize", this.resizefun);
    if (this.visible || this.visible === undefined) {
      if (this.settop) {
        const zindex = this.$layer.o.settop();
        this.zIndex = zindex;
      } else {
        this.zIndex = this.zindex;
      }
    }
  },
  mounted() {
    const { width, height } = this.minareainit();
    this.minwidth = width;
    this.minheight = height;
    if (!this.model) {
      this.index = this.$layer.o.instances.length;
      this.$layer.o.instances.push({ instance: this });
    }
    if (typeof this.skin === "object") {
      if (typeof this.defskin === "object") {
        this.defskin = merge(this.skin, this.defskin);
      } else {
        if (this.borderwidth) this.borderwidth = 3;
      }
    } else if (typeof this.skin === "string") {
      this.defskin = this.skin;
    }
    this.$nextTick(() => {
      if (this.content && this.content.component) {
        let instance = new this.content.component({
          parent: this,
          propsData: this.content.data,
        });
        instance.vm = instance.$mount();
        this.$layer.o.instances[this.index].Vuecomponent = instance;
        document
          .getElementById("layer-vue-" + this.index)
          .querySelector(".layer-vue-content")
          .appendChild(instance.vm.$el);
      }
      try {
        if (this.$refs.content.children.length) {
          this.display = this.$refs.content.children[0].style.display;
        }
      } catch (error) {
        this.$layer.o.log && console.warn("[layer warn]:not find children");
      }
      if (this.visible || this.visible === undefined) {
        if (this.settop) {
          const zindex = this.$layer.o.settop();
          this.zIndex = zindex;
        } else {
          this.zIndex = this.zindex;
        }
        this.init();
        this.success && this.success(this.$el, this.index, this.id);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
  },
  methods: {
    minmovefun(e1) {
      e1.preventDefault();
      if (this.minbtn && this.move != ".layer-vue-title-text") {
        const { x } = this;
        let clientX = e1.clientX;
        document.onmousemove = (e2) => {
          e2.preventDefault();
          let moveX = e2.clientX - clientX;
          let newX = parseInt(x) + parseInt(moveX);
          if (!parseInt(this.moveOut[3]) && newX <= 0) {
            newX = 0;
          }
          if (!parseInt(this.moveOut[1]) && newX >= document.documentElement.clientWidth - this.minwidth) {
            newX = document.documentElement.clientWidth - this.minwidth;
          }
          this.x = newX;
        };
        this.f();
      }
    },
    resizefun() {
      if (this.maxbtn) {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        return;
      }
      if (this.x + this.width >= document.documentElement.clientWidth) {
        this.x = document.documentElement.clientWidth - this.width;
      }
      if (this.x <= 0) {
        this.x = 0;
      }
      if (this.minbtn) {
        this.y = document.documentElement.clientHeight - this.height;
        return;
      }
      if (this.y + this.height >= document.documentElement.clientHeight) {
        this.y = document.documentElement.clientHeight - this.height;
      }
      if (this.y <= 0) {
        this.y = 0;
      }
      if (this.resize[0] || this.resize[1]) {
        if (this.width >= document.documentElement.clientWidth) {
          this.width = document.documentElement.clientWidth;
        }
        if (this.width <= this.minwidth) {
          this.width = this.minwidth;
        }
        if (this.height >= document.documentElement.clientHeight) {
          this.height = document.documentElement.clientHeight;
        }
        if (this.height <= this.minheight) {
          this.height = this.minheight;
        }
      }
    },
    resetfun() {
      this.maxbtn = false;
      this.minbtn = false;
      this.x = this.initdata.x;
      this.y = this.initdata.y;
      this.width = this.initdata.width;
      this.height = this.initdata.height;
    },
    // 初始化函数
    init() {
      this.maxbtn = false;
      this.minbtn = false;
      if (this.$refs.content.children.length) {
        if (this.display === "none" || getComputedStyle(this.$refs.content.children[0]).display === "none") {
          this.$refs.content.children[0].style.display = "block";
        }
      }
      const { height, width } = this.areainit();
      const { x, y } = this.offsetinit(this.offset, width, height);
      this.initdata = { width, height, x, y };
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.movefun(this.move);
      if (this.isMax) {
        this.maxfun();
      }
    },
    minareainit() {
      let width = 0;
      let height = 0;
      if (this.minarea instanceof Array) {
        width = this.minarea[0];
        height = this.minarea[1];
        height = +height;
        width = +width;
        if (isNaN(height)) {
          height = 200;
        }
        if (isNaN(width)) {
          width = 300;
        }
      } else {
        width = 300;
        height = 200;
      }
      return { height, width };
    },
    // 高宽初始化函数
    areainit() {
      let height = 0;
      let width = 0;
      let children = false;
      if (this.area instanceof Array) {
        width = this.tf(this.area[0], "clientWidth");
        if (this.$refs.content && this.$refs.content.children && this.$refs.content.children.length > 0) {
          children = true;
        }
        if (this.area[1]) {
          height = this.tf(this.area[1], "clientHeight");
        } else {
          height = children ? this.$refs.content.children[0].scrollHeight : 0;
        }
      } else {
        if (this.area === "auto") {
          width = children ? this.$refs.content.children[0].scrollWidth : 0;
        } else {
          width = this.tf(this.area, "clientWidth");
        }
        height = children ? this.$refs.content.children[0].scrollHeight : 0;
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
    // 偏移量初始化函数
    offsetinit(offset, width, height, anim = -1) {
      let x = 0;
      let y = 0;
      let w = width;
      let h = height;
      if (anim === 0) {
        x = width * 0.5;
        y = height * 0.5;
        width = 0;
        height = 0;
      }
      if (offset instanceof Array) {
        if (offset[1]) {
          x = this.tf(offset[1], "clientWidth");
        } else {
          x = (document.documentElement.clientWidth - width) * 0.5;
        }
        y = this.tf(offset[0], "clientHeight");
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
          default:
            x = (document.documentElement.clientWidth - width) * 0.5;
            y = (document.documentElement.clientHeight - height) * 0.5;
            break;
        }
      }

      if (isNaN(x)) {
        x = (document.documentElement.clientWidth - width) * 0.5;
      }
      if (isNaN(y)) {
        y = (document.documentElement.clientHeight - height) * 0.5;
      }
      return { x, y };
    },
    // 长度处理函数
    tf(value, client) {
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
    close() {
      // 隐藏窗口
      if (!this.defvisible) {
        this.$layer.o.log && console.warn("[layer-warn]layer-vue-" + this.index + " is closed");
        return false;
      }
      this.defvisible = false;
      if (!this.model) {
        // 若传入了visible，则更新visible为false
        if (this.visible) {
          this.$emit("update:visible", false);
        }
      }
      this.cancel && this.cancel(this.$el, this.index, this.id);
      if (!this.destroyOnClose) {
        return true;
      }
      // 获取窗口DOM元素
      const layerDOM = document.getElementById("layer-vue-" + this.index);
      const warn = () => console.warn("[layer-warn]:No layer with id ：layer-vue-" + this.index + "found");
      // 判断当前layer窗口打开模式（true：以$layer.open()打开，false:以组件形式）
      if (this.model) {
        // this.visible=false
        // 窗口配置项，关闭后则为null
        const instances = this.$layer.o.instances[this.index];
        // 判断窗口配置项是否存在
        if (instances) {
          // 判断内容区是否是DOM
          if (instances.instance._ishtml) {
            // 判断窗口DOM元素是否存在
            if (layerDOM) {
              // 获取内容区外层DOM
              const content = layerDOM.querySelector(".layer-vue-content");
              // 判断内容区是否是新建DOM
              if (instances.instance._isnewDOM) {
                // 删除新建DOM
                content.removeChild(content.children[0]);
              } else {
                // 判断窗口父元素是否存在
                if (layerDOM.parentNode) {
                  // 还原内容区位置
                  const parentDiv = layerDOM.parentNode;
                  content.children[0].style.display = this.display;
                  parentDiv.insertBefore(content.children[0], layerDOM);
                  parentDiv.removeChild(layerDOM);
                  this.$destroy();
                  delete this.$layer.o.instances[this.index];
                  // 销毁窗口回调
                  this.end && this.end(this.$el, this.index, this.id);
                } else {
                  // 窗口不存在或已经关闭
                  this.$layer.o.log && warn();
                  return false;
                }
                return true;
              }
            } else {
              // 窗口不存在或已经关闭
              this.$layer.o.log && warn();
              return false;
            }
            // 判断子组件是否存在
          } else if (instances.Vuecomponent) {
            instances.Vuecomponent.$destroy();
          }
        }
        let node = document.body;
        // 判断#app是否存在
        if (document.querySelector(this.el)) {
          node = document.querySelector(this.el);
        }
        // 判断layer窗口是否存在
        if (layerDOM) {
          // 删除layerDOM
          node.removeChild(layerDOM);
          this.$destroy();
          delete this.$layer.o.instances[this.index];
        } else {
          this.$layer.o.log && warn();
          return false;
        }
      }
      this.end && this.end(this.$el, this.index, this.id);
      return true;
    },
    closefun() {
      return new Promise((res, rej) => {
        if (this.anim && this.isOutAnim) {
          this.endanim = true;
          setTimeout(() => {
            let result = this.close();
            res(result);
          }, 300);
        } else {
          let result = this.close();
          res(result);
        }
      });
    },
    maxfun() {
      this.maxbtn = !this.maxbtn;
      this.$emit("update:isMax", this.maxbtn);

      if (this.maxbtn) {
        if (this.move && this.$el.querySelector(this.move)) {
          this.$el.querySelector(this.move).style.cursor = "not-allowed";
        }
        if (this.minbtn) {
          this.minbtn = false;
        } else {
          this.l.x = this.x;
          this.l.y = this.y;
          this.l.width = this.width;
          this.l.height = this.height;
        }
        this.x = 0;
        this.y = 0;
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.full && this.full(this.$el, this.index, this.id);
      } else {
        this.x = this.l.x;
        this.y = this.l.y;
        this.width = this.l.width;
        this.height = this.l.height;
        this.restore && this.restore(this.$el, this.index, this.id);
        if (this.move && this.$el.querySelector(this.move)) {
          this.$el.querySelector(this.move).style.cursor = "move";
        }
      }
    },
    minfun() {
      this.minbtn = !this.minbtn;
      if (this.minbtn) {
        if (this.move && this.$el.querySelector(this.move)) {
          this.$el.querySelector(this.move).style.cursor = "move";
        }
        if (this.maxbtn) {
          this.maxbtn = false;
        } else {
          this.l.x = this.x;
          this.l.y = this.y;
          this.l.width = this.width;
          this.l.height = this.height;
        }
        this.x = this.l.x;
        this.y = document.documentElement.clientHeight - this.titleheight;
        this.height = this.titleheight;
        this.width = 200;
        this.min && this.min(this.$el, this.index, this.id);
      } else {
        this.x = this.l.x;
        this.y = this.l.y;
        this.width = this.l.width;
        this.height = this.l.height;
        this.restore && this.restore(this.$el, this.index, this.id);
      }
    },
    settopfun() {
      if (this.settop) {
        this.zIndex = this.$layer.o.settop();
      }
    },
    f(callback) {
      document.onmouseup = (e) => {
        e.preventDefault();
        callback && callback(this.$el, this.index, this.id);
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    lbresizefun(e1) {
      e1.preventDefault();
      const { minwidth, minheight, width, height, x } = this;
      const clientX = e1.clientX;
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        let moveY = e2.clientY - clientY;
        this.l.width = parseInt(width) - parseInt(moveX);
        this.l.height = parseInt(height) + parseInt(moveY);
        let newX = parseInt(x) + parseInt(moveX);
        if (this.l.width <= minwidth) {
          this.l.width = minwidth;
        }
        if (this.l.width + newX >= x + width) {
          newX = x + width - this.l.width;
        }
        if (this.l.height <= minheight) {
          this.l.height = minheight;
        }
        if (!parseInt(this.moveOut[3]) && newX <= 0) {
          newX = 0;
          this.l.width = x + width;
        }
        this.width = this.l.width;
        this.height = this.l.height;
        this.x = newX;
        this.resizing && this.resizing(this.$el, this.width, this.height);
      };
      this.f(this.resizeEnd);
    },
    rbresizefun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minwidth, minheight } = this;
      const clientX = e1.clientX;
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        let moveY = e2.clientY - clientY;
        this.l.width = parseInt(width) + parseInt(moveX);
        this.l.height = parseInt(height) + parseInt(moveY);
        if (this.l.width <= minwidth) {
          this.l.width = minwidth;
        }
        if (this.l.width + x >= document.documentElement.clientWidth) {
          this.l.width = document.documentElement.clientWidth - x;
        }
        if (this.l.height <= minheight) {
          this.l.height = minheight;
        }
        if (this.l.height + y >= document.documentElement.clientHeight) {
          this.l.height = document.documentElement.clientHeight - y;
        }
        this.width = this.l.width;
        this.height = this.l.height;
        this.resizing && this.resizing(this.$el, this.width, this.height);
      };
      this.f(this.resizeEnd);
    },
    restorefun() {
      this.minbtn = false;
      this.maxbtn = false;
      this.$emit("update:isMax", this.maxbtn);
      this.x = this.l.x;
      this.y = this.l.y;
      this.width = this.l.width;
      this.height = this.l.height;
      this.$el.querySelector(this.move).style.cursor = "move";
    },
    movefun(move) {
      if (this.$el.querySelector(move) && this.$el.querySelector(move).onmousedown === null) {
        this.$el.querySelector(move).style.cursor = "move";
        this.$el.querySelector(move).onmousedown = (e1) => {
          if (this.$el.className.indexOf("layer-vue-ismax") >= 0) {
            return;
          }
          if (this.$el.className.indexOf("layer-vue-ismin") >= 0) {
            const { x } = this;
            let clientX = e1.clientX;
            document.onmousemove = (e2) => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let newX = parseInt(x) + parseInt(moveX);
              if (!parseInt(this.moveOut[3]) && newX <= 0) {
                newX = 0;
              }
              if (!parseInt(this.moveOut[1]) && newX >= document.documentElement.clientWidth - this.minwidth) {
                newX = document.documentElement.clientWidth - this.minwidth;
              }
              this.x = newX;
            };
            this.f();
          } else {
            const { x, y } = this;
            let clientX = e1.clientX;
            let clientY = e1.clientY;
            document.onmousemove = (e2) => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let moveY = e2.clientY - clientY;
              let newX = parseInt(x) + parseInt(moveX);
              if (!parseInt(this.moveOut[3]) && newX <= 0) {
                newX = 0;
              }
              if (!parseInt(this.moveOut[1]) && newX >= document.documentElement.clientWidth - this.width) {
                newX = document.documentElement.clientWidth - this.width;
              }
              let newY = parseInt(y) + parseInt(moveY);
              if (!parseInt(this.moveOut[0]) && newY <= 0) {
                newY = 0;
              }
              if (!parseInt(this.moveOut[2]) && newY >= document.documentElement.clientHeight - this.height) {
                newY = document.documentElement.clientHeight - this.height;
              }
              this.x = newX;
              this.y = newY;
              this.l.x = newX;
              this.l.y = newY;
            };
            this.f(this.moveEnd);
          }
        };
      }
    },
  },
};
export { merge };
</script>
