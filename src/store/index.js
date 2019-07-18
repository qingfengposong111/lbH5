import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user_val: '',
    list: null,
    map_val: null,
    homeSearchList:null,
    lltude:null,
    name_id: null,
    productId:'',
    pitch:null,
    schoolId: '',
    tab_sel:0, //tabbar选中
    position:{} ,
    screen: [],
    searchType:'',
    searchDist:'',
    searchSort:'',
    lessonClassifyId:'',
    lessonSortId: '',
    lessonAgeId: 1,
    lessonAllCityId:'',
    lessonList: null,
    activityName:'',//活动套票联系人
    tel:'',//活动套票联系电话
  },
  mutations: {
    "SET_MSG": function(state, user_val) {//亲子活动中搜索框中的值
      state.user_val = user_val
    },
    'set_list': function (state, list) {//亲子活动中模糊搜索拿到匹配的数组
      state.list = list
    },
    'set_map_val': function (state, map_val) {//亲子活动中的地址
      state.map_val = map_val
    },
    'set_hsearch': function (state, homeSearchList) {//主页模糊搜索拿到匹配的数组
      state.homeSearchList = homeSearchList
    },
    'set_tude': function (state, lltude) {//坐标
      state.lltude = lltude
    },
    'set_name_id':function (state, name_id) {
      state.name_id = name_id
    },
    'set_productId':function (state, productId) {
      state.productId = productId;
    },
    'set_pitch':function (state,pitch) {
      state.pitch = pitch;
    },
    'set_schoolId': function(state,schoolId) {
      state.schoolId = schoolId
    },
    "set_tab_sel":function(state,val){
      state.tab_sel=val
    },
    "POSITION":function(state,val){
      state.position=val
    },
    'set_screen': function (state, screen) {
      state.screen = screen;
    },
    'set_searchType': function (state,searchType) {
      state.searchType = searchType;
    },
    'set_searchDist': function (state,searchDist) {
      state.searchDist = searchDist;
    },
    'set_searchSort': function (state,searchSort) {
      state.searchSort = searchSort;
    },
    'set_lessonClassifyId': function (state,lessonClassifyId) {
      state.lessonClassifyId = lessonClassifyId;
    },
    'set_lessonAgeId': function (state,lessonAgeId) {
      state.lessonAgeId = lessonAgeId;
    },
    'set_lessonSortId': function (state,lessonSortId) {
      state.lessonSortId = lessonSortId;
    },
    'set_lessonAllCityId': function (state,lessonAllCityId) {
      state.lessonAllCityId = lessonAllCityId;
    },
    'set_lessonList': function (state, lessonList) {
      state.lessonList = lessonList;
    },
    'set_activityName': function (state, activityName){
      state.activityName = activityName;
    },
    'set_tel': function (state, tel) {
      state.tel = tel;
    }
  },
  getters: {
    "GET_MSG": function(state) {
      return state.user_val
    },
    'get_list': function (state) {
      return state.list
    },
    'get_map_val': function (state) {
      return state.map_val
    },
    'get_hsearch': function (state) {
      return state.homeSearchList
    },
    'get_tude': function (state) {//主页模糊搜索拿到匹配的数组
      return state.lltude
    },
    'get_name_id':function (state) {
      return state.name_id
    },
    'get_productId':function (state) {
      return state.productId;
    },
    'get_pitch':function (state) {
      return state.pitch ;
    },
    'get_schoolId': function(state) {
      return state.schoolId
    },
    'get_screen': function (state) {
      return state.screen;
    },
    'get_searchType': function (state) {
      return state.searchType;
    },
    'get_searchDist': function (state) {
      return state.searchDist;
    },
    'get_searchSort': function (state) {
      return state.searchSort;
    },
    'get_lessonClassifyId': function (state) {
      return state.lessonClassifyId;
    },
    'get_lessonAgeId': function (state) {
      return state.lessonAgeId;
    },
    'get_lessonSortId': function (state) {
      return state.lessonSortId;
    },
    'get_lessonAllCityId': function (state) {
      return state.lessonAllCityId;
    },
    'get_lessonList': function (state) {
      return state.lessonList;
    },
    'get_activityName': function (state) {
      return state.activityName;
    },
    'get_tel': function (state) {
      return state.tel;
    }
  },
  actions: {
    "SET_MSG": function(state, user_val) {
      state.commit("SET_MSG", user_val)
    },
    'set_list': function (state, list) {
      state.commit('set_list', list)
    },
    'set_map_val': function (state, map_val) {
      state.commit('set_map_val', map_val)
    },
    'set_hsearch': function (state, homeSearchList) {
      state.commit('set_hsearch', homeSearchList)
    },
    'set_tude': function (state, lltude) {
      state.commit('set_tude', lltude)
    },
    'set_name_id':function (state, name_id) {
      state.commit('set_name_id', name_id)
    },
    'set_productId':function (state, productId) {
      state.commit('set_productId', productId);
    },
    'set_pitch':function (state,pitch) {
      state.commit('set_pitch',pitch);
    },
    'set_schoolId': function(state,schoolId) {
      state.commit('set_schoolId',schoolId)
    },
    "set_tab_sel":function(state,val){
      state.commit('set_tab_sel', val)
    },
    'set_screen': function (state,screen) {
      state.commit('set_screen',screen);
    },
    'set_searchType': function (state,searchType) {
     state.commit('set_searchType',searchType);
    },
    'set_searchDist': function (state,searchDist) {
      state.commit('set_searchDist',searchDist);
    },
    'set_searchSort': function (state,searchSort) {
      state.commit('set_searchSort',searchSort);
    },
    'set_lessonClassifyId': function (state, lessonClassifyId) {
      state.commit('set_lessonClassifyId',lessonClassifyId)
    },
    'set_lessonAgeId': function (state, lessonAgeId) {
      state.commit('set_lessonAgeId',lessonAgeId)
    },
    'set_lessonSortId': function (state,lessonSortId) {
      state.commit('set_lessonSortId',lessonSortId)
    },
    'set_lessonAllCityId': function (state, lessonAllCityId) {
      state.commint('set_lessonAllCityId', lessonAllCityId);
    },
    'set_lessonList': function (state,lessonList) {
      state.commit('set_lessonList',lessonList)
    },
    'set_activityName': function (state, activityName) {
      state.commit('set_activityName',activityName)
    },
    'set_tel': function (state,tel) {
      state.commit('set_tel', tel);
    }
  }
});
export default store
