/**
 * Created by Administrator on 2017/7/13 0013.
 */


import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl';
import {layerManager} from '../layermanager/LayerManagerCtrl'
import {GpsLocate} from '../gpsLocate/GpsLocate'
import {symbolTool} from '../symbolTool/SymbolTool'
import * as esriLoader from 'esri-loader';



export const drawRoute = {}


drawRoute.addRoute = function (coords) {

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
            for(let item of  coords)
            {
              let p  = GpsLocate.GpsCvtBL2XY( item['latitude'], item['longitude'],114,1);
              item['x'] =  p[0].Y;
              item['y'] =  p[0].X ;

            }
             let graphicLayer = layerManager.setGraphicLayer(mapConfig.mapId,"route");
             graphicLayer.clear();
             let startPoint  = new esri.geometry.Point(coords[0].x,coords[0].y,map.spatialReference);
             let startGraphic = new esri.Graphic();
             startGraphic.setGeometry(startPoint);
             startGraphic.setSymbol(symbolTool.getSymbol("startPoint"));

            let endPoint  = new esri.geometry.Point(coords[coords.length -1 ].x,coords[coords.length -1].y,map.spatialReference);
            let endGraphic = new esri.Graphic();
            endGraphic.setGeometry(endPoint);
            endGraphic.setSymbol(symbolTool.getSymbol("endPoint"));

            graphicLayer.add(startGraphic);
            graphicLayer.add(endGraphic);
            let polyline  = new esri.geometry.Polyline(map.spatialReference);
            for(let i = 0; i < coords.length; i++)
            {
                if( i + 1 < coords.length)
                {

                  polyline.addPath([new Point(coords[i].x,coords[i].y),new Point(coords[i + 1].x,coords[i + 1].y) ])
                  let lineGra = new esri.Graphic();
                  lineGra.setGeometry(polyline);
                  lineGra.setSymbol(symbolTool.getSymbol("polyline"));
                  graphicLayer.add(lineGra);
                }
            }
            let extent  = graphicsUtils.graphicsExtent(graphicLayer.graphics);
            extent.spatialReference = map.spatialReference;
            map.setExtent(extent);
    })

    }




drawRoute.removeRote = function () {
  let graphicLayer = layerManager.setGraphicLayer(mapConfig.mapId,"route");
  graphicLayer.clear();
}
