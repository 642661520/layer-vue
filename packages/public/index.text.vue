<template>
  <div
v-cloak
οndragstart="return false;"
v-if="destroyOnClose ? (visible === undefined ? defaultvisible : visible) : true"
v-show="visible === undefined ? defaultvisible : visible"
class="layer-vue" :id="'layer-vue-'+id"
:class="{ 'layer-vue-ismax': maxbtn, 'layer-vue-ismin': minbtn }"
v-drag="{
  visible,
  moveOut,
  settop,
  x,
  y,
  width,
  height,
  minwidth,
  minheight,
  getx,
  setx,
  gety,
  sety,
  setwidth,
  getwidth,
  getheight,
  setheight,
  setmax,
  getmax,
  setmin,
  getmin,
  setzIndex,
  moveEnd,
  move,
  full,
  min,
  restore,
  settransition,
  setoverflow,
}"
:style="{
  width: width + 'px',
  height: height + 'px',
  transform: 'translate(' + x + 'px,' + y + 'px)',
  'z-index': zIndex,
  transition: transition,
}"
>
<div v-if="title !== false" class="layer-vue-title" :title="title">
  {{ title }}
</div>
<div class="layer-vue-tools">
  <span v-if="maxmin[1]" class="layer-vue-min">-</span>
  <span v-if="maxmin[0]" class="layer-vue-max">口</span>
  <span v-if="closeBtn" class="layer-vue-close" @click="closeLayer">X</span>
</div>
<div v-if="resize" class="layer-vue-resize"></div>
<div v-if="lbresize" class="layer-vue-lbresize"></div>
<div ref="content" class="layer-vue-content" :style="{ height: contentheight + 'px', overflow: overflow }">
  <slot></slot>
</div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>