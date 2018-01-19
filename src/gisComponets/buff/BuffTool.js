/**
 * Created by Administrator on 2017/4/12 0012.
 */
import {drawManagerCtrl} from  '../drawManager/DrawManagerCtrl';
import {baseMapManagerCtrl} from  '../map/BaseMapManagerCtrl';
import {layerManager} from  '../layermanager/LayerManagerCtrl';
import {symbolTool} from  '../symbolTool/SymbolTool';
import {eventBus} from  '../../components/eventBus/eventBus';
import {gpService} from  './GPService';
import * as esriLoader from 'esri-loader';
export const buffTool = {};

buffTool.xmlLoadData = [];

buffTool.EPSG_GEOGRAPHIC = "102100";
buffTool.distance = 0;
buffTool.callBack = null;

/**
 * 清除缓冲区图层
 * @param mapId 图层id
 */
buffTool.clearGraphics = function (mapId) {

    let graphicsLayer = layerManager.setGraphicLayer(mapId,'buff');
    graphicsLayer.clear();
}

/**
 * 缓冲区分析
 * @param mapId 图层id
 * @param type 缓冲图形类型 如 point，polygon等
 * @param distance 缓冲区距离
 * @param callBack 回调函数
 */
buffTool.buffer = function (mapId,type,distance,callBack = null) {

    buffTool.callBack = callBack;
    let layerName = 'buff';
    drawManagerCtrl.activeTool(mapId,type,layerName);
    var listeners = eventBus.bus.getListeners('draw-' + layerName);
    if(listeners.length == 0)
    {

        eventBus.bus.addOnceListener('draw-' + layerName, function(a) {
            if(drawManagerCtrl.drawName == layerName && drawManagerCtrl.drawMapId == mapId)
            {
                esriLoader.dojoRequire(['esri/map',
                        "esri/SpatialReference",
                        'esri/tasks/GeometryService',
                        'esri/tasks/BufferParameters',
                        'esri/tasks/ProjectParameters',
                        'esri/geometry/webMercatorUtils',
                    ],
                    (Map,
                     SpatialReference,
                     GeometryService,
                     BufferParameters,
                     ProjectParameters,
                     webMercatorUtils
                    ) => {

                        let map = baseMapManagerCtrl.mapHash[mapId];
                        let geometryService = gpService.getGeometryService();
                        buffTool.distance = distance;

                        let geometryA = drawManagerCtrl.drawGraphic;
                        geometryA = webMercatorUtils.webMercatorToGeographic(geometryA)
                        let outSR = new esri.SpatialReference({ wkid: buffTool.EPSG_GEOGRAPHIC})
                        var params = new ProjectParameters();
                        params.geometries = [geometryA];
                        params.outSR = outSR;
                        geometryService.project(params,projectHandleA)


                })
            }
        });
    }
}

function projectHandleA(result)
{
    gpService.geometryService.simplify(result, function(geometries) {
        var params = new esri.tasks.BufferParameters();
        params.distances = [  buffTool.distance ];
        params.bufferSpatialReference = new esri.SpatialReference({ wkid: buffTool.EPSG_GEOGRAPHIC  });
        params.unit = esri.tasks.GeometryService.UNIT_METER;
        params.geometries = geometries;
        gpService.geometryService.buffer(params, showBuffer);

    });
}

buffTool.bufferMapPoint  = function (mapPoint,distance,callBack = null) {

  esriLoader.dojoRequire(['esri/map',
      "esri/SpatialReference",
      'esri/tasks/GeometryService',
      'esri/tasks/BufferParameters',
      'esri/tasks/ProjectParameters',
      'esri/geometry/webMercatorUtils',
    ],
    (Map,
     SpatialReference,
     GeometryService,
     BufferParameters,
     ProjectParameters,
     webMercatorUtils
    ) => {
      buffTool.callBack = callBack;
      let geometryService = gpService.getGeometryService();
      let geometryA = webMercatorUtils.geographicToWebMercator(mapPoint)


      // console.log(geometryA,"geometryA");
      var params = new esri.tasks.BufferParameters();
      params.distances = [ distance ];
      let map = baseMapManagerCtrl.mapHash[mapConfig.mapId]
      params.bufferSpatialReference = new SpatialReference({wkid: 102113});
      params.unit = esri.tasks.GeometryService.UNIT_METER;
      params.geometries = [geometryA];
      buffTool.callBack = callBack;
      gpService.geometryService.buffer(params, showBuffer);


    })
}



function showBuffer(bufferedGeometries)
{
    esriLoader.dojoRequire(['esri/map',
        'esri/geometry/webMercatorUtils',
            "esri/graphic"

        ],
        (Map,
          webMercatorUtils,
         Graphic

        ) => {

            console.log('buff',bufferedGeometries);
            // let graphicsLayer = layerManager.setGraphicLayer(drawManagerCtrl.drawMapId,'buff');
            let graphic = new esri.Graphic(bufferedGeometries[0],symbolTool.getBuffSymbol())
            // graphicsLayer.add(graphic);
            graphic.geometry = webMercatorUtils.webMercatorToGeographic(graphic.geometry);
            buffTool.callBack(graphic);


        });

}



