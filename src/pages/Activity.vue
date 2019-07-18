<template>
  <div>
      <c-head>
        <div slot='left' >
            <div class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
        </div>
        <p slot='center' class='user-title'>我的活动</p>
      </c-head>
        <div >
            <tab :line-width="1" custom-bar-width="0"  @on-before-index-change="switchTabItem">
                <tab-item :selected='item.type==1'    @on-item-click='getData(item.type)' v-for='(item,index) in tabList' :key='index'
                :class="{'vux-1px-l':item.type>0}">
               {{item.name}}
              </tab-item>
            </tab>
        </div>
        <div>
          <panel :list="list" type="1" @on-img-error="onImgError">
          </panel>
        </div>

  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      tabList:[{name:"已关注",type:"1"},{name:"已报名",type:"2"}],
      list: [],
    }
  },
  created(){

  },
  watch:{},
  computed:{},
  methods:{
    switchTabItem (index) {
      this.$vux.loading.show({
        text: 'loading'
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.index01 = index
      }, 1000)
    },
    turnUp:function(){
      this.$router.go(-1);
    },
    onImgError (item, $event) {
    },
    getData:function(index){
      if(index===1){
        this.myAct();
      }
      if(index===2){
        this.myAddAct();
      }
    },
    myAddAct:function(){
      let param = {
        pageNumber: 1,
        pageSize: 20
      };
      this.$axios.get("/api/v2/activityApply",{
        params:param,
        headers: {
            'token' : localStorage.getItem("token")
        }
      }).then(res=> {
        this.list = res.data.data.list;
        let a = JSON.stringify(this.list)
        .replace(/actImg/g,"src")
        .replace(/activeName/g,"title")
        .replace(/shortDesc/g,"desc");
        this.list = JSON.parse(a);
        this.handleData(this.list);
      }).catch(err=> {
      });
    },
    myAct:function(){
      let that = this;
      let param = {
        pageNumber: 1,
        pageSize: 20
      };
      if(localStorage.token){
        this.$axios.get("/api/v2/activityCollections",{
          params:param,
          headers: {
            'token' : localStorage.getItem("token")
          }
        }).then(res=> {
          this.list = res.data.data.list;
          let a = JSON.stringify(this.list)
            .replace(/actImg/g,"src")
            .replace(/activeName/g,"title")
            .replace(/shortDesc/g,"desc");
          this.list = JSON.parse(a);
          this.handleData(this.list);
        }).catch(err=> {
         /* this.$vux.loading.show({
            text: '登录超时，请重新登录'
          });
          setTimeout(() => {
            this.$vux.loading.hide();
            that.$router.push({name:'login',query:{redirect:'/mine/act'}});
          }, 1000)*/
        });
      }else{
        this.$vux.loading.show({
          text: '请登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          that.$router.push({name:'login',query:{redirect:'/mine/act'}});
        }, 1000)
      }

    },
    handleData: function(data) {
      data.forEach((val, index, arr) => {
        val.fallbackSrc =
          "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        val.url = `/home/activity/detail/${val.id}`;
        if (val.src === null) {
          val.src = "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        }
      });
    },
  },

  mounted(){
    this.myAct();
  }
}
</script>
<style lang="less" scoped>
.user-title{
    font-size:18px;
    color:#fff;
    text-align: center;
}
.user-main p{
    font-size:14px;
    color:#666;
}
.outLogin{
    display:block;
    background: #fff;
    color:#F93B3B;
    line-height: 44px;
    font-size:14px;
    text-align: center;
}
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-14.5px);
    height:25px;
    border-color:#eee;
  }
  .weui-panel:before{
      display:none;
  }
.media-box_hd{
  width: 100%;
  height: 100%;
}
.media-box_hd img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}
</style>
