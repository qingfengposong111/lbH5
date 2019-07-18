<template>
  <div class="act-detail" >
    <div class='head'>
      <flexbox :gutter='0'>
        <flexbox-item :span="1/5" >
          <div  class="return" @click="turup" >
            <img src="/static/btn_return.png" alt="">
          </div>
        </flexbox-item>
        <flexbox-item :span="3/5">
          <p class="head-title">{{list.productName}}</p>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="act-banner" >
      <swiper auto height="175px">
        <swiper-item class="black" height="175px">
          <h2 class="title fadeInUp animated"><img :src="list.productImg" alt=""></h2>
        </swiper-item>
      </swiper>
    </div>
    <group :gutter="0">
      <cell is-link @click.native="tom">
        <p  slot='title' class="act-title">{{list.productName}}</p>
        <p slot='title' class="link-title" ><span class="add-til">上课地点：</span>{{list.addr}}</p>
        <div>
          <p slot='title' class="link-distance">{{list.distance}}</p>
        </div>

      </cell>
      <cell is-link @click.native="tofac">
        <p slot='title' class="link-title" >{{proName}}</p>
        <img slot="icon" width="45" height="45" style="display:block;margin-right:5px;" :src="imgUrl">
      </cell>
    </group>

    <div class='teach-into'>
      <p class="tip">温馨提示：</p>
      <p class="tip-1">{{list.remark}}</p>
      <p class="tip-2"><span>报名费：￥</span>{{list.applicationFee | yuan}}  <span>学费：￥</span>{{list.marketPrice | yuan}} <span>折扣价：￥</span>{{list.promotePrice | yuan}}</p>
      <p class="tip-3">{{list.explain}}</p>
    </div>

    <div class="intro">
      <p>课程介绍</p>
      <div>
        {{list.describes}}
      </div>
    </div>


    <div class="sup-foot">
      <flexbox :gutter="0">
        <flexbox-item>
          <a :href="'tel:'+phone" :class="{active: isActive=='1'}">
            <div>
              <div class="sup-phone">
                <div class='phone-icon'  v-if="isActive=='1'"><span></span><img src="/static/icon_whitephoto.png" alt=""></div>
                <div class='phone-icon'  v-if="isActive!='1'"><span></span><img src="/static/icon_phone.png" alt=""></div>
                <p>电话咨询</p>
              </div>
            </div>
          </a>
        </flexbox-item>
        <flexbox-item>
          <router-link   to='' :class="{ active: isActive=='2'}">
            <div class="vux-1px-l">
              <p class="yuan">￥{{list.promotePrice | yuan}}/人</p>
            </div>
          </router-link>
        </flexbox-item> <flexbox-item>
        <router-link to="" @click.native="payment(list)" :class="{ active: isActive=='3'}">
          <div class="vux-1px-l">
            <p style="color:#fff; background: #eee;" v-if="list.endOrNot">已结束报名</p>
            <p v-else >立即报名</p>
          </div>
        </router-link>
      </flexbox-item>
      </flexbox>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        isActive: 1,
        list: [],
        latude: '',
        loogtude: '',
        address: '',
        proName:'',
        imgUrl:'',
        Aname: '',
        sId: '',
        phone:'',
        school: ''
      };
    },
    watch: {},
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
      },
      yuan: function (value) {
        return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
      }
    },
    computed: {

    },
    methods: {
      turup () {
        this.$router.go('-1')
      },
      getData () {
        this.$axios.get('/api/v2/agencyApplyDetail',{
          params: {
            productId:this.$route.params.id
          }
        })
          .then(res =>{
            this.list= res.data.data;
            this.latude = res.data.data.latitude;
            this.loogtude =res.data.data.longitude;
            this.address = res.data.data.addr;
            this.Aname= res.data.data.productName;
            this.imgUrl = res.data.data.agency.imgUrl;
            this.proName = res.data.data.agency.name;
            this.sId = res.data.data.agency.sId;
            this.phone = res.data.data.agency.consultPhone;
            localStorage.setItem('lat1',res.data.data.latitude);
            localStorage.setItem('lng1',res.data.data.longitude);
            localStorage.setItem('mname',this.Aname);
            localStorage.setItem('addrs',this.address);
          })
      },
      tom () {
        this.$router.push('/mapes');
      },
      tofac () {
        this.$router.push('/school/in/'+this.sId);
      },
      payment (list) {
        if(localStorage.token){
          if(list.endOrNot===true){
            return false;
          }else{
            this.$router.push('/school/Pay/'+this.$route.params.id+'/'+this.proName+'-'+this.Aname+'/'+this.list.applicationFee/100);
            this.$store.commit('set_productId', list.productId);
          }
        }else{
          this.logs();
        }
      },
      logs () {
        let that = this;
        this.$vux.loading.show({
          text: '请先登录'
        });
        setTimeout(() => {
          this.$vux.loading.hide()
          that.$router.push({name:'login',query:{redirect:'/school/CoursewareDetail/'+that.$route.params.id}});
        }, 1000)
      }
    },
    created() {
      this.getData();
      this.school = this.proName;
    },
    mounted() {

    }
  };
</script>
<style lang="less" scoped>
  .add-til{
    font-size: 12px;
    color:#666;
  }
  .head{
    position:fixed!important;
    top:0;
    left:0;
    width: 100%;
    z-index: 1000;
  }
  .teach-into,.intro{
    background: #fff;
    margin-top:15px;
    padding:15px;
  }
  .intro div{
    font-size: 14px;
  }
  .tip{
    color: #10AEFF;
    font-size: 14px;
  }
  .tip-1{
    font-size: 12px;
    color:#666;
  }
  .tip-2{
    font-size: 14px;
    color:#e4393c;
    margin:10px 0;
  }
  .tip-3{
    font-size: 12px;
    color:#e4393c;
  }
  .popular {
    display: block;
  }
  .mask {
    background: #fff;
    border-radius: 5px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
  .mask-box {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .mask p,
  .cancel {
    line-height: 44px;
    color: #666;
    font-size: 18px;
    text-align: center;
  }
  .mask p {
    border-bottom: 1px solid #eee;
  }
  .cancel {
    border-top: 1px solid #eee;
  }
  div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    z-index: 1000;
  }

  .sch-star {
    display: flex;
  }
  .user-zh {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .score {
    color: #fbb03b;
    font-size: 12px;
    margin-left: 10px;
  }
  .link-distance {
    color: #989898;
    font-size: 12px;
  }
  .vux-1px-l:before {
    top: 50%;
    transform: translateY(-13px);
    height: 26px;
    border-color: #eee;
  }
  .act-detail {
    background: #eeeeee;
    margin-bottom:44px;
  }
  .act-foot,
  .act-time,
  .act-support {
    background: #fff;
  }

  .act-banner {
    width: 100%;
    height: 175px;
    margin-top:44px;
  }
  .act-banner img {
    width: 100%;
    height: 175px;
    object-fit: cover;
  }
  .act-title {
    font-size: 14px;
    color: #666;
    line-height: 24px;
    font-weight: normal;
  }
  .act-status {
    width: 44px;
    height: 16px;
    background: #fc4d4d;
    border-radius: 8px;
    float: right;
  }
  div.act-status > p {
    color: #fff;
    font-size: 8px;
    text-align: center;
    line-height: 16px;
  }
  .act-end {
    width: 44px;
    height: 16px;
    background: #ccc;
    border-radius: 8px;
  }
  .act-foot {
    padding: 5px 15px;
  }
  .act-foot p {
    font-size: 10px;
    color: #ccc;
  }
  .act-icon {
    width: 16px;
    height: 14px;
  }
  .act-icon img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .link-title {
    color: #666;
    font-size: 14px;
  }
  .weui-cell:before {
    right: 15px;
  }
  .yuan {
    color: #5ee2c6;
  }
  .act-time {
    display: flex;
    padding: 10px 15px;
    position: relative;
  }
  .intro{
    padding-bottom:54px;
  }

</style>

