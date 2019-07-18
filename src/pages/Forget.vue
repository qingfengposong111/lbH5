<template>
  <div>
    <c-head>
      <div slot='left'>
        <div  class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <div slot='center' class="head-title" >
        <span>重置密码</span>
      </div>
    </c-head>
    <div class="form-box" style="padding-top:60px;">
      <group :gutter="0">
        <x-input name="mobile" class="mobile" placeholder="请输入您的手机号码" @on-change='getCode' v-model="mobileValue" keyboard="number" is-type="china-mobile"></x-input>
        <x-input   placeholder="短信验证码" keyboard="number" class="weui-vcode" v-model="smsCode">
          <x-button slot="right"
                    class="button" :class="{disabled: !this.canClick}"
                    @click.native="getSmsCode" :style="{'background':backgroundColor,'color':'#fff'}" mini>{{content}}</x-button>
        </x-input>
        <x-input  placeholder="请输入6~18位密码（限字母、数字）" type="password" class="pwd" v-model="pwd"></x-input>
      </group>

      <div style="padding:15px;margin-top:34px;" @click='confire'>
        <x-button :style="{'background':buttonColor,'color':'#fff'}">确认</x-button>
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
        mobileValue:'',
        pwd:'',
        buttonColor:'#ccc',
        backgroundColor:'linear-gradient(#A1FED6, #13C3B5)',
        mobile:"",
        smsCode:"",
        regIp:"",
        lastLoginIp:"",
        recType:0,
        content: '发送验证码',  // 按钮里显示的内容
        totalTime: 60,    //记录具体倒计时时间
        canClick: true, //添加canClick
        accountInfo:""
      }
    },
    watch:{},
    computed:{},
    methods:{
      pwdsOrCode () {
        this.codeShow=!this.codeShow;
      },
      getSmsCode:function(){
        if (this.mobileValue === '') {
          confirm("手机号码不能为空！");
        }else{
          this.backgroundColor='#ccc'
          if (!this.canClick) return
          this.canClick = false
          this.content = this.totalTime + 's后重新发送'
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'
            if (this.totalTime < 0) {
              this.backgroundColor = 'linear-gradient(#A1FED6, #13C3B5)'
              window.clearInterval(clock)
              this.content = '重新发送验证码'
              this.totalTime = 60
              this.canClick = true  //这里重新开启
            }
          },1000);
          this.$axios.get("/api/v2/sendSmsCode/" + this.mobileValue)
            .then(res=>{
              this.code = res.data.data;
              //confirm(res.data.msg);
            }).catch(err=>{
            confirm("发送失败！请稍后再试！");
          });
        }
      },

      confire:function(){
        let reg = /^[0-9A-Za-z]{6,18}$/;
        if(!reg.test(this.pwd)){
          confirm("密码格式错误")
        }
        this.$axios.post('api/v2/forgetPassword',{
          mobile:this.mobileValue,
          smsCode:this.smsCode,
          passwd:this.pwd,
        })
          .then(res => {
            this.$router.push('/home/login')
          })
          .catch(err=>{
            confirm("注册失败");
          });
      },

      turnUp: function() {
        this.$router.go(-1);
      },
      getCode:function(){
        if(this.mobileValue){
          this.buttonColor='linear-gradient(#A1FED6, #13C3B5)'
        }else{
          this.buttonColor='#ccc'
        }
      }
    },
    created(){},
    mounted(){
      /* this.$axios.get('http://192.168.0.115:8083/ip/cityjson?ie=utf-8').then(res=>{
         console.log(res);
       })*/
    }
  }
</script>
<style lang="less" scoped>
  .form-box{
    /*padding-top:54px;*/
  }

  .weui-cell::before{
    display:none;
  }
  .weui-cell:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  input::placeholder{
    color:#ccc;
    font-size:12px;
  }
  .disabled{
    background-color: #ccc;
    border-color: #ccc;
    color:#57a3f3;
    cursor: not-allowed;
  }
  .right{
    color:#fff;
  }
  .bottom{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size: 12px;
    padding:5px 15px;
    color:#666;
  }
</style>
