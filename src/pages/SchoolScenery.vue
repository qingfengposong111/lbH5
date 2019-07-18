<template>
  <div class='scenery'>
      <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title">学校风采</div>
    </c-head>
    <div class='main'>
        <flexbox :gutter='0' wrap='wrap'>
            <flexbox-item v-for='(item,index) in detailList.picList' :key='index' :span="1/2">
                <div class="into-img"><img :src="item.imgUrl" preview="index" alt=""></div>
            </flexbox-item>
        </flexbox>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        detailList:[]
    }
  },
  watch:{},
  computed:{},
  methods:{
      turnUp:function(){
          this.$router.go(-1)
      },
    /**
     * 获取教育机构详情页（除评论）
     */
    getDetail: function() {
        let param={
            id:this.$route.params.id
        }
        this.$axios.get(this.$api.school.showDetail,{
            params:param
        }).then((res)=>{
            this.detailList=res.data.data
        })
    }
    },
  created(){},
  mounted(){
      this.getDetail();
  }
}
</script>
<style lang="less" scoped>
.scenery{
    height:100%;
    background: #fff;
}
.main{
    padding:15px;
    padding-left:0;
  padding-top:60px;
}
.into-img{
    height:110px;
    margin-bottom:15px;
    margin-left:15px;
}
.into-img img{
    width:100%;
    height:100%;
}
</style>
