<template>
  <div>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title'>添加</p>
      <div slot='right' class="add" @click="add">
        提交
      </div>
    </c-head>
    <div class="option">
      <group :gutter='10'>
        <cell is-link @click.native="toChoose">
          <p slot='title'>名称</p>
          <p v-if="!pitchobj">请选择</p>
          <p v-if="pitchobj">{{pitchobj.name}}</p>
        </cell>
      </group>
      <group :gutter='10'>
        <cell>
          <p slot='title'>类型</p>
          <p v-if="!pitchobj">--</p>
          <p v-else-if="pitchobj.type===1">学校</p>
          <p v-else-if="pitchobj.type===2">培训机构</p>
          <p v-else="pitchobj.type===3">俱乐部</p>
        </cell>
      </group>
      <group :gutter='10'>
        <cell>
          <p slot='title'>凭证</p>
          <div class="pic">
            <span>+</span>
            <input class="file" @change="getImgBase" type="file">
            <img class="img" :src="img" alt="">
          </div>
        </cell>
      </group>
      <p class="note">*凭证：接送卡、资费单等。</p>
      <p class="note">*确认后无法修改，如有疑问请点击"<a href="tel:(0769)88016191" >客服电话</a>" 进行咨询。</p>
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{},
    data(){
      return {
        list: [],
        img: '',
        pitchobj: {}
      }
    },
    watch:{},
    computed:{
      getPitch () {
        return this.$store.state.pitch;
      }
    },
    methods:{
      //选择学校
      toChoose () {
        this.$router.push('/home/BelongSearch');
      },
      switchTabItem (index) {
        console.log('on-before-index-change', index)
        this.$vux.loading.show({
          text: 'loading'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.index01 = index
        }, 1000)
      },
      getImgBase(){
        let event = event || window.event;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        this.$axios.post('/api/v2/uploadImage',
          param,{
            headers:{"Content-Type":"multipart/form-data"}
          }).then(res=>{
          this.img= "http://qiniu.wantfg.com/"+res.data.data;
        }).catch(err=>{
          console.log(err);
        });
      },
      turnUp:function(){
        console.log('进入');
        this.$router.go(-1);
      },
      add () {
        let that = this;
        if(!this.pitchobj){
          this.$vux.loading.show({
            text: '请选择学校！'
          });
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 1000)
          return false;
        }else if(this.img===''){
          this.$vux.loading.show({
            text: '请上传凭证！'
          });
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 1000);
          return false;
        }else {
          this.$axios.post('api/v2/schoolBelongCommit',{
              sId:this.pitchobj.sId,
              imgUrl:this.pitchobj.imgUrl,
              type:this.pitchobj.type
            },
            {
              headers:{
                'token':localStorage.token
              }
            })
            .then(res =>{
              this.$router.push('/mine/belongedToSchool')
            })
        }

      }


    },
    created(){
      let pitchobj = this.$store.state.pitch;
      this.pitchobj =pitchobj;
    },
    mounted(){}
  };
</script>
<style lang="less" scoped>
  .img{
    position:absolute;
    top:0;
    left:0;
    /*background: #fff;*/
    width: 70px;
    height: 70px;
  }
  .add{
    color:#fff;
  }
  .note{
    font-size: 12px;
    color:#10AEFF;
    padding:4px 15px;
  }
  .note a{
    color:#e4393c;
  }
  .option{
    font-size: 14px;
    color:#666;
    padding-top:44px;
  }
  .pic{
    width: 72px;
    height: 72px;
    border:1px dashed #ccc;
    line-height: 70px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    box-sizing:border-box;
    color:#bbb;
    position:relative;
  }
  .file{
    display:block;
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    width: 70px;
    height: 70px;
    opacity:0;
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

