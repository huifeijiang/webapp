/**
 * Created by Administrator on 2017/7/11 0011.
 */
import * as type from '../mutations-type';
import {mapHeightType} from '../../gisComponets/HomeMap/MapHeightType'



const state = {
  mapShow	:true,
  layerUIShow:true,
  portalUIShow:false,
  //main 代表主页,riverdocument代表一河一档，riverBuild代表一河一建
  riverHeight:mapHeightType.main,
  riverUIShow:true,
  locateUIShow:true,
  backUIShow:false,
  graphicDrawer:false,
}

const getters = {
  getMapShow	   : state => state.mapShow,
  getLayerUIShow:state => state.layerUIShow,
  getPortalUIShow:state => state.portalUIShow,
  getRiverHeight:state => state.riverHeight,
  getRiverUIShow:state => state.riverUIShow,
  getLocateUIShow:state => state.locateUIShow,
  getBackUIShow:state => state.backUIShow,
  getGraphicDrawer:state => state.graphicDrawer,
}

const actions = {
  setMapShow: ({ commit },val) => commit( type.MAP_SHOW ,val),
  setLayerUIShow:({ commit },val) => commit( type.LAYER_UI_SHOW ,val),
  setPortalUIShow :({ commit },val) => commit( type.PORTAL_UI_SHOW ,val),
  setRiverHeight:({ commit },val) => commit( type.RIVER_HEIGHT ,val),
  setRiverUIShow:({ commit },val) => commit( type.RIVER_UI_SHOW ,val),
  setLocateUIShow:({ commit },val) => commit( type.LOCATE_UI_SHOW ,val),
  setBackUIShow:({ commit },val) => commit( type.BACK_UI_SHOW ,val),
  setGraphicDrawer:({ commit },val) => commit( type.SET_GRAPHIC_DRAWER ,val),
}

const mutations = {
  [type.MAP_SHOW] (state,  mapShow) {
    state.mapShow = mapShow;
  },
  [type.LAYER_UI_SHOW] (state,  layerUIShow) {
    state.layerUIShow = layerUIShow;
  },
  [type.PORTAL_UI_SHOW] (state,  portalUIShow) {
    state.portalUIShow = portalUIShow;
  },
  [type.RIVER_HEIGHT] (state,  riverHeight) {
    state.riverHeight = riverHeight;
  },
  [type.RIVER_UI_SHOW] (state,  riverUIShow) {
    state.riverUIShow = riverUIShow;
  },

  [type.LOCATE_UI_SHOW] (state,  locateUIShow) {
    state.locateUIShow = locateUIShow;
  },

  [type.BACK_UI_SHOW] (state,  backUIShow) {
    state.backUIShow = backUIShow;
  },
  [type.SET_GRAPHIC_DRAWER] (state,  graphicDrawer) {
    state.graphicDrawer = graphicDrawer;
  },
  

}

export default {
  state,
  getters,
  actions,
  mutations
}
