/**
 * Created by Administrator on 2017/4/10 0010.
 */
import * as esriLoader from 'esri-loader';
import {layerManager} from '../layermanager/LayerManagerCtrl';
import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl'
import QueryResult  from './QueryResult'

export const queryTool = {};


queryTool.queryType = 'visible';
queryTool.mapId = '';
queryTool.layerNames = [];

queryTool.VISIBLE = 'visible';
queryTool.TOP = 'top';
queryTool.SPECIAL = 'special';

queryTool.funType = 'normal'


queryTool.doSpatialQuery = function (geometry,callBackFun) {

    esriLoader.dojoRequire(
        [   'esri/map',
           "esri/SpatialReference",
            "esri/tasks/query",
        ],
        (
            Map,
            SpatialReference,
            Query

        ) => {


            let query = new esri.tasks.Query();
            query.spatialRelationship = "esriSpatialRelIntersects";
            query.outFields = ["*"];
            query.geometry = geometry;
            let map = baseMapManagerCtrl.mapHash[queryTool.mapId];
            query.geometry.spatialReference = map.spatialReference;
            query.returnGeometry = true;
            doQueryTask(query,callBackFun);

        })

}

function doQueryTask(query,callback)
{
    let layerarr  = layerManager.getQueryLayerByType(queryTool.mapId,queryTool.queryType,queryTool.layerNames);
    if(layerarr.length == 0)
        return;

    if(queryTool.funType == 'mouseQuery')
    {
      filterLayer(layerarr);
    }

    var queryParameter = new Object();
    queryParameter.callback  = callback;
    queryParameter.query = query;
    queryParameter.layerarr  = layerarr;
    queryParameter.index = 0;
    queryParameter.queryResultarr = new Array();
    doQuery(queryParameter);
}

function filterLayer(layerarr)
{
  for(let i = 0; i< layerarr.length; i++)
  {
       let  layerConfig = layerarr[i];
       if(layerConfig.getLayerQueryFlag() == "0")
       {
         layerarr.splice(i,1);
         i--
       }
  }
}

function  doQuery(queryParameter)
{
    esriLoader.dojoRequire(
        [   'esri/map',
            "esri/tasks/QueryTask",
        ],
        (
            Map,
            QueryTask
        ) => {

            let ilayer = queryParameter.layerarr[queryParameter.index];
            if(queryParameter.layerarr.length == 0)
              return;


            let querytask = new esri.tasks.QueryTask(ilayer.SERVICES_ADDR);
            querytask.execute(queryParameter.query,function(iResult){
                queryAfter(queryParameter,iResult);
            })

        });
}



function queryAfter(queryParameter,featureSet)
{
    let array = featureSet.features;
    if (array != null && array.length > 0)
    {
        let  queryResult = new QueryResult(queryParameter.layerarr[queryParameter.index], array,featureSet);
        queryParameter.queryResultarr.push(queryResult);
    }
    queryParameter.index = queryParameter.index + 1 ;

    if(queryParameter.index != queryParameter.layerarr.length)
        doQuery(queryParameter);
    else
    {
      if(queryParameter.callback != null)
      {
        queryParameter.callback(queryParameter.queryResultarr);
      }
    }

}





