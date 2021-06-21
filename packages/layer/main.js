import LayerVue, {merge } from "./main.vue";
LayerVue.install = function(Vue) {
  Vue.component(LayerVue.name, LayerVue);
};
const version = '0.1.9';
const LayerBox = function (Vue) {
  const LayerBoxConstructor = Vue.extend(LayerVue);
  const layer = function(options) {
    return layer.open(options);
  };
  layer.open = (options={}) => {
  // id
    if (options.id) {
      let index = Vue.prototype.$layer.o.instances.findIndex(value => {
        if (value) {
          return value.instance.id === options.id;
        }
      });
        if (index >= 0) {
        if (!options.destroyOnClose) {
          Vue.prototype.$layer.o.instances[index].instance.defvisible = true;
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
    const { skin } = Vue.prototype.$layer.o
    if (options.skin) {
      options.skin=  merge(options.skin, skin)
    } else {
      options.skin=skin
    }
    // 判断内容区类型
    if (typeof options.content === "object") {
      // DOM类型
      if (options.content instanceof HTMLElement) {
        // DOM树中的元素
        if (options.content.parentNode) {
          // 根据其父元素的calss判断是不是是已经打开的layer窗口
          if (options.content.parentNode.className.indexOf("layer-vue") >= 0) {
            // 返回打开窗口的index
            return options.content.parentNode.parentNode.dataset.index;
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
        if (options.content.component) {
          options.content.component = Vue.extend(options.content.component);
        } else {
          console.warn("[layer warn]:Incorrect content type");
        }
      }
    }
    let index = Vue.prototype.$layer.o.instances.length;
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
      if (options.content.parentNode) {
        let parentDiv = options.content.parentNode;
        parentDiv.insertBefore(instance.vm.$el, options.content);
      } else {
        if (document.querySelector(options.el)) {
          document.querySelector(options.el).appendChild(instance.vm.$el);
        } else {
          document.body.appendChild(instance.vm.$el);
        }
      }
      instance.vm.$el.querySelector(".layer-vue-content").appendChild(options.content);
    } else {
      switch (typeof options.content) {
        case "function":
        case "number":
        case "string":
        case "boolean":
          instance.vm.$el.querySelector(".layer-vue-content").innerHTML =options.content;
          break;
        case "object":
          break;
        case "array":
        default:
          console.warn("[layer warn]:Incorrect content type");
          break;
      }
      if (document.querySelector(options.el)) {
        document.querySelector(options.el).appendChild(instance.vm.$el);
      } else {
        document.body.appendChild(instance.vm.$el);
      }
    }
    Vue.prototype.$layer.o.instances.push({ index, instance });
    return index;
  };
  layer.close = index => {
    if (index === undefined) {
      console.warn("[layer-warn]:The index is undefined");
      return;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances) {
      instances.instance.closefun();
    } else {
      console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
    }
  };
  layer.reset = index => {
    if (index === undefined) {
      console.warn("[layer-warn]:The index is undefined");
      return;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances) {
      instances.instance.resetfun();
    } else {
      console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
    }
  };
  layer.closeAll = () => {
    Vue.prototype.$layer.o.instances.forEach(element => {
      if (element) {
        element.instance.closefun()
      }
    });
  }
  layer.version = version;
  return layer;
};

export default LayerBox;
export { LayerVue,merge,version };
