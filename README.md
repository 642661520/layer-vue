[![npm](https://img.shields.io/npm/dw/layer-vue.svg?style=flat-square)](https://www.npmjs.com/package/layer-vue)[![npm](https://img.shields.io/bundlephobia/minzip/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)[![npm](https://img.shields.io/npm/l/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)[![npm](https://badge.fury.io/js/layer-vue.svg)](https://www.npmjs.com/package/layer-vue)

# layer-vue

## 简介

基于 Vue2 框架的可移动可调整大小的非模态弹出层，效果类似于 Layui 中的 Layer 窗口，或者说是 Window 窗体。热门的 ui 库中只有模态框，如果你需要在页面中弹出一个窗口后依旧需要操作其他内容，那么 layer-vue 可以为你解决这一问题。

## 安装

### npm 安装

```
npm install layer-vue -S
```

```js
// mian.js
import Vue from "vue";
import App from "./App.vue";
import LayerVue from "layer-vue";
import "layer-vue/lib/index.css";
Vue.use(LayerVue, {
  //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
  zIndex: 100,
  //全局配置窗口皮肤
  skin: {
    //具体参数参见配置项：skin
  },
  //控制台打印相关信息
  log: true
});
new Vue({ render: h => h(App) }).$mount("#app");
```

### CDN 方式

使用 CDN 引入 layer 时，需要注意是的，仍需手动挂载，需写在 html 模版中

```html
<html>
  <!-- 引入 layer-vue.css -->
  <link rel="stylesheet" href="//unpkg.com/layer-vue/lib/index.css" />
  <body>
    <div id="app"></div>
    <!-- 引入Vue.js-->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <!-- 引入 layer-vue.js -->
    <script src="//unpkg.com/layer-vue/lib/layer-vue.js"></script>
    <script>
      //挂载layer组件
      Vue.use(LayerVue, {
        //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
        // 非置顶窗口请使用时单独设置
        zIndex: 100,
        //全局配置窗口皮肤
        skin: {
          //具体参数参见配置项：skin
        },
        //控制台打印相关信息
        log: true
      });
      new Vue({
        el: "#app",
        mounted() {
          this.$layer();
        }
      });
    </script>
  </body>
</html>
```

# layer-弹出层

## 使用

### 组件使用

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
export default { name: "app" };
</script>
```

### 方法使用

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

## 测试

### 在线 demo

http://layer-vue.cn/#/demo

### 本地运行

从 github 或 gitee 下载

https://github.com/642661520/layer-vue/archive/refs/heads/master.zip

下载依赖

```npm
npm i

//或
yarn
```

运行测试页面

```
npm run dev
```

打包

```
npm run build
```

## 重要提示

0.4.0 版本 不兼容修改：

1.删除 el 配置项,可使用 appendToBody;

2.☆☆☆☆☆ 规范配置项为驼峰命名，影响的配置有：minArea,maxArea,zIndex,setTop,borderWidth;

## 配置项

### visible - 显示状态【组件模式专用】

类型：Number/Boolean，默认：true

仅组件模式下，支持该配置。重新打开后会重置窗口大小及位置。

```vue
// App.vue
<template>
  <div id="app">
    //需要添加.sync修饰符进行双向绑定，否则点击右上角关闭窗口后，无法同时修改传入的visible值
    <LayerVue :visible.sync="visible"></LayerVue>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      visible: true
    };
  }
};
</script>
```

### destroyOnClose - 关闭后销毁窗口

类型：Boolean，默认：false

组件模式下默认关闭窗口时不会销毁窗口，如需再次打开时删除上次内容区的内容，可设置 destroyOnClose 为 true，在函数模式下，需和 id 配合使用，否则设置无效。

若内容区在打开窗口前已经是 html 上的 dom 元素，那么 destroyOnClose 为 true 时，内容区不会被销毁，只会回到原本的位置。

### title - 标题

类型：String/Boolean，默认：'信息'

title 支持三种类型的值，若你传入的是普通的字符串，如*title :'我是标题'*；如果你不想显示标题栏，你可以*title: false*

```vue
<LayerVue title="我是标题"></LayerVue>
<LayerVue :title="title"></LayerVue>
this.$layer({title:'我是标题'})
```

### content - 内容

#### 组件 content

##### 标签内容区

类型：String/Number/Boolean，默认：null

```vue
<LayerVue content="我是内容区"></LayerVue>
<LayerVue :content="content"></LayerVue>
```

##### 插槽内容区

类型：VueDOM/DOM/String/Boolean/Number，默认：null

```vue
<LayerVue><div></div></LayerVue> <LayerVue>{{content}}</LayerVue>
```

#### 方法 content

类型：VueDOM/DOM/String/Number/Boolean，默认：null

重点：方法下的内容不是响应式的！使用响应式推荐使用组件方式

方法下需要更新内容需要彻底关闭窗口后重新打开窗口，只有内容区是 dom，且本身已经是响应式的数据，这种情况下，在 vue 结构树上，layer 和内容区不是父子关系。

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
    	//子组件数据
        //   data: { id: 3 },
        // },
      });
```

### parent - Vue 组件挂载【方法模式专用】

设置 parent:this,将当前 layer 组件挂载在当前使用的组件下，可在 vue 调试工具中显示，方便调试，0.1.10 新增此项，0.1.10 之前，在 content.parent 配置，让内容区的子组件挂载在在当前使用的组件下，现在默认挂载在 layer 下，使用设置 parent:this 后，可以在调试工具中看到清晰的结构，如下所示：

```html
<App>
  <LayerVue> <Mycomponent></Mycomponent></LayerVue
></App>
```

注意：此项和 el-父元素选择器不同，parent 设置是关乎 vue 调试工具中能不能显示 layer，el 设置的是真实 dom 元素渲染的位置

### id - 唯一标识

类型：String，默认：空字符

方法模式下，设置该值后，不管内容区是什么类型，都只允许同时弹出一个。

内容区为执行 layer 前页面已有 DOM 元素时，无需设置 id。

内容区为非 DOM 元素时，默认每执行一次 open 方法，就会创建一个新的窗口，可设置 id 屏蔽多个窗口弹出。

另外如需设置 destroyOnClose 时，必须设置 id，否则 destroyOnClose 不可更改。

id 现在可以在组件模式下配置，配置之后可以使用 layer 全局方法。

### appendToBody

类型：Boolean，默认：false

是否插入至 body 元素上,嵌套的 LayerVue 强烈建议设置为 true,

0.4.0 版本开始，删除 el 配置项，对于内容区是页面内原有 dom 元素，可设置 appendToBody，避免父元素带来的样式影响

### area - 宽高

类型：String/Array/Number，默认：'auto'，单位：px（默认可不带）/%

在默认状态下，layer 是宽高都自适应的，但当你只想定义宽度时，你可以*area: '500px'*或*area: 500*，高度仍然是自适应的。

当你宽高都要定义时，你可以*area: ['500px', '300px']*或*area: [500, 300]*

请注意设置宽高要不小于最小宽高，否则不生效

### minArea - 最小宽高

类型：String/Array/Number，默认：[300,200]，单位：px（默认可不带）/%

设置窗口最小高宽,当你只想定义最小宽度时，你可以*area: '200px'*或*area: 200*，高度则是默认值。

当你宽高都要定义时，你可以*area: ['200px', '200px']*或*area: [300, 200]*

### maxArea - 最大宽高

类型：String/Array/Number，默认：['100%','100%']，单位：px（默认可不带）/%

设置窗口最小高宽,当你只想定义最大宽度时，你可以*area: '1200px'*或*area: 1200*，高度则是默认值。

当你宽高都要定义时，你可以*area: ['1300px', '500px']*或*area: [1300, 500]*

### offset - 坐标

类型：String/Array/Number，默认：垂直水平居中，单位：px（默认）/%

offset 默认情况下不用设置。但如果你不想垂直水平居中，你还可以进行以下赋值：

| 值                        | 备注                          |
| :------------------------ | :---------------------------- |
| offset: 'auto'            | 默认坐标，即垂直水平居中      |
| offset: '100px'           | 只定义 top 坐标，水平保持居中 |
| offset: ['100px', '50px'] | 同时定义 top、left 坐标       |
| offset: 't'               | 快捷设置顶部坐标              |
| offset: 'r'               | 快捷设置右边缘坐标            |
| offset: 'b'               | 快捷设置底部坐标              |
| offset: 'l'               | 快捷设置左边缘坐标            |
| offset: 'lt'              | 快捷设置左上角                |
| offset: 'lb'              | 快捷设置左下角                |
| offset: 'rt'              | 快捷设置右上角                |
| offset: 'rb'              | 快捷设置右下角                |

### anim - 动画效果

类型：Number，默认：1

| 值      | 备注           |
| :------ | :------------- |
| anim: 0 | 没有动画       |
| anim: 1 | 平滑放大。默认 |
| anim: 2 | 上方滑下       |
| anim: 3 | 下方飞入       |
| anim: 4 | 左侧滑入       |
| anim: 5 | 左侧旋转飞入   |

### isOutAnim - 关闭动画

类型：Boolean/类型：Number，默认：true

默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 isOutAnim: false 即可

### closeBtn - 关闭按钮

类型：Number/Boolean，默认：true

不显示，则*closeBtn: 0*

### maxmin - 最大最小化

类型：Array，默认：[0, 0]

默认不显示最大小化按钮。需要显示配置*maxmin: [1,1]*即可

### resize - 是否允许 4 角拉伸

类型：Number/Boolean，默认：[1,1,1,1]（右下角，左下角,左上角,右上角）

默认情况下，你可以在弹层右下角，左下角,左上角,右上角拖动来拉伸尺寸。如果对指定的 layer 屏蔽该功能，设置 [0,0,0,0]即可。

### borderResize - 是否允许 4 边拉伸

类型：Number/Boolean，默认：[1,1,1,1]（右,下,左,上）

默认情况下，你可以在弹层右,下,左,上拖动来拉伸尺寸。如果对指定的 layer 屏蔽该功能，设置 [0,0,0,0]即可。

### ratio - 拉伸时是否保持原始比例

类型：Boolean，默认：false

设置为 true 时，拉伸窗口时，不会改变高宽比例，且严格遵守 moveOut 配置项

请注意设置宽高要不小于最小宽高，否则比例会超出预期

### zIndex - 层叠顺序

类型：Number，默认：1

一般用于解决和其它组件的层叠冲突，不能和 settop 一起使用，可全局配置

### setTop - 窗口置顶

类型：Boolean，默认：false

当你的页面有很多很多 layer 窗口，你需要像 Window 窗体那样，点击某个窗口，该窗体就置顶在上面，那么 setTop 可以来轻松实现。

### shade - 遮罩

类型：String/Array/Boolean，默认：0

即弹层外区域。设置 true,1,'1',则是 0.3 透明度的黑色背景。如果你想定义别的颜色，可以 shade: [0.8, '#393D49'],或 shade: "#bfac"

### shadeClose - 是否点击遮罩关闭

类型：Boolean，默认：false

如果你的 shade 是存在的，那么你可以设定 shadeClose 来控制点击弹层外区域关闭。

### skin - 自定义皮肤

类型：Object，默认：

```js
skin = {
  background: "#fff",
  boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
  title: {
    background: "transparent",
    color: "#000",
    borderBottom: "1px solid #f0f0f0"
  },
  content: {
    background: "transparent",
    color: "#000"
  },
  slider: {
    background: "rgba(153, 153, 153, 0.5)"
  },
  shade: { background: "rgba(0, 0, 0, 0.3)" },
  maxmin: {
    background: "transparent",
    color: "#000",
    backgroundHover: "#6666",
    colorHover: "#008afc"
  },
  close: {
    background: "transparent",
    color: "#000",
    backgroundHover: "#f00",
    colorHover: "#fff"
  }
};
```

Layer 提供了灵活的皮肤配置方案，只需配置需要修改的内容，不修改的无需传递。

添加 3 种内置经典皮肤（xp 风格，win7 透明风格，mac 风格）

如需使用，设置 skin='winxp'/''win7'/''mac',

如果全局配置了经典皮肤也就是 String 类型，那么局部设置自定义皮肤（Object 类型）则无效，只可以设置其他经典皮肤

#### 全局配置

```js
// mian.js
import Vue from "vue";
import App from "./App.vue";
import LayerVue from "layer-vue";
import "layer-vue/lib/index.css";
Vue.use(LayerVue, {
  //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
  zIndex: 100,
  //全局配置窗口皮肤
  skin: {
    maxmin: {
      backgroundHover: "#6666"
    },
    close: {
      background: "#fff"
    }
  }
});
new Vue({ render: h => h(App) }).$mount("#app");
```

#### 单独配置

##### 组件配置皮肤

```vue
<LayerVue :skin="{ maxmin: { backgroundHover: '#6666' } }"></LayerVue>
```

##### 方法配置皮肤

```js
this.$layer({
	skin：{
  		close: {
    		background: "#fff",
  		},
	}
	//...其他配置
})
```

### move - 触发拖动的元素

类型：String/Boolean，默认：'.layer-vue-title'

默认是触发标题区域拖拽。如果你想单独定义，指向元素的选择器或者 DOM 即可。如*move: '.move'*。你还配置设定*move: false*来禁止拖拽。

### moveOut - 是否允许拖拽(拉伸)到窗口外

类型：_Array_，默认：[0, 0, 0, 0]（右,下,左,上）

默认只能在窗口内拖拽(拉伸)，如果你想让拖拽(拉伸) 到窗外，那么设定*moveOut: [1, 1, 1, 1]*即可。

### moveOutPadding - 针对 moveOut 设置 4 个方向的附加像素值

类型：_Array[number]_，默认：[0, 0, 0, 0]（右,下,左,上）

设置拖拽(拉伸)时，可活动区域距离页面 4 边的距离，仅适用于设置了 moveOut 的对应方向；

如页面 header 部分高 50px,可设置 moveOutPadding=[0,0,0,50],来避免 layer 在非最大化时，拖拽(拉伸)到 header 区域内。

### slider - 内容区是否会出现滑动条

类型：Boolean，默认：true

默认会出现滑动条

### borderWidth - 边框大小修正值

类型：Number，默认：0,单位：px

正常情况下无需设置该项，如修改样式时，对 layer 外层容器添加了上下方向 border，设置该值为上线方向 border 的平均值，来修正 layer 内部高度的计算。

### isMax - 最大化显示

类型：Boolean，默认：false

用于初始化时全屏显示，添加.sync 也可以作为组件模式下切换最大化的方法

## 全局配置项

### log - layer 警告信息

类型：Boolean，默认：false

默认不在控制台输出警告信息，如需查看，设置为 true,可全局配置

```js
Vue.use(LayerVue, {
  //控制台打印相关信息
  log: true
});
```

### skin - 自定义皮肤

```js
Vue.use(LayerVue, {
  skin: {
    //具体参数参见配置项：skin
  }
});
```

### zIndex - 层叠顺序

```js
Vue.use(LayerVue, {
  //此项设置置顶窗口的初始值，默认为100，一般无需配置，和其他组件冲突时可在此配置
  // 非置顶窗口请使用时单独设置
  zIndex: 100
});
```

### title - 标题

```js
Vue.use(LayerVue, {
  title: "标题"
});
```

## 回调函数/自定义事件

### success - 层弹出后的成功回调方法

类型：Function，默认：null,携带参数：el:layer 窗口 dom,index:窗口编号,id:传入的 id，

当你需要在层创建完毕时即执行一些语句，可以通过该回调。

### cancel - 关闭窗口时触发的回调

类型：Function，默认：null，携带参数：el:layer 窗口 dom,index:窗口编号,id:传入的 id，

无论窗口是否销毁，都会执行 cancel ，执行顺序在窗口销毁前。

### end -窗口销毁后触发的回调

类型：Function，默认：null，携带参数：el:layer 窗口 dom,index:窗口编号,id:传入的 id，

只有窗口销毁后才会执行

### moveEnd - 拖动完毕后的回调方法

类型：Function，默认：null，携带参数：el:layer 窗口 dom,index:窗口编号,id:传入的 id，

默认不会触发 moveEnd，如果你需要，设定*moveEnd: function(){}*即可。

### resizing - 监听窗口拉伸动作

类型：Function，默认：null，携带参数：el:layer 窗口 dom,width:layer 窗口宽度,height:layer 窗口高度

当你拖拽弹层右下角对窗体进行尺寸调整时，如果你设定了该回调，则会执行。

### resizeEnd - 拉伸完毕后的回调方法

类型：Function，默认：null，携带参数：el:layer 窗口 dom,index:窗口编号,id:传入的 id，

默认不会触发 resizeEnd，如果你需要，设定*moveEnd: function(){}*即可。

### full/min/restore -分别代表最大化、最小化、还原 后触发的回调

类型：Function，默认：null，携带参数：el:layer 窗口 dom,index:窗口编号,id:传入的 id，

## 全局方法

### $layer.open({options})

参数见上述配置项，返回值为窗口序号（index）

打开 layer 窗口的核心方法，语法糖：\$layer

### $layer.close(index/id)

参数：窗口序号/窗口 id，类型：Promise,返回值：Boolean,标识执行结果，true 代表成功关闭，false 表示该窗口不存在或者已经是关闭状态

关闭 layer 窗口的方法

修改为 Promise 类型，主要是针对使用了关闭动画后，需要关闭 layer 后立即重新打开的情况，虽然解决了异步产生的问题，但关闭的动画不会消失；

不使用关闭动画则无此问题，设置 isOutAnim=0

```js
async open() {
      await this.$layer.close(this.layer2);
      this.layer = this.$layer();
    }
```

### $layer.reset(index/id)

参数：窗口序号/窗口 id,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

重置 layer 窗口大小和定位的方法

### $layer.full(index/id)

参数：窗口序号/窗口 id,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

最大化 layer 窗口大小

### $layer.min(index/id)

参数：窗口序号/窗口 id,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

最小化 layer 窗口大小

### $layer.restore(index/id)

参数：窗口序号/窗口 id,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

退出最大、最小化

### $layer.openAgain(index/id)

参数：窗口序号/窗口 id,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

重新打开指定的 layer 窗口

### $layer.setTitle(index/id,value) - 【方法模式专用】

参数：窗口序号/窗口 id,新的 title 值,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

重新设置 title，通过父组件 watch 可更新 title

```vue
//app.vue
<script>
export default {
  name: "app",
  data() {
    return {
      title: "标题",
    };
  },
  watch: {
    title: function (newvalue) {
      this.$layer.setTitle(this.layer1, newvalue);
      //或 this.$layer.setTitle('layer1', newvalue);
    },
  },
  mounted() {
    this.open1();
  },
  methods: {
    open1() {
      this.layer1 = this.$layer({
        id:'layer1'
        parent: this,
        title:this.title,
      });
    },
  },
};
</script>
```

### $layer.setContent(index/id,value) - 【方法模式专用】

参数：窗口序号/窗口 id,新的 content 值,返回值：Boolean,标识窗口的执行结果，true 代表成功，false 表示该窗口不存在或者已经是关闭状态

重新设置内容，使用方式同 setTitle，当内容区是组件时，传入新的 props 即可，layer 会重新挂载子组件

实验性功能，不推荐使用该方法

```vue
//app.vue
<script>
import Test from "./test.vue";
export default {
  name: "app",
  data() {
    return {
      data: {id:3}
    };
  },
  watch: {
    data: {
      handler: function (newvalue) {
        this.$layer.setContent(this.layer1, newvalue);
        //或 this.$layer.setContent('layer1', newvalue);
      },
      //对对象开启深度监听
      deep: true,
    },
  },
  mounted() {
    this.open1();
  },
  methods: {
    open1() {
      this.layer1 = this.$layer({
        id:'layer1'
        parent: this,
        content: {
          component: Test,
          data: this.data,
        },
      });
    },
  },
};
</script>

// test.vue
<template>
  <div>
    {{ id }}<br />
    <button @click="add">加一</button>
    <div>{{ count }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    };
  },
  props: { id: {} },
  methods: {
    add() {
      this.count++;
    }
  }
};
</script>
```

### $layer.reloadAutoArea()

参数：窗口序号/窗口 id,返回值：Boolean

手动重置窗口大小，只在 area 为默认值时有效

内容区高度发生变化时，手动执行该方法重置高宽

### $layer.closeAll()

参数：无，类型：Promise,返回值：Boolean 数组,标识每个窗口的执行结果，true 代表成功关闭，false 表示该窗口不存在或者已经是关闭状态

关闭所有 layer 窗口的方法

修改为 Promise 类型，主要是针对使用了关闭动画后，需要在打开某个窗口前关闭所有其他窗口的情况，若需要打开的窗口已经是打开状态，则会关闭后重新打开；

不使用关闭动画则无此问题，设置 isOutAnim=0

```js
async open() {
      await this.$layer.closeAll();
      this.layer = this.$layer();
    }
```

# msg-消息提示

对于一些简短的消息提示，可以用 $msg("你好！")

## 使用

LayerVue 为 Vue.prototype 添加了全局方法 $msg;

$msg(msg,options)

## msg-消息文本

输入你想要的文本内容！

## options-配置项

### type-类型

类型：String，默认：'info'，可选值：info，success，warning，error；

也可使用$msg.info(),$.msg.success(),$msg.warning(),$msg.error() 代替；

### time-消失时间

类型：Number，默认：3000；

设置 msg 消失时间，设置为 0 时，不消失；

### showClose-显示关闭按钮

类型：Boolean，默认：false；

默认不显示关闭按钮

### onCancel-关闭时回调函数

类型：Function;

msg 关闭时调用；关闭动画开始前

### onClose-销毁时回调函数

类型：Function;

msg 销毁时调用；关闭动画结束后

# 作者

finalsummer

642661520de@gmail.com

# 链接

gitee https://gitee.com/finalsummer/layer-vue

github https://github.com/642661520/layer-vue

npm https://www.npmjs.com/package/layer-vue

官网 http://layer-vue.cn
