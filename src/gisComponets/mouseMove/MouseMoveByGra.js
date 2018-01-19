/**
 * Created by Administrator on 2017/7/12 0012.
 */

import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl';
import {layerManager} from '../layermanager/LayerManagerCtrl'
import {GpsLocate} from '../gpsLocate/GpsLocate'
import {symbolTool} from '../symbolTool/SymbolTool'
import * as esriLoader from 'esri-loader';
import {popupTemple} from './PopupTemple'


export const mouseMoveByGra = {}

mouseMoveByGra.hashMap = [ {key:"name",ckey:"姓名"} ,
  {key:"tel",ckey:"电话"} ,
  {key:"gridName",ckey:"网格"}
                          ];

mouseMoveByGra.init = function () {

  window.addEventListener('message',function(e){
    if(e.data == "123")
    {
      let map  = baseMapManagerCtrl.mapHash[mapConfig.mapId];
      map.infoWindow.hide();
    }

  },false);

}

mouseMoveByGra.addMove = function (coords) {

  baseMapManagerCtrl.setFunCall(function () {
    let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
    let graphiclayers = layerManager.setGraphicLayer(mapConfig.mapId,"portal");
    esriLoader.dojoRequire(['esri/map',
        "esri/tasks/query",
        "esri/graphic",
        "esri/graphicsUtils",
        "esri/tasks/QueryTask",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",

      ],
      (Map,
       Query,
       Graphic,
       graphicsUtils,
       QueryTask,
       Point,
       Polyline,
       Polygon
      ) => {

        for(let coord of coords)
        {
          if(coord.latitude ==  null || coord.latitude == '')
            continue;

          let location = null;
          if(mapConfig.mapType == "wmts")
          {
             location = new esri.geometry.Point( coord.longitude,coord.latitude);
          }
          else
          {
             let p =  GpsLocate.GpsCvtBL2XY(coord.latitude,coord.longitude,114,1);
             location = new esri.geometry.Point(p[0].Y,p[0].X,map.spatialReference);
          }
          let graphic = new esri.Graphic(null, null, null, null);
          graphic.setGeometry(location);
          graphic.attributes = new Object();
          graphic.attributes.name = coord.name;
          graphic.attributes.tel = coord.tel;
          graphic.attributes.gridName = coord.gridName;
          graphic.attributes.roleName = coord.roleName;
          graphic.attributes.role = coord.role;
          if(coord.role == "2")
          {
            graphic.setSymbol(symbolTool.getSymbol("yellowPeople"));
          }
          else if(coord.role == "1")
          {
            graphic.setSymbol(symbolTool.getSymbol("bluePeople"));
          }
          else if(coord.role == "4")
          {
            graphic.setSymbol(symbolTool.getSymbol("blackPeople"));
          }
          else if(coord.role == "5")
          {
            graphic.setSymbol(symbolTool.getSymbol("redPeople"));
          }
          //油烟的巡
          else if(coord.role == "7")
          {
            graphic.setSymbol(symbolTool.getSymbol("blackPeople"));
          }
          //黑臭的巡  bylisidi 10.1 原来黑色小人改为黄色小人
          else if(coord.role == "8")
          {
            graphic.setSymbol(symbolTool.getSymbol("bluePeople"));
          }
          //黑臭的办
          else if(coord.role == "9")
          {
            graphic.setSymbol(symbolTool.getSymbol("redPeople"));
          }
          graphiclayers.add(graphic);

        }
        graphiclayers.on("click", mouse_click);
      })
  })
}

mouseMoveByGra.addHZMove = function (coords) {

  baseMapManagerCtrl.setFunCall(function () {
    let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
    let graphiclayers = layerManager.setGraphicLayer(mapConfig.mapId,"portal");
    esriLoader.dojoRequire(['esri/map',
        "esri/tasks/query",
        "esri/graphic",
        "esri/graphicsUtils",
        "esri/tasks/QueryTask",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",

      ],
      (Map,
       Query,
       Graphic,
       graphicsUtils,
       QueryTask,
       Point,
       Polyline,
       Polygon
      ) => {

        for(let coord of coords)
        {
          if(coord.latitude ==  null || coord.latitude == '')
            continue;

          let location = null;
          if(mapConfig.mapType == "wmts")
          {
            location = new esri.geometry.Point( coord.longitude,coord.latitude);
          }
          else
          {
            let p =  GpsLocate.GpsCvtBL2XY(coord.latitude,coord.longitude,114,1);
            location = new esri.geometry.Point(p[0].Y,p[0].X,map.spatialReference);
          }
          let graphic = new esri.Graphic(null, null, null, null);
          graphic.setGeometry(location);
          graphic.attributes = new Object();
          graphic.attributes.name = coord.name;
          graphic.attributes.tel = coord.tel;
          graphic.attributes.gridName = coord.gridName;
          graphic.attributes.roleName = coord.roleName;
          graphic.attributes.picImg = coord.picImg;
          graphic.attributes.role = coord.role;
          if(coord.role == "0")
          {
            graphic.setSymbol(symbolTool.getSymbol("pingPeople"));
          }
          graphiclayers.add(graphic);

        }
        graphiclayers.on("click", mouse_click);
      })
  })
}

function mouse_click(event)
{
  let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
  let content = "";
  // for(let item of mouseMoveByGra.hashMap )
  // {
  //   if(item.key == "tel")
  //   {
  //     content +=  "<div style='width: 50px'></div><b>" + item.ckey + ": </b><a href=tel:"+ event.graphic.attributes[item.key]+">" + event.graphic.attributes[item.key] + "</a><br/>";
  //   }
  //   else
  //   {
  //     let itemValue = "";
  //     if(event.graphic.attributes[item.key] == null || event.graphic.attributes[item.key] == "null")
  //     {
  //       itemValue = "";
  //     }
  //     else
  //     {
  //       itemValue =  event.graphic.attributes[item.key];
  //     }
  //
  //     content +=  "<div style='width: 50px'></div><b>" + item.ckey + ": </b>" + itemValue + "<br/>";
  //   }
  //
  // }
  // content +=  "<button onclick=window.postMessage('123','*')>关闭</button><br/></div>";

  let roleName = event.graphic.attributes['name'];
  let phone = event.graphic.attributes['tel'];
  let location = event.graphic.attributes['gridName'];
  let picImg = event.graphic.attributes['picImg'];
  if(event.graphic.attributes['tel'] == null || event.graphic.attributes['tel'] == "null")
  {
    phone = "";
  }
  if(event.graphic.attributes['gridName'] == null || event.graphic.attributes['gridName'] == "null")
  {
    location = "";
  }
  if(event.graphic.attributes['picImg'] == null ||  event.graphic.attributes['picImg'] == "null" || event.graphic.attributes['picImg'] == "" ){
     picImg = "static/v2images/touxiang.png";
  }


  console.log(picImg);
  content = popupTemple.getTemple(roleName,phone,location,picImg);

  map.infoWindow.resize(220, 80);
  map.infoWindow.setTitle(event.graphic.attributes["roleName"]);
  map.infoWindow.setContent(content);

  let mapPoint  = event.mapPoint;
  map.infoWindow.show(mapPoint, map.getInfoWindowAnchor(mapPoint));

}


mouseMoveByGra.removeMove = function () {

  baseMapManagerCtrl.setFunCall(function () {
    let graphicLayer = layerManager.setGraphicLayer(mapConfig.mapId,"portal");
    graphicLayer.clear();
  })



}
