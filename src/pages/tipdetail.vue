<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">爆料详情页</p>
    </c-head>
    <div class="act-main">
      <div class="video" v-if="show">
        <video :src="det.video" webkit-playsinline='' playsinline='' x5-playsinline='' x-webkit-airplay='allow'  id="video" :poster="det.videoImg" @click="pause"   style="width: 100%;height: 200px;object-fit: cover;"></video>
        <img @click="play" src="/static/tipoff/icon_video.png" alt="" v-if="det.video!=''&&plays">
      </div>
      <div class="main">
        <div class="title">
          {{det.title}}
        </div>
        <div class="tip">
          <span style="margin-right:10px;">{{det.createTime | formatDate}}</span><span>{{det.commentNum}} 阅读</span>
        </div>
        <div class="content">
          {{det.content}}
        </div>
        <div class="pics">
          <flexbox class="flex-row" :gutter="5" v-for="(item,index) in det.urls" :key='index'>
            <flexbox-item  style="margin-left:0;width: 100%;">
              <div class="com-pic">
                <img :src="item" preview="index" alt="">
              </div>
            </flexbox-item>
          </flexbox>
          <div class="dos">
            <div @click="praise">
              <img :src="ps" width="16" alt="">
              <span class="gray" :class="fl?'red':''">点赞</span>
            </div>
            <div >
              <img src="/static/tipoff/icon_forwarding.png" width="19" alt="">
              <span>转发</span>
            </div>
          </div>
        </div>
      </div>
      <div class="com">
        <ul class="clist">
          <li v-for="(temp,b) in comList" :key="b"><span class="cname" title="">{{temp.nickname}}：</span><span class="comment">{{temp.comment}}</span></li>
        </ul>
        <div class="bot">
          <div class="txt">
            <input id="txt" type="text" placeholder="说点什么">
          </div>
          <img src="/static/tipoff/icon_send.png" width="30" alt="" @click="send">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  export default {
    components:{},
    props:{},
    data(){
      return {
        /*show:false,*/
        plays:true,
        fl:false,
        tip:[],
        det:{},
        ps:'/static/tipoff/icon_gray_praise.png',
        comms:'',
        comList:[],
        time:'',
        show:false
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
        return YY + '-' +MM + '-' + d + ' '+ h + ':' + m
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    computed:{
    },
    created(){
      this.detail();
      this.coms();
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
        this.$router.go(-1);
      },
      /*详情*/
      detail: function () {
        let that = this;
        this.$axios.get('/api/v2/exposeDetail',{
          params:{
            id:this.$route.params.id
          },
          headers:{
            'token':localStorage.token ||''
          }
        })
          .then( res =>{
              that.fenXiang();
            if(res.data.code==1){
              if(res.data.data.video==''||res.data.data.video==null){
                this.show=false;
              }else{
                this.show=true;
              }
              this.det = res.data.data;
              this.fl = res.data.data.liked;
              setTimeout(function(){
                let video1=document.getElementsByTagName("video")[0];
                that.time = video1.duration;
              },500);
              if(!this.fl){
                this.ps='/static/tipoff/icon_gray_praise.png';
              }else{
                this.ps='/static/tipoff/icon_praise.png';
              }
            }
          })
      },
      fenXiang () {
        let that = this;
        let fxData = {
          title: that.det.name,
          desc: that.det.shortProfile, // 分享描述
          link: window.location.href,
          imgUrl: that.det.imgUrl, // 分享图标
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
              'updateAppMessageShareData', //分享到朋友圈
              'updateTimelineShareData',//分享给好友
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
            wx.updateAppMessageShareData(shareData);
            wx.updateTimelineShareData(shareData);
            wx.onMenuShareWeibo(shareData)
          });
          wx.error(function(res){//通过error接口处理失败验证
            console.log(res,2)
          });
        })
      },
      /*播放*/
      play: function () {
        let that = this;
        let video1=document.getElementsByTagName("video")[0];
        video1.addEventListener("timeupdate",function(){
          let timeDisplay;
          timeDisplay = video1.currentTime;
          if(timeDisplay >= that.time){
            that.plays=true;
          }
        },false);
        if(video1.paused){
          video1.play();
          this.plays=false;
        }else{
          video1.pause();
          this.plays=true;
        }
      },
      /*暂停*/
      pause: function (){
        let video1=document.getElementsByTagName("video")[0];
        video1.pause();
        this.plays=true;
      },
      /*点赞*/
      praise: function () {
        let that = this;
        if(localStorage.token){
          this.$axios.get('/api/v2/exposeLike',{
            params:{
              exposeId:this.$route.params.id
            },
            headers:{
              'token':localStorage.token
            }
          })
            .then( res =>{
              if(this.fl){
                this.$vux.loading.show({
                  text: res.data.data
                });
                setTimeout(() => {
                  this.$vux.loading.hide()
                }, 1000);
                this.ps='/static/tipoff/icon_gray_praise.png';
                this.fl=false;
              }else{
                this.$vux.loading.show({
                  text: res.data.data
                });
                setTimeout(() => {
                  this.$vux.loading.hide()
                }, 1000);
                this.ps='/static/tipoff/icon_praise.png';
                this.fl=true;
              }
            }).catch(err=>{
            this.$vux.loading.show({
              text: '登录过期，请重新登录！'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
            }, 1000);
            that.$router.push({name:'login',query:{redirect:'/tipdetail/'+that.$route.params.id}})
          })
        }else{
          this.$vux.loading.show({
            text: '请登录！'
          });
          setTimeout(() => {
            this.$vux.loading.hide();
          }, 1000);
          that.$router.push({name:'login',query:{redirect:'/tipdetail/'+that.$route.params.id}})
        }

      },
      /*评论列表*/
      coms:function () {
        this.$axios.get('/api/v2/commentList',{
          params:{
            exposeId:this.$route.params.id
          },
          headers:{
            'token':localStorage.token || ''
          }
        })
          .then( res => {
            if(res.data.code===1){
              this.comList = res.data.data.list;
            }
          })
      },
      /*发表评论*/
      send: function () {
        this.comms = document.getElementById('txt').value;
        let that = this;
        if(this.comms!==''){
          this.$axios.post('/api/v2/addComment',{
            exposeId:this.$route.params.id,
            comment:this.comms ,
            replyMid:''
          },{
            headers:{
              'token':localStorage.token
            }
          })
            .then(res=>{
              document.getElementById('txt').value ='';
              that.coms();
            })
        }else{
          this.$vux.loading.show({
            text: '请输入评论内容！'
          });
          setTimeout(() => {
            this.$vux.loading.hide()
          }, 1000);
        }

      }
    },
    mounted(){

    },
    watch:{

    }
  }
</script>
<style lang="less" scoped>
  .gray{
    color:#666;
  }
  .red{
    color:#FF6464
  }
  .home-act{
    width: 100%;
    height: 100%;
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
  .act-main{
    padding:44px 0 0;
    width: 100%;
    margin:0 auto;
    background: #fff;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .video{
    width:100%;
    height: 200px;
    position:relative;
    background: #000;
    overflow:hidden;
  }
  .video video{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover!important;
  }
  .video img{
    position: absolute;
    top:0;
    left: 0;
    width: 52px;
    height: 52px;
    bottom:0;
    right:0;
    margin:auto;
    z-index:10;
  }
  .main{
    width: 92%;
    margin:0 auto;
    background: #fff;
  }

  .title{
    font-size: 16px;
    color:#666;
    padding:10px 0;
    font-weight: 500;
  }
  .tip{
    font-size: 12px;
    width: 100%;
    display:flex;
    justify-content: flex-start;
    align-items:center;
    color:#999;
  }
  .content{
    font-size: 14px;
    color:#666;
    margin-top:10px;
  }
  .com-pic{
    width:100%;
    /*height:175px;*/
    margin:5px 10px 5px 0;
  }
  .com-pic img{
    width:100%;
    height:100%;
    border:1px solid #eee;
  }
  .dos{
    width: 100%;
    display:flex;
    justify-content: flex-start;
    align-items:center;
    padding:10px 0;
  }
  .dos>div{
    width: 50%;
    text-align: center;
    font-size: 14px;
  }
  .dos>div img{
    display:block;
    margin:0 auto;
  }
  .com{
    width: 100%;
    background: #fff;
    border-top:10px solid #fafafa;
    padding:10px 0;
  }
  .clist{
    width: 92%;
    margin:0 auto;
    max-height:100px;
    overflow-y:auto;
    box-sizing:border-box;
    list-style:none;
    padding:5px 0;
  }
  .bot{
    width: 100%;
    height: 60px;
    background: #fff;
    display:flex;
    justify-content: center;
    align-items:center;
    border-top:1px solid #eee;
  }
  .bot .txt{
    width: 80%;
    border:1px solid #eee;
    border-radius:22px;
    padding-left:10px;
    height: 44px;
    margin-right:10px;
    box-sizing:border-box;
  }
  .bot input{
    display:block;
    width: 100%;
    height: 100%;
    outline:none;

    border:none;
  }
  .cname{
    margin-right:5px;
    font-size: 16px;
    color:#666
  }
  .comment{
    font-size: 14px;
    color:#999;
  }
</style>
