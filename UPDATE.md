# 版本更新笔记

## 0.2.4

bug修复

1.修复高宽不设置时无法读取内容区高度

2.修复设置id时，Vue未定义的报错

## 0.2.3

添加ratio配置项，是否在拉伸时保存初始的高宽比,默认不开启

修改moveOut为true时，拉伸窗口可拉伸到窗口外

修改文档错误

## 0.2.2

☆☆☆☆☆ 修复引入时options不传导致无法运行,使用旧版本的请设置options为{}, Vue.use(LayerVue,options)

## 0.2.1

修复组件title不能动态更新

## 0.2.0

1.添加isMax,初始化时可全屏显示

2.组件模式可配置id使用全局方法

3.新增方法full,min,restore openAgain

4.方法下 title content 可修改

5.修改skin borderColor->borderBottom

6.bug修复：reset没有恢复一些状态；resizing没有计算高度 ；修改高度计算;修复设置某些皮肤颜色无效

7.优化 删除自定义指令

## 0.1.12

1.修复mac皮肤颜色丢失，

2.添加全局配置项 log，默认为false，不在控制台输出警告信息，如需查看，设置为true

3.添加borderwidth配置项

4.各回调函数添加携带参数，除了resizing，其他均为el:layer窗口dom,index:窗口编号,id:传入的id，

resizing携带参数为el:layer窗口dom,width:layer窗口宽度,height:layer窗口高度,方便在调整窗口时对内容区的进行相应调整

### borderwidth - 边框大小修正值

类型：Number，默认：0,单位：px

正常情况下无需设置该项，如修改样式时，对layer外层容器添加了上下方向border，设置该值为上线方向border的平均值，来修正layer内部高度的计算。

## 0.1.11

添加3种内置经典皮肤（xp风格，win7透明风格，mac风格）

如需使用，设置skin='winxp'/''win7'/''mac',

如果全局配置了经典皮肤也就是String类型，那么局部设置自定义皮肤（Object类型）则无效，只可以设置其他经典皮肤

## 0.1.10

修复close执行2次，$layer.close和$layer.closeAll改为promise，新增parent，isOutAnim配置项,$layer.reset添加返回值

### isOutAnim - 关闭动画

类型：Boolean/类型：Number，默认：true

默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 isOutAnim: false 即可

### $layer.close(index)

参数：窗口标识,类型：Promise,返回值：Boolean,标识执行结果，true代表成功关闭，false表示该窗口不存在或者已经是关闭状态

关闭layer窗口的方法

修改为Promise类型，主要是针对使用了关闭动画后，需要关闭layer后立即重新打开的情况，虽然解决了异步产生的问题，但关闭的动画不会消失；

不使用关闭动画则无此问题，设置isOutAnim=0

```js
async open() {
      await this.$layer.close(this.layer2);
      this.layer = this.$layer();
    }
```

### $layer.closeAll()

参数：无，类型：Promise,返回值：Boolean数组,标识每个窗口的执行结果，true代表成功关闭，false表示该窗口不存在或者已经是关闭状态

关闭所有layer窗口的方法

修改为Promise类型，主要是针对使用了关闭动画后，需要在打开某个窗口前关闭所有其他窗口的情况，若需要打开的窗口已经是打开状态，则会关闭后重新打开；

不使用关闭动画则无此问题，设置isOutAnim=0


```js
async open() {
      await this.$layer.closeAll();
      this.layer = this.$layer();
    }
```

### parent - Vue组件挂载

设置parent:this,将当前layer组件挂载在当前使用的组件下，可在vue调试工具中显示，方便调试，0.1.20新增此项，0.1.20之前，在content.parent配置，让内容区的子

组件挂载在在当前使用的组件下，现在默认挂载在layer下，使用设置parent:this后，可以在调试工具中看到清晰的结构，如下所示：

```html
<App>
  <LayerVue>
    <Mycomponent>
```

注意：此项和el-父元素选择器不同，parent设置是关乎vue调试工具中能不能显示layer，el设置的是真实dom元素渲染的位置

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

## 0.1.6


## 0.1.4

修复bug :网页引入时找不到子元素

## 0.0.7

利用回调函数剔除Vue代码的引入

## 0.0.5

初步实现Layer挂载到Vue的实例上

## 0.0.4

加载前隐藏

## 0.0.1

删除包@finalsummer/vuelayer,更改为layer-vue，发布0.0.1版本

配置项如下：

```vue
	title: { type: [String, Boolean], default: '信息' },
    area: { type: [String, Array], default: 'auto' },
    offset: { type: [String, Array, Number], default: 'auto' },
    settop: { type: Function },
    moveOut: { type: Array, default: () => [0, 0, 0, 0] },
    visible: {},
    zindex: { type: Number, default: 1 },
    closeBtn: { type: [Number, Boolean], default: true },
    maxmin: { type: Array, default: () => [0, 0] },
    resize: { type: [Number, Boolean], default: true },
    lbresize: { type: [Number, Boolean], default: true },
    moveEnd: { type: Function },
    move: { type: String, default: '.vue-layer-title' },
    cancel: { type: Function },
    success: { type: Function },
    end: { type: Function },
    full: { type: Function },
    min: { type: Function },
    restore: { type: Function },
    destroyOnClose: { type: [Number, Boolean], default: false },
    amin: { type: Number, default: 0 },
    content:{}
```

