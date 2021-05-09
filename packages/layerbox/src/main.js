import Vue from "vue";
import layerVue from "./main.vue";
const LayerBoxConstructor = Vue.extend(layerVue);

const LayerBox = function(options, callback) {
  return LayerBox.open(options);
};
LayerBox.open = options => {
  let instance = new LayerBoxConstructor();
  instance.ishtml = false;
  if (typeof options.content === "object") {
    if (options.content instanceof HTMLElement) {
      if (
        options.content.parentNode &&
        options.content.parentNode.className.indexOf("layer-vue") >= 0
      ) {
        return options.content.parentNode.dataset.id;
      }
      instance.ishtml = true;
    } else {
      options.content.component = Vue.extend(options.content.component);
      let eleid = Vue.prototype.$LayerOptions.instances.findIndex(value => {
        if (value) {
          return value.instance.content.component === options.content.component;
        }
      });
      if (eleid >= 0) {
        if (options.destroyOnClose === false) {
          console.log(Vue.prototype.$LayerOptions.instances[eleid].instance.defaultvisible);
          
          Vue.prototype.$LayerOptions.instances[eleid].instance.defaultvisible=true
        }
        return eleid;
      }
    }
  }

  let id = Vue.prototype.$LayerOptions.instances.length;

  options.id = id;
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
      if (document.querySelector("#" + options.appid)) {
        document
          .querySelector("#" + options.appid)
          .appendChild(instance.vm.$el);
      } else {
        document.body.appendChild(instance.vm.$el);
      }
    }
    instance.vm.$el
      .querySelector(".layer-vue-content")
      .appendChild(options.content);
  } else {
    if (document.querySelector("#" + options.appid)) {
      document.querySelector("#" + options.appid).appendChild(instance.vm.$el);
    } else {
      document.body.appendChild(instance.vm.$el);
    }
  }
  Vue.prototype.$LayerOptions.instances.push({ id, instance });
  return id;
};
LayerBox.close = (id, appid = "app") => {
  if (Vue.prototype.$LayerOptions.instances[id].instance.destroyOnClose === false) {
    // console.log();
    
    Vue.prototype.$LayerOptions.instances[id].instance.closeLayer()
    // Vue.prototype.$LayerOptions.instances[id].instance.visible = false
    return
  }
  if (
    Vue.prototype.$LayerOptions.instances[id] &&
    Vue.prototype.$LayerOptions.instances[id].Vuecomponent
  ) {
    Vue.prototype.$LayerOptions.instances[id].Vuecomponent.$destroy();
  }
  if (
    Vue.prototype.$LayerOptions.instances[id] &&
    Vue.prototype.$LayerOptions.instances[id].instance.ishtml &&
    document.getElementById("layer-vue-" + id)
  ) {
    let parentDiv = document.getElementById("layer-vue-" + id).parentNode;
    parentDiv.insertBefore(
      document
        .querySelector('[data-id="' + id + '"]')
        .querySelector(".layer-vue-content").children[0],
      document.getElementById("layer-vue-" + id)
    );
  }
  let node = document.body;
  if (document.getElementById(appid)) {
    node = document.getElementById(appid);
  }
  if (document.getElementById("layer-vue-" + id)) {
    node.removeChild(document.getElementById("layer-vue-" + id));
    delete Vue.prototype.$LayerOptions.instances[id];
  } else {
    console.warn("[layer-warn]:未找到id为：layer-vue-" + id + " 的layer窗口");
  }
};
export default LayerBox;
export { LayerBox };
