[![npm](https://img.shields.io/npm/dw/layer-vue.svg?style=flat-square)](https://www.npmjs.com/package/layer-vue)[![npm](https://img.shields.io/bundlephobia/minzip/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)[![npm](https://img.shields.io/npm/l/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)[![npm](https://badge.fury.io/js/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)

# layer-vue

## 简介

基于Vue框架的可移动可调整大小的非模态弹出层，效果类似于Layui中的Layer窗口，或者说是Window 窗体。基于Vue和React的UI库中，没有一款可移动非模态弹出层，如果你需要在页面中弹出一个窗口后依旧需要操作其他内容，那么layer-vue可以为你解决这一问题。

## 安装

```
npm install layer-vue
```

## 快速启动

### 全局引入

```js
// mian.js
import Vue from 'vue';
import App from './App.vue';
import LayerVue from 'layer-vue';
import 'layer-vue/dist/index.css';
Vue.use(LayerVue,{
    //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
    zindex:100
})
new Vue({render: h => h(App)}).$mount('#app')
```

## 使用

### 1.组件模式

```vue
// App.vue
<template>
  <div id="app">
    <LayerVue></LayerVue>
  </div>
</template>
<script>
export default { name: "app"};
</script>
```

### 2.函数模式

```vue
// App.vue
<script>
export default { 
    name: "app",
    methods:{
        openlayer(){
         //函数返回值是窗口ID
        this.layerid=this.$Layer.open({*配置项*}) //等价于 this.$Layer({*配置项*})
        }
    }
};
</script>
```



## 配置项

### title - 标题

类型：String/Boolean，默认：'信息'

title支持三种类型的值，若你传入的是普通的字符串，如*title :'我是标题'*；如果你不想显示标题栏，你可以*title: false*

```vue
<Layer title="我是标题"></Layer>
<Layer :title="title"></Layer>
this.$Layer({title:'我是标题'})
```

### content - 内容

#### 组件模式

##### 标签方式

类型：String/Number/Boolean，默认：null

```vue
<Layer content="我是内容区"></Layer>
<Layer :content="content"></Layer>
```

##### 插槽方式

类型：VueDOM/DOM/String/Boolean/Number，默认：null

```vue
<Layer><div></div></Layer>
<Layer>{{content}}</Layer>
```

#### 函数模式

类型：VueDOM/DOM/String/Number/Boolean，默认：null

```JS
let span = document.createElement("span");
span.innerHTML = "<div>13123</div>";
this.$Layer({
    	// String/Boolean/Number
    	content:1,
    	// DOM
        // content:document.getElementById('test'),
        // content: span
    	// VueDOM
        // content: {
    	//子组件名称
        //   component: Test,
    	//layer和子组件关联，此项固定填写this
        //   parent: this,
    	//子组件数据
        //   data: { id: 3 },
        // },
      });
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

### closeBtn - 关闭按钮

类型：Number/Boolean，默认：true

不显示，则*closeBtn: 0*

### maxmin - 最大最小化。

类型：Array，默认：[0, 0]

默认不显示最大小化按钮。需要显示配置*maxmin: [1,1]*即可

### resize - 是否右下允许拉伸

类型：Number/Boolean，默认：true

默认情况下，你可以在弹层右下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置 false即可。

### lbresize - 是否左下允许拉伸

类型：Number/Boolean，默认：true

默认情况下，你可以在弹层左下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置 false即可。

### zIndex - 层叠顺序

类型：Number，默认：1

一般用于解决和其它组件的层叠冲突，不能和settop一起使用。

### settop-窗口置顶

类型：Boolean，默认：false

当你的页面有很多很多 layer 窗口，你需要像 Window 窗体那样，点击某个窗口，该窗体就置顶在上面，那么 settop 可以来轻松实现。

### move - 触发拖动的元素

类型：String/Boolean，默认：'.layui-layer-title'

默认是触发标题区域拖拽。如果你想单独定义，指向元素的选择器或者DOM即可。如*move: '.mine-move'*。你还配置设定*move: false*来禁止拖拽。

### moveOut - 是否允许拖拽到窗口外

类型：*Array*，默认：[0, 0, 0, 0]（上，右，下，左）

默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定*moveOut: [1, 1, 1, 1]*即可。

### moveEnd - 拖动完毕后的回调方法

类型：Function，默认：null

默认不会触发moveEnd，如果你需要，设定*moveEnd: function(){}*即可。

### success - 层弹出后的成功回调方法

类型：Function，默认：null

当你需要在层创建完毕时即执行一些语句，可以通过该回调。

### destroyOnClose-关闭后销毁元素

类型：Boolean，默认：false

### cancel - destroyOnClose为false时关闭按钮触发的回调

类型：Function，默认：null

### end -destroyOnClose为true时关闭按钮触发的回调

类型：Function，默认：null

### full/min/restore -分别代表最大化、最小化、还原 后触发的回调

类型：Function，默认：null

## 作者

summer

642661520de@gmail.com