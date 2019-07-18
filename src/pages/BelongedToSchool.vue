<template>
  <div>
      <c-head>
        <div slot='left' >
            <div class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
        </div>
        <p slot='center' class='user-title'>所属学校\机构</p>
        <div slot='right' class="add" @click="add">
            添加
        </div>
      </c-head>
      <panel style="margin-top:44px;" :list="list" type="1"  @on-img-error="onImgError">
      </panel>
  </div>
</template>

<script>
export default {
  components:{
  },
  props:{},
  data(){
    return {
      list: []
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
    },
    add () {
        if(localStorage.token){
          this.$router.push('/home/AddBelongSchool')
        }else{
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
        that.$router.push({name:'login',query:{redirect:'/home/AddBelongSchool'}});
      }, 1000)
    },
    getData () {
        if(localStorage.token){
          this.$axios.get("api/v2/schoolBelongShow", {
            headers: {
              'token' : localStorage.getItem("token")
            }
          }).then(res => {
            this.list = res.data.data;
            var a = JSON.stringify(this.list)
              .replace(/imgUrl/g, "src")
              .replace(/name/g, "title")
              .replace(/shortProfile/g, "desc");
            this.list = JSON.parse(a);
            this.handleData(this.list);
          }).catch(err => {
            /*let that = this;
            this.$vux.loading.show({
              text: '登录超时，请重新登录'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
              that.$router.push({name:'login',query:{redirect:'/home/AddBelongSchool'}});
            }, 1000)*/
          });
        }else{
          this.logs();
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
    },
  },
  created(){
    this.getData()
  },
  mounted(){

  }
};
</script>
<style lang="less" scoped>
  .add{
    color:#fff;
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
</style>
