<script>
import vuepublic from '../../public/public'
export default {
  name: "SuiLayer",
  data() {
    return {
      // 默认开启
      defaultvisible: true,
      // 最大化按钮
      maxbtn: false,
      minbtn: false,
      // 最小宽度
      minwidth: 300,
      // 最小高度
      minheight: 200,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 1,
      transition: "none",
      overflow: "hidden",
      id:Math.random()+Math.random(),
    };
  },
  props: {
    title: { type: [String, Boolean], default: "信息" },
    area: { type: [String, Array], default: "auto" },
    offset: { type: [String, Array, Number], default: "auto" },
    settop: { type: Boolean,default:false },
    moveOut: { type: Array, default: () => [0, 0, 0, 0] },
    visible: {type: Boolean,default:true},
    zindex: { type: Number, default: 1 },
    closeBtn: { type: [Number, Boolean], default: true },
    maxmin: { type: Array, default: () => [0, 0] },
    resize: { type: [Number, Boolean], default: true },
    lbresize: { type: [Number, Boolean], default: true },
    moveEnd: { type: Function },
    move: { type: [String, Boolean], default: ".layer-vue-title" },
    cancel: { type: Function },
    success: { type: Function },
    end: { type: Function },
    full: { type: Function },
    min: { type: Function },
    restore: { type: Function },
    destroyOnClose: { type: [Number, Boolean], default: false },
    amin: { type: Number, default: 0 },
    content: {},
  },
...vuepublic
};
</script>