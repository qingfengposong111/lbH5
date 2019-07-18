<template>
  <div class='home-act'>
    <c-head>
      <div slot='left'>
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">爆料圈</p>
      <p slot='right' class='user-title' style="color:#fff;text-align: center;" @click="release">发布</p>
    </c-head>

    <div class="act-main">
      <div class="vew video" v-if="video"><!---->
        <video id="video" :poster="'http://img.labiyouxue.com/'+poster"  :src="'http://img.labiyouxue.com/'+vs" @click="pause"
               webkit-playsinline='' playsinline='' x5-playsinline='' x-webkit-airplay='allow'
               style="width: 100%;height: 200px;object-fit: cover;"></video>
        <img @click="play" src="/static/tipoff/icon_video.png" alt="" v-if="plays">
        <!--<canvas id="canvas"></canvas>-->
      </div>
      <div class="lead">
        <span>{{write}}</span>
        <input class="video1" @change="getVideo" type="file">
      </div>
      <div class="main">
        <div class="input">
          <input type="text" id="title" placeholder="请写下您的爆料标题">
        </div>
        <textarea name="" id="area" placeholder="请写下您的爆料内容"></textarea>
      </div>
      <div class="view" style="">
        <ul class="lists">
          <li class="item" v-if="imgs!==''" v-for="(item, index1) in imgs.split(',')" :key="index1">
            <img class="btn-img" src="/static/btn_cancel@2x.png" @click="delImg(index1)">
            <img :src="'http://img.labiyouxue.com/'+item">
          </li>
          <li class="lt">
            <div class="image-view add-pic" style="display:inline-block;">
              <div class="addbox">
                <input class="file" type="file" @change="getImgBase" multiple>
                <div class="addbtn add-img">
                  <span class="ten">+</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  export default {
    components: {},
    props: {},
    data() {
      return {
        video: false,
        imgBase64: [],
        plays: false,
        imgs: '',
        poster: '',
        write: '导入视频',
        vs: '',
        imgSrc: '',
        headImg: localStorage.getItem("qrcodeImg") ? localStorage.getItem("qrcodeImg") : 'http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png',
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
        return YY + '-' + MM + '-' + d + ' ' + h + ':' + m
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
      }
    },
    watch: {

    },
    computed: {},
    created() {
    },
    methods: {
      turnUp: function () {
        this.$router.push('/tipoff');
      },
      datt:function(value) {
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
        return YY + '/' + MM + '/' + d
      },
      randStr: function (randomFlag, min, max) {
        let range = min;
        let key1='',
          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if (randomFlag) {
          range = Math.round(Math.random() * (max - min)) + min;
        }
        for (let i = 0; i < range; i++) {
          let pos = Math.round(Math.random() * (arr.length - 1));
          key1 += arr[pos];
        }
        return key1;
      },
      getImgBase() {
        let _this = this;
        let event = event || window.event;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let param = new FormData(); //创建form对象
        param.append('file', file);//通过append向form对象添加数据
        this.$axios.post('/api/v2/uploadImage',
          param, {
            headers: {"Content-Type": "multipart/form-data"}
          }).then(res => {
          this.imgBase64.push(res.data.data);
          this.imgs = this.imgBase64.join(',');
          console.log(this.imgs)
        }).catch(err => {
        });
      },
      //删除图片
      delImg(index1) {
        this.imgBase64.splice(index1, 1);
        this.imgs = this.imgBase64.join(',')
      },
      /*播放*/
      play: function () {
        let that = this;
        let video1 = document.getElementsByTagName("video")[0];
        video1.addEventListener("timeupdate", function () {
          let timeDisplay;
          timeDisplay = video1.currentTime;
          if (timeDisplay >= that.time) {
            that.plays = true;
          }
        }, false);
        if (video1.paused) {
          video1.play();
          this.plays = false;
        } else {
          video1.pause();
          this.plays = true;
        }
      },
      /*暂停*/
      pause: function () {
        let video1 = document.getElementsByTagName("video")[0];
        video1.pause();
        this.plays = true;
      },
      /*上传视频*/
      getVideo() {
        let that = this;
        let event = event || window.event;
        let file = event.target.files[0];
        let token, deline;
        let config = {
          useCdnDomain: true
        };
        this.$axios.get('/api/v2/qnToken').then(res => {
          token = res.data.data.token;
          deline = res.data.data.deadline;
          let gs = 'mp4'||'AVI'|| 'FLV' ||'3gp';
          let observable = qiniu.upload(file, this.datt(new Date().getTime())+'/'+this.randStr('true', 0, 32)+'.'+gs, res.data.data.token, config);
          observable.subscribe({
            next(res) {},
            error(err) {},
            complete(res1) {
              that.video=true;
              that.plays=false;
              that.write='点击更换视频';
              that.vs = res1.key;
              that.poster=res1.key+'?vframe/jpg/offset/1';
            }
          });
        });
      },
      release: function () {
        let txt = document.getElementById('title').value;
        let area = document.getElementById('area').value;
        let that = this;
        if(localStorage.token){
          if (txt === '') {
            this.$vux.loading.show({
              text: '请输入标题！'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
            }, 1000)
          } else if (area === '') {
            this.$vux.loading.show({
              text: '请输入内容！'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
            }, 1000)
          } else {
            this.$axios.post('/api/v2/publishExpose', {
              title: txt,
              content: area,
              image: this.imgs,
              video: this.vs,
              videoImg: this.poster
            }, {
              headers: {
                'token': localStorage.token
              }
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$vux.loading.show({
                    text: '发布成功！'
                  });
                  setTimeout(() => {
                    this.$vux.loading.hide();
                  }, 1000);
                  this.$router.push('/tipoff')
                }
              })
              .catch(err=>{
                if(err.response.status===401){
                  this.$vux.loading.show({
                    text: '登录超时，请重新登录'
                  });
                  setTimeout(() => {
                    that.$vux.loading.hide();
                    that.$router.push({name:'login',query:{redirect:'/tipsend'}});
                  }, 1000)
                }
              })
          }
        }


      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .video {
    width: 100%;
    height: 200px;
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .video video {
    width: 100%;
    height: 100%
  }

  .video img {
    position: absolute;
    top: 0;
    left: 0;
    width: 52px;
    height: 52px;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 10;
  }

  .add-pic {
    width: 75px;
    height: 75px;
    border-radius: 2px;
    position: relative;
  }

  .vew {
    width: 100%;
    height: 200px;
  }

  .video1 {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 10;
  }

  .add-img {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    box-sizing: border-box;
  }

  .ten {
    display: block;
    font-size: 26px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    font-weight: bold;
    color: #999;
  }

  .add-pic img {
    width: 100%;
    height: 100%;
  }

  .file {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 100;
  }

  .addbox {
    width: 75px;
    height: 75px;
    box-sizing: border-box;
  }

  .lists {
    list-style: none;
    display: inline-flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .lists li {
    width: 74px;
    margin-right: 8px;
    margin-bottom: 10px;
    height: 74px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #eee;
    background: #fff;
  }

  .lt {
    border: 1px dashed #999 !important;
  }

  .lists img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lists .btn-img {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 20px;
    height: 20px;
  }

  body, #app, .home-act, html {
    background: #f6f6f6 !important;
    width: 100%;
    height: 100%;
  }

  .head {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }

  .act-main {
    width: 92%;
    margin: 0 auto;
    padding-top: 60px;
  }

  .lead {
    width: 100%;
    height: 50px;
    border: 1px solid #eee;
    border-radius: 4px;
    line-height: 50px;
    text-align: center;
    color: #A1FED6;
    margin-top: 10px;
    background: #ffffff;
    position: relative;
  }

  .main {
    width: 100%;
    height: 175px;
    background: #ffff;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-top: 16px;
  }

  .main input, .main textarea {
    display: block;
    padding-left: 15px;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    color: #666;
  }
  .main .input{
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  .main input {
    height: 45px;
    font-size: 14px;
    /*line-height: 45px;*/
    border: none;
  }

  .main textarea {
    height: 130px;
    font-size: 14px;
    border: none;
    resize: none;
    padding-top: 10px;
    box-shadow: 0 2px 2px #f6f6f6;
  }
  #canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
</style>
