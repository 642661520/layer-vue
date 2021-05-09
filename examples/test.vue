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
 methods:{
   add(){
     this.a++
   }
 }
};
</script>
