<template>
  <div id="movetest">template{{id}}<br>
    <el-button @click="add">加一</el-button>
    <div>{{a}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a:1
    }
  },
 props:{id:{}},
 methods:{
   add(){
     this.a++
   }
 }
};
</script>
