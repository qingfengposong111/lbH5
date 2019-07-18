<template>
  <div class='com-detail'>
    <div class='head'>
      <flexbox :gutter='0'>
        <flexbox-item :span="1/5" >
          <div  class="return" @click='turnUp'>
            <img src="/static/btn_return.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item :span="3/5">
          <p class="head-title">意见反馈</p>
        </flexbox-item>
        <flexbox-item :span="1/5">
          <div class='submit' @click="submit">
            提交
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class='sch-det'>
      <div class='write-com'>
        <textarea name="" id="textarea" v-model="textarea"  placeholder="有什么不满意的，尽情的吐槽吧~"></textarea>
      </div>
    </div>
    <div class="contact">
      <input type="text" v-model="phone" id="phone" placeholder="联系方式（可选）">
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{},
    data(){
      return {
        phone: '',
        textarea: ''
      }
    },
    watch:{},
    computed:{},
    methods:{ turnUp:function(){
        this.$router.go(-1);
      },
      submit () {
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
        this.$axios.post('/api/v2/feedback',{
          deviceInfo:JSON.stringify({
            appVersion:app.slice(0,4),//应用版本名称
            appBuildVersion:"",//应用版本号
            carrier:"",//运营商
            /*network:navigator.connection.effectiveType,//网络*/
            uuid:"",//设备标识符
            deviceModel:cc+dd,//设备型号
            systemName: cc,//系统名称，IOS或Android
            systemVersion:dd,//系统版本号
            locale:navigator.language,//系统语言
            }),
            content:this.textarea
          },
          {
            headers: {
              'token': localStorage.token
          }
        })
          .then(res => {
            if(this.textarea!=''){
              this.$vux.loading.show({
                text: '提交成功'
              });
              setTimeout(() => {
                this.$vux.loading.hide()
              }, 1000)
              this.textarea='';
              this.phone='';
            }else{
              this.$vux.loading.show({
                text: '内容不能为空！'
              });
              setTimeout(() => {
                this.$vux.loading.hide()
              }, 1000)
            }
          })
      }
    },
    created(){},
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .com-detail{
    height:100%;
    background: #F8F8F8;
  }
  .add-pic{
    margin-top:15px;
    width:75px;
    height:75px;
    border:1px dashed #ccc;
    border-radius: 2px;
  }
  .add-img{
    width:55px;
    height:50px;
    margin: 0 auto;
  }
  .add-pic img{
    width:100%;
    height:100%;
  }
  .add-pic p{
    font-size:12px;
    color:#ccc;
    text-align: center;
  }
  textarea{
    width:100%;
    height:200px;
    background: #fff;
    padding:10px;
    border:none;
    outline:none;
    resize: none;
    font-size: 16px;
  }

  textarea::placeholder{
    color:#ccc;
  }
  .sch-det{
    background: #fff;
    margin-bottom:20px;
  }
  .submit{
    color:#fff;
    width:60px;
    line-height: 29px;
    text-align: center;
  }
  .contact{
    width: 100%;
    background: #fff;
  }
  .contact input{
    width: 100%;
    height: 40px;
    border:none;
    padding:5px 10px;
    outline:none;
    font-size: 14px;
  }
</style>
