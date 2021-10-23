<template>
  <div id="doc" v-loading="loading">
    <div class="menu">
      <div v-for="item in aData" :key="item.id" @click="url(item.id)" :class="[item.class, item.id === active ? 'active' : '']">
        <a href="javascript:void(0);">{{ item.name }}</a>
      </div>
    </div>
    <div class="concent" id="concent">
      <div style="text-align: right">
        <el-select :popper-append-to-body="false" v-model="version" placeholder="请选择" @change="getdoc" style="width: 100px;text-align:left">
          <el-option v-for="item in versions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <mavon-editor v-model="doc" :subfield="false" defaultOpen="preview" :editable="false" :toolbarsFlag="false" :scrollStyle="true" />
    </div>
    <div id="test" style="display: none;overflow: hidden;">
      <textarea  id="textarea" @keydown="textareaTab" v-model="textarea" contenteditable="true"></textarea>
      <el-button type='primary' style="position: absolute; bottom: 10px; right: 10px" @click="click">立即运行</el-button>
    </div>
    <div v-show='!zxtsshow' id="zxtsbtn" @click="openlayer">在线调试</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Doc",
  data() {
    return {
      doc: undefined,
      aData: [],
      active: undefined,
      loading: true,
      versions: [],
      version: this.$layer.version,
      zxtsshow:false,
      textarea: `{
  title:'在线调试',
  content:'配置各种参数，试试效果'
}`,
    };
  },
created() {
    const versions=[...this.$layer.versions].reverse();
    this.versions=versions;
    this.$layer.o.instances=[]
    this.getdoc();
  },
  mounted() {
    this.openlayer()
    document.getElementById("concent").addEventListener("scroll", this.getactivedom);
  },
  beforeDestroy() {
    if(document.getElementById("concent")){
      document.getElementById("concent").removeEventListener("scroll", this.getactivedom);
    }
    // document.getElementById("concent")?.removeEventListener("scroll", this.getactivedom);
  },

  methods: {
    textareaTab(e) {
      if (e.keyCode === 9) {
        if (e && e.preventDefault) {
          var CaretPos = document.getElementById("textarea").selectionStart; // 创建选定区域
          this.textarea = this.textarea.slice(0, CaretPos) + "  " + this.textarea.slice(CaretPos);
          this.$nextTick(() => {
            document.getElementById("textarea").setSelectionRange(CaretPos + 2, CaretPos + 2);
          });
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      }
    },
    click() {
      try {
        window.eval(`Vue.prototype.$layer(${this.textarea})`);
      } catch (error) {
        this.$message.error("您的代码输入错误!" + error);
      }
    },
    openlayer(){
        this.$layer({
      title: "在线调试",
      settop: true,
      skin:'win7',
      offset: [document.documentElement.scrollHeight-240,document.getElementById('concent').getBoundingClientRect().x+document.getElementById('concent').clientWidth-325],
      content: document.getElementById("test"),
      resizing: (e,w,h) => {
        document.getElementById("textarea").style.height =(h-42)+'px'
      },
      success:()=>{
          this.zxtsshow=true
      },
      end:()=>{
        this.zxtsshow=false
      }
    });
    },
    url(url) {
      document.getElementById(url).scrollIntoView(true);
      this.active = url;
    },
    listA() {
      const aData = [];
      for (let i = 0; i < document.getElementsByTagName("a").length; i++) {
        if (document.getElementsByTagName("a")[i].id !== "") {
          let Data = {
            id: document.getElementsByTagName("a")[i].id, // 获取a标签的id
            name: document.getElementsByTagName("a")[i].parentNode.innerText.split("-")[0],
            class: document.getElementsByTagName("a")[i].parentNode.tagName,
          };
          aData.push(Data);
        }
      }
      this.aData = aData.slice(0, parseInt(aData.length / 2));
      this.active = this.aData[0].id;
    },
    getdoc() {
      this.loading = true;
      axios
        .get(`https://unpkg.com/layer-vue@${this.version}/README.md`)
        .then((res) => {
          this.doc = res.data;
          console.log(res);
          
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
    getactivedom() {
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
    position: relative;
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
      &.active,&:hover {
        a {
          color: #409eff;
        }
        background: #0000000d;
        border-radius: 5px;
      }
    }
    a {
      color: #444;
    }
  }
  #zxtsbtn{
    position: fixed;
    z-index: 1;
    width: 20px;
    right: 0px;
    // right: calc(50% - 550px);
    top: 40%;
    border: 1px solid rgb(202, 202, 202);
    color: rgb(90, 90, 90);
    font-size: 12px;
    height: 100px;
    line-height: 25px;
    user-select: none;
    border-right: 0;
    cursor: pointer;
    border-radius: 5px 0  0  5px;
    text-align: center;
    &:hover{
      background: #409eff;
      color: white;
    }
  }
}
#test{
#textarea {
  font-family: Courier New;
  background: #444;
  font-size: 12px;
  color: white;
  height: 150px;
  width: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
}
}

</style>
