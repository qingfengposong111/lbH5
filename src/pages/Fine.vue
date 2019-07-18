<template>
  <div class="fine">
      <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title">优秀机构</div>
    </c-head>
    <div class="fine-banner">
      <swiper auto height="200px">
        <swiper-item class="black" height="200px"   v-for="(self,index) in banimgs" :key="index">
          <h2 class="title fadeInUp animated" style="height: 200px;"><img height="200" :src="self.imgUrl" alt=""></h2>
        </swiper-item>
      </swiper>
    </div>
    <div class="popular">
        <p>热门推荐</p>
    </div>
    <div>
        <div class="fine-panel fine-panel_access">
            <div class="fine-panel__bd">
                <router-link v-for="(item,a) in list" :key="a" class='fine-media-box fine-media-box_appmsg' :id="item.sId"   :to="'/school/in/'+item.sId" >
                    <div class="fine-media-box__hd">
                        <img :src="item.imgUrl" alt="">
                    </div>
                    <div class="fine-media-box__bd">
                        <h4 class="fine-media-box__title">{{item.name}}</h4>
                        <p class="fine-media-box__desc">{{item.shortProfile}}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
  </div>

</template>

<script>
  //import Swiper from 'swiper'
  //import 'swiper/dist/css/swiper.min.css'
export default {
  components: {},
  props: {},
  data() {
    return {
      type:'',
      list: [],
      banimgs:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    turnUp: function() {
      this.$router.go(-1);
    },
    onImgError(item, $event) {
    }
  },
  created() {
    this.$axios.get('api/v2/hotOrganization')
      .then(res =>{
        this.list = res.data.data;
      })
      .catch(err =>{
      });
    /*轮播图*/
    this.$axios.get('/api/v2/getAdvImg',{
      params: {
        id:'',
        type:6
      }
    })
      .then(res => {
        if(res.data.data.length>0){
          this.banimgs=res.data.data;
        }else{
          this.banimgs=[{id:'', name: null, imgUrl: "https://img.labiyouxue.com/2018/09/39495201809151147045632.jpg", jumpUrl: null}]
        }
      })
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.fine {
  background: #eee;
}
.fine-banner {
  width: 100%;
  height: 200px;
  margin-top:44px;
  background: #000;
}
.fine-banner img {
  width: 100%;
  height: 100%;
}
.popular {
  height: 44px;
  width: 100%;
 /* margin-top: 15px;*/
  background: #fff;
  padding: 0 15px;
  position: relative;
}
.popular:before {
  content: "";
  background: #5EE2C6;
  width: 5px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
}
.popular p {
  line-height: 44px;
  font-size: 18px;
  color: #666666;
}
.fine-panel {
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}
.fine-panel:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.fine-panel:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.fine-media-box:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
}
a.fine-media-box {
  color: #000000;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.fine-media-box_appmsg {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.fine-media-box {
  padding: 10px 15px;
  position: relative;
}
.fine-media-box_appmsg .fine-media-box__hd {
  margin-right: 0.8em;
  width: 75px;
  height: 75px;
  line-height: 44px;
  text-align: center;
}
.fine-media-box__hd img {
  width: 100%;
  height: 100%;
}
.fine-media-box_appmsg .fine-media-box__thumb {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.fine-media-box_appmsg .fine-media-box__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
}
.fine-media-box__title {
  color: #666;
  font-weight: 400;
  font-size: 18px;
  margin-bottom:5px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
}
.fine-media-box__desc {
  color: #989898;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: #ccc;
}
</style>
