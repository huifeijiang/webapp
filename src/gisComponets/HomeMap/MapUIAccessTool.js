/**
 * Created by Administrator on 2017/8/1 0001.
 */
import {roleClass} from '../../components/roleClass/roleClass'
export const mapUIAccessTool = {}

mapUIAccessTool.vm = {};

mapUIAccessTool.getRoute = function () {
  if(mapUIAccessTool.vm.$router == undefined){
    return "/"
  }else {
    return  mapUIAccessTool.vm.$router.currentRoute.path;
  }
}
//针对 按钮
//上报按钮
mapUIAccessTool.shangbao = [roleClass.master,roleClass.xuncha];
//上报事件列表按钮
mapUIAccessTool.shangbaoList = [roleClass.xuncha];
//查看所有巡查人员那个白版
mapUIAccessTool.viewAllList = [roleClass.master];
//小散乱污按钮
mapUIAccessTool.xiaosan = [roleClass.xiaosan];
//小散乱污事件列表按钮
mapUIAccessTool.xiansanList = [roleClass.xiaosan];
//小散乱污办理按钮
mapUIAccessTool.xiaosanBan = [roleClass.banli];
//巡查办理按钮
mapUIAccessTool.xunchaban = [roleClass.xunban];
mapUIAccessTool.legendBtn = [roleClass.master,roleClass.xuncha,roleClass.xunban];
//油烟配置
mapUIAccessTool.lamblack = [roleClass.Lampblackreport];
mapUIAccessTool.lamblackList = [roleClass.Lampblackreport];
mapUIAccessTool.lamblackBan = [roleClass.Lampblackreport];

//黑臭水体巡查员配置
mapUIAccessTool.SinoProbe = [roleClass.SinoProbe];
mapUIAccessTool.SinoProbeList = [roleClass.SinoProbe];
mapUIAccessTool.SinoProbeBan = [roleClass.SinoProbe];

//黑臭水体执法员配置
mapUIAccessTool.SinoProbezhifa = [roleClass.SinoProbezhifa];
mapUIAccessTool.SinoProbezhifaList = [roleClass.SinoProbezhifa];
mapUIAccessTool.SinoProbezhifaBan = [roleClass.SinoProbezhifa];
//工作流按钮
mapUIAccessTool.process = [roleClass.process];
mapUIAccessTool.processlists = [roleClass.processlists];
//针对初始化
mapUIAccessTool.portalRoute = [roleClass.xuncha,roleClass.banli,roleClass.xiaosan,roleClass.xunban,roleClass.Lampblackreport,roleClass.SinoProbe,roleClass.SinoProbezhifa];
mapUIAccessTool.homeRoute = [roleClass.master];



