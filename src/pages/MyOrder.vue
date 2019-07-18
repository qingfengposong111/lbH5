<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">我的订单</p>
    </c-head>
    <div class="tabs" style="">
      <tab :line-width="1" custom-bar-width="100px"  @on-before-index-change="switchTabItem">
        <tab-item selected  @on-item-click="allItems(3)">全部</tab-item>
        <tab-item  class="vux-1px-l" @on-item-click="allItems(0)">待付款</tab-item>
        <tab-item class="vux-1px-l" @on-item-click="allItems(1)">已付款</tab-item>
      </tab>
    </div>
    <div class="act-main">
      <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <ul class="order_list" style="padding:0!important;box-sizing: border-box">
        <li v-for="(temp,index) in list" :key="index">
          <h4><span>{{temp.agencyName}}</span>
            <span @click="gopay(temp)" class="specil" v-if="!temp.endOrNot&&temp.isPay===0">去付款</span>
            <span v-if="!temp.endOrNot&&temp.isPay===1">已付款</span>
            <span class="alreadyHid" v-if="temp.endOrNot">已失效</span>
          </h4>
          <div class="both_lr">
            <div class="left_img">
              <img :src="temp.img" alt="">
            </div>
            <div class="right_contain">
              <h3>{{temp.name}}</h3>
              <p>订单号：{{temp.orderSn}}</p>
              <p>下单时间：{{temp.createTime | formatDate}}</p>
              <p>订单金额：￥{{temp.price | yuan}}</p>
            </div>
          </div>
        </li>
      </ul>
        </mescroll-vue>
    </div>
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
        areaId: '',
        list: [],
        mescroll: null,
        mescrollDown: {},
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 6
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>',
          noMoreSize: 5,
          empty: {
            warpId: "actMain",
            tip: ""
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
      this.allItems();
    },
    methods: {
      switchTabItem(index) {
        this.$vux.loading.show({
          text: 'loading'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          this.index01 = index
        }, 1000)
      },
      gopay (item) {
          this.$router.push('/school/Pay/'+item.productId+'/'+item.agencyName+'/'+item.price/100)
      },
      turnUp: function () {
        this.$router.push('/mine');
      },
      allItems(type) {
        let that = this;
        let _that = this;
        this.areaId=type;
        if(localStorage.token){
          this.$axios.get('/api/v2/orderList',{
            params: {
              isPay: type
            },
            headers:{
              'token': localStorage.token
            }
          })
            .then(res => {
              _that.list = res.data.data.list;
            })
            .catch(err => {
             /* this.$vux.loading.show({
                text: '登录超时，请重新登录'
              });
              setTimeout(() => {
                this.$vux.loading.hide();
                that.$router.push({name:'login',query:{redirect:'/mine/MyOrder'}});
              }, 1000)*/
            })
        }else{
          this.$vux.loading.show({
            text: '请登录'
          });
          setTimeout(() => {
            this.$vux.loading.hide();
            that.$router.push({name:'login',query:{redirect:'/mine/MyOrder'}});
          }, 1000)
        }

      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        if(this.areaId==0){
          this.$axios.get('/api/v2/orderList', {// 请求的列表数据
            params: {
              pageSize: page.size,
              pageNumber: page.num,
              isPay:0
            },
            headers: {
              'token': localStorage.getItem('token')
            }
          }).then((res) => {
            let arr = res.data.data.list;
            if (page.num === 1) this.list = [];// 如果是第一页需手动制空列表
            this.list =this.list.concat(arr);// 把请求到的数据添加到列表
            this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
              mescroll.endSuccess(arr.length)
            })
          })
        }else if(this.areaId==1){
          this.$axios.get('/api/v2/orderList', {
            params: {
              pageSize: page.size,
              pageNumber: page.num,
              isPay:1
            },
            headers: {
              'token': localStorage.getItem('token')
            }
          }).then((res) => {
            let arr = res.data.data.list;
            if (page.num === 1) this.list = [];
            this.list =this.list.concat(arr);
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          })
        }else{
          this.$axios.get('/api/v2/orderList', {
            params: {
              pageSize: page.size,
              pageNumber: page.num,
              isPay:3
            },
            headers: {
              'token': localStorage.getItem('token')
            }
          }).then((res) => {
            let arr = res.data.data.list;
            if (page.num === 1) this.list = [];
            this.list =this.list.concat(arr);
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          })
        }
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .mescroll {
    position: fixed;
    top: 88px;
    left: 0;
    height: auto;
    bottom:0;
  }
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
    padding:88px 15px 0;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .tabs{
    position:fixed;
    top: 44px;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  h4>span:last-child{
    border:1px solid #5EE2C6;
    padding:0 8px;
    color:#5EE2C6;
    display:block;
    height: 24px;
    border-radius:12px;
    line-height: 24px;
  }
  .alreadyHid{
    border:none!important;
    padding:0 8px;
    color:#ccc!important;
    display:block;
    height: 24px;
    border-radius:12px;
    line-height: 24px;
  }
  .specil{
    border:1px solid #ec8b89!important;
    padding:0 8px;
    color:#ec8b89!important;
    display:block;
    height: 24px;
    border-radius:12px;
    line-height: 24px;
  }
  ul.order_list{
    margin:10px 0 0;
    list-style:none;
  }
  .order_list li{
    width: 92%;
    height: 120px;
    margin:0 auto;
    background: #fff;
    border-radius:4px;
    overflow:hidden;
    padding:5px 10px;
    margin-bottom:20px;
    box-shadow:0 0 5px #EAEAEA;
  }
  .order_list li .left_img{
    width: 60px;
    height: 80px;
    overflow: hidden;
  }
  .left_img img{
    width: 100%;
    height: 100%;
  }
  .both_lr{
    width: 100%;
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
  }
  .right_contain{
    margin-left:10px;
  }
  .right_contain p{
    font-size: 12px;
    color:#989898;
  }
  h4{
    font-size: 14px;
    margin-bottom:5px;
    font-weight: 500;
    width: 100%;
    display:flex;
    color:#333;
    justify-content:space-between;
    align-items:center;
  }
  h4>span:last-child{
    font-weight: normal;
    color:#5EE2C6;
    font-size: 12px;
  }
  h3{
    font-size: 14px;
  }
  .head{
    position:fixed!important;
  }
</style>

