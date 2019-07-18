<template>
  <div class='home-act' >
    <div class='head'>
      <flexbox :gutter='9.5'>
        <flexbox-item :span="16/125" >
          <div  class="return" @click='turnUp'>
            <img src="/static/btn_return.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item :span="4/5">
          <div @click="goSearch"><c-search placeholder="搜索课程/培训等" ></c-search></div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="tabs">
      <tab :line-width="1" custom-bar-width="100px"  @on-before-index-change="switchTabItem">
        <tab-item selected >
          <router-link class="tab-act" :to="'/home/MoreLesson/AllLesson'">{{hol}}<i class='choose-icon'></i>
          </router-link>
        </tab-item>
        <tab-item class="vux-1px-l">
        <router-link class="tab-act" :to="'/home/MoreLesson/Age'">{{age}}<i class='choose-icon'></i>
        </router-link>
      </tab-item>
        <tab-item  class="vux-1px-l">
          <router-link class="tab-act" :to="'/home/MoreLesson/LessonAllCity'"  >{{LessonAllcity}}<i class='choose-icon'></i>
          </router-link>
        </tab-item>

        <tab-item class="vux-1px-l">
          <router-link class="tab-act" :to="'/home/MoreLesson/SmargSort'">{{smart}}<i class='choose-icon'></i>
          </router-link>
        </tab-item>
      </tab>
    </div>
    <div class="lessonList">
      <router-link :to="'/school/CoursewareDetail/'+lesson.productId" class="lessonItem" v-for="(lesson,index_a) in getLesson" :key="index_a">
        <div class="leftImg">
          <img :src="lesson.productImg" alt="">
        </div>
        <div class="rightMain">
          <div class="topTitle">
            <h4>{{lesson.productName}}</h4>
            <p>适用年龄：{{lesson.minAge}}~{{lesson.maxAge}}岁</p>
          </div>
          <div class="bottomMain">
            <p class="price"><span>￥{{lesson.promotePrice | yuan }}</span><span>剩余：{{lesson.productNumber}}人</span></p>
            <p>{{lesson.name}}</p>
          </div>
        </div>
      </router-link>
    </div>
    <router-view :id="cityId" v-on:sort="sort" v-on:dist="dist" v-on:theAge="theAge" v-on:con="con"  v-show="show" @click.native="closeMsg($event)"></router-view>
  </div>
</template>
<script>
  export default {
    components:{
    },
    props:{},
    data(){
      return {
        list: [],
        show: false,
        cfy:'',// 主分类类别id,
        cityId: this.$route.params.id,
        hol:'全部',
        LessonAllcity:'全城',
        smart:'智能排序',
        age:'年龄'
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
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    watch:{},
    computed:{
      msg () {
        return this.$store.state.user_val
      },
      getLesson () {
        this.list = this.$store.state.screen;
        return this.$store.state.lessonList;
      }
    },
    created(){
      this.getData()
      this.list = this.$store.state.lessonList;
    },
    methods: {
      switchTabItem(index) {
        this.$vux.loading.show({
          text: 'loading'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          this.index01 = index
        }, 1000)
      },
      turnUp: function () {
        this.$router.push('/home');
      },
      getData: function() {
        let param = {
          city: localStorage.selectCityId||localStorage.itselfId,
          classifyId:this.$store.state.lessonClassifyId,
          sortType: this.$store.state.lessonSortId,
          town: this.$store.state.searchDist,
          age: this.$store.state.lessonAgeId,
          name: this.$store.state.user_val,
          latitude:localStorage.lat,
          longitude:localStorage.lng,
          pageNumber: 1,
          pageSize: 100
        };
        this.$axios.get('/api/v2/lessonSearch', { params: param }).then(res => {
          this.list = res.data.data.list;
          this.$store.commit('set_lessonList',this.list);
        })
          .catch(err =>{
            console.log(err)
          });
        this.show = true;
      },
      con (val) {
        this.hol = val;
      },
      theAge (val) {
        this.age = val;
      },
      dist (val) {
        this.LessonAllcity = val;
      },
      sort (val) {
        this.smart = val;
      },
      goSearch: function () {
        this.$router.push('/home/LessonSearch/'+this.$route.params.id);
      },
      closeMsg:function(event){
        let btn = document.querySelector(".screen-main");
        if(btn){
          if(!btn.contains(event.target)){
            this.show = false;
          }
        }
      }
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
  ul{
    list-style: none;
  }
  .outbox{
    position:fixed;
    top:88px;
    left:0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.3);
  }
  .vux-tab .vux-tab-item.vux-tab-selected i{
    border-top:4px solid #5EE2C6;
  }
  a.nav-active{
    color:#5EE2C6;
    background:#eee;
  }
  .sub-name{
    color:#666;
    font-size: 16px;
  }
  .sub-num{
    text-align: right;
    font-size:12px;
    color:#989898;
  }
  .choose-icon{
    display:inline-block;
    width:0px;
    height:0px;
    border:4px solid transparent;
    border-top:4px solid #989898;
    margin-left:4px;
  }
  .active{
    border-top-color:#5EE2C6;
  }
  .all_t{
    width: 100%;
    height: 100%;
    position:fixed;
    top:88px;
    left:0;
    background: rgba(0,0,0,.5);
    z-index:1000;
  }
  .all_t>div{
    display:flex;
  }
  .right{
    width: 67%;
  }
  .home-act{
    background: #fff;
  }
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#eee;
  }
  .vux-tab .vux-tab-item{
    font-size:16px;
  }
  a.weui-media-box {
    color: #000000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .weui-media-box_appmsg {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .tabs{
    margin-top: 44px;
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  .cur{
    background: #eee!important;
    color:#5EE2C6;
  }
  .lessonList{
    width: 100%;
    padding:100px 15px 15px 15px;
  }
  .lessonItem{
    width: 100%;
    display:flex;
    box-sizing:border-box;
    justify-content:flex-start;
    margin-bottom:20px;
    padding-bottom:20px;
    border-bottom:1px solid #e4e4e4;
  }
  .leftImg{
    width: 150px;
    height: 100px;
    overflow:hidden;
  }
  .leftImg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .rightMain{
    margin-left:12px;
    display:flex;
    flex-direction:column;
  }
  .rightMain>div{
    flex-grow:1;
  }

  .rightMain h4{
    font-weight: 400;
    color:#666;
    font-size: 14px;
    width: 100%;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap;
  }
  .rightMain p{
    font-size: 12px;
    color:#CCC;
  }
.price span:first-child{
  color:#FF4D4D;
  margin-right:10px;
}
</style>
