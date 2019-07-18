<template>
  <div>
      <c-head>
        <div slot='left' >
            <div class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
        </div>
        <p slot='center' class='user-title'>个人资料</p>
      </c-head>
        <div class='user-main'>
            <group :gutter='40'>
                <cell @click.native="imgUpdate($event)" is-link>
                    <p slot='title'>头像</p>
                    <label  for="avatarFile">
                        <img class = "user-img" :src="headImg" width="60" height="60" alt=""/>
                    </label>
                </cell>
                <input id="avatarFile" @change.stop.prevent='update($event)' accept="image/*" name="avatarFile" type="file" style="display:none" multiple>
                <cell is-link @click.native="updateUser('name')" >
                    <p slot='title'>姓名</p>
                    <p >{{name}}</p>
                </cell>
                <cell is-link>
                    <p slot='title'>性别</p>
                    <select class="selected" name="public-choice" v-model="sex" @click="updateUser('sex')">
                      <option :value="coupon.id" v-for="coupon in couponList">
                    {{coupon.name}}</option></select>
                </cell>
                <cell is-link @click.native="updateUser('nickname')">
                    <p slot='title'>昵称</p>
                    <p >{{nickname}}</p>
                </cell>

            </group>
            <group :gutter='10'>
                <cell is-link @click.native="updateUser('mobile')">
                    <p slot='title'>手机</p>
                    <p >{{mobile}}</p>
                </cell>

            </group>

        </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      name:localStorage.getItem('name'),
      headImg:localStorage.getItem("qrcodeImg"),
      nickname:localStorage.getItem("nickname"),
      sex:localStorage.getItem("sex"),
      mobile:localStorage.getItem("mobile"),
      canvas:document.createElement("canvas"),
      updateImg:"",
      couponList:[{id: '0',name: '保密'},
                  {id: '1',name: '男'},
                  {id: '2',name: '女'}]
    }
  },
  watch:{},
  computed:{},
  methods:{
      imgUpdate:function(event){
        document.getElementById('avatarFile').click();
        //document.getElementById('avatarFile').click();
      },
      turnUp:function(){
        this.$router.go(-1);
      },

      update:function(e) {
        let file = e.target.files[0];
        if(!file.type.match(/image.*/)){retrun;}
        let reader = new FileReader();
		    reader.onload = (()=>{
			  return (e)=>{
                let result = e.target.result;
                let img = new Image();
                img.src = result;
                this.headImg=img.src;
                this.cropAndUploadImage(file);

			}
		})(file);

		reader.readAsDataURL(file);
      },
    cropAndUploadImage:function(file){
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
            this.$axios.post('/api/v2/uploadImage',
            param,{
                headers:{"Content-Type":"multipart/form-data"}
                }).then(res=>{
                  this.updateImg = res.data.data;
                  this.headImg = "http://img.labiyouxue.com/" + res.data.data;
                  localStorage.setItem("qrcodeImg", this.headImg);
                  this.updateUser('updateImg');
                }).catch(err=>{
                });
	  },
    updateUser:function(e){
      let truename="";
      if(e==='name'){
        truename=prompt("是否修改姓名?",this.name);
        if(truename===null){
          truename=this.name;
        }
      }else{
        truename=this.name;
      }
      let qrcodeImg="";
      if(e==='updateImg'){
        qrcodeImg=this.updateImg;
      }
      let sex="";
      if ('sex'===e) {
        sex=this.sex;
      }else{
        sex=this.sex;
      }
      let nickname=this.nickname;
      if ('nickname'===e) {
        nickname=prompt("昵称",this.nickname);
        if(nickname===null || nickname===this.nickname){
          return;
        }
      }
      if(nickname===this.nickname){
        nickname=null;
      }
      let mobile = '';
      if(e==='mobile'){
        mobile=prompt("是否修手机号?",this.mobile);
        if(mobile === ''){
          mobile=null
        }
      }
      this.$axios.post('/api/v2/editPersonInfo',
      {
          qrcodeImg:qrcodeImg,
          truename:truename,
          sex:sex,
          nickname:nickname
      },{
         headers: {
            'token': localStorage.getItem("token")
        }
      }).then(res=>{
        if(res.data.code===1){
          if(truename!==''){
            this.name=truename
            localStorage.setItem("name",truename);
          }
          if(nickname!=='' && nickname !==null){
            this.nickname=nickname;
            localStorage.setItem("nickname",nickname);
          }
          if(sex!==''){
            this.sex=sex;
            localStorage.setItem("sex",sex);
          }
          if(qrcodeImg !==''){
            localStorage.setItem("qrcodeImg",this.headImg);
          }
        }

      })
    }
  },
  created(){},
  mounted(){
  }
}
</script>
<style lang="less" scoped>

.selected{
  direction: rtl;
  position: relative;
  background-color: transparent;
  TOP: -2px;
  left:-2px;
  border-width: 0px;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  border-bottom-style: none;
  display:block;
  height: 18px;
  overflow:hidden;
  font-size: 14px;
  color: #666;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
}
.user-title{
    font-size:18px;
    color:#fff;
    text-align: center;
}
.user-img{
    width:60px;
    height:60px;
    vertical-align: middle;
    border-radius:50%;
}
.user-img img{
    width:100%;
    height:100%;

}
.user-main p{
    font-size:14px;
    color:#666;
}
</style>
