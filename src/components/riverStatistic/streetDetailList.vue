<template>
  <mu-drawer class="step-alert" right :open="openlist">
    <div class="portal-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">{{titleName}}</span>
      <span></span>
    </div>
    <div class="btns-wrap">
      <mu-tabs :value="activeTab">
        <mu-tab value="tab1" @click="handleTabChange('tab1',1)" title="已巡查"/>
        <mu-tab value="tab2" @click="handleTabChange('tab2',0)" title="待巡查"/>
        <mu-tab value="tab3" @click="handleTabChange('tab3',2)" title="已执法"/>
        <mu-tab value="tab4" @click="handleTabChange('tab4',1)" title="待执法"/>
      </mu-tabs>
      <div class="aaa">
        <span class="width-20">序号</span>
        <span class="width-50">企业名称</span>
        <span class="width-28">{{spantitle}}</span>
      </div>
    </div>
    <div class="news-wrap" ref="newsWrap">
      <div v-if="activeTab === 'tab1'">
        <div class="list-event border-1px" v-for="(item,index) in list" :key="index" @click="togglexc(item)">
          <div class="item-name indexcls">{{index+1}}</div>
          <div class="item-name typeaa">{{item.enterpriseName}}</div>
          <div class="item-name timesa">{{item.username}}</div>
        </div>
      </div>
      <div v-else-if="activeTab === 'tab2'">
        <div class="list-event border-1px" v-for="(item,index) in list" :key="index">
          <div class="item-name indexcls">{{index+1}}</div>
          <div class="item-name typeaa">{{item.enterpriseName}}</div>
          <div class="item-name timesa">{{item.gridName}}</div>
        </div>
      </div>
      <div v-else-if="activeTab === 'tab3'">
        <div class="list-event border-1px" v-for="(item,index) in list" :key="index" @click="togglezf(item)">
          <div class="item-name indexcls">{{index+1}}</div>
          <div class="item-name typeaa">{{item.enterpriseName}}</div>
          <div class="item-name timesa">{{item.handler}}</div>
        </div>
      </div>
      <div v-else>
        <div class="list-event  border-1px" v-for="(item,index) in list" :key="index">
          <div class="item-name indexcls">{{index+1}}</div>
          <div class="item-name typeaa">{{item.enterpriseName}}</div>
          <div class="item-name timesa">{{item.username}}</div>
        </div>
      </div>
    </div>
    <streetDetails :open='opendetails' @closeDetails='opendetails = false'></streetDetails>
    <streetZfDetail :open='openzfdetails' @closezdDetails='openzfdetails = false'></streetZfDetail>
  </mu-drawer>
</template>
<script>
  import {
    eventBus
  } from '../../components/eventBus/eventBus';
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import streetDetails from './streetDetails.vue';
  import streetZfDetail from './streetZfDetail.vue';
  import {dateTool} from '../../gisComponets/tool/DateTool.js';
  export default {
    components: {
      streetDetails,
      streetZfDetail
    },
    data() {
      return {
        opendetails: false,
        openzfdetails: false,
        titleName: '',
        activeTab: 'tab1',
        spantitle: '社区',
        status: null,
        pageOne: 0,
        scroller: null,
        loading: false,
        today: dateTool.toDate(new Date(), 'yyyy-MM-dd'),
        list: [],
        tableData: [],
        zf: {
          dataTemp: [],
          doneMesses: {}
        }
      }
    },
    watch: {
      openlist(val){
        if (val) {
          if (this.detailTitle == '每月一巡') {
            this.titleName = '每月巡查(' + dateTool.toDate(new Date(), 'yyyy-MM') + '月)';
          }else if(this.detailTitle == '每日一巡'){
            this.titleName = '每日巡查(' + dateTool.toDate(new Date(), 'yyyy-MM-dd') + ')';
          }
        }
      }
    },
    props: {
      iddet: {
        type: String,
        default: ''
      },
      detailTitle: {
        type: String,
        default: ''
      },
      openlist: {
        type: Boolean,
        default: false
      },
      getHcHistroyService: {
        type: String,
        default: ''
      },
      getHcStatisticService: {
        type: String,
        default: ''
      },
      getHczListService: {
        type: String,
        default: ''
      },
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow'
      }),
      togglezf(item) {
        this.openzfdetails = true;
        this.getzfbanli(item.id);
      },
      //zf详情
      getzfbanli(id){
        this.$http.get(this.getHcHistroyService + id + '/details').then(res => {
          if (res.body.code == 200) {
            this.zf.doneMesses = res.body.data;
            let obj = res.body.data;
            let resultArr = [];
            for (let param in obj) {
              let dt = {};
              switch (param) {
                case 'enterpriseName':
                  dt.name = '企业名称';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 1
                  break;
                case 'enterpriseAddr':
                  dt.name = '企业地址';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 2
                  break;
                case 'enterpriseLicense':
                  dt.name = '统一社会信用代码';
                  if (obj[param] == false || obj[param] == 'false') {
                    dt.value = '无'
                  } else {
                    dt.value = obj[param];
                  }
                  dt.show = true;
                  dt.sort = 3
                  break;
                case 'legalPersonName':
                  dt.name = '法人代表';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 4
                  break;
                case 'envManager':
                  dt.name = '环保负责人';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 5
                  break;
                case 'enterpriseContactsTel':
                  dt.name = '联系方式';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 6
                  break;
                case 'describe':
                  dt.name = '情况说明';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 7
                  break;
                case 'datetime':
                  dt.name = '调查时间';
                  dt.value = dateTool.toDate(new Date(obj[param]), 'yyyy-MM-dd');
                  dt.show = true;
                  dt.sort = 8
                  break;
                case 'type':
                  dt.name = '执法事件等级';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 9
                  break;
                case 'reporter':
                  dt.name = '调查人员';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 10
                  break;
                case 'gridname':
                  dt.name = '社区网格';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 11
                  break;
                default:
                  dt = null;
                  break;
              }
              if (dt != null) {
                resultArr.push(dt)
              }
            }
            let that = this;
            this.zf.dataTemp = resultArr.sort(that.compare("sort"));
            eventBus.bus.emit('zfdetail', this.zf)
          }
        })
      },
      compare(props) {
        return function (obj1, obj2) {
          let value1 = obj1[props];
          let value2 = obj2[props];
          return value1 - value2; // 升序
        }
      },
      togglexc(item){
        this.opendetails = true;
        this.getDatas(item.id);
      },
      //巡查详情
      getDatas(id){
        this.$http.get(this.getHcHistroyService + id + '/details').then(res => {
          if (res.body.code == 200) {
            let obj = res.body.data;
            let resultArr = [];
            for (let param in obj) {
              let dt = {};
              switch (param) {
                case 'enterpriseName':
                  dt.name = '企业名称';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 1
                  break;
                case 'enterpriseAddr':
                  dt.name = '企业地址';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 2
                  break;
                case 'enterpriseLicense':
                  dt.name = '统一社会信用代码';
                  if (obj[param] == 'false' || obj[param] == false) {
                    dt.value = '无'
                  } else {
                    dt.value = obj[param];
                  }
                  dt.show = true;
                  dt.sort = 3
                  break;
                case 'legalPersonName':
                  dt.name = '法人代表';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 4
                  break;
                case 'envManager':
                  dt.name = '环保负责人';
                  dt.value = obj[param];
                  dt.show = true;
                  break;
                case 'enterpriseContactsTel':
                  dt.name = '联系方式';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 5
                  break;
                case 'producingStatus':
                  dt.name = '生产经营情况';
                  switch (obj[param]) {
                    case 1:
                      dt.value = '正常生产';
                      break;
                    case 2:
                      dt.value = '停产';
                      break;
                    case 3:
                      dt.value = '关停';
                      break;
                    case 4:
                      dt.value = '搬迁';
                      break;
                  }
                  dt.show = true;
                  dt.sort = 6
                  break;
                case 'waterFacility':
                  dt.name = '废水处理设施';
                  if (obj['producingStatus'] == 1) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 7
                  break;
                case 'tagHangName':
                  dt.name = '标识、标志牌悬挂';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.value = obj[param]
                  dt.sort = 8
                  break;
                case 'emergencyMaterialName':
                  dt.name = '应急物资';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 9
                  break;
                case 'collectionTubeName':
                  dt.name = '废水收集管道';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 10
                  break;
                case 'monitorFacility':
                  dt.name = '监控设施';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 11
                  break;
                case 'ph':
                  dt.name = 'PH';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 12
                  break;
                case 'traffic':
                  dt.name = '流量(t)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 13
                  break;
                case 'COD(mg/l)':
                  dt.name = 'COD(mg/l)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 14
                  break;
                case 'copper':
                  dt.name = '铜(mg/l)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 15
                  break;
                case 'nickel':
                  dt.name = '镍(mg/l)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 16
                  break;
                case 'chromium':
                  dt.name = '铬(mg/l)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 17
                  break;
                case 'phosphorus':
                  dt.name = '总磷(mg/l)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 18
                  break;
                case 'nitrogen':
                  dt.name = '氨氮(mg/l)';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 19
                  break;
                case 'facilityException':
                  dt.name = '设备异常';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 20
                  break;
                case 'waterCleanFacilityStatus':
                  dt.name = '回用水处理系统';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 21
                  break;
                case 'outletStatus':
                  dt.name = '总排口排水情况';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param] ? '总排口有排水' : '总排口无排水';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 22
                  break;
                case 'emergencyLagoonStatus':
                  dt.name = '应急池情况';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param] ? '正产' : '异常';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 23
                  break;
                case 'runningLedgerName':
                  dt.name = '运行台账';
                  if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                    dt.value = obj[param];
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 24
                  break;
                case 'dangerReserveFacility':
                  dt.name = '危险贮存设施';
                  if (obj['producingStatus'] == 1) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 25
                  break;
                case 'reserveFacilityTypeName':
                  dt.name = '设施类别';
                  if (obj['producingStatus'] == 1 && obj['dangerReserveFacility'] == true) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 26
                  break;
                case 'gasCleanFacility':
                  dt.name = '废气处理设施';
                  if (obj['producingStatus'] == 1) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 27
                  break;
                case 'denoterStatus':
                  dt.name = '悬挂标志牌';
                  if (obj['producingStatus'] == 1 && obj['gasCleanFacility'] == true) {
                    dt.value = obj[param] ? '已悬挂' : '未悬挂';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 28
                  break;
                case 'gasCleanFacilityStatus':
                  dt.name = '运转情况';
                  if (obj['producingStatus'] == 1 && obj['gasCleanFacility'] == true) {
                    dt.value = obj[param] ? '有运转' : '无运转';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 29

                  break;
                case 'gasCleanFacilityRecord':
                  dt.name = '运行记录';
                  if (obj['producingStatus'] == 1 && obj['gasCleanFacility'] == true) {
                    dt.value = obj[param] ? '有记录' : '无记录';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 30
                  break;
                case 'boiler':
                  dt.name = '锅炉';
                  if (obj['producingStatus'] == 1) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 31
                  break;
                case 'boilerFuelType':
                  dt.name = '使用燃料';
                  if (obj['producingStatus'] == 1 && obj['boiler'] == true) {
                    dt.value = obj[param] ? '清洁燃料' : '非清洁燃料';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 32
                  break;
                case 'outlet':
                  dt.name = '企业外围排口';
                  if (obj['producingStatus'] == 1) {
                    dt.value = obj[param] ? '有' : '无';
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 33
                  break;
                case 'outletTypeName':
                  dt.name = '排口情况';
                  if (obj['producingStatus'] == 1 && obj['outlet'] == true) {
                    dt.value = obj[param]
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 34
                  break;
                case 'describe':
                  dt.name = '情况说明';
                  dt.value = obj[param];
                  dt.show = true;
                  dt.sort = 35
                  break;
                case 'lawEnforcement':
                  dt.name = '是否上报执法';
                  if (obj['producingStatus'] == 1) {
                    dt.value = obj[param] ? '是' : '否'
                    dt.show = true;
                  } else {
                    dt.show = false;
                  }
                  dt.sort = 36
                  break;
                default:
                  dt = null;
                  break;
              }
              if (dt != null) {
                resultArr.push(dt)
              }
            }
            let that = this;
            resultArr = resultArr.sort(that.compare("sort"))
            eventBus.bus.emit('xcdetail', resultArr)
          }
        })
      },
      handleTabChange(val, status) {
        this.activeTab = val;
        if (val == 'tab1' || val == 'tab4') {
          this.spantitle = '巡查人员';
        } else if (val == 'tab2') {
          this.spantitle = '社区';
        } else if (val == 'tab3') {
          this.spantitle = '执法人员';
        }
        if (val == 'tab1' || val == 'tab2') {
          this.getEvents(this.getHcStatisticService, status);
        }
        if (val == 'tab3' || val == 'tab4') {
          this.getzfEvents(this.getHczListService, status);
        }
      },
      //巡查列表
      getEvents(url, status){
        this.$http.get(url + "?missionStatus=" + status + '&streetId=' + this.$props['iddet'] + '&size=500&date=' + this.today)
          .then(res => {
            this.list = res.body.data.content;
          })
          .catch((err) => {
            console.log(err)
          });
      },
      //执法列表
      getzfEvents(url, status){
        this.$http.get(url + "?status=" + status + '&streetId=' + this.$props['iddet'] + '&size=500&date=' + this.today)
          .then(res => {
            this.list = res.body.data.content;
          })
          .catch((err) => {
            console.log(err)
          });
      },
      backToMap() {
        if (this.opendetails) {
          this.opendetails = false
        }
        else {
          this.$emit('clostList');
        }
      },
    },
    mounted() {
      let height = window.innerHeight;
      this.$refs.newsWrap.style.height = height - 109 + 'px';
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
      this.$watch('iddet', () => {
        this.handleTabChange('tab1', 1);
      })
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>
<style scoped>
  .step-alert {
    width: 100%;
    z-index: 110;
    padding-top: 70px;
  }

  .portal-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 56;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    color: #fff;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-title {
    font-size: 20px;
  }

  .aaa {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #efefef;
  }

  .aaa span {
    display: inline-block;
    text-align: center;
    font-weight: 500;
  }

  .btns-wrap {
    width: 100%;
    position: fixed;
    top: 56px;
    background: #fff;
    z-index: 56;
  }

  .news-wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #fff;
    padding-top: 74px;
  }

  .list-event {
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .item-name {
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .indexcls, span.width-20 {
    width: 20%;
  }

  .timesa, span.width-28 {
    width: 27%;
  }

  .typeaa, span.width-50 {
    width: 51%;
  }

  @media (-webkit-min-device-pixel-ratio: 1.5),
  (min-device-pixel-ratio: 1.5) {
    .border-1px:after {
      height: 1px;
      content: "";
      left: 0;
      width: 100%;
      border-top: 1px solid #e3e5e9;
      position: absolute;
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7)
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),
  (min-device-pixel-ratio: 2) {
    .border-1px:after {
      height: 1px;
      content: "";
      left: 0;
      width: 100%;
      border-top: 1px solid #e3e5e9;
      position: absolute;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5)
    }
  }

  .active {
    background-color: #54A4D7;
    color: #fff;
  }

  .active-btn {
    background-color: #2196f3;
    color: #fff;
  }
</style>
