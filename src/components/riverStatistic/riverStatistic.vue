<template>
    <div class="riverstatistic">
        <div class="portal-head">
            <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
            <span class="alert-title">日常巡查统计</span>
            <span></span>
        </div>
        <div class="riverstatisticbody">
           <RiverStatisticComponet :title="'每日一巡'" :getAllStreetService="riService.getAllStreetService"
                                   :getDailyStatisticService="riService.getDailyStatisticService"
                                   :getHcHistroyService="riService.getHcHistroyService"
                                   :getHcStatisticService="riService.getHcStatisticService"
                                   :getHczListService="riService.getHczListService"
           ></RiverStatisticComponet>
          <RiverStatisticComponet :title="'每周一巡'" :getAllStreetService="riServiceweek.getAllStreetService"
                                  :getDailyStatisticService="riServiceweek.getDailyStatisticService"
                                  :getHcHistroyService="riServiceweek.getHcHistroyService"
                                  :getHcStatisticService="riServiceweek.getHcStatisticService"
                                  :getHczListService="riServiceweek.getHczListService"
          ></RiverStatisticComponet>
          <RiverStatisticComponet :title="'每月一巡'" :getAllStreetService="riServicemonth.getAllStreetService"
                                  :getDailyStatisticService="riServicemonth.getDailyStatisticService"
                                  :getHcHistroyService="riServicemonth.getHcHistroyService"
                                  :getHcStatisticService="riServicemonth.getHcStatisticService"
                                  :getHczListService="riServicemonth.getHczListService"
          ></RiverStatisticComponet>
          <RiverStatisticComponet  :title="'每季一巡'" :getAllStreetService="riServiceyear.getAllStreetService"
                                   :getDailyStatisticService="riServiceyear.getDailyStatisticService"
                                   :getHcHistroyService="riServiceyear.getHcHistroyService"
                                   :getHcStatisticService="riServiceyear.getHcStatisticService"
                                   :getHczListService="riServiceyear.getHczListService"
          ></RiverStatisticComponet>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import {dateTool} from '../../gisComponets/tool/DateTool.js';
    import {eventBus} from '../eventBus/eventBus';
    import RiverStatisticComponet from  './componet/RiverStatisticComponet.vue';
    export default{
        data(){
            return {
               riService:{
                 //获取所有街道
                   getAllStreetService:GET_ALL_STREET,
                 //获取执法统计
                   getDailyStatisticService:GET_ZF_HISTORY,
                 //巡查和执法列表
                   getHcHistroyService:  GET_HC_HISTORY,
                 //巡查详情列表
                   getHcStatisticService :GET_HC_STATISTIC,
                 //执法详情列表
                   getHczListService :GET_HCZ_LIST
               },
                riServiceweek:{
                  // todo 每周一巡的统计接口
                    getAllStreetService:GET_ALL_STREET,
                    getDailyStatisticService:GET_WEEK_ALL,
                    //巡查和执法列表
                    getHcHistroyService:  GET_WEEK_HISTORY,
                    //巡查详情列表
                    getHcStatisticService :GET_WEEK_TASKLIST,
                    //执法详情列表
                    getHczListService :GET_WEEK_ZFLIST

                },
                riServicemonth:{
                    getAllStreetService:GET_ALL_STREET,
                    getDailyStatisticService:GET_MONTH_ALL,
                    //巡查和执法列表
                    getHcHistroyService:  GET_MONTH_HISTORY,
                    //巡查详情列表
                    getHcStatisticService :GET_MONTH_TASKLIST,
                    //执法详情列表
                    getHczListService :GET_MONTH_ZFLIST

                },
                riServiceyear:{
                  // todo 每季一巡的统计接口
                    getAllStreetService:GET_ALL_STREET,
                    getDailyStatisticService:GET_YEAR_ALL,
                    //巡查和执法列表
                    getHcHistroyService:  GET_YEAR_HISTORY,
                    //巡查详情列表
                    getHcStatisticService :GET_YEAR_TASKLIST,
                    //执法详情列表
                    getHczListService :GET_YEAR_ZFLIST

                }
            }
        },
        components: {
          RiverStatisticComponet
        },
        methods: {
          ...mapActions({
            setMapShow: 'setMapShow',
          }),
            backToMap() {
                this.setMapShow(false);
               this.$router.push("/home/eventGate");

            },
        },
        mounted(){
            eventBus.bus.addListener(eventBus.BACK_BUTTON, this.backToMap, false);
        },
        destroyed() {
            document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
        },
    }
</script>
<style lang="less" scoped>
  @import  './riverStatistic.less';
</style>
