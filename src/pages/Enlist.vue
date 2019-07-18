<template>
  <div class='home-act'>
    <c-head>
      <div slot='left' >
        <div class="return" @click='turnUp'>
          <img src="/static/btn_return.png" alt="">
        </div>
      </div>
      <p slot='center' class='user-title' style="color:#fff;text-align: center;">在线报名</p>
    </c-head>
    <div class="act-main">
      <div class="noLessons" v-if="list.length<=0">还没有可报名的班级哦！</div>
      <ul class="order_list">
        <li v-for="(temp,index) in list" :key="index" @click="chose(index)">
          <div class="both_lr">
            <div class="left_img">
              <img :src="temp.productImg" alt="">
            </div>
            <div class="right_contain">
              <h4><span class="enlist_b">报名费：￥{{temp.applicationFee | yuan}}</span><!--:class="{label2:temp.active}"-->
                <span v-if="!temp.endOrNot"><span class="c" ><input class="ms" name="fain" :class="{label2:temp.active}"  type="radio" ><label  @click="" ></label></span></span>
                <span v-if="temp.endOrNot">已结束报名</span>
              </h4>
              <p class="t_d"><span class="tuition">学费：<s>￥{{temp.marketPrice | yuan}}</s></span><span class="discount">折扣价：￥{{temp.promotePrice | yuan}}</span></p>
              <p>{{temp.explain}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="bot" v-if="list.length>0">
        <p><span class="c"  @click="right"><input id="yd"  type="checkbox" ><label class="label"  @click="right" :class="{label2:ok}" for="yd"></label></span> <a href="https://www.labiyouxue.com/classApply/agreement">我已阅读《蜡笔幼学报名协议》</a></p>
        <div class="submit" @click="submit">交纳报名费预约名额</div>
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
        areaId: '',
        list: [],
        ok:false,
        s:false
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        let m = date.getMinutes();
        let h = date.getHours();
        MM = MM < 10 ? ('0' + MM) : MM;
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        return YY + '-' +MM + '-' + d + ' ' + h + ':' + m
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    watch:{},
    computed:{

    },
    created(){
      this.getData()
    },
    methods: {
      turnUp: function () {
        this.$router.go('-1');
      },
      right () {
        this.ok=!this.ok;
      },
      chose (index) {
        if(this.list[index].endOrNot){
          return false;
        }else{
          this.list[index].active=!this.list[index].active;
        }
      },
      getData () {
        this.$axios.get('/api/v2/showSchoolApply',{
          params: {
            sId:this.$route.params.id
          }
        })
          .then(res =>{
            this.list= res.data.data;
            for(var i=0;i<this.list.length;i++){
              this.$set(this.list,i,Object.assign({},this.list[i],{active:false}))
            }
          })
      },
      submit () {
        //判断是否有选中的
        let that = this;
        let total=0;
        let productId='';
        let lis = document.querySelectorAll('li');
        this.list.forEach(function(item,index){
          if(!item.endOrNot){
            if(lis[index].getElementsByTagName('input')[0].checked){
              total=item.applicationFee/100;
              productId=item.productId;
            }
          }
        });
      if(total===0){
          that.$vux.loading.show({
            text: '请选择课程'
          });
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 1000)
        }else{
          that.$store.commit('set_productId',productId)
          let yd = document.getElementById('yd');
          if(!yd.checked){
            this.ok=false;
            that.$vux.loading.show({
              text: '请先同意报名协议'
            });
            setTimeout(() => {
              that.$vux.loading.hide()
            }, 1000)
          }else{
            this.ok=true;
            that.$router.push('/school/Pay/'+productId+'/'+this.list[0].name+'/'+total);
          }
        }
      }
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  #yd,.ms{
    position:absolute;
    width: 12px;
    height: 12px;
    left:-1px;
    opacity:0;
    cursor:pointer;
    z-index: 10000;
  }
  span.c {
    position: relative;
    cursor:pointer;
    display: block;
    width: 12px;
    height: 12px;
    margin-right:10px;
    border:1px solid #ccc;
    /*margin: 20px 100px;*/
  }
  input+label{
    width: 12px;
    cursor:pointer;
    height: 12px;
    position: absolute;
    top: 0;
    left:0;
    z-index:1000;
  }
  input+label::after {
    content: '';
    opacity: 0;
    position: absolute;
    width: 7px;
    height: 4px;
    background: transparent;
    top: 1px;
    left: 1px;
    border: 3px solid #666;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .label2::after {
    opacity: 1!important;
  }
  input[type='radio']:checked+label::after {
    opacity: 1!important;
  }
  .bot{
    width: 100%;
    text-align: center;
    position:absolute;
    left:0;
    bottom:0;
  }
  .bot p{
    display:flex;
    justify-content: center;
    align-items:center;
  }
  .bot input{
    margin-right:10px;
  }
  .bot a{
    color:#10AEFF;
    font-size: 12px;
  }
  .submit{
    display:block;
    width: 90%;
    background: linear-gradient(to right, #A1FED6, #13C3B5);
    color:#fff;
    height: 44px;
    line-height: 44px;
    font-size:14px;
    text-align: center;
    margin:10px auto;
    border-radius:22px;
  }
  .enlist_b{
    font-size: 16px;
    color:#333;
  }
  .t_d{

    display:flex;
    justify-content:space-between;
  }
  .tuition{
    color:#10AEFF;
  }
  .discount{
    color:#e4393c;
  }
  .home-act{
    background: #FAFAFA;
    width: 100%;
    height: 100%;
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
  .act-main{
    padding:44px 15px 0;
    height: 100%;
  }
  .head{
    position:fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1000;
  }
  ul.order_list{
    margin:10px 0 0;
    list-style:none;
    height: 80%;
    overflow-y:auto;
  }
  .order_list li{
    width: 100%;
    height: 120px;
    background: #fff;
    border-radius:4px;
    overflow:hidden;
    padding:0px 10px;
    margin-bottom:20px;
    box-shadow:0 0 5px #EAEAEA;
  }
  .order_list li .left_img{
    width: 60px;
    height: 100px;
    overflow: hidden;
  }
  .left_img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .both_lr{
    width: 100%;
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
  }
  .right_contain{
    margin-left:10px;
    width: 78%;
  }
  .right_contain p{
    font-size: 12px;
    color:#989898;
  }
  h4{
    font-size: 14px;
    margin-bottom:5px;
    font-weight: 500;
    width: 100%;
    display:flex;
    color:#333;
    justify-content:space-between;
    align-items:center;
  }
  h4>span:last-child{
    font-weight: normal;
    color:#e4e4e4;
    font-size: 12px;
  }
.noLessons{
  width: 100%;
  text-align: center;
  padding-top:60%;
  color:#999;
}
</style>
