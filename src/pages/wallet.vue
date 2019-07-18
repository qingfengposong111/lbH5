<template>
  <div class="home-act">
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title'>我的钱包</p>
    </c-head>
    <div class="act-main">
      <v-scroller  style="background: #fff;" :on-refresh="onRefresh" :on-infinite="onInfinite">
        <div>
          <div class="ban">
            <div class="til">余额</div>
            <div class="money">
              <div><span>￥</span><span style="font-size: 30px;margin-right:5px;">{{balance | yuan}}</span></div>
              <div @click="gowith" style="font-size: 14px;">提现 <span> > </span></div>
            </div>
          </div>
          <!--列表-->
          <div class="list">
            <div class="temp" v-for="(item,index) in lists" :key="index" :id="item.id">
              <div class="up">
                <span class="mode">{{item.title}}</span><span class="cash" :class="{color:item.type==1}">{{item.moneyStr/100}}</span>
              </div>
              <div class="down">
                <span class="way">{{item.remark}}</span><span class="time">{{item.datetime}}</span>
              </div>
            </div>
          </div>
        </div>
      </v-scroller>
    </div>
  </div>
</template>

<script>
  import scroller from '../components/loadMore'
  export default {
    components:{
      'v-scroller':scroller
    },
    props:{},
    data(){
      return {
        balance:'',
        counter : 1, //默认已经显示出5条数据 count等于一是让从6条开始加载
        num : 10,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        lists: [], // 下拉更新数据存放数组
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
        let s = data.getSeconds();
        MM = MM < 10 ? ('0' + MM) : MM;
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        s = s < 10 ? ('0' + s) : s;
        return YY + '-' +MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    created(){
      let that = this;
      if(localStorage.token){
        this.$axios.get('/api/v2/showPersonInfo',{
          headers:{
            'token':localStorage.token
          }
        }).then( res =>{
          this.balance = res.data.data.balance;
        }).catch(err =>{
          /*this.$vux.loading.show({
            text: '登录超时，请重新登录'
          });
          setTimeout(() => {
            this.$vux.loading.hide();
            that.$router.push({name:'login',query:{redirect:'/mine/wallet'}});
          }, 1000)*/
        });
      }else{
        this.$vux.loading.show({
          text: '请登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          that.$router.push({name:'login',query:{redirect:'/mine/wallet'}});
        }, 1000)
      }

    },
    watch:{},
    computed:{},
    methods:{
      turnUp:function(){
        this.$router.go(-1);
      },
      gowith: function (){
          this.$router.push('/mine/withdrawal')
      },
      getList(){//刷新加载
        this.$axios.get('/api/v2/billRecord',{
          headers:{
            'token':localStorage.token
          }
        })
          .then(res=>{
            if(res.data.code==1){
              this.lists = res.data.data.list.slice(0,10);
            }
          })
      },
      onRefresh(done) {
        this.getList();
        setTimeout(function(){
            done()
        },100)
      },
      onInfinite(done) {
        this.$axios.get('/api/v2/billRecord',{
          headers: {
            'token': localStorage.token
          }
        })
          .then(res =>{
            this.counter++;
            this.pageEnd = this.num * this.counter;
            this.pageStart = this.pageEnd - this.num;
            let as = res.data.data.list;
            let k = this.pageStart;
            let end = this.pageEnd;
            for(k; k<end; k++){
              let obj ={};
              obj= as[k];
              this.lists.push(obj);
              if((k + 1) >= res.data.data.list.length){
                this.$el.querySelector('.load-more').style.display = 'none';
                return;
              }
            }
            done()
          })
          .catch(err =>{
          });
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>
<style lang="less" scoped>
  body,html{
    width:100%;
    height:100%;
    position:relative;
  }
  .head{
    position:fixed!important;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .home-act{
    background: #FAFAFA;
    width: 100%;
    height: 100%;
  }
  .user-title{
    font-size:18px;
    color:#fff;
    text-align: center;
  }
  .ban{
    color:#fff;
    width: 92%;
    height: 140px;
    background: linear-gradient(#A1FED6, #13C3B5);
    margin:10px auto 10px;
    border-radius:6px;
  }
  .til{
    width: 100%;
    padding:15px;
  }
  .money{
    width: 100%;
    display:flex;
    padding:20px 15px;
    justify-content: space-between;
    align-items:center;
  }
  .list{
    width: 100%;
  }
  .temp{
    width: 100%;
    padding:17px 20px 20px;
    background: #fff;
  }
  .temp+.temp{
    border-top:15px solid #F6F6F6;
  }
  .up,.down{
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .up{
    margin-bottom:10px;
  }
  .mode{
    color:#666;
    font-size: 18px;
  }
  .cash{
    color:#53BEFB;
    font-size: 16px;
  }
  .way,.time{
    font-size: 14px;
    color:#999;
  }
  .color{
    color:#FB5353;
  }
    .act-main{
      padding:44px 0 0;
      width: 100%;
      height:100%;
      margin:0 auto;
      position:absolute;
      top:0;
      left:0
    }

</style>
