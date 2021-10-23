```html
<template>
  <div>
    <layer-vue :visible.sync="visible1" :setTop="true" append-to-body>
      设置append-to-body,layer会插入到body
    </layer-vue>
    <layer-vue :visible.sync="visible2"  id="myid">
    id="myid" 设置id,可以避免弹出多个相同的layer,可以作为全局方法的参数
    </layer-vue>
    <layer-vue :visible.sync="visible3">
    组件调用设置visible，可控制显示隐藏，不设置则会直接打开，关闭后需要通过id或者index调用openAgain才能打开
    </layer-vue>
    <layer-vue :visible.sync="visible4" isMax :maxmin="[1,1]">
    isMax 以最大化打开
    </layer-vue>
    <h2>其他</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="visible3=true">visible</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible1=true">插入到body</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible2=true">设置ID</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="openLayer">设置parent</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible4=true"> isMax</el-button>
      </el-col>

    </el-row>
    <show-code codename="other" />
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue'
export default {
  components: { showCode },
data() {
  return {
    visible1:false,
    visible2:false,
    visible3:false,
    visible4:false
  }
},
methods: {
  openLayer(){
    this.$layer({
      parent:this,
      content:'函数调用layer时，设置parent:this，可在vue调试工具下观察数据'
    })
  }
},
}
</script>

<style>

</style>
```