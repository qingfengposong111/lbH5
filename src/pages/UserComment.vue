<template>
  <div>
    <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title">用户评论</div>
    </c-head>
      <div class="sup-nav">
        <tab :line-width="1" custom-bar-width="80px"  @on-before-index-change="switchTabItem">
            <tab-item selected >
                <router-link class="tab-act" to='/home/activity/userComment/commentAll'  >
                    全部({{num}})
                </router-link>
            </tab-item>
            <tab-item  class="vux-1px-l">
                <router-link class="tab-act" to='/home/activity/userComment/commentMap'>
                    晒图
                </router-link>
                </tab-item>
            <tab-item  class="vux-1px-l">
                    <router-link class="tab-act" to='/home/activity/userComment/commentLessVal'>
                    低分
                </router-link>
            </tab-item> <tab-item  class="vux-1px-l">
                <router-link class="tab-act" to='/home/activity/userComment/commentAll'>
                 最新
            </router-link>
            </tab-item>
        </tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      num: localStorage.all
    }
  },
  computed:{},
  methods:{
    turnUp: function() {
      this.$router.go('-1');
    }, switchTabItem (index) {
      this.$vux.loading.show({
        text: 'loading'
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.index01 = index
      }, 1000)
    }},

  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#eee;
  }
.tab-act{
    color:#5EE2C6;
    display:block;
    width:100%;
    height:100%;
    font-size:12px;
}
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .sup-nav{
    position:fixed;
    top:44px;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
</style>
