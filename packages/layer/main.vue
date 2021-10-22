<template>
  <div v-cloak v-if="destroyOnClose ? defvisible : true" :data-index="index" :data-id="id" class="layer-vue" :id="'layer-vue-' + index" :data-skin="typeof defskin === 'string' ? defskin : ''" :style="{ display: defvisible ? '' : 'none' }">
    <div class="layer-vue-shade" v-if="shade" :style="{ background: defshade }" @mousedown="shadeClosefun"></div>
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
      >
        <div class="layer-vue-title-text" :style="{ width: textwidth + 'px' }">
          {{ deftitle }}
        </div>
        <div
          class="layer-vue-tools"
          :style="{
            height: titleheight + 'px',
            'line-height': titleheight + 'px',
          }"
        >
          <span v-if="maxmin[1]" class="layer-vue-min" @click="minfun">
            <icon-min v-if="!minbtn" />
            <icon-restroe v-if="minbtn" />
          </span>
          <span v-if="maxmin[0] && !minbtn" class="layer-vue-max" @click="maxfun">
            <icon-max v-if="!maxbtn" />
            <icon-restroe v-if="maxbtn" />
          </span>
          <span v-if="closeBtn" class="layer-vue-close" @click="closefun">
            <IconClose />
          </span>
        </div>
      </div>
      <span v-if="closeBtn && !title" :class="{ 'layer-vue-close2': !title }" @click="closefun">
        <IconClose />
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
  </div>
</template>
<script>
import IconClose from "../theme/icon/IconClose.vue";
import IconMax from "../theme/icon/IconMax.vue";
import IconMin from "../theme/icon/IconMin.vue";
import IconRestroe from "../theme/icon/IconRestroe.vue";

/**
 * 合并函数
 * @param {Object} options 配置
 * @param {Object} def 需要合并到主数据的配置
 * @returns {Object} options 合并后的配置
 */
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
const docelm = document.documentElement;
const titleText = ".layer-vue-title-text";
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
      // 控制关闭动画的类
      endanim: false,
      // 最大化按钮
      maxbtn: false,
      // 最小化按钮
      minbtn: false,
      // 最小宽度
      minwidth: 300,
      // 最小高度
      minheight: 200,
      // 左偏移量
      x: 0,
      // 上偏移量
      y: 0,
      // 窗口宽度
      width: 0,
      // 窗口高度
      height: 0,
      // 窗口zindex
      zIndex: 1,
      // 序号
      index: undefined,
      // 模式
      model: undefined,
      // display
      display: undefined,
      // 默认皮肤
      defskin: {},
      // 用于记录初始状态
      initdata: { x: 0, y: 0, width: 300, height: 200 },
      // 默认外边框宽度
      defborderwidth: 0,
      // 用于记录窗口发生最大最小化前的窗口信息
      l: {},
      // 默认标题
      deftitle: undefined,
      // 默认阴影色
      defshade: "rgba(0, 0, 0, 0.3)",
    };
  },
  props: {
    // 标题
    title: { type: [String, Boolean], default: "_$_l_a_y_e_r_v_u_e" },
    // 高宽
    area: { type: [String, Number, Array], default: "auto" },
    // 最小高宽
    minarea: { type: [String, Number, Array], default: () => [300, 200] },
    // 最大高宽
    maxarea: { type: [String, Number, Array], default: () => ["100%", "100%"] },
    // 打开位置
    offset: { type: [String, Array, Number], default: "auto" },
    // 置顶
    settop: { type: [Number, Boolean], default: false },
    // 移动限制
    moveOut: { type: Array, default: () => [0, 0, 0, 0] },
    // 显示
    visible: { visible: [Number, Boolean], default: true },
    // 窗口zindex
    zindex: { type: Number, default: 1 },
    // 关闭按钮
    closeBtn: { type: [Number, Boolean], default: true },
    // 最大最小化按钮
    maxmin: { type: Array, default: () => [0, 0] },
    // 拉伸
    resize: { type: Array, default: () => [1, 1] },
    // 拖动目标
    move: { type: [String, Boolean], default: ".layer-vue-title-text" },
    // 移动结束回调
    moveEnd: { type: Function },
    // 关闭窗口回调
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
    resizeEnd: { type: Function },
    // 清除内容
    destroyOnClose: { type: [Number, Boolean], default: false },
    // 动画
    anim: { type: Number, default: 1 },
    // 内容区
    content: {},
    // 标题高度
    titleheight: { type: Number, default: 42 },
    // 皮肤
    skin: { type: [Object, String] },
    // id
    id: { type: String, default: undefined },
    // 父元素
    el: { type: String },
    // fixed
    fixed: { type: Boolean, default: true },
    // 关闭的动画
    isOutAnim: { type: [Boolean, Number], default: true },
    // 边框宽度
    borderwidth: { type: Number, default: 0 },
    // 打开时最大化
    isMax: { type: Boolean, default: false },
    // 是否保持高宽比例
    ratio: { type: Boolean, default: false },
    // 阴影
    shade: { type: [String, Number, Array], default: 0 },
    // 点击阴影关闭
    shadeClose: { type: Boolean, default: false },
    // 是否添加到body
    appendToBody:{ type: Boolean, default: false},
  },
  computed: {
    // 计算属性-内容区高度
    contentheight: function () {
      let h = this.height - (this.title ? this.titleheight : 0);
      h = h - this.defborderwidth * 2;
      h <= 0 ? (h = 0) : null;
      return h;
    },
    // 计算属性-标题文本宽度
    textwidth: function () {
      return this.width - ((this.maxmin[0] ? 35 : 0) + (this.maxmin[1] ? 35 : 0) + 50);
    },
  },
  watch: {
    // 监测visible变化后改变defvisible
    visible: function (newvalue) {
      if (this.anim) {
        setTimeout(() => {
          this.defvisible = newvalue;
        }, 300);
      } else {
        this.defvisible = newvalue;
      }
    },
    // 监测defvisible变化后触发置顶和初始化
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
          if (this.model) {
            this.success && this.success(this.$el, this.index, this.id);
          } else {
            this.$emit("success", this.$el, this.index, this.id);
          }
        });
      }
    },
    // 监测isMax变化触发最大化函数
    isMax: function (newvalue) {
      if (newvalue !== this.maxbtn && this.$(this.move)) {
        this.maxfun();
      }
    },
    // 检测最小化状态，切换鼠标手势
    minbtn: function (newvalue) {
      if (this.move != ".layer-vue-title-text" && this.$(titleText)) {
        if (newvalue) {
          this.$(titleText).style.cursor = "move";
        } else {
          this.$(titleText).style.cursor = "";
        }
      }
    },
    // 监测title变化传递给deftitle
    title: function (newvalue) {
      this.deftitle = newvalue;
    },
  },
  created() {
    // 初始化数据
    if (!this.visible) {
      this.defvisible = this.visible;
    }
    if (this.title === "_$_l_a_y_e_r_v_u_e") {
      this.deftitle = this.$layer.o.title;
    } else {
      this.deftitle = this.title;
    }
    this.defskin = this.$layer.o.skin;
    if (this.borderwidth === 0) {
      if (typeof this.skin === "string") {
        this.defborderwidth = 3;
      } else {
        this.defborderwidth = 0;
      }
    } else {
      this.defborderwidth = this.borderwidth;
    }
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
    if(this.appendToBody){
      document.body.appendChild(this.$el)
    }
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
          this.$refs.content.children[0].style.display = "block";
          this.childrenW = parseInt(getComputedStyle(this.$refs.content.children[0]).width);
          if (this.childrenW === 0 || isNaN(this.childrenW)) {
            this.childrenW = 0;
            this.childrenH = 0;
          } else {
            this.childrenH = parseInt(getComputedStyle(this.$refs.content.children[0]).height);
          }
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
        if (this.model) {
          this.success && this.success(this.$el, this.index, this.id);
        } else {
          this.$emit("success", this.$el, this.index, this.id);
        }
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
  },
  methods: {
    // 最小化时的拖动函数
    minmovefun() {
      if (this.$(titleText)) {
        this.$(titleText).onmousedown = (e1) => {
          e1.preventDefault();
          const { x } = this;
          let clientX = e1.clientX;
          document.onmousemove = (e2) => {
            e2.preventDefault();
            let moveX = e2.clientX - clientX;
            let newX = parseInt(x) + parseInt(moveX);
            if (!parseInt(this.moveOut[3]) && newX <= 0) {
              newX = 0;
            }
            if (!parseInt(this.moveOut[1]) && newX >= docelm.clientWidth - 200) {
              newX = docelm.clientWidth - 200;
            }
            this.x = newX;
          };
          this.f("moveEnd");
        };
      }
    },
    // 浏览器发生resize时重置窗口
    resizefun() {
      // ! 窗口最大化时调整窗口大小贴合浏览器，退出调整
      if (this.maxbtn) {
        this.width = docelm.clientWidth;
        this.height = docelm.clientHeight;
        return;
      }
      // 调整左偏移保证窗口在屏幕内
      if (this.x + this.width >= docelm.clientWidth) {
        this.x = docelm.clientWidth - this.width;
      }
      // 左平移为0时停止调整
      if (this.x <= 0) {
        this.x = 0;
      }
      // ! 窗口最小化时调整上偏移，退出调整
      if (this.minbtn) {
        this.y = docelm.clientHeight - this.height;
        return;
      }
      // 调整上偏移
      if (this.y + this.height >= docelm.clientHeight) {
        this.y = docelm.clientHeight - this.height;
      }
      // 上平移为0时停止调整
      if (this.y <= 0) {
        this.y = 0;
      }
      // 窗口允许拉伸时，调整窗口大小保持在浏览器内部
      if (!this.ratio && (this.resize[0] || this.resize[1])) {
        if (this.width >= docelm.clientWidth) {
          this.width = docelm.clientWidth;
        }
        if (this.width <= this.minwidth) {
          this.width = this.minwidth;
        }
        if (this.height >= docelm.clientHeight) {
          this.height = docelm.clientHeight;
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
      this.movefun(this.move);
    },
    // 初始化函数
    init() {
      this.maxbtn = false;
      this.minbtn = false;
      if (this.$refs.content.children.length) {
        this.$refs.content.children[0].style.display = "block";
        // if (
        //   this.display === "none" ||
        //   getComputedStyle(this.$refs.content.children[0]).display === "none"
        // ) {
        //   this.$refs.content.children[0].style.display = "block";
        // }
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
      } else if (typeof this.minarea === "string" || typeof this.minarea === "number") {
        width = this.tf(this.minarea, "clientWidth");
      }
      if (isNaN(height)) {
        height = 200;
      }
      if (isNaN(width)) {
        width = 300;
      }
      return { height, width };
    },
    maxareainit() {
      let width = docelm.clientWidth;
      let height = docelm.clientHeight;
      if (this.maxarea instanceof Array) {
        width = this.tf(this.maxarea[0], "clientWidth");
        height = this.tf(this.maxarea[1], "clientHeight");
      } else if (typeof this.maxarea === "string" || typeof this.maxarea === "number") {
        width = this.tf(this.maxarea, "clientWidth");
      }
      if (isNaN(height)) {
        height = docelm.clientHeight;
      }
      if (isNaN(width)) {
        width = docelm.clientWidth;
      }
      return { height, width };
    },
    // 高宽初始化函数
    areainit() {
      let height = 0;
      let width = 0;
      try {
        if (this.$refs.content.children.length) {
          let borderbox = false;
          if (getComputedStyle(this.$refs.content.children[0]).boxSizing === "border-box") {
            borderbox = true;
          }
          this.childrenW =
            parseInt(getComputedStyle(this.$refs.content.children[0]).width) +
            (borderbox
              ? 0
              : parseInt(getComputedStyle(this.$refs.content.children[0]).paddingLeft) +
                parseInt(getComputedStyle(this.$refs.content.children[0]).paddingRight) +
                parseInt(getComputedStyle(this.$refs.content.children[0]).borderLeftWidth) +
                parseInt(getComputedStyle(this.$refs.content.children[0]).borderRightWidth));
          if (this.childrenW === 0 || isNaN(this.childrenW)) {
            this.childrenW = 0;
            this.childrenH = 0;
          } else {
            this.childrenH =
              parseInt(getComputedStyle(this.$refs.content.children[0]).height) +
              (borderbox
                ? 0
                : parseInt(getComputedStyle(this.$refs.content.children[0]).paddingTop) +
                  parseInt(getComputedStyle(this.$refs.content.children[0]).paddingBottom) +
                  parseInt(getComputedStyle(this.$refs.content.children[0]).borderTopWidth) +
                  parseInt(getComputedStyle(this.$refs.content.children[0]).borderBottomWidth));
          }
        }
      } catch (error) {
        this.$layer.o.log && console.warn("[layer warn]:not find children");
      }
      if (this.area instanceof Array) {
        width = this.tf(this.area[0], "clientWidth") + this.defborderwidth * 2;
        if (this.area[1]) {
          height = this.tf(this.area[1], "clientHeight") + this.defborderwidth * 2;
        } else {
          height = this.childrenH + this.titleheight + this.defborderwidth * 2;
        }
      } else {
        if (this.area === "auto") {
          width = this.childrenW + this.defborderwidth * 2;
        } else {
          width = this.tf(this.area, "clientWidth") + this.defborderwidth * 2;
        }
        height = this.childrenH + this.titleheight + this.defborderwidth * 2;
      }
      if (width > docelm.clientWidth && docelm.clientWidth > this.minwidth) {
        width = docelm.clientWidth;
      } else if (width <= this.minwidth) {
        width = this.minwidth;
      }
      if (height > docelm.clientHeight && docelm.clientHeight > this.minheight) {
        height = docelm.clientHeight;
      } else if (height <= this.minheight) {
        height = this.minheight;
      }
      const { width: maxWidth, height: maxHeight } = this.maxareainit();
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (height > maxHeight) {
        height = maxHeight;
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
          x = (docelm.clientWidth - width) * 0.5;
        }
        y = this.tf(offset[0], "clientHeight");
      } else if (typeof offset === "number") {
        y = offset;
        x = (docelm.clientWidth - width) * 0.5;
      } else if (offset.substr(-2).indexOf("px") === 0) {
        y = parseInt(offset.slice(0, -2));
      } else if (offset.substr(-1).indexOf("%") === 0) {
        y = docelm.clientHeight * parseInt(offset.slice(0, -1)) * 0.01;
      } else {
        switch (offset) {
          case "auto":
            x = (docelm.clientWidth - width) * 0.5;
            y = (docelm.clientHeight - height) * 0.5;
            break;
          case "t":
            x = (docelm.clientWidth - width) * 0.5;
            break;
          case "r":
            x = docelm.clientWidth - w;
            y = (docelm.clientHeight - height) * 0.5;
            break;
          case "b":
            x = (docelm.clientWidth - width) * 0.5;
            y = docelm.clientHeight - h;
            break;
          case "l":
            y = (docelm.clientHeight - height) * 0.5;
            break;
          case "lt":
            break;
          case "lb":
            y = docelm.clientHeight - h;
            break;
          case "rt":
            x = docelm.clientWidth - w;
            break;
          case "rb":
            x = docelm.clientWidth - w;
            y = docelm.clientHeight - h;
            break;
          default:
            x = (docelm.clientWidth - width) * 0.5;
            y = (docelm.clientHeight - height) * 0.5;
            break;
        }
      }

      if (isNaN(x)) {
        x = (docelm.clientWidth - width) * 0.5;
      }
      if (isNaN(y)) {
        y = (docelm.clientHeight - height) * 0.5;
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
        name = docelm[client] * parseInt(value.slice(0, -1)) * 0.01;
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
        this.$emit("cancel", this.$el, this.index, this.id);
      } else {
        this.cancel && this.cancel(this.$el, this.index, this.id);
      }
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
                  if (this.$(this.move)) {
                    this.$(this.move).style.cursor = "default";
                    this.$(this.move).onmousedown = null;
                  }
                  const _el = document.querySelector(this.el);
                  const solt = document.querySelector(".layer-vue-solt-" + this.index);
                  if (_el && !solt) {
                    console.error("[layer-error] can not find .layer-vue-solt-" + this.index + " dom location error !");
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
      if (this.model) {
        this.end && this.end(this.$el, this.index, this.id);
      } else {
        this.$emit("end", this.$el, this.index, this.id);
      }
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
        if (this.move && this.$(this.move)) {
          this.$(this.move).style.cursor = "not-allowed";
          this.$(this.move).onmousedown = null;
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
        this.width = docelm.clientWidth;
        this.height = docelm.clientHeight;
        if (this.model) {
          this.full && this.full(this.$el, this.index, this.id);
        } else {
          this.$emit("full", this.$el, this.index, this.id);
        }
      } else {
        this.movefun(this.move);
        this.x = this.l.x;
        this.y = this.l.y;
        this.width = this.l.width;
        this.height = this.l.height;
        if (this.model) {
          this.restore && this.restore(this.$el, this.index, this.id);
        } else {
          this.$emit("restore", this.$el, this.index, this.id);
        }
        if (this.move && this.$(this.move)) {
          this.$(this.move).style.cursor = "move";
        }
      }
    },
    minfun() {
      this.minbtn = !this.minbtn;
      if (this.minbtn) {
        this.minmovefun();
        if (this.maxbtn) {
          this.maxbtn = false;
        } else {
          this.l.x = this.x;
          this.l.y = this.y;
          this.l.width = this.width;
          this.l.height = this.height;
        }
        this.x = this.l.x;
        this.y = docelm.clientHeight - this.titleheight;
        this.height = this.titleheight;
        this.width = 200;
        if (this.model) {
          this.min && this.min(this.$el, this.index, this.id);
        } else {
          this.$emit("min", this.$el, this.index, this.id);
        }
      } else {
        this.movefun(this.move);
        this.x = this.l.x;
        this.y = this.l.y;
        this.width = this.l.width;
        this.height = this.l.height;
        if (this.model) {
          this.restore && this.restore(this.$el, this.index, this.id);
        } else {
          this.$emit("restore", this.$el, this.index, this.id);
        }
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
        if (this.model) {
          this[callback] && this[callback](this.$el, this.index, this.id);
        } else {
          this.$emit(callback, this.$el, this.index, this.id);
        }

        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    lbresizefun(e1) {
      e1.preventDefault();
      const { minwidth, minheight, width, height, x, ratio } = this;
      const { witdh: maxWidth, height: maxHeight } = this.maxareainit();
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
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
          newX = x + width - maxWidth;
        }
        if (!parseInt(this.moveOut[3]) && newX <= 0) {
          newX = 0;
          this.l.width = x + width;
        }

        if (ratio) {
          const titleheight=this.title?this.titleheight:0
          this.l.height = ((this.l.width * (this.initdata.height-titleheight)) / this.initdata.width)+titleheight;
          if (!parseInt(this.moveOut[3]) && this.l.height + this.y >= docelm.clientHeight) {
            this.l.height = docelm.clientHeight - this.y;
            this.l.width = (this.l.height * this.initdata.width) / this.initdata.height;
            newX = x - (this.l.width - width);
          }
          if (this.l.height <= minheight) {
            this.l.height = minheight;
            this.l.width = (this.l.height * this.initdata.width) / this.initdata.height;
            newX = x - (this.l.width - width);
          }
        }

        this.width = this.l.width;
        this.height = this.l.height;
        this.x = newX;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.f("resizeEnd");
    },
    rbresizefun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minwidth, minheight, ratio } = this;
      const { witdh: maxWidth, height: maxHeight } = this.maxareainit();
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
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
        }
        if (!parseInt(this.moveOut[2]) && this.l.width + x >= docelm.clientWidth) {
          this.l.width = docelm.clientWidth - x;
        }
        if (this.l.height <= minheight) {
          this.l.height = minheight;
        }
        if (!parseInt(this.moveOut[3]) && this.l.height + y >= docelm.clientHeight) {
          this.l.height = docelm.clientHeight - y;
        }
        if (ratio) {
          const titleheight=this.title?this.titleheight:0
          this.l.height = ((this.l.width * (this.initdata.height-titleheight)) / this.initdata.width)+titleheight;
          if (!parseInt(this.moveOut[3]) && this.l.height + y >= docelm.clientHeight) {
            this.l.height = docelm.clientHeight - y;
            this.l.width = (this.l.height * this.initdata.width) / this.initdata.height;
          }
          if (this.l.height <= minheight) {
            this.l.height = minheight;
            this.l.width = (this.l.height * this.initdata.width) / this.initdata.height;
          }
        }
        this.width = this.l.width;
        this.height = this.l.height;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.f("resizeEnd");
    },
    restorefun() {
      this.minbtn = false;
      this.maxbtn = false;
      this.$emit("update:isMax", this.maxbtn);
      this.x = this.l.x;
      this.y = this.l.y;
      this.width = this.l.width;
      this.height = this.l.height;
      this.$(this.move).style.cursor = "move";
      this.movefun(this.move);
    },
    movefun(move) {
      if (this.$(move)) {
        this.$(move).style.cursor = "move";
        if (this.$(titleText)) {
          this.$(titleText).onmousedown = null;
        }

        this.$(move).onmousedown = (e1) => {
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
              if (!parseInt(this.moveOut[1]) && newX >= docelm.clientWidth - this.minwidth) {
                newX = docelm.clientWidth - this.minwidth;
              }
              this.x = newX;
            };
            this.f("moveEnd");
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
              if (!parseInt(this.moveOut[1]) && newX >= docelm.clientWidth - this.width) {
                newX = docelm.clientWidth - this.width;
              }
              let newY = parseInt(y) + parseInt(moveY);
              if (!parseInt(this.moveOut[0]) && newY <= 0) {
                newY = 0;
              }
              if (!parseInt(this.moveOut[2]) && newY >= docelm.clientHeight - this.height) {
                newY = docelm.clientHeight - this.height;
              }
              this.x = newX;
              this.y = newY;
              this.l.x = newX;
              this.l.y = newY;
            };
            this.f("moveEnd");
          }
        };
      }
    },
    shadeClosefun() {
      if (this.shadeClose) {
        this.closefun();
      }
    },
    reloadAutoAreafun() {
      this.$nextTick(() => {
        if (this.area === "auto") {
          const { height, width } = this.areainit();
          this.initdata.width = width;
          this.initdata.height = height;
          this.width = width;
          this.height = height;
        }
      });
    },
    $(dom) {
      return this.$el.querySelector(dom);
    },
  },
};
export { merge };
</script>
