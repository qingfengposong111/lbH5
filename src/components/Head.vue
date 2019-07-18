<template>
  <div class='head'>
    <flexbox :gutter='9.5'>
        <flexbox-item :span="16/125">
             <slot name="left"></slot>
        </flexbox-item>
        <flexbox-item :span="52/75">
             <slot name="center"></slot>
        </flexbox-item>
        <flexbox-item :span="16/125">
             <slot name="right"></slot>
        </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
export default {
  name:'c-head',
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.head {
  height: 45px;
  padding: 8px 0 8px;
  background: linear-gradient(#A1FED6, #13C3B5);

}
.head{
 position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 1000;
}
</style>
