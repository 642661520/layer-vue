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
    background: "#fff",
    color: "#000",
    borderBottom: '1px solid #f0f0f0'
  },
  content: {
    background: "#fff",
    color: "#000"
  },
  maxmin: {
    background: "#fff",
    color: "#000",
    backgroundHover: "#6666",
    colorHover: "#008afc"
  },
  close: {
    background: "#fff",
    color: "#000",
    backgroundHover: "#f00",
    colorHover: "#fff"
  }
};
const install = function(Vue, options) {
  console.log(
    `%c layer-vue %c v${version} %c`,
    "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
  Vue.component(LayerVue.name, LayerVue);
  Vue.prototype.$layer = LayerBox(Vue);
  let newskin = skin;
  if (options.skin) {
    if (typeof options.skin === "object") {
      newskin = merge(options.skin, skin);
    } else {
      newskin = options.skin;
    }
  }
  Vue.prototype.$layer.o = {
    log: options && options.log ? options.log : false,
    zindex: options && options.zindex ? options.zindex : 100,
    skin: newskin,
    settop: () => {
      Vue.prototype.$layer.o.zindex = Vue.prototype.$layer.o.zindex + 1;
      return Vue.prototype.$layer.o.zindex;
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
