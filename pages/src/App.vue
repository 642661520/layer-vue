<template>
  <div
    id="app"
    :class="{
      sunny: theme,
      moon: !theme
    }"
  >
    <header class="header">
      <div id="nav">
        <div class="title">
          <router-link to="/"><div>LayerVue</div></router-link>
        </div>
        <div class="important" @click="openLayer">
          重要提示
        </div>
        <div class="title-menu">
          <router-link to="/doc">文档</router-link>
          <router-link to="/update">更新日志</router-link>
          <router-link to="/demo">示例</router-link>
          <el-tooltip
            :effect="theme ? 'light' : 'dark'"
            :content="theme ? '切换到黑夜模式' : '切换到白昼模式'"
          >
            <span id="theme">
              <el-switch
                v-model="theme"
                active-color="#13ce66"
                inactive-color="#444"
              >
              </el-switch>
              <i
                v-show="!theme"
                class="el-icon-moon"
                @click="theme = !theme"
              ></i>
              <i
                v-show="theme"
                class="el-icon-sunny"
                @click="theme = !theme"
              ></i>
            </span>
          </el-tooltip>
        </div>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <span>@fianlsummer</span>
      <!-- <a href="/react" target="_blank">基于React后台demo </a>
      <a href="/forum" target="_blank">基于React论坛demo </a> -->
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >浙ICP备2021016502号</a
      >
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme: true
    };
  },
  watch: {
    theme: function(newvalue) {
      this.$store.commit("settheme", newvalue);
    }
  },
  mounted() {},
  methods: {
    openLayer() {
      this.$layer({
        id: "重要提示",
        title: "重要提示",
        area: [400, 200],
        resize: [0, 0],
        setTop: true,
        move: false,
        shade: "#07a4",
        shadeClose: true,
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
  }
};
</script>
<style lang="less">
.el-tooltip__popper.is-light {
  background: #fff;
  border: 1px solid #d4d4d4;
}
.el-tooltip__popper.is-light .popper__arrow {
  border-color: transparent !important;
}

.el-tooltip__popper.is-light .popper__arrow::after {
  border-color: transparent !important;
}
#app {
  width: 100%;
  min-width: 500px;
  height: 100%;
  .hljs {
    background: transparent;
  }
  .v-show-content {
    background-color: transparent !important;
  }
  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #ffffff00;
    color: rgb(0, 0, 0);
    padding: 0 !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 1;
    #nav {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        min-width: 200px;
        display: block;
        font-size: 30px;
        div {
          color: rgb(0, 0, 0);
          &:hover {
            color: #409eff;
          }
        }
      }
      .title-menu {
        position: relative;
        padding-left: 20px;
        padding-right: 20px;
        display: block;
        width: 900px;
        text-align: right;
        a {
          padding-left: 30px;
        }
        #theme {
          margin-left: 30px;
          .el-switch {
            position: relative;
            top: -2px;
          }
          .el-icon-moon {
            position: absolute;
            right: 23px;
            top: 22px;
          }
          .el-icon-sunny {
            position: absolute;
            color: white;
            right: 40px;
            top: 22px;
          }
        }
      }
      a {
        font-weight: bold;
        color: rgb(0, 0, 0);
      }
    }
    .important {
      min-width: 100px;
      height: 30px;
      line-height: 30px;
      color: #07a;
      border-radius: 3px;
      cursor: pointer;
      animation: aaa 3s ease infinite;
      background: linear-gradient(45deg, #bfa, #19a);
      background-size: 200% 200%;
      &:hover {
        color: #0fa;
        box-shadow: #19a 0px 0px 20px;
      }
      @keyframes aaa {
        0% {
          background-position: 0 0%;
        }
        50% {
          background-position: 100% 0%;
        }
        100% {
          background-position: 0 0%;
        }
      }
    }
  }
  .main {
    height: calc(100% - 100px);
    overflow: hidden;
    padding-top: 60px;
  }
  .footer {
    position: absolute;
    // z-index: 0;
    width: 100%;
    height: 40px;
    background-color: #ffffff00;
    color: rgb(0, 0, 0);
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.1);
    a {
      color: rgb(0, 0, 0);
    }
  }
  code {
    font-family: Consolas, Monaco, monospace;
    font-size: 14px;
    tab-size: 4;
    border-radius: 5px;
  }
  a {
    text-decoration: none;
    &:hover {
      color: #409eff !important;
    }
  }
  .router-link-active {
    color: #409eff !important;
  }
  &.moon {
    .home {
      background-color: rgba(156, 156, 156, 0.253);
      color: #fff;
      a {
        color: #fff;
      }
      .download {
        border-color: white;
      }
    }
    .el-loading-mask {
      background-color: #000000e6;
    }
    .layer-vue {
      .layer-vue-box {
        background: #242424 !important;
        .layer-vue-title,
        .layer-vue-content {
          color: #fff !important;
        }
        .layer-vue-title {
          border-bottom: 1px solid rgb(80, 80, 80) !important;
        }
        .layer-vue-tools {
          .layer-vue-close,
          .layer-vue-max,
          .layer-vue-min {
            fill: #fff !important;
          }
        }
      }
    }
    .el-tabs__item {
      color: #fff !important;
      &:hover,
      &.is-active {
        color: #409eff !important;
      }
    }
    .el-tabs__nav-wrap::after {
      background: rgb(99, 99, 99);
    }
    .el-table,
    .el-table th,
    .el-table tr {
      color: #fff !important;
      background: #414141 !important;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: 1px solid #777777;
    }
    .el-input__inner,
    .el-select-dropdown__list {
      color: #fff !important;
      background: #414141 !important;
      border: 1px solid #424242 !important;
    }
    .el-popper[x-placement^="bottom"] .popper__arrow,
    .el-popper[x-placement^="bottom"] .popper__arrow::after {
      border-bottom-color: #424242 !important;
    }
    .el-select-dropdown {
      border: 1px solid #424242;
    }
    .el-scrollbar {
      .el-scrollbar__view.el-select-dropdown__list {
        color: #fff !important;
        background: #414141 !important;
        border: 1px solid #424242 !important;
        .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
          background: #000000 !important;
        }
        .el-select-dropdown__item {
          color: #fff !important;
        }
      }
    }
    .el-input-number__decrease,
    .el-input-number__increase {
      background: #202020 !important;
      border-color: #414141;
    }
    .header {
      background-color: #0a0e11;
      color: #fff;
      #nav {
        .title {
          div {
            color: #fff;
            &:hover {
              color: #409eff;
            }
          }
        }
        a {
          color: #fff;
        }
      }
    }
    .main {
      background-color: rgb(24, 25, 26);
      .v-show-content {
        background-color: rgb(24, 25, 26) !important;
        color: #fff;
      }
      .markdown-body {
        background: transparent !important;
        h1,
        h2 {
          border-bottom: 1px solid #2b2b2b !important;
        }
        img {
          background: transparent !important;
        }
        pre,
        .hljs {
          background: rgb(39, 40, 34) !important;
          color: #fff;
        }
        .hljs-tag,
        .hljs-name,
        .hljs-attribute,
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: rgb(249, 38, 114);
        }
        .hljs-string,
        .hljs-doctag {
          color: rgb(230, 219, 116);
        }
        .hljs-number,
        .hljs-literal,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag .hljs-attr {
          color: rgb(166, 226, 46);
        }
        .hljs-built_in,
        .hljs-builtin-name {
          color: rgb(102, 217, 239);
        }
        table tr {
          background-color: rgb(39, 40, 34);
        }
        table tr:nth-child(2n) {
          background-color: #1f1f1f;
        }
        table td,
        table th {
          border: 1px solid #414141;
        }
        //  166,226,46 102,217,239
      }
      .menu {
        div {
          &.active,
          &:hover {
            background: #ffffff0d;
            a {
              color: #409eff;
            }
          }
        }

        a {
          color: rgb(255, 255, 255);
        }
      }
      .demo h2,
      #closeallbtn,
      #zxtsbtn {
        color: #fff;
      }
      .show-code {
        border: 1px solid #414141;
        .showbtn {
          color: #414141;
          .showbtn-text {
            color: #414141;
            transition: all 0.3s ease;
            opacity: 0;
            padding-left: 0px;
            margin-left: 10px;
          }
        }
        &:hover .showbtn-text,
        &:hover .showbtn {
          color: #409eff;
          opacity: 1;
          padding-left: 0;
          background: #414141;
        }
        &:hover .copybtn {
          display: initial;
          opacity: 1;
        }
      }
    }
    .footer {
      background-color: #0a0e11;
      color: #fff;
      a {
        color: #fff;
      }
    }
  }
}
/*css主要部分的样式*/
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  width: 5px; /*对垂直流动条有效*/
  height: 5px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;

  background-color: rgba(144, 147, 153, 0.5);
}

/*定义两端按钮的样式*/
::-webkit-scrollbar-button {
  display: none;
}

/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
  background: transparent;
}

@media only screen and (max-width: 540px) {
  #app {
    min-width: 0px;
    .header #nav .title {
      min-width: 100px;
      font-size: 20px;
    }
    .header {
      width: 100vw !important;
      #nav .title-menu {
        padding: 0 !important;
        a[href="#/demo"] {
          display: none;
        }
        a,
        #theme {
          padding-left: 5px !important;
          margin: 0px !important;
          .el-icon-sunny {
            right: 20px;
          }
        }
      }
    }
  }

  .main {
    width: 100vw !important;
    .home-bg {
      background-image: url("./assets/bg2.jpg") !important;
    }
  }
  .menu {
    display: none;
  }
  .footer {
    span {
      display: none;
    }
    a {
      font-size: 10px;
      overflow: hidden !important;
    }
  }
}
</style>
