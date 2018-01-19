<template>
  <div>
    <mu-float-button v-show="false"  @click="zhifa"  class="demo-float-button law-btn">执法
    </mu-float-button>
    <mu-float-button v-show="isLampblackShow" @click="eventBtn" class="demo-float-button event-btn" >事件列表
    </mu-float-button>
    <mu-float-button v-show="isLampblackShow" @click="littleBtn" class="demo-float-button " :class="isLampblackShow ?'report-btn':'little-btn'">上报
    </mu-float-button>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
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
  import {mapUIAccessTool} from './MapUIAccessTool'


  export default {
    components: {},
    data(){
      return {}
    },
    props: {},
    methods: {
      ...mapGetters({
        getMapShow: 'getMapShow',
        getLayerUIShow: 'getLayerUIShow',
        getPortalUIShow: 'getPortalUIShow',
        getRiverHeight: 'getRiverHeight',
        getRiverUIShow: 'getRiverUIShow',
        getLocateUIShow: "getLocateUIShow",
        getBackUIShow: "getBackUIShow",
        getRole: 'getRole',
      }),
      ...mapActions({
        setMapShow: 'setMapShow',
        setBackUIShow: 'setBackUIShow',
      }),
      zhifa:function(){
        this.setMapShow(false);

      },
      littleBtn:function(){
        this.setMapShow(false);
        this.$router.push("/home/lampblackshangbao")
      },
      eventBtn:function(){
        this.setMapShow(false);
         this.$router.push('/home/lampblackevent')
      },
    },
    computed: {

      isLampblackShow: {
        get(){
          if (this.getPortalUIShow() == true) {

            if (mapUIAccessTool.lamblack.includes(Number(this.getRole()))) {
              return  true;
            }
            else {
              return false;
            }
          }
          else
          {
            return false;
          }

        }
      },
      isLawUIShow:{
        get(){
          if (this.getPortalUIShow() == true) {

            if (mapUIAccessTool.lamblackBan.includes(Number(this.getRole()))) {
              return  true;
            }
            else {
              return false;
            }
          }
          else
          {
            return false;
          }

        }
      },


    },
    mounted(){
      this.setMapShow(true);
    },
    destroyed(){

    }
  }
</script>

<style scoped>
  .law-btn
  {
    position: fixed;
    right: 20px;
    bottom: 76px;
    z-index: 65;
  }
  .event-btn{
    position: fixed;
    left: 50%;
    bottom: 76px;
    z-index: 65;
    margin-left: -28px;
  }
  .report-btn {
    position: fixed;
    right: 20px;
    bottom: 76px;
    z-index: 65;
  }
  .little-btn{
    position: absolute;
    right: 20px;
    bottom:200px;
    z-index: 65;
  }
</style>
