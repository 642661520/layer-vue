import LayerBox, { LayerVue, merge, version } from "../packages/layer/main";
import "../packages/theme/css/index.css";
const skin = {
  background:"#fff",
  boxShadow: '1px 1px 50px rgb(0 0 0 / 30%)',
  title: {
    background: "#fff",
    color: "#000",
    borderColor: "#f0f0f0",
  },
  content: {
    background: "#fff",
    color: "#000",
  },
  maxmin: {
    background: "#fff",
    color: "#000",
    backgroundHover: "#6666",
    colorHover: "#008afc",
  },
  close: {
    background: "#fff",
    color: "#000",
    backgroundHover: "#f00",
    colorHover: "#fff",
  },
}
const install = function (Vue, options) {
  console.log(
    `%c layer-vue %c v${version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  )
  Vue.component(LayerVue.name, LayerVue);
  Vue.directive('layer', {
    bind: function (el, binding) {
      const l = {};
      const that = binding.value.getthis();
      const f = (callback) => {
        document.onmouseup = e => {
          e.preventDefault();
          callback && callback()
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
      // 置顶事件
      el.onmousedown = () => {
        if (that.settop) {
          that.zIndex = that.$layer.o.settop();
        }
      };
      // 窗口移动事件
      if (el.querySelector(that.move)) {
        el.querySelector(that.move).style.cursor = 'move';
        el.querySelector(that.move).onmousedown = e1 => {
          if (el.className.indexOf("layer-vue-ismax") >= 0) {
            return;
          }
          if (el.className.indexOf("layer-vue-ismin") >= 0) {
            const {
              x
            } = that;
            let clientX = e1.clientX;
            document.onmousemove = e2 => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let newX = parseInt(x) + parseInt(moveX);
              if (!parseInt(that.moveOut[3]) && newX <= 0) {
                newX = 0;
              }
              if (!parseInt(that.moveOut[1]) && newX >= document.documentElement.clientWidth - that.minwidth) {
                newX = document.documentElement.clientWidth - that.minwidth;
              }
              that.x = newX;
            };
            f()
          } else {
            const {
              x,
              y
            } = that;
            let clientX = e1.clientX;
            let clientY = e1.clientY;
            document.onmousemove = e2 => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let moveY = e2.clientY - clientY;
              let newX = parseInt(x) + parseInt(moveX);
              if (!parseInt(that.moveOut[3]) && newX <= 0) {
                newX = 0;
              }
              if (
                !parseInt(that.moveOut[1]) &&
                newX >= document.documentElement.clientWidth - that.width
              ) {
                newX =
                  document.documentElement.clientWidth -
                  that.width;
              }
              let newY = parseInt(y) + parseInt(moveY);
              if (!parseInt(that.moveOut[0]) && newY <= 0) {
                newY = 0;
              }
              if (
                !parseInt(that.moveOut[2]) &&
                newY >=
                document.documentElement.clientHeight -
                that.height
              ) {
                newY =
                  document.documentElement.clientHeight -
                  that.height;
              }
              that.x = newX;
              that.y = newY;
            };
            f(that.moveEnd)
          }
        };
      }

      // 最大化按钮
      if (el.querySelector(".layer-vue-max")) {
        el.querySelector(".layer-vue-max").onclick = () => {
          that.maxbtn = !that.maxbtn;
          if (that.maxbtn) {
            if (that.move) {
              el.querySelector(that.move).style.cursor = 'not-allowed';
            }
            if (that.minbtn) {
              that.minbtn = false;
            } else {
              l.x = that.x;
              l.y = that.y;
              l.width = that.width;
              l.height = that.height;
            }
            that.x = 0;
            that.y = 0;
            that.width = document.documentElement.clientWidth;
            that.height = document.documentElement.clientHeight;
            that.full && that.full();
          } else {
            that.x = (l.x);
            that.y = (l.y);
            that.width = (l.width);
            that.height = (l.height);
            that.restore && that.restore();
            if (that.move) {
              el.querySelector(that.move).style.cursor = 'move';
            }
          }
        };
      }

      // 最小化按钮
      if (el.querySelector(".layer-vue-min")) {
        el.querySelector(".layer-vue-min").onclick = () => {
          that.minbtn = !that.minbtn;
          if (that.minbtn) {
            if (that.move) {
              el.querySelector(that.move).style.cursor = 'move';
            }
            if (that.maxbtn) {
              that.maxbtn = false;
            } else {
              l.x = that.x;
              l.y = that.y;
              l.width = that.width;
              l.height = that.height;
            }
            that.x = l.x;
            that.y = document.documentElement.clientHeight - that.titleheight;
            that.height = that.titleheight;
            that.width = 200;
            that.min && that.min();
          } else {
            that.x = l.x;
            that.y = l.y;
            that.width = l.width;
            that.height = l.height;
            that.restore && that.restore();
          }
        };
      }
      // 右下拉伸
      if (el.querySelector(".layer-vue-resize")) {
        el.querySelector(".layer-vue-resize").onmousedown = e1 => {
          e1.preventDefault();
          const { width, height, x, y, minwidth, minheight } = that;
          const clientX = e1.clientX;
          const clientY = e1.clientY;
          document.onmousemove = e2 => {
            e2.preventDefault();
            let moveX = e2.clientX - clientX;
            let moveY = e2.clientY - clientY;
            l.width = parseInt(width) + parseInt(moveX);
            l.height = parseInt(height) + parseInt(moveY);
            if (l.width <= minwidth) {
              l.width = minwidth;
            }
            if (l.width + x >= document.documentElement.clientWidth) {
              l.width = document.documentElement.clientWidth - x;
            }
            if (l.height <= minheight) {
              l.height = minheight;
            }
            if (l.height + y >= document.documentElement.clientHeight) {
              l.height = document.documentElement.clientHeight - y;
            }
            that.width = l.width;
            that.height = l.height;
            that.resizing && that.resizing()
          };
          f(that.resizeEnd)
        };
      }
      // 左下拉伸
      if (el.querySelector(".layer-vue-lbresize")) {
        el.querySelector(".layer-vue-lbresize").onmousedown = e1 => {
          e1.preventDefault();
          const { minwidth, minheight, width, height, x } = that;
          const clientX = e1.clientX;
          const clientY = e1.clientY;
          document.onmousemove = e2 => {
            e2.preventDefault();
            let moveX = e2.clientX - clientX;
            let moveY = e2.clientY - clientY;
            l.width = parseInt(width) - parseInt(moveX);
            l.height = parseInt(height) + parseInt(moveY);
            let newX = parseInt(x) + parseInt(moveX);
            if (l.width <= minwidth) {
              l.width = minwidth;
            }
            if (l.width + newX >= x + width) {
              newX = x + width - l.width;
            }
            if (l.height <= minheight) {
              l.height = minheight;
            }
            if (!parseInt(that.moveOut[3]) && newX <= 0) {
              newX = 0;
              l.width = x + width;
            }
            that.width = l.width;
            that.height = l.height;
            that.x = newX;
            that.resizing && that.resizing();
          };
          f(that.resizeEnd)
        };
      }
    }
  });
  Vue.prototype.$layer = LayerBox(Vue);
  Vue.prototype.$layer.o = {
    zindex: options && options.zindex ? options.zindex : 100,
    skin: options && options.skin ? merge(options.skin, skin) : skin,
    settop: () => {
      Vue.prototype.$layer.o.zindex =
        Vue.prototype.$layer.o.zindex + 1;
      return Vue.prototype.$layer.o.zindex;
    },
    instances: []
  };
};
export default {
  version,
  LayerBox,
  install
};
export {
  version,
  LayerBox,
  install
};