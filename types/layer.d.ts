import Vue from "vue";

/** VueLayer Component */
export declare class Layer extends Vue {
  title: String | Boolean;
  content: String | Array<any> | Number;
  area: String | Array<any> | Number;
  offset: String | Array<any> | Number;
  anim: Number;
  closeBtn: Number | Boolean;
  maxmin: Array<any>;
  resize: Number | Boolean;
  lbresize: Number | Boolean;
  zIndex: Number;
  settop: Function;
  move: String | Boolean;
  moveOut: Array<any>;
  moveEnd: Function;
  success: Function;
  destroyOnClose: Boolean;
  cancel: Function;
  end: Function;
  full: Function;
  min: Function;
  restore: Function;
}
