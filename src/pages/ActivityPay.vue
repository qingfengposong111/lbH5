<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">支付</p>
    </c-head>
    <div class="act-main">
      <p class="til">产品信息</p>
      <group :gutter='10'>
        <cell  >
          <p slot='title'>
            <span style="color:#000;font-size: 16px;">{{fac}}</span>
            <span style="display:block;font-size: 14px;">{{tname}}</span>
            <span style="display:block;font-size: 14px;">产品报名费</span></p>
          <p style="color:#e4393c;">￥{{money}}</p>
        </cell>
      </group>
      <p class="til">选择支付方式</p>
      <div>
        <div class="labels" @click="selec">
          <div class="shop" slot='title'>
            <div style="display:flex;justify-content: flex-start;align-items:center;">
              <img width="32" style="margin-right:10px;" src="/static/icon_WeChat@2x.png" alt="">
              <div>
                <span style="display:block;">微信支付</span>
                <span style="display:block;">亿万用户的选择，更快更安全</span>
              </div>
            </div>
          </div>
          <div class="sel-input">
            <span><span class="c" ><input  class="pays" name="pays" id="wx"  type="radio" ><label for="wx" class="label" :class="{label2:!fs}" @click=""   ></label></span></span>
          </div>
        </div>
        <div class="labels" @click="selec">
          <div class="shop" slot='title'>
            <div style="display:flex;justify-content: flex-start;align-items:center;">
              <img width="32" style="margin-right:10px;" src="/static/icon_Alipay@2x.png" alt="">
              <div>
                <span style="display:block;">支付宝</span>
                <span style="display:block;">数亿用户都在使用，安全可托付</span>
              </div>
            </div>
          </div>
          <div class="sel-input">
            <span><span class="c" ><input  class="pays" name="pays"  id="zf" type="radio" ><label for="zf" class=" label" @click="" :class="{label2:fs}" ></label></span></span>
          </div>
        </div>
      </div>
      <!--<group class="pay" title="选择支付方式">
        <radio checked  :options="radio" ></radio>
      </group>-->
    </div>
    <div class="subs" @click="submit">支付￥{{money}}</div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    props:{},
    data(){
      return {
        areaId: '',
        list: [],
        type:'',
        fac:this.$route.params.tip,
        money:this.$route.params.money,
        fs: false,
        tname:this.$route.params.tm
      }
    },
    computed:{
      getNameid () {
        return this.$store.state.name_id;
      }
    },
    created(){
    },
    methods: {
      turnUp: function () {
        this.$router.go('-1');
      },
      selec () {
        this.fs=!this.fs;
      },
      submit () {
        let that = this;
        if(this.fs===false){
          this.type = 1;
        }
        if(this.fs===true){
          this.type = 2;
        }
        // 获取初始信息
        let app=navigator.appVersion;
        //    根据括号进行分割
        let left=app.indexOf('(');
        let right=app.indexOf(')');
        let str=app.substring(left+1,right);
        let Str=str.split(";");
        // 手机型号--苹果 iPhone
        let Mobile_Iphone=Str[0];
        // 手机型号--安卓
        let Mobile_Android=Str[2];
        // 红米手机等特殊型号处理 匹配字符
        let res=/Android/;
        let reslut=res.test(Mobile_Android);
        // 根据设备型号判断设备系统
        let xh = str.slice(0,str.indexOf(';')),bb='',cc = '';
        if(xh==='iPhone'){
          bb = Mobile_Iphone+Str[1].substring(4,19);
          cc ='IOS';
        }else if(xh==='Linux'){
          bb = Str[4].substring(0,9)+Str[2];
          cc = 'Android'//系统名称
        }
        let dd = bb.slice(-4);//系统版本号
        this.$axios.post('api/v2/prepay',{
          activity_id:this.$route.params.aid,
          package_id:this.$route.params.tid,
          m_id: localStorage.id,/*用户 */
          device_info:JSON.stringify({
            appVersion:app.slice(0,4),//应用版本名称
            appBuildVersion:"",//应用版本号
            carrier:"",//运营商
            /*network:navigator.connection.effectiveType,//网络*/
            uuid:"",//设备标识符
            deviceModel:cc+dd,//设备型号
            systemName: cc,//系统名称，IOS或Android
            systemVersion:dd,//系统版本号
            locale:navigator.language,//系统语言
            from: 'web'
          }),
          pay_type:''+this.type,
          type:0,
          remark: JSON.stringify({
            name:this.$store.state.activityName,
            tel:this.$store.state.tel
          })
        },{
          headers: {
            'token':localStorage.token
          }
        })
          .then(res =>{
            location.href= res.data.data.pay_url;
            /*this.$router.push('/mine/MyOrder')*/
          })
          .catch(err =>{
            /*let that = this;
            this.$vux.loading.show({
              text: '登录超时，请重新登录'
            });
            setTimeout(() => {
              that.$vux.loading.hide()
              that.$router.push({name:'login',query:{redirect:'/home/Pay/'+that.$route.params.aid+'/'+that.$route.params.tid+'/'+that.$route.params.tip+'/'+that.$route.params.tm+'/'+that.$route.params.money}});
            }, 1000)*/
          })


      }
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .sel-input{
    width: 20px;
    height: 20px;
    position:relative;
  }
  .pays{
    position:absolute;
    width: 12px;
    height: 12px;
    left:-1px;
    opacity:0;
    cursor:pointer;
  }
  span.c {
    position: relative;
    cursor:pointer;
    display: block;
    width: 12px;
    height: 12px;
    margin-right:10px;
    border:1px solid #ccc;
    /*margin: 20px 100px;*/
  }
  span.c label{
    width: 12px;
    cursor:pointer;
    height: 12px;
    position: absolute;
    top: 0;
    left:0;
    z-index:1000;
  }
  span.c .label::after {
    content: '';
    opacity: 0;
    position: absolute;
    width: 7px;
    height: 4px;
    background: transparent;
    top: 1px;
    left: 1px;
    border: 3px solid #666;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .label2::after {
    opacity: 1!important;
  }
  .labels{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    background: #fff;
    border-bottom:1px solid #e9e9e9;
  }
  div.subs{
    display:block;
    width: 90%;
    background: linear-gradient(to right, #A1FED6, #13C3B5);
    color:#fff;
    height: 44px;
    line-height: 44px;
    font-size:14px;
    text-align: center;
    margin:10px auto;
    border-radius:22px;
    position:absolute;
    left:5%;
    bottom:5%;
    cursor:pointer;
  }
  .til{
    padding:0 15px;
    font-size: 12px;
    color:#999;
    margin:10px 0;
  }
  .shop span{
    display:block;
  }
  .shop span:first-child{
    font-size: 16px;
    color:#000;
  }
  .shop span:last-child{
    font-size: 12px;
    color:#999;
  }
  .home-act{
    background: #FAFAFA;
    width: 100%;
    height: 100%;
    position:relative;
  }
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#eee;
  }
  .act-main{
    padding:44px 0 0;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
</style>
