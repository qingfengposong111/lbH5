<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">爆料圈</p>
    </c-head>
    <div class="tabs" style="">
      <tab :line-width="1" custom-bar-width="50%"  @on-before-index-change="switchTabItem" id="father">
        <tab-item selected class="vux-1px-l" title="2" @on-item-click="getList(2)">已审核</tab-item>
        <tab-item class="vux-1px-l" title="1" @on-item-click="getList(1)">未审核</tab-item>
      </tab>
    </div>
    <div class="act-main" id="actMain">
      <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div style="margin-top:50px;">
          <slider v-for="(self,index) in lists" :key="index"   :index="self.id" @deleteItem="deleteItem">
            <router-link tag="div" :to="'tipdetail/'+self.id" class="temp">
              <div class="tmain">
                <div class="img"><img :src="self.urls[0]" alt=""></div>
                <div class="title">{{self.title}}</div>
              </div>
              <div class="bot" v-if="self.status==2">
                <div><span>点击量：</span><span class="color">{{self.hits}}</span></div>
                <div><span>佣金：</span><span class="color">{{self.commission | yuan}}元</span></div>
                <div><span class="color width">{{self.createTime | formatDate}}</span><span>发布</span></div>
              </div>
              <div class="lower" v-if="self.status!=2">
                <div><span>状态：</span><span class="color" v-if="self.status==1">未审核</span><span class="colors" v-if="self.status==0">审核失败</span></div>
                <div><span class="color">{{self.updateTime | formatDate}}</span><span>更新</span></div>
              </div>
            </router-link>
          </slider>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import slider from ".././components/slider"
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    components:{
      'slider':slider,
      MescrollVue
    },
    props:{},
    data(){
      return {
        show:false,
        lists: [], // 下拉更新数据存放数组
        type:2,
        mescroll: null,
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
      this.getList(2);

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
      turnUp: function() {
        this.$router.push('/tipoff');
      },
      deleteItem: function (index) {
        this.$axios.post('/api/v2/deleteExpose',{
          exposeId:index+''
        },{
          headers:{
            'token':localStorage.token
          }
        })
          .then(res=>{
            let father = document.getElementsByClassName('vux-tab-item');
            let only;
            for(let i=0;i<father.length;i++){
              if(father[i].className==='vux-tab-item vux-1px-l vux-tab-selected'){
                only = father[i].getAttribute('title');
                if(only==1){
                  this.lists.splice(index, 1);
                  this.getList(only);
                }

              }
            }

          })
        this.getList(only);
      },
      getList(status){//刷新加载
        let that = this;
        that.type = status;
        if(localStorage.token){
          this.$axios.get('/api/v2/myExpose',{
            params:{
              status:status
            },
            headers:{
              'token':localStorage.token
            }
          })
            .then(res=>{
              if(res.data.code==1){
                this.lists = res.data.data.list.slice(0,5);
              }
            })
            .catch(err=>{
              if(err.response.status===401){
                this.$vux.loading.show({
                  text: '登录超时，请重新登录'
                });
                setTimeout(() => {
                  that.$vux.loading.hide();
                  that.$router.push({name:'login',query:{redirect:'/tiplist'}});
                }, 1000)
              }
            })
        }

      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        if(this.type==1){
          this.$axios.get('/api/v2/myExpose', {// 请求的列表数据
            params: {
              pageSize: page.size,
              pageNumber: page.num,
              status:1
            },
            headers: {
              'token': localStorage.getItem('token')
            }
          }).then((res) => {
            let arr = res.data.data.list;
            if (page.num === 1) this.lists = [];// 如果是第一页需手动制空列表
            this.lists =this.lists.concat(arr);// 把请求到的数据添加到列表
            this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
              mescroll.endSuccess(arr.length)
            })
          })
        }else if(this.type==2){
          this.$axios.get('/api/v2/myExpose', {
            params: {
              pageSize: page.size,
              pageNumber: page.num,
              status:2
            },
            headers: {
              'token': localStorage.getItem('token')
            }
          }).then((res) => {
            let arr = res.data.data.list;
            if (page.num === 1) this.lists = [];
            this.lists =this.lists.concat(arr);
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          })
        }

      },
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
    padding:88px 0 0;
    width: 92%;
    margin:0 auto;
  }
  .head{
    position:fixed!important;
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
  .img{
    width: 60px!important;
    height: 60px!important;
    margin-right:15px;
  }
  .img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .temp{
    background: #fff;
    width: 100%;
    margin-top:12px;
    box-shadow:0 2px 2px #eee;
    padding:10px 16px 0;

  }
  .tmain{
    width: 100%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    padding:0 0 10px 0;
  }
  .title{
    width: 74%;
    color:#666;
    font-size: 14px;
  }
  .bot,.lower{
    width: 100%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    padding:10px 0;
    border-top:1px solid #eee;
  }
  .bot>div{
    width: 33.3%;
    font-size: 12px;
    color:#666;
    text-align: center;
  }
  .bot>div:nth-child(2){
    border-left:1px solid #eee;
    border-right:1px solid #eee;
  }
  .color{
    color:#A1FED6;
  }
  .colors{
    color:#FD4041;
  }
  .bot>div span:first-child,.lower>div span:first-child{
    margin-right:5px;
  }
  .lower>div:first-child{
    border-right:1px solid #eee;
  }
  .lower>div{
    width: 50%;
    font-size: 12px;
    color:#666;
    text-align: center;
  }
  /*.load-more{
    display:none!important;
  }*/
</style>
