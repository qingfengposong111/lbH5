<template>
  <div class='location-search'>
    <c-head>
      <div slot='left'>
        <div  class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <c-search slot='center' placeholder="输入关键词查询"></c-search>
      <div slot='right' @click="search">
        <router-link to=''><p class='search'>搜索</p> </router-link>
      </div>
    </c-head>
    <div class="onLessons" v-model="msg" v-if="msg.length>0&&list.length<=0">抱歉，未找到相关信息，换个关键词试试</div>
    <ul class="ul_list" v-else style="margin-top:46px;">
      <li v-for="(item,index) in list" :key="index" @click="pitch(index)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    components:{},
    props:{},
    data(){
      return {
        list: []
      }
    },
    watch:{},
    computed:{
      msg () {
        return this.$store.state.user_val
      }/*,
      getHomeSearch () {
        return this.$store.state.homeSearchList;
      }*/
    },
    methods:{
      turnUp:function(){
        this.$router.go(-1);
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
            res.data.data.list=this.list;
          })
          .catch(err =>{
          });
      },
      pitch (index) {
        this.$store.commit('set_pitch',this.list[index])
        this.$router.push('/home/AddBelongSchool')
      }
    },
    created(){
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .ul_list{
    width: 100%;
    padding:0 15px;
    list-style:none;
  }
  .ul_list li{
    padding:5px 0;
    border-bottom:1px solid #eee;
    font-size: 14px;
    color:#666;
  }
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
  .onLessons{
    width: 100%;
    text-align: center;
    padding-top:60%;
    color:#333;
  }
</style>
