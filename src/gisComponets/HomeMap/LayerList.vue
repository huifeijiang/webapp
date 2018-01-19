<template>
    <div class="larty">
        <div class="layerBtnContent" :style="LayerHeihgtChange" v-powerCode="{code:'HOMEMAP_LAYERLIST',route:'HEZHANG&/home:XUNBAN&/home:XUNBAN&/home/portal'}">

          <LayerIconWhite v-powerCode="item.powerCode"  v-for="(item,index) in items" :key="index" @click.native="openLayerDraw(item,true)" class="layer_btn" :title="item.layerName"  :url="item.classUrl" :class="index==2?'last-layer':''"></LayerIconWhite>

        </div>



        <mu-drawer class="drawer-content 11" right :open="open" :docked="docked" @close="toggle()">
            <mu-appbar id="tuli" :title="title"/>
            <div ref="cwGisListBox" class="cw-list">
                <mu-list  v-for="(item,index) in layerItems" :key="index">

                  <mu-list-item v-if="item.group == '影像'"    @click="checkLayerToggle(item,item.show)" :title="item.layerName">
                    <mu-avatar :src="item.imgUrl"  :size="30" slot="leftAvatar"/>
                    <span slot="right" class="icon-ic-sed sed" :class="item.show?'seled':'unseled'" @click.native="checkLayerToggle(item,item.show)"><span class="path1"></span><span class="path2"></span></span>
                  </mu-list-item>

                    <mu-list-item v-if="item.group != '影像'"   disableRipple @click="checkLayerToggle(item,item.show)" :title="item.layerName">
                        <span :class="item.show ? 'icon-ic-定位h':'icon-ic-定位h colorcc'" slot="leftAvatar"></span>
                         <mu-switch :value="item.show" @change="checkLayerToggle(item,item.show)" slot="right"/>
                    </mu-list-item>


                </mu-list>
                <mu-list-item @click="open = false" title="关闭"/>
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
    import LayerIcon from './layerIcon/LayerIcon.vue';
    import LayerIconWhite from './layerIcon/LayerIconWhite.vue';

    export default {
        components: {
          LayerIcon,
          LayerIconWhite
        },
        data() {
            return {
                open: false,
                docked: true,
                layerItems: [],
                title:"图层列表",

            }
        },
        props: {},
        methods: {
            ...mapActions({
                setMapShow: 'setMapShow',
                setBackUIShow: 'setBackUIShow',
            }),
            openLayerDraw: function (item, flag) {

                this.title = item.layerName;
                this.open = !this.open
                this.docked = !flag;
                if (this.open == true) {
                    this.layerItems = item.lists;
                }

            },
            toggle(flag) {
                this.open = !this.open
                this.docked = !flag
            },
            checkLayerToggle(item, show) {
                item.show = !show;
//                console.log(item.show);
                let that = this;
                if (item.group != undefined || item.group != '') {
                    for (let newitem of  this.layerItems) {

                        that.radioCheckLayer(newitem, item);
                    }
                }
                let layerNames = []
                if(item.iLayers != undefined) {
                  layerNames = item.iLayers;
                }else{
                  layerNames = [item.layerName];
                }

                layerManager.showLayerByName(mapConfig.mapId, layerNames, item.show);


            },
            radioCheckLayer: function (getItem, modelItem) {

                let that = this;
                if (getItem.group != undefined) {

                    if (getItem.group == modelItem.group && getItem.layerName != modelItem.layerName) {
//                        console.log(getItem.layerName);
                        let layerNames = []
                        if(getItem.iLayers != undefined) {
                          layerNames = getItem.iLayers;
                        }else{
                          layerNames = [getItem.layerName];
                        }
                        layerManager.showLayerByName(mapConfig.mapId, layerNames, false);
                        getItem.show = false;
                    }
                }
                if (!getItem.isLeaf) {
                    for (let newItem of  getItem.lists) {
                        that.radioCheckLayer(newItem, modelItem);
                    }

                }
            }
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
            items:{
            	 get()
               {
               	   let copydata = LayerData.data.slice(0);

//               	   for(let i = 0; i< copydata.length; i++)
//                   {
//                     if(!copydata[i].owner.includes(Number(this.getRole)))
//                     {
//                       console.log(copydata[i]);
//                       copydata.splice(i,1);
//                       i = i-1;
//                     }
//                   }
//                   console.log(copydata,"ccccccccccccccccccccccccccccccccccc");
                   return copydata;

               }
            },
            isLayerUIShow: {
                get() {
                    if (this.getLayerUIShow == true) {
                        return true
                    }
                    else
                        return false;
                }
            },
            LayerHeihgtChange: {
                get() {
                    if (this.getRiverHeight == mapHeightType.main)
                        return {
                            top: 180 + 'px'
                        }
                    else if (this.getRiverHeight == mapHeightType.riverDocument)
                        return {
                            top: 203 + 'px'
                        }
                    else if (this.getRiverHeight == mapHeightType.riverBuild)
                        return {
                            top: 180 + 'px'
                        }
                }
            }

        },
        mounted() {

            let that = this;
            eventBus.bus.addListener(eventBus.LAYER_SWITCH_ON, function (result, flag) {
                for (let item of  that.layerItems) {
                    if (result.includes(item.layerName)) {
                        item.show = flag
                    }
                }
            });
            //动态计算高度
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
    .layerBtnContent {
        z-index: 70;
        position: fixed;
        right: 15px;
        top: 250px;
    }

    .layer_btn {
        /*margin-bottom: 20px;*/
        display: block;
        z-index: 65;
        border-radius: 0px !important;
    }
    .colorcc:before{
        color:#ccc !important
    }
    .test{
      top: 100px;
      right: 200px;
      z-index: 70;
    }
    .icon-ic-定位h{
        font-size: 22px
    }
    .drawer-content {
        z-index: 70;
    }
    div.mu-flexbox-item.flex-demo{
      font-size: 16px;
      width: auto;
    }
    .larty .mu-list{
        padding:0
    }
    .sed {
        font-size: 24px;
    }
    .seled .path1:before {
        color: rgb(75, 170, 244);
    }
    .seled .path2:before {
        color: rgb(255, 255, 255);
    }
    .unseled .path1:before {
        color:#e4e4e4;
    }
    .unseled .path2:before {
        color: #fff;
    }
    .last-layer {
        border-radius: 0px 0px 4px 4px !important;;
    }
</style>
