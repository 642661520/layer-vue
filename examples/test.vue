<template>
  <div>template{{id}}
    <div><button @click="add">312312</button>{{a}}</div>
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
 created(){
   console.log(this.$parent);
   
 },
 methods:{
   add(){
     this.a++
   }
 }
};
</script>
