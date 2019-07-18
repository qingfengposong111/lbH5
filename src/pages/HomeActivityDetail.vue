<template>
  <div class="act-detail">
      <div class='head' id="head" :class="{addColor:fs}">
        <flexbox :gutter='0'>
            <flexbox-item :span="1.5/10" >
            <div  class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
            </flexbox-item>
            <flexbox-item :span="7.5/10" class="txt-color">
                 <p class=" t1" >{{data.activeName}}</p>
            </flexbox-item>
            <flexbox-item :span="1/10">
                <flexbox :gutter='10'>
                <flexbox-item :span='1/3'><div class="detial-star"><img @click="collection"  :src="save" alt=""></div></flexbox-item>
                </flexbox>
            </flexbox-item>
        </flexbox>
      </div>
    <div style="padding-top:44px;">
      <div class="act-banner">
        <swiper auto height="200px">
          <swiper-item class="black" height="200px" v-for="(tst,f) in banimgs" :key="f">
            <h2 class="title fadeInUp animated"><img :src="tst.imgUrl" alt=""></h2>
          </swiper-item>
        </swiper>
        <!--<c-swiper :type="4"></c-swiper>-->
      </div>
      <div class="act-foot">
        <h4 class="act-title">{{data.activeName}}</h4>
        <flexbox :gutter="0">
          <flexbox-item :span="2/5">
            <flexbox>
              <flexbox-item >
                <flexbox :gutter="0">
                  <flexbox-item :span='2/7'> <div class="act-icon"><img src="/static/icon_grey_eyes.png" alt=""></div></flexbox-item>
                  <flexbox-item :span='5/7'><p>{{data.readNum}}</p> </flexbox-item>
                </flexbox>
              </flexbox-item>
              <flexbox-item >
                <flexbox :gutter="0">
                  <flexbox-item :span='2/7'> <div class="act-icon"><img src="/static/icon_grey_comments.png" alt=""></div></flexbox-item>
                  <flexbox-item :span='5/7'><p>{{data.comNum}}</p> </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="3/5">
            <div class="act-status" :class="{'act-end':rt}"><p>
              <span v-if="data.isEnd===1">报名中</span>
              <span v-if="data.isEnd===2">进行中</span>
              <span v-if="data.isEnd===3">已结束</span>
            </p></div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="act-time">
        <div class="time-icon"><span></span><img src="/static/icon_grey_time.png" alt=""></div>
        <div class="time-title">
          <p>报名截止时间：{{data.applyEnd | formatDate}}</p>
          <p>活动开始时间：{{data.startTime | formatDate}}</p>
        </div>
      </div>
      <group :gutter="0">
        <cell is-link @click.native="gos" style="border:none;">
          <p slot='title' class="link-title link-title-add">{{data.hostAddress}}</p>
          <img slot="icon" width="16" style="display:block;margin-right:5px;margin-top: 3px;" src="/static/icon_grey_positioning.png">
        </cell>
        <cell is-link>
          <p slot='title' class="link-title">{{data.consultPhone}}</p>
          <img slot="icon" width="16" style="display:block;margin-right:5px;" src="/static/icon_grey_phone.png">
        </cell>
        <cell>
          <p slot='title' class="link-title yuan">￥{{data.money}}</p>
          <img slot="icon" width="16" style="display:block;margin-right:5px;margin-top: 3px;" src="/static/icon_grey_money.png">
        </cell>
      </group>
      <div class="act-support">
        <p class='sup-title'>活动赞助商</p>
        <div class="father-single" v-for="(shopper,b) in dat" :key="b">
            <router-link class="single" :to='shopper.jumpUrl'>
              <div class="sup-icon">
                <img :src="shopper.imgUrl">
              </div>
              <p>
                <span>{{shopper.name}}</span>
              </p>
            </router-link>
        </div>
      </div>
      <div class="sup-nav">
        <keep-alive>
          <tab :line-width="1" custom-bar-width="80px"   @on-before-index-change="switchTabItem">
            <tab-item :selected="$route.path==='/home/activity/detail/'+sonId+'/actintro'">
              <router-link class="tab-act" exact :to="'/home/activity/detail/'+sonId+'/actintro'">
                活动介绍
              </router-link>
            </tab-item>
            <tab-item :selected="$route.path==='/home/activity/detail/'+sonId+'/record'" class="vux-1px-l">
              <router-link class="tab-act" exact :to="'/home/activity/detail/'+sonId+'/record'">
                活动印记
              </router-link>
            </tab-item>
            <tab-item :selected="$route.path==='/home/activity/detail/'+sonId+'/comment'" class="vux-1px-l" >
              <router-link class="tab-act" exact :to="'/home/activity/detail/'+sonId+'/comment'">
                活动点评
              </router-link>
            </tab-item>
          </tab>
        </keep-alive>

      </div>
      <div>
        <keep-alive>
          <router-view :message="dec"></router-view>
        </keep-alive>
      </div>
    </div>

        <div class="sup-foot">
            <flexbox :gutter="0">
                <flexbox-item>
                    <a v-if="data.consultPhone!=''" :href="'tel:'+data.consultPhone" :class="{active: isActive=='1'}">
                        <div>
                            <div class="sup-phone">
                                <div class='phone-icon'  v-if="isActive=='1'"><span></span><img src="/static/icon_whitephoto.png" alt=""></div>
                                <div class='phone-icon'  v-if="isActive!='1'"><span></span><img src="/static/icon_phone.png" alt=""></div>
                                <p>电话咨询</p>
                            </div>
                        </div>
                    </a>
                  <router-link v-if="data.consultPhone===''" to="" :class="{active: isActive=='1'}">
                    <div>
                      <div class="sup-phone">
                        <div class='phone-icon'  v-if="isActive=='1'"><span></span><img src="/static/icon_whitephoto.png" alt=""></div>
                        <div class='phone-icon'  v-if="isActive!='1'"><span></span><img src="/static/icon_phone.png" alt=""></div>
                        <p>电话咨询</p>
                      </div>
                    </div>
                  </router-link>
                </flexbox-item>
                <flexbox-item>
                    <router-link to="" @click.native="tp" :class="{ endOrNot: data.isEnd!=1}">
                        <div class="vux-1px-l">
                            <p>在线报名</p>
                        </div>
                    </router-link>
                </flexbox-item>
                <flexbox-item >
                    <div @click="nowCom " :class="{ pend: data.isEnd!=3}">
                        <div class="vux-1px-l vue-before" >
                            <p>发表评价</p>
                        </div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div v-if='isShow' class='popContainer'>
            <div class='head'>
                <flexbox :gutter='0'>
                    <flexbox-item :span="1/5" >
                    <div  class="return" @click='turnUp'>
                        <img src="/static/btn_return.png" alt="">
                    </div>
                    </flexbox-item>
                    <flexbox-item :span="3/5">
                        <p class="head-title">发表评价</p>
                    </flexbox-item>
                    <flexbox-item :span="1/5">
                        <div class='submit' :class="{addin:txt!=''}" @click='DoSubmit'>
                        提交
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
              <div class='sch-det'>
                <p class='sch-det-title'>评论</p>
                <div class='sch-det-star'>
                        <rater  v-model="star" :min="0" :font-size="30" :margin='10'></rater>
                </div>
                <div class='write-com'>
                    <textarea class="text-comm" name="" cols="30" v-model="txt" rows="10" placeholder="写下你对活动的评价吧~">{{txt}}</textarea>
                    </div>
                <div class="view"  style="display:inline-block;">
                  <ul class="lists">
                    <li class="item" v-if="imgs!=''"  v-for="(item, index1) in imgs.split(',')" :key="index1">
                      <img class="btn-img"  src="/static/btn_cancel@2x.png" @click="delImg(index1)">
                      <img :src="item">
                    </li>
                    <li>
                      <div class="image-view add-pic" style="display:inline-block;">
                        <div class="addbox">
                          <input type="file" @change="getImgBase()" multiple>
                          <div class="addbtn add-img">
                            <img src="/static/btn_grey_picture.png" alt="">
                            <p style="margin-top:-5px;">
                              添加图片
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  /*import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'*/
export default {
  components:{},
  props:{},
  data(){
    return {
      isActive:1,
      isShow:false,
      star:0,
      imgqs: [],
      save:'/static/btn_hollow_Focus.png',
      data:{},
      dat:{},
      dec: '',
      sonId:this.$route.params.id,
      isEnd: '',
      rt: false,
      evaluation:'',
      score: '',
      evaUrl:'',
      txt: '',
      activityId:'',
      imgBase64: [],
      imgs:'',
      address:'',
      activeName: '',
      msg:'',
      collect:false,
      fs: false,
      latude:'',
      loogtude: '',
      commentReason:null,
      banimgs:[]
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
  watch:{
  },
  computed:{
    mapval () {
      return this.$store.state.map_val
    }
  },
  methods:{
    tp () {
      if(localStorage.token){
        if(this.data.isEnd!=1){
          return false
        }else{
          this.$router.push('/home/activity/OnlineRegistration/'+this.$route.params.id+'/'+this.data.activeName)
        }
      }else{
        this.logs();
      }

    },
    getImgBase(){
      let _this = this;
      let event = event || window.event;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      this.$axios.post('/api/v2/uploadImage',
        param,{
          headers:{"Content-Type":"multipart/form-data"}
        }).then(res=>{
        this.imgBase64.push(res.data.data);
          this.imgs=this.imgBase64.join(',');
      }).catch(err=>{
      });
    },
    //删除图片
    delImg(index1){
      this.imgBase64.splice(index1,1);
      this.imgs=this.imgBase64.join(',')
    },
    switchTabItem (index) {
      this.$vux.loading.show({
        text: 'loading'
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.index01 = index
      }, 1000)
    },
    turnUp(){
      this.$router.push('/home/activity');
    },
    DoSubmit(){
      let that = this;
      if(this.txt!=''){
        this.isShow=!this.isShow;
        this.$axios.post('/api/v2/commitActivityComment',{
          activityId: localStorage.asid,
          evaluation: this.txt,
          score: this.star,
          evaUrl: this.imgs
        },{
          headers: {
            'token': localStorage.getItem("token")
          }
        })
          .then(res =>{
            this.$vux.loading.show({
              text: '评论成功'
            });
            setTimeout(() => {
              this.$vux.loading.hide()
            }, 1000)
            this.txt = ''
            this.star = 0
          })
          .catch(err =>{
            this.$vux.loading.show({
              text: '登录超时，请重新登录'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
              that.$router.push({name:'login',query:{redirect:'/home/activity/detail/'+that.$route.params.id}});
            }, 1000)
          });
      }
    },
    nowCom(){
      if(this.isEnd!==3){
        return false;
      }else{
        if(localStorage.token){
          if(this.commentReason!=='null'){
            this.$vux.loading.show({
              text: this.commentReason
            });
            setTimeout(() => {
              this.$vux.loading.hide()
            }, 1000)
          }else{
            this.isShow=!this.isShow
          }
        }else{
          this.logs()
        }
      }


    },
    logs () {
      let that = this;
      this.$vux.loading.show({
        text: '请先登录'
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        that.$router.push({name:'login',query:{redirect:'/home/activity/detail/'+that.$route.params.id}});
      }, 1000)
    },
    //收藏
    collection () {
      let that = this;
      if(localStorage.token){
        this.$axios.post('/api/v2/collectActivity',{
          activityId:this.$route.params.id
        },{
          headers: {
            'token': localStorage.getItem("token")
          }
        })
          .then(res =>{
            if(!this.collect){
              this.collect=true;
              res.data.activityId=this.$route.params.id;
              this.save= '/static/btn_solid_Focus.png';
              this.$vux.loading.show({
                text: '收藏成功'
              });
              setTimeout(() => {
                that.$vux.loading.hide()
              }, 1000)
            }else{
              res.data.activityId='';
              this.collect=false;
              this.save='/static/btn_hollow_Focus.png';
              this.$vux.loading.show({
                text: '取消收藏成功'
              });
              setTimeout(() => {
                that.$vux.loading.hide()
              }, 1000)

            }
          })
          .catch(err =>{
            this.$vux.loading.show({
              text: '登录超时，请重新登录！'
            });
            setTimeout(() => {
              that.$vux.loading.hide();
              that.$router.push({name:'login',query:{redirect:'/home/activity/detail/'+that.$route.params.id}});
            }, 1000)
          })
      }else{
        this.logs();
      }
    },
    //高德地图
    gos () {
      this.address=this.data.hostAddress;
      this.$router.push('/mapes');
    },
    intro () {
      this.$axios.get('/api/v2/findYxwActivitySponsorsList',{
        params:{
          id:this.$route.params.id
        }
      })
        .then(res =>{
          this.dat = res.data.data;
        })
        .catch(err =>{
        })
    }
    },
  created(){
    localStorage.asid = this.$route.params.id;
    this.$axios.get('/api/v2/getYxwActivity',{
      params:{
        id:this.$route.params.id,
      },
      headers: {
        'token': localStorage.getItem("token") || ''
      }
    })
      .then(res =>{
        this.data = res.data.data;
        this.address=res.data.data.hostAddress;
        this.latude = res.data.data.latitude;
        this.loogtude =res.data.data.longitude;
        this.activeName=res.data.data.activeName;
        this.imgqs = res.data.data.actImg.split(',');
        let dec = res.data.data.describes.replace(/<p>/g,'').replace(/\&nbsp;/g,'').replace(/<\/p>/g,'');
        this.collect=res.data.data.collected;
        localStorage.setItem('lat1',res.data.data.latitude);
        localStorage.setItem('lng1',res.data.data.longitude);
        localStorage.setItem('mname',this.activeName);
        localStorage.setItem('addrs',this.address);
        this.commentReason = res.data.data.commentReason;
        this.dec = dec;
          if(!this.collect){
            this.save='/static/btn_hollow_Focus.png'
          }else{
            this.save= '/static/btn_solid_Focus.png';
          }
         this.isEnd = res.data.data.isEnd;
        if(this.isEnd===1){
          this.rt = false;
        }else if(this.isEnd===2){
          this.rt = false;
        }else{
          this.rt = true;
        }
      })
      .catch(err =>{
      });
    this.intro();
    /*轮播图*/
    this.$axios.get('/api/v2/getAdvImg',{
      params: {
        id:this.$route.params.id,
        type:4
      }
    })
      .then(res => {
        if(res.data.data.length>0){
          this.banimgs=res.data.data;
        }
      })
  }
}
</script>
<style lang="less" scoped>
  .weui-cells:before{
    border:none!important;
  }
  .father-single{
    width: 100%;
    display:flex;
    justify-content: flex-start;
    flex-wrap:wrap;
  }
  .single{
    width:25%;
    display:block;
    margin-bottom:5px;
  }
  .single span{
    display:block;
    width: 100%;
    text-align: center;
    margin:0 auto;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap;
  }
  .addColor {
    animation:bgc 2s;
    animation-fill-mode:forwards;
  }
  #toLogin{
    position:fixed;
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius:10px;
    text-align: center;
    z-index:10000;
    left:40%;
    top:50%;
    color:#fff;
    font-size: 12px;
    background:rgba(0,0,0,.9);
  }
  .act-banner>img{
    float: left;
  }
  .clearboth::after{
    content:"";
    display:block;
    clear:both;
  }
  .image-view .addbox{
    position:relative;
    height:75px;
    width:75px;

    text-align:center;
    border:1px dashed #ccc;

  }
  .image-view .addbox input{
    position:absolute;
    left:0;
    height:75px;
    width:75px;
    opacity:0;
  }
  .image-view .addbox .addbtn{
    height:75px;
    width:75px;
    color:#fff;
    border-radius:10px;
  }
  .image-view .item {
    position:relative;
    float:left;
    height:75px;
    width:75px;
  }
  .image-view .item .cancel-btn{
    position:absolute;
    right:0;
    top:0;
    display:block;
    width:20px;
    height:20px;
    color:#fff;
    line-height:20px;
    text-align:center;
    background:red;
    border-radius:10px;
    cursor:pointer;
  }
  .image-view .item img{
    width:100%;
    height:100%;
  }
  .image-view .view{
    clear:both;
  }
.sch-det-con{
    margin-bottom:15px;
}

.sch-det-con-item{
    display:inline-block;
    color:#666;
    font-size:12px;
    height:29px;
    line-height: 29px;
    background: #eee;
    padding:0 10px;
    border-radius: 15px;
}
.sch-det-title{
    font-size:16px;
    color:#666;
    line-height:44px;
    border-bottom:1px solid #eee;
}
.sch-det-star{
    text-align: center;
    line-height: 75px;
}
.add-pic{
    width:75px;
    height:75px;
    border-radius: 2px;
    position:relative;
  display:inline-block;
}
.add-img{
    width:55px;
    height:50px;
    margin: 0 auto;
}
.add-pic img{
    width:55px;
    height:50px;
}
.add-pic p{
    font-size:12px;
    color:#ccc;
    text-align: center;
}
.pic-file{
  position:absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  opacity:0;
}
textarea{
    width:100%;
    height:125px;
    background: #f5f5f5;
    border-radius: 3px;
    border-color:#ccc;
    padding:10px;
    outline:none;
    resize: none;
}

textarea::placeholder{
    color:#ccc;
}
.write-box{
    border:1px solid #ccc;
    background: #f5f5f5;
}
.write-com{
    padding:0 15px;
}
.sch-det{
    padding:0 15px;
    background: #fff;
    margin-top:130px;
    flex:1;
    overflow-y:auto;
}
.submit{
    background: #ccc;
    color:#fff;
    width:60px;
    line-height: 29px;
    border-radius: 15px;
    text-align: center;
}
.addin{
    color:#5EE2C6;
    background: #fff;
}
div.popContainer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 44px;
    background: rgba(0,0,0,0.3);
    display:flex;
    flex-direction: column;
    z-index:10001;
}
.vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#eee;
  }
  .vue-before:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#fff;
  }
.act-detail{
    padding-bottom:49px;
}
.act-foot,.act-time,.act-support{
    background: #fff;
}
.detial-star{
    width:22px;
    height:22px;
}
.detial-share{
    width:22px;
    height:22px;
}
.detial-star img,.detial-share img{
    display:block;
    width:100%;
    height:100%;
}

  .act-banner{
      width:100%;
      height:200px;
    background: #000;
      /*margin-top:44px;*/
  }
  .act-banner img{
      width:100%;
      height:100%;
  }
  .act-title{
        font-size:14px;
        color:#666;
        line-height: 36px;
        font-weight: normal;
    }
.act-status{
    width:44px;
    height:16px;
    background:#FC4D4D;
    border-radius: 8px;
    float:right;
}
div.act-status>p{
    color:#fff;
    font-size: 8px;
    text-align: center;
    line-height: 16px;
}
.act-end{
    width:44px;
    height:16px;
    background:#ccc;
    border-radius: 8px;
}
.act-foot{
    padding:5px 15px;
}
  .act-foot p{
  font-size:10px;
  color:#ccc;
}
.act-icon{
  width:16px;
  height:14px;
}
.act-icon img{
  width:100%;
  height:100%;
  display:block;
}
.link-title{
    color:#666;
    font-size:12px;

}
.link-title-add{
  width: 80vw;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.weui-cell:before{
    right: 15px;
}
.yuan{
    color:#FBB03B;
}
.act-time{
    display:flex;
    padding:10px 15px;
    position:relative;
}
.act-time:after{
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
    right: 15px;
}
.act-time:before{
    content: " ";
    position: absolute;
    top: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right: 15px;
}
.time-icon{
    width:13px;
    height:46px;
    text-align: center;
    vertical-align:middle;
    margin-right:5px;
}
.time-icon img{
    width:100%;
    vertical-align: middle
}
.time-icon span{height: 100%;vertical-align: middle;display: inline-block}
.time-title{
    flex:1;
}
.time-title p{
    color:#666;
    font-size:14px;
}
.act-support{
    margin-top:10px;
    padding:15px;
}
.act-support p{
    text-align: center;
}
.sup-icon {
  width: 55px;
  height: 55px;
  margin: 0 auto;
}
.sup-icon img {
  width: 100%;
  height: 100%;
}
.act-support span{
    color:#666;
    font-size:12px;
}
.sup-nav{
    margin-top:10px;
    background: #fff;
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
  box-shadow: 0px -1px 3px #eee;
  z-index: 100000;
  background: #fff;
}
.sup-foot a,.sup-foot p{
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
a.active, a.active p{
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
  .lists{
    list-style: none;
    display:inline-flex;
    justify-content:flex-start;
    width: 100%;
    flex-wrap: wrap;
    padding-left:10px;
  }
  .lists li{
    width: 75px;
    margin-right:8px;
    margin-bottom:10px;
    height: 75px;
    overflow:hidden;
    position:relative;

  }
  .lists .btn-img{
    position:absolute;
    top: 0;
    right:0;
    color: #fff;
    font-size: 16px;
    display: block;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }
  .t1{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .head{
    position:absolute;
    top: 0;
    height: 45px;
    width: 100%;
    left: 0;
    z-index: 1000;
    color:rgba(255,255,255,1);
    background: rgba(94, 226, 198, 1);
  }
  .vux-slider .vux-indicator-right{
    right:50%!important;
  }
  @keyframes bgc{
    0%{
      background: transparent;
    }
    100%{
      background: #5EE2C6;
      color:rgba(255,255,255,1)
    }
  }
  .text-comm{
    outline:none;
    border:1px solid #ccc;
    box-shadow:none;
  }
  a.endOrNot p{
    color:rgba(94,226,198,.3) !important;
  }
  .pend p{
    color:rgba(94,226,198,.3) !important;
  }
</style>
