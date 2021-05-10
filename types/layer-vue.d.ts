import Vue from "vue";
import { LayerVueComponent } from "./component";
import { Layer } from "./layer";
export const version: string;
export function install(vue: typeof Vue): void;
export type Component = LayerVueComponent;
export const LayerBox: LayerBox;
export class Layer extends Layer {}
