<template>
  <div class="home-bg" :class="'bg' + bg">
    <div class="home">
      <router-link to="/doc"
        ><img alt="Vue logo" src="@/assets/logo.png"
      /></router-link>
      <h1>
        <router-link to="/doc"><div>LayerVue</div></router-link>
      </h1>
      <h2>开源的前端vue组件</h2>
      <div style="margin-bottom: 20px">
        基于Vue框架的可移动可调整大小的非模态弹出层
      </div>
      <el-tooltip
        :effect="$store.state.theme ? 'light' : 'dark'"
        content="不一定是最新版，可前往git仓库查看最新版"
        placement="top"
      >
        <a href="layer-vue.zip" download="layer-vue.zip">
          <div class="download">点击下载</div>
        </a>
      </el-tooltip>

      <div style="margin-bottom: 100px;">
        <span>当前版本:{{ version }}</span
        >&nbsp;&nbsp;<router-link to="/doc"><span>查看文档</span></router-link
        >&nbsp;&nbsp;
        <span
          ><a href="https://gitee.com/finalsummer/layer-vue" target="_blank"
            >Gitee</a
          ></span
        >&nbsp;&nbsp;
        <span
          ><a href="https://github.com/642661520/layer-vue" target="_blank"
            >github</a
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: this.$layer.version,
      bg: parseInt(Math.random() * 5),
    };
  },
};
</script>

<style lang="less">
.home-bg {
  position: absolute;
  top: 0;
  user-select: none;
  font-weight: 900;
  background-image: url("../assets/bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: rgb(0, 0, 0);
  &.bg2 {
    background-image: url("../assets/bg2.jpg");
  }
  &.bg3 {
    background-image: url("../assets/bg3.jpg");
  }
  &.bg4 {
    background-image: url("../assets/bg4.jpg");
  }
  &.bg5 {
    background-image: url("../assets/bg5.jpeg");
  }
  .home {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.24);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .doc {
      margin-top: 20px;
      color: #409eff;
    }
    img {
      margin-top: 100px;
    }
    a {
      color: rgb(0, 0, 0);
      user-select: none;
      display: inline-block;
    }
    .download {
      width: 200px;
      line-height: 70px;
      display: inline-block;
      font-size: 20px;
      border: 1px solid rgb(0, 0, 0);
      background-color: rgba(255, 255, 255, 0.219);
      transition: all 0.5s;
      border-radius: 10px;
      &:hover {
        color: #409eff;
        background-color: rgba(255, 255, 255, 0.486);
        border-color: #409eff;
        border-radius: 40px;
      }
    }
    h1,
    h2 {
      padding: 10px;
    }
    span {
      font-size: 14px;
    }
  }
}
</style>
