<template>
  <div>

    <!-- <mu-float-button v-show="false" @click="zhifa" class="demo-float-button law-btn">执法
    </mu-float-button> -->

    <mu-float-button v-show="isSinoProbe" @click="showlist" class="demo-float-button event-btn">事件列表
    </mu-float-button> <mu-float-button v-show="isSinoProbe" @click="showlist" class="demo-float-button event-btn">事件列表
  </mu-float-button>
    <mu-float-button v-show="isSinoProbe" @click="littleBtnbao" class="demo-float-button " :class="isSinoProbe ?'report-btn':'little-btn'">小散乱污
    </mu-float-button>

    <mu-float-button v-show="isSinoProbe" @click="cateringshangbao" class="demo-float-button " :class="isSinoProbe ?'report-btn bottom2':'little-btn'">餐饮
    </mu-float-button>
    <mu-float-button v-show="isSinoProbe" @click="carBtn" class="demo-float-button " :class="isSinoProbe ?'report-btn bottom3':'little-btn'">汽修洗车
    </mu-float-button>

    <!--<mu-float-button v-show="isSinoProbe" @click="xuncha" class="demo-float-button xun-btn">日常巡查-->
    <!--</mu-float-button>-->


   <!--<mu-float-button v-show="isSinoProbe" @click="cateringshangbao" class="demo-float-button " :class="isSinoProbe ?'report-btn bottom2':'little-btn'">餐饮-->
    <!--</mu-float-button>-->
    <!--<mu-float-button v-show="isSinoProbe" @click="carBtn" class="demo-float-button " :class="isSinoProbe ?'report-btn bottom3':'little-btn'">汽修洗车-->
    <!--</mu-float-button>-->
    <mu-float-button v-show="isSinoProbe" @click="hcStatistic" class="demo-float-button " :class="isSinoProbe ?'report-btn bottom4':'little-btn'">日常巡查
    </mu-float-button> -->

    <mu-drawer class="step-alert ffff" right :open="selectload">
      <div class="alert-head">
        <span class="alert-left" @click="backToMap">返回</span>
        <span class="alert-title">选择事件类型</span>
        <span class="alert-right"></span>
      </div>
      <div class="cont">
        <div class='list-it' @click="littleBtn">小散乱污事件列表</div>
        <div class='list-it' @click="tocanyinlist">餐饮事件列表</div>
        <div class='list-it' @click="tocarlist">汽车修理事件列表</div>
      </div>
    </mu-drawer>
  </div>
</template>

<script type='es6'>
import { mapGetters, mapActions, mapState } from 'vuex';
import { getPosition } from '../../components/corSys/position';
import { locateManagerCtrl } from '../locateManager/LocateManagerCtrl';
import { mouseMoveByGra } from '../mouseMove/MouseMoveByGra';
import { fileTool } from '../../components/corSys/fileTool';
import { cwLogger } from '../../components/log/log';
import { LayerData } from './LayerData';
import { layerManager } from '../layermanager/LayerManagerCtrl';
import { drawRoute } from '../drawRoute/DrawRoute';
import { eventBus } from '../../components/eventBus/eventBus';
import { baseMapManagerCtrl } from '../map/BaseMapManagerCtrl';
import { mapHeightType } from '../HomeMap/MapHeightType';
import { queryManagerCtrl } from '../mouseQuery/QueryManagerCtrl';
import { mapUIAccessTool } from './MapUIAccessTool'


export default {
  components: {},
  data() {
    return {
      selectload: false
    }
  },
  props: {},
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
        this.$router.push("/home/littleEvent");
      },
      littleBtnbao:function(){
        this.setMapShow(false);
        this.$router.push("/home/littlePage");
      },
      eventBtn:function(){
        this.setMapShow(false);
         this.$router.push('/home/lampblackevent')
      },
    cateringshangbao() {
      this.setMapShow(false);
      this.$router.push("/home/cateringshangbao");
    },
    tocanyinlist(){
      this.setMapShow(false);
      this.$router.push("/home/portal/cateringevent");
    },
    carBtn:function(){
      this.setMapShow(false);
      this.$router.push('/home/carshangbao')

    },
    hcStatistic(){
       this.setMapShow(false);
       this.$router.push("/home/hcStatistic");
    },
    tocarlist(){
      this.setMapShow(false);
      this.$router.push('/home/portal/careevent')
    },
    backToMap() {
      this.selectload = false
    },
    showlist() {
      this.selectload = true
    },
    xuncha(){

    }
  },
  computed: {

    isSinoProbe: {
      get() {
        if (this.getPortalUIShow() == true) {

          if (mapUIAccessTool.SinoProbe.includes(Number(this.getRole()))) {
            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }

      }
    },
    isSinoProbeBanShow: {
      get() {
        if (this.getPortalUIShow() == true) {

          if (mapUIAccessTool.SinoProbeBan.includes(Number(this.getRole()))) {
            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }

      }
    },


  },
  mounted() {
    this.setMapShow(true);
    document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
  },

  destroyed() {
    document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
  }
}
</script>

<style scoped>
.bottom2 {
  bottom: 155px !important;
}

.bottom3 {
  bottom: 237px !important;
}
.bottom4 {
  bottom: 320px !important;
}

.list-it {
  width: 100%;
  text-align: center;
  height: 45px;
  line-height: 45px;
  color: #5A5E6F;
  border-bottom: 1px solid #ECEFF9
}

.cont {
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow: auto;
}

.xun-btn{
  position: fixed;
  right: 20px;
  bottom: 330px;
  z-index: 65;
}

.law-btn {
  position: fixed;
  right: 20px;
  bottom: 76px;
  z-index: 65;
}

.step-alert {
  width: 100%;
  z-index: 200;
}

.alert-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  background: linear-gradient(left, #30aafd, #2eccfc);
  background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
  background: -moz-linear-gradient(left, #30aafd, #2eccfc);
  background: -o-linear-gradient(left, #30aafd, #2eccfc);
  box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
}

.event-detail-container {
  overflow-y: auto;
  overflow-x: hidden;
}

.margin55 {
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #fff;
  z-index: 73;
}

.user-list {
  display: flex;
  width: 94%;
  margin: 0 auto;
  color: #6a6e7b;
  font-size: 14px;
  height: 55px;
  border-bottom: 1px solid #efefef;
  align-items: center;
  justify-content: space-between;
}

.nothin {
  height: 1px;
}

.event-btn {
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

.little-btn {
  position: absolute;
  right: 20px;
  bottom: 200px;
  z-index: 65;
}
</style>
