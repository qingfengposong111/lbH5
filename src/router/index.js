import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: {name: 'home'},
    name: 'index',
    component: () =>
      import ('@/pages/Index'),
    children: [{
      path: 'home',
      name: 'home',
      component: () =>
        import ('@/pages/Home')
    },
      {
        path: 'school',
        name: 'school',
        component: () =>
          import ('@/pages/School')
      },
      {
        path: '/home/found',
        name: 'found',
        component: () =>
          import ('@/pages/found')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () =>
          import ('@/pages/Mine'),
      }
    ]
  },
    {
      path: '/home/homeSearch',
      name: 'homeSearch',
      component: () =>
        import ('@/pages/HomeSearch'),
    },
    {
      path: '/home/rule',
      name: 'rule',
      component: () =>
        import ('@/pages/rule'),
    },
    {
      path: '/home/homeSearchMain',
      name: 'homeSearchMain',
      component: () =>
        import ('@/pages/homeSearchMain'),
      children: [
        {
          path: 'AllCity',
          name: 'AllCity',
          component: () =>
            import ('@/components/AllCity')
        },
        {
          path: 'TK',
          name: 'TK',
          component: () =>
            import ('@/components/TK')
        },
        {
          path: 'Brain',
          name: 'Brain',
          component: () =>
            import ('@/components/Brain')
        }
      ]
    },

    {
      path: '/home/location',
      name: 'location',
      component: () =>
        import ('@/pages/Location')
    },
    {
      path: '/home/location/search',
      name: 'locationSearch',
      component: () =>
        import ('@/pages/LocationSearch')
    },
    {
      path: '/home/popular',
      name: 'popular',
      component: () =>
        import ('@/pages/Popular')
    },
    {
      path: '/home/fine',
      name: 'fine',
      component: () =>
        import ('@/pages/Fine')
    },
    {
      path: '/home/Forget',
      name: 'Forget',
      component: () =>
        import ('@/pages/Forget')
    },
    {
      path: '/home/login',
      component: () =>
        import ('@/pages/Login'),
      children: [
        {
          path: '/',
          name: 'login',
          component: () =>
            import ('@/components/GoLogin')
        },
        {
          path: 'Register',
          name: 'Register',
          component: () =>
            import ('@/components/Register')
        }
      ]
    },
    {
      path: '/home/activity',
      name: 'homeActivity',
      component: () =>
        import ('@/pages/HomeActivity')
    },
    {
      path: '/home/sonsearch',
      name: 'sonsearch',
      component: () =>
        import ('@/pages/SonSearch')//亲子活动中的搜索中显示内容的页面
    },
    {
      path: '/home/activity/search',
      name: 'activitySearch',
      component: () =>
        import ('@/pages/HomeActivitySearch')//亲子活动中的搜索框
    },
    {
      path: '/home/activity/detail/:id?',
      name: 'activityDetail',
      redirect: {name: 'actintro'},
      component: () =>
        import ('@/pages/HomeActivityDetail'),
      children: [{
        path: 'actintro',
        name: 'actintro',
        component: () =>
          import ('@/components/ActIntro')
      },
        {
          path: 'record',
          name: 'Record',
          component: () =>
            import ('@/components/ActRecord'),

        }, {
          path: 'comment',
          name: 'actComment',
          component: () =>
            import ('@/components/ActComment')
        }]
    },
    {
      path: '/home/activity/userComment',
      name: 'userComment',
      component: () =>
        import ('@/pages/UserComment'),
      redirect: {name: 'commentAll'},
      children: [{
        path: 'commentAll',
        name: 'commentAll',
        component: () =>
          import ('@/components/CommentAll')
      }, {
        path: 'commentLessVal',
        name: 'commentLessVal',
        component: () =>
          import ('@/components/CommentLessVal'),

      }, {
        path: 'commentMap',
        name: 'commentMap',
        component: () =>
          import ('@/components/CommentMap'),

      }, {
        path: 'commentNew',
        name: 'commentNew',
        component: () =>
          import ('@/components/CommentNew'),

      }]
    },
    {
      path: '/home/activity/userCommentDetail/:id?',
      name: 'userCommentDetail',
      component: () =>
        import ('@/pages/UserCommentDetail')
    },
    {
      path: '/home/activity/OnlineRegistration/:id?/:title?',
      name: 'OnlineRegistration',
      component: () =>
        import ('@/pages/OnlineRegistration')
    },
    {
      path: '/school/search',
      name: 'schoolSearch',
      component: () =>
        import ('@/pages/SchoolSearch')
    },
    {
      path: '/school/in/:id?',
      name: 'schoolIn',
      component: () =>
        import ('@/pages/SchoolIn')
    },
    {
      path: '/home/schoolsearchlist',
      name: 'schoolsearchlist',
      component: () =>
        import ('@/pages/SchoolSearchList'),//学校中的搜索中显示内容的页面
    },
    {
      path: '/school/commentDetails/:id?',
      name: 'schoolCommentDetails',
      component: () =>
        import ('@/pages/SchoolCommentDetails')
    },
    {
      path: '/school/schoolComDetail/:id?',
      name: 'schoolComDetail',
      component: () =>
        import ('@/pages/SchoolComDetail')
    },
    {
      path: '/school/intro/:id?',
      name: 'schoolIntro',
      component: () =>
        import ('@/pages/SchoolIntro')
    },
    {
      path: '/school/scenery/:id',
      name: 'schoolScenery',
      component: () =>
        import ('@/pages/SchoolScenery')
    },
    {
      path: '/school/Enlist/:id?',
      name: 'enlist',
      component: () =>
        import ('@/pages/Enlist')
    },
    {
      path: '/school/Pay/:id?/:tip?/:money?',
      name: 'pay',
      component: () =>
        import ('@/pages/Pay')
    },
    {
      path: '/home/Pay/:aid?/:tid?/:tip?/:tm?/:money?',
      name: 'Activitypay',
      component: () =>
        import ('@/pages/ActivityPay')
    },
    {
      path: '/school/CourseList/:id?/:jd?/:wd?',
      name: 'courselist',
      component: () =>
        import ('@/pages/CourseList')
    },
    {
      path: '/school/CoursewareDetail/:id?',
      name: 'CoursewareDetail',
      component: () =>
        import ('@/pages/CoursewareDetail')
    },
    {
      path: '/home/AddBelongSchool',
      name: 'AddBelongSchool',
      component: () =>
        import ('@/pages/AddBelongSchool')
    },
    {
      path: '/home/school/SchoolComment/:id?',
      name: 'SchoolComment',
      component: () =>
        import ('@/pages/SchoolComment'),
      redirect: {name: 'SchoolcommentAll'},
      children: [{
        path: 'SchoolcommentAll',
        name: 'SchoolcommentAll',
        component: () =>
          import ('@/components/SchoolCommentAll')
      }, {
        path: 'SchoolcommentLessVal',
        name: 'SchoolcommentLessVal',
        component: () =>
          import ('@/components/SchoolCommentLessVal'),

      }, {
        path: 'SchoolcommentMap',
        name: 'SchoolcommentMap',
        component: () =>
          import ('@/components/SchoolCommentMap'),

      }, {
        path: 'SchoolcommentNew',
        name: 'SchoolcommentNew',
        component: () =>
          import ('@/components/SchoolCommentNew'),
      }]
    },
    {
      path: '/home/BelongSearch',
      name: 'BelongSearch',
      component: () =>
        import ('@/pages/BelongSearch')
    },
    {
      path: '/find',
      name: 'find',
      component: () =>
        import ('@/pages/Find')
    },
    {
      path: '/tipoff',
      name: 'tipoff',
      component: () =>
        import ('@/pages/tipoff')
    },
    {
      path: '/tiplist',
      name: 'tiplist',
      component: () =>
        import ('@/pages/tiplist')
    },
    {
      path: '/tipsend',
      name: 'tipsend',
      component: () =>
        import ('@/pages/tipsend')
    },
    {
      path: '/tipdetail/:id?',
      name: 'tipdetail',
      component: () =>
        import ('@/pages/tipdetail')
    },
    {
      path: '/fdetail/:id?',
      name: 'fdetail',
      component: () =>
        import ('@/pages/Fdetail')
    },
    {
      path: '/find/release',
      name: 'findRelease',
      component: () =>
        import ('@/pages/FindRelease')
    }, {
      path: '/mine/user',
      name: 'userMes',
      component: () =>
        import ('@/pages/UserMes')
    }, {
      path: '/mine/school',
      name: 'attentionSchool',
      component: () =>
        import ('@/pages/AttentionSchool')
    }, {
      path: '/mine/set',
      name: 'setUp',
      component: () =>
        import ('@/pages/SetUp')
    }, {
      path: '/mine/act',
      name: 'activity',
      component: () =>
        import ('@/pages/Activity')
    },
    {
      path: '/mine/belongedToSchool',
      name: 'belongedToSchool',
      component: () =>
        import ('@/pages/BelongedToSchool')
    },
    {
      path: '/mine/MyOrder',
      name: 'myOrder',
      component: () =>
        import ('@/pages/MyOrder')
    },
    {
      path: '/mine/wallet',
      name: 'wallet',
      component: () =>
        import ('@/pages/wallet')
    },
    {
      path: '/mine/withdrawal',
      name: 'withdrawal',
      component: () =>
        import ('@/pages/withdrawal')
    },
    {
      path: '/mine/Feedback',
      name: 'feedback',
      component: () =>
        import ('@/pages/Feedback')
    },
    {
      path: '/mine/About',
      name: 'about',
      component: () =>
        import ('@/pages/About')
    },
    {
      path: '/mapes',
      name: 'mapes',
      component: () =>
        import ('@/pages/mapes')
    },
    {
      path: '/home/moreLesson',
      name: 'moreLesson',
      component: () =>
        import ('@/pages/MoreLesson'),
      children: [
        {
          path: 'LessonAllCity',
          name: 'LessonAllCity',
          component: () =>
            import ('@/components/LessonAllCity')
        },
        {
          path: 'AllLesson',
          name: 'AllLesson',
          component: () =>
            import ('@/components/AllLesson')
        },
        {
          path: 'SmargSort',
          name: 'SmargSort',
          component: () =>
            import ('@/components/SmargSort')
        },
        {
          path: 'Age',
          name: 'Age',
          component: () =>
            import ('@/components/Age')
        },
      ]
    },
    {
      path: '/home/LessonSearch/:id?',
      name: 'LessonSearch',
      component: () =>
        import ('@/pages/LessonSearch')
    }
  ]
})
