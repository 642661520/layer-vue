
<template>
  <div id="doc" v-loading="loading">
    <!-- <Menu></Menu> -->
    <div class="menu">
      <div v-for="item in aData" :key="item.id" @click="url(item.id)" :class="[item.class, item.id === active ? 'active' : '']">
        <a href="javascript:void(0);">{{ item.name }}</a>
      </div>
    </div>

    <div class="concent" id="concent">
      <!-- <router-view /> -->
      <mavon-editor v-model="value" :subfield="false" defaultOpen="preview" :editable="false" :toolbarsFlag="false" :scrollStyle="true" />
    </div>
  </div>
</template>
<script>
// import Menu from "@/components/doc/menu";
import axios from "axios";
export default {
  name: "Doc",
  data() {
    return {
      value: undefined,
      aData: [],
      active: undefined,
      loading: true,
    };
  },
  components: {
    // Menu,
  },
created() {
  this.$layer.o.instances=[]
    axios
      .get("https://unpkg.com/layer-vue/UPDATE.md")
      .then((res) => {
        this.value = res.data;
        this.$nextTick(() => {
          this.listA();
          this.loading = false;
        });
      })
      .catch((err) => {
        this.loading = false;
        console.error(err);
        this.$message.error("文档错误，加载失败！");
      });
  },
   mounted() {
    document.getElementById("concent").addEventListener("scroll", this.getactivedom);
  },
  beforeDestroy() {
    if(document.getElementById("concent")){
      document.getElementById("concent").removeEventListener("scroll", this.getactivedom);
    }
    // document.getElementById("concent")?.removeEventListener("scroll", this.getactivedom);
  },
  methods: {
    getactivedom(){
document.getElementById("concent").addEventListener("scroll", () => {
      let doms = [
        ...document.getElementById("concent").getElementsByTagName("h1"),
        ...document.getElementById("concent").getElementsByTagName("h2"),
        ...document.getElementById("concent").getElementsByTagName("h3"),
        ...document.getElementById("concent").getElementsByTagName("h4"),
        ...document.getElementById("concent").getElementsByTagName("h5"),
      ];
      let dom = doms.find((element) => {
        return Math.abs(document.getElementById("concent").scrollTop - element.offsetTop) < 120;
      });
      if (dom !== undefined) {
        this.active = dom.children[0].id;
        const active = document.getElementsByClassName("active")[0];
        active.scrollIntoView(true);
      }
    });
    },
    url(url) {
      document.getElementById(url).scrollIntoView(true);
      this.active = url;
    },
    listA() {
      for (let i = 0; i < document.getElementsByTagName("a").length; i++) {
        if (document.getElementsByTagName("a")[i].id !== "") {
          let aData = {
            id: document.getElementsByTagName("a")[i].id, // 获取a标签的id
            name: document.getElementsByTagName("a")[i].parentNode.innerText.split("-")[0],
            class: document.getElementsByTagName("a")[i].parentNode.tagName,
          };
          this.aData.push(aData);
        }
      }
      this.aData = this.aData.slice(0, parseInt(this.aData.length / 2));
      this.active = this.aData[0].id;
    },
  },
};
</script>
<style lang="less">
#doc {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .concent {
    overflow-y: auto;
    overflow-x: hidden;
    width: 900px;
    padding: 20px;
    z-index: 0;
    h2 {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    h3 {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .menu {
    overflow: auto;
    width: 200px;
    height: 100%;
    div {
      padding: 5px 5px;
      user-select: none;
      font-size: 18px;
      line-height: 20px;
      height: 20px;
      line-height: 20px;
      &.H2 {
        padding-left: 10px;
        font-size: 16px;
        a {
          color: rgb(0, 0, 0);
        }
      }
      &.H3 {
        padding-left: 20px;
        font-size: 14px;
      }
      &.H4 {
        padding-left: 30px;
        font-size: 14px;
      }
      &.H5 {
        font-size: 12px;
        padding-left: 40px;
      }
      &.active {
        a {
          color: #409eff;
        }
      }
    }
    a {
      color: #444;
    }
  }
}
</style>
