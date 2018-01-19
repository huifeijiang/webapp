<template>
    <div v-powerCode="{code:'HOMEMAP_LEGEND',route:'/home'}">

        <!--<mu-float-button @click="openLayerList(true)" mini class="demo-float-button legend_btn" :style="legendHeightChagne">图例</mu-float-button>-->
        <LayerIconWhite  @click.native="openLayerList(true)" :title="title" :url="null"  class="tuli legend_btn" :style="legendHeightChagne"></LayerIconWhite>

        <mu-drawer class="legend-draw-content" right :open="layerOpen" :docked="layerDocked" @close="layerToggle()">
            <mu-appbar id="tuli" title="图例说明"/>
            <div class="cw-list" ref="cwGisListBox">
            <mu-list >
                <mu-flexbox :style="index == 0?'margin-top:15px;margin-bottom:30px':'margin-bottom:30px'" v-for="(item,index) in layerGraphics" :key="index">
                    <mu-flexbox-item class="flex-demo">
                        <div class="legend-icon" :class="item.className"></div>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        {{item.name}}
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">

                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">

                    </mu-flexbox-item>
                </mu-flexbox>

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
    import {roleClass} from '../../components/roleClass/roleClass'
    import {mapUIAccessTool} from './MapUIAccessTool'
    import LayerIconWhite from './layerIcon/LayerIconWhite.vue'

    export default {
        components: {
          LayerIconWhite
        },
        data(){
            return {

                url:"static/v2images/pictures.png",
                title:"图例说明",
                layerDocked: true,
                layerOpen: false,
                layerGraphics: [
                    {name: '泵站', className: 'bengzhan'},
                    {name: '水闸', className: 'shuizha'},
                    {name: '监测站点', className: 'jiancezhandian'},
                    {name: '排污口', className: 'paiwukou'},
                    {name: '涉水企业', className: 'sheshuiqiye'},
                    {name: '河流', className: 'heliu'},
                    {name: '水库湖泊', className: 'shuikuhupo'},
                ],
            }
        },
        props: {},
        methods: {

            ...mapActions({
                setMapShow: 'setMapShow',
                setBackUIShow: 'setBackUIShow',
            }),
            layerToggle(flag)
            {
                this.layerOpen = !this.layerOpen;
                this.layerDocked = !flag;
            },
            layerListToggle(item, show)
            {

            },
            openLayerList: function (flag) {

                this.layerOpen = !this.layerOpen;
                this.layerDocked = !flag;


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
              getRole: "getRole",
            }),
            isLegendUIShow: {
                get(){
                    if (this.getLayerUIShow == true) {
                      if (mapUIAccessTool.legendBtn.includes(Number(this.getRole))) {
                         return true;
                      }
                      else
                      {
                      	return false;
                      }

                    }
                    else
                        return false;
                }
            },
          legendHeightChagne:{
            	get()
              {
              	if(this.getRole == roleClass.master)
                {
                  return {
                    top:330 + 'px'
                  }
                }
                else
                {
                  return {
                    top:197 + 'px'
                  }
                }

              }
          }
        },
        mounted(){
            //动态计算高度
            let height = window.innerHeight;
            this.$refs.cwGisListBox.style.height =(height - 56 + 'px').toString();
        },
        destroyed(){

        }
    }
</script>

<style  scoped>

    .mu-appbar
    {
      background-color:white;

    }


    .flexBoxC
    {
       margin-bottom: 20px;
    }
    .legend_btn {

        position: fixed;
        right: 15px;
        top: 330px;
        z-index: 65;
        border-radius: 4px 4px 0px 0px !important; 
    }

    .legend-draw-content {
        z-index: 70;
    }

    .legend-icon{
        height: 22px;
        width: 22px;
        margin-right: -16px;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-left:10px;
        background-size:contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    div.mu-flexbox-item.flex-demo{
        font-size: 16px;
        width: auto;
    }


</style>
