<template>
<div class="comment-main">
  <div class="no_pic" v-if="list.length===0">暂无评价</div>
  <router-link v-else  :to="'/home/activity/UserCommentDetail/'+temp.id" class="find-content" v-for='(temp,index) in list' :key="index" :id='list.id'>
    <div  class="find-box">
      <div class="find-head">
        <div class="find-img">
          <img :src="temp.qrcodeImg" alt="">
        </div>
        <div class="find-text">
          <p style="color:#000;font-size: 12px;">{{temp.nickname}}</p>
          <div class="sorce-box">
            <p class='sorce'>打分</p>
            <rater disabled v-model="temp.score" :min="3" :font-size="16" :margin='0' ></rater>
          </div>
          <p style="font-size: 14px;" :class="{fl:!temp.active}">{{temp.evaluation}}</p>
          <router-link to=""  v-if="temp.evaluation>100" style="color:#3667D7;font-size: 12px;" @click.native="viewAll(index)" >{{temp.hole}}</router-link>
        </div>
      </div>
      <div class="find-main">
        <flexbox :gutter='12.5'   v-for='(pic,a) in temp.urls' :key="a">
          <flexbox-item   class='find-main-f'>
            <div class="find-main-img">
              <img :src="pic" alt="">
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </router-link>
  <div class="bot" v-show="list.length>0" @click="jump">
    <group :gutter="0" >
        <cell is-link>
            <p slot='title' class="look-more">查看更多</p>
            <p class='count'>共{{list.length}}条</p>
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
      star:5,
      picList:['/static/img_institutions05.png','/static/img_institutions05.png','/static/img_institutions05.png'],
      activityId:localStorage.asid,
      list:[],
      num: localStorage.all,
      mid: '',
      isvis:false
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
  watch:{},
  computed:{
  },
  methods:{
    viewAll (index) {// 收起 全部
      if(!this.list[index].active){
        this.list[index].hole='收起'
      }else if(this.list[index].active){
        this.list[index].hole='全部'
      }
      this.list[index].active = !this.list[index].active;
    },
    jump () {
      this.$router.push('/home/activity/userComment/commentAll');
    }
  },
  created(){
    this.$axios.get('/api/v2/activityComments',{
      params:{
        activityId: this.activityId,
        pageNumber: 1,
        pageSize:20
      },
      headers: {
        'token': localStorage.getItem("token")|| ''
      }
    })
      .then(res =>{
        this.list = res.data.data.list;
        localStorage.all = res.data.data.list.length; //所有的评论个数
        for(var i=0;i<this.list.length;i++){
          this.$set(this.list,i,Object.assign({},this.list[i],{active:false}))
          this.list[i].hole='全部';
        }
      })
      .catch(err =>{
        /*console.log(err);*/
      });
  },
  mounted(){
  }
}
</script>
<style lang="less" scoped>
.comment-main{
    padding-bottom:3px;
    background: #fff;
}
.look-more{
    color:#666;
    font-size:12px;
}
.count{
    color:#989898;
    font-size:10px;
}
.com-all{
    color:#3667D7;
    font-size:12px;
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

.sorce-box{
    display:flex;
}
.sorce{
    font-size:12px;
    color:#666;}

.com-con p{
    font-size:14px;
     color:#666;
     line-height: 20px;
}
.no_pic{
  text-align: center;
  font-size: 14px;
  color:#999;
  padding:12px 0;
}
.find-content{
  background: #fff;
}
.find-box{
  padding:10px 25px;
  position:relative;
}
.find-box::before{
  content: '';
  height:1px;
  background: #eee;
  position: absolute;
  bottom:0;
  left:5%;
  width:90%;
}
.find-head{
  display: flex;
  -webkit-box-align: center;
}
.find-main{
  padding:10px 0 ;
  margin-left:52px;
  display:flex;
  justify-content:flex-start;
  flex-wrap:wrap
}
.find-main>div{
  width: 33%;
  margin-bottom:10px;
}
.find-img{
  margin-right: .8em;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius:50%;
  overflow:hidden;
}
.find-img img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.find-main-img{
  width: 80px;
  height:80px;
}
.find-main-img img{
  width:100%;
  height:100%;
}
.find-text{
  font-size:14px;
  color:#666;
  width: 82%;
}
.find-foot p{
  font-size:12px;
  color:#ccc;
}
.find-icon{
  width:20px;
  height:18px;
  vertical-align: top;
}
.find-icon img{
  width:100%;
  height:100%;
}
.release{
  position:fixed;
  bottom:9px;
  right:16px;
  width:45px;
  height:45px;
  vertical-align: middle;
  display:block;
}
.release img{
  width:100%;
  height:100%;
}

.fl {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
