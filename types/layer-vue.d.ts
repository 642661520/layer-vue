import Vue from "vue";
import { LayerVueComponent } from "./component";
import { Layer } from "./layer";
import { LayerBox } from "./layerbox";
export const version: string;
export function install(vue: typeof Vue): void;
export type Component = LayerVueComponent;
export const MessageBox: LayerBox;
export class Layer extends Layer {}
