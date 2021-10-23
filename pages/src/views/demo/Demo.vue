<template>
  <div class="demo">
    <div class="demo_main">
      <Offset />
      <Area />
      <Move />
      <Resize />
      <Reset />
      <Tools />
      <Title />
      <Content />
      <Anim />
      <Skin />
      <Settop />
      <Shade />
      <Callback />
      <Globalmethod />
      <Other />
      <msg-no />
      <div id="closeallbtn" @click="closeAll">关闭全部</div>
    </div>
  </div>
</template>

<script>
import Offset from "./Offset.vue";
import Area from "./Area.vue";
import Tools from "./Tools.vue";
import Title from "./Title.vue";
import Content from "./Content.vue";
import MsgNo from "../../components/msg-no.vue";
import Anim from "./Anim.vue";
import Move from "./Move.vue";
import Skin from "./Skin.vue";
import Settop from "./Settop.vue";
import Reset from "./Reset.vue";
import Resize from "./Resize.vue";
import Callback from "./Callback.vue";
import Globalmethod from './Globalmethod.vue';
import Shade from './Shade.vue';
import Other from './Other.vue'
export default {
  components: {
    Offset,
    Area,
    Tools,
    Title,
    Content,
    MsgNo,
    Anim,
    Move,
    Skin,
    Settop,
    Reset,
    Resize,
    Callback,
    Globalmethod,
    Shade,
    Other
  },
  created() {
    this.$layer && this.$layer.closeAll();
  },
  methods: {
    closeAll(){
      this.$layer.closeAll();
    }
  },
};
</script>

<style lang="less">
.demo {
  height: 100%;
  h2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-row {
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-input {
    width: 90%;
  }
  .el-input-number {
    .el-input {
      width: 100%;
    }
  }
  width: 100%;
  display: flex;
  justify-content: center;
  .demo_main {
    width: 900px;
    height: 100%;
    overflow-y: auto;
  }
  padding-bottom: 20px;
    #closeallbtn{
    position: fixed;
    z-index: 9999;
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
    &:active{
      background: #3a8ee6;
      border: 1px solid #3a8ee6;
      border-right: 0;
    }
  }
}
</style>
