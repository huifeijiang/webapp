/**
 *
 * Created by Administrator on 2017/3/28 0028.
 */

import  {baseMapManagerCtrl}  from '../map/BaseMapManagerCtrl';
import {configManagerCtrl} from '../configmanager/ConfigManagerCtrl';
import {layerManager} from '../layermanager/LayerManagerCtrl';
import * as esriLoader from 'esri-loader';
import { symbolTool } from '../symbolTool/SymbolTool'
import {GpsLocate} from '../gpsLocate/GpsLocate';
import {buffTool} from '../buff/BuffTool';
import {queryTool} from '../mouseQuery/QueryTool';
import {eventBus} from '../../components/eventBus/eventBus';

export const locateManagerCtrl = {};


locateManagerCtrl.poiXmlLoadData = []

/**
 * 只对某个图层做空间查询 并且定位
 *
 * @param mapId
 * @param layerName
 * @param expresstion
 */
locateManagerCtrl.zoomByExpresstion = function (mapId,layerName,expresstion,symbol = '',callBackFun = null) {

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
                 let graphicLayer = layerManager.setGraphicLayer(mapId,layerName);
                 graphicLayer.clear();
                 let map = baseMapManagerCtrl.mapHash[mapId];
                 let layerConfig = configManagerCtrl.getLayerConfigByName(layerName);
                 let queryTask = new esri.tasks.QueryTask(layerConfig.SERVICES_ADDR);
                 let query  = new esri.tasks.Query();
                 query.where  = expresstion;
                 query.returnGeometry = true;
                 query.outSpatialReference = map.spatialReference;
                 queryTask.execute(query,(idResults) => {

                     idResults.features.forEach(function (value) {

                         let geometry  = value.geometry;
                         let gra = null;
                         let geometryType = geometry.type;
                         if(symbol == '')
                         {
                              gra = new esri.Graphic(geometry,symbolTool.getSymbol(geometryType));
                         }
                         else
                         {
                             gra = new esri.Graphic(geometry,symbol);
                         }

                         graphicLayer.add(gra);

                     })

                     let extent  = graphicsUtils.graphicsExtent(graphicLayer.graphics);
                     map.setExtent(extent);
                     if(callBackFun != null)
                     {
                         callBackFun(idResults);
                     }

                 })
        });
}


locateManagerCtrl.zoomByLongitude = function (latitude,longitude) {


  console.log(latitude +'::::::::::::::::::::::::'+longitude);

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
      let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
      console.log(map.spatialReference);
      let location = null;
      if(mapConfig.mapType == "wmts")
      {
        location = new esri.geometry.Point(longitude,latitude,map.spatialReference);
       
      }
      else
      {
        let p = GpsLocate.GpsCvtBL2XY(latitude,longitude ,114,1);
        location = new esri.geometry.Point(p[0].Y,p[0].X,map.spatialReference);
      }
      let graphic = new esri.Graphic(null, null, null, null);
      graphic.setGeometry(location);
      locateManagerCtrl.zoomByGraphic(mapConfig.mapId,"locate",graphic,symbolTool.getSymbol("locate"));

    });


}


/**
 * 根据graphic定位
 * @param layerName
 * @param graphic
 * @param symbol
 */
locateManagerCtrl.zoomByGraphic = function (mapId,layerName,graphic,symbol = '') {
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

            let graphicLayer = layerManager.setGraphicLayer(mapId,layerName);
            let geometryType = graphic.geometry.type;
            graphicLayer.clear();
            let map = baseMapManagerCtrl.mapHash[mapId];
            graphic.spatialReference = map.spatialReference;
            console.log(map,"symbol");
            if(symbol == '')
            {
                graphic.setSymbol(symbolTool.getSymbol(geometryType));
            }
            else
            {
                graphic.setSymbol(symbol);
            }
            graphicLayer.add(graphic);
            if(geometryType == 'point')
            {
               if(map.getLevel() ==  -1)
               {
                 if(mapConfig.scale != 0)
                 {
                   map.centerAt(graphic.geometry);
                   setTimeout(function () {
                     map.setScale(mapConfig.scale);
                   },2000)
                 }
                 else
                 {
                   map.centerAt(graphic.geometry);
                 }

               }
               else
               {
                  map.centerAndZoom(graphic.geometry,mapConfig.level);
                  console.log(graphicLayer);
               }



            }
            else
            {

              let extent  = graphicsUtils.graphicsExtent(graphicLayer.graphics);
              extent.spatialReference = map.spatialReference;
              map.setExtent(extent);
            }

        });


}


/**
 * 只查询
 * @param mapId
 * @param layerName
 * @param expresstion
 * @param symbol
 * @param callBackFun
 */
locateManagerCtrl.queryGraphics = function (mapId,layerName,expresstion,callBackFun = null) {

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

            let map = baseMapManagerCtrl.mapHash[mapId];
            let layerConfig = configManagerCtrl.getLayerConfigByName(layerName);
            let queryTask = new esri.tasks.QueryTask(layerConfig.SERVICES_ADDR);
            let query  = new esri.tasks.Query();
            query.where  = expresstion;
            query.returnGeometry = true;
            query.outSpatialReference = map.spatialReference;
            query.outFields = ['*'];
            queryTask.execute(query,(idResults) => {

                console.log("result",idResults)
                if(callBackFun != null)
                {
                    callBackFun(idResults);
                }

            })
        });
}

locateManagerCtrl.highlightGraphic = function(mapId,layerName,graphic,symbol = '')
{
  let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
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
          let graphicLayer = layerManager.setGraphicLayer(mapConfig.mapId,layerName);
          let geometryType = graphic.geometry.type;
          graphicLayer.clear();

          graphic.setSymbol(symbolTool.getSymbol(geometryType));
          graphicLayer.add(graphic);
    })

}


locateManagerCtrl.getJDByLongitude = function (latitude,longitude) {

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
      let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
      let  point = {};

      if(mapConfig.mapType == "wmts")
      {
        point = new esri.geometry.Point(longitude,latitude);
      }
      else
      {
        let p = GpsLocate.GpsCvtBL2XY(latitude,longitude ,114,1);
        point = new esri.geometry.Point(p[0].Y,p[0].X,map.spatialReference);
      }


      buffTool.bufferMapPoint(point,200,function (graphic) {

           queryTool.mapId = mapConfig.mapId;
           queryTool.queryType = 'special';
           queryTool.layerNames = ['社区'];
           queryTool.funType = 'normal';
           queryTool.doSpatialQuery(graphic.geometry,function(result){
               let sqNames = [];
               if(result.length > 0)
               {

                  let queryResult = result[0];
                  for(let graphic of queryResult.graphics)
                  {
                    sqNames.push(graphic.attributes['sqname']);
                  }

               }
               eventBus.bus.emit(eventBus.JD_INFO,sqNames);
        })
      })
    });


}

