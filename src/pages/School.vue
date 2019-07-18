<template>
  <div id="box">
    <!-- 头部 -->
    <c-head class="head">
      <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
      </div>
      <div @click="goSearch" slot='center'><c-search  placeholder="搜索幼儿园/培训机构/俱乐部等"></c-search>  </div>
      <router-link slot='right' to="/home/homeSearchMain" class='filter' >
        <img src="/static/school_btn_screening.png" alt="">
      </router-link>
   </c-head>
    <div class='school-tab'>
      <tab :line-width="1" custom-bar-width="80px"  @on-before-index-change="switchTabItem">
        <tab-item :selected='item.type==1'    @on-item-click='getData(item.type)' v-for='(item,a) in tabList' :key='a'
          :class="{'vux-1px-l':item.type>1}">
         {{item.name}}
        </tab-item>
      </tab>
    </div>
    <mescroll-vue ref="mescroll" class="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <div>
      <c-panel style='margin-top:90px;' :list="list" @on-img-error="onImgError"></c-panel>
    </div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  components: {MescrollVue},
  props: ['id'],
  data() {
    return {
      type: 1,
      nextPage:0,
      list3: ["收到的消息", "发出的消息"],
      tabList: [
        { name: "学校", type: "1" },
        { name: "培训机构", type: "2" },
        { name: "俱乐部", type: "3" }
      ],
      list:[],
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
          warpId: "box", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      }
    };
  },
  watch: {},
  computed: {
      lng(){
          return this.$store.state.position.lng;
      },
      lat(){
          return this.$store.state.position.lat;
      },
      getPanelList () {
        return this.$store.state.homeSearchList;
      },
      getCityid () {
        return this.$store.state.cityId;
      }
  },
  methods: {
    switchTabItem(index) {
      this.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.index01 = index;
      }, 1000);
    },
    onImgError(item, $event) {
    },
    turnUp: function() {
      this.$router.go(-1);
    },
    goSearch: function() {
      this.$router.push("/school/search");
    },
    /**
     * 获取教育机构列表、查询教育机构
     */
    getData: function(type) {
        this.type=type;
      let param = {
        longitude: localStorage.lng,
        latitude: localStorage.lat,
        type: type
      };
      this.$axios.get(this.$api.school.showAll, { params: param }).then(res => {
        this.list = res.data.data.list;
        this.handleData(this.list);
      });
    },
    /**
     * 对数据源进行处理
     */
    handleData: function(data) {
      data.forEach((val, index, arr) => {
        val.fallbackSrc =
          "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        val.url = `/school/in/${val.sId}`;
        if (val.imgUrl == null) {
          val.imgUrl = "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        }
      });
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      if(this.type==1){
        this.$axios.get(this.$api.school.showAll, {// 请求的列表数据
          params: {
            pageSize: page.size,
            pageNumber: page.num,
            longitude: localStorage.lng,
            latitude: localStorage.lat,
            type:1
          }
        }).then((res) => {
          let arr = res.data.data.list;
          this.handleData(arr);
          if (page.num === 1) this.list = [];// 如果是第一页需手动制空列表
          this.list =this.list.concat(arr);// 把请求到的数据添加到列表
          this.$nextTick(() => {// 数据渲染成功后,隐藏下拉刷新的状态
            mescroll.endSuccess(arr.length)
          })
        })
      }else if(this.type==2){
        this.$axios.get(this.$api.school.showAll, {
          params: {
            pageSize: page.size,
            pageNumber: page.num,
            longitude: localStorage.lng,
            latitude: localStorage.lat,
            type:2
          }
        }).then((res) => {
          let arr = res.data.data.list;
          this.handleData(arr);this.handleData(arr);
          if (page.num === 1) this.list = [];
          this.list =this.list.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        })
      }else{
        this.$axios.get(this.$api.school.showAll, {
          params: {
            pageSize: page.size,
            pageNumber: page.num,
            longitude: localStorage.lng,
            latitude: localStorage.lat,
            type:3
          }
        }).then((res) => {
          let arr = res.data.data.list;
          this.handleData(arr);
          if (page.num === 1) this.list = [];
          this.list =this.list.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        })
      }

    },
  },
  created() {
      this.getData(1)
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
  .mescroll {
    position: fixed;
    top: 10px;
    bottom: 0;
    height: auto;
  }
.school-tab{
    position: fixed!important;
    top: 45px;
    width: 100%;
    left: 0;
    z-index: 1000;
}
.filter {
  display: block;
  margin-left:5px;
}
.vux-1px-l:before {
  top: 50%;
  transform: translateY(-13px);
  height: 26px;
  border-color: #eee;
}
.weui-panel {
  margin-top: 0;
}
.weui-panel:before {
  display: none;
}
.tab-act {
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}
  .head{
    position:fixed!important;
    top:0;
    left:0;
    z-index:1000;
  }
</style>
