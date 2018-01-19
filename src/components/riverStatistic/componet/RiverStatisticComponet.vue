<template>
  <div>
    <div class='tablecell'>
      <p class='table-head colorset' @click='showactive'>
        <span>{{title}}</span>
        <span v-if='title == "每日一巡"'>{{statisticData.date}}</span>
        <span v-else-if='title == "每周一巡"'>第{{statisticData.date}}周</span>
        <span v-else-if='title == "每月一巡"'>第{{statisticData.date}}月</span>
        <span v-else='title == "每季一巡"'>第{{statisticData.date}}季</span>
      </p>
      <div class="table-body" :class='{active:isActive}'>
        <table border="1" cellspacing="0">
          <tbody>
          <tr class='tablehead'>
            <td>企业总数</td>
            <td>{{statisticData.total}}</td>
          </tr>
          <tr>
            <td>已巡查</td>
            <td>{{statisticData.doPatrol}}</td>
          </tr>
          <tr>
            <td>待巡查</td>
            <td>{{statisticData.notPatrol}}</td>
          </tr>
          <tr>
            <td>完成率</td>
            <td>{{statisticData.percent}}</td>
          </tr>
          </tbody>
        </table>
        <table border="1" cellspacing="0">
          <tbody>
          <tr class='tablehead'>
            <td>需执法总数</td>
            <td>{{zfStatistic.handledTotal}}</td>
          </tr>
          <tr>
            <td>已执法</td>
            <td>{{zfStatistic.finish}}</td>
          </tr>
          <tr>
            <td>待执法</td>
            <td>{{zfStatistic.pendding}}</td>
          </tr>
          <tr>
            <td>完成率</td>
            <td>{{zfStatistic.percent}}</td>
          </tr>
          </tbody>
        </table>
        <mu-raised-button label="查看历史记录" class="demo-raised-button" primary @click='openhistory(null)'/>
        <div class='tablecell' v-for='item in newallStreet'>
          <p class='table-head' @click='showactivetoo(item)'>
            <span>{{item.name}}</span>
            <!--<span>{{nowtime}}</span>-->
          </p>
          <div class="child-body" :class="{active:item.show}">
            <table border="1" cellspacing="0">
              <tbody>
              <tr class='tablehead'>
                <td>企业总数</td>
                <td>{{item.streetStatistic.total}}</td>
              </tr>
              <tr>
                <td>已巡查</td>
                <td>{{item.streetStatistic.doPatrol}}</td>
              </tr>
              <tr>
                <td>待巡查</td>
                <td>{{item.streetStatistic.notPatrol}}</td>
              </tr>
              <tr>
                <td>完成率</td>
                <td>{{item.streetStatistic.percent}}</td>
              </tr>
              </tbody>
            </table>
            <table border="1" cellspacing="0">
              <tbody>
              <tr class='tablehead'>
                <td>需执法总数</td>
                <td>{{item.streetzfStatistic.handledTotal}}</td>
              </tr>
              <tr>
                <td>已执法</td>
                <td>{{item.streetzfStatistic.finish}}</td>
              </tr>
              <tr>
                <td>待执法</td>
                <td>{{item.streetzfStatistic.pendding}}</td>
              </tr>
              <tr>
                <td>完成率</td>
                <td>{{item.streetzfStatistic.percent}}</td>
              </tr>
              </tbody>
            </table>
            <div class='btns'>
              <mu-raised-button label="查看历史记录" class="demo-raised-button" primary
                                @click='openhistory(item.id)'/>
              <mu-raised-button label="查看详情" class="demo-raised-button" primary
                                @click='opendetail(item.id)'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <riverHistory :open='openperive' :id='id' :title='title' @closeHistoryPage='openperive=false'></riverHistory>
    <streetdetaillist :openlist='openperivedetail'
                      :iddet='iddetail'
                      @clostList='openperivedetail = false'
                      :detailTitle = 'title'
                      :getHcHistroyService="getHcHistroyService"
                      :getHcStatisticService="getHcStatisticService"
                      :getHczListService="getHczListService"
    ></streetdetaillist>
  </div>

</template>

<script>

  import {mapGetters, mapActions, mapState} from 'vuex';
  import {dateTool} from '../../../gisComponets/tool/DateTool.js';
  import {eventBus} from '../../eventBus/eventBus';
  import riverHistory from '../riverHistory.vue';
  import streetdetaillist from '../streetDetailList.vue';

  export default {
    components: {
      riverHistory,
      streetdetaillist
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      getAllStreetService: {
        type: String,
        default: ''
      },
      getDailyStatisticService: {
        type: String,
        default: ''
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
    data(){
      return {
        openperive: false,
        openperivedetail: false,
        isActive: false,
        isActivetoo: false,
        id: null,
        iddetail: null,
        nowtime: dateTool.toDate(new Date(), 'yyyy-MM-dd'),
        statisticData: {},
        zfStatistic: {},
        allStreet: [],
        newallStreet: []
      }
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      //展开四个巡
      showactive(){
        if (this.isActive) {
          this.isActive = false;
          return;
        } else {
          this.isActive = true;
        }
      },
      //展开街道
      showactivetoo(item){
        if (item.show) {
          item.show = false;
          return
        } else {
          item.show = true;
          this.getRiverStatistic(item)
          this.getZfStatistic(item)
        }
      },
      //获取所有街道
      getAllStreet(){
        this.$http.get(this.getAllStreetService + '?size=200').then(res => {
          if (res.body.code == 200) {
            this.allStreet = res.body.data.content;
            for (let item of this.allStreet) {
              this.newallStreet.push(Object.assign({}, item,
                {
                  show: false,
                  streetStatistic: {
                    total: 0,
                    doPatrol: 0,
                    notPatrol: 0,
                    percent: 0
                  },
                  streetzfStatistic: {
                    handledTotal: 0,
                    finish: 0,
                    pendding: 0,
                    percent: 0
                  }
                }
              ))
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //获取所有的巡查统计
      getRiverStatistic(item){
        this.$http.get(this.getDailyStatisticService, {params: {date: this.nowtime, streetId: item.id}})
          .then(res => {
            if (res.body.code == 200) {
              let data = res.body.data[0];
              if (this.title == "每季一巡") {
                data.date = data.date.substring(6)
              } else if (this.title == "每周一巡") {
                data.date = data.date.substring(5)
              } else if (this.title == "每月一巡") {
                data.date = data.date.substring(5)
              }
              if (data.total == 0 || isNaN(data.total)) {
                data.percent = '0.0%'
              }
              else {
                let point = data.doPatrol / data.total;
                data.percent = Number(point * 100).toFixed(1) + '%';
              }
              if (item.id == '') {
                this.statisticData = data
              }
              else {
                item.streetStatistic = data;
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //获取所有的执法统计
      getZfStatistic(item){
        this.$http.get(this.getDailyStatisticService, {params: {date: this.nowtime, streetId: item.id}})
          .then(res => {
            if (res.body.code == 200) {
              let data = res.body.data[0];
              if (data.handledTotal == 0 || isNaN(data.handledTotal)) {
                data.percent = '0.0%'
              }
              else {
                let point = data.finish / data.handledTotal;
                data.percent = Number(point * 100).toFixed(1) + '%';
              }

              if (item.id == '') {
                this.zfStatistic = data
              }
              else {
                item.streetzfStatistic = data;
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //查看历史记录
      openhistory(id){
        this.openperive = true;
        this.id = id;
      },
      //查看今日详情
      opendetail(id){
        this.openperivedetail = true;
        this.iddetail = id;
      },
      //返回按钮
      backToMap() {
        if (this.openperive) {
          this.openperive = false;
        }
        else if (this.openperivedetail) {
          this.openperivedetail = false;
        }
        else {
          this.setMapShow(true);
          this.$router.push("/home");
        }
      },
    },
    mounted(){
      this.getAllStreet();
      this.getRiverStatistic({id: ''})
      this.getZfStatistic({id: ''})
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style lang="less" scoped>
  @import '../riverStatistic.less';
</style>
