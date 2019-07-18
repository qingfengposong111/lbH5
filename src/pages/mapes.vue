<template>
  <div class="mapes">
    <div class='head'>
      <flexbox :gutter='0'>
        <flexbox-item :span="1/5" >
          <div  class="return" >
            <img @click="turnUp" src="/static/btn_return.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item :span="3/5">
          <p class="head-title t1" >位置</p>
        </flexbox-item>
        <flexbox-item :span="1/5">
          <p class="head-title" @click="goThere" >导航</p>
        </flexbox-item>
      </flexbox>
    </div>
    <div id="container"></div>
    <!--导航-->
    <div class="route" v-show="show" @click="closeMsg($event)">
      <div class="route-main">
        <div>
          <p ><a :href="hf">高德地图</a></p>
          <p><a :href="bd">百度地图</a></p>
          <!--<p  ><a :href="bd">百度地图</a></p>-->
        </div>
        <p @click="cancel">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapes",
  data () {
    return {
      back:localStorage.asid,
      show:false,
      hf:null,
      bd:null
    }
  },
  mounted() {
    this.goMap();
  },
  computed: {
    map_val () {
      return this.$store.state.map_val
    },
    getM () {
      return this.$store.state.lltude
    }
  },
  created () {

    this.anOrApple();
  },
  methods: {
      anOrApple(){
        let u = navigator.userAgent;
        let that=this.$store.state.map_val;
        let center= this.$store.state.lltude;
        this.bd='baidumap://map/show?zoom=18&center='+localStorage.lat1+','+localStorage.lng1+'&content='+localStorage.addrs+'&src=ios.youxue.lbyx';
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          //安卓手机
          this.hf='androidamap://navi?sourceApplication=lbyx&&poiname='+localStorage.addrs+'&poiid=BGVIS&lat='+localStorage.lat1+'&lon='+localStorage.lng1+'&dev=1&style=2';

        } else if (u.indexOf('iPhone') > -1) {
          //苹果手机
          this.hf='iosamap://navi?sourceApplication=lbyx&poiname='+localStorage.addrs+'&poiid=BGVIS&lat='+localStorage.lat1+'&lon='+localStorage.lng1+'&dev=1&style=2';
          /*this.bd='baidumap://map/direction?origin='+center[0]+','+center[1]+'&destination='+that[1]+'&mode=driving&coord_type=gcj02&src=ios.youxue.lbyx';*/
        }
      },

    turnUp(){
      this.$router.go('-1');
    },
    goMap() {
      let that=this.$store.state.map_val;
      let center= this.$store.state.lltude;
      let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10,
        center:[localStorage.lat1,localStorage.lng1]
      });

      map.plugin('AMap.Geocoder', function() {
        let geocoder = new AMap.Geocoder({
          city: [localStorage.lat1,localStorage.lng1]
        });
        let marker=new AMap.Marker({
          position: map.getCenter(),
          icon: '',
        });
        marker.setMap(map);

        // 设置label标签
        marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
          offset: new AMap.Pixel(-150, -70),//修改label相对于maker的位置
          content: '<p>'+localStorage.mname+'</p><p>'+localStorage.addrs+'</p>'
        });
        marker.on('click',function(e){
          marker.markOnAMAP({
            name:localStorage.addrs,
            position:marker.getPosition()
          })
        });
        map.add(marker);
        geocoder.getLocation(localStorage.addrs, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            marker.setPosition(result.geocodes[0].location);
            map.setFitView(marker);
          }
        })
      })
    },
    goThere () {
      this.show = !this.show;
    },
    cancel () {
      this.show = false;
    },

    closeMsg:function(event){
      let btn = document.querySelector(".route-main");
      if(btn){
        if(!btn.contains(event.target)){
          this.show = false;
        }
      }
    }
  }
}
</script>

<style scoped>
  .amap-marker-label{
    width:300px;
    border:none!important;
  }
#container{
  width: 100%;
  height: 92%;
  position:absolute;
  left:0;
  top:44px;
}
.amap-logo,.amap-copyright{
  display:none!important;
}
.nav-map{
  text-align:right;
  box-sizing:border-box;
  padding-right:1rem;
  color:#fff;
}
.head{
  position:fixed;
  top:0;
  left:0;
  width:100%;
}
#map-zoom, #map-center {
  color: #0288d1;
}
  .route{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,.3);
    z-index:10000;
  }
  .route-main{
    width: 80%;
    height: 100px;
    position:absolute;
    left:10%;
    bottom:10%;
  }
  .route-main p{
    height: 44px;
    width: 100%;
    background: #fff;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    box-sizing:border-box;
  }
  .route-main div{
    margin-bottom:10px;
    border-radius:5px;
    overflow:hidden;
  }
  .route-main div>p:first-child{
    border-bottom:1px solid #eee;
  }
  .route-main>p{
    border-radius:5px;
    overflow:hidden;
  }
  .route-main a{
    display:block;
    width:100%;
    height:100%;
    color:#000;
  }
</style>
