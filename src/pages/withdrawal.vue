<template>
  <div class="out">
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title'>
        提现
      </p>
    </c-head>
    <div class="top">
      <div class="til">余额</div>
      <div class="money">
        ￥<span>{{balance | yuan}}</span>
      </div>
    </div>
    <div class="done">
      <div class="til " style="padding:20px 0;">提现到支付宝</div>
      <div class="wallet">
        <span style="color:#666;">￥</span>
        <div class="input">
          <input type="number"  v-model="money"  id="val"  v-on:input ="inputFunc" placeholder="输入提现金额">
        </div>
        <span @click="allMoney">全额</span>
      </div>
      <div class="zf">
        <input type="text" v-model="zf"  id="account" placeholder="请输入您的支付宝账号">
      </div>
    </div>
    <div class="tip">* 提现免手续费，预计三个工作日内到账</div>
    <div class="button" @click="goCash" :class="{bgColor:money>0}">
      立即提现
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{},
    data(){
      return {
        balance:'',
        money:'',
        backgroundColor:false,
        zf:'',
        inputValue:''
      }
    },
    filters: {
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    created(){
     this.afe();
    },
    watch:{},
    computed:{},
    methods:{
      turnUp:function(){
        this.$router.go(-1);
      },
      afe(){
        this.$axios.get('/api/v2/showPersonInfo',{
          headers:{
            'token':localStorage.token
          }
        }).then( res =>{
          this.balance = res.data.data.balance;
          if(res.data.data.alipayAccount==null){
              this.zf=''
          }else{
            this.zf = res.data.data.alipayAccount+'';
          }
        }).catch(err =>{

        });
      },
      inputFunc:function (){
        let that = this;
        if(parseFloat(that.money*100)>parseFloat(that.balance)){
          that.$vux.loading.show({
            text: '余额不足！'
          });
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 1000);
          that.money=''
        }
      },
      allMoney:function (){
        this.money = this.balance/100;
      },

      goCash(){
        let that = this;
        let val = document.getElementById('val').value;
        that.inputValue = that.zf;
        if(val==''){
          that.$vux.loading.show({
            text: '请输入提现金额！'
          });
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 1000);
          that.money=''
        }else if(that.zf==''){
          that.$vux.loading.show({
            text: '请输入支付宝帐号！'
          });
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 1000);
        }else{
          that.$axios.post('/api/v2/applyWithdraw',{
            money:+(parseFloat(val)*100).toFixed(0),
            alipayAccount:that.inputValue
          },{
            headers:{
              'token':localStorage.token,
            }
          })
            .then(res=>{
              console.log(res);
              that.$vux.loading.show({
                text: res.data.msg
              });
              setTimeout(() => {
                that.$vux.loading.hide()
              }, 1000);
              that.money='';
              that.afe();
            })
        }
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  body,html,.out{
    background: #f6f6f6;
    width: 100%;
    height: 100%;
  }
  .head{
    position:fixed;
  }
  .user-title{
    font-size:18px;
    color:#fff;
    text-align: center;
  }
  .top{
    padding-top:44px;
    width: 100%;
    text-align: center;
  }
  .til{
    font-size: 14px;
    color:#666;
    padding:36px 0 30px;
    text-align: center;
  }
  .money{
    color:#666;
  }
  .money span{
    font-size: 30px;
    color:#666;
    font-weight: bold;
  }
  .done{
    width: 92%;
    height: 160px;
    background: #fff;
    border:1px solid #eee;
    border-radius:6px;
    box-shadow:0 2px 2px #f6f6f6;
    margin:42px auto 5px;
  }
  .wallet,.zf{
    width: 100%;
    display:flex;
    justify-content: center;
    align-items:center;
  }
  .wallet .input{
    width: 180px;
    margin:0 20px 0 10px;
    border-bottom:2px solid #AFAFAF;
    color:#333;
  }
  .input input{
    width: 100%;
    font-size: 16px;
    padding:4px 0;
    outline:none;
    border:none;
  }
  .wallet span:last-child{
    width: 50px;
    border:2px solid #00B7EE;
    box-shadow:0 0 1px #00B7EE;
    text-align: center;
    color:#00B7EE;
    border-radius:4px;
  }
  .tip{
    font-size: 12px;
    color:#FF6565;
    text-align: center;
    width: 100%;
  }
  .button{
    width: 92%;
    margin:40px auto;
    height: 44px;
    line-height: 44px;
    color:#fff;
    background: #ccc;
    text-align: center;
    border-radius:4px;
  }
  .bgColor{
    background: linear-gradient(to right, #A1FED6,#13C3B5);;
  }
  .static{
    background: #ccc;
  }
  .zf{
    width: 81%;
    margin:10px auto;
    border-radius:4px;
    overflow:hidden;
  }
  .zf input{
    width: 100%;
    height: 40px;
    border:none;
    font-size: 14px;
    background: #eee;
    color:#666;
    padding-left:10px;
    outline:none;
  }
</style>
