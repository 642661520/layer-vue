import LayerBox, {layerVue,c,p,v,d,de,n,t} from "../packages/layer/main";
import "../packages/theme/css/index.css";
const install = function (Vue, options) {
  Vue.component(layerVue.name, layerVue);
  Vue.directive('drag', {
    bind: function (el, binding) {
      const l = {};
      const that = binding.value.getthis();
      const f = (callback) => {
        d[v.up] = e => {
          e.preventDefault();
          that.transition = t
          callback && callback()
          d[v.move] = null;
          d[v.up] = null;
        };
    }
      // 置顶事件
      el[v.d] = () => {
        if (that.settop) {
          that.zIndex = that.$LayerOptions.settop();
        }
      };
      el[v.add]('transitionend', e => {
        if (e.propertyName === 'width') {
          that.overflow = 'auto'
        }
      });
      // 窗口移动事件
      if (el[v.qs](that.move)) {
        el[v.qs](that.move).style.cursor = 'move';
        el[v.qs](that.move)[v.d]= e1 => {
          if (el.className.indexOf(c.ismax) >= 0) {
            return;
          }
          that.transition = n;
          if (el.className.indexOf(c.ismin) >= 0) {
            const {
              x
            } = that;
            let clientX = e1.clientX;
            d[v.move] = e2 => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let newX = p(x) + p(moveX);
              if (!p(that.moveOut[3]) && newX <= 0) {
                newX = 0;
              }
              if (!p(that.moveOut[1]) && newX >= de[v.cw] - that.minwidth) {
                newX = de[v.cw] - that.minwidth;
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
            d[v.move] = e2 => {
              e2.preventDefault();
              let moveX = e2.clientX - clientX;
              let moveY = e2.clientY - clientY;
              let newX = p(x) + p(moveX);
              if (!p(that.moveOut[3]) && newX <= 0) {
                newX = 0;
              }
              if (
                !p(that.moveOut[1]) &&
                newX >= de[v.cw] - that.width
              ) {
                newX =
                  de[v.cw] -
                  that.width;
              }
              let newY = p(y) + p(moveY);
              if (!p(that.moveOut[0]) && newY <= 0) {
                newY = 0;
              }
              if (
                !p(that.moveOut[2]) &&
                newY >=
                de[v.ch] -
                that.height
              ) {
                newY =
                  de[v.ch] -
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
      if (el[v.qs](c.max)) {
        el[v.qs](c.max)[v.on] = () => {
          that.maxbtn = !that.maxbtn;
          if (that.maxbtn) {
            if (that.move) {
              el[v.qs](that.move).style.cursor = 'not-allowed';
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
            that.width = de[v.cw];
            that.height = de[v.ch];
            that.full && that.full();
          } else {
            that.x = (l.x);
            that.y = (l.y);
            that.width = (l.width);
            that.height = (l.height);
            that.restore && that.restore();
            if (that.move) {
              el[v.qs](that.move).style.cursor = 'move';
            }
          }
        };
      }

      // 最小化按钮
      if (el[v.qs]([c.min])) {
        el[v.qs]([c.min])[v.on] = () => {
          that.minbtn = !that.minbtn;
          if (that.minbtn) {
            if (that.move) {
              el[v.qs](that.move).style.cursor ='move';
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
            that.y = de[v.ch] - that.titleheight;
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
      el[v.qs]([c.rz])[v.d]= e1 => {
        e1.preventDefault();
        that.transition = n
        const { width, height, x, y, minwidth, minheight } = that;
        const clientX = e1.clientX;
        const clientY = e1.clientY;
        d[v.move] = e2 => {
          e2.preventDefault();
          let moveX = e2.clientX - clientX;
          let moveY = e2.clientY - clientY;
          l.width = p(width) + p(moveX);
          l.height = p(height) + p(moveY);
          if (l.width <= minwidth) {
            l.width = minwidth;
          }
          if (l.width + x >= de[v.cw]) {
            l.width = de[v.cw] - x;
          }
          if (l.height <= minheight) {
            l.height = minheight;
          }
          if (l.height + y >= de[v.ch]) {
            l.height = de[v.ch] - y;
          }
          that.width = l.width;
          that.height = l.height;
        };
        f()
      };
      // 左下拉伸
      el[v.qs]([c.lbrz])[v.d]= e1 => {
        e1.preventDefault();
        that.transition = n
        const { minwidth, minheight,width,height,x } = that;
        const clientX = e1.clientX;
        const clientY = e1.clientY;
        d[v.move] = e2 => {
          e2.preventDefault();
          let moveX = e2.clientX - clientX;
          let moveY = e2.clientY - clientY;
          l.width = p(width) - p(moveX);
          l.height = p(height) + p(moveY);
          let newX = p(x) + p(moveX);
          if (l.width <= minwidth) {
            l.width = minwidth;
          }
          if (l.width + newX >= x + width) {
            newX = x + width - l.width ;
          }
          if (l.height <= minheight) {
            l.height = minheight;
          }
          if (!p(that.moveOut[3]) && newX <= 0) {
            newX= 0;
            l.width = x + width;
          }
          that.width = l.width;
          that.height = l.height;
          that.x=newX;
        };
        f()
      };
    }
  });
  Vue.prototype.$Layer = LayerBox(Vue);
  Vue.prototype.$LayerOptions = {
    zindex: options && options.zindex ? options.zindex : 100,
    skin:options && options.skin ? options.skin : undefined,
    settop: () => {
      Vue.prototype.$LayerOptions.zindex =
        Vue.prototype.$LayerOptions.zindex + 1;
      return Vue.prototype.$LayerOptions.zindex;
    },
    instances: []
  };
};
export default {
  version: "0.0.1",
  LayerBox,
  install
};
