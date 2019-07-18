<template>
  <div class="outbox">
    <div class='screen-main'>
      <div class='screen-nav'>
        <router-link @click.native="all(b,claS.name)" to="" v-for="(claS,b) in firstClassfity" :key="b"   :class='b==selected?"navactive":""'>{{claS.name}}</router-link>
      </div>
      <div class='screen-box'>
        <router-link  class='screen-con'  @click.native="detailSearch(item.id,item.classifyName)"  to='' v-for='(item,a) in lists' :key="a">
          <flexbox >
            <flexbox-item><p class='sub-name'>{{item.classifyName}}</p> </flexbox-item>
          </flexbox>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    components:{
    },
    props:['id'],
    data(){
      return {
        firstClassfity: [],
        lists:[],
        add:false,
        cfy:'',// 主分类类别id,
        selected:-1,
        sel:false
      }
    },
    watch:{},
    computed:{

    },
    created(){
      this.classfity()
    },
    methods: {
      //单一的全部
      only (e) {
        this.sel = true;
        this.$emit('father',e.target.innerText)
      },
      all (index,current) {
        this.lists = [];
        this.selected=index;
        if(this.firstClassfity[index]){
          this.lists=this.firstClassfity[index].classifies;
          this.cfy = this.firstClassfity[index].id;
          this.firstClassfity[index].add = true;
        }
      },
      //大分类
      classfity () {
        this.$axios.get('/api/v2/schoolClassify',{
          params:{
            cityId: localStorage.selectCityId||localStorage.itselfId
          }
        })
          .then(res => {
            this.firstClassfity = res.data.data.category;
            this.firstClassfity.unshift({
              id:0,
              name:'全部',
              classifies: [
                {
                  classifyName:"全部分类",
                  id: 0
                }
              ]
            });
            for(let i=0;i<this.firstClassfity.length;i++){
              this.$set(this.firstClassfity,i,Object.assign({},this.firstClassfity[i],{add:false}))
            }
          })
      },
      //详细搜索
      detailSearch (sid,current) {
        this.$axios.get('/api/v2/search',{
          params: {
            classifyId:sid,
            city: localStorage.selectCityId||localStorage.itselfId,
            sortType: this.$store.state.searchSort,
            town: this.$store.state.searchDist,
            name:this.$store.state.user_val,
            latitude:localStorage.lat,
            longitude:localStorage.lng,
            pageSize:100
          }
        })
          .then(res => {
            this.$emit('father',current);
            this.list=res.data.data.list;
            this.$router.push('/home/homeSearchMain');
            this.handleData(this.list);
            this.$store.commit('set_screen',this.list);
            this.$store.commit('set_searchType',sid);
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
  .screen-main{
    display:flex;
    flex:1;
    background: #eee;
  }
  .screen-nav{
    background: #fff;
    width:33.33%;
    display:flex;
    flex-direction: column;
  }
  .vux-tab .vux-tab-item.vux-tab-selected i{
    border-top:4px solid #5EE2C6;
  }
  .screen-nav a{
    text-align: left;
    padding-left:15px;
    height:44px;
    display:block;
    font-size:16px;
    color:#666;
    border-bottom: 1px solid #eee;
    line-height: 44px;
  }
  .screen-box{
    flex:1;
    overflow-y:auto;
    height:300px;
  }
  .screen-con{
    padding-left:10px;
    padding-right:15px;
    border-bottom:1px solid #e5e5e5;
    height:44px;
    line-height: 44px;
    display:block;
  }
  a.navactive{
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
  }
  .active{
    border-top-color:#5EE2C6;
  }

  .tost{
    width: 100%;
    height: 100%;
    position:fixed;
    left:0;
    top:88px;
    z-index:1000;
    background: rgba(0,0,0,.3);
  }
  .tost-main{
    width: 100%;
    height: 60%;
    display:flex;
    justify-content: flex-start;
    background: #eee;
  }

</style>

