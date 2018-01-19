/**
 * Created by Administrator on 2017/3/27 0027.
 */
import {layerTypeEnum} from '../layermanager/LayerType'
export  default  class LayerConifg{

    constructor(obj){

        this.SERVICES_ADDR =  obj.SERVICES_ADDR;
        this.DISPLAYLAYERNAME = obj.DISPLAYLAYERNAME;
        this.LAYERID = obj.LAYERID;
        this.MAPSERVICES = obj.MAPSERVICES;
        this.LAYER_TYPE = obj.LAYER_TYPE;
        this.SELDEFINE = obj['SELDEFINE']['PROPERTY'];
        this.MOUSEMOVE_FIELD = obj['MOUSEMOVE_FIELD']['FIELD'];

    }


    getMouseMoveFields(){

      if(this.MOUSEMOVE_FIELD == undefined || this.MOUSEMOVE_FIELD == null)
      {
        return [];
      }
      else if(Array.isArray(this.MOUSEMOVE_FIELD))
      {
        return this.MOUSEMOVE_FIELD;
      }
      else
      {
         return [this.MOUSEMOVE_FIELD]
      }


    }

    getLayerPriority(){

        let priority = 5;
        if( this.SELDEFINE != undefined)
        {
            for(let value of this.SELDEFINE){

                if(value['PROPER_KEY'] == 'priority')
                {
                    return value['PROPER_VALUE'];
                }
            }
        }

    }

    getLayerPopup(){

      let popup = "system";
      if( this.SELDEFINE != undefined)
      {
        for(let value of this.SELDEFINE){

          if(value['PROPER_KEY'] == 'popup')
          {
            return value['PROPER_VALUE'];
          }
        }
      }
      return popup;
    }

  getLayerQueryFlag(){

    let priority = 5;
    if( this.SELDEFINE != undefined)
    {
      for(let value of this.SELDEFINE){

        if(value['PROPER_KEY'] == 'queryFlag')
        {
          return value['PROPER_VALUE'];
        }
      }
    }

  }

    getLayerQueryName(){

      if( this.SELDEFINE != undefined)
      {
        for(let value of this.SELDEFINE){

          if(value['PROPER_KEY'] == 'queryShow')
          {
            return value['PROPER_VALUE'];
          }
        }
      }
    }

  getLayerLocateId(){

    if( this.SELDEFINE != undefined)
    {
      for(let value of this.SELDEFINE){

        if(value['PROPER_KEY'] == 'locateId')
        {
          return value['PROPER_VALUE'];
        }
      }
    }
  }

  getWMTSInfo()
  {
    let wmtsinfo = {};
    if( this.LAYER_TYPE == layerTypeEnum.WMTSLayer)
    {
      for(let value of this.SELDEFINE){

        if(value['PROPER_KEY'] == 'tileMatrixSet')
        {
          wmtsinfo.tileMatrixSet = value['PROPER_VALUE'];
        }
        else if(value['PROPER_KEY'] == 'format')
        {
          wmtsinfo.format = value['PROPER_VALUE'];
        }
        else if(value['PROPER_KEY'] == 'style')
        {
          wmtsinfo.style = value['PROPER_VALUE'];
        }
        else if(value['PROPER_KEY'] == 'originX')
        {
          wmtsinfo.originX = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'originY')
        {
          wmtsinfo.originY = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'wkid')
        {
          wmtsinfo.wkid = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'xmin')
        {
          wmtsinfo.xmin = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'ymin')
        {
          wmtsinfo.ymin = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'xmax')
        {
          wmtsinfo.xmax = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'ymax')
        {
          wmtsinfo.ymax = Number(value['PROPER_VALUE']);
        }
        else if(value['PROPER_KEY'] == 'lods')
        {
          wmtsinfo.lod = [];
          let lodArr  = value['LOD'];
          for(let loditem of lodArr)
          {
            let lod = {};
            lod.level = Number(loditem['LEVEL']);
            lod.scale = Number(loditem['SCALE']);
            lod.resolution = Number(loditem['RESOLUTION']);
            wmtsinfo.lod.push(lod);
          }

        }
      }
    }
    return wmtsinfo;
  }
}
