<template>
  <div class='location-search'>
        <c-head>
            <div slot='left'>
                <div  class="return" @click='turnUp'>
                    <img src="/static/btn_return.png" alt="">
                </div>
            </div>
            <c-search slot='center' placeholder="搜索幼儿园/培训机构/俱乐部等"></c-search>
            <div slot='right' @click="search">
                <router-link to=''><p class='search'>搜索</p> </router-link>
            </div>
         </c-head>
         <div style="margin-top:50px;">
            <group title="热门搜索">
                <div class="hot-box">
                    <div class="hot">
                        <p @click="hotHistory($event)" v-for="(item,a) in hotList" :key="a">{{item}}</p>
                    </div>
                </div>
            </group>
            <div class="history">
                <div class="delete" @click="deleteSearch">
                    <img src="/static/btn_trash.png" alt="">
                </div>
                 <group title="历史记录">
                    <div class="hot-box">
                        <div class="hot">
                            <p @click="toSo($event)" v-for="(item,b) in history" :key="b">{{item}}</p>
                        </div>
                    </div>
                </group>
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
        hotList:"",
        history:[],
        arr:[]
    }
  },
  watch:{},
  computed:{
    msg () {
        return this.$store.state.user_val
      }
  },
  methods:{
    turnUp:function(){
      this.$router.go(-1);
     /* this.msg='';*/
    },
    //点击热门搜索
    hotHistory (e) {
      this.$store.commit('SET_MSG', e.target.innerText);//将值传入store面
      this.search();
    },
    del (){ //删除历史
      localStorage.removeItem('arr');
      this.history=[];
    },
    toSo (e) {//点击历史中的内容直接搜索
      this.$store.commit('SET_MSG', e.target.innerText);//将值传入store面
      this.search();
    },
    hotSearch:function(){
      this.$axios.get("/api/v2/hotSearch",1)
      .then(res=>{
        this.hotList=res.data.data;
      }).catch(err=>{

      })
    },
    deleteSearch(){
      localStorage.removeItem("home");
      this.history=[];
    },
    search () {//搜索
      this.list = [];
        let param = {
          pageNumber: 1,
          pageSize: 100,
          city: localStorage.selectCityId||localStorage.itselfId,
          longitude: localStorage.lng,
          latitude: localStorage.lat,
          name:this.msg,
          sortType:1
        };
        this.$axios.get(this.$api.school.search,{ params: param })
          .then(res => {
            this.handleData(res.data.data.list);
            //localStorage.removeItem("home");
            if(this.msg != null && this.msg != ''){
              if(this.history!=null){
                if(this.history.indexOf(this.msg)>-1){
                }else{
                  this.history.push(this.msg);
                  localStorage.setItem('home',JSON.stringify(this.history));
                }
                this.msg != null && this.msg!=''
              }else{
                this.history=[this.msg];
                localStorage.setItem('home',JSON.stringify(this.history));
              };
            }
            for(let i=0;i<res.data.data.list.length;i++){
              if(res.data.data.list[i].name.trim().indexOf(this.msg)>=0){
                this.list.push(res.data.data.list[i]);
              }
            }
            this.$store.commit('set_hsearch', this.list);//将值传入store面
            this.$router.push('/home/schoolsearchlist')

          })
          .catch(err =>{
          });
      },
    handleData: function(data) {
      data.forEach((val, index, arr) => {
        val.fallbackSrc =
          "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        val.url = `/school/in/${val.sId}`;
        if (val.imgUrl == null) {
          val.imgUrl = "http://qiniu.wantfg.com/2018/8/11/knzogcqbfxjmndid.png";
        }
      });
    },
  },
  created(){
    this.hotSearch();
    this.history=JSON.parse(localStorage.getItem('home'));
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.location-search{
    background: #fff;
    height:100vh;
}
.search{
  color: #fff;
  text-align: center;
  font-size: 14px;
  line-height:29px;
}
.hot-box{
    padding:0 15px;
}
.hot{
    font-size:12px;
    color:#989898;
}
.hot p{
    line-height: 25px;
    padding:0 10px;
    float: left;
    background: #eee;
    margin:5px 0;
    border-radius: 3px;
}
.hot p:not(:last-child) {
    margin-right:10px;
        }
.delete{
    width:20px;
    height:20px;
    position:absolute;
    right:15px;
    top:5px;
    z-index:1000;
}
.delete img{
    width:100%;
    height:100%;
}
 .history{
     position: relative;
 }
</style>
