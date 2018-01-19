<template>
    <div class="wrap">
        <div class="portal-head">
            <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
            <span class="alert-title">日常任务</span>
            <span></span>
        </div>
        <div class="hcstatisticbody">
            <HcStatisticComponet title="每日一巡" :getDatas='dailyService.getDailyDataService' :open="one"></HcStatisticComponet>
            <HcStatisticComponet title="每周一巡" :getDatas='weekService.getWeekDataService' :open="two"></HcStatisticComponet>
            <HcStatisticComponet title="每月一巡" :getDatas="monthService.getMonthDataService" :open="thr"></HcStatisticComponet>
            <HcStatisticComponet title="每季一巡" :getDatas="yearService.getYearDataService" :open="fou"></HcStatisticComponet>
        </div>
    </div>
</template>
<style scoped>
  .wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 80;
    background-color: #fff;
  }

  .hcstatisticbody {
    padding-top: 55px;
    height: 100%;
    overflow: auto;
  }

  .table-body table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-bottom: 15px;
  }

  .table-body table td {
    padding-top: 5px;
    padding-bottom: 6px;
    width: 50%;
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

  .alert-title {
    font-size: 20px;
  }

</style>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  import HcStatisticComponet from './component/HcStatisticComponent.vue';
  export default{
    data(){
      return {
        dailyService: {
          getDailyDataService: GET_DAILY_STATISTIC,//每日的统计
        },
        weekService: {
          getWeekDataService: GET_WEEK_STATISTIC,//每周的统计
        },
        monthService: {
          getMonthDataService: GET_MONTH_STATISTIC,//每月的统计
        },
        yearService: {
          getYearDataService: GET_YEAR_STATISTIC,//每季的统计
        },
        one: false,
        two: false,
        thr: false,
        fou: false
    }
   },
      components:{
          HcStatisticComponet
      },
      methods:{
          ...mapActions({
              setMapShow: 'setMapShow',
          }),
          backToMap() {
              this.setMapShow(true);
              this.$router.push({name:'home',params:{name:true}});
          },
      },
      mounted(){
          eventBus.bus.addListener(eventBus.BACK_BUTTON, this.backToMap, false);
          let openRow = this.$route.params.row;
          if(openRow) {
            this[openRow] = true;
          }
      },
      destroyed() {
          document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
      }
  }
</script>
