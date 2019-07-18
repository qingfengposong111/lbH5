<template>
  <div class="login">
    <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title" >
          <span v-if="!loginOrRegister">登录</span>
          <span v-if="loginOrRegister">注册</span>
        </div>
        <div slot="right" class="right" @click="chose">
          <router-link v-if="loginOrRegister" to="/home/login/">登录</router-link>
          <router-link v-if="!loginOrRegister" to="/home/login/Register">注册</router-link>
        </div>
    </c-head>
    <router-view></router-view>
    </div>
</template>


<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        loginOrRegister:false
    }
  },
  watch:{},
  computed:{},
  methods:{

    turnUp: function() {
      this.$router.go(-1);
    },
    chose () {
      this.loginOrRegister = !this.loginOrRegister;
    }
  },
  created(){},
  mounted(){
  }
}
</script>
<style lang="less" scoped>
  .right a{
    color:#fff;
    font-size: 14px;
  }

</style>
