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
      <div class="layer-vue-title-text">{{ title }}</div>
      <div class="layer-vue-tools" :style="{ height: titleheight + 'px', 'line-height': titleheight + 'px' }">
        <span v-show="maxmin[1]" class="layer-vue-min">
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
        <span v-show="maxmin[0] && !minbtn" class="layer-vue-max">
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
        <span v-show="closeBtn" class="layer-vue-close" @click="close">
          <svg t="1623989504811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="16" height="16">
            <path
              d="M563.3 509l352.3-352.3c13.9-13.9 13.9-36.4 0-50.3-13.9-13.9-36.4-13.9-50.3 0L513 458.7 160.7 106.4c-13.9-13.9-36.4-13.9-50.3 0-13.9 13.9-13.9 36.4 0 50.3L462.7 509 110.4 861.3c-13.9 13.9-13.9 36.4 0 50.3 6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4L513 559.3l352.3 352.3c6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4c13.9-13.9 13.9-36.4 0-50.3L563.3 509z"
              p-id="2062"
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <span v-show="closeBtn && !title" :class="{ 'layer-vue-close2': !title }" @click="close">
      <svg t="1623989504811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="16" height="16">
        <path
          d="M563.3 509l352.3-352.3c13.9-13.9 13.9-36.4 0-50.3-13.9-13.9-36.4-13.9-50.3 0L513 458.7 160.7 106.4c-13.9-13.9-36.4-13.9-50.3 0-13.9 13.9-13.9 36.4 0 50.3L462.7 509 110.4 861.3c-13.9 13.9-13.9 36.4 0 50.3 6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4L513 559.3l352.3 352.3c6.9 6.9 16.1 10.4 25.2 10.4s18.2-3.5 25.2-10.4c13.9-13.9 13.9-36.4 0-50.3L563.3 509z"
          p-id="2062"
        ></path>
      </svg>
    </span>
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
          const zindex = this.$layer.o.settop();
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
    if (!this.model) {
      this.index = this.$layer.o.instances.length;
      this.$layer.o.instances.push({ index: this.index, instance: this });
    }
    if (this.skin) {
      this.defskin = merge(this.skin, this.defskin);
    }
    this.amininit();
    this.$nextTick(() => {
      if (this.content && this.content.component) {
        let instance = new this.content.component({
          parent: this.content.parent,
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
        console.log("[layer warn]:not find children");
      }
      if (this.visible || this.visible === undefined) {
        if (this.settop) {
          const zindex = this.$layer.o.settop();
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
    window.removeEventListener("resize", this.resizefun);
  },
  methods: {
    resizefun() {
      if (this.maxbtn) {
        this.width = document.documentElement.clientWidth;
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
        const { x, y } = this.offsetinit(this.offset, width * 0.5, height * 0.5, 0);
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
      if (this.$refs.content.children.length) {
        if (this.display === "none" || getComputedStyle(this.$refs.content.children[0]).display === "none") {
          this.$refs.content.children[0].style.display = "block";
        }
      }
      const { height, width } = this.areainit();
      const { x, y } = this.offsetinit(this.offset, width, height);
      this.initdata = { width, height, x, y };
      if (this.amin === 0) {
        const movex = this.x - x;
        const movey = this.y - y;
        this.amindsq = setInterval(() => {
          this.width = this.width + width / 50;
          this.height += height / 50;
          this.x -= movex / 50;
          this.y -= movey / 50;
          if (this.width >= width) {
            clearInterval(this.amindsq);
          }
        }, 1);
      }
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
          height = this.tf(this.area[1], "clientHeight") + (this.title ? this.titleheight : 0);
        } else {
          height = children ? this.$refs.content.children[0].scrollHeight : 0 + this.titleheight;
        }
      } else {
        if (this.area === "auto") {
          width = children ? this.$refs.content.children[0].scrollWidth : 0;
        } else {
          width = this.tf(this.area, "clientWidth");
        }
        height = children ? this.$refs.content.children[0].scrollHeight : 0 + this.titleheight;
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
    offsetinit(offset, width, height, amin = -1) {
      let x = 0;
      let y = 0;
      let w = width;
      let h = height;
      if (amin === 0) {
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
      const layerDOM = document.getElementById("layer-vue-" + this.index);
      const warn = () => console.log("[layer-warn]:No layer with id ：layer-vue-" + this.index + "found");
      // 判断当前layer窗口打开模式（true：以$layer.open()打开，false:以组件形式）
      if (this.model) {
        // this.visible=false
        // 窗口配置项，关闭后则为null
        const instances = this.$layer.o.instances[this.index];
        // 判断窗口配置项是否存在
        if (instances) {
          // 判断内容区是否是DOM
          if (instances.instance.ishtml) {
            // 判断窗口DOM元素是否存在
            if (layerDOM) {
              // 获取内容区外层DOM
              const content = layerDOM.querySelector(".layer-vue-content");
              // 判断内容区是否是新建DOM
              if (instances.instance.isnewDOM) {
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
export { c, p, v, d, de, merge };
</script>
