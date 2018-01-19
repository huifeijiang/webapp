/**
 * Created by Administrator on 2017/3/20 0020.
 */


import {layerManager} from '../layermanager/LayerManagerCtrl';
import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl'
import {symbolTool} from '../symbolTool/SymbolTool'
import * as esriLoader from 'esri-loader';
import {eventBus} from '../../components/eventBus/eventBus'


export const drawManagerCtrl = {
    get drawStart(){
        return this._drawStart;
    },
    set drawStart(val){
        this._drawStart = val
    }
};


drawManagerCtrl.toolbar = {};

/**
 * 存放draw完毕那个graphic
 * @type {{}}
 */
drawManagerCtrl.drawGraphic = {};
/**
 * 申请draw graphic的图层
 * @type {string}
 */
drawManagerCtrl.drawName = 'draw';
/**
 * 要draw 地图id
 * @type {string}
 */
drawManagerCtrl.drawMapId = '';

/**
 * 启动draw
 * @type {string}
 */
drawManagerCtrl._drawStart = 'on';



drawManagerCtrl.init = function (mapId) {

    esriLoader.dojoRequire(
        ['esri/map',
        'esri/toolbars/draw'

        ],
        (
            Map,
            Draw

        ) => {
        // create map with the given options at a DOM node w/ id 'mapNode'

            console.log("draw init")
            let map = baseMapManagerCtrl.mapHash[mapId];

            console.log(map)
            drawManagerCtrl.toolbar[mapId]  = new esri.toolbars.Draw(map);
            drawManagerCtrl.toolbar[mapId].on('draw-end',addToMap);


    });


}


drawManagerCtrl.activeTool = function (mapId,type,layerName = 'draw') {

    drawManagerCtrl.drawName = layerName;
    drawManagerCtrl.drawMapId = mapId;

    drawManagerCtrl.drawStart = 'on';
    esriLoader.dojoRequire(
        ['esri/map',
            'esri/toolbars/draw'
        ],
        (
            Map,
            Draw
        ) => {

            drawManagerCtrl.toolbar[mapId].activate(esri.toolbars.Draw[type]);
        });
}



function addToMap(evt){

    let graphicLayer = layerManager.setGraphicLayer(drawManagerCtrl.drawMapId,drawManagerCtrl.drawName);
    graphicLayer.clear();
    drawManagerCtrl.toolbar[drawManagerCtrl.drawMapId].deactivate();
    drawManagerCtrl.drawGraphic = evt.geometry
    let symbol;
    switch (evt.geometry.type) {
        case "point":
            symbol = symbolTool.getDrawSymbol(evt.geometry.type);
            break;
        case "polyline":
            symbol =  symbolTool.getDrawSymbol(evt.geometry.type);
            break;
        default:
            symbol = symbolTool.getDrawSymbol(evt.geometry.type);
            break;
    }
    let graphic = new esri.Graphic(evt.geometry, symbol);
    let map = baseMapManagerCtrl.mapHash[drawManagerCtrl.drawMapId];

    graphicLayer.add(graphic);
    drawManagerCtrl.drawStart = 'off';
    eventBus.bus.emitEvent('draw-'+ drawManagerCtrl.drawName, [50]);

}



