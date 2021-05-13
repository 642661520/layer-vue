import LayerVue, { c, p, v, d, de, n, t,merge } from "./main.vue";
LayerVue.install = function(Vue) {
  Vue[c.t](LayerVue.name, LayerVue);
};
const version = '0.1.4';
const LayerBox = function (Vue) {
  const LayerBoxConstructor = Vue.extend(LayerVue);
  const layer = function(options) {
    return layer.open(options);
  };
  layer.open = (options={}) => {
  // id
    if (options.id) {
      let index = Vue[c.p][c.l].o.instances.findIndex(value => {
        if (value) {
          return value.instance.id === options.id;
        }
      });
        if (index >= 0) {
        if (!options.destroyOnClose) {
          Vue[c.p][c.l].o.instances[index].instance.defvisible = true;
        }
        return index;
        }
    } else {
      options.destroyOnClose=true
    }
    let instance = new LayerBoxConstructor();
    // 强制删除传入的visible属性
    delete options.visible;
    // 合并全局皮肤配置到默认配置
    const { skin } = Vue[c.p][c.l].o
    if (options.skin) {
      options.skin=  merge(options.skin, skin)
    } else {
      options.skin=skin
    }
    // 判断内容区类型
    if (typeof options[c.c] === "object") {
      // DOM类型
      if (options[c.c] instanceof HTMLElement) {
        // DOM树中的元素
        if (options[c.c][v.pn]) {
          // 根据其父元素的calss判断是不是是已经打开的layer窗口
          if (options[c.c][v.pn].className.indexOf("layer-vue") >= 0) {
            // 返回打开窗口的index
            return options[c.c][v.pn][v.pn].dataset.index;
          }
          // 新创建DOM
        } else {
          // 新创建DOM 打开时绑定状态
          instance.isnewDOM = true;
        }
        // DOM类型绑定状态
        instance.ishtml = true;
      }
      else {
        // 根据component判断内容区是否为Vue组件
        if (options[c.c][c.t]) {
          options[c.c][c.t] = Vue.extend(options[c.c][c.t]);
        } else {
          console.log("[layer warn]:Incorrect content type");
        }
      }
    }
    let index = Vue[c.p][c.l].o.instances.length;
    if (options.index === undefined) {
      options.index = index;
    } else {
      index= options.index;
    }
    options.model = 1;
    if (!options.el) {
      options.el = "#app";
    }
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    instance.index = index;
    instance.vm = instance.$mount();
    if (instance.ishtml) {
      if (options[c.c][v.pn]) {
        let parentDiv = options[c.c][v.pn];
        parentDiv.insertBefore(instance.vm.$el, options[c.c]);
      } else {
        if (d[v.qs](options.el)) {
          d[v.qs](options.el).appendChild(instance.vm.$el);
        } else {
          d.body.appendChild(instance.vm.$el);
        }
      }
      instance.vm.$el[v.qs](".layer-vue-content").appendChild(options[c.c]);
    } else {
      switch (typeof options[c.c]) {
        case "function":
        case "number":
        case "string":
        case "boolean":
          instance.vm.$el[v.qs](".layer-vue-content").innerHTML =
            options[c.c];
          break;
        case "object":
          break;
        case "array":
        default:
          console.log("[layer warn]:Incorrect content type");
          break;
      }
      if (d[v.qs](options.el)) {
        d[v.qs](options.el).appendChild(instance.vm.$el);
      } else {
        d.body.appendChild(instance.vm.$el);
      }
    }
    Vue[c.p][c.l].o.instances.push({ index, instance });
    return index;
  };
  layer.close = index => {
    if (index === undefined) {
      console.log("[layer-warn]:The index is undefined");
      return;
    }
    const instances = Vue[c.p][c.l].o.instances[index];
    if (instances) {
      instances.instance.close();
    } else {
      console.log("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
    }
  };
  layer.reset = index => {
    if (index === undefined) {
      console.log("[layer-warn]:The index is undefined");
      return;
    }
    const instances = Vue[c.p][c.l].o.instances[index];
    if (instances) {
      instances.instance.resetfun();
    } else {
      console.log("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
    }
  };
  layer.closeAll = () => {
    Vue[c.p][c.l].o.instances.forEach(element => {
      if (element) {
        element.instance.close()
      }
    });
  }
  layer.version = version;
  return layer;
};

export default LayerBox;
export { LayerVue, c, p, v, d, de, n, t,merge,version };
