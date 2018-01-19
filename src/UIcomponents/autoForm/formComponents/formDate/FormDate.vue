<template>
  <div v-show="item.isShow">
    <div @click="openPicker" class='form-list'>
      <span class="flex-grow"><i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</span>
      <span class="text-right">{{item.modalCValue}}</span>
      <i class="mu-icon material-icons">chevron_right</i>
    </div>
    <mt-popup class='otherPicker' v-model="popupVisible" position="bottom">
      <div class='pop-div'>
        <span class='pop-le' @click='popupVisible=false'>取消</span>
        <span class='pop-le' @click='getOtherList'>确定</span>
      </div>
      <mt-picker :slots='dailySlots' @change='storeDateData'></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import {
    dateTool
  } from '../../../../gisComponets//tool/DateTool.js';
  import {
    eventBus
  } from '../../../../components/eventBus/eventBus';
  import {
    formItemShowTool
  } from '../../tool/FormItemShowTool';
  import {
    getIndex,
    selectorDailyContent,
  } from '../../../mtDatePicker/timeHelper'

  export default {
    components: {},
    data() {
      const fullYear = new Date().getFullYear()
      const Month = new Date().getMonth() + 1
      const day = dateTool.toDate(new Date(), 'yyyy-MM-dd').split('-')[2]
      return {
        Month,
        day,
        fullYear,
        popupVisible: false,
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
    props: {
      item: {
        type: Object,
        default: function () {
          return {
            formType: 'formDate',
            label: '',
            modalValue: '',
            isRequire: ''

          }
        }
      },
    },
    methods: {
      //选择器自定义内容
      pickerContent(){
        const yearRange = {
          minLeft: 1970,
          maxLeft: 2020,
        }
        const unit = {
          unitLeft: '年',
          unitCenter: '月',
          unitRight: '日'
        }
        selectorDailyContent(this.dailySlots, yearRange, unit)
        if (this.item.modalValue && this.item.modalCValue) {
          let str = dateTool.toDate(new Date(this.item.modalValue),'yyyy-MM-dd');
          const fillYear = str.split('-')[0] + '年';
          const fillMonth = str.split('-')[1] + '月';
          const fillDay = str.split('-')[2] + '日';
          this.dailySlots[1].defaultIndex = getIndex(this.dailySlots[1].values, fillMonth)
          this.dailySlots[0].defaultIndex = getIndex(this.dailySlots[0].values, fillYear)
          this.dailySlots[2].defaultIndex = getIndex(this.dailySlots[2].values, fillDay)
        } else {
          this.dailySlots[1].defaultIndex = getIndex(this.dailySlots[1].values, this.Month + '月')
          this.dailySlots[0].defaultIndex = getIndex(this.dailySlots[0].values, this.fullYear + '年')
          this.dailySlots[2].defaultIndex = getIndex(this.dailySlots[2].values, this.day + '日')
        }
      },
      //展开四个巡时间选择
      openPicker() {
        this.popupVisible = true;
        this.pickerContent();
      },
      //处理选择器选定后的数据
      storeDateData(picker, values){
        for (let val of values) {
          if (val != undefined) {
            let resultDayStr = ''
            let reaultParamStr = ''
            try {
              resultDayStr = String(values[0]) + String(values[1]) + String(values[2]);
              reaultParamStr = resultDayStr.substr(0, 4) + '-' + resultDayStr.substr(5, 2) + '-' + resultDayStr.substr(8, 2)
            } catch (e) {
            }
            //显示用xxxx-xx-xx
            this.item.modalCValue = resultDayStr
            //提交给后台的时间戳
            this.item.modalValue = new Date(reaultParamStr).getTime()
          }
        }
      },
      getOtherList() {
        this.popupVisible = false;
      },
    },
    computed: {},
    mounted() {
      eventBus.bus.addListener(eventBus.AUTO_FORM_SHOW, (obj) => {
        if (formItemShowTool.isShowFormItem(this.item)) {
          this.item.isShow = true;
        } else {
          this.item.isShow = false;
        }
      })
    },
    destroyed() {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../autoForm.less";
</style>
