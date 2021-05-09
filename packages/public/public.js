const template = `<div
v-cloak
οndragstart="return false;" :data-id="id"
v-if="destroyOnClose ? (visible === undefined ? defaultvisible : visible) : true"
v-show="visible === undefined ? defaultvisible : visible"
class="layer-vue" :id="'layer-vue-'+id"
:class="{ 'layer-vue-ismax': maxbtn, 'layer-vue-ismin': minbtn }"
v-drag="{
  visible,
  moveOut,
  settop,
  settopfun,
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
  <slot></slot>
</div>
</div>`;
let vuepublic = {
  template: template,
  computed: {
    contentheight: function() {
      return this.height - (this.title ? 42 : 0);
    }
  },
  watch: {
    visible: function(newvalue) {
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
    defaultvisible: function(newvalue) {
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
    }
  },
  created() {
    console.log(this.zIndex);

    window.addEventListener("resize", this.init);
    if (this.visible || this.visible === undefined) {
      if (this.settop) {
        const zindex = this.$LayerOptions.settop();
        this.zIndex = zindex;
      } else {
        this.zIndex = this.zindex;
      }
      this.success && this.success(this);
    }
    console.log(this.zIndex);
  },
  beforeUpdate() {},
  updated() {},
  mounted() {
    this.amininit();
    this.$nextTick(() => {
      let display = "";
      if (this.content && this.content.component) {
        let instance = new this.content.component({
          //具体参数信息，请参考vue源码
          parent: this.content.parent,
          propsData: this.content.data
        });
        instance.vm = instance.$mount();
        document
          .getElementById("layer-vue-" + this.id)
          .querySelector(".layer-vue-content")
          .appendChild(instance.vm.$el);
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
        const { x, y } = this.offsetinit(
          this.offset,
          width * 0.5,
          height * 0.5,
          true
        );
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
          height =
            this.Transformation(this.area[1], "clientHeight") +
            (this.title ? 42 : 0);
        } else {
          height = this.$refs.content
            ? this.$refs.content.scrollHeight
            : 0 + 42;
        }
      } else {
        if (this.area === "auto") {
          width = this.$refs.content ? this.$refs.content.scrollWidth : 0;
        } else {
          width = this.Transformation(this.area, "clientWidth");
        }
        height = this.$refs.content ? this.$refs.content.scrollHeight : 0 + 42;
      }
      if (
        width > document.documentElement.clientWidth &&
        document.documentElement.clientWidth > this.minwidth
      ) {
        width = document.documentElement.clientWidth;
      } else if (width <= this.minwidth) {
        width = this.minwidth;
      }
      if (
        height > document.documentElement.clientHeight &&
        document.documentElement.clientHeight > this.minheight
      ) {
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
        y =
          document.documentElement.clientHeight *
          parseInt(offset.slice(0, -1)) *
          0.01;
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
    Transformation(value, client) {
      let name = 0;
      if (typeof value === "number") {
        name = value;
      } else if (value.substr(-2).indexOf("px") === 0) {
        name = parseInt(value.slice(0, -2));
      } else if (value.substr(-1).indexOf("%") === 0) {
        name =
          document.documentElement[client] *
          parseInt(value.slice(0, -1)) *
          0.01;
      } else {
        name = parseInt(value);
      }
      return name;
    },
    // 关闭窗口函数
    closeLayer() {
      
      if (this.destroyOnClose) {
        this.$Layer.close(this.id);
      } else {
        this.$emit("update:visible", false);
        this.defaultvisible = false;
        this.amininit();
        if (this.destroyOnClose) {
          this.end && this.end();
        } else {
          this.cancel && this.cancel();
        }
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
    settopfun() {
      return this.$LayerOptions.settop();
    }
  }
};
export default vuepublic;
