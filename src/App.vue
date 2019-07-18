<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
   let self = this;
    return {
      positions: {
       lng: '',
       lat: '',
       address: '',
       loaded: false
     },
     plugin: [{
       pName: 'Geolocation',
       events: {
         init(o) {
           // o 是高德地图定位插件实例
           o.getCurrentPosition((status, result) => {
             if (result && result.position) {
               self.str = result.formattedAddress;
               self.positions.address = self.str.substring(self.str.indexOf('省') + 1,self.str.indexOf('市'));
               self.positions.lng = result.position.lng;
               self.positions.lat = result.position.lat;
               self.positions.loaded = true;
               self.$nextTick();
               // 把获取的数据提交到 store 的数据中，以便其他单文件组件使用
               self.$store.commit('POSITION', self.positions);
               sessionStorage.setItem('id', JSON.stringify(self.positions));
             }
           });
         }
       }
     }]
    };
  },
   watch:{
      $route(to,from){
        if(to.path == '/'){
          this.$store.dispatch('set_tab_sel',0);
        }
        if(to.path == '/home'){
          this.$store.dispatch('set_tab_sel',0);
        }
        if(to.path == '/school'){
          this.$store.dispatch('set_tab_sel',1);
        }
        if(to.path == '/find'){
          this.$store.dispatch('set_tab_sel',2);
        }
        if(to.path == '/mine'){
          this.$store.dispatch('set_tab_sel',3);
        }
      }
    }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
// @import '~vux/src/styles/weui/weui.less';
@import "~vux/src/styles/1px.less";
* {
  box-sizing: border-box;
}
*{
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
body {
  background-color: #fbf9fe;
}
#app {
  height: 100%;
  background: #fff;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.head {
  height: 44px;
  padding: 8px 0 8px;
  background: linear-gradient(#A1FED6, #13C3B5);
}
.return{
  width:25px;
  height:25px;
  margin-left:15px;
}
.filter{
  width:25px;
  height:25px;
}
.return img,.filter img{
  width:100%;
  height:100%;
}
.head-title{
  color:#fff;
  font-size: 18px;
  text-align: center;
}
 .sup-phone{
    display:flex;
    text-align: center;
  align-items: center;
    justify-content:center;
}
.phone-icon{
    width:16px;
    height:100%;
    text-align: center;
    vertical-align:middle;
    margin-right:3px;
}
.phone-icon img{
    width:100%;
    height:100%;
    vertical-align: middle
}
.phone-icon span{height: 100%;vertical-align: middle;display: inline-block}
.sup-foot{
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -1px 3px #5ee2c6;
  z-index: 1000;
}
.sup-foot a{
    height:49px;
    background:#fff;
    color:#5EE2C6;
    text-align: center;
    display:block;
}
.sup-foot a>div{
    height:100%;
}
.sup-foot a:not(:first-child){
    border-left:1px solid #eee;
}
.sup-foot p{
    line-height: 49px;
}
a.active{
    background:#5EE2C6;
    color:#fff;
}
.tab-act{
    color:inherit;
    display:block;
    width:100%;
    height:100%;
}
p.sup-title{
  text-align: left;
  font-size:16px;
  color:#666;
  margin-bottom:15px;
}
.weui-cells:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border:none!important;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.amap-marker-label{
  position: absolute;
  z-index: 2;
  color:#666;
  border-color:#fff;
  border-radius:4px;
  background-color: white;
  white-space: nowrap;
  cursor: default;
  padding:10px 5px;
  font-size: 12px;
  line-height: 14px;
}
.amap-marker-label>p:first-child{
  padding-bottom:10px;
  color:#333;
  font-size: 14px;
}
  .weui-media-box__thumb{
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
.weui-media-box__bd{
  height: 60px;
}
  .weui-media-box__desc{
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-top:10px;
    display: block!important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1!important;
  }
.pay .weui-cell__ft{
  width: 20px;
  border: 1px solid #eee;
  border-radius: 50%;
  height: 20px;
}
  .pay .weui-icon-checked{
    position: relative;
    top: -4px;
    left: -8px;
  }
</style>
