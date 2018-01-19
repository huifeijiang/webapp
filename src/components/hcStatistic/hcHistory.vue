<template>
  <div>
    <mu-drawer class="step-alert-hchistory" right :open="openhh">
      <div class="portal-head">
        <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
        <span class="alert-title">{{titlehislist}}</span>
        <span></span>
      </div>
      <div class="f_clear top—cen">
        <div class="time">
          <div class=" f_clear">
            <span class="f_le">{{showDate}}</span>
          </div>
        </div>
        <div class="timeselect">
          <div class="borpaa" @click="openPicker">请选择</div>
        </div>
      </div>
      <div class='bodywrap'>
        <div class="historybody">
          <div class="tablecell"
               v-for='(item,index) in historyData'
               :key='index'>
            <span>{{index+1+'.'+item.enterpriseName}}</span>
            <mu-raised-button
              :label="item.missionStatusName"
              class="demo-raised-button"
              primary
              @click='getHistorydetail(item)'/>
          </div>

        </div>
      </div>
    </mu-drawer>
    <mt-date-picker
      :open='popupVisible'
      :defaultDate='defaultDate'
      :yearRange='yearRange'
      :slots='titlehislist == "每日一巡"?dailySlots:slots'
      :unit='unit'
      @cancel='popupVisible=false'
      @confirm='confirm'
    ></mt-date-picker>
    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="现场检查记录表"></autoformPreview>
  </div>
</template>
<style scoped>
  .step-alert-hchistory {
    width: 100%;
    z-index: 200;
    padding-top: 55px;
  }

  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    color: #fff;
  }

  .alert-title {
    font-size: 20px;
  }

  .event-list span {
    width: 25%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }

  .table-list-wrap {
    width: 100%;
    position: absolute;
    left: 0;
    top: 56px;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .table-list {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
  }

  .table-list span {
    font-size: 14px;
    color: #6a6e7b;
  }

  .biao-left {
    width: 49%;
    text-align: left;
  }

  .biao-right {
    width: 49%;
    text-align: right;
  }

  .time {
    width: 100%;
    height: 50px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    padding: 0 5px;
    border-bottom: 1px solid #333;
  }

  .tablecell {
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
  }

  .demo-raised-button {
    margin-left: 6px;
  }

  .table-body table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }

  .table-body table td {
    padding-top: 5px;
    padding-bottom: 6px;
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
    z-index: 101;
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

  .top—cen {
    width: 100%;
    background: #fff;
    position: fixed;
    height: 50px;
    line-height: 50px;
    top: 56px;
    z-index: 56;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .time {
    text-align: center;
    box-sizing: border-box;
    font-size: 15px;
    width: 60%;
    box-sizing: border-box;
    padding-left: 2%;
    border-bottom: transparent;
  }

  .f_le {
    font-weight: normal;
  }

  .timeselect {
    text-align: center;
    box-sizing: border-box;
    color: #2196f3;
    font-size: 15px;
    width: 36%;
  }

  .borpaa {
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0 -2% 0 37%;
    height: 35px;
    line-height: 35px;
  }

  .historybody {
    padding-top: 50px;
  }

  .bodywrap {
    height: 100%;
    overflow-y: auto;
  }

  .otherPicker {
    width: 100%;
  }

  .pop-div {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }

  .pop-le {
    color: #30aafd;
    font-size: 16px;
  }

</style>
<script>
  import {
    dateTool
  } from '../../gisComponets/tool/DateTool.js';
  import {
    mapGetters,
    mapActions,
    mapState
  } from 'vuex';
  import {
    eventBus
  } from '../eventBus/eventBus';
  import {
    formFillTool
  } from '../../UIcomponents/autoForm/tool/FormFillTool';
  import {
    formItemShowTool
  } from '../../UIcomponents/autoForm/tool/FormItemShowTool';
  import {
    xiaofeishuiData
  } from '../../UIcomponents/autoForm/data/xiaofeishuiData.js';
  import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
  import mtDatePicker from '../../UIcomponents/mtDatePicker/mtDatePicker.vue';
  import {getYearWeek,getQuater} from '../../UIcomponents/mtDatePicker/timeHelper'
  export default {
    props: {
      openhh: {
        type: Boolean,
        default: ''
      },
      titlehislist: {
        type: String,
        default: ''
      },
    },
    components: {
      autoformPreview,
      mtDatePicker
    },
    watch: {
      openhh(val) {
        if (val == true) {
            const baseDay = dateTool.toDate(new Date(), 'yyyy-MM-dd')
          if (this.titlehislist == '每日一巡') {
            this.showDate = baseDay
            this.paramsDate = baseDay
            this.getHcTask(GET_HC_STATISTIC, 2, baseDay)
          }
          else if (this.titlehislist == '每周一巡') {
            this.showDate = new Date().getFullYear() +'-'+getYearWeek(baseDay)+ '周'
            this.paramsDate = new Date().getFullYear() +'-'+getYearWeek(baseDay)
            this.getHcTask(GET_WEEK_TASKLIST, 0, this.paramsDate)
          }
          else if (this.titlehislist == '每月一巡') {
            this.showDate = dateTool.toDate(new Date(), 'yyyy-MM') + '月'
            this.paramsDate = dateTool.toDate(new Date(), 'yyyy-MM')
            this.getHcTask(GET_MONTH_TASKLIST, 1, this.paramsDate)
          }
          else if (this.titlehislist == '每季一巡') {
            this.showDate = new Date().getFullYear() +'-'+ getQuater(baseDay)+'季度'
            this.paramsDate = new Date().getFullYear() + '-Q'+getQuater(baseDay)
            this.getHcTask(GET_YEAR_TASKLIST, 0, this.paramsDate)
          }
        }
      }
    },
    data() {
      return {
        historyData: [],
        showDate: '',
        paramsDate: '',
        userId: this.getUserId(),
        openperive: false,
        popupVisible: false,
        defaultDate: '',
        yearRange: {
          minLeft: 2017,
          maxLeft: 2020,
        },
        unit: {},
        slots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center',
        }, {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center',
        }],
        dailySlots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center',
        }, {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center',
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center',
        }],
      }
    },
    methods: {
      ...mapGetters({
        getUserId: 'getUserId',
      }),
      backToMap() {
        this.$emit('closehistory')
      },
      //选择器自定义内容
      pickerContent(){
        if (this.titlehislist === '每月一巡') {
          this.unit = {
            unitLeft: '年',
            unitRight: '月',
            length: 12
          }
        }
        else if (this.titlehislist === '每周一巡') {
          this.unit = {
            unitLeft: '年',
            unitRight: '周',
            length: 52
          }
        }
        else if (this.titlehislist === '每季一巡') {
          this.unit = {
            unitLeft: '年',
            unitRight: '季度',
            length: 4
          }
        }
        else if (this.titlehislist === '每日一巡') {
          this.unit = {
            unitLeft: '年',
            unitCenter: '月',
            unitRight: '日'
          }
        }
        this.defaultDate = this.paramsDate
      },
      //展开四个巡时间选择
      openPicker() {
        this.popupVisible = true;
        this.pickerContent();
      },
      //获取四个巡的列表
      getHcTask(url, status, date) {
        this.$http.get(url, {
          params: {
            nDate: date,
            date: date,
            checkerId: this.userId,
            size: 500,
            missionStatus: status
          }
        }).then(res => {
          if (res.body.code == 200) {
            this.historyData = res.body.data.content;
          }
        }).catch(err => {
        })
      },
      confirm(values){
        this.popupVisible = false;
        let resultDayStr = ''
        try {
          resultDayStr = values.substr(0, 4) + '-' + values.substr(5, 2) + '-' + values.substr(8, 2)
        } catch (e) {}
        let chooShowDate = values.split('年').join('-');
        if (this.titlehislist == '每周一巡') {
          this.showDate = chooShowDate;
          this.paramsDate = values.split('年').join('-').slice(0, -1);
          this.getHcTask(GET_WEEK_TASKLIST, 0, this.paramsDate);
        } else if (this.titlehislist == '每月一巡') {
          this.showDate = chooShowDate;
          this.paramsDate = values.split('年').join('-').slice(0, -1);
          this.getHcTask(GET_MONTH_TASKLIST, 1, this.paramsDate);
        } else if (this.titlehislist == '每季一巡') {
          let str = values.split('年')[0] + '-Q';
          this.showDate = values.split('年')[0] + '-' + values.split('年')[1];
          this.paramsDate = str + values.split('年')[1].substr(0, 1);
          this.getHcTask(GET_YEAR_TASKLIST, 0, this.paramsDate);
        } else if (this.titlehislist == '每日一巡') {
          this.showDate = resultDayStr
          this.paramsDate = resultDayStr
          this.getHcTask(GET_HC_STATISTIC, 2, this.paramsDate);
        }
      },
      //获取四个巡详情
      getHistorydetail(item) {
        this.openperive = true;
        if (this.titlehislist == '每日一巡') {
          this.$http.get(GET_HC_HISTORY + item.id).then(res => {
            if (res.body.code == 200) {
              let obj = res.body.data;
              let arr = [];
              for (let param in obj) {
                let dt = {};
                switch (param) {
                  case 'enterpriseName':
                    dt.name = '*企业名称';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'enterpriseAddr':
                    dt.name = '*企业地址';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'enterpriseLicense':
                    dt.name = '*统一社会信用代码';
                    if (obj[param] == 'false' || obj[param] == false) {
                      dt.value = '无'
                    } else {
                      dt.value = obj[param];
                    }
                    dt.show = true;
                    break;
                  case 'legalPersonName':
                    dt.name = '*法人代表';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'envManager':
                    dt.name = '*环保负责人';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'reporter':
                    dt.name = '上报人';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'datetime':
                    dt.name = '上报时间';
                    let date = new Date(obj[param]);
                    dt.value = dateTool.toDate(date, 'yyyy年MM月dd')
                    dt.show = true;
                    break;
                  case 'enterpriseContactsTel':
                    dt.name = '*联系方式';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'producingStatusName':
                    dt.name = '*生产经营情况';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'waterFacility':
                    dt.name = '*废水处理设施';
                    if (obj['producingStatus'] != 1) {
                      dt.show = false;
                    } else {
                      dt.value = obj[param] ? '有' : '无';
                      dt.show = true;
                    }
                    break;
                  case 'tagHangName':
                    dt.name = '标识、标志牌悬挂';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'otherTagHang':
                    dt.name = '其他标识、标志牌悬挂';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'emergencyMaterialName':
                    dt.name = '应急物资';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'otherEmergencyMaterial':
                    dt.name = '其他应急物资';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'collectionTubeName    ':
                    dt.name = '废水收集管道';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'monitorFacility':
                    dt.name = '监控设施';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? '有' : '无';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'outletStatus':
                    dt.name = '废水处理设施运行情况';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? '总排口有排水' : '总排口无排水';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'runningLedgerName':
                    dt.name = '运行台账';
                    if (obj['producingStatus'] == 1 && obj['waterFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'dangerReserveFacility':
                    dt.name = '*危废贮存设施';
                    if (obj['producingStatusName'] != '正常生产') {
                      dt.show = false;
                    } else {
                      dt.value = obj[param] ? '有' : '无';
                      dt.show = true;
                    }
                    break;
                  case 'reserveFacilityTypeName':
                    dt.name = '危废贮存设施类别';
                    if (obj['producingStatus'] == 1 && obj['dangerReserveFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'otherReserveFacilityType8':
                    dt.name = '危废暂存量(吨)';
                    if (obj['producingStatus'] == 1 && obj['dangerReserveFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? `${obj[param]}吨` : '';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'otherReserveFacilityType0':
                    dt.name = '其他危废贮存设施类别';
                    if (obj['producingStatus'] == 1 && obj['dangerReserveFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'gasCleanFacility':
                    dt.name = '*废气处理设施';
                    if (obj['producingStatus'] != 1) {
                      dt.show = false;
                    } else {
                      dt.value = obj[param] ? '有' : '无';
                      dt.show = true;
                    }
                    break;
                  case 'denoterStatus':
                    dt.name = '悬挂标志牌';
                    if (obj['producingStatus'] == 1 && obj['gasCleanFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? '已悬挂' : '未悬挂';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'gasCleanFacilityStatus':
                    dt.name = '运转情况';
                    if (obj['producingStatus'] == 1 && obj['gasCleanFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? '有运转' : '无运转';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'gasCleanFacilityRecord':
                    dt.name = '运行记录';
                    if (obj['producingStatus'] == 1 && obj['gasCleanFacility'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? '有记录' : '无记录';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'boiler':
                    dt.name = '*锅炉';
                    if (obj['producingStatus'] != 1) {
                      dt.show = false;
                    } else {
                      dt.value = obj[param] ? '有' : '无';
                      dt.show = true;
                    }
                    break;
                  case 'boilerFuelType':
                    dt.name = '使用燃料';
                    if (obj['producingStatus'] == 1 && obj['boiler'] == true) {
                      dt.show = true;
                      dt.value = obj[param] ? '清洁' : '非清洁';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'otherBoilerFuelType':
                    dt.name = '燃料类型';
                    if (obj['producingStatus'] == 1 && obj['boiler'] == true) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'outletTypeName':
                    dt.name = '企业外围排口设置情况';
                    if (obj['producingStatus'] == 1) {
                      dt.show = true;
                      dt.value = obj[param];
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    break;
                  case 'describe':
                    dt.name = '情况说明';
                    dt.value = obj[param];
                    dt.show = true;
                    break;
                  case 'riverName':
                    dt.name = '附近河流';
                    if (obj['producingStatus'] == 1) {
                      dt.show = true;
                      dt.value = obj[param] ? obj[param] : '不清楚';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                    //                      if(obj[param] == null){
                    //                        dt.value = '不清楚'
                    //                      }else{
                    //                        dt.value = obj[param]
                    //                      }
                    break;
                  case 'lawEnforcement':
                    dt.name = '*是否上报执法';
                    if (obj['producingStatus'] == 1) {
                      dt.show = true;
                      dt.value = obj[param] ? '是' : '否';
                    } else {
                      dt.show = false;
                      dt.value = '';
                    }
                  default:
                    dt = null;
                    break;
                }
                if (dt != null) arr.push(dt);
              }
              this.tableData = arr;
            }
          }).catch(err => {
            console.log(err)
          })
        }
        else if (this.titlehislist == '每周一巡') {
          this.$http.get(GET_WEEK_HISTORY + item.id).then(res => {
            if (res.body.code == 200) {
              let obj = res.body.data;
              let arr = [];
              for (let param in obj) {
                let dt = {};
                switch (param) {
                  case 'enterpriseName':
                    dt.name = '单位名称';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseAddr':
                    dt.name = '单位地址';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseLicense':
                    dt.name = '营业执照';
                    dt.value = obj[param];
                    break;
                  case 'legalPersonName':
                    dt.name = '法人代表';
                    dt.value = obj[param];
                    break;
                  case 'legalPersonTel':
                    dt.name = '法人代表联系电话';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseContactsName':
                    dt.name = '企业联系人';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseContactsTel':
                    dt.name = '企业联系人电话';
                    dt.value = obj[param];
                    break;

                  case 'approvalNo':
                    dt.name = '环保批文';
                    dt.value = obj[param];
                    break;
                  case 'isProduceWastewater':
                    dt.name = '生产废水';
                    dt.value = obj[param] ? '有' : '无';
                    break;
                  case 'productResulInPolutionname':
                    dt.name = '可能产生废水的产品类别';
                    dt.value = obj[param];
                    break;
                  case 'techResultInPolutionname':
                    dt.name = '可能产生废水的主要生产工艺';
                    dt.value = obj[param];
                    break;
                  case 'isOutWastewater':
                    dt.name = '废水直排';
                    dt.value = obj[param] ? '有' : '无';
                    break;
                  case 'isWastewaterFacility':
                    dt.name = '废水处理设施';
                    dt.value = obj[param] ? '有' : '无';
                    break;
                  case 'describe':
                    dt.name = '情况说明';
                    dt.value = obj[param];
                    break;
                  case 'isLawEnforcement':
                    dt.name = '是否需要执法整治';
                    dt.value = obj[param] ? '是' : '否';
                    break;
                  case 'riverName':
                    dt.name = '附近河流';
                    dt.value = obj[param] ? obj[param] : '不清楚';
                    break;
                  case 'gridname':
                    dt.name = '社区网格';
                    dt.value = obj[param];
                    break;

                  default:
                    dt = null;
                    break;
                }
                if (dt != null) arr.push(dt);
              }
              this.tableData = arr;
            }
          }).catch(err => {
            console.log(err)
          })
        }
        else if (this.titlehislist == '每月一巡') {
          this.$http.get(GET_MONTH_HISTORY + item.id + '/details').then(res => {
            if (res.body.code == 200) {
              let formClone = formFillTool.formClone(xiaofeishuiData.xiaofeishuiDataJson.form);
              let obj = res.body.data;
              //填充表单
              formFillTool.fillForm(formClone, obj);
              //初始化父子关系
              formFillTool.initForm(formClone);
              //设置父子关系展示
              formItemShowTool.setShowByParent(formClone);
              //抛出详情展示事件
              eventBus.bus.emit(eventBus.LAMPYULAN, formClone);
            }
          }).catch(err => {
          })
        }
        else if (this.titlehislist == '每季一巡') {
          this.$http.get(GET_YEAR_HISTORY + item.id).then(res => {
            if (res.body.code == 200
            ) {
              let obj = res.body.data;
              let arr = [];
              for (let param in obj) {
                let dt = {};
                switch (param) {
                  case 'enterpriseName':
                    dt.name = '单位名称';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseAddr':
                    dt.name = '单位地址';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseLicense':
                    dt.name = '营业执照';
                    dt.value = obj[param];
                    break;
                  case 'legalPersonName':
                    dt.name = '法人代表';
                    dt.value = obj[param];
                    break;
                  case 'legalPersonTel':
                    dt.name = '法人代表联系电话';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseContactsName':
                    dt.name = '企业联系人';
                    dt.value = obj[param];
                    break;
                  case 'enterpriseContactsTel':
                    dt.name = '企业联系人电话';
                    dt.value = obj[param];
                    break;

                  case 'approvalNo':
                    dt.name = '环保批文';
                    dt.value = obj[param];
                    break;
                  case 'isProduceWastewater':
                    dt.name = '生产废水';
                    dt.value = obj[param] ? '有' : '无';
                    break;
                  case 'productResulInPolutionname':
                    dt.name = '可能产生废水的产品类别';
                    dt.value = obj[param];
                    break;
                  case 'techResultInPolutionname':
                    dt.name = '可能产生废水的主要生产工艺';
                    dt.value = obj[param];
                    break;
                  case 'isOutWastewater':
                    dt.name = '废水直排';
                    dt.value = obj[param] ? '有' : '无';
                    break;
                  case 'isWastewaterFacility':
                    dt.name = '废水处理设施';
                    dt.value = obj[param] ? '有' : '无';
                    break;
                  case 'describe':
                    dt.name = '情况说明';
                    dt.value = obj[param];
                    break;
                  case 'isLawEnforcement':
                    dt.name = '是否需要执法整治';
                    dt.value = obj[param] ? '是' : '否';
                    break;
                  case 'riverName':
                    dt.name = '附近河流';
                    dt.value = obj[param] ? obj[param] : '不清楚';
                    break;
                  case 'gridname':
                    dt.name = '社区网格';
                    dt.value = obj[param];
                    break;

                  default:
                    dt = null;
                    break;
                }
                if (dt != null) arr.push(dt);
              }
              this.tableData = arr;
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
    },
  }
</script>
