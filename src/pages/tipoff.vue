<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">爆料圈</p>
      <p slot='right' class='user-title' style="color:#fff;text-align: center;" @click="rule">规则</p>
    </c-head>

    <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div>
    <div class="top">
      <div class='mine-img'><img :src="headImg" alt=""></div>
      <div class="money">
        <div @click="tiplist"><span>所得佣金：</span><span>{{b1 | yuan}} 元</span></div>
        <div><span>已提现：</span><span>{{b2 | yuan}} 元</span></div>
      </div>
    </div>
    <div class="act-main">
        <router-link tag="div" :to="`/tipdetail/`+single.id" class="temp" v-for="(single,index) in lists" :key="index">
          <div class="til">{{single.title}}</div>
          <div class='com-con'>
            <p>{{single.shortContent}}</p>
          </div>
          <div class="pic-box">
            <flexbox class="flex-row" :gutter="5">
              <flexbox-item :span='70/283' style="margin-left:0;" v-for="(self,a) in single.urls" :key="a">
                <div class="com-pic">
                  <img :src="self"   alt="">
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <div class="time-show">
            <div>{{single.createTime | formatDate}}</div>
            <div class="show">
              <img src="/static/icon_grey_eyes.png" v-bind:width="14" alt="">
              <span>{{single.hits}}</span>
            </div>
          </div>
        </router-link>
        </div>

      </div></mescroll-vue>
    <img @click="send" class="send" src="/static/circle_btn_release.png" alt="">
  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    components:{
      MescrollVue
    },
    props:{},
    data(){
      return {
          lists:[],
        headImg:localStorage.getItem("qrcodeImg")?localStorage.getItem("qrcodeImg"):'http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png',
        mescroll: null,
        b1:localStorage.infon!==undefined?localStorage.info.commission:'0',
        b2:localStorage.info!==undefined?localStorage.info.commission:'0',
        mescrollDown: {},
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 20
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>',
          noMoreSize: 5,
          empty: {
            warpId: "xxid",
            icon: "./static/mescroll/mescroll-empty.png",
            tip: "暂无相关数据~"
          }
        }
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
        return YY + '-' +MM + '-' + d
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    watch:{},
    computed:{
    },
    created(){
      this.message();
    },
    methods: {
      turnUp: function() {
        this.$router.push('/home/found');
      },
      rule (){
        this.$router.push('/home/rule')
      },
      tiplist: function () {
        this.$router.push('/tiplist')
      },
      send: function () {
        let that = this;
        if(localStorage.token){
          this.$router.push("/tipsend")
        }else{
          this.$vux.loading.show({
            text: '请登录！'
          });
          setTimeout(() => {
            that.$vux.loading.hide();
            that.$router.push({name:'login',query:{redirect:'/tipoff'}});
          }, 1000)
        }

      },
      /*主页*/
      message: function () {
        this.$axios.get('/api/v2/showPersonInfo',{
          headers:{
            'token':localStorage.token
          }
        }).then( res =>{
          localStorage.setItem('info',res.data.data) ;
        })
      },
      /*爆料文章列表*/
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback (page, mescroll) {// 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        this.$axios.get('/api/v2/exposeList', {// 请求的列表数据
          params: {
            pageSize: page.size,
            pageNumber: page.num
          },
          headers: {
            'token': localStorage.getItem('token') || ''
          }
        }).then((response) => {
          let arr = response.data.data.list;
          if (page.num === 1) this.lists = [];// 如果是第一页需手动制空列表
          this.lists = this.lists.concat(arr);// 把请求到的数据添加到列表
          this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
            mescroll.endSuccess(arr.length)
          })
        })
      }
    },

    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  body,#app,html{
    background: #f6f6f6!important;
    width: 100%;
    height: 100%;
  }
  .home-act{
  }
  .mine-img {
    width: 100px;
    height: 100px;
    vertical-align: middle;
    margin: 0 auto;
    position:relative;
    top:50px;
  }
  .mine-img img{
    width: 100%;
    height: 100%;
    border-radius:50%;
    object-fit:cover;
    border:4px solid #A1FED6;
  }
  .head{
    position:fixed!important;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
    background:rgba(161,254,214,1)!important;
    /*background: transparent;*/
  }
  .top{
    width:100%;
    height: 225px;
    /*background: url(/static/tipoff/img_bg.png);*/
    background:rgba(161,254,214,1)!important;
    position:relative;
    z-index:100;
  }
  .money{
    width: 100%;
    position:absolute;
    left:0;
    bottom:10%;
    display:flex;
    justify-content: space-between;
    text-align: center;
    align-items:center;
    color:#fff;
    font-size: 14px;
  }
  .money>div{
    width: 50%;
  }
  .act-main{
    width: 92%;
    margin:0 auto 0;
  }
  .temp{
    background: #fff;
    width: 100%;
    margin-top:14px;
    border-radius:6px;
    box-shadow:0 2px 2px #eee;
    padding:10px 16px;
  }
  .til{
    font-size: 14px;
  }
  .time-show{
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    font-size: 12px;
  }
  .show img{
    margin-right:5px;
  }
  .show{
    display:flex;
    justify-content: flex-start;
    align-items:center;
  }
  .pic-box{
    margin-top:5px;
  }
  .flex-row{
    width: 100%;
    display:flex;
    flex-wrap:wrap;
  }
  .flex-row>flexbox-item{
    width: 30%;
  }
  .com-pic{
    width:60px;
    height:60px;
    margin:5px 10px 5px 0;
  }
  .com-pic img{
    width:100%;
    height:100%;
  }
  .com-con p{
    font-size:14px;
    color:#666;
    line-height: 20px;
  }
  .send{
    position:fixed;
    width: 44px;
    height: 44px;
    right:5%;
    bottom:3%;
  }
</style>
