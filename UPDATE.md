# 版本更新笔记

## 0.4.3

### 支持vetur

添加 vsCode vetur 代码提示:

1.安装vetur插件;

2.确保在package.json 中引入layer-vue^0.4.3;

### 修复

修复 appendToBody 某些情况的bug；

## 0.4.2

### 添加 msg

添加全局方法 $msg

### 修复遮罩

修复遮罩单独设置覆盖全局设置

### 修复上拉伸

修复上拉伸宽度异常的bug

## 0.4.1

### 添加 slider

1.添加 slider 配置项，内容区会出现滑动条 默认为 true；滑动条颜色可通过 skin.slider.background 配置；

### 添加 borderResize

2.添加 borderResize 配置项,添加4边拉伸，默认开启；

### 添加 moveOutPadding

3.添加 moveOutPadding 配置项，针对moveOut设置4个方向的附加像素值

### 修改 resize

4.扩展 resize,添加左上角，右上角拉伸，默认开启；

### 修改 skin

5.skin 添加 slider，shade 颜色配置

### 优化 ratio

6.优化设置了ratio时拉伸方式；

### 修复

7.修复一些bug；

### 修改

8.修改没有标题时关闭按钮的默认样式；

### 备注

9.备注:对于涉及到方向的配置项，一律从右侧开始顺时针排列；

## 0.4.0

### 删除 el

1.删除 el 配置项,可使用 appendToBody;

### 修改配置项

2.☆☆☆☆☆ 规范配置项为驼峰命名，影响的配置有：minArea,maxArea,zIndex,setTop,borderWidth;

### 修复 shade

3.修复 shade 为 string 时不生效

## 0.3.11

### 修复 minarea

修复 minarea 拉伸时无效

## 0.3.10

### 修复 ratio

ratio 为 true 时,计算比例考虑标题的高度

## 0.3.8

### 修复 borderwidth

修复设置 borderwidth 无效

### 添加 appendToBody

添加配置项 appendToBody

## 0.3.7

### 添加 全局 title

添加全局配置项 title

### 添加 maxarea

添加配置项 maxarea

## 0.3.6

### 修复 reset

修复最小化后调用 reset,restroe 的移动异常

## 0.3.5

### 修改 回调函数

为组件模式添加自定义事件,名称,参数同回调函数

## 0.3.4

### 修复 area

优化 area 自适应时高度自动获取 padding 和 border 值

### 修复 move

修复 标题不存在时 move 报错

## 0.3.3

### 修复 area

修复 area 自适应时高度获取异常

### 修复 move

修复 move 不是默认值时的异常情况

## 0.3.2

### 修改 reloadAutoArea

修改 reloadAutoArea 的适用范围

### 修改 display

修改内容区 display 判断

## 0.3.1

### 修复

修复自动获取高度未考虑标题高度

修复浏览器窗口大小变化时，若 ratio 为 true，不改变窗口大小

添加 reloadAutoArea 方法，auto 为默认值时生效，内容区高度发生变化时，手动执行该方法重置高宽

## 0.3.0

### 修复

修复 move 为自定义时，重新打开窗口后无法拖动的问题

## 0.2.6

修改 el 相关逻辑

优化 shade

优化 area,minarea 配置项一致性， 均支持带两种单位 "px"、"%"，也可以直接传数字

删除 reset 配置项，组件模式下，可设置 id，通过全局方法\$layer.reset(id)进行重置。

修改文档

## 0.2.4

bug 修复

1.修复高宽不设置时无法读取内容区高度

2.修复设置 id 时，Vue 未定义的报错

3.修复设置了 el 的同时内容区是原有 dom 时，el 不生效

添加 shade，shadeClose 配置项,shade 出现时机还有待完善

## 0.2.3

添加 ratio 配置项，是否在拉伸时保存初始的高宽比,默认不开启

修改 moveOut 为 true 时，拉伸窗口可拉伸到窗口外

修改文档错误

## 0.2.2

☆☆☆☆☆ 修复引入时 options 不传导致无法运行,使用旧版本的请设置 options 为{}, Vue.use(LayerVue,options)

## 0.2.1

修复组件 title 不能动态更新

## 0.2.0

1.添加 isMax,初始化时可全屏显示

2.组件模式可配置 id 使用全局方法

3.新增方法 full,min,restore openAgain

4.方法下 title content 可修改

5.修改 skin borderColor->borderBottom

6.bug 修复：reset 没有恢复一些状态；resizing 没有计算高度 ；修改高度计算;修复设置某些皮肤颜色无效

7.优化 删除自定义指令

## 0.1.12

1.修复 mac 皮肤颜色丢失，

2.添加全局配置项 log，默认为 false，不在控制台输出警告信息，如需查看，设置为 true

3.添加 borderwidth 配置项

4.各回调函数添加携带参数，除了 resizing，其他均为 el:layer 窗口 dom,index:窗口编号,id:传入的 id，

resizing 携带参数为 el:layer 窗口 dom,width:layer 窗口宽度,height:layer 窗口高度,方便在调整窗口时对内容区的进行相应调整

### borderwidth - 边框大小修正值

类型：Number，默认：0,单位：px

正常情况下无需设置该项，如修改样式时，对 layer 外层容器添加了上下方向 border，设置该值为上线方向 border 的平均值，来修正 layer 内部高度的计算。

## 0.1.11

添加 3 种内置经典皮肤（xp 风格，win7 透明风格，mac 风格）

如需使用，设置 skin='winxp'/''win7'/''mac',

如果全局配置了经典皮肤也就是 String 类型，那么局部设置自定义皮肤（Object 类型）则无效，只可以设置其他经典皮肤

## 0.1.10

修复 close 执行 2 次，$layer.close和$layer.closeAll 改为 promise，新增 parent，isOutAnim 配置项,\$layer.reset 添加返回值

### isOutAnim - 关闭动画

类型：Boolean/类型：Number，默认：true

默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 isOutAnim: false 即可

### \$layer.close(index)

参数：窗口标识,类型：Promise,返回值：Boolean,标识执行结果，true 代表成功关闭，false 表示该窗口不存在或者已经是关闭状态

关闭 layer 窗口的方法

修改为 Promise 类型，主要是针对使用了关闭动画后，需要关闭 layer 后立即重新打开的情况，虽然解决了异步产生的问题，但关闭的动画不会消失；

不使用关闭动画则无此问题，设置 isOutAnim=0

```js
async open() {
      await this.$layer.close(this.layer2);
      this.layer = this.$layer();
    }
```

### \$layer.closeAll()

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

### parent - Vue 组件挂载

设置 parent:this,将当前 layer 组件挂载在当前使用的组件下，可在 vue 调试工具中显示，方便调试，0.1.20 新增此项，0.1.20 之前，在 content.parent 配置，让内容区的子

组件挂载在在当前使用的组件下，现在默认挂载在 layer 下，使用设置 parent:this 后，可以在调试工具中看到清晰的结构，如下所示：

```html
<App>
  <LayerVue> <Mycomponent></Mycomponent></LayerVue
></App>
```

注意：此项和 el-父元素选择器不同，parent 设置是关乎 vue 调试工具中能不能显示 layer，el 设置的是真实 dom 元素渲染的位置

## 0.1.9

添加多种动画，添加自定义最小高宽

### anim - 动画效果

类型：Number，默认：1

| 值      | 备注           |
| :------ | :------------- |
| anim: 1 | 平滑放大。默认 |
| anim: 2 | 上方滑下       |
| anim: 3 | 下方飞入       |
| anim: 4 | 左侧滑入       |
| anim: 5 | 左侧旋转飞入   |

### minarea - 最小宽高

类型：Array，默认：[300,200]，单位：px

设置窗口最小高宽

## 0.1.4

修复 bug :网页引入时找不到子元素

## 0.0.7

利用回调函数剔除 Vue 代码的引入

## 0.0.5

初步实现 Layer 挂载到 Vue 的实例上

## 0.0.4

加载前隐藏

## 0.0.1

删除包@finalsummer/vuelayer,更改为 layer-vue，发布 0.0.1 版本

配置项如下：

```vue
title: { type: [String, Boolean], default: '信息' }, area: { type: [String,
Array], default: 'auto' }, offset: { type: [String, Array, Number], default:
'auto' }, settop: { type: Function }, moveOut: { type: Array, default: () => [0,
0, 0, 0] }, visible: {}, zindex: { type: Number, default: 1 }, closeBtn: { type:
[Number, Boolean], default: true }, maxmin: { type: Array, default: () => [0, 0]
}, resize: { type: [Number, Boolean], default: true }, lbresize: { type:
[Number, Boolean], default: true }, moveEnd: { type: Function }, move: { type:
String, default: '.vue-layer-title' }, cancel: { type: Function }, success: {
type: Function }, end: { type: Function }, full: { type: Function }, min: {
type: Function }, restore: { type: Function }, destroyOnClose: { type: [Number,
Boolean], default: false }, amin: { type: Number, default: 0 }, content:{}
```
