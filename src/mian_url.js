export const apiService = {};


//新接口URL测试环境
apiService.testBaseUrl = 'https://test.cityworks.cn/baoan';
apiService.testNewUrl = 'https://test.cityworks.cn';

//新接口URL线上环境
apiService.prodBaseUrl = 'http://10.99.34.8/baoan';
apiService.prodNewUrl = 'http://10.99.34.8';

//新接口URL dev环境
apiService.devBaseUrl = '/refactor/baoan';
apiService.devNewUrl = '/refactor';


apiService.proc = process.env.NODE_ENV; //开发

let urlArray = (function(urlType) {
    switch (urlType) {
        case "testBuild":
            return [apiService.testBaseUrl, apiService.testNewUrl];
            break;
        case "development":
            return [apiService.devBaseUrl, apiService.devNewUrl];
            break;
        case "production":
            return [apiService.prodBaseUrl, apiService.prodNewUrl];
            break;
    }


})(apiService.proc)

let arcgisEnv = (function setEnv() {
    if (apiService.proc == "testBuild") {
        //idc的服务
        arcgisCss = "https://baoan.cityworks.cn:2002/baoan/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/esri/css/esri.css";
        GET_MAP_CONFIG = "https://baoan.cityworks.cn:2002/baoan/web_static/xml/config3.xml";
        arcgisInitJs = "https://baoan.cityworks.cn:2002/baoan/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/init.js";
        geometeryServiceUrl = "http://121.201.65.133:2001/arcgis/rest/services/Utilities/Geometry/GeometryServer";

    } else if (apiService.proc == "production") {

        arcgisCss = "http://10.99.34.8/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/esri/css/esri.css";
        GET_MAP_CONFIG = "http://10.99.34.8/web_static/xml/config3.xml";
        arcgisInitJs = "http://10.99.34.8/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/init.js";
        geometeryServiceUrl= "http://10.99.34.4:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
    } else if (apiService.proc == "development") {
        //公司阿里云部署的服务
        arcgisCss = "http://cityworks.cn/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/esri/css/esri.css";
        GET_MAP_CONFIG = "http://cityworks.cn/baoan_water/xml/config3.xml";
        arcgisInitJs = "http://cityworks.cn/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/init.js";
        geometeryServiceUrl = "http://121.201.65.133:2001/arcgis/rest/services/Utilities/Geometry/GeometryServer";
    }
    window.layerConfig = {

        geometeryServiceUrl: geometeryServiceUrl,
        arcgisAPIUrl: arcgisInitJs,
        geometryPdfUrl: 'http://10.10.120.2:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
    }
    loadStyle(arcgisCss);

})()

function loadStyle(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}


baseUrl = urlArray[0];
newUrl = urlArray[1];

window.GET_EVENT_TYPE = baseUrl + "/patrol/event/types?size=100";

window.GET_RIVER_PARAGRAPH = baseUrl + "/rivers/1/reachs";

window.GET_RIVER_WALKER = baseUrl + "/rivers/1/reach/river/managers";

//获取工程详情
window.GET_PROJECT_DETAIL = baseUrl + "/projects/";

//获取所有工程类型
window.GET_PROJECT_TYPE = baseUrl + "/projects/statistics/name";

//获取河流治理工程列表
window.GET_PROJECT_STATUS = baseUrl + "/rivers";

//获取所有河流信息
window.GET_RIVER_INFO = baseUrl + "/rivers?size=999";

//上报事件
window.POST_EVENT_DETAIL = baseUrl + "/patrol/event";

//获取所有河管员列表
window.GET_RIVER_ALL_MANAGER_LIST = baseUrl + "/rivers/admin";

window.GET_RIVER_ALL_MANAGER_LISTNEW = baseUrl + "/rivers/online/group/people";

//获取所有巡查事件列表
window.GET_ALL_EVENTS_LIST = baseUrl + "/patrol/events";

//获取所有河管员列表
window.GET_RIVER_ALL_MANAGER_SUM = baseUrl + "/rivers/admin?size=1";


//上传实时GPS信息
window.POST_REAL_TIME_GPS = baseUrl + "/gps/upload";

//获取事件详情
window.GET_EVENT_DETAIL = baseUrl + "/patrol/events/";

//获取轨迹
window.GET_ROUTE = baseUrl + "/gps/users/105?startTime=&endTime="

//获取更新
// window.GET_APP_UPDATE = baseUrl + '/apps/updated';
window.GET_APP_UPDATE = newUrl + '/app-management/v1/app/version/latest/release';

//获取地图配置项
// window.GET_MAP_CONFIG = "https://baoan.cityworks.cn:2002/baoan/web_static/xml/config3.xml";


//登录
window.POST_LOGIN = baseUrl + '/login';
//获取所有巡查人员列表
// window.GET_ALL_PEOPLE = baseUrl + "/rivers/admin?size=1000&online=1";
//增加宝排和油烟在线列表
window.GET_ALL_PEOPLE = baseUrl + "/rivers/all/onlinePeople?size=1000&online=1";
//角色获取
window.GET_ROLE = baseUrl + '/userInfo';
//获取监测点
window.GET_RIVER_POINT = baseUrl + '/rivers/';
//获取监测点历史数据
window.GET_RIVER_POINT_HISTORY = baseUrl + '/monitorPoints/';
//获取河流详情
window.GET_RIVER_DETAIL = baseUrl + '/rivers/';
//获取在岗人员
window.GET_ONLINE_PEOPLE = baseUrl + '/rivers/admin?online=1';
//获取指定河流的河长
window.GET_RIVER_REACHS = baseUrl + '/rivers/';
//获取巡查事件统计信息
window.GET_WALKER_STATISTIC = baseUrl + '/patrol/events/statistics';

//获取用户详细信息
window.GET_USER_INFO = baseUrl + "/userInfo";

//统计管理员数量
window.GET_MANAGER_STATISTICS = baseUrl + "/statisticsManagers";

//获取上报事件数量
window.GET_EVENT_STATISTIC = baseUrl + '/patrol/events/current/statistics';

//获取所有的社区列表
window.GET_ALL_JD = baseUrl + '/rivers/grids?size=1000'

//获取可能产生废水的产品类别
window.GET_WATER_RANGE = baseUrl + '/enterprise/product/types';

//获取可能产生废水的生产工艺类别
window.GET_WATER_PRODUCT = baseUrl + '/enterprise/craft';

//上传小散乱污数据
window.POST_WATER_DATA = baseUrl + '/enterprise/event';

//上传 新小散乱污数据
window.POST_WATER_DATA_NEW = baseUrl + '/v1/littlePollute';

//获取小散乱污事件详情
window.GET_WATER_EVENT = baseUrl + '/enterprise/events';

//获取小散乱污事件详情
window.GET_WATER_EVENT_NEW = baseUrl + '/v1/littlePollute';


//获取社区列表
window.GET_RIVER_LIST = baseUrl + '/rivers/grids';

//获取事件详情
window.GET_RIVER_EVENT_DETAIL = baseUrl + '/enterprise/events/';

//获取事件详情
window.GET_RIVER_EVENT_DETAIL_NEW = baseUrl + '/v1/littlePollute/';


//统计小散乱污事件
window.GET_EVENT_SMALLSAN = baseUrl + '/enterprise/events/statistics';

//统计汽修
window.GET_CAR = baseUrl + '/v1/carRepairs/statistics'

//统计餐饮
window.GET_CATING = baseUrl + '/v1/caterings/statistics'

//获取小散乱污列表
window.GET_EVENT_SMALLSANLIEBIAO = baseUrl + '/enterprise/events';

//处理小散乱污事件
window.GET_EVENT_SMALLSANCLICK = baseUrl + '/enterprise/event/handler/';

//获取污乱事件详情
window.GET_DIRTY_EVENT = baseUrl + '/enterprise/events/';

//获取在线人数(新接口)
// window.GET_ONLINE_PEOPLE2 = baseUrl +  "/statisticsOnline";
//加了宝排和油烟
window.GET_ONLINE_PEOPLE2 = baseUrl + "/statisticsAllOnline";
//修改密码
// window.POST_UPDATEPASS = baseUrl +  "/changePassword";
window.POST_UPDATEPASS = newUrl + "/user-maneger/users/password";


//退回事件
window.POST_EVENT_BACK = baseUrl + '/patrol/event/handler/';

//接收事件
window.POST_EVENT_HANDLE = baseUrl + '/patrol/event/handler/';

//统计小散乱污处理方法
window.GET_EVENT_MEAN = baseUrl + '/enterprise/events/statisticsMeans/';

window.GET_STATICS_NUM = baseUrl + '/statistics/statisticsLittleDirtByTwo';
//新闻
window.GET_NEWS = newUrl + "/editor-news/news/list";
window.GET_NEWDETIL = newUrl + '/editor-news/news/';
///通知
window.GET_NOTICE = newUrl + '/editor-notice/notice/list';
window.GET_NOTICEDETIL = newUrl + '/editor-notice/notice';
//统计河长登录
window.GET_HEZHANG_TONGJI = baseUrl + "/statistics/managerWork";

//上报油烟执法事件
window.POST_LAMPBLACK = baseUrl + "/v1/lampblack"

//油烟事件列表
window.GET_LAMP_EVENT = baseUrl + '/v1/lampblack';
//油烟事件详情
window.GET_LAMP_DETAIL = baseUrl;
//油烟事件统计信息
window.GET_LAMP_STATISTIC = baseUrl;

//获取需要参与的会议通知列表
window.GET_MEETING_LIST = newUrl + '/river-meeting/v1/river/meetings/peoples'

//获取需要会议列表
window.GET_MEETING_LISTTWO = newUrl + '/river-meeting/v1/river/meetings'

//获取会议通知详情
window.GET_MEET_DETEAL = newUrl + '/river-meeting/v1/river/meetings/peoples/'
window.GET_MEET_DETEAL2 = newUrl + '/river-meeting/v1/river/meetings/'


//发起巡河预通知
window.POST_XUNHE_MESSAGE = newUrl + '/river-meeting/v1/river/beforehand/meetings'

//答复会议通知
window.POST_HUIDAMEETING = newUrl + '/river-meeting/v1/river/people/notices/'

//获取会议纪要

//window.GET_MEERING_JIYAO  =  'http://192.168.1.88:8080/editor/meetingSummary'

window.GET_MEERING_JIYAO = newUrl + '/editor-meeting/editor/meetingSummary'

//餐饮上报 /v1/caterings

window.POST_CATERING_BAO = baseUrl + '/v1/caterings'

//在管工业污染源排查表

window.POST_INDUSTRIAL = baseUrl + '/v1/industrial'

//在管工业污染源排查列表

window.GET_INDUSTRIAL = baseUrl + '/v1/industrial/'
    //餐饮列表 /v1/caterings

window.GET_CATERING_LIST = baseUrl + '/v1/caterings'

//餐饮详情
window.GET_CATERING_DETAIL = baseUrl;
//获取汽修洗车
window.POST_CAR_REPORT = baseUrl + '/v1/carRepairs';
//获取汽修列表
window.GET_CAR_LIST = baseUrl + '/v1/carRepairs';
//获取汽修详情
window.GET_CAR_DETAIL = baseUrl


/**
 *重构新接口
 */

//登录
window.POST_NEW_LOGIN = newUrl + '/reception-center/member/signIn';
//获取角色信息
window.GET_NEW_ROLE = newUrl + '/reception-center/member/who';
//获取角色权限
window.GET_NEW_ACCESS = newUrl + '/reception-center/member/permissionCode';
window.GET_CAR_DETAIL = baseUrl
    //获取流程
window.POST_PROCESS_LIST = baseUrl + '/activiti/activiti/process-list';
window.GET_LIST = baseUrl;
window.POST_LIST = baseUrl;
//hz统计的所有街道
window.GET_ALL_STREET = baseUrl + '/rivers/street';
//hz统计的执法任务
window.GET_ZF_STATISTIC = baseUrl + '/v1/missions/statistics/handled';
//hz每日执法统计详情
// window.GET_ZF_HISTORY = baseUrl + '/v1/missions/statistics/day/all';
window.GET_ZF_HISTORY = baseUrl + '/v1/envManager/statistics/reach';
//hz每月执法统计历史详情
window.GET_MONTHZF_HISTORY = baseUrl + '/v1/missions/statistics/mon/all';

//hz每日一巡
// window.GET_DAILY_STATISTIC = baseUrl + '/v1/missions/statistics/day/one';
window.GET_DAILY_STATISTIC = baseUrl + '/v1/envManager/statistics/reach';
window.GET_DAILY_HISTORY = baseUrl + '/v1/missions/statistics/day/reach';
// window.GET_HC_STATISTIC = baseUrl + '/v1/missions/day';
window.GET_HC_STATISTIC = baseUrl + '/v1/envManager';
window.POST_HC_TASKDTAIL = baseUrl + '/v1/missions/day/';
// window.GET_HC_HISTORY = baseUrl + '/v1/missions/day/';
window.GET_HC_HISTORY = baseUrl + '/v1/envManager/';
//每月的表单的历史记录
window.GET_MONTHFORM_HISTORY = baseUrl+'/v1/missions/mon/'

//hz每周一巡
window.GET_WEEK_STATISTIC = baseUrl + '/v1/missions/statistics/week/one'
window.GET_WEEK_TASKLIST = baseUrl + '/v1/missions/week'
window.GET_WEEK_HISTORY = baseUrl + '/v1/missions/week/'
window.GET_WEEK_ALL = baseUrl + '/v1/missions/statistics/week/all' //历史记录
window.GET_WEEK_ZFLIST = baseUrl + '/v1/missions/handled/week'
    //hz每月一巡
window.GET_MONTH_STATISTIC = baseUrl + '/v1/missions/statistics/mon/one';
window.GET_MONTH_TASKLIST = baseUrl + '/v1/missions/mon';
window.GET_MONTH_HISTORY = baseUrl + '/v1/missions/mon/';
window.POST_MONTH_HISTORY = baseUrl + '/v1/missions/mon/';
window.GET_MONTH_ALL = baseUrl + '/v1/missions/statistics/mon/all' //历史记录
window.GET_MONTH_ZFLIST = baseUrl + '/v1/missions/handled/mon';
//hz每季一巡
window.GET_YEAR_STATISTIC = baseUrl + '/v1/missions/statistics/quarter/one';
window.GET_YEAR_TASKLIST = baseUrl + '/v1/missions/quarter';
window.GET_YEAR_HISTORY = baseUrl + '/v1/missions/quarter/';
window.GET_YEAR_ALL = baseUrl + '/v1/missions/statistics/quarter/all'; //历史记录
window.GET_YEAR_ZFLIST = baseUrl + '/v1/missions/handled/quarter';
//hcz黑臭执法列表
// window.GET_HCZ_LIST = baseUrl + '/v1/missions/handled/day'
window.GET_HCZ_LIST = baseUrl + '/v1/envManager'
// window.POST_HCZ_SUB = baseUrl + '/v1/missions/handled/day/'
window.POST_HCZ_SUB = baseUrl + '/v1/envManager/'
// window.GET_HCZ_TONGJI = baseUrl + '/v1/missions/statistics/handled'
window.GET_HCZ_TONGJI = baseUrl + '/v1/envManager/statistics/one'

//hc每日一巡表单的标志牌悬挂
window.GET_LOGO_HANG = baseUrl + '/v1/missions/day/type/tagHang';
//hc每日一巡表单的应急物资
window.GET_EMERGECY_TYPE = baseUrl + '/v1/missions/day/type/emergencyType';
//hc每日一巡表单的废水收集
window.GET_WASTE_COLLECT = baseUrl + '/v1/missions/day/type/tubeType';
//hc每日一巡表单的危险贮存
window.GET_DANGER_TYPE = baseUrl + '/v1/missions/day/type/reserveType';
//hc每日一巡表单的三个排口
window.GET_OUTLET_TYPE = baseUrl + '/v1/missions/day/type/outletType';
//每月一巡的废气直排
window.GET_WASTE_GAS = baseUrl + '/v1/missions/mon/base/flueGas'
    //每月一巡的废水贮存
window.GET_WASTE_WATER = baseUrl + '/v1/missions/mon/base/waterKeep'
    //每月一巡的产污工艺
window.GET_WATER_KEEP = baseUrl + '/v1/missions/mon/base/crafe'
    //每月一巡的存在问题
window.GET_PROBLEM = baseUrl + '/v1/missions/mon/base/issue'
    //每月一巡表单提交
window.POST_FORM = baseUrl + '/v1/missions/mon';


window.GET_HEZHANG_PEOPLE = baseUrl + "/rivers/online/managers";


window.FORM_IMAGE_UPLOAD = newUrl + "/file-upload/v1/images/base64";


//获取人员统计页面接口
window.GET_PEOPLE_HEZHANG = baseUrl + '/rivers/online/managers';
window.GET_PEOPLE_DUANGUANYUAN = baseUrl + '/rivers/online/bp/people';
window.GET_PEOPLE_SHULIANG = baseUrl + '/rivers/statistics/all/online/people';
window.GET_PEOPLE_STREET = baseUrl + '/rivers/statistics/worker/online/people';
window.GET_PEOPLE_ZHENSHI = baseUrl + '/rivers/online/worker/people';
window.GET_PEOPLE_QITA = baseUrl + '/rivers/online/other/people';
window.GET_PEOPLE_FENLEI = baseUrl + '/rivers/statistics/online/managers';
window.GET_PEOPLE_FENLEI_DE = baseUrl + '/rivers/online/managers';
window.PATCH_EVENT = baseUrl + '/projects/';

//更换头像
window.GET_PEO = newUrl + '/user-maneger/users/'
window.POST_PEOPLE_TOU = newUrl + '/file-upload/v1/images/base64'
window.PATCH_MODIFY_TX = newUrl + '/user-maneger/users/'
    //小废水企业排查表单
window.POST_WASTEWATER_COM = baseUrl + '/v1/littleWater'
    //小废水企业排查表单列表
window.GET_WASTEWATER_COMLIST = baseUrl + '/v1/littleWater'
    //小废水企业排查表单详情
window.GET_WASTEWATER_COMDETAIL = baseUrl + '/v1/littleWater/'
    //小废水企业执法端列表
window.GET_XFSZF_LIST = baseUrl + '/v1/littleWater';
//小废水企业排查整治表单提交
window.PATCH_XFSZF_FORM = baseUrl + '/v1/littleWater/';
//小废水企业排查验收表单提交
window.PATCH_XFSYS_FORM = baseUrl + '/v1/littleWater/';



//小散乱污整治
window.PATCH_LITTLE_POLLUTE = baseUrl + '/v1/littlePollute/';

//获取通告列表
window.GET_TONGGAO = newUrl + '/editor-announcement/announcement/list';
//获取通告详情
window.GET_TONGGAO_DETAIL = newUrl + '/editor-announcement/announcement/';
//环保主任上报
window.POST_HUANBAOZHUREN_REPORT = baseUrl + '/v1/envManager/';
//环保主任上报事件列表
window.GET_HUANBAOZHUREN_REPORT = baseUrl + '/v1/envManager';


//无人机违法事件列表
window.GET_WURENJI_FZLIST = newUrl + '/uav/v1/illegal/record';

//无人机违法事件详情
window.GET_WURENJI_FZLIST_XQ = newUrl + '/uav/v1/illegal/record/';

window.GET_HUIYITONGJI = newUrl + '/river-meeting/v1/river/meetings/statistics'

//专项巡查模糊查询
window.GET_FUZZY_SEARCH = baseUrl + '/v1/automatic/enterprise';
//
window.GET_FUZZY_DETAIL = baseUrl + '/v1/automatic/enterprise/';
//企业端自动填充
window.GET_QIYE_AUTOFILL = baseUrl +'/v1/envManager/'
//获取告示牌相关的河长列表信息
window.GET_GONGGAOPAI_GOVERNOR = baseUrl + '/v1/governor/';
//获取河流告示牌信息
window.GET_GONGGAOPAI_BILLBOARD= baseUrl + '/v1/billboard/';