import LayerBox from "../packages/layerbox/index";
import SuiLayer from "../packages/layer/index";
import "../packages/theme/src/index.css";
const components = [SuiLayer];
const install = function(Vue, options) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.directive("drag", {
    bind: function(el, binding) {
      // 置顶事件
      el.onmousedown = () => {
        if (binding.value.settop) {
          const zindex = binding.value.settopfun();
          binding.value.setzIndex(zindex);
        }
      };
      el.addEventListener("transitionend", e => {
        if (e.propertyName === "width") {
          binding.value.setoverflow("auto");
        }
      });
      // 窗口移动事件
      if (el.querySelector(binding.value.move)) {
        el.querySelector(binding.value.move).style.cursor = "move";
        el.querySelector(binding.value.move).onmousedown = e1 => {
          if (el.className.indexOf("layer-vue-ismax") >= 0) {
            return;
          }
          binding.value.settransition();
          if (el.className.indexOf("layer-vue-ismin") >= 0) {
            const x = binding.value.getx();
            let clientX = e1.clientX;
            document.onmousemove = e2 => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let X = parseInt(x) + parseInt(moveX);
              if (!parseInt(binding.value.moveOut[3]) && X <= 0) {
                X = 0;
              }
              if (
                !parseInt(binding.value.moveOut[1]) &&
                X >=
                  document.documentElement.clientWidth - binding.value.minwidth
              ) {
                X =
                  document.documentElement.clientWidth - binding.value.minwidth;
              }
              binding.value.setx(X);
            };
            document.onmouseup = e => {
              e.preventDefault();
              binding.value.settransition(true);
              document.onmousemove = null;
              document.onmouseup = null;
            };
          } else {
            const x = binding.value.getx();
            const y = binding.value.gety();
            let clientX = e1.clientX;
            let clientY = e1.clientY;
            document.onmousemove = e2 => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let moveY = e2.clientY - clientY;
              binding.value.x = parseInt(x) + parseInt(moveX);
              if (!parseInt(binding.value.moveOut[3]) && binding.value.x <= 0) {
                binding.value.x = 0;
              }
              if (
                !parseInt(binding.value.moveOut[1]) &&
                binding.value.x >=
                  document.documentElement.clientWidth -
                    binding.value.getwidth()
              ) {
                binding.value.x =
                  document.documentElement.clientWidth -
                  binding.value.getwidth();
              }
              binding.value.y = parseInt(y) + parseInt(moveY);
              if (!parseInt(binding.value.moveOut[0]) && binding.value.y <= 0) {
                binding.value.y = 0;
              }
              if (
                !parseInt(binding.value.moveOut[2]) &&
                binding.value.y >=
                  document.documentElement.clientHeight -
                    binding.value.getheight()
              ) {
                binding.value.y =
                  document.documentElement.clientHeight -
                  binding.value.getheight();
              }
              binding.value.setx(binding.value.x);
              binding.value.sety(binding.value.y);
            };
            document.onmouseup = e => {
              e.preventDefault();
              binding.value.settransition(true);
              binding.value.moveEnd && binding.value.moveEnd();
              document.onmousemove = null;
              document.onmouseup = null;
            };
          }
        };
      }

      // 最大化按钮
      if (el.querySelector(".layer-vue-max")) {
        el.querySelector(".layer-vue-max").onclick = () => {
          binding.value.setmax();
          if (binding.value.getmax()) {
            if (binding.value.move) {
              el.querySelector(binding.value.move).style.cursor = "not-allowed";
            }
            if (binding.value.getmin()) {
              binding.value.setmin(false);
            } else {
              binding.value.x = binding.value.getx();
              binding.value.y = binding.value.gety();
              binding.value.width = binding.value.getwidth();
              binding.value.height = binding.value.getheight();
            }
            binding.value.setx(0);
            binding.value.sety(0);
            binding.value.setwidth(document.documentElement.clientWidth);
            binding.value.setheight(document.documentElement.clientHeight);
            binding.value.full && binding.value.full();
          } else {
            binding.value.setx(binding.value.x);
            binding.value.sety(binding.value.y);
            binding.value.setwidth(binding.value.width);
            binding.value.setheight(binding.value.height);
            binding.value.restore && binding.value.restore();
            if (binding.value.move) {
              el.querySelector(binding.value.move).style.cursor = "move";
            }
          }
        };
      }

      // 最小化按钮
      if (el.querySelector(".layer-vue-min")) {
        el.querySelector(".layer-vue-min").onclick = () => {
          binding.value.setmin();
          if (binding.value.getmin()) {
            if (binding.value.move) {
              el.querySelector(binding.value.move).style.cursor = "move";
            }
            if (binding.value.getmax()) {
              binding.value.setmax(false);
            } else {
              binding.value.x = binding.value.getx();
              binding.value.y = binding.value.gety();
              binding.value.width = binding.value.getwidth();
              binding.value.height = binding.value.getheight();
            }

            binding.value.setx(binding.value.getx());
            binding.value.sety(document.documentElement.clientHeight - 42);
            binding.value.setheight(42);
            binding.value.setwidth(binding.value.minwidth);
            binding.value.min && binding.value.min();
          } else {
            binding.value.setx(binding.value.x);
            binding.value.sety(binding.value.y);
            binding.value.setwidth(binding.value.width);
            binding.value.setheight(binding.value.height);
            binding.value.restore && binding.value.restore();
          }
        };
      }
      // 右下拉伸
      el.querySelector(".layer-vue-resize").onmousedown = e1 => {
        e1.preventDefault();
        binding.value.settransition();
        const { minwidth, minheight } = binding.value;
        const width = binding.value.getwidth();
        const height = binding.value.getheight();
        const x = binding.value.getx();
        const y = binding.value.gety();
        let clientX = e1.clientX;
        let clientY = e1.clientY;
        document.onmousemove = e2 => {
          e2.preventDefault();
          let moveX = e2.clientX - clientX;
          let moveY = e2.clientY - clientY;
          binding.value.width = parseInt(width) + parseInt(moveX);
          binding.value.height = parseInt(height) + parseInt(moveY);
          if (binding.value.width <= minwidth) {
            binding.value.width = minwidth;
          }
          if (binding.value.width + x >= document.documentElement.clientWidth) {
            binding.value.width = document.documentElement.clientWidth - x;
          }
          if (binding.value.height <= minheight) {
            binding.value.height = minheight;
          }
          if (
            binding.value.height + y >=
            document.documentElement.clientHeight
          ) {
            binding.value.height = document.documentElement.clientHeight - y;
          }
          binding.value.setwidth(binding.value.width);
          binding.value.setheight(binding.value.height);
        };
        document.onmouseup = e => {
          e.preventDefault();
          binding.value.settransition(true);
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
      // 左下拉伸
      el.querySelector(".layer-vue-lbresize").onmousedown = e1 => {
        e1.preventDefault();
        binding.value.settransition();
        const { minwidth, minheight } = binding.value;
        const width = binding.value.getwidth();
        const height = binding.value.getheight();
        const x = binding.value.getx();
        let clientX = e1.clientX;
        let clientY = e1.clientY;
        document.onmousemove = e2 => {
          e2.preventDefault();
          let moveX = e2.clientX - clientX;
          let moveY = e2.clientY - clientY;
          binding.value.width = parseInt(width) - parseInt(moveX);
          binding.value.height = parseInt(height) + parseInt(moveY);
          binding.value.x = parseInt(x) + parseInt(moveX);
          if (binding.value.width <= minwidth) {
            binding.value.width = minwidth;
          }
          if (binding.value.width + binding.value.x >= x + width) {
            binding.value.x = x + width - binding.value.width;
          }
          if (binding.value.height <= minheight) {
            binding.value.height = minheight;
          }
          if (!parseInt(binding.value.moveOut[3]) && binding.value.x <= 0) {
            binding.value.x = 0;
            binding.value.width = x + width;
          }
          binding.value.setwidth(binding.value.width);
          binding.value.setheight(binding.value.height);
          binding.value.setx(binding.value.x);
        };
        document.onmouseup = e => {
          e.preventDefault();
          binding.value.settransition(true);
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  });
  Vue.prototype.$Layer = LayerBox;
  Vue.prototype.$LayerOptions = {
    zindex: options &&options.zindex ? options.zindex : 100,
    settop: () => {
      Vue.prototype.$LayerOptions.zindex =
        Vue.prototype.$LayerOptions.zindex + 1;
      return Vue.prototype.$LayerOptions.zindex;
    },
    instances:[]
  };
};
export default {
  version: "0.0.1",
  SuiLayer,
  install
};
