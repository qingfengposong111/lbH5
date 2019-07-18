<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">课程列表</p>
    </c-head>
    <div class="act-main">
      <div class="noLessons" v-if="list.length<=0">暂无课程！</div>
      <ul class="order_list">
        <router-link tag="li" v-for="(com,index) in list" :key="index" to='' @click.native="gos(index)">
          <div class="both_lr">
            <div class="left_img">
              <img :src="com.productImg" alt="">
            </div>
            <div class="right_contain">
              <p class="main-title">{{com.productName}}</p>
              <p class="main-middle">
                <img width="12"  v-if="com.distance!=null" style="display:block;margin-right:5px;" src="/static/icon_grey_positioning.png">
                <span v-if="com.distance!=null">{{com.distance}} |</span> <span>{{com.name}}</span>
              </p>
              <p class="price">
                ￥{{com.promotePrice | yuan}}
              </p>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{},
    data(){
      return {
        areaId: '',
        list: [],
        proId:''
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        let m = date.getMinutes();
        let h = date.getHours();
        MM = MM < 10 ? ('0' + MM) : MM;
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        return YY + '-' +MM + '-' + d + ' ' + h + ':' + m
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    watch:{},
    computed:{
    },
    created(){
      this.getData();
    },
    methods: {
      turnUp: function () {
        this.$router.go('-1');
      },
      chose (index) {
        this.list.forEach(function(item){

        })
      },
      getData () {
        this.$axios.get('/api/v2/showAgencyApply',{
          params: {
            sId:this.$route.params.id,
            longitude: this.$route.params.jd,
            latitude: this.$route.params.wd
          }
        })
          .then(res =>{
            this.list= res.data.data;
            this.proId = res.data.data.productId;
          })
      },
      gos (index) {
        this.$router.push('/school/CoursewareDetail/'+this.list[index].productId)
      },
      submit () {
        this.$router.push('/school/Pay');
      }
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .home-act{
    background: #FAFAFA;
    width: 100%;
    height: 100%;
  }
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#eee;
  }
  .vux-tab .vux-tab-item{
    font-size:16px;
  }
  .act-main{
    padding:44px 15px 0;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  ul.order_list{
    margin:20px 0 0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
    justify-content: space-between;
  }
  .order_list li{
    width: 160px;
    height: 150px;
    background: #fff;
    border-radius:4px;
    padding:0px 2px;
    margin-bottom:20px;
    box-shadow:0 0 5px #EAEAEA;
  }
  .order_list li .left_img{
    width: 100%;
    height: 80px;
    overflow: hidden;
  }
  .left_img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .right_contain{
    width: 100%;
  }
  .main-title{
    width: 100%;
    font-size: 14px;
    color:#000;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .main-middle{
    width: 100%;
    display:flex;
    font-size: 12px;
    color:#999;
    justify-content: flex-start;
    align-items:center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .main-middle span:nth-child(2){
    margin-right:5px;
  }
  .main-middle span{
    margin-left:5px;
  }
  .price{
    color:#5EE2C6;
    font-size: 14px;
  }
  .noLessons{
    width: 100%;
    text-align: center;
    padding-top:60%;
    color:#333;
  }

</style>
