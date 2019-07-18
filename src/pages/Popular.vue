<template>
  <div style="position:relative;">
    <div style="position:fixed;left:0;top:0;width: 100%;">
      <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
            <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title">热门推荐</div>
      </c-head>
      <div style="margin-top:44px;">
        <tab :line-width="1" custom-bar-width="0px" class="tabs" @on-before-index-change="switchTabItem">
          <tab-item selected   @on-item-click="around(1)">周边新闻</tab-item>
          <tab-item  class="vux-1px-l"  @on-item-click="around(2)">活动咨询</tab-item>
          <tab-item class="vux-1px-l"  @on-item-click="around(3)">学校咨询</tab-item>
          <tab-item class="vux-1px-l"  @on-item-click="around(4)">培训咨询</tab-item>
        </tab>
      </div>
    </div>

    <div class="popular-content" style="margin-top:88px;    padding-left: 15px;">
      <div @click="outline(index)" class="popular-box" :class="{showbg:temp.status===3}" v-for="(temp,index) in allList" :key="index">
        <p class="pop-title">{{temp.title}}</p>
        <flexbox :gutter="15">
          <flexbox-item :span="10/23">
            <div class="popular-img">
              <img :src="temp.imgUrl" alt="">
            </div>
          </flexbox-item>
          <flexbox-item :span="12/23">
            <div class="text-box">
              <flexbox orient="vertical" :gutter="20">
                <flexbox-item :span="3/5">
                  <p class="text">{{temp.describes}}</p>
                </flexbox-item>
                <flexbox-item :span="3/5">
                  <flexbox>
                    <flexbox-item>
                      <p class="date">{{temp.createTime|formatDate}}</p>
                    </flexbox-item>
                    <flexbox-item>
                      <flexbox :gutter='2'>
                        <flexbox-item :span="5/7"> <p class="count">{{temp.readNum}}</p> </flexbox-item>
                        <flexbox-item><div class="eye"> <img src="/static/icon_eyes.png" alt=""></div></flexbox-item>
                      </flexbox>
                    </flexbox-item>
                  </flexbox>
                </flexbox-item>
              </flexbox>
            </div>
          </flexbox-item>
        </flexbox>
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
        allList: [],
        arr: []
      }
    },
    watch:{},
    computed:{},
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        let YY=date.getFullYear();
        YY =YY.toString().substr(2, 2)
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return YY+'-'+MM + '-' + d
      }
    },
    methods:{
      turnUp:function(){
        this.$router.go(-1);
      },
      switchTabItem (index) {
        this.$vux.loading.show({
          text: 'loading'
        })
        setTimeout(() => {
          this.$vux.loading.hide();
          this.index01 = index
        }, 1000)
      },
      //数据
      around (type) {
        this.arr=[];
        this.$axios.get('/api/v2/popularRecommend',{
          params:{
            type: type
          }
        })
          .then(res=>{
            this.allList=res.data.data.list;
            for(let j=0;j<this.allList.length;j++){
              let ls= this.allList[j].url.slice(this.allList[j].url.indexOf('www')).replace(/%2F/g,'/');
              this.arr.push(ls);
            }
          })
          .catch(err=>{
          })
      },
      //外部链接
      outline (index) {
        window.location.href='https://'+this.arr[index];
      }
    },
    created(){},
    mounted(){
      this.around()
    }
  }
</script>
<style lang="less" scoped>
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#eee;
  }
  .pop-title{
    width: 96%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 14px;
    color:#000;
    font-weight: 500;
  }
  .popular-content {
    background: #fff;
    overflow-y:auto;
  }
  .text{
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
  }
  .popular-box {
    height: 150px;
    width: 100%;
    display:block;
    padding: 10px 15px 10px 0;
    background: #fff;
    border-top:1px solid #EEEEEE;
  }
  .showbg{
    background: url("/static/icon_recommended.png") no-repeat;
    background-position: 100% 0;
    background-size: 47px 47px;
  }
  .popular-box > p {
    /*font-size: 16px;*/
    /*color: #666666;*/
    margin-bottom:5px;
  }
  .popular-box:first-child{
    border-top:none;
  }
  .popular-img {
    width: 100%;
    height: 100px;
  }
  .popular-img img {
    width: 100%;
    height: 100%;
  }
  .popular-box .text{
    font-size:12px;
    color:#666666;
  }
  .text-box{
    width:100%;
    padding-top:5px;
    height:100px;
  }
  .eye{
    width:20px;
    height:20px;
  }
  .eye img{
    width:100%;
    height:100%;
  }
  .date{
    font-size:12px;
    color:#666666;
  }
  .count{
    font-size:12px;
    color:#FC8989;
    text-align: right;
  }
</style>
