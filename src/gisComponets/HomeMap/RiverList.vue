<template>

    <div v-powerCode="{code:'HOMEMAP_RIVERLIST',route:'/home'}" >

        <!--<mu-float-button @click="openLayerList(true)" mini class="demo-float-button river_btn">河流列表</mu-float-button>-->
         <LayerIconBlue  @click.native="openLayerList(true)" :title="title" :url="url"  class="river_btn"></LayerIconBlue>

        <mu-drawer class="layer-draw-content" right :open="layerOpen" :docked="layerDocked" @close="layerToggle()">
            <mu-appbar id="tuli" title="河流列表"/>
            <div ref="cwGisListBox" class="cw-list">
                <mu-list >
                    <mu-list-item   v-for="(item,index) in layerGraphics" :key="index" disableRipple @click="layerListToggle(item,item.show)" :title="item.layerName">
                    <span :class="item.show?'icon-ic-定位h':'icon-ic-定位h colorcc'" slot="leftAvatar"></span>
                      <mu-switch :value="item.show" @change="layerListToggle(item,item.show)" slot="right"/>
                    </mu-list-item>
                </mu-list>
                <mu-list-item @click="layerOpen = false" title="关闭"/>
            </div>

        </mu-drawer>

    </div>

</template>

<script>

    import {mapGetters, mapActions, mapState} from 'vuex';
    import baseMap from '../map/baseMap.vue';
    import {getPosition} from '../../components/corSys/position';
    import {locateManagerCtrl} from '../locateManager/LocateManagerCtrl';
    import {mouseMoveByGra} from '../mouseMove/MouseMoveByGra';
    import {fileTool} from '../../components/corSys/fileTool';
    import {LayerData} from './LayerData';
    import {layerManager} from '../layermanager/LayerManagerCtrl';
    import {drawRoute} from '../drawRoute/DrawRoute';
    import {eventBus} from '../../components/eventBus/eventBus';
    import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl';
    import {mapHeightType} from '../HomeMap/MapHeightType';
    import {queryManagerCtrl} from '../mouseQuery/QueryManagerCtrl';
    import LayerIconBlue from './layerIcon/LayerIconBlue.vue';

    export default {
        components: {
          LayerIconBlue
        },
        data() {
            return {
                layerDocked: true,
                layerOpen: false,
                layerGraphics: [],
                url:"static/v2images/book2.png",
                title:"河流列表",
            }
        },
        props: {},
        methods: {

            ...mapActions({
                setMapShow: 'setMapShow',
                setBackUIShow: 'setBackUIShow',
            }),

            layerToggle(flag) {
                this.layerOpen = !this.layerOpen;
                this.layerDocked = !flag;
            },
            layerListToggle(item, show) {
                item.show = !show;
                if (show) {
                    let graphicLayers = layerManager.setGraphicLayer(mapConfig.mapId, "河流");
                    graphicLayers.clear();

                }
                else {
                    locateManagerCtrl.zoomByExpresstion(mapConfig.mapId, "河流", "name = '" + item.layerName + "'");
                }
            },
            openLayerList: function (flag) {

                console.log("5555555555");
                this.layerOpen = !this.layerOpen;
                this.layerDocked = !flag;


            },
            queryHandle: function (idResults) {

                for (let graphic of idResults.features) {
                    let obj = new Object();
                    obj.gra = graphic;
                    obj.layerName = graphic.attributes["name"];
                    obj.show = false;
                    this.layerGraphics.push(obj);
                }

            },
        },
        computed: {
            ...mapGetters({
              getMapShow: 'getMapShow',
              getLayerUIShow: 'getLayerUIShow',
              getPortalUIShow: 'getPortalUIShow',
              getRiverHeight: 'getRiverHeight',
              getRiverUIShow: 'getRiverUIShow',
              getLocateUIShow: "getLocateUIShow",
              getBackUIShow: "getBackUIShow",
            }),
            isRiverUIShow: {
                get() {
                    if (this.getRiverUIShow == true) {
                        return true;
                    }
                    else
                        return false;
                }
            },
        },
        mounted() {

            this.$http.get(GET_RIVER_INFO).then(function (response) {
                if(response.body.data == undefined)
                {
                    return;
                }
                for (let item of response.body.data.content) {
                    let obj = new Object();
                    obj.show = false;
                    obj.layerName = item.name;
                    this.layerGraphics.push(obj);
                }
            });

            let height = window.innerHeight;
            this.$refs.cwGisListBox.style.height =(height - 56 + 'px').toString();
        },
        destroyed() {

        }
    }
</script>

<style scoped>

  .mu-appbar
  {
    background-color:white;

  }

    .river_btn {

        position: fixed;
        right: 15px;
        top: 130px;
        z-index: 65;
    }

    .layer-draw-content {
        z-index: 70;
    }

    .colorcc:before{
        color:#ccc !important
    }
    .icon-ic-定位h{
        font-size: 22px;
    }
</style>
