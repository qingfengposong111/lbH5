<template>
  <div style="width: 100%;height: 100%;position:relative;">
      <c-head>
        <div slot='left' >
            <div class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
        </div>
        <p slot='center' class='user-title'>设置</p>
      </c-head>
        <div class='user-main'>
          <group :gutter='0' style="padding-top:50px;">
            <cell is-link>
                <p slot='title'>清除缓存</p>
            </cell>
          </group>
          <group :gutter='10'>
            <cell is-link @click.native="feedback">
              <p slot='title'>意见反馈</p>
            </cell>
          </group>
            <group :gutter='15'>
                 <cell  >
                    <p slot='title'><span>当前版本</span> </p>
                   <p>{{appName}}</p>
                </cell>
                 <cell is-link @click.native="about">
                    <p slot='title'>关于</p>
                </cell>
            </group>

            <div style="">
                <router-link to='' @click.native='outLogin' class='outLogin' :style="out">退出登陆</router-link>
            </div>

        </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      out:'',
      appName: '',
      type: ''
    }
  },
  watch:{},
  computed:{},
  methods:{
    turnUp:function(){
      this.$router.go(-1);
    },
    outLogin(){
      localStorage.clear();
      this.out='display:none'
    },
    feedback () {
      this.$router.push('/mine/Feedback')
    },
    about () {
      this.$router.push('/mine/About');
    },
    version () {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(isAndroid){
        this.type = 1;
      }else if(isiOS){
        this.type = 2;
      }
      this.$axios.get('api/v2/appVersionInfo',{
        params: {
          type: this.type
        }
      })
        .then (res => {
          this.appName = res.data.data.appName;
        })
    }
  },
  created(){
    this.version();
  },
  mounted(){
    if(localStorage.getItem("token")==null){
      this.out='display:none';
    }
  }
}
</script>
<style lang="less" scoped>

.user-title{
    font-size:18px;
    color:#fff;
    text-align: center;
}
.user-main{
  background: #F7F7FA;
  width: 100%;
  height: 100%;
}
.user-main p{
    font-size:14px;
    color:#666;
}
.outLogin{
    display:block;
    width: 90%;
    background: linear-gradient(to right, #A1FED6, #13C3B5);
    color:#fff;
    line-height: 44px;
    font-size:14px;
    text-align: center;
    margin:30px auto;
    border-radius:5px;
}

</style>
