<template>
  <div>
    <v-scroll style="height: 100%;background: #fff;" :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul class="sch-det-con clearfix">
        <li v-for='(items,a) in list' v-if="items.count>0" :key="a">
          {{items.name}}{{items.count}}
        </li>
      </ul>
      <router-link  v-for="(temp,index11) in listdata" :key="index11" :to="'/school/schoolComDetail/'+temp.id" class="comment">
        <div style="display:flex;">
          <div class="com-img">
            <img :src="temp.qrcodeImg" alt="">
          </div>
          <div class="com-box">
            <div class='title-box'>
              <div class="com-user">
                <p class="com-name">{{temp.nickname}}</p>
                <p class="com-date">{{temp.createTime | formatDate}}</p>
              </div>
              <div class="sorce-box">
                <p class='sorce'>打分</p>
                <rater disabled v-model="temp.score" :min="3" :font-size="16" :margin='0' ></rater>
              </div>
            </div>
            <div class='com-con'>
              <p :class="{fl:!temp.active}">{{temp.evaluation}}</p>
            </div>
            <div>
              <router-link to='' v-if="temp.evaluation.length>60" class="com-all"  @click.native="viewAll(index11)">{{temp.hole}}</router-link>
              <div class="pic-box">
                <flexbox :gutter='12.5' style="width: 33%;float: left;margin-bottom:3px;"   v-for='(item,c) in temp.urls' :key="c">
                  <flexbox-item   class='find-main-f'>
                    <div class="com-pic">
                      <img :src="item" alt="">
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </div>
        <div class='count-com'>
          <div class='write-box heart'>
            <div class='com-icon'><span></span><img src="/static/icon_praise.png" alt=""></div>
            <p>{{temp.revNum}}</p>
          </div>
          <div class='love-box'>
            <div  class='com-icon'><span></span><img src="/static/icon_comments.png" alt=""></div>
            <p>{{temp.commentNum}}</p>
          </div>
        </div>
      </router-link>
      <router-link v-for="(child,index3) in downdata" :key="index3"  :to="'/home/activity/userCommentDetail/'+child.id" class="comment">
        <div style="display:flex;">
          <div class="com-img">
            <img :src="child.qrcodeImg" alt="">
          </div>
          <div class="com-box">
            <div class='title-box'>
              <div class="com-user">
                <p class="com-name">{{child.nickname}}</p>
                <p class="com-date">{{child.createTime | formatDate}}</p>
              </div>
              <div class="sorce-box">
                <p class='sorce'>打分</p>
                <rater disabled v-model="child.score" :min="3" :font-size="16" :margin='0' ></rater>
              </div>
            </div>
            <div class='com-con'>
              <p :class="{fl:!child.active}">{{child.evaluation}}</p>
            </div>
            <div>
              <router-link to='' v-if="child.evaluation.length>60" class="com-all" @click.native="viewAll2(index3)">{{child.hole}}</router-link>
              <div class="pic-box">
                <flexbox :gutter='12.5' style="width: 33%;float: left;margin-bottom:3px;"   v-for='(item,b) in child.urls' :key="b" >
                  <flexbox-item   class='find-main-f'>
                    <div class="com-pic">
                      <img :src="item" alt="">
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>

            </div>
          </div>
        </div>
        <div class='count-com'>
          <div class='write-box heart'>
            <div class='com-icon'><span></span><img src="/static/icon_praise.png" alt=""></div>
            <p>{{child.revNum}}</p>
          </div>
          <div class='love-box'>
            <div  class='com-icon'><span></span><img src="/static/icon_comments.png" alt=""></div>
            <p>{{child.commentNum}}</p>
          </div>
        </div>
      </router-link>
    </v-scroll>
  </div>
</template>

<script>
  import scroller from './loadMore'
  export default {
    components:{
      'v-scroll': scroller
    },
    props:{},
    data(){
      return {
        star:5,
        list: [],
        len1: '',
        len2: '',
        picList:['/static/img_institutions05.png','/static/img_institutions05.png','/static/img_institutions05.png'],
        liked:'',
        counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        num : 5,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: []  // 上拉更多的数据存放数组
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
    computed:{
      getId () {
        return this.$store.state.schoolId;
      }
    },
    mounted () {
      this.getList()
    },
    methods:{
      viewAll (index) {// 收起 全部
        if(!this.listdata[index].active){
          this.listdata[index].hole='收起'
        }else if(this.listdata[index].active){
          this.listdata[index].hole='全部'
        }
        this.listdata[index].active = !this.listdata[index].active;
      },
      viewAll2 (index) {// 收起 全部
        if(!this.downdata[index].active){
          this.downdata[index].hole='收起'
        }else if(this.downdata[index].active){
          this.downdata[index].hole='全部'
        }
        this.downdata[index].active = !this.downdata[index].active;
      },
      getList(){
        this.$axios.get('/api/v2/schoolComments',{
          params:{
            sId: this.$route.params.id
          },
          headers:{
            'token': localStorage.getItem('token')||''
          }
        })
          .then(res =>{
            localStorage.comAll = res.data.data.list.length; //所有的评论个数
            this.listdata = res.data.data.list.slice(0,20);
            for(let i=0;i<this.listdata.length;i++){
              this.len1=this.listdata[i].evaluation.length;
              this.$set(this.listdata,i,Object.assign({},this.listdata[i],{active:false}));
              this.listdata[i].hole='全部';
            }
          })
          .catch(err =>{
          });
      },
      onRefresh(done) {
        this.getList();
        done() // call done

      },
      onInfinite(done) {
        this.$axios.get('/api/v2/schoolComments',{
          params:{
            sId: this.getId
          },
          headers: {
            'token': localStorage.getItem('token')|| ''
          }
        })
          .then(res =>{
            this.counter++;
            this.pageEnd = this.num * this.counter;
            this.pageStart = this.pageEnd - this.num;
            let as = res.data.data.list;
            let i = this.pageStart;
            let end = this.pageEnd;
            for(; i<end; i++){
              let obj ={};
              obj= as[i];
              this.downdata.push(obj);
              for(let j=0;j<this.downdata.length;j++){
                this.$set(this.downdata,j,Object.assign({},this.downdata[j],{active:false}));
                this.downdata[j].hole='全部';
                this.len2=this.downdata[j].evaluation.length;
              }
              if((i + 1) >= res.data.data.list.length){
                this.$el.querySelector('.load-more').style.display = 'none';
                return;
              }
            }
            done()
          })
          .catch(err =>{
          });
      }
    },
    created(){
      this.getList();
      this.$axios.get('/api/v2/schoolTags',{
        params:{
          sId: this.$route.params.id
        }
      }).then(res=>{
        this.list = res.data.data;
      })
    }
  }
</script>
<style lang="less" scoped>
  .clearfix:after{
    content: " ";
    display: block;;
    line-height: 0;
    height: 0;
    visibility: hidden;
    clear: both;
  }
  .sch-det-con{
    position: absolute;
    width: 100%;
    top: 88px;
    left:0;
    padding:0 15px;
    z-index: 5;
    background: #fff;
    border-bottom:1px solid #eee;
  }
  .sch-det-con>li{
    list-style: none;
    float: left;
    color:#999;
    font-size:12px;
    height: 24px;
    line-height: 24px;
    padding:0 3px;
    text-align: center;
    background: #fff;
    box-sizing:border-box;
    border-radius: 12px;
    border:1px solid #ccc;
    margin-bottom:5px;
    margin-right:.5%
  }
  .sch-det-con-item{
    display:inline-block;

  }
  .bus-reply{
    background: #fff;
    padding:15px;
    display:flex;
    justify-content: flex-end;
    border-bottom:1px solid #eee;
  }
  .m-top{
    /* margin-top:88px;*/
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
    vertical-align: -3px;
  }
  .com-icon span{height: 100%;vertical-align: middle;display: inline-block}
  .count-com{
    display:flex;
    justify-content:flex-end;
    padding:15px;
    border-bottom:1px solid #D9D9D9;
    background: #fff;
  }
  .count-com p{
    font-size:12px;
    line-height: 25px;
  }
  .write-box,.love-box{
    display:flex;
    width:75px;
    height:29px;
    border:2px solid #eee;
    justify-content:center;
    padding:0 10px;
    border-radius: 15px;
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
    margin:0 0 8px 0;
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
    padding:15px 15px 0;
    display:block;
    position: relative;
    top:100px;
  }
  .comment:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    /*border-top: 1px solid #D9D9D9;*/
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
    object-fit: cover;
  }
  .com-box{
    padding:10px 0px 0px 10px;
    flex:1;
  }
  .com-con{
    display: -webkit-box;
    /*-webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;*/
  }
  .com-con-active{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .com-con p{
    font-size:12px;
    color:#666;
    line-height: 20px;
  }
  .fl {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>



