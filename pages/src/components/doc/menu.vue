<template>
  <div class="menu">
    <div>
      <router-link to="/doc/basics" class="menu-a" @click.native="linkclick(0)">基础说明</router-link>
    </div>
    <p v-show="$route.fullPath === '/doc/basics'">
      <a href="javascript:void(0)" @click="gobasics(0)" :class="{ active: active === 0 }"><span>简介</span></a>
      <a href="javascript:void(0)" @click="gobasics(1)" :class="{ active: active === 1 }"><span>安装</span></a>
      <a href="javascript:void(0)" @click="gobasics(2)" :class="{ active: active === 2 }"><span>使用</span></a>
      <a href="javascript:void(0)" @click="gobasics(3)" :class="{ active: active === 3 }"><span>自定义主题</span></a>
    </p>
    <div>
      <router-link to="/doc/config" class="menu-a" @click.native="linkclick(100)">配置项</router-link>
    </div>
    <p v-show="$route.fullPath === '/doc/config'">
      <a href="javascript:void(0)" @click="goconfig(100)" :class="{ active: active === 100 }"><span>visible</span></a>
      <a href="javascript:void(0)" @click="goconfig(101)" :class="{ active: active === 101 }"><span>destroyOnClose</span></a>
      <a href="javascript:void(0)" @click="goconfig(102)" :class="{ active: active === 102 }"><span>title</span></a>
      <a href="javascript:void(0)" @click="goconfig(103)" :class="{ active: active === 103 }"><span>content</span></a>
      <a href="javascript:void(0)" @click="goconfig(104)" :class="{ active: active === 104 }"><span>id</span></a>
      <a href="javascript:void(0)" @click="goconfig(105)" :class="{ active: active === 105 }"><span>area</span></a>
      <a href="javascript:void(0)" @click="goconfig(106)" :class="{ active: active === 106 }"><span>offset</span></a>
      <a href="javascript:void(0)" @click="goconfig(107)" :class="{ active: active === 107 }"><span>anim</span></a>
      <a href="javascript:void(0)" @click="goconfig(108)" :class="{ active: active === 108 }"><span>closeBtn</span></a>
      <a href="javascript:void(0)" @click="goconfig(109)" :class="{ active: active === 109 }"><span>maxmin</span></a>
      <a href="javascript:void(0)" @click="goconfig(110)" :class="{ active: active === 110 }"><span>resize</span></a>
      <a href="javascript:void(0)" @click="goconfig(111)" :class="{ active: active === 111 }"><span>zIndex</span></a>
      <a href="javascript:void(0)" @click="goconfig(112)" :class="{ active: active === 112 }"><span>settop</span></a>
      <a href="javascript:void(0)" @click="goconfig(113)" :class="{ active: active === 113 }"><span>move</span></a>
      <a href="javascript:void(0)" @click="goconfig(114)" :class="{ active: active === 114 }"><span>moveOut</span></a>
      <a href="javascript:void(0)" @click="goconfig(115)" :class="{ active: active === 115 }"><span>reset</span></a>
      <a href="javascript:void(0)" @click="goconfig(116)" :class="{ active: active === 116 }"><span>titlehieght</span></a>
      <a href="javascript:void(0)" @click="goconfig(117)" :class="{ active: active === 117 }"><span>el</span></a>
      <a href="javascript:void(0)" @click="goconfig(118)" :class="{ active: active === 118 }"><span>minarea</span></a>
    </p>

    <div>
      <router-link to="/doc/callback" class="menu-a" @click.native="linkclick(200)">回调函数</router-link>
    </div>
    <p v-show="$route.fullPath === '/doc/callback'">
      <a href="javascript:void(0)" @click="gocallback(200)" :class="{ active: active === 200 }"><span>success</span></a>
      <a href="javascript:void(0)" @click="gocallback(201)" :class="{ active: active === 201 }"><span>cancel</span></a>
      <a href="javascript:void(0)" @click="gocallback(202)" :class="{ active: active === 202 }"><span>end</span></a>
      <a href="javascript:void(0)" @click="gocallback(203)" :class="{ active: active === 203 }"><span>moveEnd</span></a>
      <a href="javascript:void(0)" @click="gocallback(204)" :class="{ active: active === 204 }"><span>resizing</span></a>
      <a href="javascript:void(0)" @click="gocallback(205)" :class="{ active: active === 205 }"><span>resizeEnd</span></a>
      <a href="javascript:void(0)" @click="gocallback(206)" :class="{ active: active === 206 }"><span>full/min/restore</span></a>
    </p>
    <div>
      <router-link to="/doc/method" class="menu-a" @click.native="active = -1">全局方法</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      newpath: false,
    };
  },
  mounted() {
    if (this.$route.fullPath === "/doc/basics") {
      this.active = 0;
    } else if (this.$route.fullPath === "/doc/config") {
      this.active = 100;
    } else if (this.$route.fullPath === "/doc/callback") {
      this.active = 200;
    } else {
      this.active = -1;
    }
    document.querySelector("#concent").addEventListener("scroll", () => {
      document
        .getElementById("concent")
        .getElementsByTagName("h2")
        .forEach((element, i) => {
          if (Math.abs(document.querySelector("#concent").scrollTop - element.offsetTop) < 90) {
            let active = i;
            if (this.$route.fullPath === "/doc/config") {
              active = i + 100;
            } else if (this.$route.fullPath === "/doc/callback") {
              active = i + 200;
            }
            this.active = active;
          }
        });
    });
  },
  methods: {
    goanchor(fullPath, selector) {
      this.$store.commit("test", 10);
      const path = this.$route.fullPath;
      if (path === fullPath) {
        var anchor = document.querySelector("#anchor-" + selector);

        document.querySelector("#concent").scrollTop = anchor.offsetTop - 60;
        this.active = selector;
      } else {
        this.$router.push(fullPath, () => {
          this.$nextTick(() => {
            var anchor = document.querySelector("#anchor-" + selector);
            document.querySelector("#concent").scrollTop = anchor.offsetTop - 60;
            this.active = selector;
          });
        });
      }
    },
    gobasics(selector) {
      this.goanchor("/doc/basics", selector);
    },
    goconfig(selector) {
      this.goanchor("/doc/config", selector);
    },
    gocallback(selector) {
      this.goanchor("/doc/callback", selector);
    },
    linkclick(i) {
      this.active = i;
      document.querySelector("#concent").scrollTop = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  border: 1px solid;
  border-color: transparent rgba(150, 150, 150, 0.425) transparent transparent;
  overflow: auto;
  min-width: 200px;
  height: 100%;
  .menu-a {
    display: block;
  }
  span {
    padding: 5px 5px;
    display: block;
    user-select: none;
    font-size: 14px;
    line-height: 20px;
  }
  a {
    // color: rgba(0, 0, 0, 0.884);
    color: rgb(128, 128, 128);
  }
  div {
    height: 40px;
    line-height: 30px;
  }
  .active span {
    color: #42b983;
    background-color: rgba(150, 150, 150, 0.425);
  }
  .router-link-active {
    border: 1px solid #42b983;
    border-color: transparent transparent #42b983 transparent;
  }
}
</style>
