<template>
  <div class='find-re'>
    <c-head>
      <div slot='left'>
        <div  class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <div slot='right'>
        <router-link to=""><p class='search' :class="{opa:content===''}" @click="send">发布</p> </router-link>
      </div>
    </c-head>
    <div class='write-com'>
      <textarea name="" v-model="content" id="textarea"  cols="30" rows="10" placeholder="写下你对活动的评价吧~"></textarea>
    </div>
    <div style="display:flex;">
      <div class="view"  style="display:inline-block;">
        <ul class="lists">
          <li class="item" v-if="imgs!=''"  v-for="(item, index1) in imgs" :key="index1">
            <span class="cancel-btn" @click="delImg(index1)">x</span>
            <img :src="item">
          </li>
          <li>
            <div class='add-pic' @change="getImgBase()">
              <input type="file" class="input_file">
              <img src="/static/btn_grey_increase.png" alt="">
            </div>
          </li>
        </ul>
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
        imgBase64: [],
        imgs:[],
        content:'',
      }
    },
    watch:{},
    computed:{},
    methods:{
      turnUp(){
        this.$router.go(-1)
      },
      //发布
      send () {
        let that = this;
        this.$axios.post('/api/v2/circlePublish',{
          url:this.imgs.join(','),
          content:this.content
        },{
          headers:{
            'token':localStorage.getItem('token')
          }
        }).then(res=>{
          let vals=document.getElementById('textarea').value;
          if(vals!=''){
            this.content=vals;
            res.data.content=this.content;
            res.data.urls=this.imgs.join(',');
            this.$router.push('/find');
          }

        }).catch(err=>{
          this.$vux.loading.show({
            text: '登录超时，请重新登录'
          });
          setTimeout(() => {
            this.$vux.loading.hide()
            that.$router.push({name:'login',query:{redirect:'/find/release'}});
          }, 1000)
        })
      },
      //上传图片
      getImgBase(){
        let _this = this;
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
          this.imgBase64.push(res.data.data);
          this.imgs=this.imgBase64;
        }).catch(err=>{
        });
      },
      //删除图片
      delImg(index1){
        this.imgBase64.splice(index1,1);
        this.imgs=this.imgBase64
      },
    },
    created(){},
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .add-pic{
    width:75px;
    height:75px;
    border-radius: 2px;
    position:relative;
    display:inline-block;
  }
  .add-pic img{
    width:100%;
    height:100%;
  }
  .find-re{
    height:100%;
    background: #fff;
  }

  textarea{
    width:100%;
    height:125px;
    border-radius: 3px;
    border:none;
    outline:none;
    resize: none;
  }

  textarea::placeholder{
    color:#ccc;
  }
  .write-box{
    border:1px solid #ccc;
    background: #f5f5f5;
  }
  .write-com{
    padding:15px;
    margin-top:44px;
  }
  .search{
    color: #fff;
    font-size: 18px;
    line-height:29px;
  }
  .opa{
    color:rgba(255,255,255,0.5)
  }
  .input_file{
    width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    opacity:0;
  }
  .lists{
    list-style: none;
    display:inline-flex;
    justify-content:flex-start;
    width: 100%;
    flex-wrap: wrap;
    padding:15px;
  }
  .lists li{
    width: 75px;
    margin-right:10px;
    margin-bottom:10px;
    height: 75px;
    overflow:hidden;
    position:relative;

  }
  .lists img{
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  .lists span{
    position:absolute;
    top: -12px;
    right: -12px;
    color: #fff;
    font-size: 16px;
    display: block;
    width: 30px;
    height: 30px;
    overflow: hidden;
    padding: 5px 0 6px 6px;
    box-sizing:border-box;
    background: red;
    border-radius:50%;
  }
</style>
