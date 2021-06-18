[![npm](https://img.shields.io/npm/dw/layer-vue.svg?style=flat-square)](https://www.npmjs.com/package/layer-vue)[![npm](https://img.shields.io/bundlephobia/minzip/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)[![npm](https://img.shields.io/npm/l/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)[![npm](https://badge.fury.io/js/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)

# layer-vue

## 简介

基于Vue框架的可移动可调整大小的非模态弹出层，效果类似于Layui中的Layer窗口，或者说是Window 窗体。基于Vue和React的UI库中，没有一款可移动非模态弹出层，如果你需要在页面中弹出一个窗口后依旧需要操作其他内容，那么layer-vue可以为你解决这一问题。

## 安装使用

### npm安装

```
npm install layer-vue -S
```

```js
// mian.js
import Vue from 'vue';
import App from './App.vue';
import LayerVue from 'layer-vue';
import 'layer-vue/lib/index.css';
Vue.use(LayerVue,{
    //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
    zindex:100,
    //全局配置窗口皮肤
    skin:{
    	//具体参数参见配置项：skin
	}
})
new Vue({render: h => h(App)}).$mount('#app')
```

### CDN 方式

```html
<html>
  <!-- 引入 layer-vue.css -->
	  <link rel="stylesheet" href="//unpkg.com/layer-vue/lib/index.css">
  <body>
    <div id="app"></div>
	  <!-- 引入Vue.js-->
	  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	  <!-- 引入 layer-vue.js -->
	  <script src="//unpkg.com/layer-vue/lib/layer-vue.js"></script>
    <script>
    //挂载layer组件    
      Vue.use(LayerVue,{
      //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此 配置
      zindex:100,
      //全局配置窗口皮肤
      skin:{
      	//具体参数参见配置项：skin
	        }
      })
      new Vue({
        el:'#app',
        mounted() {
          this.$layer();
        },
      });
    </script>
  </body>
</html>
```

## 使用

### 1.组件

```vue
// App.vue
<template>
  <div id="app">
    <LayerVue></LayerVue>
    <!-- 或 -->
    <layer-vue></layer-vue>
  </div>
</template>
<script>
export default { name: "app"};
</script>
```

### 2.方法

```vue
// App.vue
<script>
export default { 
    name: "app",
    methods:{
        openlayer(){
         	//函数返回值是窗口ID
        	this.layerid=this.$layer.open({*配置项*}) //等价于 this.$layer({*配置项*})
        },
        resetlayer(){
            //重置窗口大小和位置
          	this.$layer.reset(this.layerid)
        },
        closelayer(){
            //关闭窗口，传入窗口ID
            this.$layer.close(this.layerid)
		},
    }
};
</script>
```

## 配置项

### visible-显示状态

类型：Number/Boolean，默认：true

仅组件模式下，支持该配置。重新打开后会重置窗口大小及位置。

```vue
// App.vue
<template>
  <div id="app">
      //需要添加.sync修饰符进行双向绑定，否则点击右上角关闭窗口后，无法同时修改传入的visible值
    <LayerVue :visible.sync='visible'></LayerVue>
  </div>
</template>
<script>
export default { 
    name: "app",
  	data() {
    	return {
      		visible: true,
   		};
  	},
} 
</script>
```

### destroyOnClose-关闭后销毁窗口

类型：Boolean，默认：false

组件模式下默认关闭窗口时不会销毁窗口，如需再次打开时删除上次内容区的内容，可设置destroyOnClose为true，在函数模式下，需和id配合使用，否则设置无效。

若内容区在打开窗口前已经是html上的dom元素，那么destroyOnClose为true时，内容区不会被销毁，只会回到原本的位置。

### title - 标题

类型：String/Boolean，默认：'信息'

title支持三种类型的值，若你传入的是普通的字符串，如*title :'我是标题'*；如果你不想显示标题栏，你可以*title: false*

```vue
<LayerVue title="我是标题"></LayerVue>
<LayerVue :title="title"></LayerVue>
this.$layer({title:'我是标题'})
```

### content - 内容

#### 组件

##### 标签方式

类型：String/Number/Boolean，默认：null

```vue
<LayerVue content="我是内容区"></LayerVue>
<LayerVue :content="content"></LayerVue>
```

##### 插槽方式

类型：VueDOM/DOM/String/Boolean/Number，默认：null

```vue
<LayerVue><div></div></LayerVue>
<LayerVue>{{content}}</LayerVue>
```

#### 方法

类型：VueDOM/DOM/String/Number/Boolean，默认：null

```JS
let span = document.createElement("span");
span.innerHTML = "<div>13123</div>";
this.$layer({
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

### id-唯一标识

类型：String，默认：空字符

id只在函数模式下可用，组件模式下本身只会弹出一个窗口。设置该值后，不管内容区是什么类型，都只允许同时弹出一个。

内容区为非DOM元素时，默认每执行一次open函数，就会创建一个新的窗口，可设置id屏蔽多个窗口弹出。

另外如需设置destroyOnClose时，必须设置id，否则destroyOnClose不可更改。

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

### maxmin - 最大最小化

类型：Array，默认：[0, 0]

默认不显示最大小化按钮。需要显示配置*maxmin: [1,1]*即可

### resize - 是否允许拉伸

类型：Number/Boolean，默认：[1,1]（右下角，左下角）

默认情况下，你可以在弹层右下角和左下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置 [0,0]即可。

### zIndex - 层叠顺序

类型：Number，默认：1

一般用于解决和其它组件的层叠冲突，不能和settop一起使用。

### settop-窗口置顶

类型：Boolean，默认：false

当你的页面有很多很多 layer 窗口，你需要像 Window 窗体那样，点击某个窗口，该窗体就置顶在上面，那么 settop 可以来轻松实现。

### skin-自定义皮肤

类型：Object，默认：

```js
{
  //窗口阴影
  shadowColor:'rgb(0 0 0 / 30%)',
  //标题栏
  title: {
     //标题栏背景色
    backgroundColor: "#fff",
     //标题栏文本色
    color: "#000",
     //标题栏和内容区分割线颜色
    borderColor:"#f0f0f0",
  },
  //内容区
  content: {
	//内容区背景色
    backgroundColor: "#fff",
    //内容区文本色   
    color: "#000",
  },
  //最大化最小化按钮
  maxmin: {
    //最大化最小化按钮背景色
    backgroundColor: "#fff",
    //最大化最小化按钮
    color: "#000",
    //鼠标移入时最大化最小化按钮文本色
    backgroundColorHover: "#6666",
    //鼠标移入时最大化最小化按钮
    colorHover: "#008afc",
  },
  //关闭按钮
  close: {
    //关闭按钮背景色
    backgroundColor: "#fff",
    //关闭按钮文本色
    color: "#000",
    //鼠标移入时关闭按钮背景色
    backgroundColorHover: "#f00",
    //鼠标移入时关闭按钮文本色
    colorHover: "#fff",
  },
}
```

Layer提供了灵活的皮肤配置方案，只需配置需要修改的内容，不修改的无需传递。

#### 1.全局配置

```js
// mian.js
import Vue from 'vue';
import App from './App.vue';
import LayerVue from 'layer-vue';
import 'layer-vue/lib/index.css';
Vue.use(LayerVue,{
    //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
    zindex:100,
    //全局配置窗口皮肤
    skin：{
  		maxmin: {
   			backgroundColorHover: "#6666",
  		},
  		close: {
    		backgroundColor: "#fff",
  		},
	}
})
new Vue({render: h => h(App)}).$mount('#app')
```

#### 2.单独配置

##### 组件

```vue
<LayerVue :skin='{maxmin: {backgroundColorHover: "#6666",}}'></LayerVue>
```

##### 方法

```js
this.$layer({
	skin：{
  		close: {
    		backgroundColor: "#fff",
  		},
	}
	//...其他配置
})
```

### move - 触发拖动的元素

类型：String/Boolean，默认：'.layui-layer-title'

默认是触发标题区域拖拽。如果你想单独定义，指向元素的选择器或者DOM即可。如*move: '.mine-move'*。你还配置设定*move: false*来禁止拖拽。

### moveOut - 是否允许拖拽到窗口外

类型：*Array*，默认：[0, 0, 0, 0]（上，右，下，左）

默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定*moveOut: [1, 1, 1, 1]*即可。

### reset -重置窗口大小和定位

类型：Boolean，默认：null

组件模式下，在模版中传入reset初始值，之后通过对reset值取反进行重置窗口大小，通过方法创建layer窗口时，无需设置reset，可直接通过全局方法$layer.reset进行重置。

## 回调函数

### success - 层弹出后的成功回调方法

类型：Function，默认：null

当你需要在层创建完毕时即执行一些语句，可以通过该回调。

### cancel - 关闭窗口时触发的回调

类型：Function，默认：null

无论窗口是否销毁，都会执行cancel ，执行顺序在窗口销毁前。

### end -窗口销毁后触发的回调

类型：Function，默认：null

只有窗口销毁后才会执行

### moveEnd - 拖动完毕后的回调方法

类型：Function，默认：null

默认不会触发moveEnd，如果你需要，设定*moveEnd: function(){}*即可。

### resizing - 监听窗口拉伸动作

类型：Function，默认：null

当你拖拽弹层右下角对窗体进行尺寸调整时，如果你设定了该回调，则会执行。

### resizeEnd - 拉伸完毕后的回调方法

类型：Function，默认：null

默认不会触发resizeEnd，如果你需要，设定*moveEnd: function(){}*即可。

### full/min/restore -分别代表最大化、最小化、还原 后触发的回调

类型：Function，默认：null

## 全局方法

### $layer.open(options)

参数见上述配置项，返回值为窗口标识（index）

打开layer窗口的核心方法，语法糖：$layer

### $layer.close(index)

参数：窗口标识

关闭layer窗口的方法

### $layer.reset(index)

参数：窗口标识

重置layer窗口大小和定位的方法

### $layer.closeAll()

参数：无

关闭所有layer窗口的方法



## 作者

finalsummer

642661520de@gmail.com