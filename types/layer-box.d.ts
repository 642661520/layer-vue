import Vue from 'vue'
export declare class LayerVueComponent extends Vue {
}
export interface LayerVueBoxOptions {
}
export interface LayerVueBox {
}
declare module 'vue/types/vue' {
  interface Vue {
    /** Show a message box */
    $open: LayerVueBox
  }
}