<template>
  <view-box ref="viewBox">
      <router-view></router-view>
    <!-- 底部选项卡 -->
    <tabbar slot="bottom" @on-index-change="onIndexChange" v-if="tabbarShow">
      <tabbar-item :selected="$route.path==='/home'" link="/home">
        <img slot="icon" src="/static/index.png">
        <img slot="icon-active"  src="/static/tad_Home_pre.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path==='/school'" link="/school">
        <img slot="icon" src="/static/school.png">
        <img slot="icon-active"  src="/static/tad_school_pre.png">
        <span slot="label">学校</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path==='/home/found'" link="/home/found">
        <img slot="icon" src="/static/find.png">
        <img slot="icon-active"  src="/static/tad_found_pre.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path==='/mine'" link="/mine">
        <img slot="icon" src="/static/my.png">
        <img slot="icon-active"  src="/static/tad_my_pre.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<style lang="less" scoped>
.weui-tabbar:before{
  border-top-color: #5EE2C6;
  box-shadow: 0 0 3px #5EE2C6;
}
</style>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
 components:{
    },
    data() {
      return {
        tabbarShow:true,
        tabList:[
          { link:'/home',src:'/static/index.png',acSrc:'/static/tad_Home_pre.png',title:'首页'},
          { link:'/school',src:'/static/school.png',acSrc:'/static/tad_school_pre.png',title:'学校'},
          { link:'/find',src:'/static/find.png',acSrc:'/static/tad_found_pre.png',title:'发现'},
          { link:'/mine',src:'/static/my.png',acSrc:'/static/tad_my_pre.png',title:'我的'},
        ]
      }
    },
    // 计算属性
    computed:{
      select(){
        return this.$store.state.tab_sel;
      },
      getCityid () {
        return this.$store.state.cityId;
      }
    },
    watch: {
      $route(to,from) {
        /*console.log(to.path);*/
      }
    },
    methods: {
      onIndexChange (newIndex, oldIndex) {
      }
    }
}
</script>
