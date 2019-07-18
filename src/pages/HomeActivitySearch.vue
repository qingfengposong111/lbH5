<template>
  <div class='location-search'>
        <c-head>
            <div slot='left'>
                <div  class="return" @click='turnUp'>
                    <img src="/static/btn_return.png" alt="">
                </div>
            </div>
             <c-search slot='center'  placeholder="搜索活动名称/类型"></c-search>
            <div slot='right'>
                <router-link to='/home/sonsearch'><p class='search' @click="search">搜索</p> </router-link>
            </div>
         </c-head>
         <div style="margin-top:44px;">
            <group title="热门搜索">
                <div class="hot-box">
                    <div class="hot">
                        <p v-for="(item,a) in hotList" :key="a" @click="hotHistory($event)">{{item}}</p>
                    </div>
                </div>
            </group>
            <div class="history">
                <div class="delete" @click='del'>
                    <img src="/static/btn_trash.png" alt="">
                </div>
                 <group title="历史记录">
                    <div class="hot-box">
                        <div class="hot">
                          <p @click="toSo($event)"  v-for="(item,b) in history" :key="b">
                            <router-link tag="p" to='/home/sonsearch'>{{item}}</router-link>
                          </p>

                        </div>
                    </div>
                </group>
            </div>
         </div>
   </div>
</template>

<script>
  let lArr=[];
  localStorage.setItem('arr',[]);
  export default {
  components:{},
  props:[],
  data(){
    return {
        hotList:[],
        history:[],
        sType:'',
        list:[],
        actName:'',
        value:''
    }
  },
  watch:{},
 computed: {
   msg () {
     return this.$store.state.user_val
   },
   getList () {
     return this.$store.state.list
   }
 },
  methods:{
    //热门搜索
    hotSearch () {
      this.$axios.get("/api/v2/hotSearch",2)
        .then(res=>{
          this.hotList=res.data.data;
        }).catch(err=>{

      })
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
    turnUp:function(){//返回上一页
      this.$router.go(-1);
    },
    toSo (e) {//点击历史中的内容直接搜索
      this.$store.commit('SET_MSG', e.target.innerText);//将值传入store面
      this.search();
    },
    search () {//搜索
      this.list=[];
      this.$axios.get('/api/v2/findYxwActivityList')
        .then(res => {
          for(let i=0;i<res.data.data.list.length;i++){
            if(res.data.data.list[i].activeName.trim().indexOf(this.msg)>=0){
              this.list.push(res.data.data.list[i]);
            }
          }
          this.$store.commit('set_list', this.list);//将值传入store面
          lArr.push(this.msg);
          localStorage.removeItem("arr");
          localStorage.setItem('arr',lArr);
          this.history=Array.from(new Set(localStorage.arr.split(',').slice(0)));
        })
        .catch(err =>{
        });
    }
  },
  created(){
    this.hotSearch();
    this.history=Array.from(new Set(localStorage.arr.split(',').slice(0)));//让页面显示历史搜索的内容
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
  text-align: center;
}
.hot-box{
    padding:0 15px;
}
.hot{
    font-size:12px;
    color:#989898;
}
.hot>p{
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
