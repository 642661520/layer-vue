<template>
  <div v-cloak v-if="destroyOnClose ? defVisible : true" :data-index="index" :data-id="id" class="layer-vue" :id="'layer-vue-' + index" :data-skin="typeof defSkin === 'string' ? defSkin : ''" :style="{ display: defVisible ? '' : 'none' }">
    <div class="layer-vue-shade" v-if="shade" :style="{ background: defSkin.shade ? defSkin.shade.background : '', 'z-index': defZIndex }" @mousedown="shadeCloseFun"></div>
    <div
      οndragstart="return false;"
      class="layer-vue-box"
      :data-anim="anim"
      :class="{
        'layer-vue-ismax': maxBtn,
        'layer-vue-ismin': minBtn,
        'layer-vue-startanim': defVisible,
        'layer-vue-endanim': isOutAnim && (!visible || endAnim),
      }"
      :style="{
        '--mc': defSkin.maxmin ? defSkin.maxmin.color : '',
        '--cc': defSkin.close ? defSkin.close.color : '',
        '--mbc': defSkin.maxmin ? defSkin.maxmin.background : '',
        '--cbc': defSkin.close ? defSkin.close.background : '',
        '--mch': defSkin.maxmin ? defSkin.maxmin.colorHover : '',
        '--cch': defSkin.close ? defSkin.close.colorHover : '',
        '--mbch': defSkin.maxmin ? defSkin.maxmin.backgroundHover : '',
        '--cbch': defSkin.close ? defSkin.close.backgroundHover : '',
        '--sliderColor': defSkin.slider ? defSkin.slider.background : '',
        'box-shadow': defSkin.boxShadow,
        background: defSkin.background,
        width: width + 'px',
        height: height + 'px',
        top: y + 'px',
        left: x + 'px',
        'z-index': defZIndex,
        position: fixed ? 'fixed' : 'absolute',
      }"
      @mousedown="setTopFun"
    >
      <div class="layer-vue-border"></div>
      <div
        v-if="defTitle"
        class="layer-vue-title"
        :style="{
          background: defSkin.title ? defSkin.title.background : '',
          color: defSkin.title ? defSkin.title.color : '',
          'border-bottom': defSkin.title ? defSkin.title.borderBottom : '',
          height: titleHeight + 'px',
          'line-height': titleHeight + 'px',
        }"
      >
        <div class="layer-vue-title-text" :style="{ width: textWidth + 'px' }">
          {{ defTitle }}
        </div>
        <div
          class="layer-vue-tools"
          :style="{
            height: titleHeight + 'px',
            'line-height': titleHeight + 'px',
          }"
        >
          <span v-if="maxmin[1]" class="layer-vue-min" @click="minFun">
            <icon-min v-if="!minBtn" />
            <icon-restroe v-if="minBtn" />
          </span>
          <span v-if="maxmin[0] && !minBtn" class="layer-vue-max" @click="maxFun">
            <icon-max v-if="!maxBtn" />
            <icon-restroe v-if="maxBtn" />
          </span>
          <span v-if="closeBtn" class="layer-vue-close" @click="beforeCloseFun">
            <IconClose />
          </span>
        </div>
      </div>
      <span v-if="closeBtn && !title" :class="{ 'layer-vue-close2': !title }" @click="beforeCloseFun">
        <IconClose />
      </span>
      <div v-if="resize[0] && !maxBtn" class="layer-vue-resize layer-vue-resize-rb" @mousedown="rbResiezFun"></div>
      <div v-if="resize[1] && !maxBtn" class="layer-vue-resize layer-vue-resize-lb" @mousedown="lbResiezFun"></div>
      <div v-if="resize[2] && !maxBtn" class="layer-vue-resize layer-vue-resize-lt" @mousedown="ltResiezFun"></div>
      <div v-if="resize[3] && !maxBtn" class="layer-vue-resize layer-vue-resize-rt" @mousedown="rtResiezFun"></div>
      <div v-if="borderResize[0] && !maxBtn" class="layer-vue-resize layer-vue-resize-r" :style="{ height: height - 15 + 'px' }" @mousedown="rightResizeFun"></div>
      <div v-if="borderResize[2] && !maxBtn" class="layer-vue-resize layer-vue-resize-b" @mousedown="bottomResizeFun"></div>
      <div v-if="borderResize[1] && !maxBtn" class="layer-vue-resize layer-vue-resize-l" :style="{ height: height - 15 + 'px' }" @mousedown="leftResizeFun"></div>
      <div v-if="borderResize[3] && !maxBtn" class="layer-vue-resize layer-vue-resize-t" @mousedown="topResizeFun"></div>
      <div
        ref="content"
        class="layer-vue-content"
        :style="{
          'border-radius': title ? '0 0 2px 2px' : '2px',
          background: defSkin.content ? defSkin.content.background : '',
          color: defSkin.content ? defSkin.content.color : '',
          height: contentHeight + 'px',
          overflow: slider ? 'overlay' : 'hidden',
        }"
      >
        <slot>{{ !model ? content : null }}</slot>
      </div>
    </div>
  </div>
</template>
<script>
import IconClose from "../../theme/icon/IconClose.vue";
import IconMax from "../../theme/icon/IconMax.vue";
import IconMin from "../../theme/icon/IconMin.vue";
import IconRestroe from "../../theme/icon/IconRestroe.vue";
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
  return { ...options };
};
/**document.documentElement  */
const docelm = document.documentElement;
/**titleText class  */
const titleText = ".layer-vue-title-text";
const minimizeWidth = 200;
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
      /**默认开启*/
      defVisible: true,
      /**控制关闭动画的类*/
      endAnim: false,
      /**最大化按钮*/
      maxBtn: false,
      /**最小化按钮*/
      minBtn: false,
      /**最小宽度*/
      minWidth: 300,
      /**最小高度*/
      minHeight: 200,
      /**左偏移量*/
      x: 0,
      /**上偏移量*/
      y: 0,
      /**窗口宽度*/
      width: 0,
      /**窗口高度*/
      height: 0,
      /**窗口zIndex*/
      defZIndex: 1,
      /**序号*/
      index: undefined,
      /**模式*/
      model: undefined,
      /**display*/
      display: undefined,
      /**默认皮肤*/
      defSkin: {},
      /**用于记录初始状态*/
      initData: { x: 0, y: 0, width: 300, height: 200 },
      /**默认外边框宽度*/
      defBorderWidth: 0,
      /**用于记录窗口发生最大最小化前的窗口信息*/
      l: {},
      /**默认标题*/
      defTitle: undefined,
    };
  },
  props: {
    /**标题*/
    title: { type: [String, Boolean], default: "_$_l_a_y_e_r_v_u_e" },
    /**高宽*/
    area: { type: [String, Number, Array], default: "auto" },
    /**最小高宽*/
    minArea: { type: [String, Number, Array], default: () => [300, 200] },
    /**最大高宽*/
    maxArea: { type: [String, Number, Array], default: () => ["100%", "100%"] },
    /**打开位置*/
    offset: { type: [String, Array, Number], default: "auto" },
    /**置顶*/
    setTop: { type: [Number, Boolean], default: false },
    /**移动限制* 0右 * 1下 * 2左 * 3上*/
    moveOut: { type: Array, default: () => [0, 0, 0, 0] },
    /**移动限制时距离4边的距离* 0右 * 1下 * 2左 * 3上*/
    moveOutPadding: { type: Array, default: () => [0, 0, 0, 0] },
    /**显示*/
    visible: { visible: [Number, Boolean], default: true },
    /**窗口zIndex*/
    zIndex: { type: Number, default: 1 },
    /**关闭按钮*/
    closeBtn: { type: [Number, Boolean], default: true },
    /**最大最小化按钮*/
    maxmin: { type: Array, default: () => [0, 0] },
    /**4角拉伸 右下0，左下1，左上2，右上3*/
    resize: { type: Array, default: () => [1, 1, 1, 1] },
    /**4边拉伸 右0 下1 左2 上3*/
    borderResize: { type: Array, default: () => [1, 1, 1, 1] },
    /**拖动目标*/
    move: { type: [String, Boolean], default: ".layer-vue-title-text" },
    /**移动结束回调*/
    moveEnd: { type: Function },
    /**关闭窗口回调*/
    cancel: { type: Function },
    /**打开窗口回调*/
    success: { type: Function },
    /**销毁窗口回调*/
    end: { type: Function },
    /**最大化回调*/
    full: { type: Function },
    /**最小化回调*/
    min: { type: Function },
    /**还原回调*/
    restore: { type: Function },
    /**拉伸时回调*/
    resizing: { type: Function },
    /**拉伸结束回调*/
    resizeEnd: { type: Function },
    /**清除内容*/
    destroyOnClose: { type: [Number, Boolean], default: false },
    /**动画*/
    anim: { type: Number, default: 1 },
    /**内容区*/
    content: {},
    /**标题高度*/
    titleHeight: { type: Number, default: 42 },
    /**皮肤*/
    skin: { type: [Object, String] },
    /**id*/
    id: { type: String, default: undefined },
    /**父元素*/
    el: { type: String },
    /**fixed*/
    fixed: { type: Boolean, default: true },
    /**关闭的动画*/
    isOutAnim: { type: [Boolean, Number], default: true },
    /**边框宽度*/
    borderWidth: { type: Number, default: 0 },
    /**打开时最大化*/
    isMax: { type: Boolean, default: false },
    /**是否保持高宽比例*/
    ratio: { type: Boolean, default: false },
    /**阴影*/
    shade: { type: [String, Number, Array, Boolean], default: false },
    /**点击阴影关闭*/
    shadeClose: { type: Boolean, default: false },
    /**是否添加到body*/
    appendToBody: { type: Boolean, default: false },
    /**内容区滑动条*/
    slider: { type: Boolean, default: true },
  },
  computed: {
    /**计算属性-内容区高度*/
    contentHeight: function () {
      let h = this.height - (this.title ? this.titleHeight : 0);
      h = h - this.defBorderWidth * 2;
      h <= 0 ? (h = 0) : null;
      return h;
    },
    /**计算属性-标题文本宽度*/
    textWidth: function () {
      return this.width - ((this.maxmin[0] ? 35 : 0) + (this.maxmin[1] ? 35 : 0) + 50);
    },
  },
  watch: {
    /**监测visible变化后改变defVisible*/
    visible: function (newvalue) {
      if (this.anim) {
        setTimeout(() => {
          this.defVisible = newvalue;
        }, 300);
      } else {
        this.defVisible = newvalue;
      }
    },
    /**监测defVisible变化后触发置顶和初始化*/
    defVisible: function (newvalue) {
      if (newvalue) {
        if (this.setTop) {
          const zIndex = this.$layer.o.setTop();
          this.defZIndex = zIndex;
        } else {
          this.defZIndex = this.zIndex;
        }
        this.$nextTick(() => {
          this.endAnim = false;
          this.init();
          if (this.model) {
            this.success && this.success(this.$el, this.index, this.id);
          } else {
            this.$emit("success", this.$el, this.index, this.id);
          }
        });
      }
    },
    /**监测isMax变化触发最大化函数*/
    isMax: function (newvalue) {
      if (newvalue !== this.maxBtn && this.$getDom(this.move)) {
        this.maxFun();
      }
    },
    /**检测最小化状态，切换鼠标手势*/
    minBtn: function (newvalue) {
      if (this.move != ".layer-vue-title-text" && this.$getDom(titleText)) {
        if (newvalue) {
          this.$getDom(titleText).style.cursor = "move";
        } else {
          this.$getDom(titleText).style.cursor = "";
        }
      }
    },
    maxBtn: function (nawvalue) {
      if (this.move && this.$getDom(this.move)) {
        if (nawvalue) {
          this.$getDom(this.move).style.cursor = "not-allowed";
        } else {
          this.$getDom(this.move).style.cursor = "move";
        }
      }
    },
    /**监测title变化传递给defTitle*/
    title: function (newvalue) {
      this.defTitle = newvalue;
    },
  },
  created() {
    //初始化数据
    if (!this.visible) {
      this.defVisible = this.visible;
    }
    if (this.title === "_$_l_a_y_e_r_v_u_e") {
      this.defTitle = this.$layer.o.title;
    } else {
      this.defTitle = this.title;
    }
    this.defSkin = {...this.$layer.o.skin};
    if (this.borderWidth === 0) {
      if (typeof this.skin === "string") {
        this.defBorderWidth = 3;
      } else {
        this.defBorderWidth = 0;
      }
    } else {
      this.defBorderWidth = this.borderWidth;
    }
    window.addEventListener("resize", this.windowResizeFun);
    if (this.visible || this.visible === undefined) {
      if (this.setTop) {
        const zIndex = this.$layer.o.setTop();
        this.defZIndex = zIndex;
      } else {
        this.defZIndex = this.zIndex;
      }
    }
  },
  mounted() {
    //判断是否要转移到body
    if (this.appendToBody && !this.model) {
      document.body.appendChild(this.$el);
    }
    const { width, height } = this.minAreaInit();
    this.minWidth = width;
    this.minHeight = height;
    if (!this.model) {
      this.index = this.$layer.o.instances.length;
      this.$layer.o.instances.push({ instance: this });
    }
    if (typeof this.skin === "object") {
      if (typeof this.defSkin === "object") {
        this.defSkin = merge(this.skin, this.defSkin);
      } else {
        if (this.borderWidth) this.borderWidth = 3;
      }
    } else if (typeof this.skin === "string") {
      this.defSkin = `${this.skin}`;
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
        if (this.setTop) {
          const zIndex = this.$layer.o.setTop();
          this.defZIndex = zIndex;
        } else {
          this.defZIndex = this.zIndex;
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
    window.removeEventListener("resize", this.windowResizeFun);
  },
  methods: {
    /**最小化时的拖动函数*/
    minMoveFun() {
      if (this.$getDom(titleText)) {
        this.$getDom(titleText).onmousedown = (e1) => {
          e1.preventDefault();
          const { x } = this;
          let clientX = e1.clientX;
          document.onmousemove = (e2) => {
            e2.preventDefault();
            let moveX = e2.clientX - clientX;
            let newX = parseInt(x) + parseInt(moveX);
            // 左2
            if (!parseInt(this.moveOut[2]) && newX <= this.moveOutPadding[2]) {
              newX = this.moveOutPadding[2];
            }
            // 右0
            if (!parseInt(this.moveOut[0]) && newX >= docelm.clientWidth - minimizeWidth - this.moveOutPadding[0]) {
              newX = docelm.clientWidth - minimizeWidth - this.moveOutPadding[0];
            }
            this.x = newX;
          };
          this.callback("moveEnd");
        };
      }
    },
    /**浏览器发生resize时重置窗口*/
    windowResizeFun() {
      //!窗口最大化时调整窗口大小贴合浏览器，退出调整
      if (this.maxBtn) {
        this.width = docelm.clientWidth;
        this.height = docelm.clientHeight;
        return;
      }
      //调整左偏移保证窗口在屏幕内
      if (this.x + this.width >= docelm.clientWidth) {
        this.x = docelm.clientWidth - this.width;
      }
      //左平移为0时停止调整
      if (this.x <= 0) {
        this.x = 0;
      }
      //! 窗口最小化时调整上偏移，退出调整
      if (this.minBtn) {
        this.y = docelm.clientHeight - this.height;
        return;
      }
      //调整上偏移
      if (this.y + this.height >= docelm.clientHeight) {
        this.y = docelm.clientHeight - this.height;
      }
      //上偏移为0时停止调整
      if (this.y <= 0) {
        this.y = 0;
      }
      //窗口允许拉伸时，调整窗口大小保持在浏览器内部
      if (!this.ratio && (this.resize[0] || this.resize[1])) {
        if (this.width >= docelm.clientWidth) {
          this.width = docelm.clientWidth;
        }
        if (this.width <= this.minWidth) {
          this.width = this.minWidth;
        }
        if (this.height >= docelm.clientHeight) {
          this.height = docelm.clientHeight;
        }
        if (this.height <= this.minHeight) {
          this.height = this.minHeight;
        }
      }
    },
    /**重置layer窗口大小和定位的函数*/
    resetFun() {
      this.maxBtn = false;
      this.minBtn = false;
      this.x = this.initData.x;
      this.y = this.initData.y;
      this.width = this.initData.width;
      this.height = this.initData.height;
      this.moveFun(this.move);
    },
    /**初始化函数*/
    init() {
      this.maxBtn = false;
      this.minBtn = false;
      if (this.$refs.content.children.length) {
        this.$refs.content.children[0].style.display = "block";
      }
      if (this.shade && this.defSkin.shade) {
        if (typeof this.shade === "number") {
          if (this.shade !== 1) {
            this.defSkin.shade.background = `rgba(0, 0, 0,${this.shade})`;
          }
        } else if (this.shade instanceof Array && this.shade.length >= 2) {
          this.defSkin.shade.background = `${this.shade[1]}${(this.shade[0] * 255).toString(16)}`;
        } else if (typeof this.shade === "string") {
          if (this.shade !== "1") {
            this.defSkin.shade = { background: this.shade };
          }
        }
      }
      const { height, width } = this.areaInit();
      const { x, y } = this.offsetInit(this.offset, width, height);
      this.initData = { width, height, x, y };
      this.l = { width, height, x, y };
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.moveFun(this.move);
      if (this.isMax) {
        this.maxFun();
      }
    },
    /**最小尺寸初始化函数*/
    minAreaInit() {
      let width = 300;
      let height = 200;
      if (this.minArea instanceof Array) {
        width = this.PxTransitionFun(this.minArea[0], "clientWidth");
        height = this.PxTransitionFun(this.minArea[1], "clientHeight");
      } else if (typeof this.minArea === "string" || typeof this.minArea === "number") {
        width = this.PxTransitionFun(this.minArea, "clientWidth");
      }
      if (isNaN(height)) {
        height = 200;
      }
      if (isNaN(width)) {
        width = 300;
      }
      return { height, width };
    },
    /**最大尺寸初始化函数*/
    maxAreaInit() {
      let width = docelm.clientWidth;
      let height = docelm.clientHeight;
      if (this.maxArea instanceof Array) {
        width = this.PxTransitionFun(this.maxArea[0], "clientWidth");
        height = this.PxTransitionFun(this.maxArea[1], "clientHeight");
      } else if (typeof this.maxArea === "string" || typeof this.maxArea === "number") {
        width = this.PxTransitionFun(this.maxArea, "clientWidth");
      }
      if (isNaN(height)) {
        height = docelm.clientHeight;
      }
      if (isNaN(width)) {
        width = docelm.clientWidth;
      }
      return { height, width };
    },
    /**高宽初始化函数*/
    areaInit() {
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
        width = this.PxTransitionFun(this.area[0], "clientWidth") + this.defBorderWidth * 2;
        if (this.area[1]) {
          height = this.PxTransitionFun(this.area[1], "clientHeight") + this.defBorderWidth * 2;
        } else {
          height = this.childrenH + this.titleHeight + this.defBorderWidth * 2;
        }
      } else {
        if (this.area === "auto") {
          width = this.childrenW + this.defBorderWidth * 2;
        } else {
          width = this.PxTransitionFun(this.area, "clientWidth") + this.defBorderWidth * 2;
        }
        height = this.childrenH + this.titleHeight + this.defBorderWidth * 2;
      }
      if (width > docelm.clientWidth && docelm.clientWidth > this.minWidth) {
        width = docelm.clientWidth;
      } else if (width <= this.minWidth) {
        width = this.minWidth;
      }
      if (height > docelm.clientHeight && docelm.clientHeight > this.minHeight) {
        height = docelm.clientHeight;
      } else if (height <= this.minHeight) {
        height = this.minHeight;
      }
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (height > maxHeight) {
        height = maxHeight;
      }
      if (isNaN(height)) {
        height = this.minHeight;
      }
      if (isNaN(width)) {
        width = this.minWidth;
      }
      return { height, width };
    },
    /**偏移量初始化函数*/
    offsetInit(offset, width, height, anim = -1) {
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
          x = this.PxTransitionFun(offset[1], "clientWidth");
        } else {
          x = (docelm.clientWidth - width) * 0.5;
        }
        y = this.PxTransitionFun(offset[0], "clientHeight");
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
    /**长度处理函数*/
    PxTransitionFun(value, client) {
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
    /**关闭窗口函数*/
    close() {
      //隐藏窗口
      if (!this.defVisible) {
        this.$layer.o.log && console.warn("[layer-warn]layer-vue-" + this.index + " is closed");
        return false;
      }
      this.defVisible = false;
      if (!this.model) {
        //若传入了visible，则更新visible为false
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
      //获取窗口DOM元素
      const layerDOM = document.getElementById("layer-vue-" + this.index);
      const warn = () => console.warn("[layer-warn]:No layer with id ：layer-vue-" + this.index + "found");
      //判断当前layer窗口打开模式（true：以$layer.open()打开，false:以组件形式）
      if (this.model) {
        //this.visible=false
        //窗口配置项，关闭后则为null
        const instances = this.$layer.o.instances[this.index];
        //判断窗口配置项是否存在
        if (instances) {
          //判断内容区是否是DOM
          if (instances.instance._ishtml) {
            //判断窗口DOM元素是否存在
            if (layerDOM) {
              //获取内容区外层DOM
              const content = layerDOM.querySelector(".layer-vue-content");
              //判断内容区是否是新建DOM
              if (instances.instance._isnewDOM) {
                //删除新建DOM
                content.removeChild(content.children[0]);
              } else {
                //判断窗口父元素是否存在
                if (layerDOM.parentNode) {
                  //还原内容区位置
                  if (this.$getDom(this.move)) {
                    this.$getDom(this.move).style.cursor = "default";
                    this.$getDom(this.move).onmousedown = null;
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
                  //销毁窗口回调
                  this.end && this.end(this.$el, this.index, this.id);
                } else {
                  //窗口不存在或已经关闭
                  this.$layer.o.log && warn();
                  return false;
                }
                return true;
              }
            } else {
              //窗口不存在或已经关闭
              this.$layer.o.log && warn();
              return false;
            }
            //判断子组件是否存在
          } else if (instances.Vuecomponent) {
            instances.Vuecomponent.$destroy();
          }
        }
        let node = document.body;
        //判断el是否存在
        if (document.querySelector(instances.instance._el)) {
          node = document.querySelector(instances.instance._el);
        }
        //判断layer窗口是否存在
        if (layerDOM) {
          //删除layerDOM
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
    /**关闭前判断*/
    beforeCloseFun() {
      return new Promise((res, rej) => {
        if (this.anim && this.isOutAnim) {
          this.endAnim = true;
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
    /**最大化函数*/
    maxFun() {
      this.maxBtn = !this.maxBtn;
      this.$emit("update:isMax", this.maxBtn);
      if (this.maxBtn) {
        if (this.move && this.$getDom(this.move)) {
          this.$getDom(this.move).onmousedown = null;
        }
        if (this.minBtn) {
          this.minBtn = false;
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
        this.moveFun(this.move);
        this.x = this.l.x;
        this.y = this.l.y;
        this.width = this.l.width;
        this.height = this.l.height;
        if (this.model) {
          this.restore && this.restore(this.$el, this.index, this.id);
        } else {
          this.$emit("restore", this.$el, this.index, this.id);
        }
        if (this.move && this.$getDom(this.move)) {
          this.$getDom(this.move).style.cursor = "move";
        }
      }
    },
    /**最小化函数*/
    minFun() {
      this.minBtn = !this.minBtn;
      if (this.minBtn) {
        this.minMoveFun();
        if (this.maxBtn) {
          this.maxBtn = false;
        } else {
          this.l.x = this.x;
          this.l.y = this.y;
          this.l.width = this.width;
          this.l.height = this.height;
        }
        this.x = this.l.x;
        this.y = docelm.clientHeight - this.titleHeight;
        this.height = this.titleHeight;
        this.width = minimizeWidth;
        if (this.model) {
          this.min && this.min(this.$el, this.index, this.id);
        } else {
          this.$emit("min", this.$el, this.index, this.id);
        }
      } else {
        this.moveFun(this.move);
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
    /**置顶函数*/
    setTopFun() {
      if (this.setTop) {
        this.defZIndex = this.$layer.o.setTop();
      }
    },
    /**回调函数*/
    callback(callback) {
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
    /**左下拉伸函数*/
    lbResiezFun(e1) {
      e1.preventDefault();
      const { minWidth, minHeight, width, height, x, y, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientX = e1.clientX;
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        let moveY = e2.clientY - clientY;
        this.l.width = parseInt(width) - parseInt(moveX);
        this.l.height = parseInt(height) + parseInt(moveY);
        this.l.x = parseInt(x) + parseInt(moveX);
        if (this.l.width <= minWidth) {
          this.l.width = minWidth;
        }
        if (this.l.width + this.l.x >= x + width) {
          this.l.x = x + width - this.l.width;
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
        }
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
          this.l.x = x + width - maxWidth;
        }
        // 左2
        if (!parseInt(this.moveOut[2]) && this.l.x <= this.moveOutPadding[2]) {
          this.l.x = this.moveOutPadding[2];
          this.l.width = x + width - this.moveOutPadding[2];
        }
        // 下1
        if (!parseInt(this.moveOut[1]) && this.l.height + y >= docelm.clientHeight - this.moveOutPadding[1]) {
          this.l.height = docelm.clientHeight - y - this.moveOutPadding[1];
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          if (this.l.width * reciprocaLayerRatio > this.l.height - titleHeight) {
            this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            // 下1
            if (!parseInt(this.moveOut[1]) && this.l.height + y >= docelm.clientHeight - this.moveOutPadding[1]) {
              this.l.height = docelm.clientHeight - y - this.moveOutPadding[1];
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            if (this.l.height <= minHeight) {
              this.l.height = minHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            this.l.x = x - (this.l.width - width);
          } else {
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            if (this.l.width >= maxWidth) {
              this.l.width = maxWidth;
              this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            }
            this.l.x = x - (this.l.width - width);
            // 左2
            if (!parseInt(this.moveOut[2]) && this.l.x <= this.moveOutPadding[2]) {
              this.l.x = this.moveOutPadding[2];
              this.l.width = x + width - this.moveOutPadding[2];
              this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            }
          }
        }

        this.width = this.l.width;
        this.height = this.l.height;
        this.x = this.l.x;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**右下拉伸函数*/
    rbResiezFun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minWidth, minHeight, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientX = e1.clientX;
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        let moveY = e2.clientY - clientY;
        this.l.width = parseInt(width) + parseInt(moveX);
        this.l.height = parseInt(height) + parseInt(moveY);
        if (this.l.width <= minWidth) {
          this.l.width = minWidth;
        }
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
        }
        // 右0
        if (!parseInt(this.moveOut[0]) && this.l.width + x >= docelm.clientWidth - this.moveOutPadding[0]) {
          this.l.width = docelm.clientWidth - x - this.moveOutPadding[0];
        }
        // 下1
        if (!parseInt(this.moveOut[1]) && this.l.height + y >= docelm.clientHeight - this.moveOutPadding[1]) {
          this.l.height = docelm.clientHeight - y - this.moveOutPadding[1];
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          if (this.l.width * reciprocaLayerRatio > this.l.height - titleHeight) {
            this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            // 下1
            if (!parseInt(this.moveOut[1]) && this.l.height + y >= docelm.clientHeight - this.moveOutPadding[1]) {
              this.l.height = docelm.clientHeight - y - this.moveOutPadding[1];
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            if (this.l.height <= minHeight) {
              this.l.height = minHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
          } else {
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            // 右0
            if (!parseInt(this.moveOut[0]) && this.l.width + x >= docelm.clientWidth - this.moveOutPadding[0]) {
              this.l.width = docelm.clientWidth - x - this.moveOutPadding[0];
              this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            }
            if (this.l.width >= maxWidth) {
              this.l.width = maxWidth;
              this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            }
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
      this.callback("resizeEnd");
    },
    /**左上拉伸函数*/
    ltResiezFun(e1) {
      e1.preventDefault();
      const { minWidth, minHeight, width, height, x, y, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientX = e1.clientX;
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        let moveY = e2.clientY - clientY;
        this.l.width = parseInt(width) - parseInt(moveX);
        this.l.height = parseInt(height) - parseInt(moveY);
        this.l.y = parseInt(y) + parseInt(moveY);
        this.l.x = parseInt(x) + parseInt(moveX);
        if (this.l.width <= minWidth) {
          this.l.width = minWidth;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
          this.l.x = x + width - maxWidth;
        }
        if (this.l.width + this.l.x >= x + width) {
          this.l.x = x + width - this.l.width;
        }
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.height + this.l.y >= y + height) {
          this.l.y = y + height - this.l.height;
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
          this.l.y = y + height - minHeight;
        }
        // 上3
        if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
          this.l.y = this.moveOutPadding[3];
          this.l.height = y + height - this.moveOutPadding[3];
        }
        // 左2
        if (!parseInt(this.moveOut[2]) && this.l.x <= this.moveOutPadding[2]) {
          this.l.x = this.moveOutPadding[2];
          this.l.width = width + x - this.moveOutPadding[2];
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          if (this.l.width * reciprocaLayerRatio > this.l.height - titleHeight) {
            this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            if (this.l.height <= minHeight) {
              this.l.height = minHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
              this.l.x = x + width - this.l.width;
            }
            if (this.l.height >= maxHeight) {
              this.l.height = maxHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            this.l.y = y + height - this.l.height;
          } else {
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            this.l.x = x + width - this.l.width;

            if (this.l.height <= minHeight) {
              this.l.height = minHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
              this.l.x = x + width - this.l.width;
            }
            if (this.l.width >= maxWidth) {
              this.l.width = maxWidth;
              this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
              this.l.x = x + width - this.l.width;
              this.l.y = y + height - this.l.height;
            }
          }
          // 上3
          if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
            this.l.y = this.moveOutPadding[3];
            this.l.height = y + height - this.moveOutPadding[3];
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            this.l.x = x + width - this.l.width;
          }
          // 左2
          if (!parseInt(this.moveOut[2]) && this.l.x <= this.moveOutPadding[2]) {
            this.l.x = this.moveOutPadding[2];
            this.l.width = width + x - this.moveOutPadding[2];
            this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            this.l.y = y + height - this.l.height;
          }
        }

        this.width = this.l.width;
        this.height = this.l.height;
        this.x = this.l.x;
        this.y = this.l.y;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**右上拉伸函数*/
    rtResiezFun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minWidth, minHeight, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientX = e1.clientX;
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        let moveY = e2.clientY - clientY;
        this.l.width = parseInt(width) + parseInt(moveX);
        this.l.height = parseInt(height) - parseInt(moveY);
        this.l.y = parseInt(y) + parseInt(moveY);
        if (this.l.width <= minWidth) {
          this.l.width = minWidth;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
        }
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.height + this.l.y >= y + height) {
          this.l.y = y + height - this.l.height;
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
          this.l.y = y + height - minHeight;
        }
        // 右0
        if (!parseInt(this.moveOut[0]) && this.l.width + x >= docelm.clientWidth - this.moveOutPadding[0]) {
          this.l.width = docelm.clientWidth - x - this.moveOutPadding[0];
        }
        // 上3
        if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
          this.l.y = this.moveOutPadding[3];
          this.l.height = y + height - this.moveOutPadding[3];
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          if (this.l.width * reciprocaLayerRatio > this.l.height - titleHeight) {
            this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            if (this.l.height <= minHeight) {
              this.l.height = minHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            if (this.l.height >= maxHeight) {
              this.l.height = maxHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            this.l.y = y + height - this.l.height;
          } else {
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            if (this.l.height <= minHeight) {
              this.l.height = minHeight;
              this.l.width = (this.l.height - titleHeight) * layerRatio;
            }
            if (this.l.width >= maxWidth) {
              this.l.width = maxWidth;
              this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
              this.l.y = y + height - this.l.height;
            }
          }
          // 上3
          if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
            this.l.y = this.moveOutPadding[3];
            this.l.height = y - this.moveOutPadding[3] + height;
            this.l.width = (this.l.height - titleHeight) * layerRatio;
          }
          // 右0
          if (!parseInt(this.moveOut[0]) && this.l.x + this.l.width >= docelm.clientWidth - this.moveOutPadding[0]) {
            this.l.width = docelm.clientWidth - this.l.x - this.moveOutPadding[0];
            this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
            this.l.y = y + height - this.l.height;
          }
        }
        this.y = this.l.y;
        this.width = this.l.width;
        this.height = this.l.height;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**左侧拉伸函数*/
    leftResizeFun(e1) {
      e1.preventDefault();
      const { minWidth, minHeight, width, height, x, y, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientX = e1.clientX;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        this.l.width = parseInt(width) - parseInt(moveX);
        this.l.x = parseInt(x) + parseInt(moveX);
        if (this.l.width <= minWidth) {
          this.l.width = minWidth;
        }
        if (this.l.width + this.l.x >= x + width) {
          this.l.x = x + width - this.l.width;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
          this.l.x = x + width - maxWidth;
        }
        // 左2
        if (!parseInt(this.moveOut[2]) && this.l.x <= this.moveOutPadding[2]) {
          this.l.x = this.moveOutPadding[2];
          this.l.width = x - this.moveOutPadding[2] + width;
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
          if (this.l.height <= minHeight) {
            this.l.height = minHeight;
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            this.l.x = x - (this.l.width - width);
          }
          if (this.l.height >= maxHeight) {
            this.l.height = maxHeight;
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            this.l.x = x - (this.l.width - width);
          }
          this.l.y = y - (this.l.height - height) * 0.5;
          // 下1
          if (!parseInt(this.moveOut[1]) && this.l.height + this.l.y >= docelm.clientHeight - this.moveOutPadding[1]) {
            this.l.height = docelm.clientHeight - this.l.y - this.moveOutPadding[1];
            this.l.width = (this.l.height - titleHeight) * layerRatio;
            this.l.x = x + width - this.l.width;
          }
          // 上3
          if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
            this.l.y = this.moveOutPadding[3];
          }
          this.height = this.l.height;
          this.y = this.l.y;
        }
        this.width = this.l.width;
        this.x = this.l.x;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**右侧拉伸函数*/
    rightResizeFun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minWidth, minHeight, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientX = e1.clientX;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveX = e2.clientX - clientX;
        this.l.width = parseInt(width) + parseInt(moveX);
        if (this.l.width <= minWidth) {
          this.l.width = minWidth;
        }
        if (this.l.width > maxWidth) {
          this.l.width = maxWidth;
        }
        // 右0
        if (!parseInt(this.moveOut[0]) && this.l.width + x >= docelm.clientWidth - this.moveOutPadding[0]) {
          this.l.width = docelm.clientWidth - x - this.moveOutPadding[0];
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
        }
        // 下1
        if (!parseInt(this.moveOut[1]) && this.l.height + y >= docelm.clientHeight - this.moveOutPadding[1]) {
          this.l.height = docelm.clientHeight - y - this.moveOutPadding[1];
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          this.l.height = this.l.width * reciprocaLayerRatio + titleHeight;
          if (this.l.height <= minHeight) {
            this.l.height = minHeight;
            this.l.width = (this.l.height - titleHeight) * layerRatio;
          }
          if (this.l.height >= maxHeight) {
            this.l.height = maxHeight;
            this.l.width = (this.l.height - titleHeight) * layerRatio;
          }
          this.l.y = y - (this.l.height - height) * 0.5;
          // 下1
          if (!parseInt(this.moveOut[1]) && this.l.height + this.l.y >= docelm.clientHeight - this.moveOutPadding[1]) {
            this.l.y = docelm.clientHeight - this.l.height - this.moveOutPadding[1];
          }
          // 上3
          if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
            this.l.y = this.moveOutPadding[3];
          }
          this.height = this.l.height;
          this.y = this.l.y;
        }
        this.width = this.l.width;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**下侧拉伸函数 */
    bottomResizeFun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minWidth, minHeight, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveY = e2.clientY - clientY;
        this.l.height = parseInt(height) + parseInt(moveY);
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
        }
        // 下1
        if (!parseInt(this.moveOut[1]) && this.l.height + y >= docelm.clientHeight - this.moveOutPadding[1]) {
          this.l.height = docelm.clientHeight - y - this.moveOutPadding[1];
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          this.l.width = (this.l.height - titleHeight) * layerRatio;
          if (this.l.width >= maxWidth) {
            this.l.width = maxWidth;
            this.l.height = maxWidth * reciprocaLayerRatio + titleHeight;
          }
          if (this.l.width <= minWidth) {
            this.l.width = minWidth;
            this.l.height = minWidth * reciprocaLayerRatio + titleHeight;
            this.l.y = y + height - this.l.height;
          }
          this.l.x = x - (this.l.width - width) * 0.5;
          // 左2
          if (!parseInt(this.moveOut[2]) && this.l.x < this.moveOutPadding[2]) {
            this.l.x = this.moveOutPadding[2];
          }
          // 右0
          if (!parseInt(this.moveOut[0]) && this.l.x + this.l.width >= docelm.clientWidth - this.moveOutPadding[0]) {
            this.l.x = docelm.clientWidth - this.l.width - this.moveOutPadding[0];
          }
          this.width = this.l.width;
          this.x = this.l.x;
        }

        this.height = this.l.height;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**上侧拉伸函数 */
    topResizeFun(e1) {
      e1.preventDefault();
      const { width, height, x, y, minWidth, minHeight, ratio } = this;
      const { width: maxWidth, height: maxHeight } = this.maxAreaInit();
      const clientY = e1.clientY;
      document.onmousemove = (e2) => {
        e2.preventDefault();
        let moveY = e2.clientY - clientY;
        this.l.height = parseInt(height) - parseInt(moveY);
        this.l.y = parseInt(y) + parseInt(moveY);
        if (this.l.height > maxHeight) {
          this.l.height = maxHeight;
        }
        if (this.l.height + this.l.y >= y + height) {
          this.l.y = y + height - this.l.height;
        }
        if (this.l.height <= minHeight) {
          this.l.height = minHeight;
          this.l.y = y + height - minHeight;
        }
        // 上3
        if (!parseInt(this.moveOut[3]) && this.l.y <= this.moveOutPadding[3]) {
          this.l.y = this.moveOutPadding[3];
          this.l.height = y - this.moveOutPadding[3] + height;
        }
        if (ratio) {
          const titleHeight = this.title ? this.titleHeight : 0;
          const layerRatio = this.initData.width / (this.initData.height - titleHeight);
          const reciprocaLayerRatio = 1 / layerRatio;
          this.l.width = (this.l.height - titleHeight) * layerRatio;

          if (this.l.width >= maxWidth) {
            this.l.width = maxWidth;
            this.l.height = maxWidth * reciprocaLayerRatio + titleHeight;
            this.l.y = y + height - this.l.height;
          }
          if (this.l.width <= minWidth) {
            this.l.width = minWidth;
            this.l.height = minWidth * reciprocaLayerRatio + titleHeight;
            this.l.y = y + height - this.l.height;
          }
          this.l.x = x - (this.l.width - width) * 0.5;
          // 左2
          if (!parseInt(this.moveOut[2]) && this.l.x <= this.moveOutPadding[2]) {
            this.l.x = this.moveOutPadding[2];
          }
          // 右0
          if (!parseInt(this.moveOut[0]) && this.l.x + this.l.width >= docelm.clientWidth - this.moveOutPadding[0]) {
            this.l.x = docelm.clientWidth - this.l.width - this.moveOutPadding[0];
          }
          this.width = this.l.width;
          this.x = this.l.x;
        }
        this.y = this.l.y;
        this.height = this.l.height;
        if (this.model) {
          this.resizing && this.resizing(this.$el, this.width, this.height);
        } else {
          this.$emit("resizing", this.$el, this.width, this.height);
        }
      };
      this.callback("resizeEnd");
    },
    /**退出最大、最小化*/
    restoreFun() {
      this.minBtn = false;
      this.maxBtn = false;
      this.$emit("update:isMax", this.maxBtn);
      this.x = this.l.x;
      this.y = this.l.y;
      this.width = this.l.width;
      this.height = this.l.height;
      this.$getDom(this.move).style.cursor = "move";
      this.moveFun(this.move);
    },
    /**移动函数*/
    moveFun(move) {
      if (this.$getDom(move)) {
        this.$getDom(move).style.cursor = "move";
        if (this.$getDom(titleText)) {
          this.$getDom(titleText).onmousedown = null;
        }
        this.$getDom(move).onmousedown = (e1) => {
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
              //上3
              if (!parseInt(this.moveOut[3]) && newX <= this.moveOutPadding[3]) {
                newX = this.moveOutPadding[3];
              }
              //下1
              if (!parseInt(this.moveOut[1]) && newX >= docelm.clientWidth - this.minWidth - this.moveOutPadding[1]) {
                newX = docelm.clientWidth - this.minWidth - this.moveOutPadding[1];
              }
              this.x = newX;
            };
            this.callback("moveEnd");
          } else {
            const { x, y } = this;
            let clientX = e1.clientX;
            let clientY = e1.clientY;
            document.onmousemove = (e2) => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let moveY = e2.clientY - clientY;
              let newX = parseInt(x) + parseInt(moveX);
              let newY = parseInt(y) + parseInt(moveY);
              //右0
              if (!parseInt(this.moveOut[0]) && newX >= docelm.clientWidth - this.width - this.moveOutPadding[0]) {
                newX = docelm.clientWidth - this.width - this.moveOutPadding[0];
              }
              //下1
              if (!parseInt(this.moveOut[1]) && newY >= docelm.clientHeight - this.height - this.moveOutPadding[1]) {
                newY = docelm.clientHeight - this.height - this.moveOutPadding[1];
              }
              //左2
              if (!parseInt(this.moveOut[2]) && newX <= this.moveOutPadding[2]) {
                newX = this.moveOutPadding[2];
              }
              //上3
              if (!parseInt(this.moveOut[3]) && newY <= this.moveOutPadding[3]) {
                newY = this.moveOutPadding[3];
              }
              this.x = newX;
              this.y = newY;
              this.l.x = newX;
              this.l.y = newY;
            };
            this.callback("moveEnd");
          }
        };
      }
    },
    /**遮罩关闭函数*/
    shadeCloseFun() {
      if (this.shadeClose) {
        this.beforeCloseFun();
      }
    },
    /**重置窗口大小*/
    reloadAutoAreaFun() {
      this.$nextTick(() => {
        if (this.area === "auto") {
          const { height, width } = this.areaInit();
          this.initData.width = width;
          this.initData.height = height;
          this.width = width;
          this.height = height;
        }
      });
    },
    /**获取dom*/
    $getDom(dom) {
      return this.$el.querySelector(dom);
    },
  },
};
export { merge };
</script>
