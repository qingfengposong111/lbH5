<template>
    <div style="position:absolute;width: 100%;height: 100%;">
      <div class='head'>
        <flexbox :gutter='0'>
          <flexbox-item :span="1/5" >
            <div  class="return" @click="turnUp" >
              <img src="/static/btn_return.png" alt="">
            </div>
          </flexbox-item>
          <flexbox-item :span="3/5">
            <p class="head-title">活动报名</p>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="notp" v-if="list.length==0">
        暂无套票可售！
      </div>
      <div class="content" v-else>
        <div class="main">
          <flexbox class="fbox" :gutter='0'>
            <flexbox-item><div class="mine-nav" style="width: 100%;">
              <p style="padding:10px 0;">{{this.$route.params.title}}</p>
            </div>
            </flexbox-item>
          </flexbox>
          <flexbox class="fbox" :gutter='0'>
            <flexbox-item><div class="mine-nav">
              <p>套票</p>
            </div>
            </flexbox-item>
          </flexbox>
          <div class="fbox" v-for="(temp,index) in list" :key="index">
            <div >
              <p class="titlename">{{temp.name}}</p>
            </div>
            <div class="fbox-right">
              <p>
                <span class="price">￥{{temp.marketPrice | yuan }}</span>
                <span class="c" @click="choose(temp,index)"><input class="radio" name="radio"  type="radio" ><label  @click="" ></label></span>
              </p>
            </div>
          </div>
        </div>
        <!--联系-->
        <div class="contact">
          <p>联系人信息</p>
          <div class="contact-input">
            <form action="">
              <input type="text" id="txt" placeholder="联系人姓名" v-model="txt">
              <input type="text" id="phone" placeholder="联系人电话" v-model="placeholder">
            </form>
          </div>
        </div>
      </div>

      <div class="til">
        * 请确保看清了活动介绍，缴费成功概不退款
      </div>
      <!--底部-->
      <div class="bottom">
        <div>
          <span>已优惠￥{{favourable | yuan }}</span>
          <span>￥{{current | yuan }}</span>
        </div>
        <div @click="goPay">去付款</div>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [],
        favourable:0,
        current:0,
        placeholder:'',
        txt:'',
        tid:'',
        tname:''
      }
    },
      methods: {
        turnUp () {
          this.$router.go('-1');
        },
        getData () {
          this.$axios.get('api/v2/showActivityPackage',{
            params:{
              activityId:this.$route.params.id
            }
          })
            .then(res =>{
              this.list = res.data.data;
            })
        },
        /*选中*/
        choose (item,index) {
          let lis = document.querySelectorAll('input');
          if(lis[index].checked){
            this.current = item.discountPrice;
            this.favourable = parseFloat(item.marketPrice-item.discountPrice);
            this.tid=item.id;
            this.tname = item.name;
          }
        },
        goPay () {
          this.$store.commit('set_activityName',this.txt);
          this.$store.commit('set_tel',this.placeholder);
          if(this.current!=0){
            this.$router.push('/home/Pay/'+this.$route.params.id+'/'+this.tid+'/'+this.$route.params.title+'/'+this.tname+'/'+(this.current/100).toFixed(2));
          }else{
            this.$vux.loading.show({
              text: '请选择一个活动套票'
            });
            setTimeout(() => {
              this.$vux.loading.hide()
            }, 1000)
          }
        }
      },
    filters: {
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    created () {
        this.getData();
    }
  }
</script>

<style scoped>
  .vux-1px-l:before{
    top:50%;
    transform: translateY(-13px);
    height:26px;
    border-color:#fff;
  }
  .mine-nav p{
    text-align: left;
    margin-top:5px;
  }
  .mine-main p{
    font-size:16px;
    color:#666;
  }
.main{
  width: 100%;
  height: 100%;
  background: #eee;
  position:relative;
}
  .fbox:first-child{
    background: #fff;
    margin-bottom:15px;
    display:flex;
    justify-content: space-between;
  }
  .main .fbox{
    border-bottom:1px solid #e4e4e4;
  }
  .main .fbox+.fbox{
    height: 44px;
    line-height: 44px;
    background: #fff;
    color:#666;
    display:flex;
    justify-content: space-between;
  }
  .fbox>div{
    padding:0 15px!important;
    box-sizing:border-box;
  }
  .fbox div:first-child{
    width:60%;
  }
  .titlename{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .fbox-right p{
    text-align: right !important;
  }
  span.c {
    position: relative;
    cursor:pointer;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left:3px;
    border:1px solid #ccc;
  }
  .radio{
    position:absolute;
    width: 12px;
    height: 12px;
    left:-1px;
    opacity:0;
    cursor:pointer;
    z-index: 10000;
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
  .price{
    color:#FF5353;
  }
  .contact{
    margin-top:10px;
    background: #fff;
    padding:15px;
    margin-bottom:60px;
  }
  .contact-input{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:10px;
  }
  .contact-input input{
    height: 44px;
    outline:none;
    border:1px solid #e4e4e4;
    padding:0 10px;
    font-size: 14px;
    box-shadow:none;
    border-radius:6px;
  }
  .contact-input input:first-child{
    width: 40%;
  }
  .contact-input input:last-child{
    width: 58%;
  }
  div.bottom{
    width: 100%;
    height: 44px;
    position:fixed;
    left:0;
    bottom:0;
    display:flex;
    background: #fff;
    justify-content:space-between;
  }
  div.bottom div:first-child{
    width: 70%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 15px;
    font-size: 14px;
    color:#666;
    text-align: right;
  }
  div.bottom div:last-child{
    width: 30%;
    text-align: center;
    line-height: 44px;
    background: #5EE2C6;
    color:#fff;
  }
  div.til{
    width: 100%;
    position:fixed;
    left:0;
    bottom:44px;
    background:#C7EFE7;
    font-size: 12px;
    color:#666;
    text-align: center;
    padding:5px 0;
  }
  .content{
    position:absolute;
    left:0;
    top:44px;
    width: 100%;
  }
  .notp{
    width: 100%;
    text-align: center;
    color:#666;
    position:absolute;
    left:0;
    top:50%;
  }
</style>
