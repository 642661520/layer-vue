import LayerBox from "../packages/layerbox/index";
import SuiLayer from "../packages/layer/index";
import  '../packages/theme/src/index.css'
const components = [SuiLayer];
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$Layer = LayerBox;
};
export default {
  version: "0.0.1",
  SuiLayer,
  install
};
