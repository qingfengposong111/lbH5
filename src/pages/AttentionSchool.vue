<template>
  <div style="position:relative;width: 100%;height: 100%;">
      <c-head >
        <div slot='left' >
            <div class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
        </div>
        <p slot='center' class='user-title'>关注</p>
      </c-head>
      <div  class='tabs-down'>
          <tab :line-width="1" custom-bar-width="80px"  @on-before-index-change="switchTabItem">
            <tab-item :selected='item.type==0'    @on-item-click='getData(item.type)' v-for='(item,index) in tabList' :key='index'
              :class="{'vux-1px-l':item.type>0}">
             {{item.name}}
            </tab-item>
          </tab>
      </div>
      <panel class="pl" :list="list" type="1" @on-img-error="onImgError">
      </panel>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        tabList: [
          { name: "全部", type: 0 },
          { name: "学校", type: 1 },
          { name: "培训机构", type: 2 },
          { name: "俱乐部", type: 3 }
        ],
         list: [],
        type:''
    }
  },
  watch:{},
  computed:{},
  methods:{
      switchTabItem (index) {
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.index01 = index
      }, 1000)
    },
      turnUp:function(){
      this.$router.go(-1);
    },onImgError (item, $event) {
    },
    logs () {
      let that = this;
      this.$vux.loading.show({
        text: '请先登录'
      });
      setTimeout(() => {
        this.$vux.loading.hide()
        that.$router.push({name:'login',query:{redirect:'/mine/school'}});
      }, 1000)
    },
    getData: function(type) {
      let that = this;
      let param = {
        pageNumber: 1,
        pageSize: 20,
        type: type
      };
      if(localStorage.token){
        this.$axios.get("/api/v2/schoolCollections", {
          params: param ,
          headers: {
            'token' : localStorage.getItem("token")
          }
        }).then(res => {
          this.list = res.data.data.list;
          this.type= type;
          var a = JSON.stringify(this.list)
            .replace(/imgUrl/g, "src")
            .replace(/name/g, "title")
            .replace(/shortProfile/g, "desc");
          this.list = JSON.parse(a);
          this.handleData(this.list);
        }).catch(err => {
          /*this.$vux.loading.show({
            text: '登录超时，请重新登录'
          });
          setTimeout(() => {
            this.$vux.loading.hide();
            that.$router.push({name:'login',query:{redirect:'/mine/school'}});
          }, 1000)*/
        });
      }else{
        this.$vux.loading.show({
          text: '请登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          that.$router.push({name:'login',query:{redirect:'/mine/school'}});
        }, 1000)
      }

    },
    /**
     * 对数据源进行处理
     */
    handleData: function(data) {
      data.forEach((val, index, arr) => {
        val.fallbackSrc =
          "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        val.url = `/school/in/${val.sId}`;
        if (val.src == null) {
          val.src = "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        }
      });
    },
    onImgError(item, $event) {
/*
       console.log(item, $event);
*/
    },
  },
  created(){
    /*if(localStorage.token){*/
      this.getData(0)
    /*}else{
      this.$router.push({name:'login',query:{redirect:'/mine/school'}});
    }*/

  },
  mounted(){}
};
</script>
<style lang="less" scoped>

  .tabs-down,.head{
    width: 100%;
    height: 44px;
    position:fixed;
    left:0;
    top:0;
    z-index:1000;
  }
  .tabs-down{
    top:44px;
  }
  .pl{
    position:absolute;
    top:88px;
    left:0;
  }
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
  .weui-media-box__desc {
    color: #999999;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1!important;
  }
  .pl{
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>
