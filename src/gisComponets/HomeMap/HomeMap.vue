<template>
  <div class="gismap-wrap" v-show="getMapShow">

    <baseMap class="base-map" :mapId="mapId" :visibleLayer="visibleLayer"   :mapType="mapType"  :mapHeight="mapHeight"  :mapWidth="mapWidth" :url="url"  :style="mapHeihgtChange"></baseMap>
    <!--公共组件-->
    <LayerList></LayerList>
    <RiverList></RiverList>
    <PortalUI></PortalUI>
    <!--end-->

    <!--小散乱污-->
    <!-- <LittlePageUI></LittlePageUI> -->
    <!--end-->

    <!-- <SinoProbe></SinoProbe> -->
    <Legend-dom></Legend-dom>
    <!-- <Lampblack></Lampblack> -->

    <!-- <SinoProbezhifa></SinoProbezhifa> -->

    <!--<mu-float-button @click="locate" v-show="isLocateUIShow"  class="demo-float-button locate-btn">定位</mu-float-button>-->
    <!--通知按钮-->
        <div class="tz-button"  v-powerCode="{code:'MASTER_MESSAGE',route:'/home'}" @click="toMessage">
          <img src="static/v2images/tz-message.png" alt="">
          <span class="counts" v-show="showNotice">
            <span class="counts-r">{{noticeCount}}</span>
          </span>
        </div>
    <!--end-->
    <!--无人机-->
        <!-- <div class="air-btn" v-powerCode="{code:'MASTER_MESSAGE',route:'/home'}" @click="toWurenji"></div> -->
    <!---->
    <!--公告牌-->
      <!-- <div class="air-btn" @click="showGong"></div> -->
    <!--end-->
    <span :style="locateHeightChange" class="icon-ic-定位 locate-btn" @click="locate" v-show="isLocateUIShow" ><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
    <mu-float-button @click="backHandle" v-show="isBackUIShow" icon="arrow_back" mini class="demo-float-button back_btn"/>


    <mu-drawer class="drawer-graphic-content" :open="graphicOpen" right>
      <head-dom 
      :showSubm="false"
      :title="layerInfoName"
      @back="graphicOpen=false"
      >
      </head-dom>
      <div v-for="(item,index) in graphicInfoList" class="qiyedd">
        <span>{{item.FIELD_CNAME}}</span>
        <span>{{item.FIELD_ENAME}}</span>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
  import { mapGetters,mapActions,mapState} from 'vuex';
  import baseMap from '../map/baseMap.vue';
  import {getPosition} from '../../components/corSys/position';
  import {locateManagerCtrl} from '../locateManager/LocateManagerCtrl';
  import {mouseMoveByGra} from '../mouseMove/MouseMoveByGra';
  import {fileTool} from '../../components/corSys/fileTool';
  import {cwLogger} from '../../components/log/log';
  import {LayerData} from './LayerData';
  import {layerManager} from '../layermanager/LayerManagerCtrl';
  import {drawRoute} from '../drawRoute/DrawRoute';
  import {eventBus} from '../../components/eventBus/eventBus';
  import {baseMapManagerCtrl} from '../map/BaseMapManagerCtrl';
  import {mapHeightType} from '../HomeMap/MapHeightType';
  import {queryManagerCtrl} from '../mouseQuery/QueryManagerCtrl';
  import RiverList from './RiverList.vue';
  import LayerList from './LayerList.vue';
  import PortalUI from './PortalUI.vue';
  import LegendDom from './Legend.vue';
  import LittlePageUI from './LittlePageUI.vue'
  import Lampblack from './Lampblack.vue'
  import SinoProbe from './SinoProbe'
  import SinoProbezhifa from './SinoProbezhifa';
  import {powerCodeData} from './directive/PowerCodeData'
  import headDom from '../../UIcomponents/head/head.vue';

	export default {
		components: {
      baseMap,
      RiverList,
      LayerList,
      PortalUI,
      LegendDom,
      LittlePageUI,
      Lampblack,
      SinoProbe,
      SinoProbezhifa,
      headDom
    },
		data(){
			return {
        mapId:mapConfig.mapId,
        mapHeight:'100%',
        mapWidth:'100%',
        mapType:mapConfig.mapType,
        url:mapConfig.url,
        visibleLayer:[3,4,5,6,8,9],
        layerInfoName:"属性信息",
        graphicInfoList:[],
        graphicOpen:false,
        graphicDocked:true,
        routeName:this.$router.currentRoute,
        noticeCount:0,
        showNotice:true,
        attrMap: {
          'enterprise': '地址',
          'fzr': '负责人',
          'drain_dest': '排水流向',
          'legal_repr': '法人代表',
          'lxdh': '联系电话',
          'name': '企业名称',
          'river_basi': '河流信息'
        }
      }
		},
		props: {},
		methods: {

      ...mapActions({
        setMapShow:'setMapShow',
        setBackUIShow:'setBackUIShow',
      }),

      positionHandle(gisInfo){
        console.log("man",gisInfo);
        if(gisInfo != null && gisInfo.coords != undefined)
        {
          locateManagerCtrl.zoomByLongitude(gisInfo.coords.latitude,gisInfo.coords.longitude);
        }

      },
      locate:function () {
        console.log("locate");
        getPosition(this.positionHandle);
//        locateManagerCtrl.getJDByLongitude(22.555259, 113.884019);
      },

      backHandle:function () {
//          this.setMapShow(false);
//          this.setBackUIShow(false);
      },
      queryGraphicData:function () {
        let that = this;
        setTimeout(function () {

          if(baseMapManagerCtrl.mapHash[mapConfig.mapId])
          {

             queryManagerCtrl.mouseClick(mapConfig.mapId,true);
             queryManagerCtrl.init();
          }
          else
          {
            that.queryGraphicData();
          }
        },500)
      },
      graphicToggle (flag) {
      	console.log("click123")
        this.graphicOpen = !this.graphicOpen
        this.graphicDocked = !flag
      },
      toMessage(){
        this.showNotice = false;
        this.$router.push('/home/notice');
        this.setMapShow(false);
      },
      toWurenji() {
          this.$router.push('/home/wurenjiGate');
        this.setMapShow(false);
      },
      getNoticeCount(){
        this.$http.get(GET_NOTICE ).then( res => {
          let length =res.body.data.content.length;
          this.noticeCount =  (length> 99) ? 99 : length;
        }).catch( err => {});
      },
      showGong() {
        eventBus.bus.emit(eventBus.GONGGAOPAI);
      }
  },
		computed: {
      ...mapGetters({
        getMapShow:'getMapShow',
        getRiverHeight:'getRiverHeight',
        getLocateUIShow:"getLocateUIShow",
        getBackUIShow:"getBackUIShow",
      }),
      isMapShow: {
        get(){
          if(this.getMapShow == true)
            return true
          else
            return false;
        }
      },

      isLocateUIShow: {
        get(){
          if(this.getLocateUIShow == true)
            return true;
          else
            return false;
        }
      },
      isBackUIShow:{
        get(){
          if(this.getBackUIShow == true)
            return true;
          else
            return false;
        }
      },
      locateHeightChange:{
        get()
        {
            if(powerCodeData.code.includes("HEZHANG"))
            {
              return {
                bottom:75 + 'px'
              }
            }
            else if(powerCodeData.code.includes("XUNBAN"))
            {
              return {
                bottom:95 + 'px'
              }
          }

        }
      },
      mapHeihgtChange:{
      	get()
        {
        	if(this.getRiverHeight == mapHeightType.main)
          {

            return {
              top:0 + 'px'

            }
          }
          else if(this.getRiverHeight == mapHeightType.riverDocument)
          {

            return {
              top:166 + 'px'
            }
          }
          else if(this.getRiverHeight ==  mapHeightType.riverBuild)
          {

            return {
              top:112 + 'px'
            }
          }

        }
      },

    },
		mounted(){
            LayerData.advanceAddLayer();
            this.queryGraphicData();
            let that = this;

            eventBus.bus.addListener(eventBus.MOUSE_CLICK_QUERY,function (result) {
                 let queryResult = result;
                 let popup = queryResult.layer.getLayerPopup();
                 if(popup == "system"){
                   that.graphicOpen = true;
                   that.graphicInfoList = [];
                   let data = result.graphics[0].attributes;
                   for(let obj in data) {
                    if(obj in that.attrMap) {
                      that.graphicInfoList.push({
                        FIELD_CNAME: that.attrMap[obj],
                        FIELD_ENAME: data[obj]
                      })
                    }
                   }
                   // that.layerInfoName = queryResult.layer.DISPLAYLAYERNAME;
                   // let mouseMoveArr = queryResult.layer.getMouseMoveFields();
                   // let graphic = queryResult.graphics[0];
                   // for(let item of mouseMoveArr)
                   // {
                   //   let obj = new Object();
                   //   obj.FIELD_CNAME = item.FIELD_CNAME;
                   //   obj.FIELD_ENAME = graphic.attributes[item.FIELD_ENAME];
                   //   that.graphicInfoList.push(obj);

                   // }
                 }
               });

            //获取通知数量
            this.getNoticeCount();
            //修服
      if(this.$router.currentRoute.path != "/"){
        setTimeout(()=>{
          document.getElementById(mapConfig.mapId + '').style.display = 'block';
      },1500)
      }


		},
		destroyed(){

			  baseMapManagerCtrl.setFunCall(function () {
            let map = baseMapManagerCtrl.mapHash[mapConfig.mapId];
            map.removeAllLayers();
            map.setVisibility(false);
        })


		}
	}
</script>

<style scoped>
  .gismap-wrap{
    width: 100%;
    height: 100%;


  }
  .base-map{
    position: fixed;
    left:0;
    top:0;
    z-index: 60;
    background-color: #fff;
  }
  .demo-float-button,.content{
    /*position: fixed;*/
  }
  .locate-btn{
    position: fixed;
    left: 20px;
    bottom: 92px;
    z-index:65;
    font-size: 55px;
    color:#fff
  }
  .tz-button {
    position: fixed;
    left: 20px;
    top: 65px;
    width: 55px;
    z-index:65;
  }
  .tz-button img {
    display: block;
    width: 100%;
    border-radius: 30px;
  }
  .air-btn {
     position: fixed;
    left: 20px;
    top: 130px;
    width: 55px;
    height: 55px;
    background: url("../../../static/v2images/ic-wrj.png") no-repeat;
    background-size: 100% 100%;
    z-index:65;
  }
  .back_btn
  {
    position: fixed;
    left: 20px;
    top:  20px;
    z-index:65;
  }
  .drawer-graphic-content
  {
    width: 100%;
    z-index:90;
  }
  .counts {
    position: absolute;
    right: 10px;
    top: 12px;
    width: 13px;
    height: 13px;
    line-height: 13px;
    background-color: #FD9150;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 10px;
  }
  .counts-r {
    display: block;
    transform: scale(.8)
  }
  .qiyedd {
    width: 94%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
  }
</style>
