<template>
  <div class='tablecell'>
    <p class='table-head' @click='isActive(statisticData)'>
      <span>{{title}}</span>
      <span v-show='title == "每日一巡"'>{{time}}</span>
      <span v-show='title == "每周一巡"'>第{{time}}周</span>
      <span v-show='title == "每月一巡"'>第{{time}}月</span>
      <span v-show='title == "每季一巡"'>第{{time}}季</span>
    </p>
    <div class="table-body" v-show='statisticData.isshow || openTwice'>
      <table border="1" cellspacing="0" cellpadding='0'>
        <tbody>
        <tr>
          <td>总数</td>
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
      <div class="btns">
        <mu-raised-button label="进入今日任务" class="demo-raised-button" primary @click='opentask(statisticData)'/>
        <mu-raised-button label="查看历史记录" class="demo-raised-button" primary @click='openhistory'/>
      </div>
    </div>
    <hchistory :openhh='openhistorylist' @closehistory='openhistorylist=false' :titlehislist='title'></hchistory>
  </div>
</template>
<style scoped>
  .btns {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .table-head {
    border-bottom: 1px solid #acb0bf;
    height: 40px;
    padding: 0 8px;
    font-weight: 700;
    background-color: #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    color: #5A5E6F;
  }

  .demo-raised-button {
    margin-bottom: 10px;
  }

  .table-body table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-bottom: 15px;
    border:1px solid #acb0bf;
  }

  .table-body table td {
    padding-top: 5px;
    padding-bottom: 6px;
    width: 50%;
    color: #5A5E6F;
  }


</style>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import {dateTool} from '../../../gisComponets/tool/DateTool.js';
  import {eventBus} from '../../eventBus/eventBus';
  import hchistory from '../hcHistory.vue'
  export default{
    data(){
      return {
        nowtime: dateTool.toDate(new Date(), 'yyyy-MM-dd'),
        statisticData: {
          date: ""
        },
        userId: this.getUserId(),
        openhistorylist: false,
        openTwice:false
      }
    },
    components: {
      hchistory,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      getDatas: {
        type: String,
        default: ''
      },
      open: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      time: {
        get:function(){
          if (this.title == "每季一巡") {
            return this.statisticData ? this.statisticData.date.substring(6) : '';
          } else if (this.title == "每周一巡") {
            return this.statisticData ? this.statisticData.date.substring(5) : '';
          } else if (this.title == "每月一巡") {
            return this.statisticData ? this.statisticData.date.substring(6) : '';
          } else {
            return this.statisticData ? this.statisticData.date : '';
          }
        },
        set:function(){}
      },
    },
    watch:{
        open(val){
            this.openTwice = val;
        },
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      ...mapGetters({
        getUserId: 'getUserId',
      }),
      getHcStatistic(url){
        this.$http.get(url, {params: {date: this.nowtime, checkerId: this.userId, missionStatus: 1}}).then(res => {
          if (res.body.code == 200) {
            let data = res.body.data[0];
            data.isshow = false;
            data.title = this.title;
            if (data.total == 0 || isNaN(data.total)) {
              data.percent = '0.0%'
            } else {
              let point = data.doPatrol / data.total;
              data.percent = Number(point * 100).toFixed(1) + '%';
            }
            this.statisticData = data;

          }
        }).catch(err => {})
      },
      isActive(sta){
//        sta.isshow = !sta.isshow;
        this.openTwice = !this.openTwice;
      },
      backToMap() {
        if (this.openperive) {
          this.openperive = false
        } else if (this.openhistorylist) {
          this.openhistorylist = false
        } else {
          this.setMapShow(true);
          this.$router.push("/home/portal");
        }
      },
      openhistory(){
        this.openhistorylist = true
      },
      opentask(item){
        if(this.title == '每日一巡') {
          this.$router.push('/home/dailyEventList');
        }else {
          this.$router.push({name: 'dailytask', params: item})
        }
      },
    },
    destroyed() {
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    mounted(){
        if(this.open){
          this.openTwice = true;
        }
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
      this.getHcStatistic(this.getDatas)
    },
  }
</script>
