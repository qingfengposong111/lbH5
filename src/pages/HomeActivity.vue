<template>
  <div class='home-act'>
      <div class='head'>
        <flexbox :gutter='9.5'>
            <flexbox-item :span="16/125" >
            <div  class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
            </flexbox-item>
            <flexbox-item :span="4/5">
                <div @click="goSearch"><c-search placeholder="搜索活动名称/类型" ></c-search></div>
            </flexbox-item>
        </flexbox>
      </div>
        <div class="tabs" style="">
            <tab :line-width="1" custom-bar-width="100px"  @on-before-index-change="switchTabItem">
                <tab-item selected  @on-item-click="allItems">全部</tab-item>
                <tab-item  class="vux-1px-l" @on-item-click="haveInHand">报名中</tab-item>
                <tab-item class="vux-1px-l" @on-item-click="over">已结束</tab-item>
            </tab>
        </div>
        <div class="act-main">
             <router-link :to="'/home/activity/detail/'+item.id" :key="index" class="act-box" v-for="(item,index) in list">
                <div class="act-banner">
                    <img :src="item.actImg" alt="">
                </div>
                <flexbox :gutter="3">
                    <flexbox-item :span='11/13'> <h4 class="act-title">{{item.activeName}}</h4></flexbox-item>
                    <flexbox-item :span='2/13'><div class="act-status" :class="{'act-end': item.isEnd===3}"><p><span v-if="item.isEnd===1">报名中</span>
                      <span v-if="item.isEnd===2">进行中</span>
                      <span v-if="item.isEnd===3">已结束</span></p></div></flexbox-item>
                </flexbox>
                <div class="act-foot">
                    <flexbox>
                        <flexbox-item :span='1/3'><div><p>活动时间：{{item.startTime|formatDate}}</p></div></flexbox-item>
                        <flexbox-item :span='2/5'>
                        <flexbox>
                            <flexbox-item >
                                <flexbox :gutter="0">
                                    <flexbox-item :span='2/7'> <div class="act-icon"><img src="/static/icon_grey_eyes.png" alt=""></div></flexbox-item>
                                    <flexbox-item :span='5/7'><p>{{item.readNum}}</p> </flexbox-item>
                                </flexbox>
                            </flexbox-item>
                            <flexbox-item >
                                <flexbox :gutter="0">
                                    <flexbox-item :span='2/7'> <div class="act-icon"><img src="/static/icon_grey_comments.png" alt=""></div></flexbox-item>
                                    <flexbox-item :span='5/7'><p>{{item.comNum}}</p> </flexbox-item>
                                </flexbox>
                            </flexbox-item>
                        </flexbox>
                        </flexbox-item>
                    </flexbox>
                    </div>
            </router-link>
        </div>
  </div>
</template>

<script>
  export default {
  components:{},
  props:{},
  data(){
    return {
      areaId: '',
      list: []
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
  watch:{},
  computed:{
  },
  created(){
    /*localStorage.all = '';*/
    this.allItems();
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
      turnUp: function () {
        this.$router.push('/home');
      },
      allItems() {
        let _that = this;
        this.$axios.get('/api/v2/findYxwActivityList')
          .then(res => {
            _that.list = res.data.data.list;
          })
          .catch(err => {
          })
      },
      haveInHand() {
        this.list = [];
        this.$axios.get('/api/v2/findYxwActivityList', {
          params: {
            sType: 1,
            areaId: this.areaId
          }
        })
          .then(res => {
            this.list = res.data.data.list;
          })
          .catch(err => {
            console.log(err);
          })
      },
      over() {
        this.list = [];
        this.$axios.get('/api/v2/findYxwActivityList', {
          params: {
            areaId: this.areaId,
            sType: 3
          }
        })
          .then(res => {
            this.list = res.data.data.list;
          })
          .catch(err => {
          })
      },
      goSearch: function () {
        this.$router.push('/home/activity/search')
      },
      goDetail(id) {
        this.$router.push({name: 'HomeActivityDetail', params: {id: id}});
        localStorage.id = this.$route.params.id;
      }
    },
  mounted(){}
}
</script>
<style lang="less" scoped>
.home-act{
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
      padding:88px 15px 0;
  }
  .act-box{
      padding-top:15px;
      display:block;
  }
  .act-banner{
      width:100%;
      height:175px;
      border-radius: 3px;
  }
  .act-banner img{
      width:100%;
      height:100%;
      border-radius: 5px;
  }
.act-title{
   font-size:16px;
   color:#666;
   line-height: 29px;
   font-weight: normal;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
 }
.act-status{
    width:44px;
    height:16px;
    background:#FC4D4D;
    border-radius: 8px;
}
.act-status p,
.act-end p{
    color:#fffefe;
    font-size: 10px;
    text-align: center;
    line-height: 16px;
}
.act-end{
    background:#ccc;
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
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .tabs{
    margin-top: 44px;
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
</style>
