<template>
  <div class='home-act' >
    <div class='head'>
      <flexbox :gutter='9.5'>
        <flexbox-item :span="16/125" >
          <div  class="return" @click='turnUp'>
            <img src="/static/btn_return.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item :span="4/5">
          <div @click="goSearch"><c-search placeholder="搜索幼儿园/培训机构/俱乐部等" ></c-search></div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="tabs">
      <tab :line-width="1" custom-bar-width="100px"  @on-before-index-change="switchTabItem">
        <tab-item selected >
          <router-link class="tab-act" :to="'/home/homeSearchMain/TK'"  >{{hole}}<i class='choose-icon'></i>
          </router-link>
        </tab-item>
        <tab-item  class="vux-1px-l">
          <router-link class="tab-act" :to="'/home/homeSearchMain/AllCity'"  >{{Allcity}}<i class='choose-icon'></i>
          </router-link>
        </tab-item>
        <tab-item class="vux-1px-l">
          <router-link class="tab-act" :to="'/home/homeSearchMain/Brain'">{{st}}<i class='choose-icon'></i>
          </router-link>
        </tab-item>
      </tab>
    </div>
    <div class="noLessons" v-if="searchResult==[]">未查询到相关信息！</div>
    <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div>
        <c-panel style='margin-top:88px;' :list="getHomeSearch" @on-img-error="onImgError"></c-panel>
      </div>
    </mescroll-vue>
    <router-view :id="cityId" v-on:sort="sort" v-on:father='father' v-on:dist="dist" v-show="show" @click.native="closeMsg($event)"></router-view>
  </div>
</template>
<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    components: {MescrollVue},
    props:{},
    data(){
      return {
        list: [],
        show: false,
        add:false,
        cfy:'',// 主分类类别id,
        cityId: this.$store.state.cityId,
        hole:'全部',
        searchResult:this.$store.state.homeSearchList,
        Allcity:'全城',
        st:'智能排序',
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 20 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          empty: {//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "", //图标,默认null,支持网络图
            tip: "暂无相关数据~" //提示
          }
        }
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
      }
    },
    watch:{},
    computed:{
      msg () {
        return this.$store.state.user_val
      },
      getHomeSearch () {
        return this.$store.state.homeSearchList;
      },
      getScreen () {
        this.list = this.$store.state.screen;
        return this.$store.state.screen;
      }
    },
    created(){
      this.list = this.$store.state.screen;
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
      dist (rs) {
        this.Allcity = rs
      },
      father (val) {
        this.hole = val;
      },
      sort (st) {
        this.st = st;
      },
      turnUp: function () {
        this.$router.push('/home');
      },
      all (index) {
        this.lists = [];
        if(this.firstClassfity[index]){
          this.lists=this.firstClassfity[index].classifies;
          this.cfy = this.firstClassfity[index].id;
        }
      },
      onImgError(item, $event) {
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
          let arr = this.$store.state.homeSearchList;
          if (page.num === 1) this.list = [];// 如果是第一页需手动制空列表
          this.list =this.list.concat(arr);// 把请求到的数据添加到列表
          this.$store.commit('set_screen',this.list);
          this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
            mescroll.endSuccess(arr.length)
          })
      },
      goSearch: function() {
        this.$router.push("/school/search");
      },
      closeMsg:function(event){
        let btn = document.querySelector(".screen-main");
        if(btn){
          if(!btn.contains(event.target)){
            this.show = false;
          }
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
    top: 0;
    bottom: 0;
    height: auto;
  }
  ul{
    list-style: none;
  }
  .outbox{
    position:fixed;
    top:88px;
    left:0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.3);
  }
  .screen-main{
    display:flex;
    flex:1;
    background: #eee;
  }
  .screen-nav{
    background: #fff;
    width:33.33%;
    display:flex;
    flex-direction: column;
  }
  .vux-tab .vux-tab-item.vux-tab-selected i{
    border-top:4px solid #5EE2C6;
  }
  .screen-nav a{
    text-align: left;
    padding-left:15px;
    height:44px;
    display:block;
    font-size:16px;
    color:#666;
    border-bottom: 1px solid #eee;
    line-height: 44px;
  }
  .screen-box{
    flex:1;
    overflow-y:auto;
    height:300px;
  }
  .screen-con{
    padding-left:10px;
    padding-right:15px;
    border-bottom:1px solid #e5e5e5;
    height:44px;
    line-height: 44px;
    display:block;
  }
  a.nav-active{
    color:#5EE2C6;
    background:#eee;
  }
  .sub-name{
    color:#666;
    font-size: 16px;
  }
  .sub-num{
    text-align: right;
    font-size:12px;
    color:#989898;
  }
  .choose-icon{
    display:inline-block;
    width:0px;
    height:0px;
    border:4px solid transparent;
    border-top:4px solid #989898;
    margin-left:4px;
  }
  .active{
    border-top-color:#5EE2C6;
  }

  .tost{
    width: 100%;
    height: 100%;
    position:fixed;
    left:0;
    top:88px;
    z-index:1000;
    background: rgba(0,0,0,.3);
  }
  .tost-main{
    width: 100%;
    height: 60%;
    display:flex;
    justify-content: flex-start;
    background: #eee;
  }
  .left{
    width: 33%;
    background: #fff;
  }
  .all_t{
    width: 100%;
    height: 100%;
    position:fixed;
    top:88px;
    left:0;
    background: rgba(0,0,0,.5);
    z-index:1000;
  }
  .all_t>div{
    display:flex;
  }
  .left ul>li{
    border-bottom:1px solid #eee;
    padding: 10px;
    background: #fff;
  }
  .right{
    width: 67%;
  }
  .home-act{
    background: #fff;
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
  a.weui-media-box {
    color: #000000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .weui-media-box_appmsg {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .tabs{
    margin-top: 44px;
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .cur{
    background: #eee!important;
    color:#5EE2C6;
  }
  .noLessons{
    width: 100%;
    text-align: center;
    padding-top:60%;
    color:#333;
  }
</style>
