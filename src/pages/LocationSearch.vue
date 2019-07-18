<template>
  <div class='location-search'>
        <c-head>
            <div slot='left'>
                <div  class="return" @click='turnUp'>
                    <img src="/static/btn_return.png" alt="">
                </div>
            </div>
             <c-search slot='center' placeholder="城市/拼音"></c-search>
            <div slot='right'>
                <router-link to='' @click.native="goSearch"><p class='search'>搜索</p> </router-link>
            </div>
         </c-head>
         <div style="padding-top:30px;">
           <group>
             <div class="angle" :span="5/5" style="text-align:left;" v-for="(temp,a) in list" :key="a" @click="detail(temp.name)">{{temp.name}}</div>
           </group>
         </div>
   </div>
</template>

<script>
import PinYin from '../assets/js/pinyin'
export default {
  components:{},
  props:{},
  data(){
    return {
        hotList:['东莞深圳门','广州芳村芳村村','松山湖','松山湖','望牛墩','上海北京厦门门','中山'],
        history:['东莞大岭山','广州芳村芳村村','望牛墩','望牛墩','望牛墩','上海北京厦门门','中山中山山'],
        list: []
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
    },
    goSearch () {
      this.list = [];
      let that = this;
      this.$axios.get('/api/v2/getYxwRegionInfo').then(res =>{
        for(let i=0;i<res.data.data.length;i++){
          for(let j=0;j<res.data.data[i].cities.length;j++){
            if(res.data.data[i].cities[j].name.trim().indexOf(that.msg.trim())>=0||that.ConvertPinyin(res.data.data[i].cities[j].name.trim()).indexOf(that.msg.trim().toLocaleLowerCase())>=0){
              that.list.push(res.data.data[i].cities[j]);
            }
          }
        }
      })

    },
    detail (item) {
        this.$axios.get('/api/v2/getCity',{
            params:{
                name:item
            }
        }).then(res=>{
            localStorage.setItem('selectCityId',res.data.data[0].id);

        }).catch(err=>{

        });
      item = item.slice(0,3);
      /*this.$store.commit('set_city',item);*/
      localStorage.setItem('selectCityName',item);
      this.$router.push('/home')
    },
    ConvertPinyin(l1) {
      let l2 = l1.length;
      let I1 = "";
      let reg = new RegExp('[a-zA-Z0-9\- ]');
      for (let i = 0; i < l2; i++) {
        let val = l1.substr(i, 1);
        let name = this.arraySearch(val, PinYin);
        if (reg.test(val)) {
          I1 += val;
        } else if (name !== false) {
          I1 += name;
        }

      }
      I1 = I1.replace(/ /g, '-');
      while (I1.indexOf('--') > 0) {
        I1 = I1.replace('--', '-');
      }
      return I1;
    },

    arraySearch(l1) {
      for (let name in PinYin) {
        if (PinYin[name].indexOf(l1) !== -1) {
          return name;
        }
      }
      return false;
    }
    },
  created(){
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
  line-height:29px;
  text-align: center;
  font-size: 14px;
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
  .angle{
    padding:10px 0;
    margin-left:15px;
    border-bottom:1px solid #eee;
    font-size: 14px;
    color:#666;
  }
</style>
