import layerVue,{c,p,v,d,de,n,t} from "./main.vue";
layerVue.install = function(Vue) {
  Vue.component(layerVue.name, layerVue);
};
const LayerBox = (function (Vue) {
  const LayerBoxConstructor = Vue.extend(layerVue);
  const Layer = function (options) {
    return Layer.open(options)
  };
  Layer.open = options => {
    let instance = new LayerBoxConstructor();
    instance.ishtml = false;
    if (typeof options.content === "object") {
      if (options.content instanceof HTMLElement) {
        if (
          options.content.parentNode &&
          options.content.parentNode.className.indexOf("layer-vue") >= 0
        ) {
          return options.content.parentNode.parentNode.dataset.id;
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
            Vue.prototype.$LayerOptions.instances[eleid].instance.defaultvisible=true
          }
          return eleid;
        }
      }
    }
    let id = Vue.prototype.$LayerOptions.instances.length;
    options.id = id;
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
          d
            [v.qs]("#" + options.appid)
            .appendChild(instance.vm.$el);
        } else {
          d.body.appendChild(instance.vm.$el);
        }
      }
      instance.vm.$el
        [v.qs](".layer-vue-content")
        .appendChild(options.content);
    } else {
      if (d[v.qs]("#" + options.appid)) {
        d[v.qs]("#" + options.appid).appendChild(instance.vm.$el);
      } else {
        d.body.appendChild(instance.vm.$el);
      }
    }
    Vue.prototype.$LayerOptions.instances.push({ id, instance });
    return id;
  };
  Layer.close = (id) => {
    if (id===undefined) {
      return
    }
    const instances = Vue.prototype.$LayerOptions.instances[id]
        if (instances) {
          instances.instance.closeLayer()
        }
    // if (instances) {
    //   instances.instance.closeLayer()
    //   if (instances.Vuecomponent) {
    //     instances.Vuecomponent.$destroy();
    //   }
    //   if (instances.instance.ishtml && d[v.gid]("layer-vue-" + id)
    //   ) {
    //     let parentDiv = d[v.gid]("layer-vue-" + id).parentNode;
    //     parentDiv.insertBefore(d[v.qs]('[data-id="' + id + '"]')[v.qs](".layer-vue-content").children[0],d[v.gid]("layer-vue-" + id)
    //     );
    //   }
    // }
    // let node = d.body;
    // if (d[v.gid](appid)) {
    //   node = d[v.gid](appid);
    // }
    // if (d[v.gid]("layer-vue-" + id)) {
    //   node.removeChild(d[v.gid]("layer-vue-" + id));
    //   delete Vue.prototype.$LayerOptions.instances[id];
    // } else {
    //   console.warn("[layer-warn]:未找到id为：layer-vue-" + id + " 的layer窗口");
    // }
  };
  return Layer;
});

export default LayerBox;
export { layerVue,c,p,v,d,de,n,t };
