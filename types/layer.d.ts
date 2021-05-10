import { LayerVueComponent } from './component'
export const version: string
/** Layer Component */
export declare class Layer extends LayerVueComponent {
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
export interface LayerVueBoxOptions {
}
export interface LayerVueBox {
}
declare module 'vue/types/vue' {
  interface Vue {
    $open: LayerVueBox
  }
}