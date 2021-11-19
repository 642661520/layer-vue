import LayerMsg from "./main.vue";

const MsgBox = function(Vue) {
  let instances = [];
  let seed = 1;
  const data = LayerMsg.data();

  const layer_msg = (msg = "info", options = {}) => {
    data.offset = options.offset ? options.offset : ["50%", "50%"];
    LayerMsg.data = () => {
      return {
        ...data
      };
    };
    const msgBoxConstructor = Vue.extend(LayerMsg);
    let instance = new msgBoxConstructor({
      propsData: {
        msg,
        ...options
      }
    });
    let id = "layer-msg-" + seed++;
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instances.forEach(() => {});
    instance.top = 0;
    instance.visible = true;
    instances.push(instance);
    for (let i = 0; i < instances.length - 1; i++) {
      let dom = instances[i].$el;
      dom.style["top"] =
        "calc(" +
        instances[i].myOffset[0] +
        " + " +
        (instances.length - 1 - i) * 50 +
        "px)";
    }
  };

  layer_msg.success = (msg = "success", options = {}) => {
    options.type = "success";
    layer_msg(msg, options);
  };
  layer_msg.info = (msg = "info", options = {}) => {
    options.type = "info";
    layer_msg(msg, options);
  };
  layer_msg.warning = (msg = "warning", options = {}) => {
    options.type = "warning";
    layer_msg(msg, options);
  };
  layer_msg.error = (msg = "error", options = {}) => {
    options.type = "error";
    layer_msg(msg, options);
  };
  layer_msg.close = function(id) {
    let length = instances.length;
    for (let i = 0; i < length; i++) {
      if (id === instances[i].id) {
        instances[i].onCancel && instances[i].onCancel();
        instances.splice(i, 1);
        break;
      }
    }
  };
  layer_msg.closeAll = () => {
    let list = [...instances];
    list.forEach(e => {
      e.close && e.close();
    });
    list = undefined;
  };
  return layer_msg;
};
export default MsgBox;
