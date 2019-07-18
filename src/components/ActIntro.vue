<template>
  <div>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  components:{},
  props:['message'],
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
div{
    padding:15px;
    background:#fff;
}
p{
    font-size:14px;
     color:#666;
     line-height: 20px;
  text-indent:2em;
}
</style>
