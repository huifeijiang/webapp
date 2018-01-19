<template>
  <div class='statistic'>
    <!-- <head-dom v-show="showHead" v-on:back="backToHome" :type="'back'">数据统计</head-dom> -->
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToHome" value="keyboard_arrow_left"/>
      <span class="alert-title">数据统计</span>
      <span style="display:none;">隐藏</span>
    </div>
    <div class="f_clear top-cen">
      <div class="time f_clear">
        <!-- <div class="letime" @click="openPicker('start')">
          <input placeholder="请选择开始时间" v-model="NowTime" disabled/>
        </div>
        <div class="miimgs"><img src="static/v2images/chufa.png"/></div>
        <div class="ritime" @click="openPicker('end')">
          <input placeholder="请选择开始时间" v-model="checkendTime" disabled/>
        </div> -->
        <div class="letime" @click="openPicker('start')">
          <input placeholder="请选择开始时间" v-model="startDateShow" disabled/>
        </div>
        <div class="miimgs"><img src="static/v2images/chufa.png"/></div>
        <div class="ritime" @click="openPicker('end')">
          <input placeholder="请选择开始时间" v-model="endDateShow" disabled/>
        </div>
      </div>
      <!--获取星期-->
      <div class="get-week">
        <span>{{getDateOne}}</span>
        <span>{{getDateTwo}}</span>
      </div>
      <!--end-->
      <!---->
      <div class="street-sel" @click="open=true">
        <img src="static/v2images/street-sel.png" class="street-sel-img">
        <span class="sel-tit">选择街道</span>
        <span class="sel-rig">{{streetlist.join(',')}}</span>
        <img src="static/images/ic-go.png" class="sel-img">
      </div>
      <!---->
      <div class="timeselect">
        <div class="borpaa" @click="committt">立即统计</div>
      </div>
    </div>
    <div class="contant-sta" ref="contantsta" :class='{"content-border":bool}'>
      <!-- <hezhang title="河长登录统计" :id="5"></hezhang> -->
      <total title="总体数据统计" v-show="trueStreet[0].selected" :show="show" @showall="showalla"></total>
      <!-- //新安、西乡、航城、福永、福海、沙井、新桥、松岗、燕罗、石岩 -->
      <shreets title="新安街道数据统计" v-show="trueStreet[1].selected" :id="1" :show="show1" @showown="showown(1)"></shreets>
      <shreets title="西乡街道数据统计" v-show="trueStreet[2].selected" :id="2" :show="show2" @showown="showown(2)"></shreets>
      <shreets title="航城街道数据统计" v-show="trueStreet[3].selected" :id="7" :show="show3" @showown="showown(7)"></shreets>
      <shreets title="福永街道数据统计" v-show="trueStreet[4].selected" :id="6" :show="show4" @showown="showown(6)"></shreets>
      <shreets title="福海街道数据统计" v-show="trueStreet[5].selected" :id="8" :show="show5" @showown="showown(8)"></shreets>

      <shreets title="沙井街道数据统计" v-show="trueStreet[6].selected" :id="5" :show="show6" @showown="showown(5)"></shreets>
      <shreets title="新桥街道数据统计" v-show="trueStreet[7].selected" :id="9" :show="show7" @showown="showown(9)"></shreets>
      <shreets title="松岗街道数据统计" v-show="trueStreet[8].selected" :id="3" :show="show8" @showown="showown(3)"></shreets>
      <shreets title="燕罗街道数据统计" v-show="trueStreet[9].selected" :id="10" :show="show9" @showown="showown(10)"></shreets>
      <shreets title="石岩街道数据统计" v-show="trueStreet[10].selected" :id="4" :show="show10" @showown="showown(4)"></shreets>

    </div>
    <!-- <mt-datetime-picker ref="pickerstart" v-model="pickerVisiblestart" type="date" :startDate="minDate"
                        year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
                        @confirm="handleConfirm">
    </mt-datetime-picker> -->
    <!-- <mt-datetime-picker ref="pickerend" v-model="pickerVisibleend" type="date" :startDate="minDate"
                        year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
                        @confirm="handleConfirmend">
    </mt-datetime-picker> -->
    <!-- <mt-popup class='otherPicker' v-model="popupVisiblestart" position="bottom">
      <div class='pop-div'>
        <span class='pop-le' @click='popupVisiblestart=false'>取消</span>
        <span class='pop-le' @click='getOtherList'>确定</span>
      </div>
      <mt-picker :slots='dailySlots' @change='storeDateData'></mt-picker>
    </mt-popup> -->
		<mt-popup class='otherPicker' v-model="popupVisible" position="bottom">
      <div class='pop-div'>
        <span class='pop-le' @click='popupVisible=false'>取消</span>
        <span class='pop-le' @click='getOtherInfo("false")'>确定</span>
      </div>
      <mt-picker :slots='dailySlots' @change='storeDateData'></mt-picker>
    </mt-popup>
    <mu-dialog :open="textValueNull" title="提示">
      结束时间不能小于开始时间!
      <mu-flat-button slot="actions" primary @click="close" label="确定"/>
    </mu-dialog>

    <mu-drawer :open="open" right id="draw">
      <!-- <head-dom @back="" :type="'back'"></head-dom> -->
      <div class="alert-head">
        <mu-icon class="alert-left" @click="open=false" value="keyboard_arrow_left"/>
        <span class="alert-title">选择街道</span>
        <span class="alert-right" @click="open=false">完成</span>
      </div>
      <div class="street-hub">
        <div class="street-list" v-for="item in streetList" @click="selectStreet(item)">
          <span class="flex-grow" :class="item.selected?'sel-l':''">{{item.name}}</span>
          <img v-show="item.selected" src="static/v2images/gouxuan.png" alt="">
        </div>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
  import headDom from '../../UIcomponents/header/head';
  import shreets from './shreets.vue';
  import hezhang from './hezhang.vue'
  import total from './total.vue';
  import 'mint-ui/lib/style.css';
  import {eventBus} from '../eventBus/eventBus.js';
  import {mapActions} from 'vuex';
  import { dateTool } from '../../gisComponets/tool/DateTool.js';
  import { getPreMonth, getIndex, selectorContent, getYearWeek, selectorDailyContent } from '../riverStatistic/timeHelper'

  export default {
    components: {
      headDom,
      shreets,
      total,
      hezhang
    },
    data() {
      const currentDay = dateTool.toDate(new Date(), 'yyyy-MM-dd');
      const prevDay = dateTool.toDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
      const prevMonth = getPreMonth(currentDay);
      const currentMonth = dateTool.toDate(new Date(), 'yyyy-MM');
      const fullYear = new Date().getFullYear()
      const Month = new Date().getMonth() + 1
      const day = dateTool.toDate(new Date(), 'yyyy-MM-dd').split('-')[2]
      return {
        currentDay,
        prevDay,
        prevMonth,
        currentMonth,
        fullYear,
        Month,
        day,
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        textValueNull: false,
        showHead: true,
        pickerVisiblestart: '',
        pickerVisibleend: '',
        popupVisible: false,
        NowTime: '',
        checkendTime: '',
        startTime: null,
        endTime: null,
        minDate: new Date('2017-01-01'),
        open: false,
        bool:false,
        timeParams: '',
        streetList: [{
          name: '总体数据',
          selected: false
        }, {
          name: '新安街道',
          selected: false
        }, {
          name: '西乡街道',
          selected: false
        }, {
          name: '航城街道',
          selected: false
        }, {
          name: '福永街道',
          selected: false
        }, {
          name: '福海街道',
          selected: false
        }, {
          name: '沙井街道',
          selected: false
        }, {
          name: '新桥街道',
          selected: false
        }, {
          name: '松岗街道',
          selected: false
        }, {
          name: '燕罗街道',
          selected: false
        }, {
          name: '石岩街道',
          selected: false
        }],
        trueStreet: [],
        streetlist: [],
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
        startDateParam: '',
        endDateParam: '',
        startDateShow: '',
        endDateShow: '',
      }
    },
    computed: {
      getDateOne(){
        let date = new Date(this.startDateShow);
        let arg;
        switch (date.getDay()) {
          case 0:
            arg = '周日';
            break;
          case 1:
            arg = '周一';
            break;
          case 2:
            arg = '周二';
            break;
          case 3:
            arg = '周三';
            break;
          case 4:
            arg = '周四';
            break;
          case 5:
            arg = '周五';
            break;
          case 6:
            arg = '周六';
            break;
        }
        return arg;
      },
      getDateTwo(){
        let date = new Date(this.endDateShow);
        let arg;
        switch (date.getDay()) {
          case 0:
            arg = '周日';
            break;
          case 1:
            arg = '周一';
            break;
          case 2:
            arg = '周二';
            break;
          case 3:
            arg = '周三';
            break;
          case 4:
            arg = '周四';
            break;
          case 5:
            arg = '周五';
            break;
          case 6:
            arg = '周六';
            break;
        }
        return arg;
      }
    },
    created() {
      this.trueStreet = JSON.parse(JSON.stringify(this.streetList));
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      // openPicker(status) {
      //   if (status == 'start') {
      //     this.$refs.pickerstart.open();
      //   } else if (status == 'end') {
      //     this.$refs.pickerend.open();
      //   }

      // },
      // openPicker() {
      //   this.popupVisible = true;
      //   this.pickerContent();
      // },
      //打开选择器
      openPicker(status) {
        this.timeParams = status;
        this.popupVisible = true;
        this.pickerContent();
      },
       //时间展示并查询
      getOtherInfo(bool) {
        const startTimeStamp = new Date(this.startDateParam).getTime()
        const endTimeStamp = new Date(this.endDateParam).getTime();
        let issmall = startTimeStamp - endTimeStamp;
        if (issmall > 0) {
          this.textValueNull = true;
          return;
        } else {
          this.popupVisible = false;
          bool ? this.submitCheck() : ''
        }
      },
      showalla(){
        this.show = !this.show;
      },
      showown(val){
        if (val == 1) {
          this.show1 = !this.show1;
        }
        if (val == 2) {
          this.show2 = !this.show2;
        }
        if (val == 7) {
          this.show3 = !this.show3;
        }
        if (val == 6) {
          this.show4 = !this.show4;
        }
        if (val == 8) {
          this.show5 = !this.show5;
        }

        if (val == 5) {
          this.show6 = !this.show6;
        }
        if (val == 9) {
          this.show7 = !this.show7;
        }
        if (val == 3) {
          this.show8 = !this.show8;
        }
        if (val == 10) {
          this.show9 = !this.show9;
        }
        if (val == 4) {
          this.show10 = !this.show10;
        }

      },
      // handleConfirm() {
      //   let StartTime = this.format(this.pickerVisiblestart, 'start');
      //   this.NowTime = StartTime.split(" ")[0];
      // },
      // handleConfirmend() {
      //   let StartTime = this.format(this.pickerVisibleend, 'end');
      //   this.checkendTime = StartTime.split(" ")[0];
      // },
      format(datetime, type) {
        let startTime = '';
        let year = datetime.getFullYear();
        let month = datetime.getMonth() + 1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        let date = datetime.getDate();
        if (date >= 0 && date <= 9) {
          date = "0" + date;
        }
        if (type == 'start') {
          return year + '-' + month + '-' + date + " 00:00:00"
        } else if (type == 'end') {
          return year + '-' + month + '-' + date + " 23:59:59"
        }

      },

      close(){
        this.textValueNull = false;
      },
      backToHome() {
        this.$router.push('/home/portal');
        this.setMapShow(true);
      },
      committt(){
        this.bool = true;
        const startTimeStamp = new Date(this.startDateParam).getTime()
        const endTimeStamp = new Date(this.endDateParam).getTime();
        // let issmall = this.pickerVisibleend - this.pickerVisiblestart;
        let issmall = startTimeStamp - endTimeStamp;
        if (issmall > 0) {
          this.textValueNull = true;
          return false
        } else {
          // let start = this.format(this.pickerVisiblestart, 'start');
          // let end = this.format(this.pickerVisibleend, 'end');
          let start = this.format(new Date(startTimeStamp), 'start');
          let end = this.format(new Date(endTimeStamp), 'end');
          // console.log(start)
        //  console.log(end)
          eventBus.bus.emit(eventBus.TONGJISHUJU, start, end)
        }
        this.trueStreet = JSON.parse(JSON.stringify(this.streetList));
      },
      selectStreet(item){
        item.selected = !item.selected;
        let that = this
        if (item.selected) {
          this.streetlist.push(item.name)
        } else {
          this.streetlist.forEach((val, index) => {
            if (item.name == val) {
              that.streetlist.splice(index,1)
            }
          })
        }
      },
			storeDateData(picker, values){
        for (let item of values) {
          if (item != undefined) {
            let resultStr = String(values[0]) + String(values[1]);
            let chooShowDate = resultStr.split('年').join('-')
            let resultDayStr = ''
            try {
              resultDayStr = String(values[0]).split('年').join('-') + String(values[1]).split('月').join('-') + values[2].split('日')[0];
            } catch (e) {
            }

            if (this.timeParams == 'start') {
              this.startDateShow = resultDayStr;
              this.startDateParam = resultDayStr;
            } else if (this.timeParams == 'end') {
              this.endDateShow = resultDayStr;
              this.endDateParam = resultDayStr;
            }
          }
        }
      },
      //选择器自定义内容
      pickerContent(){
        let initMonth = 0, initYear = 0;
        this.dailySlots[0].values = ['2017年', '2018年', '2019年', '2020年'];
        selectorDailyContent(this.dailySlots, '月', 12, '日')
        this.dailySlots[1].defaultIndex = getIndex(this.dailySlots[1].values, this.Month + '月')
        this.dailySlots[0].defaultIndex = getIndex(this.dailySlots[0].values, this.fullYear + '年')
        this.dailySlots[2].defaultIndex = getIndex(this.dailySlots[2].values, this.day + '日')
      },

      //查询
      submitCheck(){

      }
    },
    mounted() {
      let Nowdate = new Date();
      this.pickerVisibleend = Nowdate;
      this.pickerVisiblestart = Nowdate;
      let StartTime = this.format(Nowdate, 'start');
      this.startTime = StartTime;
      // this.NowTime = StartTime.split(" ")[0];
      this.startDateShow = StartTime.split(" ")[0];
      this.startDateParam = StartTime.split(" ")[0];
      let enddate = new Date(Nowdate.getTime() + 24 * 60 * 60 * 1000);
      let EndTime = this.format(enddate, 'start');
      this.endTime = EndTime;
      // this.checkendTime = StartTime.split(" ")[0];
      this.endDateShow = EndTime.split(" ")[0];
      this.endDateParam = EndTime.split(" ")[0];
      let height = window.innerHeight;
      document.addEventListener(eventBus.BACK_BUTTON, this.backToHome, false);
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToHome, false);
    }
  }
</script>

<style lang="less" scoped>
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    background-color: #2196f3;
    z-index: 76;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }

  .contant-sta {
    top: 278px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 56px;
    overflow: auto;
    overflow-y: scroll;
  }
  .content-border{
    border-top: 1px solid #ccc;
  }
  .ma10 .li-list {
    padding-left: 10px
  }

  .wid50 {
    width: 70%
  }

  .miimgs {
    width: 28px;
    height: 30px;
    margin: 0 auto;

  img {
    width: 100%;
  }

  }

  .time {
    display: flex;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding-top: 26px;
    width: 100%;
    margin-bottom: 5px;

  input {
    font-size: 20px;
    color: #767985;
    outline: none;
    background: #fff;
    border: none;
  }

  }

  /*.time .mu-text-field-hint {*/
    /*left: 10px*/
  /*}*/

  /*.time .mu-text-field {*/
    /*min-height: auto;*/
    /*margin-bottom: -10px;*/
  /*}*/

  /*.time .mu-text-field-input {*/
    /*text-align: center*/
  /*}*/

  .letime input {
    text-align: right;
    width: 100%;
  }

  .letime, .ritime {
    width: 32%;
  }

  .top-cen {
    position: fixed;
    left: 0;
    right: 0;
    top: 56px;
    box-sizing: border-box;
    background: #fff;
  }

  .font14 {
    font-size: 15px
  }

  .timeselect {
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
    color: #fff;
    height: 36px;
    border-radius: 30px;
    line-height: 36px;
    font-size: 16px;
    width: 70%;
    background: #4baaf4;
    box-shadow: 0 8px 14px 0 #c9e1f3
  }

  .street-sel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding: 12px 0;
    margin: 0 auto 20px;
    border-top: 1px solid #EDF0F9;
    border-bottom: 1px solid #EDF0F9;
  }

  .get-week {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .get-week span {
    display: inline-block;
    width: 35px;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
    border: 1px solid #4BAAF4;
    font-size: 14px;
    color: #4BAAF4;
    text-align: center;
  }

  .street-sel span {
    font-size: 16px;
    color: #767985;
  }

  .sel-tit {
    width:22%;
    flex-grow: 1;
  }

  .sel-img {
    width: 10px;
  }
  .sel-rig{
    width:80%;
    flex-grow: 1;
    text-align:right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #draw {
    width: 100%;
    z-index: 80;
  }

  .street-hub {
    position: fixed;
    left: 0;
    right: 0;
    top: 56px;
    bottom: 0px;
    overflow-y: auto;
  }

  .street-list {
    width: 90%;
    padding: 10px 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ECEFF9;
  }

  .street-list span {
    font-size: 16px;
    color: #5A5E6F;
  }

  .street-list img {
    width: 22.5px;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .street-list .sel-l {
    color: #4BAAF4;
  }

  /*.doned {*/
  /*font-size: 14px;*/
  /*margin-right: 18px;*/
  /*}*/

  /*.donel {*/
  /*margin-left: 15px;*/
  /*}*/

  .street-sel-img {
    width: 16px;
    margin-right: 5px;
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

