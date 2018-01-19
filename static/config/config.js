/**
 *  Created  by  Administrator  on  2017/7/15  0015.
 */


var  APP_VERSION  =  "2.2.09";

var  TIME_STEP_HREF_MIN  =  30000;

var  TIME_STEP_1_MIN  =  60000;

var  TIME_STEP_5_SECOND  =  5000;

var  TIME_STEP_5_MIN  =  300000;

var  APP_URL  =  "http://www.cityworks.cn/baoan_water/app/River_Manager.apk";
//真实环境
//  var  baseUrl  =  "https://baoan.cityworks.cn:2002/baoan";

//新接口URL测试环境
//  var  baseUrl  =  'https://test.cityworks.cn/baoan';
//  var  newUrl  =  'https://test.cityworks.cn';

//新接口URL线上环境
//  var  baseUrl  =  'https://baoan.cityworks.cn/baoan';
//  var  newUrl  =  'https://baoan.cityworks.cn';

//新接口URL  dev环境
var  newUrl  =  '/refactor';
var  baseUrl  =  '/refactor/baoan';



//测试环境01
//  var  baseUrl  =  "http://10.10.6.6:443/baoan";
//测试环境02
//var  baseUrl  =  "http://192.168.1.99:443/baoan";
//测试环境03
//var  baseUrl  =  'https://10.10.6.7:80/baoan'
//用于配置不同的运行环境
//  var  newUrl  =  '';
//  var  baseUrl  =  '';
//  var  env  =  "test";
//  if  (window.location.href.indexOf('localhost')  >  -1)  {
//          env  =  "dev";
//  }
//  switch  (env)  {
//          case  "test":
//                  baseUrl  =  'https://test.cityworks.cn/baoan';
//                  newUrl  =  'https://test.cityworks.cn';
//                  break;
//          case  "online":
//                  baseUrl  =  'https://baoan.cityworks.cn/baoan';
//                  newUrl  =  'https://baoan.cityworks.cn';
//                  break;
//          case  "dev":
//                  newUrl  =  '/refactor';
//                  baseUrl  =  '/refactor/baoan';
//                  break;
//  }

var  devUrl  =  "http://localhost:8081/baoan";

//  var  GET_EVENT_TYPE  =  baseUrl  +  "/patrol/event/types?size=100";
//
//  var  GET_RIVER_PARAGRAPH  =  baseUrl  +  "/rivers/1/reachs";
//
//  var  GET_RIVER_WALKER  =  baseUrl  +  "/rivers/1/reach/river/managers";
//
//  //获取工程详情
//  var  GET_PROJECT_DETAIL  =  baseUrl  +  "/projects/";
//
//  //获取所有工程类型
//  var  GET_PROJECT_TYPE  =  baseUrl  +  "/projects/statistics/name";
//
//  //获取河流治理工程列表
//  var  GET_PROJECT_STATUS  =  baseUrl  +  "/rivers";
//
//  //获取所有河流信息
//  var  GET_RIVER_INFO  =  baseUrl  +  "/rivers?size=999";
//
//  //上报事件
//  var  POST_EVENT_DETAIL  =  baseUrl  +  "/patrol/event";
//
//  //获取所有河管员列表
//  var  GET_RIVER_ALL_MANAGER_LIST  =  baseUrl  +  "/rivers/admin";
//
//  var  GET_RIVER_ALL_MANAGER_LISTNEW  =  baseUrl  +  "/rivers/online/group/people";
//
//  //获取所有巡查事件列表
//  var  GET_ALL_EVENTS_LIST  =  baseUrl  +  "/patrol/events";
//
//  //获取所有河管员列表
//  var  GET_RIVER_ALL_MANAGER_SUM  =  baseUrl  +  "/rivers/admin?size=1";
//
//
//  //上传实时GPS信息
//  var  POST_REAL_TIME_GPS  =  baseUrl  +  "/gps/upload";
//
//  //获取事件详情
//  var  GET_EVENT_DETAIL  =  baseUrl  +  "/patrol/events/";
//
//  //获取轨迹
//  var  GET_ROUTE  =  baseUrl  +  "/gps/users/105?startTime=&endTime="
//
//  //获取更新
//  var  GET_APP_UPDATE  =  baseUrl  +  '/apps/updated';
//
//  //获取地图配置项
//  //  var  GET_MAP_CONFIG  =  "https://baoan.cityworks.cn:2002/baoan/web_static/xml/config3.xml";
//
//
//  //登录
//  var  POST_LOGIN  =  baseUrl  +  '/login';
//  //获取所有巡查人员列表
//  //  var  GET_ALL_PEOPLE  =  baseUrl  +  "/rivers/admin?size=1000&online=1";
//  //增加宝排和油烟在线列表
//  var  GET_ALL_PEOPLE  =  baseUrl  +  "/rivers/all/onlinePeople?size=1000&online=1";
//  //角色获取
//  var  GET_ROLE  =  ba

