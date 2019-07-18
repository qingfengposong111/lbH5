<template>
  <div class='panel'>
      <div class='panel_bd'>
          <a :href="getUrl(item.url)" v-for="(item,a) in list" :key="a" @click.prevent="onItemClick(item)" class='media-box media-box_appmsg'>
              <div class='media-box_hd'>
                  <img class='media-box_thumb' :src="item.imgUrl" @error="onImgError(item, $event)" alt="">
              </div>
              <div class='media-box_bd'>
                <div class='media-box_head'>
                  <h4 class='media-box_title'>
                      {{item.name}}
                  </h4>
                  <div class='media-box_fd'>
                      {{item.distance?item.distance:'0km'}}
                  </div>
                </div>
                <div class="media-bot" style="width: 100%;display:flex;margin-bottom:2px;justify-content: space-between;align-items: center;position:relative;">
                  <p class='media-box_desc'> <span class="short">{{item.shortProfile}}</span></p>
                  <p><span class="showq" v-if="showq">推广</span></p>
                </div>

              </div>
          </a>
      </div>
  </div>
</template>

<script>
import { go, getUrl } from '../assets/js/router'
export default {
  components:{},
  props:{
    list: Array},
  data(){
    return {
      showq:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    onImgError (item, $event) {
      this.$emit('on-img-error', JSON.parse(JSON.stringify(item)), $event);
      if (item.fallbackSrc) {
        $event.target.src = item.fallbackSrc
      }
      if(item.rankTop){
        this.showq=true;
      }
    },
    getUrl (url) {
      return getUrl(url, this.$router)
    },
    onItemClick (item) {
      this.$emit('on-click-item', item);
      go(item.url, this.$router)
    }},
  created(){
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
.panel{
    background-color: #FFFFFF;
    position: relative;
    overflow: hidden;
    &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #E5E5E5;
        color: #E5E5E5;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    a.media-box {
        color: #000000;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 5px 15px;
        position: relative;
          &:before {
          content: " ";
          position: absolute;
          left: 15px;
          top: 0;
          right: 0;
          height: 1px;
          border-top: 1px solid #E5E5E5;
          color: #E5E5E5;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          }
          &:first-child {
            &:before {
                display: none
            }
        }
    }
    a.media-box_appmsg {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .media-box_appmsg .media-box_hd {
        margin-right: .5em;
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border:1px solid #eee;
        border-radius:4px;
    }
    .media-box_appmsg .media-box_thumb {
        width: 90%;
        height: 90%;
        margin-top:2px;
    }
    .media-box_appmsg .media-box_bd {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
    }
    .media-box_head{
      display:flex;
      margin-bottom:8px;
    }
    .media-box_title {
        color:#666666;
        font-weight: normal;
        font-size: 16px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        word-wrap: break-word;
        word-break: break-all;
        flex:1;
    }
    .media-box_desc {
        color: #CCCCCC;
        font-size: 12px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        position:relative;
    }
    span.short{
      width: 85%;
      padding:1px;
      display:inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    };
  span.showq{
    width: 12%;
    position:absolute;
    right:0;
    top:0;
    font-size: 10px;
    background: red;
    color:#fff;
    text-align: center;
    display:inline-block;
    padding:0 5px;
    border-radius:3px;
  };
  .media-box_fd{
      font-size:12px;
      color:#FC8989;
      line-height:25px;
  }
}
</style>
