// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import axios from 'axios'
import {
  Flexbox,
  Swiper,
  FlexboxItem,
  Loading,
  Scroller,
  LoadingPlugin,
  SwiperItem,
  LoadMore,
  ViewBox,
  XHeader,
  Tab,
  TabItem,
  Panel,
  Tabbar,
  TabbarItem,
  Group,
  Cell,
  XInput,
  XButton,
  Rater,
  XTextarea
} from 'vux'
import CSearch from './components/Search.vue'
import CHead from './components/Head.vue'
import Swipers from './components/Swiper.vue'
import CPanel from './components/Panel.vue'
import vuexI18n from 'vuex-i18n'
import Vuex from 'vuex'
import {Toast} from 'vux'
import 'es6-promise/auto'
import VueAMap from 'vue-amap'
import api from './assets/js/apiConfig'
import store from './store/index.js'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import wx from 'weixin-js-sdk'
/*/!*import wx from 'weixin-jsapi'*!/*/
Vue.use(wx)
Vue.use(preview)
Vue.use(LoadingPlugin);
Vue.use(Vuex);
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('view-box', ViewBox)
Vue.component('x-header', XHeader)
Vue.component('c-search', CSearch)
Vue.component('c-head', CHead)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('panel', Panel)
Vue.component('c-swiper', Swipers)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('rater', Rater)
Vue.component('x-textarea', XTextarea)
Vue.component('swiper', Swiper)
Vue.component('swiperItem', SwiperItem)
Vue.component('XHeader', XHeader)
Vue.component('loading', Loading)
Vue.component('scroller', Scroller)
Vue.component('c-panel', CPanel)
// import Home from './components/HelloFromVux'


axios.defaults.baseURL = /*'http://192.168.0.220:8081/';*/

  'https://api.labiyouxue.cn';
//'http://api.kingsf.cn'; //移动云


Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
// //高德地图
Vue.use(VueAMap);
// // 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'b78d11095fe9996753a79de8e0d197a0',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.CitySearch'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
axios.defaults.timeout = 10000; //请求超时
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
FastClick.attach(document.body);

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');
// http request 请求拦截器
 axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.getItem('token')}`;
    }
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        token: localStorage.getItem('token')
      }
    } else if (config.method === 'get') {
      config.params = {
        token: localStorage.getItem('token'),
        ...config.params
      }
    }
    return config;
  },
  err => {
    alert('加载超时');
    return Promise.reject(err);
  });


// http response响应 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.data.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          alert('会话过期!');
          router.replace({
            path: '/home/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });


