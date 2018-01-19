<template>
  <mu-drawer class="step-alert" right :open="open">
    <div class="portal-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">历史记录</span> <span></span>
    </div>
    <div class="top—cen">
      <div class="time">
        <div class=" f_clear">
          <span class="f_le">开始时间:&nbsp;&nbsp;&nbsp;</span> <span class="f_le" @click="openPicker('start')">{{startDateShow}}</span>
        </div>
        <div class=" f_clear">
          <span class="f_le">结束时间:&nbsp;&nbsp;&nbsp;</span> <span class="f_le" @click="openPicker('end')">{{endDateShow}}</span>
        </div>
      </div>
      <div class="timeselect">
        <div class="borpaa" @click="getOtherInfo('true')">查询</div>
      </div>
    </div>
    <div class="historybody">
      <div class='tablecell'>
        <div class="table-body" v-for='(item,index) in historyData' :key='index'>
          <p class='table-head'>
            <span>{{item.date}}</span>
          </p>
          <table border="1" cellspacing="0">
            <tbody>
            <tr class='tablehead'>
              <td>企业总数</td>
              <td>{{item.total}}</td>
            </tr>
            <tr>
              <td>已巡查</td>
              <td>{{item.doPatrol}}</td>
            </tr>
            <tr>
              <td>待巡查</td>
              <td>{{item.notPatrol}}</td>
            </tr>
            <tr>
              <td>完成率</td>
              <td>{{item.percent1}}</td>
            </tr>
            </tbody>
          </table>
          <table border="1" cellspacing="0">
            <tbody>
            <tr class='tablehead'>
              <td>需执法总数</td>
              <td>{{item.handledTotal}}</td>
            </tr>
            <tr>
              <td>已巡查</td>
              <td>{{item.finish}}</td>
            </tr>
            <tr>
              <td>待巡查</td>
              <td>{{item.pendding}}</td>
            </tr>
            <tr>
              <td>完成率</td>
              <td>{{item.percent2}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <mu-dialog :open="textValueNull" title="提示">
      结束时间不能小于开始时间!
      <mu-flat-button slot="actions" primary @click="textValueNull=false" label="确定"/>
    </mu-dialog>
    <mt-date-picker
      :open='popupVisible'
      :defaultDate='defaultDate'
      :yearRange='yearRange'
      :slots='title == "每日一巡"?dailySlots:slots'
      :unit='unit'
      @cancel='popupVisible = false'
      @confirm='confirm'
    ></mt-date-picker>
  </mu-drawer>
</template>
<style scoped>
  .step-alert {
    width: 100%;
    z-index: 110;
    padding-top: 70px;
  }

  .tablehead {
    background-color: #2196f3;
    color: #fff;
  }

  .table-head {
    border-bottom: 1px solid #acb0bf;
    height: 30px;
    padding: 0 8px;
    font-weight: 700;
    background-color: #e0dede;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
  }

  .table-body {
    text-align: center;
    padding-bottom: 10px;
  }

  .table-body table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }

  .table-body table td {
    padding-top: 5px;
    padding-bottom: 6px;
    width: 50%;
    border: 1px solid #acb0bf;
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
    z-index: 201;
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

  .top—cen {
    width: 100%;
    position: fixed;
    top: 56px;
    padding: 15px 5px;
    z-index: 50;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .time {
    text-align: center;
    box-sizing: border-box;
    font-size: 15px;
    width: 60%;
    box-sizing: border-box;
  }

  .wid50 {
    width: 60%
  }

  .timeselect {
    text-align: center;
    box-sizing: border-box;
    color: #2196f3;
    font-size: 15px;
    width: 36%;
  }

  .f_clear:first-of-type {
    margin-bottom: 10px;
  }

  .borpaa {
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
  }

  .historybody {
    height: 100%;
    overflow-y: auto;
  }

  .tablecell {
    padding-top: 70px;
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
  import { dateTool } from '../../gisComponets/tool/DateTool.js';
  import {
    getPreMonth,
    getIndex,
    selectorDailyContent,
    selectorContent,
  } from '../../UIcomponents/mtDatePicker/timeHelper'
  import mtDatePicker from '../../UIcomponents/mtDatePicker/mtDatePicker.vue'
  export default{
    data(){
      const currentDay = dateTool.toDate(new Date(), 'yyyy-MM-dd');
      const prevDay = dateTool.toDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
      const prevMonth = getPreMonth(currentDay).slice(0, 7);
      const currentMonth = dateTool.toDate(new Date(), 'yyyy-MM');
      const fullYear = new Date().getFullYear()
      const Month = new Date().getMonth() + 1
      const day = dateTool.toDate(new Date(), 'yyyy-MM-dd').split('-')[2]
      return {
        openHistory: false,
        textValueNull: false,
        historyData: [],
        timeParams: '',
        popupVisible: false,
        currentDay,
        prevDay,
        prevMonth,
        currentMonth,
        fullYear,
        Month,
        day,
        startDateParam: '',
        endDateParam: '',
        startDateShow: '',
        endDateShow: '',
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
          className: 'slot3',
          textAlign: 'center'
        }],
        dailySlots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }],
      }
    },
    components: {
      mtDatePicker
    },
    watch: {
      open(val){
        if (val) {
          //初始化数据
          if (this.title == '每日一巡') {
            this.startDateShow = this.prevDay
            this.endDateShow = this.currentDay
            this.startDateParam = this.prevDay
            this.endDateParam = this.currentDay
            this.getHistory(GET_ZF_HISTORY, this.prevDay, this.currentDay);
          } else if (this.title == '每月一巡') {
            this.startDateShow = this.prevMonth + '月'
            this.endDateShow = this.currentMonth + '月'
            this.startDateParam = this.prevMonth
            this.endDateParam = this.currentMonth
            this.getHistory(GET_MONTHZF_HISTORY, this.prevMonth, this.currentMonth);
          } else if (this.title == '每周一巡') {
            this.startDateShow = this.fullYear + '-1周'
            this.endDateShow = this.fullYear + '-2周'
            this.startDateParam = this.fullYear + '-1'
            this.endDateParam = this.fullYear + '-2'
            // todo 每周一巡的历史记录接口
            this.getHistory(GET_ZF_HISTORY, this.startDateParam, this.endDateParam);
          } else if (this.title == '每季一巡') {
            this.startDateShow = this.fullYear + '-1季度'
            this.endDateShow = this.fullYear + '-2季度'
            this.startDateParam = this.fullYear + '-Q1'
            this.endDateParam = this.fullYear + '-Q2'
            // todo 每季一巡的历史记录接口
            this.getHistory(GET_ZF_HISTORY, this.startDateParam, this.endDateParam);
          }
        }
      },
    },
    props: ['open', 'id', 'title'],
    methods: {
      backToMap(){
        this.$emit('closeHistoryPage')
      },
      //选择器里每月,每周,每季的数据
      pickerContent(status){
        if (this.title === '每月一巡') {
          this.unit = {
            unitLeft: '年',
            unitRight: '月',
            length: 12
          }
        }
        else if (this.title === '每周一巡') {
          this.unit = {
            unitLeft: '年',
            unitRight: '周',
            length: 52
          }
        }
        else if (this.title === '每季一巡') {
          this.unit = {
            unitLeft: '年',
            unitRight: '季度',
            length: 4
          }
        }
        else if (this.title === '每日一巡') {
          this.unit = {
            unitLeft: '年',
            unitCenter: '月',
            unitRight: '日'
          }
        }
        this.defaultDate = (status === "start" ? this.startDateParam : this.endDateParam);
      },
      //打开选择器
      openPicker(status) {
        this.timeParams = status;
        this.popupVisible = true;
        this.pickerContent(status)
      },
      //时间展示并查询
      getOtherInfo(bool) {
        const startTimeStamp = new Date(this.startDateParam).getTime()
        const endTimeStamp = new Date(this.endDateParam).getTime();
        const startQuater = this.startDateParam.split('Q')[1]
        const endQuater = this.endDateParam.split('Q')[1]
        let issmall = startTimeStamp - endTimeStamp;
        if (this.title != '每季一巡' && issmall > 0 || (startQuater - endQuater) > 0) {
          this.textValueNull = true;
          return;
        } else {
          this.popupVisible = false;
          bool ? this.submitCheck() : '';
        }
      },
      //查询
      submitCheck(){
        if (this.title == '每周一巡') {
          // todo 每周一巡的历史记录接口
          this.getHistory(GET_ZF_HISTORY, this.startDateParam, this.endDateParam);
        } else if (this.title == '每季一巡') {
          // todo 每季一巡的历史记录接口
          this.getHistory(GET_ZF_HISTORY, this.startDateParam, this.endDateParam);
        } else if (this.title == '每月一巡') {
          this.getHistory(GET_MONTHZF_HISTORY, this.startDateParam, this.endDateParam);
        } else if (this.title == '每日一巡') {
          this.getHistory(GET_ZF_HISTORY, this.startDateParam, this.endDateParam);
        }
      },
      confirm(values){
        let chooShowDate = values.split('年').join('-')
        let resultDayStr = ''
        try {
          resultDayStr = values.substr(0, 4) + '-' + values.substr(5, 2) + '-' + values.substr(8, 2)
        } catch (e) {
        }
        if (this.title == '每周一巡' || this.title == '每月一巡') {
          if (this.timeParams == 'start') {
            this.startDateShow = chooShowDate;
            this.startDateParam = values.split('年').join('-').slice(0, -1);
          } else if (this.timeParams == 'end') {
            this.endDateShow = chooShowDate;
            this.endDateParam = values.split('年').join('-').slice(0, -1);
          }
        } else if (this.title == '每季一巡') {
          let str = values.split('年')[0] + '-Q';
          if (this.timeParams == 'start') {
            this.startDateShow = values.split('年')[0] + '-' + values.split('年')[1];
            this.startDateParam = str + values.split('年')[1].substr(0, 1);
          } else if (this.timeParams == 'end') {
            this.endDateShow = values.split('年')[0] + '-' + values.split('年')[1];
            this.endDateParam = str + values.split('年')[1].substr(0, 1);
          }
        } else if (this.title == '每日一巡') {
          if (this.timeParams == 'start') {
            this.startDateShow = resultDayStr;
            this.startDateParam = resultDayStr;
          } else if (this.timeParams == 'end') {
            this.endDateShow = resultDayStr;
            this.endDateParam = resultDayStr;
          }
        }
        this.getOtherInfo()
      },
      //从后台获取数据
      getHistory(url, startDateParam, endDateParam){
        this.$http.get(url, {
          params: {
            /*每日*/
            startDate: startDateParam,
            endDate: endDateParam,
            /*每月,每周,每季*/
            nStartDate: startDateParam,
            nEndDate: endDateParam,
            streetId: this.$props.id
          }
        }).then(res => {
          if (res.body.code == 200) {
            var datas = res.body.data;
            datas.forEach((val, index) => {
              if (val.total == 0 || val.handledTotal == 0) {
                val.percent1 = '0.0%'
                val.percent2 = '0.0%'
              } else {
                let point1 = val.doPatrol / val.total;
                let point2 = val.finish / val.handledTotal;
                val.percent1 = Number(point1 * 100).toFixed(1) + '%'
                val.percent2 = Number(point2 * 100).toFixed(1) + '%'
              }
            })
            this.historyData = datas;
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  };
</script>
