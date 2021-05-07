[![npm](https://img.shields.io/npm/dw/@finalsummer/vuelayer.svg?style=flat-square)](https://www.npmjs.com/package/@finalsummer/vuelayer)[![npm](https://img.shields.io/bundlephobia/minzip/@finalsummer/vuelayer.svg)](https://www.npmjs.com/package/@finalsummer/vuelayer)[![npm](https://img.shields.io/npm/l/@finalsummer/vuelayer.svg)](https://www.npmjs.com/package/@finalsummer/vuelayer)[![npm](https://badge.fury.io/js/%40finalsummer%2Fvuelayer.svg)](https://www.npmjs.com/package/@finalsummer/vuelayer)

# @finalsummer/vuelayer
## 安装

```
npm install @finalsummer/vuelayer
```

## 快速启动

### 全局引入

```js
// mian.js
import Vue from 'vue';
import App from './App.vue';
import VueLayer from '@finalsummer/vuelayer';
import '@finalsummer/vuelayer/dist/index.css';
Vue.config.productionTip = false
new Vue({render: h => h(App)}).$mount('#app')
```

## 调用

```vue
// App.vue
<template>
  <div id="app">
    <VueLayer></VueLayer>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
};
</script>
<style></style>
```

## 基础参数

### title - 标题

类型：String/Boolean，默认：'信息'

title支持三种类型的值，若你传入的是普通的字符串，如*title :'我是标题'*；如果你不想显示标题栏，你可以*title: false*

```vue
<VueLayer title="我是标题"></VueLayer>
<VueLayer :title="title"></VueLayer>
```

### content - 内容

#### 标签方式

类型：String/Array/Number，默认：null

```vue
<VueLayer content="我是内容区"></VueLayer>
<VueLayer :content="content"></VueLayer>
```

#### 插槽方式

```vue
<VueLayer>我是内容区</VueLayer>
<VueLayer>{{content}}</VueLayer>
```

### area - 宽高

类型：String/Array/Number，默认：'auto'，单位：px（默认）/%

在默认状态下，layer是宽高都自适应的，但当你只想定义宽度时，你可以*area: '500px'*，高度仍然是自适应的。当你宽高都要定义时，你可以*area: ['500px', '300px']*

### offset - 坐标

类型：String/Array/Number，默认：垂直水平居中，单位：px（默认）/%

offset默认情况下不用设置。但如果你不想垂直水平居中，你还可以进行以下赋值：

| 值                        | 备注                        |
| :------------------------ | :-------------------------- |
| offset: 'auto'            | 默认坐标，即垂直水平居中    |
| offset: '100px'           | 只定义top坐标，水平保持居中 |
| offset: ['100px', '50px'] | 同时定义top、left坐标       |
| offset: 't'               | 快捷设置顶部坐标            |
| offset: 'r'               | 快捷设置右边缘坐标          |
| offset: 'b'               | 快捷设置底部坐标            |
| offset: 'l'               | 快捷设置左边缘坐标          |
| offset: 'lt'              | 快捷设置左上角              |
| offset: 'lb'              | 快捷设置左下角              |
| offset: 'rt'              | 快捷设置右上角              |
| offset: 'rb'              | 快捷设置右下角              |

### anim - 弹出动画

类型：Number，默认：0

| 值      | 备注           |
| :------ | :------------- |
| anim: 0 | 平滑放大。默认 |