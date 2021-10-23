<template>
  <Index />
</template>
<script>
import Index from "@/components/index.vue";
export default {
  name: "Home",
  components: {
    Index
  },
  created() {
    this.$layer && (this.$layer.o.instances = []);
  },
  mounted() {
    this.$layer({
      id:"重要提示",
      title: "重要提示",
      area: [400, 200],
      resize: [0, 0],
      setTop: true,
      move:false,
      shade:'#07a4',
      shadeClose:true,
      skin: {
        //窗口阴影
        boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
        background: "linear-gradient(to right, #bfa , #5ba)",
        //标题栏
        title: {
          //标题栏背景
          background: "transparent",
          //标题栏文本色
          color: "#07a",
          //标题栏和内容区分割线
          borderBottom: "1px solid transparent"
        },
        //内容区
        content: {
          //内容区背景
          background: "transparent",
          //内容区文本色
          color: "#07a"
        },
        //最大化最小化按钮
        maxmin: {
          //最大化最小化按钮背景
          background: "#fff",
          //最大化最小化按钮
          color: "#000",
          //鼠标移入时最大化最小化按钮文本色
          backgroundHover: "#6666",
          //鼠标移入时最大化最小化按钮
          colorHover: "#008afc"
        },
        //关闭按钮
        close: {
          //关闭按钮背景
          background: "transparent",
          //关闭按钮文本色
          color: "#fff",
          //鼠标移入时关闭按钮背景
          backgroundHover: "transparent",
          //鼠标移入时关闭按钮文本色
          colorHover: "#f00"
        }
      },
      content: `<div>&nbsp;&nbsp;&nbsp;&nbsp;0.4.0版本 不兼容修改：</div>
<div>&nbsp;&nbsp;1.删除el配置项,可使用appendToBody;</div>
<div>&nbsp;&nbsp;2.☆☆☆☆☆ 规范配置项为驼峰命名，影响的配置有：</div>
<div>&nbsp;&nbsp;minArea,maxArea,zIndex,setTop,borderWidth;</div>`
    });
  }
};
</script>
