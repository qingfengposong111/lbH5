<template>
  <div class="outbox">
    <div class='screen-main'>
      <div class='screen-box'>

        <router-link  class='screen-con' to="" v-for='(item,a) in list' :key="a" @click.native="detailSearch (item.id,item.name)">
          <flexbox >
            <flexbox-item ><p class='sub-name'>{{item.name}}</p> </flexbox-item>
          </flexbox>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['id'],
    data () {
      return {
        list:[]
      }
    },
    methods: {
      /*当前城市的区*/
      getAreaa () {
        let that = this;
        this.$axios.get('/api/v2/schoolClassify',{
          params:{
            cityId:localStorage.selectCityId||localStorage.itselfId
          }
        }).then(res => {
          this.list = res.data.data.region;
          this.list.unshift({
            id:'',
            name:'附近'
          });
        });
      },
      //详细搜索
      detailSearch (sid,current) {
        this.$axios.get('/api/v2/search',{
          params: {
            town: sid,
            city: localStorage.selectCityId||localStorage.itselfId,
            sortType: this.$store.state.searchSort||'',
            classifyId:this.$store.state.searchType||'',
            name:this.$store.state.user_val,
            latitude:localStorage.lat,
            longitude:localStorage.lng
          }
        })
          .then(res => {
            this.list=res.data.data.list;
            this.$router.push('/home/homeSearchMain');
            this.handleData(this.list);
            this.$store.commit('set_screen',this.list);
            this.$store.commit('set_searchDist',sid);
            current = current.slice(0,4);
            this.$emit('dist',current)
          })
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
      }
    },
    created () {
      this.getAreaa();
    }
  }
</script>

<style scoped>
  .outbox{
    position:fixed;
    top:88px;
    left:0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.3);
  }
  .screen-main{
    display:flex;
    flex:1;
    background: #fff;
  }
  .screen-nav{
    background: #fff;
    width:33.33%;
    display:flex;
    flex-direction: column;
  }
  .screen-nav a{
    text-align: left;
    padding-left:15px;
    height:44px;
    display:block;
    font-size:16px;
    color:#666;
    border-bottom: 1px solid #f9f9f9;
    line-height: 44px;
  }
  .screen-box{
    flex:1;
    height: 300px;
    overflow-y:auto;
  }
  .screen-con{
    padding-left:10px;
    padding-right:15px;
    border-bottom:1px solid #e5e5e5;
    height:44px;
    line-height: 44px;
    display:block;
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
    vertical-align: text-bottom;
  }
  .active{
    border-top-color:#5EE2C6;
  }
</style>

