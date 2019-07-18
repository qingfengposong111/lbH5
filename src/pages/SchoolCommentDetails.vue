<template>
  <div class='com-detail'>
      <div class='head'>
        <flexbox :gutter='0'>
            <flexbox-item :span="1/5" >
            <div  class="return" @click='turnUp'>
                <img src="/static/btn_return.png" alt="">
            </div>
            </flexbox-item>
            <flexbox-item :span="3/5">
                 <p class="head-title">{{names}}</p>
            </flexbox-item>
            <flexbox-item :span="1/5">
                <div class='submit' @click="submit" :class="{fl:value.length>0}">
                  提交
                </div>
            </flexbox-item>
        </flexbox>
      </div>
      <div class='sch-det'>
          <p class='sch-det-title'>{{names}}</p>
          <div class='sch-det-star'>
                <rater  v-model="star" :min="0" :font-size="30" :margin='10' ></rater>
          </div>
          <div class='sch-det-con-list'>
                <flexbox :gutter='0' wrap='wrap'>
                    <flexbox-item :span='1/3' v-for='(item,a) in list' @click.native="select(a)" :key="a">
                        <div class="public sch-det-con">
                            <a class='sch-det-con-item' :class="{fs:item.isSelected}">
                                {{item.name}}
                            </a>
                        </div>
                </flexbox-item>
                </flexbox>
          </div>
          <div class='write-com'>
              <textarea name="" id="" v-model="value" cols="30" rows="10" placeholder="写下你对活动的评价吧~"></textarea>
            </div>
        <div class="view"  style="display:inline-block;">
          <ul class="lists">
            <li class="item" v-if="imgs!=''"  v-for="(item, index1) in imgs.split(',')" :key="index1">
              <img class="btn-img"  src="/static/btn_cancel@2x.png" @click="delImg(index1)">
              <img :src="item">
            </li>
            <li>
              <div class="image-view add-pic" style="display:inline-block;">
                <div class="addbox">
                  <input class="file" type="file" @change="getImgBase" multiple>
                  <div class="addbtn add-img">
                    <img src="/static/btn_grey_picture.png" alt="">
                  </div>
                  <p style="margin-top:-5px;">
                    添加图片
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
       <!--<div class="sup-foot">
            <flexbox :gutter="0">
                <flexbox-item>
                    <router-link to='' :class="{active: isActive=='1'}">
                        <div>
                            <div class="sup-phone">
                                <div class='phone-icon'  v-if="isActive=='1'"><span></span><img src="/static/icon_whitephoto.png" alt=""></div>
                                <div class='phone-icon'  v-if="isActive!='1'"><span></span><img src="/static/icon_phone.png" alt=""></div>
                                <p>电话咨询</p>
                            </div>
                        </div>
                    </router-link>
                </flexbox-item>
                <flexbox-item>
                    <router-link   :to="'/school/Enlist/'+this.$route.params.id" :class="{ active: isActive=='2'}">
                        <div class="vux-1px-l">
                            <p>在线报名</p>
                        </div>
                    </router-link>
                </flexbox-item> <flexbox-item>
                    <router-link :to="'/school/commentDetails/'+this.$route.params.id" :class="{ active: isActive=='3'}">
                        <div class="vux-1px-l">
                            <p>马上评论</p>
                        </div>
                    </router-link>
                </flexbox-item>
            </flexbox>
        </div>-->
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      star:0,
      isActive:1,
      names:'',
      list:[
        /*{
          contain:'环境优雅',
          isSelected:false
        },{
          contain:'老师超赞',
          isSelected:false
        },
        {
          contain:'体验超级棒',
          isSelected:false
        },
        {
          contain:'服务热情',
          isSelected:false
        },
        {
          contain:'高大上',
          isSelected:false
        },
        {
          contain:'干净卫生',
          isSelected:false
        },
        {
          contain:'性价比高',
          isSelected:false
        },
        {
          contain:'交通方便',
          isSelected:false
        }*/],
      value:'',
      imgBase64: [],
      imgs:'',
      tagList: []
    }
  },
  watch:{},
  computed:{
    getNameid () {
      return this.$store.state.name_id;
    },
  },
  methods:{
    turnUp:function(){
      this.$router.go(-1);
    },
    select(index){
      this.list[index].isSelected = !this.list[index].isSelected;
      if(this.list[index].isSelected===true){
        this.tagList.push(this.list[index].id)
      }else {
          if(this.tagList.indexOf(this.list[index].id)>-1){
             this.tagList.splice(this.tagList.indexOf(this.list[index].id),1)
          }
      }
    },
    getImgBase(){
      let _this = this;
      let event = event || window.event;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      this.$axios.post('/api/v2/uploadImage',
        param,{
          headers:{"Content-Type":"multipart/form-data"}
        }).then(res=>{
        this.imgBase64.push(res.data.data);
        this.imgs=this.imgBase64.join(',');
      }).catch(err=>{
      });
    },
    //删除图片
    delImg(index1){
      this.imgBase64.splice(index1,1);
      this.imgs=this.imgBase64.join(',')
    },
    submit () {
      let that = this;
      if(this.value!=''){
        this.$axios.post('/api/v2/commitSchoolComment',{
          sId:this.$route.params.id,
          evaluation: this.value,
          score: this.star,
          tagList:this.tagList,
          evaUrl:this.imgs
        },{
          headers:{
            'token': localStorage.token
          }
        })
          .then(res =>{
            this.$router.push('/school/in/'+this.$route.params.id)
          })
          .catch(err=>{
            this.$vux.loading.show({
              text: '登录超时，请重新登录'
            });
            setTimeout(() => {
              this.$vux.loading.hide();
              that.$router.push({name:'login',query:{redirect:'/school/commentDetails/'+that.$route.params.id}});
            }, 1000)
          })
      }
    }
  },
  created(){
    this.$axios.get('/api/v2/schoolTags').then( res => {
      this.list= res.data.data;
      for(var i=0;i<this.list.length;i++){
        this.$set(this.list,i,Object.assign({},this.list[i],{isSelected:false}))
      }
      console.log(res)
    })
    let names = this.$store.state.name_id;
    this.names = names[0];
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.com-detail{
    height:100%;
    background: #fff;
}
.head-title{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.public{
  text-align: center;
}
.add-pic p{
    font-size:12px;
    color:#ccc;
    width: 100%;
  margin-top:5px!important;
    text-align: center;
}
textarea{
    width:100%;
    height:125px;
    background: #f5f5f5;
    border-radius: 3px;
    border-color:#ccc;
    padding:10px;
    outline:none;
    resize: none;
}

textarea::placeholder{
    color:#ccc;
}
.write-box{
    border:1px solid #ccc;
    background: #f5f5f5;
}
.write-com{
    padding:0 15px;
}
.sch-det{
    padding:0 15px;
    background: #fff;
}
.sch-det-con{
    margin-bottom:15px;
}
.sch-det-con-item{
    display:inline-block;
    color:#666;
    font-size:12px;
    height:29px;
    line-height: 29px;
    background: #eee;
    padding:0 10px;
    width: 100px;
  text-align: center;
    border-radius: 15px;
}
.addbox{
  padding-top:5px;
}
.sch-det-title{
    font-size:16px;
    color:#666;
    line-height:44px;
    border-bottom:1px solid #eee;
}
.sch-det-star{
    text-align: center;
    line-height: 60px;
}
.submit{
    background: #ccc;
    color:#fff;
    width:60px;
    line-height: 29px;
    border-radius: 15px;
    text-align: center;
}

.add-pic{
  width:75px;
  height:75px;
  border:1px dashed #ccc;
  border-radius: 2px;
  position:relative;
}
.add-img{
  width:40px;
  height:35px;
  margin: 0 auto;
}
.add-pic img{
  width:100%;
  height:100%;
}
.file{
  position:absolute;
  display:block;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  opacity:0;
}
.lists{
  list-style: none;
  display:inline-flex;
  justify-content:flex-start;
  width: 100%;
  flex-wrap: wrap;
  padding-left:10px;
}
.lists li{
  width: 75px;
  margin-right:8px;
  margin-bottom:10px;
  height: 75px;
  overflow:hidden;
  position:relative;

}
.lists img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}
.lists .btn-img{
  position:absolute;
  top: 0;
  right: 0;
  display: block;
  width: 20px;
  height: 20px;
}
.fl{
    color:#5EE2C6;
    background: #fff;
}
  .fs{
    background: #5EE2C6!important;
    color:#fff!important;
  }
</style>
