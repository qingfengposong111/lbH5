<template>
  <div style="background: #eee;">
    <!-- 头部 -->
    <c-head>
      <div slot="left" class="head-left" style="margin-left:2px!important;">
        <router-link style="display:flex;align-items:center;width: 60px;" to='/home/location'>
          <span>{{nowCity||city}}</span>
          <i class='choose-icon' style="margin-left:0px;margin-top:5px;"></i>
        </router-link>
      </div>
      <div slot="center" :class="{width:!showLogin}" @click="goSearch">
        <c-search placeholder="搜索幼儿园/培训机构/俱乐部等"></c-search>
      </div>
      <div slot='right' v-if="showLogin">
        <router-link to='/home/login'><p class='login'>登陆</p></router-link>
      </div>
    </c-head>
    <div style="position:relative;top:45px;">
      <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div>
        <c-swiper :type='0' style=''>
          <div class="nav">
            <flexbox :gutter="0">
              <flexbox-item>
                <a @click="onlineSchool">
                  <div class="nav-icon">
                    <img src="/static/home_btn_choose.png">
                  </div>
                  <p>
                    <span style="color:#6BB2FF;">择校</span>
                  </p>
                </a>
              </flexbox-item>
              <flexbox-item>
                <router-link to='/home/fine'>
                  <div class="nav-icon">
                    <img src="/static/home_btn_institutions.png">
                  </div>
                  <p>
                    <span style="color:#FABA7A;">优秀机构</span></p>
                </router-link>
              </flexbox-item>
              <flexbox-item>
                <router-link to='/home/activity'>
                  <div class="nav-icon">
                    <img src="/static/home_btn_activity.png">
                  </div>
                  <p><span style="color:#EE8A8B;">亲子活动</span></p>
                </router-link>
              </flexbox-item>
              <flexbox-item>
                <a href="https://www.labiyouxue.com/article/1">
                  <div class="nav-icon">
                    <img src="/static/home_btn_daily.png">
                  </div>
                  <p><span style="color:#FDAA7D;">宝宝日常</span></p>
                </a>
              </flexbox-item>
              <flexbox-item>
                <a href="https://www.labiyouxue.com/article/2">
                  <div class="nav-icon">
                    <img src="/static/home_btn_integral.png">
                  </div>
                  <p><span style="color:#EB8EFB;">积分入学</span></p>
                </a>
              </flexbox-item>
            </flexbox>
          </div>
        </c-swiper>
        <div class="popular" style="border-bottom:1px solid #e4e4e4;">
          <flexbox>
            <flexbox-item>
              <p>优学课</p>
            </flexbox-item>
            <flexbox-item>
              <div class="more">
                <router-link class="batch" to='' @click.native="batch">
                  <img src="/static/batch.png" alt="">
                  <span>换一批</span>
                </router-link>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="bestLesson">
          <ul class="order_list">
            <router-link tag="li" v-for="(b_item, index_b) in best" :key="index_b" :to="'/school/CoursewareDetail/'+b_item.productId">
              <div class="both_lr">
                <div class="left_img">
                  <img :src="b_item.productImg" alt="">
                </div>
                <div class="right_contain">
                  <p class="main-title">{{b_item.productName}}</p>
                  <p class="main-middle">
                    <img width="12" src="/static/icon_grey_positioning.png">
                    <span>{{b_item.distance}}</span> <b v-if="b_item.distance!=null">|</b> <span>{{b_item.name}}</span>
                  </p>
                  <p class="price">
                    ￥{{ b_item.promotePrice | yuan }}
              </p>
                </div>
              </div>
            </router-link>
          </ul>
          <router-link class="moreLesson" to="/home/moreLesson">更多优质课程...</router-link>

        </div>
        <div class="popular">
          <flexbox>
            <flexbox-item>
              <p>热门推荐</p>
            </flexbox-item>
            <flexbox-item>
              <div class="more">
                <router-link to='/home/popular'>
                  <span>更多</span>
                  <x-icon type="ios-arrow-forward" size="12"></x-icon>
                </router-link>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
          <div class="popular-content">
            <div @click="outline(index_a)" class="popular-box" :class="{addbg:temp.status===3}"
                 v-for="(temp,index_a) in dataList" :key="index_a">
              <p class="pop-title">{{temp.title}}</p>
              <flexbox :gutter="15">
                <flexbox-item :span="10/23">
                  <div class="popular-img">
                    <img :src="temp.imgUrl" alt="">
                  </div>
                </flexbox-item>
                <flexbox-item :span="12/23">
                  <div class="text-box">
                    <flexbox orient="vertical" :gutter="20">
                      <flexbox-item :span="3/5">
                        <p class="text">{{temp.describes}}</p>
                      </flexbox-item>
                      <flexbox-item :span="3/5">
                        <flexbox>
                          <flexbox-item>
                            <p class="date">17-06-28</p>
                          </flexbox-item>
                          <flexbox-item>
                            <flexbox :gutter='2'>
                              <flexbox-item :span="5/7"><p class="count">{{temp.readNum}}</p></flexbox-item>
                              <flexbox-item>
                                <div class="eye"><img src="/static/icon_eyes.png" alt=""></div>
                              </flexbox-item>
                            </flexbox>
                          </flexbox-item>
                        </flexbox>
                      </flexbox-item>
                    </flexbox>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>

          </div>

      </div>
      </mescroll-vue>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  .head-left {
    padding-right: 4px;
    // width: 29px;
    // height: 29px;
    text-align: right;
    border-radius: 5px; /*按钮的圆角弧度*/
    position: relative;
  }

  .head-left .vux-x-icon {
    position: absolute;
    right: -4px;
    top: 8px;
    fill: #fff;
  }

  .vux-button-tab-item {
    border: none;
    background: transparent;
    color: #fff;
    line-height: 19px;
    font-size: 12px;
  }

  .vux-button-tab-item:after {
    border: none;
  }

  .vux-button-group {
    border: none;
  }

  .head-left span,
  .login {
    color: #fff;
    font-size: 14px;
  }

  .login {
    text-align: center;
    font-size: 14px;
  }

  .head-left ul {
    position: absolute;
    top: 0;
  }

  .head {
    position: fixed !important;
    left: 0;
    top: 0;
  }

  .nav {
    padding: 0 15px;
  }

  .nav a {
    width: 100%;
    height: 100%;
    text-align: center;
    display: block;
  }

  .nav p {
    font-size: 0.75rem;
  }

  .nav-icon {
    width: 41px;
    height: 41px;
    display: inline-block;
  }

  .nav-icon img {
    width: 100%;
    height: 100%;
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

  .more a {
    color: #cccccc;
    vertical-align: middle;
    text-align: right;
  }

  .popular-content {
    background: #fff;
    padding-bottom: 44px;
  }

  .popular-box {
    display: block;
    height: 150px;
    width: 100%;
    padding: 10px 15px;
    background: #fff;
    border-top: 1px solid #eeeeee;
  }

  .addbg {
    background: url("/static/icon_recommended.png") no-repeat;
    background-position: 100% 0;
    background-size: 47px 47px;
  }

  .popular-box > p {
    font-size: 16px;
    color: #666666;
    margin-bottom: 5px;
  }

  .popular-img {
    width: 100%;
    height: 100px;
  }

  .popular-img img {
    width: 100%;
    height: 100%;
  }

  .popular-box .text {
    font-size: 12px;
    color: #666666;
  }

  .text-box {
    width: 100%;
    padding-top: 5px;
    height: 100px;
  }

  .eye {
    width: 20px;
    height: 20px;
  }

  .eye img {
    width: 100%;
    height: 100%;
  }

  .date {
    font-size: 12px;
    color: #666666;
  }

  .count {
    font-size: 12px;
    color: #fc8989;
    text-align: right;
  }

  .pop-title {
    width: 96%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px !important;
    color: #000 !important;
    font-weight: 500;
  }

  .text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .width {
    width: 115%;
  }

  ul.order_list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px;
  }

  .order_list li {
    width: 32%;
    height: 140px;
    background: #fff;
    border-radius: 6px;
    padding: 0 2px;
    margin: 0 2px 10px 1px;
    overflow: hidden;
    box-shadow: 0 0 5px #EAEAEA;
  }

  .order_list li .left_img {
    width: 100%;
    height: 80px;
    overflow: hidden;
  }

  .left_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .right_contain {
    width: 100%;
  }

  .main-title {
    width: 100%;
    font-size: 14px;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main-middle {
    width: 100%;
    display: flex;
    font-size: 12px;
    color: #999;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main-middle span:nth-child(2) {
    margin-right: 3px;
  }

  .main-middle span {
    margin-left: 3px;
  }

  .price {
    color: #5EE2C6;
    font-size: 14px;
  }

  .bestLesson {
    background: #fff;
  }

  .moreLesson {
    text-align: center;
    display: block;
    padding-bottom: 20px;
    font-size: 14px;
    color: #FF3434;
  }

  b {
    font-weight: normal;
  }

  .batch {
    width: 80px;
    height: 44px;
    text-align: right;
    color: #5EE2C6 !important;
  }

  .batch img {
    width: 16px;
    vertical-align: -3px;
  }

  .choose-icon {
    display: inline-block;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-top: 5px solid #fff;
  }
</style>
<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    components: {
      MescrollVue
    },
    props: {},
    data() {
      return {
        autoFixed: false,
        selected: 3,
        select: 4,
        nowCity:localStorage.selectCityName!=null?localStorage.selectCityName.slice(0,3):'',
        city: '',
        type: '5',
        info: [],
        alist: [],
        arr: [],
        lat: '',
        lng: '',
        citys: '',
        best: [],
        count: 0,//换一换点击次数
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 20 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- 加载完成 --</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          empty: {//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
            tip: "暂无相关数据~" //提示
          }
        },
        dataList: [],
        showLogin: false
      };
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
      }
    },
    watch: {},
    computed: {
      getCity () {
        return this.$store.state.city;
      }
    },
    methods: {
      /*择校*/
      onlineSchool () {
        this.$router.push('/home/homeSearchMain')
      },
      //换一批功能
      batch () {
        this.lesson();
      },
      getLocation: function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            this.showPosition
          );
        }
      },
      goSearch: function () {
        this.$router.push("/school/search");
      },
      showPosition: function (position) {
        let lat = position.coords.latitude; //纬度
        let lag = position.coords.longitude; //经度
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', lag)
      },
      //主页课程
      lesson () {
        this.$axios.get('api/v2/indexLessons', {
          params: {
            city: localStorage.selectCityId||localStorage.itselfId,
            longitude: localStorage.longitude,
            latitude: localStorage.latitude
          }
        })
          .then(res => {
            this.best = res.data.data;
          })
      },

      //外部链接
      outline (index) {
        location.href = 'https://' + this.arr[index];
      },
      //热门推荐
      mescrollInit (mescroll) {// mescroll组件初始化的回调,可获取到mescroll对象
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback (page, mescroll) {// 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        this.$axios.get('/api/v2/popularRecommend', {// 请求的列表数据
          params: {
            pageSize: page.size,
            pageNumber: page.num
          }
        }).then((response) => {
          let arr = response.data.data.list;
          for (let j = 0; j < arr.length; j++) {
            let ls = arr[j].url.slice(arr[j].url.indexOf('www')).replace(/%2F/g, '/');
            this.arr.push(ls)
          }
          if (page.num === 1) this.dataList = [];// 如果是第一页需手动制空列表
          this.dataList = this.dataList.concat(arr);// 把请求到的数据添加到列表
          this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
            mescroll.endSuccess(arr.length)
          })
        })
      }
    },
    created() {
      if (localStorage.token) {
        this.showLogin = false;
      } else {
        this.showLogin = true;
      }
      this.city = this.$store.state.city;
      this.$axios.get(this.$api.activity.getAdvImg, {
        params: {
          id: 0,
          type: 0
        }
      })
        .then(res => {
          let len = res.data.data.length;
          for (let i = 0; i < len; i++) {
            this.info.push(res.data.data[i]);
          }
        })
        .catch(err => {
        });

      AMap.plugin("AMap.CitySearch", () => {
        let citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            this.city = result.city;
            localStorage.itself = result.city;
            localStorage.itselfId = result.adcode;
            localStorage.lat = result.bounds.Jb.lat;
            localStorage.lng = result.bounds.Jb.lng;
          }
        });
      });
      this.lesson();
    },
    mounted() {
      this.getLocation();
    }
  };
</script>
