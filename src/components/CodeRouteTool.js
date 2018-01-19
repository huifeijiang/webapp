import { powerCodeData } from '../gisComponets/HomeMap/directive/PowerCodeData'

export const routeCodeTool = {}




routeCodeTool.reportHash = {
  "NXC_REPORT": "/home/eventReport",
  "XSXC_REPORT": "/home/littlePage",
  // "XSXC_REPORT": "/home/autoForm",
  "YY_REPORT": "/home/lampblackshangbao",
  // "CAT_REPORT": "/home/littlePage",
  "CAT_REPORT": "/home/cateringshangbao",
  "CAR_REPORT": "/home/carshangbao",
  "RICHANG_REPORT": "/home/hcStatistic",
  "HC_RC_ZHIFA": "/home/hchandleEvent",
  "HC_ZX_ZHIFA": "/home/handleEvent",
  "EFFLUENT_REPORT": "/home/monthWaterCheck",
  "HC_HZ_ZHIFA": "/home/portal/regulationList",
  "QY_SHANGBAO": "/home/qiyeReport"
};

routeCodeTool.eventHash = {
  "YY_EVENTLIST": '/home/portal/lampblackevent',
  "NXC_EVENTLIST": "/home/walkerEventSingle",
  "XSXC_EVENTLIST": "/home/littleEvent",
  "CAT_EVENTLIST": "/home/portal/cateringevent",
  "CAR_EVENTLIST": "/home/portal/careevent",

};


routeCodeTool.pushReporteRoute = function(vueRoute, type) {

  vueRoute.push(routeCodeTool.reportHash[type]);

}



routeCodeTool.pushReporteRoute = function(vueRoute, type) {

  vueRoute.push(routeCodeTool.reportHash[type]);

}


routeCodeTool.pushEventRoute = function(vueRoute, type) {

  vueRoute.push(routeCodeTool.eventHash[type]);

}


routeCodeTool.isOverOneReportRoute = function() {

  let routeNumObj = {
    routeNum: 0,
    route: ''
  };
  for (let item in routeCodeTool.reportHash) {
    if (powerCodeData.code.includes(item)) {
      routeNumObj.routeNum = routeNumObj.routeNum + 1;
      routeNumObj.route = item;
    }
  }
  return routeNumObj;

}

routeCodeTool.isOverOneEventRoute = function() {

  let routeNumObj = {
    routeNum: 0,
    route: ''
  };
  for (let item in routeCodeTool.eventHash) {
    if (powerCodeData.code.includes(item)) {
      routeNumObj.routeNum = routeNumObj.routeNum + 1;
      routeNumObj.route = item;
    }
  }
  return routeNumObj;


}
