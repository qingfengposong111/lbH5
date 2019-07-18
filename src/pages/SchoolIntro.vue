<template>
  <div class='sc-intro'>
      <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title">学校简介</div>
    </c-head>
    <div class='intro-main'>
        <div class='intro-img'>
            <img :src="dataList.imgUrl" alt="">
        </div>
    </div>
    <div class='main'>
        <p>
            {{dataList.profile}}
        </p>
    </div>
    <div class='foot'>
        <p>地址：{{dataList.addr}}</p>
        <p>电话：{{dataList.consultPhone}}</p>
        <p>邮箱：{{dataList.email}}</p>
        <p>网址：{{dataList.website}}</p>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      dataList: []
    }
  },
  watch:{},
  computed:{},
  methods:{
      turnUp:function(){
          this.$router.go(-1)
      }
  },
  created(){
    this.$axios.get('/api/v2/schoolProfile',{
      params: {
        id:this.$route.params.id
      }
    }).then(res=>{
      this.dataList = res.data.data;
    })
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.intro-img{
    width:100px;
    height:100px;
    margin:0 auto;
}
.intro-img img{
    width:100%;
    height:100%;
    border-radius:50%;
}
.intro-main{
    padding:60px 15px 15px;
}
.sc-intro{
    height:100%;
    background: #fff;
}
p{
    font-size:12px;
    color:#666;
    line-height: 20px;
    letter-spacing:2px;
    text-align:justify;
}
.main,.foot{
    padding:15px;
}
</style>
