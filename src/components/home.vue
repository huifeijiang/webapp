<template>
  <div class="public-home-wrap">
    <div class="router-wrap">
      <router-view></router-view>
      <HomeMap></HomeMap>
      <ConfigView :loadDataType="'local'"></ConfigView>
    </div>
    <mu-dialog :open="dialog" title="提示">
      <mu-flat-button label="确定" slot="actions" primary @click="closeWarnning"/>
    </mu-dialog>
    <div class="public-bottom-wrap" v-show="getShowNav">
      <mu-paper v-powerCode="{code:'HEZHANG'}">
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <mu-bottom-nav-item v-for="(item,index) in getNav" :key="index" :value="item.value" :title="item.title"
                              :icon="item.icon"/>
        </mu-bottom-nav>
      </mu-paper>

      <!--<div class="home-nav">
                  <div class="nav-list" v-for="(item,index) in getNav" :class="item.selected?'nav-active':''">
                      <div class="nav-icon">
                          <i :class="item.icon"></i>
                      </div>
                      <div class="nav-text">{{item.title}}</div>
                  </div>
              </div> -->

      <!--非河长端 导航-->
      <div class="not-master-wrap" v-powerCode="{code:'XUNBAN_PANEL'}">
        <div class="not-master-nav">
          <div class="not-master-event" v-powerCode="{code:'XUNBAO_EVENTLIST'}" @click="eventList">
            <img src="static/v2images/ic-event.png" alt="">
            <span>事件列表</span>
          </div>
          <!--小散-->
          <!-- <div class="not-master-event" v-powerCode="{code:'XSXC_EVENTLIST'}" @click="jumpEvent('小散乱污')">
              <img src="static/v2images/ic-event.png" alt="">
              <span>事件列表</span>
          </div> -->
          <!--油烟-->
          <!-- <div class="not-master-event" v-powerCode="{code:'YY_EVENTLIST'}" @click="jumpEvent('油烟')">
              <img src="static/v2images/ic-event.png" alt="">
              <span>事件列表</span>
          </div> -->
          <!--黑臭-->
          <!-- <div class="not-master-event" v-powerCode="{code:'HC_EVENTLIST'}" @click="jumpEvent('黑臭')">
              <img src="static/v2images/ic-event.png" alt="">
              <span>事件列表</span>
          </div> -->
          <!--巡查-->
          <!-- <div class="not-master-event" v-powerCode="{code:'NXC_EVENTLIST'}" @click="jumpEvent('巡查')">
              <img src="static/v2images/ic-event.png" alt="">
              <span>事件列表</span>
          </div> -->


          <!--上报-->
          <div class="not-master-report" @click="shangbao" v-powerCode="{code:'XUN_SHANGBAO'}">
            <!-- <img src="static/v2images/shangbaocao.png" alt="">
            <span class="caore">上1报</span> -->
            <span>上报</span>
          </div>
          <!--小散巡查上报-->
          <!-- <div class="not-master-report" @click="reportPageCon=true" v-powerCode="{code:'XSXC_REPORT_TYPE'}">
              <img src="static/v2images/shangbaocao.png" alt="">
              <span class="caore">上报2</span>
          </div> -->

          <!--油烟巡查上报-->
          <!-- <div class="not-master-report" @click="reportPageCon=true" v-powerCode="{code:'YY_REPORT'}">
              <img src="static/v2images/shangbaocao.png" alt="">
              <span class="caore">上报</span>
          </div> -->
          <!--黑臭巡查上报-->
          <!-- <div class="not-master-report" @click="reportPageCon=true" v-powerCode="{code:'HC_EVENTLIST'}">
              <img src="static/v2images/shangbaocao.png" alt="">
              <span class="caore">上报1</span>
          </div> -->
          <!--普通巡查执法-->
          <div class="not-master-report" @click="toshangbao('普通执法')" v-powerCode="{code:'NXC_ZHIFA'}">
            <!-- <img src="static/v2images/shangbaocao.png" alt="">
           <span class="caore">执法</span> -->
            <span>执法</span>
          </div>

          <!--小散巡查执法-->
          <div class="not-master-report" @click="toshangbao('小散执法')" v-powerCode="{code:'XSXC_ZHIFA'}">
            <span>执法</span>
          </div>

          <!--黑臭巡查执法-->
          <div class="not-master-report" @click="toshangbao('黑臭执法')" v-powerCode="{code:'HC_ZHIFA'}">
            <span>执法</span>
          </div>
          <!--执法-->
          <!-- <div class="not-master-report" @click="reportPageCon=true" v-powerCode="">
                  <img src="static/v2images/report.png" alt="">
              </div> -->
          <div class="not-master-user" @click="jumpToUser">
            <img src="static/v2images/ic-usercenter.png" alt="">
            <span>个人</span>
          </div>
        </div>
      </div>
      <!--end-->
      <mu-dialog :open="update" title="应用更新">
        新版APP已上线，请及时下载！
        <mu-flat-button slot="actions" @click="close" primary label="取消" v-show="updateForce"/>
        <mu-flat-button slot="actions" primary @click="download" label="下载"/>
      </mu-dialog>
      <mu-dialog :open="textValueNull" title="提示">
        请打开手机GPS定位!
        <mu-flat-button primary @click="textValueNull=false" label="确定"/>
      </mu-dialog>
    </div>
    <!--上报弹出页面-->
    <report-page v-show="reportPageCon" @close="reportPageCon=false"></report-page>
    <!--end-->
    <!--公告牌-->
    <gonggaopai v-model="showGongGao" :detail="GGdetail" :peoples="GGpeoples"></gonggaopai>
    <!---->
  </div>
</template>

<script type='es6'>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import HomeMap from '../gisComponets/HomeMap/HomeMap.vue'
  import ConfigView from '../gisComponets/configmanager/ConfigView.vue'
  import {layerManager} from '../gisComponets/layermanager/LayerManagerCtrl';
  import {LayerData} from '../gisComponets/HomeMap/LayerData';
  import {getPosition, watchPosition} from './corSys/position';
  import {baseMapManagerCtrl} from '../gisComponets/map/BaseMapManagerCtrl';
  import {roleClass} from './roleClass/roleClass.js';
  import {mouseMoveByGra} from '../gisComponets/mouseMove/MouseMoveByGra';
  import {mapUIAccessTool} from '../gisComponets/HomeMap/MapUIAccessTool';
  import {eventBus} from './eventBus/eventBus.js';
  import reportPage from './reportPage/reportPage.vue';
  import gonggaopai from './gonggaopai/gonggaopai.vue';
  import {powerCodeData} from '../gisComponets/HomeMap/directive/PowerCodeData';
  import {routeCodeTool} from './CodeRouteTool.js'
  export default {
    components: {
      HomeMap,
      ConfigView,
      reportPage,
      gonggaopai
    },
    data() {
      return {
        bottomNav: '/home',
        update: false,
        updateForce: false,
        downloadFlag: false,
        downloadUrl: '',
        dialog: false,
        loginField: '',
        textValueNull: false,
        reportPageCon: false,
        tempp: 'find_in_page',
        showGongGao: false,
        GGdetail: {},
        GGpeoples: [],
        GGcontorl: true
      }

    },
    computed: {
      ...mapGetters({
        getRole: 'getRole',
        getShowNav: 'getShowNav'
      }),
      getNav() {
        return [
          {value: '/home/news', title: '新闻', icon: 'assignment'},
          {value: '/home/rivers', title: '河流', icon: 'broken_image'},
          {value: '/home', title: '首页', icon: 'home'},
          {value: '/home/portal', title: '巡查', icon: 'remove_red_eye'},
          {value: '/home/user', title: '个人', icon: 'person'}
        ];
      },
      isMaster() {
        let role = this.$store.state.login.role;
        if (role == roleClass.master) {
          return true;
        } else {
          return false
        }
      }
    },
    methods: {
      jumpEvent(code) {
        switch (code) {
          case '小散乱污':
            this.setMapShow(false);
            this.$router.push('/home/littleEvent');
            break;
          case '油烟':
            this.$router.push('/home/portal/lampblackevent');
            break;
          case '黑臭':
            this.$router.push('/home/heichouEvent');
            break;
          case '巡查':
            this.setMapShow(false);
            this.$router.push('/home/walkerEventSingle');
            break;

        }
      },
      toshangbao(code) {
        switch (code) {
          case '普通':
            this.setMapShow(false);
            this.$router.push('/home/eventReport');
            break;
          case '普通执法':
            this.setMapShow(false);
            this.$router.push('/home/portal/regulationList');
            break;
          case '小散执法':
            this.setMapShow(false);
            this.$router.push('/home/handleEvent');
            break;
          case '黑臭执法':
            this.setMapShow(false);
            this.reportPageCon = true;
            //this.$router.push('/home/hchandleEvent');
            break;
        }
      },
      shangbao(){
        this.setMapShow(false);
        let routeObj = routeCodeTool.isOverOneReportRoute();
        if (routeObj.routeNum == 1) {
          routeCodeTool.pushReporteRoute(this.$router, routeObj.route);
        }
        else {
          this.reportPageCon = true;
        }

      },
      eventList(){
        this.setMapShow(false);
        let routeObj = routeCodeTool.isOverOneEventRoute();
        if (routeObj.routeNum == 1) {
          routeCodeTool.pushEventRoute(this.$router, routeObj.route);
        }
        else {
          this.$router.push('/home/heichouEvent');
        }
      },
      close() {
        this.update = false;
      },
      closeWarnning() {
        this.dialog = false;
        this.$router.push('/login');
      },
      download() {
        let that = this;
        //正在下载就等待
        if (that.downloadFlag) {
          return;
        }
        that.downloadFlag = true;
        that.update = true;
        window.open(that.downloadUrl, "_self");
        //            that.$http.get(that.downloadUrl).then(function (response) {
        //                that.downloadFlag = false;
        //            })
      },

      ...mapActions({
        setMapShow: 'setMapShow',
        setLayerUIShow: 'setLayerUIShow',
        setPortalUIShow: 'setPortalUIShow',
        setRiverHeight: 'setRiverHeight',
        setRiverUIShow: 'setRiverUIShow',
        setLocateUIShow: 'setLocateUIShow',
        setBackUIShow: 'setBackUIShow',
        setLatitude: 'setLatitude',
        setLongitude: 'setLongitude',


      }),
      handleChange(val) {
        this.setBackUIShow(false);
        this.setRiverHeight(true);
        let that = this;
        let graphicLayer = layerManager.setGraphicLayer(mapConfig.mapId, "route");
        graphicLayer.clear();

        let graphicLayers = layerManager.setGraphicLayer(mapConfig.mapId, "河流");
        graphicLayers.clear();


        baseMapManagerCtrl.hideInfoWindow();
        if (val == "/home/portal") {

//          if (mapUIAccessTool.portalRoute.includes(Number(that.getRole))) {
//            //            this.setMapShow(true);
//            this.setPortalUIShow(true);
//            this.setRiverUIShow(false);
//            this.setLocateUIShow(true);
//            this.setLayerUIShow(true);
//          }
//          else if (mapUIAccessTool.homeRoute.includes(Number(that.getRole))) {
//            //            this.setMapShow(true);
//            this.setPortalUIShow(true);
//            this.setRiverUIShow(false);
//            this.setLocateUIShow(true);
//            this.setLayerUIShow(false);
//          }
          this.setMapShow(true);
          if (powerCodeData.code.includes("HEZHANG")) {
            this.$http.get(GET_ALL_PEOPLE).then(function (response) {

              //                    console.log(response, "response");
              mouseMoveByGra.addMove(response.body.data.content)
            })
            this.$http.get(GET_HEZHANG_PEOPLE).then(function (response) {

              //                    console.log(response, "response");
              mouseMoveByGra.addHZMove(response.body.data.content)
            })
          }

          LayerData.showPortalLayer();
          baseMapManagerCtrl.setMapInitExtent(mapConfig.mapId);

        }
        else if (val == "/home") {
          this.setMapShow(true);
          mouseMoveByGra.removeMove();
          LayerData.showPortalLayer();
//          if (mapUIAccessTool.portalRoute.includes(Number(that.getRole))) {
//            this.setMapShow(true);
//            this.setPortalUIShow(true);
//            this.setRiverUIShow(false);
//            this.setLocateUIShow(true);
//            this.setLayerUIShow(false);
//            LayerData.showPortalLayer();
//
//          }
//          else if (mapUIAccessTool.homeRoute.includes(Number(that.getRole))) {
//            this.setMapShow(true);
//            this.setLayerUIShow(true);
//            this.setRiverUIShow(true);
//            this.setLocateUIShow(true);
//            this.setPortalUIShow(false);
//            LayerData.showMainLayer();
//
//          }
          baseMapManagerCtrl.setMapInitExtent(mapConfig.mapId);
        }
        else {
          mouseMoveByGra.removeMove();
          this.setRiverUIShow(false);
          this.setMapShow(false);
        }

        this.bottomNav = val;
        this.$router.push(val);
      },

      jumpToUser() {
        this.setMapShow(false);
        this.$router.push('/home/user');
      },
      getBillBoard(id) {
        return new Promise((resolve, reject) => {
          this.$http.get(GET_GONGGAOPAI_BILLBOARD + id)
          .then(res => {
            resolve(res.body.data)
          })
          .catch(err => {
            reject(err)
          })
        });
      },
      getGovernor(id) {
        return new Promise((resolve, reject) => {
          this.$http.get(GET_GONGGAOPAI_GOVERNOR + id)
          .then(res => {
            resolve(res.body.data)
          })
          .catch(err => {
            reject(err)
          })
        });
      },
      async getGongGaoPai(id) {
        if(id == '' || id == null || id == undefined) return false;
        let billboard = {};
        let governor  = [];
        try {
          billboard = await this.getBillBoard(id);
          governor  = await this.getGovernor(id);
        } catch(e) {
          console.info('公告牌请求错误！',e);
        }
         let peos =[];
        for(let i=0; i<governor.length; i++) {
          let flag = false;
          for(let a=0; a<peos.length; a++) {
            if(governor[i].level == peos[a].name) {
              peos[a].list.push({
                name: governor[i].name,
                tip: governor[i].position,
                tel: governor[i].phoneNumber
              });
              flag = true;
              break;
            }
          }
          if(!flag) {
            peos.push({
              name: governor[i].level,
              list: [{
                name: governor[i].name,
                tip: governor[i].position,
                tel: governor[i].phoneNumber
              }]
            });

          }
        }
        peos.sort(function(a,b) {
          return parseInt(a.name) - parseInt(b.name)
        });

        return [billboard, peos];
      }

    },
    watch: {
      '$route' (to,from) {
        if(to.params.name){
            this.shangbao();
        }
      }
    },
    mounted() {
      eventBus.bus.on('get_position_error', () => {
        this.textValueNull = true;
      });
       eventBus.bus.on(eventBus.MOUSE_CLICK_QUERY, (res) => {
        if(res.layer.DISPLAYLAYERNAME == '公告牌') {
          if(!this.GGcontorl) return false;
          this.GGcontorl = false;
          let id = res.graphics[0].attributes.id;
          this.getGongGaoPai(id).then(res => {
            [this.GGdetail, this.GGpeoples] = res;
             this.showGongGao = true;
          }).catch( err => {

          });
          setTimeout(() => {
            this.GGcontorl = true;
          },500)
        }
      });
      this.setMapShow(true);
//        if (mapUIAccessTool.portalRoute.includes(Number(this.getRole))) {
//
//            LayerData.showPortalLayer();
//            this.setMapShow(true);
//            this.setPortalUIShow(true);
//            this.setLayerUIShow(true);
//            this.setRiverUIShow(false);
//            baseMapManagerCtrl.setMapInitExtent(mapConfig.mapId);
//        }
//
//        else if (mapUIAccessTool.homeRoute.includes(Number(this.getRole))) {
//            mouseMoveByGra.removeMove();
//            this.setMapShow(true);
//            this.setLayerUIShow(true);
//            this.setRiverUIShow(true);
//            this.setPortalUIShow(false);
//
//        }
      setTimeout(() => {
        baseMapManagerCtrl.setMapInitExtent(mapConfig.mapId);
      }, 1000)

      //获取定位
      let that = this;

      let longitude = 0, latitude = 0;


      function getWatchPositionDetail(info) {
        let time = TIME_STEP_5_SECOND;
        let positionDrop = false;
        longitude = info.coords.longitude;
        latitude = info.coords.latitude;
        //            console.log("经度",latitude,"维度",longitude);
        if (longitude < 113.7 || longitude > 115) {
//                console.log("位置错误--1")
          positionDrop = true;
        } else if (latitude < 22.5 || latitude > 23) {
//                console.log("位置错误--2")
          positionDrop = true;
        }
        if (positionDrop) {
          return;
        } else {
          that.setLongitude(longitude);
          that.setLatitude(latitude);
          that.$http.post(POST_REAL_TIME_GPS, null, {
            params: {
              "longitude": longitude,
              "latitude": latitude,
            }
          }).then(function (response) {
            //                console.log("发送成功",positionDrop,response);
          }).catch(function (error) {
            //                console.log("发送失败",error)
            let code = error.body.code;
            let msg = error.body.msg;
            if (code === 403) {
              that.dialog = true;
              that.loginField = msg;
              that.$router.push('/');
              return;
            }
          });
        }

        return positionDrop;
      }

      watchPosition(getWatchPositionDetail);

      //获取更新
      function getAppUpdate(url) {
        that.$http.get(url).then(function (response) {
          let data = response.body.data;
          if (response.body.data == undefined) {
            return;
          }
          that.downloadUrl = data.packageUrl;
          let version = data.version;
          let soruceVersion = parseInt(version.split('.').join(''));
          let localVersion = parseInt(APP_VERSION.split('.').join(''));

          if (localVersion < soruceVersion) {
            that.update = true;
            return false
          }
        });
      }

      getAppUpdate(GET_APP_UPDATE + '?appId=2c90818b5fd82fc3015fd833ccb40000');


      var successCallback = function (result) {
        var isDevicesRooted = result == 1;
      };
      var failureCallback = function (error) {
        that.$router.push('/');
      };
      try {
        IRoot.isRooted(successCallback, failureCallback);
      } catch (e) {
//            console.log('somethig going wrong...')
      }
    }
  }

</script>

<style scoped>
  .public-home-wrap {
    height: 100%;
  }

  .public-bottom-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 71;
    overflow: hidden;
  }

  .mu-buttom-item {
    min-width: 54px;
  }

  .caore {
    position: absolute;
    right: 23px;
    top: 14px;
    color: #fff;
    font-size: 18px;
  }

  .home-wrap,
  .router-wrap {
    width: 100%;
    height: 100%;
  }

  .mu-bottom-item-active {
    color: #6a6e7b;
  }

  .not-master-wrap {
    position: relative;
    width: 100%;
    height: 120px;
  }

  .not-master-nav {
    position: absolute;
    left: -10%;
    top: 20px;
    width: 120%;
    height: 160%;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .9);
  }

  .not-master-event,
  .not-master-user {
    position: absolute;
    top: 40px;
    width: 50px;
    text-align: center;
  }

  .not-master-event img,
  .not-master-user img {
    display: block;
    width: 24px;
    margin: 0 auto;
  }

  .not-master-event span,
  .not-master-user span {
    font-size: 12px;
    color: #A4C6E0;
  }

  .not-master-report {
    position: relative;
    left: 50%;
    top: 20px;
    width: 108px;
    height: 60px;
    line-height: 53px;
    text-align: center;
    margin-left: -55px;
    border-radius: 50px;
    color: #fff;
    background: url("../../static/v2images/shangbaobtn.png") no-repeat;
    background-size: 100% 100%;
  }

  .not-master-report span {
    font-size: 16px;
    padding-left: 15px;
  }

  .not-master-report img {
    display: block;
    width: 100%;
    border-radius: 40px
  }

  .not-master-event {
    left: 55px;
  }

  .not-master-user {
    right: 55px;
  }

  .home-nav {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    text-align: center;
  }

  .nav-icon i {
    font-size: 18px;
    color: #767985;
  }

  .nav-text {
    color: red;
  }

  .nav-active .nav-icon i {
    font-size: 18px;
    color: #4BAAF4;
  }

  .nav-active .nav-text {
    color: #4BAAF4;
  }
</style>


