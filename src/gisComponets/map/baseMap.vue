<template>
        <div :id="mapId"  v-bind:style="'width:'+mapWidth+';height:'+mapHeight">
            <div id="swipeDiv"></div>
        </div>
</template>
<script>

    import * as esriLoader from 'esri-loader';
    import {eventBus} from '../../components/eventBus/eventBus.js';
    import {layerManager} from '../../gisComponets/layermanager/LayerManagerCtrl';
    import {baseMapManagerCtrl} from './BaseMapManagerCtrl';
    import {configManagerCtrl} from '../configmanager/ConfigManagerCtrl';



    export default {
        name:'baseMap',
        props:{

            mapId:{
                type:String,
                default:'mapNode'
            },
            mapWidth: {
                type: [Number,String]
            },
            mapHeight: {
                type: [Number,String]
            },
            url:{
                type: String,
                default:'',
            },
            mapType:{
                type:String,
                default:'tiled',
            },
            visibleLayer:{
                type:Array,
                default(){
                    return [];
                }
            },
            initExtent:{
               type:Object,
                default:function () {
                    return { xmin:0,
                              ymin:0,
                              xmax:0,
                              ymax:0

                    }
                }
            }

        },

        data(){
            return {}
        },
        methods: {


            // create a map on the page
            createMap:   function(){

                let that = this;
                // first, we use Dojo's loader to require the map class
                esriLoader.dojoRequire(['esri/map',
                        'esri/layers/ArcGISTiledMapServiceLayer',
                        'esri/layers/ArcGISDynamicMapServiceLayer',
                        'esri/layers/ArcGISImageServiceLayer',
                        "esri/dijit/OverviewMap",
                        "esri/layers/WMTSLayer",
                        "esri/layers/WMTSLayerInfo",
                        "esri/geometry/Extent",
                        "esri/layers/TileInfo",
                        "esri/SpatialReference",
                    ],
                    (Map,
                     ArcGISTiledMapServiceLayer,
                     ArcGISDynamicMapServiceLayer,
                      ArcGISImageServiceLayer,
                     OverviewMap,
                     WMTSLayer,
                     WMTSLayerInfo,
                     Extent,
                     TileInfo,
                     SpatialReference
                    ) => {
                    // create map with the given options at a DOM node w/ id 'mapNode'
                    let map = new esri.Map(that.mapId, {
                        logo : false
                    });



                    if(that.mapType == 'tiled')
                    {
                        let titleLayer = new esri.layers.ArcGISTiledMapServiceLayer(that.url);
                        //设置地图为0
                        titleLayer['priority'] = 0;
                        titleLayer.setVisibility(false);
                        map.addLayer(titleLayer);
                        map.on("load", initFunctionality);

//                        console.log('tiled layer add')
                    }
                    else if(that.mapType == 'dynamic')
                    {

                        let dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(that.url);
                        dynamicLayer['priority'] = 5;
                        map.addLayer(dynamicLayer)
                        if(that.visibleLayer.length > 0)
                        {
                            dynamicLayer.setVisibleLayers(that.visibleLayer)
                        }
                        map.on("load", initFunctionality);
//                        console.log('dynamic layer add')
                    }
                    else if(that.mapType == 'image')
                    {

                      let imageLayer = new esri.layers.ArcGISImageServiceLayer(that.url)
                      imageLayer['priority'] = 0;
                      map.addLayer(imageLayer);
                      map.on("load", initFunctionality);
//                      console.log('image layer add')
                    }
                    else if(that.mapType == 'wmts')
                    {
                      configManagerCtrl.setFunCall( () => {

                        let options =  layerManager.createWMTSOption("电子地图");
//                        console.log(options,"options");
                        let wmtsLayer = new WMTSLayer(that.url,options);
//                        console.log(wmtsLayer);
                        wmtsLayer['priority'] = 0;
                        map.addLayer(wmtsLayer);
                        wmtsLayer.setVisibility(false);
                        map.on("load", initFunctionality);
//                        console.log('wmts layer add');
//                      map.on('click',measureDownHandle);
                        baseMapManagerCtrl.mapHash[that.mapId] = map;
                        wmtsLayer['wmtsId'] = "vec";
                        baseMapManagerCtrl.isLoad[that.mapId] = true;
                        let objButton = document.getElementById(mapConfig.mapId + "_zoom_slider").style;
                        objButton.visibility = "collapse";
                      })

                    }

//                      map.on('extent-change',(evt) => {
//                         console.log(evt);
//
//                      });


                    document.getElementById(this.mapId).style.width = "100%";
                    document.getElementById(this.mapId).style.height = "100%";


                    function initFunctionality ()
                    {
//                        console.log("load........")

                        baseMapManagerCtrl.mapHash[that.mapId] = map;
                        baseMapManagerCtrl.isLoad[that.mapId] = true;
                        baseMapManagerCtrl.setMapInitExtent(mapConfig.mapId);
                        eventBus.bus.emit(eventBus.MAP_IS_LOAD,that.mapId);
                        if(mapConfig.extent.xmax != 0)
                        {
                        	baseMapManagerCtrl.setMapInitExtent(mapConfig.mapId)
                        }

                        let objButton = document.getElementById(mapConfig.mapId + "_zoom_slider").style;
                        objButton.visibility = "collapse";

                    }

                    function measureDownHandle(evt) {
//                        console.log(evt);
//                        console.log(map);
                    }


                });
            }


        },
        computed: {


        },
        mounted(){

//            console.log("baseMap load .......")
            try{
                if (!esriLoader.isLoaded()) {
                    // no, lazy load it the ArcGIS API before using its classes
                    esriLoader.bootstrap((err) => {
                        if (err) {
//                            console.error(err);
                        }
                        // once it's loaded, create the map
//                        console.log(this.$router,"rrrrrrrrrrrrrrrrrrr")
                        if(this.$router.currentRoute.path != "/"){
                          this.createMap();
                        }

                    }, {
                        // use a specific version instead of latest 4.x
                        url: layerConfig.arcgisAPIUrl

                    });
                } else {
                    // ArcGIS API is already loaded, just create the map
                    this.createMap();
                }
            }
            catch (e){

            }



        }
    }
</script>
<style>

</style>
