import LayerVue, { merge } from "./main.vue";

LayerVue.install = function(Vue) {
  Vue.component(LayerVue.name, LayerVue);
};
// 当前版本
const version = "0.4.2";
// 版本记录
const versions = [
  "0.0.1",
  "0.0.2",
  "0.0.3",
  "0.0.4",
  "0.0.5",
  "0.0.6",
  "0.0.7",
  "0.1.0",
  "0.1.1",
  "0.1.2",
  "0.1.3",
  "0.1.4",
  "0.1.5",
  "0.1.6",
  "0.1.9",
  "0.1.10",
  "0.1.11",
  "0.1.12",
  "0.2.0",
  "0.2.1",
  "0.2.2",
  "0.2.3",
  "0.2.4",
  "0.2.6",
  "0.3.0",
  "0.3.1",
  "0.3.2",
  "0.3.3",
  "0.3.4",
  "0.3.5",
  "0.3.6",
  "0.3.7",
  "0.3.8",
  "0.3.10",
  "0.3.11",
  "0.4.0",
  "0.4.1",
  "0.4.2"
];
// 查找layer函数
const findIndex = (id, Vue) => {
  let index = -1;
  if (typeof id === "number") {
    index = id;
  } else if (typeof id === "string") {
    const arr = [...Vue.prototype.$layer.o.instances];
    index = arr.reverse().findIndex(value => {
      if (value) {
        return value.instance.id === id;
      }
    });
    if (index >= 0) {
      index = arr.length - 1 - index;
    }
  }
  return index;
};
const LayerBox = function(Vue) {
  const LayerBoxConstructor = Vue.extend(LayerVue);
  const layer = function(options) {
    return layer.open(options);
  };
  // 新建layer
  layer.open = (options = {}) => {
    if (typeof options.title === "object") {
      options.title = options.parent.title;
    }
    if (options.id) {
      let index = findIndex(options.id, Vue);
      if (index >= 0) {
        let instance = Vue.prototype.$layer.o.instances[index].instance;
        if (!instance.destroyOnClose) {
          if (instance.model) {
            instance.defVisible = true;
          } else {
            instance.$emit("update:visible", true);
            if (!instance.defVisible) {
              instance.defVisible = true;
            }
          }
        }
        return index;
      }
    } else {
      options.destroyOnClose = true;
    }
    // 强制删除传入的visible属性
    delete options.visible;
    // 合并全局皮肤配置到默认配置
    const { skin } = Vue.prototype.$layer.o;
    if (options.skin) {
      if (typeof options.skin === "string") {
      } else {
        options.skin = merge(options.skin, skin);
      }
    } else {
      options.skin = skin;
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
          options.isnewDOM = true;
        }
        // DOM类型绑定状态
        options.ishtml = true;
      } else {
        // 根据component判断内容区是否为Vue组件
        if (options.content.component) {
          options.content.component = Vue.extend(options.content.component);
          options.isComponent = true;
        } else {
          Vue.prototype.$layer.o.log &&
            console.warn("[layer warn]:Incorrect content type");
        }
      }
    }
    let index = Vue.prototype.$layer.o.instances.length;
    let instance = new LayerBoxConstructor({
      propsData: {
        ...options
      }
    });
    instance._ishtml = options.ishtml;
    instance._isnewDOM = options.isnewDOM;
    instance._isComponent = options.isComponent;
    instance.$data.index = index;
    instance.$data.model = 1;
    instance.vm = instance.$mount();
    if (options.parent) {
      instance.vm.$parent = options.parent;
      options.parent.$children.push(instance.vm);
    }
    if (instance._ishtml) {
      if (options.content.parentNode) {
        let parentDiv = options.content.parentNode;
        if (options.appendToBody) {
          const solt = document.createElement("div");
          solt.className = "layer-vue-solt-" + index;
          parentDiv.insertBefore(solt, options.content);
          document.body.appendChild(instance.vm.$el);
        } else {
          parentDiv.insertBefore(instance.vm.$el, options.content);
        }
      } else {
        document.body.appendChild(instance.vm.$el);
      }
      instance.vm.$el
        .querySelector(".layer-vue-content")
        .appendChild(options.content);
    } else {
      switch (typeof options.content) {
        case "function":
        case "number":
        case "string":
        case "boolean":
          instance.vm.$el.querySelector(".layer-vue-content").innerHTML =
            options.content;
          break;
        case "object":
          break;
        case "array":
        default:
          Vue.prototype.$layer.o.log &&
            console.warn("[layer warn]:Incorrect content type");
          break;
      }
      document.body.appendChild(instance.vm.$el);
    }
    Vue.prototype.$layer.o.instances.push({
      instance
    });
    return index;
  };
  // 关闭layer
  layer.close = async index => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances) {
      let result = await instances.instance.beforeCloseFun();
      return result;
    } else {
      Vue.prototype.$layer.o.log &&
        console.warn(
          "[layer-warn]:No layer with index ：layer-vue-" + index + " found"
        );
      return false;
    }
  };
  // 重置layer窗口大小和定位的方法
  layer.reset = index => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances) {
      instances.instance.resetFun();
      return true;
    } else {
      Vue.prototype.$layer.o.log &&
        console.warn(
          "[layer-warn]:No layer with index ：layer-vue-" + index + " found"
        );
      return false;
    }
  };
  // 关闭所有layer窗口的方法
  layer.closeAll = async () => {
    let closeAll = [];
    Vue.prototype.$layer.o.instances.forEach(element => {
      if (element) {
        closeAll.push(element.instance.beforeCloseFun());
      }
    });
    let result = await Promise.all(closeAll);
    return result;
  };
  // 最大化layer窗口大小
  layer.full = index => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances && instances.instance.maxBtn === false) {
      instances.instance.maxFun();
      return true;
    } else {
      Vue.prototype.$layer.o.log &&
        console.warn(
          "[layer-warn]:No layer with index ：layer-vue-" + index + " found"
        );
      return false;
    }
  };
  // 最小化layer窗口大小
  layer.min = index => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances && instances.instance.minBtn === false) {
      instances.instance.minFun();
      return true;
    } else {
      Vue.prototype.$layer.o.log &&
        console.warn(
          "[layer-warn]:No layer with index ：layer-vue-" + index + " found"
        );
      return false;
    }
  };
  // 退出最大、最小化
  layer.restore = index => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances) {
      instances.instance.restoreFun();
      return true;
    } else {
      Vue.prototype.$layer.o.log &&
        console.warn(
          "[layer-warn]:No layer with index ：layer-vue-" + index + " found"
        );
      return false;
    }
  };
  // 重新打开指定的layer窗口
  layer.openAgain = index => {
    if (typeof index !== "object") {
      index = findIndex(index, Vue);
      if (index >= 0 && index < Vue.prototype.$layer.o.instances.length) {
        let instance = Vue.prototype.$layer.o.instances[index].instance;
        if (!instance.destroyOnClose && instance.defVisible === false) {
          if (instance.model) {
            instance.defVisible = true;
          } else {
            instance.$emit("update:visible", true);
            if (!instance.defVisible) {
              instance.defVisible = true;
            }
          }
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  // 重新设置title
  layer.setTitle = (index, value) => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instance = Vue.prototype.$layer.o.instances[index].instance;
    if (instance.model) {
      instance.$data.defTitle = value;
      return true;
    }
    return false;
  };
  // 重新设置内容
  layer.setContent = (index, value) => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instances = Vue.prototype.$layer.o.instances[index];
    if (instances.instance.model) {
      if (instances.instance._ishtml) {
      } else if (instances.instance._isComponent) {
        document
          .getElementById("layer-vue-" + instances.instance.index)
          .querySelector(".layer-vue-content")
          .removeChild(
            document
              .getElementById("layer-vue-" + instances.instance.index)
              .querySelector(".layer-vue-content").children[0]
          );
        let chlidinstance = new instances.instance.content.component({
          parent: instances.instance,
          propsData: value
        });
        for (const key in instances.Vuecomponent.$data) {
          if (Object.hasOwnProperty.call(instances.Vuecomponent.$data, key)) {
            chlidinstance.$data[key] = instances.Vuecomponent.$data[key];
          }
        }
        chlidinstance.vm = chlidinstance.$mount();
        instances.instance.$children = [chlidinstance.vm];
        instances.Vuecomponent = chlidinstance;
        document
          .getElementById("layer-vue-" + instances.instance.index)
          .querySelector(".layer-vue-content")
          .appendChild(chlidinstance.vm.$el);
      } else {
        document
          .getElementById("layer-vue-" + instances.instance.index)
          .querySelector(".layer-vue-content").innerHTML = value;
      }
    } else {
      return false;
    }
  };
  // 手动重置窗口大小，只在area为默认值时有效
  layer.reloadAutoArea = index => {
    index = findIndex(index, Vue);
    if (index < 0) {
      return false;
    }
    const instance = Vue.prototype.$layer.o.instances[index].instance;
    if (instance) {
      instance.reloadAutoAreaFun();
      return true;
    }
    return false;
  };
  layer.version = version;
  layer.versions = versions;
  return layer;
};

export default LayerBox;
export { LayerVue, merge, version, versions };
