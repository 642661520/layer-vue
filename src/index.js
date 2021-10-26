import LayerBox, {
  LayerVue,
  merge,
  version,
  versions
} from "../packages/layer/main";
import "../packages/theme/css/index.css";
const skin = {
  background: "#fff",
  boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
  title: {
    background: "transparent",
    color: "#000",
    borderBottom: "1px solid #f0f0f0"
  },
  content: {
    background: "transparent",
    color: "#000"
  },
  slider: {
    background: "rgba(153, 153, 153, 0.5)"
  },
  shade: { background: "rgba(0, 0, 0, 0.3)" },
  maxmin: {
    background: "transparent",
    color: "#000",
    backgroundHover: "#6666",
    colorHover: "#008afc"
  },
  close: {
    background: "transparent",
    color: "#000",
    backgroundHover: "#f00",
    colorHover: "#fff"
  }
};
const install = function(Vue, options = {}) {
  console.log(
    `%c layer-vue %c v${version} %c`,
    "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
  Vue.component(LayerVue.name, LayerVue);
  Vue.prototype.$layer = LayerBox(Vue);
  let newSkin = skin;
  if (options.skin) {
    if (typeof options.skin === "object") {
      newSkin = merge(options.skin, skin);
    } else {
      newSkin = options.skin;
    }
  }
  Vue.prototype.$layer.o = {
    log: options && options.log ? options.log : false,
    title: options && options.title ? options.title : "信息",
    zIndex: options && options.zIndex ? options.zIndex : 100,
    skin: newSkin,
    setTop: () => {
      Vue.prototype.$layer.o.zIndex = Vue.prototype.$layer.o.zIndex + 1;
      return Vue.prototype.$layer.o.zIndex;
    },
    instances: []
  };
};
export default {
  version,
  versions,
  LayerBox,
  install
};
export { version, versions, LayerBox, install };
