<template>
  <div style="background: #fff;">
    <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
              <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title">评论详情</div>
    </c-head>
    <div style="position:relative;left:0;top:44px;">
        <router-link  to='' class="comment">
            <div class="com-img">
                <img :src="dataList.qrcodeImg" alt="">
            </div>
            <div class="com-box">
                <div class='title-box'>
                    <div class="com-user">
                        <p class="com-name">{{dataList.nickname}}</p>
                        <p class="com-date">{{dataList.createTime | formatDate}}</p>
                    </div>
                    <div class="sorce-box">
                        <p class='sorce'>打分</p>
                        <rater disabled v-model="dataList.score" :font-size="16" :margin='0' ></rater>
                    </div>
                    </div>
                <div class='com-con' :class="{fl:!isvis}">
                    <p>{{dataList.evaluation}}</p>
                </div>
                <div>
                  <router-link to='' v-show="len>10" class="com-all" @click.native="fullless">{{hole}}</router-link>
                  <div class="pic-box">
                    <flexbox class="flex-row" :gutter="5">
                      <flexbox-item :span='91/283' style="margin-left:0;" v-for="(item,index) in dataList.urls" :key='index'>
                        <div class="com-pic">
                          <img :src="item" preview="index" alt="">
                        </div>
                      </flexbox-item>
                    </flexbox>
                  </div>
                </div>
                <div class='count-com' >
                    <div class='write-box' @click="write">
                        <div class='com-icon'><span></span><img src="/static/icon_praise.png" alt=""></div>
                        <p>{{msg}}</p>
                    </div>
                    <div class='love-box' @click="go_comm">
                        <div  class='com-icon'><span></span><img src="/static/icon_comments.png" alt=""></div>
                        <p>{{dataList.commentNum}}</p>
                    </div>
                </div>
            </div>
        </router-link>
      <!--评论-->
        <div class="comms">
          <div class="commentBox" >
            <p v-if="commList===[]">暂无评论！</p>
            <div v-else>
              <div class="reply">
                <p v-if="person.replyMid===null"  v-for="(person,index3) in commList" v-model="commList" :key="index3"> <span :id="person.mId" class="autor" @click="changeCommenter($event)">{{person.nickname}}：</span><span>{{person.evaluation}}</span></p>
                <p v-if="temp.replyMid!==null"  v-for="(temp,index4) in commList" v-model="commList" :key="index4"><span class="autor" >{{temp.nickname}}</span> 回复 <span @click="changeCommenter"  class="autor">{{temp.replyNickname}}：</span><span>{{temp.evaluation}}</span></p>
              </div>
            </div>
          </div>
        </div>
      <form @submit.prevent action="#" class="input">
         <input @keyup.13="blur" type="text" id="txt" placeholder="说点什么" v-model="commentText">
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
        hole:'全文',
        star:5,
        picList:['/static/img_institutions05.png','/static/img_institutions05.png','/static/img_institutions05.png'],
        dataList:{},
        commList:[],
        revNum:'',
        msg: '',
        isvis: false,
        type: 0,                //0为评论作者1为评论别人的评论
        commentText: '',
        name:'',
        mid: '',
        len: ''
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
    rev:this.revNum
  },
  computed:{},
  created(){
    this.$axios.get('/api/v2/activityCommentDetail1',{
      params:{
        id: this.$route.params.id
      }
    })
      .then(res =>{
        this.dataList = res.data.data;
        this.revNum = res.data.data.revNum;
        this.msg=this.revNum;
          this.len=this.dataList.evaluation.length;
      })
      .catch(err =>{
      });

    this.$axios.get('/api/v2/activityCommentDetail2',{
      params:{
        id: this.$route.params.id
      }
    })
      .then(res =>{
        /*localStorage.all = res.data.data.list.length; //所有的评论个数*/
        this.commList = res.data.data.list;
      })
      .catch(err =>{
      });
  },
  methods:{
    changeCommenter: function(e) {
      document.getElementById('txt').focus();
      this.type=1;
      this.mid=e.target.getAttribute('id');
      this.name=e.target.innerText;
      document.getElementById('txt').setAttribute('placeholder','回复'+this.name)
    },
    fullless () {
      this.isvis=!this.isvis;
      if(this.isvis){
        this.hole = '收起'
      }else if(!this.isvis){
        this.hole='全部'
      }
    },
    go_comm () {
      if(localStorage.token){
        document.getElementById('txt').focus();
        document.getElementById('txt').setAttribute('placeholder','说点什么')
      }else{
        this.logs()
      }
    },
    logs () {
      let that = this;
      this.$vux.loading.show({
        text: '请先登录'
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        that.$router.push({name:'login',query:{redirect:'/home/activity/UserCommentDetail/'+that.$route.params.id}});
      }, 1000)
    },
    blur ( ) {
      let that = this;
      this.commentText = document.getElementById('txt').value;
      if(this.type === 0) {
        this.$axios.post('/api/v2/activityReply',{
          pid: this.$route.params.id,
          activityId: localStorage.asid,
          evaluation:this.commentText
        },{
          headers: {
            'token': localStorage.getItem("token")
          }
        })
          .then(res =>{
            if(this.commentText){
              this.commList.push(res.data.data);
              this.dataList.commentNum++;
            }
            this.commentText='';
            document.getElementById('txt').blur();
          })
          .catch(err =>{
            that.$router.push({name:'login',query:{redirect:'/home/activity/UserCommentDetail/'+that.$route.params.id}});
          });
      }else if(this.type === 1) {
        this.$axios.post('/api/v2/activityReply', {
          pid: this.$route.params.id,
          activityId: localStorage.asid,
          evaluation: this.commentText,
          replyMid: this.mid
        }, {
          headers: {
            'token': localStorage.getItem("token")
          }
        })
          .then(res => {
            //评论别人的评论
            res.data.data.reply=false;
            this.commList.push(res.data.data);
            this.dataList.commentNum++;
            this.type = 0;
            this.commentText = ''
          })
          .catch(err => {
            /*this.$vux.loading.show({
              text: '登录超时，请重新登录'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
              that.$router.push({name:'login',query:{redirect:'/home/activity/UserCommentDetail/'+that.$route.params.id}});
            }, 1000)*/
          });
      }
    },
    turnUp: function() {
      this.$router.go('-1');
    },
    write () {
      if(localStorage.token){
        this.$axios.post('/api/v2/activityLike',{
          cid: this.$route.params.id,
          aid: localStorage.asid
        },{
          headers: {
            'token': localStorage.getItem("token")
          }
        })
          .then(res =>{
            if(res.data.msg === '已赞'){
              this.revNum++;
              this.msg='已赞'
            }
            if(res.data.msg === '已取消赞'){
              this.revNum--;
              this.msg=this.revNum;
            }
            this.$vux.loading.show({
              text: res.data.msg
            });
            setTimeout(() => {
              this.$vux.loading.hide();
            }, 1000)
          })
          .catch(err =>{
          });
      }else{
        this.logs()
      }

    }
  },
  mounted(){

  }
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
/*
    height: 16rem;
*/
    overflow-y:auto;
    padding-bottom:46px;
    color:#666;
    font-size: 14px;
  }
  .autor{
    color:#0B5DAA;
    font-size: 14px;
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
  .flex-row{
    width: 100%;
    display:flex;
    flex-wrap:wrap;
  }
  .flex-row>flexbox-item{
    width: 30%;
  }
.com-all{
    color:#3667D7;
    font-size:12px;
}
.com-pic{
    width:80px;
    height:80px;
    margin:5px 10px 5px 0;
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
    padding-bottom:15px;
}
.com-name{
    font-size:12px;
    color:#000;
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
    padding:10px 0px 0px 10px;
    flex:1;
}
.com-con p{
    font-size:14px;
     color:#666;
     line-height: 20px;
}
</style>
