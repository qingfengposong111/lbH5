<template>
  <div>
    <c-head class="head">
      <div slot='left'>
        <div  class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <div slot='center' class="head-title">用户评价</div>
    </c-head>
    <div class="sup-nav">
      <tab :line-width="1" custom-bar-width="80px"  @on-before-index-change="switchTabItem">
        <tab-item selected >
          <router-link class="tab-act" :to="'/home/school/SchoolComment/'+isd+'/SchoolcommentAll'"  >
            全部({{comNum}})
          </router-link>
        </tab-item>
        <tab-item  class="vux-1px-l">
          <router-link class="tab-act" :to="'/home/school/SchoolComment/'+isd+'/SchoolcommentMap'">
            晒图
          </router-link>
        </tab-item>
        <tab-item  class="vux-1px-l">
          <router-link class="tab-act" :to="'/home/school/SchoolComment/'+isd+'/SchoolcommentLessVal'">
            低分
          </router-link>
        </tab-item> <tab-item  class="vux-1px-l">
        <router-link class="tab-act" :to="'/home/school/SchoolComment/'+isd+'/SchoolcommentNew'">
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
        comNum: localStorage.comAll,
        list:[],
        isd: this.$route.params.id
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

    created(){

    },
    mounted(){}
  }
</script>
<style lang="less" scoped>

  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:20px;
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
    position:fixed!important;
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
