<template>
  <mt-popup class='otherPicker' v-model="openVisible" position="bottom">
    <div class='pop-div'>
      <span class='pop-le' @click='openVisible=false'>取消</span>
      <span class='pop-le' @click='confirmPicker'>确定</span>
    </div>
    <mt-picker ref='picker' :slots='slots' @change='onChange'></mt-picker>
  </mt-popup>
</template>
<script>
  import {
    getIndex,
    selectorDailyContent,
    selectorContent,
    getYearWeek,
    getQuater
  } from './timeHelper'
  import { dateTool } from '../../gisComponets/tool/DateTool'

  export default{
    data(){
      const fullYear = new Date().getFullYear()
      const Month = new Date().getMonth() + 1
      const day = dateTool.toDate(new Date(), 'yyyy-MM-dd').split('-')[2]
      return {
        fullYear,
        Month,
        day,
        value: '',
        openVisible: false
      }
    },
    props: {
      open: {
        type: Boolean,
        default: false
      },
      /*默认日期2017-01-01*/
      defaultDate: {
        type: String,
        default: 'date'
      },
      /*选择器内容*/
      slots: {
        type: Array,
        default: function () {
          return []
        },
      },
      /*选择器左侧的年份*/
      yearRange: {
        type: Object,
        default: function () {
        },
      },
      /*单位可以为''或者加年月日*/
      unit: {
        type: Object,
        default: function () {
        },
      },
    },
    watch: {
      open(val){
        this.openVisible = val
        if (this.slots.length > 2) {
          selectorDailyContent(this.slots, this.yearRange, this.unit)
        } else {
          selectorContent(this.slots, this.yearRange, this.unit)
        }
        this.setDefaultDate();
      },
      openVisible(val){
        if (!val) {
          this.$emit("cancel")
        }
      }
    },
    methods: {
      confirmPicker(){
        this.$emit('confirm', this.value)
      },
      setDefaultDate(){
        let defaultYear = this.defaultDate.split('-')[0]
        let defaultMonth = this.defaultDate.split('-')[1]
        let defaultDay = this.defaultDate.split('-')[2]
        this.slots[0].defaultIndex = getIndex(this.slots[0].values, defaultYear + this.unit.unitLeft)
        if (this.slots.length > 2) {
          this.slots[1].defaultIndex = getIndex(this.slots[1].values, defaultMonth + this.unit.unitCenter);
          this.slots[2].defaultIndex = getIndex(this.slots[2].values, defaultDay + this.unit.unitRight);
        } else {
          let str = ''
          if (this.unit.length == 4) {
            str = this.defaultDate.split('Q')[0].join('')+ this.unit.unitRight
          } else {
            str = this.defaultDate.split('-')[1] + this.unit.unitRight
          }
          this.slots[1].defaultIndex = getIndex(this.slots[1].values, str);
        }
      },
      onChange(picker, values){
        for (let val of values) {
          if (val != undefined) {
            let resultStr = values.join('')
            this.value = resultStr
          }
        }
      }
    },
    mounted(){
      if (this.open) {
        this.openVisible = true
      }
    },
  }
</script>
<style scoped lang='less' rel='stylesheet/less'>
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
