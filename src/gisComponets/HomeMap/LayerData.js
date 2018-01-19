/**
 * Created by Administrator on 2017/7/13 0013.
 */

import {layerManager} from '../layermanager/LayerManagerCtrl';
import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl';
import {eventBus} from '../../components/eventBus/eventBus';
import {roleClass} from '../../components/roleClass/roleClass'

export const LayerData = {}
LayerData.staticsInterval = null;

LayerData.riverGraphics = [];

LayerData.portLayerArr = ["河流","水库湖泊","社区","街道","行政区划"];
LayerData.mainLayerArr = [ "河流","水库湖泊","行政区划","社区","街道"];

LayerData.advanceAddLayer = function () {

  baseMapManagerCtrl.setFunCall(function () {
    layerManager.showLayerByName(mapConfig.mapId,["电子地图"],false);
    layerManager.showLayerByName(mapConfig.mapId,LayerData.mainLayerArr,true);

  })
}


LayerData.closeAllLayerData = function () {

   for(let item of LayerData.data)
   {
     LayerData.closeLayerData(item);
   }

}

LayerData.closeLayerData = function (item) {


  if(item.isLeaf)
  {
    if(item.iLayers != undefined)
    {
      layerManager.showLayerByName(mapConfig.mapId,item.iLayers,false);
    }
    else
    {
      if(item.layerName != "街道"){
        layerManager.showLayerByName(mapConfig.mapId,[item.layerName],false);

      }
    }

    eventBus.bus.emit(eventBus.LAYER_SWITCH_ON,[item.layerName],false);
  }
  else
  {
    for(let newItem of item.lists)
    {
      LayerData.closeLayerData(newItem);
    }
  }
}


LayerData.showPortalLayer = function () {

  baseMapManagerCtrl.setFunCall(function () {
    LayerData.closeAllLayerData();
    layerManager.showLayerByName(mapConfig.mapId,LayerData.portLayerArr,true);
    eventBus.bus.emit(eventBus.LAYER_SWITCH_ON,LayerData.portLayerArr,true);
  })

}

LayerData.showMainLayer = function () {

  LayerData.closeAllLayerData();
  layerManager.showLayerByName(mapConfig.mapId,LayerData.mainLayerArr,true);
  eventBus.bus.emit(eventBus.LAYER_SWITCH_ON,LayerData.mainLayerArr,true);

}


LayerData.allOwner = [roleClass.master];
LayerData.shengtaiOwner = [roleClass.master,roleClass.xunban,roleClass.xuncha];

LayerData.data = [

  { layerName:"地图主题",
    isLeaf:false,
    classUrl:"icon-ic-theme",
    powerCode:{code:'LAYERLIST_MAINMAP'},
    owner:LayerData.allOwner,
    show:true,
    lists:[
      {
        group:"影像",
        imgUrl:"static/v2images/ygyy.png",
        layerName:"遥感影像",
        iLayers:["遥感影像","遥感影像注记"],
        show:false,
        isLeaf:true,

      },
      {
        group:"影像",
        imgUrl:"static/v2images/erlc.png",
        layerName:"电子地图",
        iLayers:["电子地图","电子地图注记"],
        show:false,
        isLeaf:true,

      },
      {
        group:"影像",
        imgUrl:"static/v2images/street.png",
        layerName:"街道",
        show:true,
        isLeaf:true,
      },
      ]
   },
  { layerName:"水务设施",
    powerCode:{code:'LAYERLIST_RIVERBUSINESS'},
    isLeaf:false,
    classUrl:"icon-ic-shuiwu",
    owner:LayerData.allOwner,
    show:true,
    lists:[
      {
        layerName:"泵站",
        show:false,
        isLeaf:true,
      },
       {
        layerName:"公告牌",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"排污口",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"监测站点",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"水闸",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"河流",
        show:true,
        isLeaf:true,
      },
      {
        layerName:"水库湖泊",
        show:true,
        isLeaf:true,
      },
      {
        layerName:"涉水企业",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"项目分布图",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"社区",
        show:true,
        isLeaf:true,
      },
      {
        layerName:"行政区划",
        show:true,
        isLeaf:true,
      },
    ]
  },

  // { layerName:"管线",
  //   owner:LayerData.allOwner,
  //   isLeaf:false,
  //   show:true,
  //   lists:[
  //     {
  //       layerName:"雨水管点",
  //       show:false,
  //       isLeaf:true,
  //     },
  //     {
  //       layerName:"合流管点",
  //       show:false,
  //       isLeaf:true,
  //     },
  //     {
  //       layerName:"污水管点",
  //       show:false,
  //       isLeaf:true,
  //     },
  //     {
  //       layerName:"雨水管线",
  //       show:false,
  //       isLeaf:true,
  //     },
  //     {
  //       layerName:"合流管线",
  //       show:false,
  //       isLeaf:true,
  //     },
  //     {
  //       layerName:"污水管线",
  //       show:false,
  //       isLeaf:true,
  //     },
  //   ]
  // },
  { layerName:"生态控制",
    powerCode:{code:'LAYERLIST_ECOLOGICAL'},
    owner:LayerData.shengtaiOwner,
    classUrl:"icon-ic-guan",
    isLeaf:false,
    show:true,
    lists:[
      {
        layerName:"一级保护区",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"二级保护区",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"准水源保护区",
        show:false,
        isLeaf:true,
      },
      {
        layerName:"生态控制线",
        show:false,
        isLeaf:true,
      },

    ]
  },
]
