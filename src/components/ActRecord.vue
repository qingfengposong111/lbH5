<template>
  <div class="record">
    <flexbox wrap="wrap" :gutter="0">
        <flexbox-item v-cloak :span="1/2" v-for="(item,index) in recordList" :key="index" >
            <div class="record-box" style="margin-bottom:10px;">
                <img :src="item.imgUrl" alt="" >
            </div>
        </flexbox-item>
    </flexbox>
    <div class="no_pic" v-show="recordList.length===0">暂无活动图片</div>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
        id:localStorage.asid,
        recordList:[]
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
    this.$axios.get('/api/v2/findYxwActivityPictureList',{
      params:{
        id:this.id
      }
    })
      .then(res =>{
        this.recordList = res.data.data;
      })
      .catch(err =>{
        /*console.log(err);*/
      });
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.record{
    padding:15px 0 0 15px;
    background: #fff;
}
.record-box{
    height:115px;
    width:165px;
}

.record-box img{
    height:100%;
    width:100%;
}
  .no_pic{
    text-align: center;
    font-size: 14px;
    color:#999;
    padding-bottom:5px;
  }

</style>
