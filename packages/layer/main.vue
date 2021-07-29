<template>
  <div
    v-cloak
    v-if="destroyOnClose ? defvisible : true"
    :data-index="index"
    :data-id="id"
    class="layer-vue"
    :id="'layer-vue-' + index"
    :data-skin="typeof defskin === 'string' ? defskin : ''"
    :style="{ display: defvisible ? '' : 'none' }"
  >
    <div
      class="layer-vue-shade"
      v-if="shade"
      :style="{ background: defshade }"
      @mousedown="shadeClosefun"
    ></div>
    <div
      οndragstart="return false;"
      class="layer-vue-box"
      :data-anim="anim"
      :class="{
        'layer-vue-ismax': maxbtn,
        'layer-vue-ismin': minbtn,
        'layer-vue-startanim': defvisible,
        'layer-vue-endanim': isOutAnim && (!visible || endanim),
      }"
      :style="{
        '--mc': defskin.maxmin ? defskin.maxmin.color : '',
        '--cc': defskin.close ? defskin.close.color : '',
        '--mbc': defskin.maxmin ? defskin.maxmin.background : '',
        '--cbc': defskin.close ? defskin.close.background : '',
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

        position: fixed ? 'fixed' : 'absolute',
      }"
      @mousedown="settopfun"
    >
      <div class="layer-vue-border"></div>
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
        <div
          class="layer-vue-title-text"
          :title="deftitle"
          :style="{ width: textwidth + 'px' }"
        >
          {{ deftitle }}
        </div>
        <div
          class="layer-vue-tools"
          :style="{
            height: titleheight + 'px',
            'line-height': titleheight + 'px',
          }"
        >
          <span v-show="maxmin[1]" class="layer-vue-min" @click="minfun">
            <icon-min v-show="!minbtn" />
            <icon-restroe v-show="minbtn" />
          </span>
          <span
            v-show="maxmin[0] && !minbtn"
            class="layer-vue-max"
            @click="maxfun"
          >
            <icon-max v-show="!maxbtn" />
            <icon-restroe v-show="maxbtn" />
          </span>
          <span v-show="closeBtn" class="layer-vue-close" @click="closefun">
            <IconClose />
          </span>
        </div>
      </div>
      <span
        v-show="closeBtn && !title"
        :class="{ 'layer-vue-close2': !title }"
        @click="closefun"
      >
        <IconClose />
      </span>
      <div
        v-if="resize[0] && !maxbtn"
        class="layer-vue-resize"
        @mousedown="rbresizefun"
      ></div>
      <div
        v-if="resize[1] && !maxbtn"
        class="layer-vue-lbresize"
        @mousedown="lbresizefun"
      ></div>
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
  </div>
</template>
<script>
import IconClose from "../theme/icon/IconClose.vue";
import IconMax from "../theme/icon/IconMax.vue";
import IconMin from "../theme/icon/IconMin.vue";
import IconRestroe from "../theme/icon/IconRestroe.vue";
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
  components: {
    IconClose,
    IconMax,
    IconMin,
    IconRestroe,
  },
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
      defshade: "rgba(0, 0, 0, 0.3)",
    };
  },
  props: {
    title: { type: [String, Boolean], default: "信息" },
    area: { type: [String, Number, Array], default: "auto" },
    minarea: { type: [String, Number, Array], default: () => [300, 200] },
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
    el: { type: String },
    fixed: { type: Boolean, default: true },
    isOutAnim: { type: [Boolean, Number], default: true },
    boderwidth: { type: Number, default: 0 },
    isMax: { type: Boolean, default: false },
    ratio: { type: Boolean, default: false },
    shade: { type: [String, Number, Array], default: 0 },
    shadeClose: { type: Boolean, default: false },
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
      return (
        this.width -
        ((this.maxmin[0] ? 35 : 0) + (this.maxmin[1] ? 35 : 0) + 50)
      );
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
    title: function (newvalue) {
      this.deftitle = newvalue;
    },
  },
  created() {
    if (!this.visible) {
      this.defvisible = this.visible;
    }
    this.deftitle = this.title;
    this.defskin = this.$layer.o.skin;
    if (this.shade) {
      if (typeof this.shade === "number") {
        if (this.shade !== 1) {
          this.defshade = `rgba(0, 0, 0,${this.shade})`;
        }
      } else if (this.shade instanceof Array && this.shade.length >= 2) {
        this.defshade = `${this.shade[1]}${(this.shade[0] * 255).toString(16)}`;
      } else if (typeof this.shade === "string") {
        if (!this.shade === "1") {
          this.defshade = this.shade;
        }
      }
    }
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
          if (
            !parseInt(this.moveOut[1]) &&
            newX >= document.documentElement.clientWidth - this.minwidth
          ) {
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
        if (
          this.display === "none" ||
          getComputedStyle(this.$refs.content.children[0]).display === "none"
        ) {
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
      let width = 300;
      let height = 200;
      if (this.minarea instanceof Array) {
        width = this.tf(this.minarea[0], "clientWidth");
        height = this.tf(this.minarea[1], "clientHeight");
      } else if (
        typeof this.minarea === "string" ||
        typeof this.minarea === "number"
      ) {
        width = this.tf(this.minarea[0], "clientWidth");
      }
      if (isNaN(height)) {
        height = 200;
      }
      if (isNaN(width)) {
        width = 300;
      }
      return { height, width };
    },
    // 高宽初始化函数
    areainit() {
      let height = 0;
      let width = 0;
      let children = false;
      if (
        this.$refs.content &&
        this.$refs.content.children &&
        this.$refs.content.children.length > 0
      ) {
        children = true;
      }
      if (this.area instanceof Array) {
        width = this.tf(this.area[0], "clientWidth");
        if (this.area[1]) {
          height = this.tf(this.area[1], "clientHeight");
        } else {
          height = children ? (this.$refs.content.children[0].scrollHeight+this.titleheight) : 0;
        }
      } else {
        if (this.area === "auto") {
          width = children ? this.$refs.content.children[0].scrollWidth : 0;
        } else {
          width = this.tf(this.area, "clientWidth");
        }
        height = children ? (this.$refs.content.children[0].scrollHeight+this.titleheight) : 0;
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
    // 长度处理函数
    tf(value, client) {
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
    close() {
      // 隐藏窗口
      if (!this.defvisible) {
        this.$layer.o.log &&
          console.warn("[layer-warn]layer-vue-" + this.index + " is closed");
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
      const warn = () =>
        console.warn(
          "[layer-warn]:No layer with id ：layer-vue-" + this.index + "found"
        );
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
                  if (this.$el.querySelector(this.move)) {
                    this.$el.querySelector(this.move).style.cursor = "default";
                    this.$el.querySelector(this.move).onmousedown = null;
                  }
                  const _el = document.querySelector(this.el);
                  const solt = document.querySelector(
                    ".layer-vue-solt-" + this.index
                  );
                  if (_el && !solt) {
                    console.error(
                      "[layer-error] can not find .layer-vue-solt-" +
                        this.index +
                        " dom location error !"
                    );
                  }
                  if (_el && solt && solt.parentNode) {
                    const parentDiv = solt.parentNode;
                    content.children[0].style.display = this.display;
                    parentDiv.insertBefore(content.children[0], solt);
                    _el.removeChild(layerDOM);
                    parentDiv.removeChild(solt);
                  } else {
                    const parentDiv = layerDOM.parentNode;
                    content.children[0].style.display = this.display;
                    parentDiv.insertBefore(content.children[0], layerDOM);
                    parentDiv.removeChild(layerDOM);
                  }

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
        // 判断el是否存在
        if (document.querySelector(instances.instance._el)) {
          node = document.querySelector(instances.instance._el);
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
      const { minwidth, minheight, width, height, x, ratio } = this;
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
        if (ratio) {
          this.l.height =
            (this.l.width * this.initdata.height) / this.initdata.width;

          if (
            !parseInt(this.moveOut[3]) &&
            this.l.height + this.y >= document.documentElement.clientHeight
          ) {
            this.l.height = document.documentElement.clientHeight - this.y;
            this.l.width =
              (this.l.height * this.initdata.width) / this.initdata.height;
            newX = x - (this.l.width - width);
          }
          if (this.l.height <= minheight) {
            this.l.height = minheight;
            this.l.width =
              (this.l.height * this.initdata.width) / this.initdata.height;
            newX = x - (this.l.width - width);
          }
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
      const { width, height, x, y, minwidth, minheight, ratio } = this;
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
        if (
          !parseInt(this.moveOut[2]) &&
          this.l.width + x >= document.documentElement.clientWidth
        ) {
          this.l.width = document.documentElement.clientWidth - x;
        }
        if (this.l.height <= minheight) {
          this.l.height = minheight;
        }
        if (
          !parseInt(this.moveOut[3]) &&
          this.l.height + y >= document.documentElement.clientHeight
        ) {
          this.l.height = document.documentElement.clientHeight - y;
        }
        if (ratio) {
          this.l.height =
            (this.l.width * this.initdata.height) / this.initdata.width;
          if (
            !parseInt(this.moveOut[3]) &&
            this.l.height + y >= document.documentElement.clientHeight
          ) {
            this.l.height = document.documentElement.clientHeight - y;
            this.l.width =
              (this.l.height * this.initdata.width) / this.initdata.height;
          }
          if (this.l.height <= minheight) {
            this.l.height = minheight;
            this.l.width =
              (this.l.height * this.initdata.width) / this.initdata.height;
          }
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
      if (this.$el.querySelector(move)) {
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
              if (
                !parseInt(this.moveOut[1]) &&
                newX >= document.documentElement.clientWidth - this.minwidth
              ) {
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
              if (
                !parseInt(this.moveOut[1]) &&
                newX >= document.documentElement.clientWidth - this.width
              ) {
                newX = document.documentElement.clientWidth - this.width;
              }
              let newY = parseInt(y) + parseInt(moveY);
              if (!parseInt(this.moveOut[0]) && newY <= 0) {
                newY = 0;
              }
              if (
                !parseInt(this.moveOut[2]) &&
                newY >= document.documentElement.clientHeight - this.height
              ) {
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
    shadeClosefun() {
      if (this.shadeClose) {
        this.closefun();
      }
    },
  },
};
export { merge };
</script>
