/**
 * 地图管理函数 用来处理初始化extent 全屏 鹰眼图
 * Created by Administrator on 2017/3/31 0031.
 *
 */


import * as esriLoader from 'esri-loader'

export const baseMapManagerCtrl = {};


/**
 * 地图是否加载完毕
 * @type {{}}
 */
baseMapManagerCtrl.isLoad = {};

/**
 * 地图列表
 * @type {{}}
 */
baseMapManagerCtrl.mapHash = {};



/**
 * 地图初始extent
 * @type {{}}
 */
baseMapManagerCtrl.initExtent = {};

/**
 * 鹰眼图列表
 * @type {{}}
 */
baseMapManagerCtrl.overViewHash = {};



/**
 * 设置初始化地图
 * @param mapId
 */
baseMapManagerCtrl.setMapInitExtent = function (mapId) {

  baseMapManagerCtrl.setFunCall(function () {
    let map = baseMapManagerCtrl.mapHash[mapId];
    let extent  = mapConfig.extent;

    esriLoader.dojoRequire(['esri/map','esri/geometry/Extent'], (Map,Extent) => {
      // console.log(extent)
      let mapExtent = new esri.geometry.Extent(extent.xmin,extent.ymin,extent.xmax,extent.ymax,map.spatialReference);
      map.setExtent(mapExtent);

    });
  })

}

/**
 * 是否显示鹰眼图
 * @param mapId
 * @param bool
 */
baseMapManagerCtrl.showOverView = function (mapId,bool) {

    let overView =baseMapManagerCtrl.overViewHash[mapId];
    if(bool)
    {
        overView.show();
    }
    else
    {
        overView.hide();
    }

}
baseMapManagerCtrl.setFunCall = function(fun)
{
  setTimeout(function(){
    if(baseMapManagerCtrl.isLoad[mapConfig.mapId])
    {
      fun()
    }
    else{
      baseMapManagerCtrl.setFunCall(fun);
    }
  },500)
}

baseMapManagerCtrl.hideInfoWindow = function () {
  let map  = baseMapManagerCtrl.mapHash[mapConfig.mapId];
  map.infoWindow.hide();
}
