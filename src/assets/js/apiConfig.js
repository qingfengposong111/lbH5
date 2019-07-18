const api = {
    /**
     * 活动模块
     */
    activity: {
        //广告接口
        getAdvImg: '/api/v2/getAdvImg',
        //活动列表
        findYxwActivityList: '/api/v2/findYxwActivityList',
        //活动详情
        getYxwActivity: '/api/v2/getYxwActivity',
        //赞助商
        findYxwActivitySponsorsList: '/api/v2/findYxwActivitySponsorsList',
        //印记
        findYxwActivityPictureList: '/api/v2/findYxwActivityPictureList',
        //提交评论
        commitActivityComment: '/api/v2/commitActivityComment',
        //评论列表
        activityComments: '/api/v2/activityComments',
        //用户评论详情（父）
        activityCommentDetail1: '/api/v2/activityCommentDetail1',
        //用户评论详情（子）
        activityCommentDetail2: '/api/v2/activityCommentDetail2',
        //回复
        activityReply: '/api/v2/api/v2/activityReply',
        //点赞
        activityLike: '/api/v2/activityLike',
        //收藏活动
        collectActivity: '/api/v2/collectActivity',
    },
    /**
     * 学校模块
     */
    school: {
        //显示教育机构列表 / 查询教育机构
        showAll: '/api/v2/showAll',
        //教育机构详情页(除评论)
        showDetail: '/api/v2/showDetail',
        //详情页--校园风采
        schoolPics: '/api/v2/schoolPics',
        //详情页--学校简介
        schoolProfile: '/api/v2/schoolProfile',
        //详情页--用户评价列表
        schoolComments: '/api/v2/schoolComments',
        //详情页--用户评价详情(父评论)
        schoolCommentDetail1: '/api/v2//api/v2/schoolCommentDetail1',
        //详情页--用户评价详情(子评论)
        schoolCommentDetail2: '/api/v2/schoolCommentDetail2',
        //详情页--收藏学校
        collectSchool: '/api/v2/collectSchool',
        //用户评价--显示学校标签
        schoolTags: '/api/v2/schoolTags',
        //用户评价--评价学校
        commitSchoolComment: '/api/v2/commitSchoolComment',
        //用户评价--回复
        schoolReply: '/api/v2/schoolReply',
        //学校评论点赞
        schoolLike: '/api/v2/schoolLike',
        //显示举报
        showReport: '/api/v2/showReport',
        //提交举报
        commitReport: '/api/v2/commitReport',
        //学校筛选--分类层
        schoolClassify: '/api/v2/schoolClassify',
        //学校筛选--具体机构层
        search: '/api/v2/search',
        //显示热门搜索
        hotSearch: '/api/v2/hotSearch'
    },
    /**
     * 我的模块
     */
    mine: {
        //个人信息--编辑
        editPersonInfo: '/api/v2/editPersonInfo',
        //个人信息--显示
        showPersonInfo: '/api/v2/showPersonInfo',
        //关注学校
        schoolCollections: '/api/v2/schoolCollections',
        //活动报名--已关注
        activityCollections: '/api/v2/activityCollections',
        //活动报名--已报名
        activityApply: '/api/v2/activityApply',
        // 短信验证
        sendSmsCode: '/api/v2/sendSmsCode/13559700127',
        //登录注册接口
        login: '/api/v2/login',
        //城市定位列表
        getYxwRegionInfo: '/api/v2/getYxwRegionInfo',
        //上传图片
        uploadImage: '/api/v2/uploadImage',
        //根据城市名返回城市信息
        getCity: '/api/v2/getCity',
        //问题反馈
        feedback: '/api/v2/feedback',
        //所属学校--提交
        schoolBelongCommit: '/api/v2/schoolBelongCommit',
        //所属学校--显示
        schoolBelongShow: '/api/v2/schoolBelongShow',
        //app版本信息返回
        appVersionInfo: '/api/v2/appVersionInfo',
    },
    /**
     * 幼学圈--模块
     */
    circle: {
        //(暂不用接)-------显示人气之星/活跃之星的第一名
        showTopOneStar: '/api/v2/showTopOneStar',
        //我的排名
        myRanking: '/api/v2/myRanking',
        //择我的奖品
        myAward: '/api/v2/myAward',
        //周排名(前50名)
        weekRank: '/api/v2/weekRank',
        //我的排名
        myRanking: '/api/v2/myRanking',
        //历史获奖名单
        historyWinner: '/api/v2/historyWinner',
        //幼学圈消息列表
        circleNewsList: '/api/v2/circleNewsList',
        //幼学圈评论列表
        circleComments: '/api/v2/circleComments',
        //幼学圈回复
        circleReply: '/api/v2/circleReply',
        //单个消息详情
        circleNewsDetail: '/api/v2/circleNewsDetail',
        //幼学圈点赞
        circleLike: '/api/v2/circleLike',
        //发布消息
        circlePublish: '/api/v2/circlePublish'
    },
    /**
     * 首页--模块
     */
    index: {
        //热门推荐
        popularRecommend: '/api/v2/popularRecommend',
        //优秀机构
        hotOrganization: '/api/v2/hotOrganization',
        //咨询阅读量+1(不需要接)
        newsRedirection: '/api/v2/newsRedirection',
        //部分系统配置
        setting: '/api/v2/setting',
    },
    /**
     * 在线报名--模块
     */
    signUp: {
        //显示学校报名的产品
        showSchoolApply: '/api/v2/showSchoolApply',
        //显示机构产品列表
        showAgencyApply: '/api/v2/showAgencyApply',
        //机构报名产品详情
        agencyApplyDetail: '/api/v2/agencyApplyDetail',
        //订单列表显示
        orderList: '/api/v2/orderList',
        //下单接口
        h5PayUrl: '/api/h5PayUrl'
    }
}

export default api;