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
      <Callback />
      <Globalmethod />
    </div>
  </div>
</template>

<script>
import Offset from "./Offset.vue";
import Area from "./Area.vue";
import Tools from "./Tools.vue";
import Title from "./Title.vue";
import Content from "./Content.vue";
import Anim from "./Anim.vue";
import Move from "./Move.vue";
import Skin from "./Skin.vue";
import Settop from "./Settop.vue";
import Reset from "./Reset.vue";
import Resize from "./Resize.vue";
import Callback from "./Callback.vue";
import Globalmethod from './Globalmethod.vue'
export default {
  components: {
    Offset,
    Area,
    Tools,
    Title,
    Content,
    Anim,
    Move,
    Skin,
    Settop,
    Reset,
    Resize,
    Callback,
    Globalmethod
  },
  created() {
    this.$layer && this.$layer.closeAll();
  },
};
</script>

