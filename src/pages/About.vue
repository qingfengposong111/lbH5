<template>
  <div class='sc-intro'>
    <c-head>
      <div slot='left'>
        <div  class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <div slot='center' class="head-title">关于我们</div>
    </c-head>
    <div class='intro-main'>
      <div class='intro-img'>
        <img src="/static/logo.png" alt="">
      </div>
    </div>
    <div class='main'>
      <p>
        蜡笔优学致力于打造幼儿、儿童选择学校、机构的综合性信息服务平台。解决家长择校难的问题，为孩子提供多元化的教育信息！
      </p>
      <p>
        垂直类幼儿园及幼儿培训机构综合展示点评平台，为家长选择更适合自己小孩的学校和培训机构；
      </p>
      <p>
        周边幼儿游玩介绍，相关亲子活动推荐，为家长选择更好的玩学去处；
      </p>
      <p>
        幼儿园免费发布推广信息、支持在线咨询；
      </p>
      <p>
        培训机构免费发布推广信息、支持在线咨询、支持在线报名；
      </p>
    </div>
    <div class='foot'>
      <p>公司地址：广东省东莞市莞城街道兴塘社区旗峰路162号中侨大厦B座1808</p>
      <p>联系电话：0769-88016169</p>
      <p>微信公众号：蜡笔幼学</p>
    </div>
    <p class="bot">Copyright © 2018 东莞市优学信息技术有限公司</p>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{},
    data(){
      return {
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
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .intro-img{
    width:180px;
    height:130px;
    margin:0 auto;
  }
  .intro-img img{
    width:100%;
    height:100%;
  }
  .intro-main{
    padding:10px 15px 0;
    padding-top:50px;
  }
  .sc-intro{
    height:100%;
    background: #fff;
  }
  p{
    font-size:12px;
    color:#333;
    line-height: 20px;
    letter-spacing:2px;
    text-align:justify;
  }
  .main,.foot{
    padding:10px 15px;
  }
  .bot{
    width: 100%;
    text-align: center;
    position:absolute;
    left:0;
    bottom:3%;
    color:#999;
  }
</style>
