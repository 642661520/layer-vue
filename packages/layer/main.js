import layerVue, { c, p, v, d, de, n, t } from "./main.vue";
layerVue.install = function(Vue) {
  Vue.component(layerVue.name, layerVue);
};
// TODO 2个问题：1.ID，2.自定义皮肤。
const LayerBox = function(Vue) {
  const LayerBoxConstructor = Vue.extend(layerVue);
  const Layer = function(options) {
    return Layer.open(options);
  };
  Layer.open = options => {
    let instance = new LayerBoxConstructor();
    // 强制删除传入的visible属性
    delete options.visible;
    // const { skin } = Vue.prototype.$LayerOptions
    // if (options.skin) {
    //   options.skin=  mergeoptions(options.skin, skin)
    // } else {
    //   options.skin=skin
    // }
    // 判断内容区类型
    if (typeof options.content === "object") {
      // DOM类型
      if (options.content instanceof HTMLElement) {
        // DOM树中的元素
        if (options.content.parentNode) {
          // 根据其父元素的calss判断是不是是已经打开的layer窗口
          if (options.content.parentNode.className.indexOf("layer-vue") >= 0) {
            console.log(options.content.parentNode);
            // 返回打开窗口的id
            return options.content.parentNode.parentNode.dataset.id;
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
          // 查找组件是否已经被挂载
        let eleid = Vue.prototype.$LayerOptions.instances.findIndex(value => {
          if (value) {
            return value.instance.id === options.id;
          }
        });
          console.log(eleid);
          if (eleid >= 0) {
          if (!options.destroyOnClose) {
            Vue.prototype.$LayerOptions.instances[eleid].instance.defaultvisible = true;
          }
          // return eleid;
        }
        } else {
          console.log("[layer warn]:Incorrect content type");
        }
      }
    }
    let id = Vue.prototype.$LayerOptions.instances.length;
    if (options.id === undefined) {
      options.id = id;
    } else {
      id= options.id;
    }
    options.model = 1;
    if (!options.appid) {
      options.appid = "app";
    }
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    instance.id = id;
    instance.vm = instance.$mount();
    if (instance.ishtml) {
      if (options.content.parentNode) {
        let parentDiv = options.content.parentNode;
        parentDiv.insertBefore(instance.vm.$el, options.content);
      } else {
        if (d[v.qs]("#" + options.appid)) {
          d[v.qs]("#" + options.appid).appendChild(instance.vm.$el);
        } else {
          d.body.appendChild(instance.vm.$el);
        }
      }
      instance.vm.$el[v.qs](".layer-vue-content").appendChild(options.content);
    } else {
      switch (typeof options.content) {
        case "function":
        case "number":
        case "string":
        case "boolean":
          instance.vm.$el[v.qs](".layer-vue-content").innerHTML =
            options.content;
          break;
        case "object":
          break;
        case "array":
        default:
          console.log("[layer warn]:Incorrect content type");
          break;
      }
      if (d[v.qs]("#" + options.appid)) {
        d[v.qs]("#" + options.appid).appendChild(instance.vm.$el);
      } else {
        d.body.appendChild(instance.vm.$el);
      }
    }
    Vue.prototype.$LayerOptions.instances.push({ id, instance });
    return id;
  };
  Layer.close = id => {
    if (id === undefined) {
      console.log("[layer-warn]:The id is undefined");
      return;
    }
    const instances = Vue.prototype.$LayerOptions.instances[id];
    if (instances) {
      instances.instance.closeLayer();
    } else {
      console.log("[layer-warn]:No layer with id ：layer-vue-" + id + "found");
    }
  };
  Layer.restore = id => {
    if (id === undefined) {
      console.log("[layer-warn]:The id is undefined");
      return;
    }
    const instances = Vue.prototype.$LayerOptions.instances[id];
    if (instances) {
      instances.instance.init();
    } else {
      console.log("[layer-warn]:No layer with id ：layer-vue-" + id + "found");
    }
  };
  return Layer;
};

export default LayerBox;
export { layerVue, c, p, v, d, de, n, t };
