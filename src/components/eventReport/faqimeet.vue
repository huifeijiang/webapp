<template>
  <div class="food_container">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">发起会议/巡河</span>
      <span class="alert-right" @click="showtip">提交</span>
    </div>
    <div class="faqicontnt">
      <div class="mianxc">
        主题：
        <div class="widt3">
          <mu-text-field hintText="请输入主题" fullWidth v-model="commitData.theme"/>
        </div>
        <br/>
        时间：
        <div class="widt3" @click="openPicker">
          <mu-text-field hintText="请输入时间" disabled fullWidth v-model="commitData.datetime"/>
        </div>
        <br/>
        地点：
        <div class="widt3">
          <mu-text-field hintText="请输入地点" fullWidth v-model="commitData.site"/>
        </div>
        <br/>
        人员：
        <div class="widt3">
          <mu-text-field hintText="请输入人员" fullWidth v-model="commitData.peopleRemark"/>
        </div>
        <br/>

        模式：
        <div class="sss f_clear">
          <mu-radio label="会议" name="group" nativeValue="1" v-model="commitData.type" class="demo-radio"/>
          <mu-radio label="巡河" name="group" nativeValue="2" v-model="commitData.type" class="demo-radio"/>
          <mu-radio label="会议/巡河" name="group" nativeValue="3" v-model="commitData.type" class="demo-radio"/>
          <div style="clear: both"></div>
        </div>
        <br/>
        <div class="mrt f_clear">
          <span class="sasssd">河流：</span>
          <div class="widt3" @click="openBottomSheet">
            <mu-text-field hintText="请选择会议/巡河的河流" disabled fullWidth v-model="showriver"/>
          </div>
        </div>
        <!-- <mt-datetime-picker class="mitt"
          v-model="pickerVisible"
          ref="picker"
          type="datetime"
          year-format="{value}年"
          month-format="{value}月"
          date-format="{value}日"
          hour-format="{value}时"
          minute-format="{value}分"
          :startDate="minDate"
          @confirm="handleConfirm"
        >
        </mt-datetime-picker> -->
        <mt-popup class='otherPicker' v-model="popupVisible" position="bottom">
          <div class='pop-div'>
            <span class='pop-le' @click='popupVisible=false'>取消</span>
            <span class='pop-le' @click='getOtherList'>确定</span>
          </div>
          <mt-picker :slots='dailySlots' @change='storeDateData'></mt-picker>
        </mt-popup>

        <!--展示河流-->
        <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
          <mu-list @itemClick="closeBottomSheet">
            <div class="titlee">
              <label>
                <input type="checkbox" v-model="checkAll"/>
                全选
              </label>
              <span class="centil">选择会议/巡河的河流</span>
            </div>
            <div class="itmells">
              <label v-for="item in list">
                <div class="item" >

                  <input type="checkbox" :value="item.id" v-model="checkArr" class="el_input"/>
                  <span class="item-title">{{item.name}}</span>

                </div>
              </label>
            </div>
          </mu-list>
        </mu-bottom-sheet>
        <!--end 展示河流-->
        <mu-dialog :open="confirem" title="提示">
          {{tips}}
          <mu-flat-button slot="actions" primary label="取消" @click="close"/>
          <mu-flat-button slot="actions" @click="commit" primary label="确定" />
        </mu-dialog>
      </div>

    </div>


  </div>
</template>

<script>
  import { dateTool } from '../../gisComponets/tool/DateTool.js';
  import {eventBus} from '../eventBus/eventBus';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {getIndex, selectorContent, getYearWeek, selectorDailyContent} from '../riverStatistic/timeHelper';

  export default {
    data() {
      const fullYear = new Date().getFullYear()
      const Month = new Date().getMonth() + 1
      const day = dateTool.toDate(new Date(), 'yyyy-MM-dd').split('-')[2]
      return {
        commitData: {
          theme: '',
          datetime: '',
          site: '',
          peopleRemark: '',
          type: '',
          riverIds: ''
        },
        fullYear,
        Month,
        day,
        tips:'请确定是否提交？',
        confirem:false,
        minDate: new Date('2018-01-01'),
        pickerVisible: '',
        popupVisible: false,
        list: [],
        checkAll: false,
        checkArr: [],
        bottomSheet: false,
        showriver:'',
        dailySlots: [{
          flex: 1,
          values: [],
          className: 'year',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'month',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'day',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'hour',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'minute',
          textAlign: 'center'
        }],
      }
    },

    components: {},
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      })
    },
    methods: {
      ...mapActions({
                setMapShow: 'setMapShow',
            }),
      showtip(){
        this.confirem = true
      },
      close(){
        this.tips = "请确定是否提交？";
        this.confirem = false
      },
      closeBottomSheet() {
        this.bottomSheet = false
      },
      openBottomSheet() {
        this.bottomSheet = true
      },
      handleConfirm() {
        let year = new Date(this.pickerVisible).getFullYear(); // 获取完整的年份(4位,1970-????)
        let Month =  new Date(this.pickerVisible).getMonth()+1 < 10 ? '0'+ (new Date(this.pickerVisible).getMonth()+1) :new Date(this.pickerVisible).getMonth()+1;
        let date =  new Date(this.pickerVisible).getDate() < 10 ? '0'+new Date(this.pickerVisible).getDate() :new Date(this.pickerVisible).getDate();
        let Hours =  new Date(this.pickerVisible).getHours()< 10 ? '0'+new Date(this.pickerVisible).getHours() :new Date(this.pickerVisible).getHours();
        let Minutes =  new Date(this.pickerVisible).getMinutes()< 10 ? '0'+new Date(this.pickerVisible).getMinutes() :new Date(this.pickerVisible).getMinutes();
        this.commitData.datetime = year+'-'+Month+'-'+date+' '+Hours+":"+Minutes+":00"

      },
      // openPicker() {
      //   this.$refs.picker.open();
      // },
      openPicker() {
        this.popupVisible = true;
        this.pickerContent();
      },
      //选择器自定义内容
      pickerContent(){
        let initMonth = 0, initYear = 0;
        this.dailySlots[0].values = ['2017年', '2018年', '2019年', '2020年'];
        selectorDailyContent(this.dailySlots, '月', 12, '日');
        this.initSlots(this.dailySlots, 'hour', 8, 24, '时');
        this.initSlots(this.dailySlots, 'minute', 0, 59, '分');
        console.dirxml(this.dailySlots);

        this.dailySlots[0].defaultIndex = getIndex(this.dailySlots[0].values, this.fullYear + '年')
        this.dailySlots[1].defaultIndex = getIndex(this.dailySlots[1].values, this.Month + '月')
        this.dailySlots[2].defaultIndex = getIndex(this.dailySlots[2].values, this.day + '日')
        this.dailySlots[3].defaultIndex = getIndex(this.dailySlots[3].values, 8 + '时')
        this.dailySlots[4].defaultIndex = getIndex(this.dailySlots[4].values, '00分')
      },

      initSlots(array, className, start, end, unit){
        let idx = this.getIndexByclassName(array, className) || 0;

        for (let i = start; i <= end; i++) {
          let flag = i;
          i < 10 ? (flag = '0' + i + unit) : (flag = i + unit);
          array[idx].values.push(flag);
        }
      },

      getIndexByclassName(array, className){
        let len = array.length;
        for(let i = 0; i < len; i++){
          if(array[i].className === className){
            return i;
          }
        }
      },

      //时间展示
      getOtherList() {
        this.popupVisible = false;
        // if (this.titlehislist == '每周一巡') {
        //   this.getHcTask(GET_WEEK_TASKLIST, 0, this.paramsDate);
        // } else if (this.titlehislist == '每季一巡') {
        //   this.getHcTask(GET_YEAR_TASKLIST, 0, this.paramsDate);
        // } else if (this.titlehislist == '每月一巡') {
        //   this.getHcTask(GET_MONTH_TASKLIST, 1, this.paramsDate);
        // }else if(this.titlehislist == '每日一巡'){
        //   this.getHcTask(GET_HC_STATISTIC, 2, this.paramsDate);
        // }
      },
      storeDateData(picker, values){
        for (let val of values) {
          if (val != undefined) {
            let resultStr = String(values[0]) + String(values[1]);
            let dayStr = String(values[0]) + String(values[1]) + String(values[2]);
            let resultDayStr = ''
            
            try{
              resultDayStr = dayStr.substr(0, 4) + '-' + dayStr.substr(5, 2) + '-' + dayStr.substr(8, 2) +' '+ String(values[3]).split('时')[0] + ':' + String(values[4]).split('分')[0] + ':00'
            }catch(e){}

            this.commitData.datetime = resultDayStr
          }
        }
      },

      backToMap() {
        this.setMapShow(true);
        this.$router.push("/home");
      },
      commit() {
        this.commitData.riverIds = this.checkArr
        console.log(this.commitData)

        this.$http.post(POST_XUNHE_MESSAGE,this.commitData).then( res => {
          if(res.body.code == 200){
            this.tips = "提交成功";
            this.confirem = false;
            this.$router.push("/home/meetindex");
          }
        }).catch((err) => {
          if(err.body.code ==400){
            this.tips = err.body.msg
          }
          console.log(err)
        });
      },
    },
    mounted() {
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
      //获取河流列表
      this.$http.get(GET_PROJECT_STATUS+'?size=100&userId='+this.getUserId).then(res => {
        if(res.body.code == 200){
          this.list = res.body.data.content
        }
      });
    },
    watch: {
      checkArr() {
        if (this.checkArr.length === this.list.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
        this.showriver = []
        for(let i =0;i<this.list.length;i++){
          for(let j = 0;j<this.checkArr.length;j++){
            if(this.list[i].id == this.checkArr[j]){
              this.showriver = this.showriver  +this.list[i].name + ',';

            }
          }
        }
        this.showriver = this.showriver.substr(0,this.showriver.length-1)
      },
      checkAll() {
        if (this.checkAll) {
          this.checkArr = this.list.map(item => {
            return item.id
          })
        } else {
          this.checkArr = []
        }
      }
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
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
    z-index: 81;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }
  .sss {
    display: flex;
    width: 80%;
    float: right;

  }
  .item-title{
    margin-left: -20px;
  }
  .mitt .picker-slot{
    font-size:16px;
  }
  .titlee {
    background: #ccc;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    position: relative;
  }
  .centil{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    text-align: center;
  }
  .mrt {
    margin-top: 10px;
  }

  .sasssd {
    float: left;
    margin-top: 18px;
    display: inline-block;
  }

  .faqicontnt {
    position: absolute;
    top: 56px;
    bottom: 0;
    background: #fff;
    z-index: 81;
    width: 100%;
    .mianxc {
      margin: 0 auto;
      margin: 10px 8%;
      .widt3 {
        width: 71%;
        display: inline-block;
        margin-left: 9%;
      }
    }
  }

  .item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #cecece;
    padding-left: 20px;
    text-align: center;

  }

  .itmells {
    height: 350px;
    overflow: auto;
  }

  .item:after {
    content: '';
    display: block;
    clear: both;
  }

  .el_input{
    margin-top: 11px;
    float: left;
    width: 15px;
    height: 15px;
  }

  .titlee input {
    margin-right: 10px;
    margin-top: 11px;
    float: left;
    width: 15px;
    height: 15px;
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
