<template>
  <div class="show-code">
    <transition name="fade">
      <div v-show="isopen" style="height: 300px; overflow: scroll">
        <mavon-editor
          style="z-index: 0"
          v-model="code"
          :subfield="false"
          defaultOpen="preview"
          :editable="false"
          :toolbarsFlag="false"
          :scrollStyle="true"
        />
      </div>
    </transition>
    <div>
      <el-button
        class="showbtn"
        style="width: 100%"
        type="text"
        @click="isopen = !isopen"
      >
        <i :class="isopen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        <a class="showbtn-text">{{ isopen ? "隐藏代码" : "显示代码" }}</a>
      </el-button>
      <el-button class="copybtn" @click="copy" type="text">复制代码</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isopen: false,
      code: undefined,
    };
  },
  props: {
    codename: {},
  },
  async created() {
    try {
      const result = await axios.get(`./${this.codename}.md`);
      this.code = result.data;
    } catch (error) {
      this.$message.error("文档错误，加载失败！");
    }
  },
  methods: {
    copy() {
      try {
        this.$clipboard(this.code.split('```html')[1].split('```')[0]);
         this.$message.success("复制到剪切板！");
      } catch (error) {
        this.$message.error("复制失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.show-code {
  border: 1px solid #eaeefb;
  border-radius: 5px;
  margin: 0 20px 0 0;
  overflow: hidden;
  position: relative;
  .copybtn {
    position: absolute;
    bottom: 0;
    right: 20px;
    transition: all 0.3s ease;
    opacity: 0;
  }
  .showbtn {
  box-sizing: border-box;
  padding-left: 50px;
  transition: all 0.3s ease;
  color: #d3dce6;
  .showbtn-text {
    color: #d3dce6;
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
    background: #f9fafc;
  }
  &:hover .copybtn {
    display: initial;
    opacity: 1;
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  height: 300px !important;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px !important;
}
</style>