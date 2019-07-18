<template>
  <div style="background: #fff;">
    <c-head>
      <div slot='left'>
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <div slot='center' class="head-title">幼学圈</div>
    </c-head>
    <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div style="height: 12rem;margin-top:10px;">
        <!--<c-swiper :type='5' @click.native="spot" v-if="info<=0">

        </c-swiper>-->
        <a :ref="url" style="display:block;" class='swiper-slide slide' @click.native="spot">
          <div>
            <img :src="info" alt="">
          </div>
        </a>
      </div>
      <router-link :to="'/fdetail/'+list.id" class="find-content" v-for='(list,index) in dataList' :key="index"  :id='list.id'>
        <div class="find-box">
          <div class="find-head">
            <div class="find-img">
              <img :src="list.qrcodeImg" alt="">
            </div>
            <div class="find-text">
              <p style="color:#000;font-size: 12px;">{{list.nickname}}</p>
              <p style="font-size: 14px;" :class="{fl:!list.active}">{{list.content}}</p>
              <router-link to="" v-if="list.content.length>50" style="color:#3667D7;font-size: 12px;" @click.native="viewAll(index)">{{list.hole}}</router-link>
            </div>
          </div>
          <div class="find-main">
            <flexbox :gutter='12.5' v-for='(pic,c) in list.urls' :key="c">
              <flexbox-item class='find-main-f'>
                <div class="find-main-img">
                  <img :src="pic" alt="">
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <div class="find-foot">
            <flexbox :gutter="7">
              <flexbox-item :span="5/7">
                <div><p>{{list.createTime | formatDate}}</p></div>
              </flexbox-item>
              <flexbox-item :span="2/7">
                <flexbox>
                  <flexbox-item>
                    <flexbox :gutter="0">
                      <flexbox-item :span='3/7'>
                        <div class="find-icon">
                          <img class="img_vertical" style="vertical-align: 1px;" src="/static/icon_grey_eyes.png" alt=""></div>
                      </flexbox-item>
                      <flexbox-item :span='4/7'><p style="text-align:center;">{{list.likeNum}}</p></flexbox-item>
                    </flexbox>
                  </flexbox-item>
                  <flexbox-item>
                    <flexbox :gutter="0">
                      <flexbox-item :span='3/7'>
                        <div class="find-icon"><img class="img_vertical" style="vertical-align: 1px;"
                                                    src="/static/icon_grey_comments.png" alt=""></div>
                      </flexbox-item>
                      <flexbox-item :span='4/7'><p style="text-align:center;" v-model="list.commentNum">
                        {{list.commentNum}}</p></flexbox-item>
                    </flexbox>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </router-link>
    </mescroll-vue>
    <router-link class='release' to='' @click.native="gocomment">
      <img src="/static/circle_btn_release.png" alt="">
    </router-link>
  </div>
</template>
<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  //import Swiper from 'swiper'
  //import 'swiper/dist/css/swiper.min.css'
  export default {
    components: {
      MescrollVue
    },
    props: {},
    data(){
      return {
        type: '5',
        len1: '',
        len2: '',
        info: '',
        hole: '全文',
        isvis: false,
        url: '',
        mescroll: null,
        mescrollDown: {},
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: 20
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>',
          noMoreSize: 5,
          empty: {
            warpId: "xxid",
            icon: "./static/mescroll/mescroll-empty.png",
            tip: "暂无相关数据~"
          }
        },
        dataList: [],
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return MM + '月' + d + '日' + h + ':' + m;
      }
    },
    watch: {},
    computed: {},
    methods: {
      gocomment () {
        if (localStorage.token) {
          this.$router.push('/find/release')
        } else {
          this.logs()
        }
      },
      logs () {
        let that = this;
        this.$vux.loading.show({
          text: '请先登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          that.$router.push({name: 'login', query: {redirect: '/find'}});
        }, 1000)
      },
      turnUp: function () {//返回上一级
        this.$router.push('/home/found');
      },
      viewAll (index) {// 收起 全部
        if (!this.lists[index].active) {
          this.lists[index].hole = '收起'
        } else if (this.lists[index].active) {
          this.lists[index].hole = '全部'
        }
        this.lists[index].active = !this.lists[index].active;
      },
      viewAll2 (index) {// 收起 全部
        if (!this.downdata[index].active) {
          this.downdata[index].hole = '收起'
        } else if (this.downdata[index].active) {
          this.downdata[index].hole = '全部'
        }
        this.downdata[index].active = !this.downdata[index].active;
      },
      /*点击轮播图*/
      spot () {
        this.$axios.post('/api/v2/visitRecord', {
          sId: localStorage.id,
          strIp: returnCitySN["cip"],
          deviceInfo: ''
        }, {
          headers: {
            'token': localStorage.getItem('token') || ''
          }
        })
          .then(res => {

          })
      },
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback (page, mescroll) {// 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        this.$axios.get('/api/v2/circleNewsList', {// 请求的列表数据
          params: {
            pageSize: page.size,
            pageNumber: page.num
          },
          headers: {
            'token': localStorage.getItem('token') || ''
          }
        }).then((response) => {
          let arr = response.data.data.list;
          for (let j = 0; j < arr.length; j++) {
            this.$set(arr, j, Object.assign({}, arr[j], {active: false}));
            arr[j].hole = '全部';
            this.len2 = arr[j].content.length;
          }
          if (page.num === 1) this.dataList = [];// 如果是第一页需手动制空列表
          this.dataList = this.dataList.concat(arr);// 把请求到的数据添加到列表
          this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
            mescroll.endSuccess(arr.length)
          })
        })
      }
    },
    created(){
      this.$axios.get('/api/v2/adBanner')
        .then(res => {
          if (res.data.code === '1') {
            this.info = res.data.data[0].imgUrl;
            this.url = res.data.data[0].linkUrl;
          }
        })
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }

  .img_vertical {
    vertical-align: 1px;
  }

  .find-content {
    background: #fff;
  }

  .find-box {
    padding: 10px 25px;
    position: relative;
  }

  .find-box::before {
    content: '';
    height: 1px;
    background: #eee;
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
  }

  .find-head {
    display: flex;
    -webkit-box-align: center;
    /*-webkit-align-items: center;*/
    /*align-items: center;*/
  }

  .find-main {
    padding: 10px 0;
    margin-left: 52px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap
  }

  .find-main > div {
    width: 33%;
    margin-bottom: 10px;
  }

  .find-img {
    margin-right: .8em;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
  }

  .find-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .find-main-img {
    width: 80px;
    height: 80px;
  }

  .find-main-img img {
    width: 100%;
    height: 100%;
  }

  .find-text {
    font-size: 14px;
    color: #666;
    width: 82%;
  }

  .find-foot p {
    font-size: 12px;
    color: #ccc;
  }

  .find-icon {
    width: 20px;
    height: 18px;
    vertical-align: top;
  }

  .find-icon img {
    width: 100%;
    height: 100%;
  }

  .release {
    position: fixed;
    bottom: 9px;
    right: 16px;
    width: 45px;
    height: 45px;
    vertical-align: middle;
    display: block;
  }

  .release img {
    width: 100%;
    height: 100%;
  }

  .fl {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .slide {
    width: 100%;
    height: 12rem;
    display: block;
    float: left;
    background: #f4f4f2;
    border-radius: 0.2rem;
    box-shadow: 0px 1px 3px #5EE2C6;
    transform: scale(0.93);
    -webkit-transform: scale(0.93);
    -moz-transform: scale(0.93);
    -o-transform: scale(0.93);
    -ms-transform: scale(0.93);
  }

  .slide img {
    width: 100%;
    height: 12rem;
    display: block;
    border-radius: 0.2rem;
  }

  .head {
    position: fixed !important;
  }
</style>
