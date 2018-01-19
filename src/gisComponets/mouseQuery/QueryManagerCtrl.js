
/**
 * Created by Administrator on 2017/4/11 0011.
 */

import {queryTool} from './QueryTool';
import {drawManagerCtrl} from '../drawManager/DrawManagerCtrl';
import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl';
import {layerManager} from '../layermanager/LayerManagerCtrl';
import {eventBus} from '../../components/eventBus/eventBus'
import {buffTool} from '../../gisComponets/buff/BuffTool'
import {locateManagerCtrl} from '../../gisComponets/locateManager/LocateManagerCtrl'

import  mapState  from '../../vuex/modules/mapModule'

export const queryManagerCtrl = {};

queryManagerCtrl.mouseClickFlag = {};

queryManagerCtrl.xmlLoadData = [];

//最多轮巡次数
queryManagerCtrl.queryTimes = 3;
//缓冲距离
queryManagerCtrl.distance = 30;
//叠加距离
queryManagerCtrl.distanceadd = 15;
//初始缓冲距离
queryManagerCtrl.orgindistance = 20;
//一开始轮巡
queryManagerCtrl.startTime = 0;

/**
 * 点击查询
 * @param mapId
 * @param bool
 */
queryManagerCtrl.mouseClick = function (mapId,bool) {

    let map = baseMapManagerCtrl.mapHash[mapId];

    if(bool == true)
    {
        queryManagerCtrl.mouseClickFlag[mapId] = bool;
        queryManagerCtrl.mapClickHandle = map.on('click',downHandle);
    }
    else
    {
        queryManagerCtrl.mouseClickFlag[mapId] = bool;
        if(queryManagerCtrl.mapClickHandle != null)
        {
            queryManagerCtrl.mapClickHandle.remove();
        }
    }


};

queryManagerCtrl.result = {};
queryManagerCtrl.init = function () {



  window.addEventListener('message',function(e){
    if(e.data == "detail")
    {
      // console.log('send detail')
      // eventBus.bus.emit(eventBus.MOUSE_CLICK_QUERY,queryManagerCtrl.result);
    }
    else if(e.data == "closedetail")
    {
      let map  = baseMapManagerCtrl.mapHash[mapConfig.mapId];
      map.infoWindow.hide();
      let graphicLayers = layerManager.setGraphicLayer(mapConfig.mapId,"highlight");
      graphicLayers.clear();
    }

  },false);

}



function downHandle(evt)
{
    let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
    let level = map.getLevel();
    queryManagerCtrl.result = null;

    // console.log(queryManagerCtrl.startTime);
    if(queryManagerCtrl.startTime > 0)
    {
      queryManagerCtrl.distance =  queryManagerCtrl.distance + queryManagerCtrl.distanceadd;
    }
    else if(queryManagerCtrl.startTime == 0)
    {
      queryManagerCtrl.distance = queryManagerCtrl.orgindistance;
    }

    if(!queryManagerCtrl.mouseClickFlag[mapConfig.mapId]) {
         return;
    }
    if(level >= 7) {
      // console.log(level,queryManagerCtrl.distance);
      queryTool.mapId = mapConfig.mapId;
      buffTool.bufferMapPoint(evt.mapPoint,queryManagerCtrl.distance,function(graphic){

        queryTool.queryType = 'visible';
        queryTool.funType = 'mouseQuery';
        queryTool.doSpatialQuery(graphic.geometry,function(result){
          console.log(result)
          if(result.length > 0)
          {
            let  queryResult = result[0];
            locateManagerCtrl.highlightGraphic(mapConfig.mapId,"highlight",graphic);
            locateManagerCtrl.highlightGraphic(mapConfig.mapId,"highlight",queryResult.graphics[0]);
            queryManagerCtrl.result = queryResult;

            let ilayerConfig = queryResult.layer;
            let popup = ilayerConfig.getLayerPopup();
            if(popup == "system"){
              let content = "<div style='text-align: center'>";
              content +=  "<div style='display:inline-block;margin-bottom: 10px'><button id='graphic_detail_btn'>详细信息</button></div><br/>";
              content +=  "<div style='display:inline-block'><button onclick = window.postMessage('closedetail','*')>关闭</button></div><br/></div>";
              map.infoWindow.setTitle(queryResult.layer.DISPLAYLAYERNAME);
              map.infoWindow.resize(150, 150);
              map.infoWindow.setContent(content);

              // console.log("222");
              map.infoWindow.show(evt.mapPoint, map.getInfoWindowAnchor(evt.mapPoint));
              document.getElementById("graphic_detail_btn").addEventListener('click',function () {
                queryManagerCtrl.startTime = 0;
                eventBus.bus.emit(eventBus.MOUSE_CLICK_QUERY,queryManagerCtrl.result);

              });
            }else if(popup == "self"){
              eventBus.bus.emit(eventBus.MOUSE_CLICK_QUERY,queryManagerCtrl.result);
            }



          }
          else
          {
            if(queryManagerCtrl.startTime < queryManagerCtrl.queryTimes)
            {
              downHandle(evt);
              queryManagerCtrl.startTime = queryManagerCtrl.startTime + 1;
            }
            else
            {
              queryManagerCtrl.startTime = 0;
            }

          }
        })
      })
    }





}




queryManagerCtrl.clearGraphics = function (mapId) {

    let graphicsLayer = layerManager.setGraphicLayer(mapId,'select');
    graphicsLayer.clear();
}

/**
 * 根据要素查询
 * @param mapId
 * @param type
 * @param layerName
 */
queryManagerCtrl.polygonQuery = function (mapId,type,queryType = queryTool.VISIBLE,specialLayerName = [],callBackFun = null) {

    let layerName = 'select';
    drawManagerCtrl.activeTool(mapId,type,layerName);
    var listeners = eventBus.bus.getListeners('draw-' + layerName);
    if(listeners.length == 0)
    {
        eventBus.bus.addOnceListener('draw-' + layerName, function(a) {
            if(drawManagerCtrl.drawName == layerName && drawManagerCtrl.drawMapId == mapId)
            {
                queryTool.mapId = mapId;
                queryTool.queryType = queryType;
                queryTool.layerNames = specialLayerName;
                queryTool.doSpatialQuery(drawManagerCtrl.drawGraphic,callBackFun)
            }
        });
    }
}





