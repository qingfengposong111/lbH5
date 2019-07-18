<template>
   <div class="banner-nav">
      <div class="ban swiper-container">
          <div class="swiper-wrapper">
              <div class='swiper-slide slide'  v-for='(temp,index) in info' :key="index">
                  <img :src="temp.imgUrl">
              </div>
          </div>
      </div>
      <slot></slot>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  components:{
  },
  props:{type:Number},
  data(){
    return {
      info:[]
    }
  },
  watch:{},
  computed:{

  },
  methods:{
    initSwiper() {
				let mySwiper = new Swiper('.swiper-container', {
					speed: 2000, //过度时间
          loop: true,
          autoplay:true,
          effect : 'coverflow',
          slidesPerView: 3,
          centeredSlides: true,
          coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 2 ,
            slideShadows:false
          }
				})
    },
  },
  created(){
      this.$axios.get(this.$api.activity.getAdvImg,{
        params:{
          id: 0,
          type: this.type
        }
      })
      .then(res =>{
        let len = res.data.data.length;
        /*console.log(res);*/
        for(let i=0; i < len;i++){
          this.info.push(res.data.data[i]);
        }
      this.$nextTick(() => {
        this.initSwiper() //swiper初始化
      })
      })
      .catch(err =>{
      })
  },
  mounted(){
  }
}
</script>
<style lang="less" scoped>
// 轮播样式
.banner-nav {
  background: #fff;
  padding-top: 1rem;
  padding-bottom: 0.6875rem;
  width: 100%;
  overflow:hidden;
}
.ban {
  width: 240%;
  height: 10rem;
  margin-left:-70%;
  overflow: hidden;
  position: relative;
  background: #fff;
  padding-bottom: 0.625rem;
}
.slide {
  width: 100%;
  height: 9.375rem;
  display: block;
  float: left;
  background: #f4f4f2;
  border-radius: 0.2rem;
  box-shadow: 0 1px 3px #5EE2C6;
  transform: scale(0.93);
  -webkit-transform: scale(0.93);
  -moz-transform: scale(0.93);
  -o-transform: scale(0.93);
  -ms-transform: scale(0.93);
}
.slide img {
  width: 100%;
  height: 9.375rem;
  display: block;
  border-radius: 0.2rem;
}

</style>
