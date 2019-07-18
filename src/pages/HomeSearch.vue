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
        <router-link to='/home/homeSearchMain'><p class='search'>搜索</p> </router-link>
      </div>
    </c-head>
    <div>
      <group title="热门搜索">
        <div class="hot-box">
          <div class="hot">
            <p v-for="(item,a) in hotList" :key="a">{{item}}</p>
          </div>
        </div>
      </group>
      <div class="history">
        <div class="delete" @click="del">
          <img src="/static/btn_trash.png" alt="">
        </div>
        <group title="历史记录">
          <div class="hot-box">
            <div class="hot">
              <p @click="toSo" v-for="(item,b) in history" :key="b">{{item}}</p>
            </div>
          </div>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  let arr=[];
  localStorage.setItem('home',[]);
  export default {
    components:{},
    props:{},
    data(){
      return {
        hotList:[],
        history:[],
      }
    },
    watch:{},
    computed:{
      msg () {
        return this.$store.state.user_val
      },
      getHomeSearch () {
        return this.$store.state.homeSearchList;
      }
    },
    methods:{
      turnUp:function(){
        this.$router.go(-1);
      },
      del () {
        localStorage.home='';
        this.history = []
      },
      toSo (e) {
        this.$store.commit('SET_MSG', e.target.innerText);//将值传入store面
        this.search();
      },
      search () {//搜索
        this.list=[];
        this.$axios.get(this.$api.school.showAll)
          .then(res => {
            for(let i=0;i<res.data.data.list.length;i++){
              if(res.data.data.list[i].name.trim().indexOf(this.msg)>=0){
                this.list.push(res.data.data.list[i]);
              }
            }
            this.$store.commit('set_hsearch', this.list);//将值传入store面
            arr.push(this.msg);
            localStorage.removeItem("home");
            localStorage.setItem('home',arr);
            this.history=Array.from(new Set(localStorage.home.split(',').slice(0)));
            this.$router.push('/home/homeSearchMain')
          })
          .catch(err =>{
          });
      }
    },
    created(){
      this.history=Array.from(new Set(localStorage.home.split(',').slice(0)));//让页面显示历史搜索的内容
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
    font-size: 12px;
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
