<template>
  <div class="location">
      <div class='head'>
        <flexbox :gutter='9.5'>
            <flexbox-item :span="16/125" >
            <div  class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
            </flexbox-item>
            <flexbox-item :span="4/5">
                <div @click="goSearch"><c-search placeholder="城市/拼音" ></c-search></div>
            </flexbox-item>
        </flexbox>
      </div>
    <scroller style="flex-grow: 1" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
              use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
              lock-x ref="scrollerBottom" height="-44">

    <div>
      <div>

        <group :gutter='44'>
          <cell>
            <p slot='title' class='now-city'>当前：{{nowCity}}</p>
            <!--<div slot>
                <div  @click="chooseArea" class='choose-area'>选择区镇 <i class='choose-icon'></i></div>
            </div>-->
          </cell>
        </group>
        <group :gutter='0' v-if="show">
          <cell v-for="(item,a) in area " :key="a"    @click.native="onClick">
            <p slot='title' class='area'>{{item}}</p>
          </cell>
        </group>
      </div>
      <div class="main-box">
        <div class="location-main">
          <div class="location-show">
            <p>定位/最近访问</p>
            <div>
              <div style="display:flex;justify-content: flex-start;color:#888;">
                <flexbox :gutter="0" style="width:100px; height:30px;background: #fff;border-radius: 3px;">
                  <flexbox-item :span='2/5'><div style='height:44px; padding-top:11px;padding-left:15px;' ><div class="location-icon" ><img src="/static/icon_positioning.png" alt=""></div></div></flexbox-item>
                  <flexbox-item :span='3/5'><p>{{local}}</p></flexbox-item>
                </flexbox>
                <flexbox class="near" :gutter="0" v-for="(temps,ts) in searchList" :key="ts" @click.native="gohome(temps)">
                  <flexbox-item ><p>{{temps.name}}</p></flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </div>
        <div class="location-list">
          <group v-for="(item, b) in areaList" :key="b"  :title="item.tag" :id="item.tag" title-color="#5EE2C6" style="padding:10px 0;">
            <cell style="font-size: 14px;color:#888;" v-for="(itemC,rs) in item.cities " :key="rs" :title="itemC.name"  @click.native="choseCity(itemC.name,itemC.id)"></cell>
          </group>
        </div>

      </div>
    </div>
    </scroller>
    <div class='Letter-box'>
      <p class="hot">定位</p>
      <p class='hot' v-for="(item,c) in LetterList" :key='c' @click="jump($event,c)">{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        LetterList:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',''],
        cityList:[],
        areaList:[],
        show:false,
        nowCity:localStorage.selectCityName||localStorage.itself,
        local: localStorage.itself,
        current:{},
        searchList: [],
      pullupDefaultConfig: {
        content: '上拉加载更多',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      pulldownDefaultConfig: {
        content: '下拉刷新',
        height: 40,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放后刷新',
        loadingContent: '正在刷新...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      scrollerStatus: {
        pullupStatus: 'default'
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    turnUp:function(){
      this.$router.go(-1);
    },
    chooseArea:function(){
        this.show=!this.show;
    },
    goSearch:function(){
         this.$router.push('/home/location/search')
    },
    gohome (item) {
      this.$store.commit('set_selectCityName',item);
      this.$router.push('/home');
    },
    choseCity (item,id){
      this.$router.push('/home');
      this.current = item;
      item = item.slice(0,3);
      /*this.$store.commit('set_selectCityName',item);
      this.$store.commit('set_selectCityId',item.id);*/
      localStorage.selectCityName = item;
      localStorage.selectCityId = id;
      this.current = {name:item,id:id};
      this.searchList.push(this.current);
    },
    //索引跳转
    jump (e,index) {
        location.href='#'+this.areaList[index].tag;
    },
    address (cb) {
      this.$axios.get('/api/v2/getYxwRegionInfo').then(res =>{
        this.$nextTick(() =>{
          this.areaList = res.data.data;
          this.$refs.scrollerBottom.reset()
        });
        cb(res.data.data)
      })
    },
    refresh() {
      this.address(data => {
        this.areaList = data.list;
        this.$refs.scrollerBottom.enablePullup();
        this.$refs.scrollerBottom.donePulldown();
      })
    },
    loadMore() {
      this.address(data => {
        if (this.areaList.length >= 5) {
          this.$refs.scrollerBottom.disablePullup()
        }
        this.areaList = this.areaList.concat(data.list);
        this.$refs.scrollerBottom.donePullup();
      })
    }
    },
  created(){
    localStorage.setItem('searchList',JSON.stringify(this.searchList));
    this.searchList=JSON.parse(localStorage.getItem('searchList'));
    localStorage.setItem('searchList',JSON.stringify(this.searchList))

  },
  updated(){

  },

  mounted(){

    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
    this.loadMore()
  }
}
</script>
<style lang="less" scoped>
  .head{
    position:fixed;
    left:0;
    top:0;
    width: 100%;
    z-index: 100;
  }
.weui-cell:before{
    right:15px;
}
.weui-cells__title:after{
    content: " ";
    position: absolute;
    bottom: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right:15px;
}
.location{
    background: #F5F5F5;
}
.choose-area{
    color:#989898;
    font-size:12px;
}
.choose-icon{
    display:inline-block;
    width:0px;
    height:0px;
    border:4px solid transparent;
    border-top:4px solid #5EE2C6;
    vertical-align: middle;
}
.now-city{
    color:#888;
    font-size:14px;
}
.main-box{
    position:relative;
}
.hot{
    text-align: center;
    font-size:12px;
    color:#5EE2C6;
    width:30px;
    line-height:16px;
}
.Letter-box{
    position: fixed;
    top:88px;
    right:10px;
}
.location-show{
    padding:0px 15px 15px;
}
.location-show>p{
    font-size:14px;
    color:#888;
    line-height: 44px;
}
.location-box{
    width:100px;
    height:44px;
    background: #fff;
    border-radius: 3px;
}
.location-icon{
    width:15px;
    height:15px;
}
.location-icon img{
    width:100%;
    height:100%;
}
.location-box p{
    line-height: 44px;
    font-size:14px;
    color:#666;
}
.location-box>p{
    text-align: center;
}
.area{
    font-size:12px;
    color:#666;
}
  .near{
    width:80px;
    height:30px;
    background: #fff;
    border-radius: 3px;
    margin-left:5px;
    text-align: center;
  }
  .weui-cells>div{
    margin-right:30px;
  }
</style>
