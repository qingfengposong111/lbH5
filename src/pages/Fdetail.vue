<template>
  <div>
    <c-head>
      <div slot='left'>
        <div  class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <div slot='center' class="head-title">详情</div>
    </c-head>
    <div style="padding-top:44px;background: #fff;">
      <router-link  to='' class="comment">
        <div class="com-img">
          <img :src="fdetail.qrcodeImg" alt="">
        </div>
        <div class="com-box">
          <div class='title-box'>
            <div class="com-user">
              <p class="com-name">{{fdetail.nickname}}</p>
            </div>
          </div>
          <div class='com-con' :class="{fl:!isvis}">
            <p>{{fdetail.content}}</p>
          </div>
          <div>
            <router-link to='' v-if="len>80" class="com-all" @click.native="fullless">{{hole}}</router-link>
            <div class="pic-box">
              <flexbox class="flex-row" :gutter="5">
                <flexbox-item :span='91/283' style="margin-left:0;" v-for="(item,index) in fdetail.urls" :key='index'>
                  <div class="com-pic">
                    <img :src="item" preview="index" alt="">
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
          <div class='count-com'>
            <div class='write-box' @click="write">
              <div class='com-icon'><span></span><img src="/static/icon_praise.png" alt=""></div>
              <p>{{msg}}</p>
            </div>
            <div class='love-box' @click="go_comm">
              <div  class='com-icon'><span></span><img src="/static/icon_comments.png" alt=""></div>
              <p>{{fdetail.commentNum}}</p>
            </div>
          </div>
        </div>
      </router-link>
      <!--评论-->
      <div class="comms">
        <p v-for="(person,index3) in commList" v-model="commList" :key="index3" >
          <span>{{person.nickname}}：</span>
          <span style="color: #666;">{{person.content}}</span>
        </p>
      </div>
      <form class="input" @submit.prevent action="#">
        <input type="text" v-model="val" id="input" @keyup.13="blur" placeholder="说点什么">
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{
    },
    data(){
      return {
        fdetail: {},
        hole:'全文',
        star:5,
        commList:[],
        msg: '',
        val: '',
        isvis: false,
        num: '',
        len:''
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
      }
    },
    watch:{

    },
    computed:{},
    created(){
      this.$axios.get('/api/v2/circleNewsDetail',{//单个详情
        params:{
          id: this.$route.params.id
        },
        headers: {
          'token': localStorage.getItem("token") || ''
        }
      })
        .then(res =>{
          this.fdetail=res.data.data;
          this.len = this.fdetail.content.length;
          this.msg=res.data.data.likeNum;
        })
        .catch(err =>{
        });

      this.$axios.get('/api/v2/circleComments',{//评论列表
        params:{
          id: this.$route.params.id
        },
        headers: {
          'token': localStorage.getItem("token") || ''
        }
      })
        .then(res =>{
          this.commList=res.data.data.list;
        })
        .catch(err =>{
        });
    },
    methods:{
      fullless () {//收起 全文
        this.isvis=!this.isvis;
        if(this.isvis){
          this.hole = '收起'
        }else if(!this.isvis){
          this.hole='全部'
        }
      },
      go_comm () {
        if(localStorage.token){
          document.getElementById('input').focus()
        }else{
          this.logs()
        }

      },
      blur () {//输入回复结束
        this.val = document.getElementById('input').value;
        if(localStorage.token){
          this.$axios.post('/api/v2/circleReply',{//评论回复
            pid: this.$route.params.id,
            content:this.val
          },{
            headers: {
              'token': localStorage.getItem("token")
            }
          })
            .then(res =>{
              res.data.data.content=this.val;
              if(this.val){
                this.commList.push(res.data.data);
                this.fdetail.commentNum++
              }
              this.val='';
              document.getElementById('input').blur();
            })
            .catch(err =>{
                console.log(err)
            });
        }


      },
      logs () {
        let that = this;
        this.$vux.loading.show({
          text: '请先登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          that.$router.push({name:'login',query:{redirect:'/fdetail/'+that.$route.params.id}});
        }, 1000)
      },
      turnUp: function() {
        this.$router.push('/find');
      },
      write () {
        let that = this;
        if(localStorage.token){
          this.$axios.post('/api/v2/circleLike',{//点赞
            cid: this.$route.params.id,
          },{
            headers: {
              'token': localStorage.getItem("token")
            }
          })
            .then(res =>{
              if(localStorage.token)
                if(res.data.msg === '已赞'){
                  this.fdetail.likeNum++;
                  this.msg='已赞'
                }
              if(res.data.msg === '已取消赞'){
                this.fdetail.likeNum--;
                this.msg=this.fdetail.likeNum;
              }
            })
            .catch(err =>{
             /* this.$vux.loading.show({
                text: '登录超时，请重新登录'
              });
              setTimeout(() => {
                this.$vux.loading.hide()
                that.$router.push({name:'login',query:{redirect:'/fdetail/'+that.$route.params.id}});
              }, 1000)*/
            });
        }else{
          this.logs();
        }

      }
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .input  {
    width: 100%;
    padding:.5rem 1rem;
    position:fixed;
    bottom:0;
    left:0;
    border-top:1px solid #ccc;
  }
  .input{
    background: #fff;
  }
  .input input{
    outline:none;
    width: 100%;
    height: 30px;
    border:none;
    border-radius:15px;
    background: #eee;
    padding-left:10px;
  }
  .flex-row{
    width: 100%;
    display:flex;
    flex-wrap:wrap;
  }
  .flex-row>flexbox-item{
    width: 30%;
  }

  .fl {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .comms{
    width: 100%;
    padding:.5rem 1rem;
    /*height: 16rem;*/
    overflow-y:auto;
    padding-bottom:46px;
  }
  .comms>p span:first-child{
    color:#3667D7;
  }
  .bus-reply{
    background: #fff;
    padding:15px;
    display:flex;
    justify-content: flex-end;
    border-bottom:1px solid #eee;
  }
  .bus-reply p{
    font-size:12px;
    color:#989898;
  }
  .icon_reply{
    width:25px;
    height:20px;
    margin-left:60px;
    margin-right:10px;
  }
  .icon_reply img{
    width:100%;
    height:100%;
    display:block;
  }
  .com-icon{
    text-align: center;
    vertical-align:middle;
    width:18px;
    height:15px;
    margin-right:3px;
  }
  .com-icon img{
    width:100%;
    vertical-align: middle
  }
  .com-icon span{height: 100%;vertical-align: middle;display: inline-block}
  .count-com{
    display:flex;
    justify-content:flex-end;
    margin-top:15px;
  }
  .count-com p{
    font-size:12px;
    line-height: 29px;
  }
  .write-box,.love-box{
    display:flex;
    width:75px;
    height:29px;
    border:2px solid #eee;
    padding:0 10px;
    border-radius: 15px;
    justify-content: center;
  }
  .write-box{
    border-color:#FF6464;
    color:#FF6464;
    margin-right:10px;
  }
  .love-box{
    border-color:#FBB03B;
    color:#FBB03B;
  }
  .eval-box{
    padding:10px 15px;
    border-bottom:1px solid #eee;
    background: #fff;
    overflow: hidden;
  }
  .eval-item{
    padding:3px 15px;
    border:2px solid #ccc;
    color:#ccc;
    border-radius: 15px;
    float:left;
    font-size:12px;
    margin:5px 0;
  }
  .eval-item:first-child{
    border-color:#5EE2C6;
    color:#5EE2C6;
  }
  .eval-item:not(:last-child){
    margin-right:15px;
  }
  .eval-box:after{
  }
  .pic-box{
    margin-top:5px;
  }
  .com-all{
    color:#3667D7;
    font-size:12px;
  }
  .com-pic{
    width:80px;
    height:80px;
    margin:5px;
  }
  .com-pic img{
    width:100%;
    height:100%;
  }
  .vux-rater{
    display: flex;
  }
  .vux-rater a{
    display:block;
  }
  .com-user{
    display:flex;
  }
  .title-box{
    padding-bottom:5px;
  }
  .com-name{
    font-size:12px;
    color:#333;
    flex:1;
  }
  .sorce-box{
    display:flex;
  }
  .sorce{
    font-size:12px;
    color:#666;}
  .com-date{
    color:#989898;
    font-size:10px;
  }
  .comment{
    background: #fff;
    padding:15px;
    display:flex;
    position: relative;
  }
  .comment:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right: 15px;
  }
  .com-img{
    width:50px;
    height:50px;
    border-radius:50%;
    overflow:hidden;
  }
  .com-img img{
    width:100%;
    height:100%;
    display:block;
    object-fit:cover;
  }
  .com-box{
    padding:10px 0 0 10px;
    flex:1;
  }
  .comms p{
    font-size: 14px;
  }
  .com-con p{
    font-size:12px;
    color:#666;
    line-height: 20px;
  }
</style>
