<template>
  <div class="act-detail" >
    <div class='head' :class="{addColor:fs}">
      <flexbox :gutter='0'>
        <flexbox-item :span="1/5" >
          <div  class="return" @click='turnUp'>
            <img src="/static/btn_return.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item :span="3/5">
          <p class="head-title">{{detailList.name}}</p>
        </flexbox-item>
        <flexbox-item :span="1/5">
          <flexbox :gutter='10'>
            <flexbox-item :span='1/3'><div class="detial-star" @click='collection'>
              <img :src="save" alt="">
            </div></flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
    <div style="padding-top:44px;">
      <div class="act-banner">
        <swiper auto height="200px">
          <swiper-item class="black" height="200px"   v-for="(self,index1) in banimgs" :key="index1">
            <h2 class="title fadeInUp animated" style="height: 200px;"><img height="200" :src="self.imgUrl" alt=""></h2>
          </swiper-item>
        </swiper>
      </div>
      <group :gutter="0" class="act-foot">
        <cell >
          <h4  slot='title' class="act-title">{{detailList.name}}</h4>
          <div slot='title'  class='sch-star'>
            <rater  v-model="detailList.score" disabled :min="3" :font-size="16" :margin='0' ></rater> <span class="score"> {{detailList.score}}分</span>
          </div>
        </cell>
        <cell is-link @click.native="goMap">
          <p slot='title' class="link-title" style="color:#555;">{{detailList.addr}}</p>
          <p slot='title' class="link-distance" style="color:#666;">{{detailList.addrExplain}}</p>
          <img slot="icon" width="16" style="display:block;margin-right:5px;" src="/static/icon_grey_positioning.png">
        </cell>
        <cell >
          <p slot='title' class="link-title" style="color:#888;">{{detailList.consultPhone}}</p>
          <img slot="icon" width="16" style="display:block;margin-right:5px;" src="/static/icon_grey_phone.png">
        </cell>
      </group>
      <router-link :to="'/school/intro/'+detailList.sId" class="popular">
        <flexbox>
          <flexbox-item>
            <p>校园简介</p>
          </flexbox-item>
          <flexbox-item>
            <div class="more">
              <!-- <router-link to='/home/popular'> -->
              <x-icon type="ios-arrow-forward" size="20"></x-icon>
              <!-- </router-link> -->
            </div>
          </flexbox-item>
        </flexbox>
      </router-link>
      <div class="act-support" v-if="detailList.picList!=''">
        <flexbox>
          <flexbox-item>
            <p class="sc-into">校园风采</p>
          </flexbox-item>
          <flexbox-item>
            <div class="more">
              <router-link :to="'/school/scenery/'+detailList.sId">
                <span>查看更多</span><x-icon type="ios-arrow-forward" size="20"></x-icon>
              </router-link>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter='15'>
          <flexbox-item v-if='index<2' v-for='(item,index) in detailList.picList' :key='index'>
            <div class="into-img"><img :src="item.imgUrl" alt=""></div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class='teach-into' v-show="len>0">
        <p>师资介绍</p>
          <div class="ban swiper-container">
            <div class="swiper-wrapper">
              <div class='swiper-slide slide' v-for='(item,index2) in detailList.teacherList' :key='index2'>
                <div class="into-img"><img :src="item.imgUrl" alt=""></div>
                <p style='font-size:12px;'>{{item.name}}</p>
                <p style='font-size:9px;'>{{item.workAge}}年教龄</p>
              </div>
            </div>
          </div>
      </div>
      <div class="user-evaluate">
        <div class='user-title'>
          <flexbox>
            <flexbox-item>
              <p>用户评价（{{commentList.length}}）</p>
            </flexbox-item>
            <flexbox-item>
              <div class="more">
                <!-- <router-link to='/home/popular'> -->
                <x-icon type="ios-arrow-forward" size="20"></x-icon>
                <!-- </router-link> -->
              </div>
            </flexbox-item>
          </flexbox>
          <div class='user-score'>
            <flexbox :gutter='0'>
              <flexbox-item>
                <div class='user-score-left'>
                  <p class='user-score-num'>{{detailList.score}}</p>
                  <div class="user-zh">
                    <p>综合评分</p>
                    <rater disabled v-model="detailList.score" :min="3" :font-size="16" :margin='0' ></rater>
                  </div>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class='user-score-right vux-1px-l'>
                  <p>高于{{parseFloat(detailList.aboveRate*100).toFixed(2)}}%同行</p>
                  <p>好评率{{parseFloat(detailList.favorableRate*100).toFixed(2)}}%</p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
      <router-link  :to="'/school/schoolComDetail/'+commTemp.id" class="comment" v-for="(commTemp,commIndex) in commentList" :key="commIndex">
        <div class="com-img">
          <img :src="commTemp.qrcodeImg" alt="">
        </div>
        <div class="com-box">
          <div class='title-box'>
            <div class="com-user">
              <p class="com-name">{{commTemp.nickname}}</p>
              <p class="com-date">{{commTemp.createTime | formatDate}}</p>
            </div>
            <div class="sorce-box">
              <p class='sorce'>打分</p>
              <rater v-model="commTemp.score" disabled :min="3" :font-size="16" :margin='0' ></rater>
            </div>
          </div>
          <div class='com-con'>
            <p :class="{fl:commTemp.active}">{{commTemp.evaluation}}
            </p>
            <p style="text-align:right; padding-right:10px;">{{commTemp.truename}}</p>
          </div>
          <div>
            <router-link v-if="commTemp.evaluation.length>60"  to='' @click.native="viewAll(commIndex)" class="com-all">
              <span v-if="!commTemp.active">全部</span>
              <span v-if="commTemp.active">收起</span>
            </router-link>
            <div class="pic-box">
              <flexbox class="flex-grow" :gutter="5">
                <flexbox-item><div class="com-pic" v-for="(item,index) in commTemp.urls" :span='91/283' :key='index'><img :src="item" alt=""></div></flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </router-link>

    </div>

    <div style="padding-bottom:44px;" v-if="commentList.length>0">
      <group :gutter="0">
        <cell is-link @click.native="showMore">
          <p slot='title' class="look-more">查看更多</p>
          <p class='count'>共{{commentList.length}}条</p>
        </cell>
      </group>
    </div>
    <div class="sup-foot">
      <flexbox :gutter="0">
        <flexbox-item>
          <a :href="'tel:'+detailList.consultPhone" :class="{active: isActive==='1'}">
            <div>
              <div class="sup-phone">
                <div class='phone-icon'  v-if="isActive==='1'"><span></span><img src="/static/icon_whitephoto.png" alt=""></div>
                <div class='phone-icon'  v-if="isActive!=='1'"><span></span><img src="/static/icon_phone.png" alt=""></div>
                <p>电话咨询</p>
              </div>
            </div>
          </a>
        </flexbox-item>
        <flexbox-item>
          <router-link to=""  @click.native="godetail" :class="{ active: isActive==='2'}">
            <div class="vux-1px-l">
              <p>在线报名</p>
            </div>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link to="" @click.native="comment" :class="{ active: isActive==='3'}">
            <div class="vux-1px-l">
              <p>发表评价</p>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <div v-if='isShow' class='popContainer'>
      <div class='mask-box'>
        <div class='mask'>
          <p>分享到</p>
          <div class='share-box'>
            <div v-for='share in shareList' @click="shares(share.id)" :id="share.id">
              <div class='share-img'><img :src="share.src" alt=""></div>
              <div><p>{{share.name}}</p></div>
            </div>
          </div>
          <div class='cancel' @click='cancel'>取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  /*import wx from 'weixin-jsapi'*/
  import wx from 'weixin-js-sdk'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    components: {},
    props: {},
    data() {
      return {
        detailList:[],  //获取教育机构详情数据源
        shareList: [
          { src: "/static/btn_WeChat.png", name: "微信",id:1 },
          { src: "/static/btn_Circle.png", name: "朋友圈",id:2 },
          { src: "/static/btn_qq.png", name: "QQ",id:3 },
          { src: "/static/btn_qqzone.png", name: "QQ空间",id:4 },
          { src: "/static/btn_sina.png", name: "新浪",id:5 }
        ],
        isActive: 1,
        isCollection: false,
        isShow: false,
        save: '/static/btn_hollow_Focus.png',
        type:'',
        names: '',
        addr: '',
        sid:'',
        commentList: [],
        latude:'',
        loogtude: '',
        fs: false,
        reason:'',
        allowEvaluate:'',
        banimgs:[],
        len:''
      };
    },
    watch: {},
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
    computed: {},
    beforeRouteEnter(to, from, next) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS && to.path !==  location.pathname) {
        location.assign(to.fullPath) // 此处不可使用location.replace
      } else {
        next()
      }
    },
    methods: {
      share: function() {
        this.isShow = true;
      },
      showMore () {
        this.$store.commit('set_schoolId',this.$route.params.id);
        this.$router.push('/home/school/SchoolComment/'+this.$route.params.id)
      },
      godetail () {
        if(localStorage.token){
          if(this.detailList.type===1){
            this.$router.push('/school/Enlist/'+this.detailList.sId)
          }else{
            this.$router.push('/school/CourseList/'+this.detailList.sId+'/'+this.loogtude+'/'+this.latude)
          }
        }else{
          this.logs()
        }

      },
      switchTabItem(index) {
        this.$vux.loading.show({
          text: "loading"
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          this.index01 = index;
        }, 1000);
      },
      turnUp: function() {
        this.$router.go('-1');
      },
      comment () {
        if(localStorage.token){
          if(this.allowEvaluate===0){
            this.$router.push('/school/commentDetails/'+this.detailList.sId)
          }else{
            this.$vux.loading.show({
              text: this.reason
            });
            setTimeout(() => {
              this.$vux.loading.hide()
            }, 1000)
          }
        }else{
          this.logs();
        }
      },
      logs () {
        let that = this;
        this.$vux.loading.show({
          text: '请先登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          that.$router.push({name:'login',query:{redirect:'/school/in/'+that.$route.params.id}});
        }, 1000)
      },
      //收藏
      collection () {
        let that = this;
        if(localStorage.token){
          this.$axios.post('/api/v2/collectSchool',{
            sId:this.$route.params.id,
            type:this.type
          },{
            headers: {
              'token': localStorage.getItem("token")
            }
          })
            .then(res =>{
              if(!this.isCollection){
                this.isCollection=true;
                this.save= '/static/btn_solid_Focus.png';
                this.$vux.loading.show({
                  text: '收藏成功'
                });
                setTimeout(() => {
                  this.$vux.loading.hide()
                }, 500)
              }else{
                this.isCollection=false;
                this.save='/static/btn_hollow_Focus.png'
                this.$vux.loading.show({
                  text: '取消收藏成功'
                });
                setTimeout(() => {
                  this.$vux.loading.hide()
                }, 500)
              }
            })
            .catch(err =>{
              /*this.$vux.loading.show({
                text: '登录超时，请重新登录'
              });
              setTimeout(() => {
                this.$vux.loading.hide();
                that.$router.push({name:'login',query:{redirect:'/school/in/'+that.$route.params.id}});
              }, 1000);*/
            })
        }else{
          this.logs()
        }
      },
      cancel: function() {
        this.isShow = false;
      },
      /*地图*/
      goMap () {
        this.$router.push('/mapes');
      },
      /* 获取教育机构详情页（除评论）*/
      getDetail: function() {
        let param={
          id:this.$route.params.id
        }
        this.$axios.get(this.$api.school.showDetail,{
          params:param,
          headers: {'token': localStorage.token || ''}
        }).then((res)=>{
          /*this.shared();*/
          this.len=res.data.data.teacherList.length;
          this.detailList=res.data.data;
          this.reason = res.data.data.reason;
          this.allowEvaluate = res.data.data.allowEvaluate;
          this.isCollection=res.data.data.collected;
          if(!this.isCollection){
            this.save='/static/btn_hollow_Focus.png'
          }else{
            this.save= '/static/btn_solid_Focus.png';
          }
          this.sid = res.data.data.sId;
          this.names=res.data.data.name;
          this.addr=res.data.data.addr;
          this.type= res.data.data.type;
          this.latude = res.data.data.latitude;
          this.loogtude =res.data.data.longitude;
          localStorage.setItem('lat1',res.data.data.latitude);
          localStorage.setItem('lng1',res.data.data.longitude);
          localStorage.setItem('mname',this.names);
          localStorage.setItem('addrs',this.addr);
          this.shares();
          this.$store.commit('set_name_id', [this.names,this.sid]);
          /*轮播图*/
          this.$axios.get('/api/v2/getAdvImg',{
            params: {
              id:this.$route.params.id,
              type:res.data.data.type
            }
          })
            .then(res => {
              if(res.data.data.length>0){
                this.banimgs=res.data.data;
              }
            })
        })
      },
      viewAll (index) {// 收起 全部
        this.commentList[index].active = !this.commentList[index].active;
      },
      shares() {
        this.fenXiang();
      },
      //获取评论
      comments () {
        this.$axios.get('/api/v2/schoolComments',{
          params: {
            sId:this.$route.params.id
          },
          headers: {
            'token': localStorage.token||''
          }
        })
          .then(res => {
            localStorage.comAll = res.data.data.list.length; //所有的评论个数
            this.commentList = res.data.data.list;
            for(let i=0;i<this.commentList.length;i++){
              this.$set(this.commentList,i,Object.assign({},this.commentList[i],{active:false}));
              this.commentList[i].hole='全部';
            }
          })
      },
      handleScroll () {//滚动监听头部是否显示背景颜色
        this.$nextTick(()=>{
          let scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          let offsetTop = document.querySelector('.act-banner').offsetTop;
          if(scrollTop>offsetTop){
            this.fs=true;
          }else{
            this.fs=false;
          }
        })
      },
      fenXiang () {
        let that = this;
        let fxData = {
          title: that.detailList.name,
          desc: that.detailList.shortProfile, // 分享描述
          link: window.location.href,
          imgUrl: that.detailList.imgUrl, // 分享图标
          type: 'link',
          dataUrl: '',
        };
        this.$axios.get('/api/v2/shareSign', {
          params:{
          url:fxData.link
        }
        }).then(res =>{
          wx.config({
            debug: false,
            appId: res.data.data.AppID,
            timestamp: res.data.data.timestamp, //生成签名的时间戳
            nonceStr: res.data.data.noncestr, //生成签名的随机字符串
            signature: res.data.data.signature, //签名
            jsApiList: [ //需要调用的JS接口列表
              'onMenuShareTimeline', //分享到朋友圈
              'onMenuShareAppMessage',//分享给好友
              'onMenuShareQQ',
              'onMenuShareQZone',
              'onMenuShareWeibo'//分享到微博
            ]
          });
          let shareData = {
            desc: fxData.desc,
            title: fxData.title,
            link: fxData.link,
            imgUrl: fxData.imgUrl,
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              this.$vux.loading.show({
                text: '分享成功'
              });
              setTimeout(() => {
                that.$vux.loading.hide();
              }, 800)
            },
            cancel: function() {
              this.$vux.loading.show({
                text: '分享取消'
              });
              setTimeout(() => {
                that.$vux.loading.hide();
              }, 800)
            }
          };
            wx.ready(function() {
              // config信息验证成功后会执行ready方法
            /*if(el===1){*/
                wx.onMenuShareAppMessage(shareData);
            /*}else if(el===4){*/
                wx.onMenuShareQZone(shareData);
           /* }else if(el=='5'){*/
              wx.onMenuShareWeibo(shareData);
            /*}else if(el =='2'){*/
              wx.onMenuShareTimeline(shareData);
            /*}else if(el == '3'){*/
              wx.onMenuShareQQ(shareData);
            /*}*/
          });
          wx.error(function(res){//通过error接口处理失败验证
            console.log(res,2)
          });
        })
      },
      initSwiper() {
        var mySwiper = new Swiper('.swiper-container', {
          speed: 500, //过度时间
          loop: true,
          autoplay:true,
          effect : 'coverflow',
          slidesPerView: 3,
          centeredSlides: true
        })
      },
    },
    created() {
      this.handleScroll();
      this.$nextTick(() => {
        this.initSwiper() //swiper初始化

      })
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll,true)
    },
    mounted(){
      this.getDetail();
      this.comments();
      window.addEventListener('scroll', this.handleScroll,true)
    }
  };
</script>
<style lang="less" scoped>
  .addColor {
    animation:bgc 2s;
    animation-fill-mode:forwards;
  }
  .share-box {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 0 15px;
  }
  div.share-box p {
    font-size: 12px;
    color: #666;
    border: none;
  }
  .share-img {
    width: 40px;
    height: 40px;
  }
  .share-img img {
    width: 100%;
    height: 100%;
  }
  .popular {
    display: block;
  }
  .mask {
    background: #fff;
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .mask-box {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .mask p,
  .cancel {
    line-height: 44px;
    color: #666;
    font-size: 18px;
    text-align: center;
  }
  .mask p {
    border-bottom: 1px solid #eee;
  }
  .cancel {
    border-top: 1px solid #eee;
  }
  div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    z-index: 1000;
  }

  .sch-star {
    display: flex;
  }
  .head{
    position: absolute;
    top: 0;
    height: 45px;
    width: 100%;
    left: 0;
    z-index: 1000;
    color: rgba(255, 255, 255, 1);
    background: rgba(94, 226, 198, 1);
  }
  .user-zh {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .user-score-num {
    font-size: 39px;
    color: #fbb03b;
    font-weight: bold;
    margin-right: 5px;
  }
  .user-score-left {
    display: flex;
    justify-content: flex-end;
  }
  .user-score-right {
    padding-left: 10px;
  }
  .user-evaluate {
    margin-top: 10px;
    padding: 0 15px;
    background: #fff;
  }
  .user-title {
    font-size: 12px;
    color: #666;
    position: relative;
  }
  @keyframes bgc{
    0%{
      background: transparent;
      color:transparent;
    }
    100%{
      background: #5EE2C6;
      color:rgba(255,255,255,1)
    }
  }
  .user-title:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .fbox{
    width: 100%!important;
    display:flex;
    flex-wrap: wrap;
  }
  .teach-box{
    width: 48%;

  }
  .teach-box:nth-child(2n){
    margin-left:4%;
  }
  .teach-box > p {
    color: #666;
    text-align: center;
  }
  .teach-into {
    padding: 0 15px;
    background: #fff;
    margin-top: 10px;
    padding-bottom: 10px;
  }
  .teach-into > p {
    line-height: 44px;
    font-size: 16px;
    color: #666;

  }
  .into-img {
    height: 110px;
    overflow:hidden;
    text-align: center;
  }
  .into-img img {
    width: 100%;
    height: 100%;
  }
  .act-support p.sc-into {
    font-size: 16px;
    color: #666;
    text-align: left;
  }
  .popular {
    height: 44px;
    width: 100%;
    margin-top: 10px;
    background: #fff;
    padding: 0 15px;
    position: relative;
  }
  .popular:before {
    content: "";
    background: #5ee2c6;
    width: 5px;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .popular p {
    line-height: 44px;
    font-size: 14px;
    color: #666666;
  }
  .more {
    text-align: right;
    font-size: 12px;
    line-height: 44px;
  }
  .more .vux-x-icon {
    fill: #cccccc;
    vertical-align: middle;
  }
  .more a span {
    color: #989898;
    vertical-align: middle;
    text-align: right;
    font-size: 10px;
  }
  .score {
    color: #fbb03b;
    font-size: 12px;
    margin-left: 10px;
  }
  .link-distance {
    color: #989898;
    font-size: 12px;
  }
  .vux-1px-l:before {
    top: 50%;
    transform: translateY(-13px);
    height: 26px;
    border-color: #eee;
  }
  .act-detail {
    background: #eeeeee;
  }
  .act-foot,
  .act-time,
  .act-support {
    background: #fff;
  }
  .detial-star {
    margin-left: 35px;
    width: 22px;
    height: 22px;
    display: block;
  }
  .detial-share {
    width: 22px;
    height: 22px;
  }
  .detial-star img,
  .detial-share img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .act-banner {
    max-width: 100%;
    height: 200px;
    /*overflow:hidden;*/
    background: #000;
  }
  .act-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .act-title {
    font-size: 16px;
    color: #666;
    line-height: 36px;
    font-weight: normal;
  }
  .act-status {
    width: 44px;
    height: 16px;
    background: #fc4d4d;
    border-radius: 8px;
    float: right;
  }
  div.act-status > p {
    color: #fff;
    font-size: 8px;
    text-align: center;
    line-height: 16px;
  }
  .act-end {
    width: 44px;
    height: 16px;
    background: #ccc;
    border-radius: 8px;
  }
  .act-foot {
    padding: 5px 0;
  }
  .act-foot p {
    font-size: 10px;
    color: #ccc;
  }
  .act-icon {
    width: 16px;
    height: 14px;
  }
  .act-icon img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .link-title {
    color: #666;
    font-size: 12px!important;
  }
  .weui-cell:before {
    right: 15px;
  }
  .yuan {
    color: #5ee2c6;
  }
  .act-time {
    display: flex;
    padding: 10px 15px;
    position: relative;
  }
  .act-time:after {
    content: " ";
    position: absolute;
    bottom: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right: 15px;
  }
  .act-time:before {
    content: " ";
    position: absolute;
    top: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right: 15px;
  }
  .time-icon {
    width: 13px;
    height: 46px;
    text-align: center;
    vertical-align: middle;
    margin-right: 5px;
  }
  .time-icon img {
    width: 100%;
    vertical-align: middle;
  }
  .time-icon span {
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  .time-title {
    flex: 1;
  }
  .time-title p {
    color: #666;
    font-size: 14px;
  }
  .act-support {
    margin-top: 10px;
    padding: 0 15px 15px;
  }
  .act-support p {
    text-align: center;
  }
  .act-support span {
    color: #666;
    font-size: 12px;
  }
  .sup-nav {
    margin-top: 10px;
    background: #fff;
  }
  .sup-phone {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  .phone-icon {
    width: 16px;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    margin-right: 3px;
  }
  .phone-icon img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .phone-icon span {
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  .sup-foot {
    box-shadow: 0px -1px 3px #5ee2c6;
    margin-top: 1px;
  }
  .sup-foot a {
    height: 49px;
    background: #fff;
    color: #5ee2c6;
    text-align: center;
    display: block;
  }
  .sup-foot a > div {
    height: 100%;
  }
  .sup-foot a:not(:first-child) {
    border-left: 1px solid #eee;
  }
  .sup-foot p {
    line-height: 49px;
  }
  a.active {
    background: #5ee2c6;
    color: #fff;
  }
  .tab-act {
    color: inherit;
    display: block;
    width: 100%;
    height: 100%;
  }
  p.sup-title {
    text-align: left;
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
  }
  .look-more {
    color: #666;
    font-size: 12px;
  }
  .count {
    color: #989898;
    font-size: 10px;
  }
  .pic-box {
    margin-top: 5px;
  }
  .com-all {
    color: #3667d7;
    font-size: 12px;
  }
  .com-pic {
    width: 80px;
    height: 80px;
    display:inline-block;
    margin:0 15px 15px 0;
  }
  .com-pic img {
    width: 100%;
    height: 100%;
  }
  .vux-rater {
    display: flex;
  }
  .vux-rater a {
    display: block;
  }
  .com-user {
    display: flex;
  }
  .title-box {
    padding-bottom: 15px;
  }
  .com-name {
    font-size: 12px;
    color: #666;
    flex: 1;
  }
  .sorce-box {
    display: flex;
  }
  .sorce {
    font-size: 12px;
    color: #666;
  }
  .com-date {
    color: #989898;
    font-size: 10px;
  }
  .comment {
    background: #fff;
    padding: 15px;
    display: flex;
    position: relative;
  }
  .comment:after {
    content: " ";
    position: absolute;
    bottom: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right: 15px;
  }
  .com-img {
    width: 50px;
    height: 50px;
    border-radius:50%;
    overflow:hidden;
  }
  .com-img img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .com-box {
    padding: 10px 0 0 10px;
    flex: 1;
  }
  .com-con p {
    font-size: 12px;
    color: #666;
    line-height: 20px;
  }
  .head-title{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
   /* opacity:0;*/
  }
  .fl {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .addColor .head-title{
    opacity:1;
  }
  .pic-box{
    margin-top:5px;
  }
  .flex-row{
    display:block;
  }
  .flex-row>div{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex:1
  }
  .banner-nav {
    background: #fff;
    padding-top: 1rem;
    padding-bottom: 0.6875rem;
    width: 100%;
    overflow:hidden;
  }
  .ban {
    height: 10rem;
/*
    margin-left:-70%;
*/
    overflow: hidden;
    position: relative;
    background: #fff;
    padding-bottom: 0.625rem;
  }
  .slide {
    width: 49%;
    height: 100%;
    display: block;
    float: left;
    background: #fff;
    border-radius: 0.2rem;
    /*box-shadow: 0px 1px 3px #5EE2C6;*/
    transform: scale(0.93);
    -webkit-transform: scale(0.93);
    -moz-transform: scale(0.93);
    -o-transform: scale(0.93);
    -ms-transform: scale(0.93);
  }
  .slide p{
    text-align: center;
    background: #fff;
  }
  /*.slide img {
    width: 100%;
    height: 9.375rem;
    display: block;
    border-radius: 0.2rem;
  }*/
</style>

