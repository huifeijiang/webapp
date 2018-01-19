<template>
  <div class="wrap">
    <div class="portal-head headportal">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">{{titletsklist}}</span>
      <div class="hctaskhead">
        <span>企业名称</span>
        <span>状态</span>
      </div>
    </div>
    <div class="hctask" ref='hctask'>
      <div class="hctaskbody">
        <div class="tablecell" v-for="(item,index) in taskData" @click='showtaskform(item)'>
          <span>{{index+1+'.'+item.enterpriseName}}</span>
          <mu-raised-button
            :label="item.missionStatusName"
            class="demo-raised-button"
            primary
            @click='openperive=true'/>
        </div>
      </div>
      <!--<div class="hctaskbody">-->
      <!--<div class="tablecell" v-for='(item,index) in taskData' :key='index' @click='showtaskform(item)'>-->
      <!--<span>{{index+1+'.'+item.enterpriseName}}</span>-->
      <!--<mu-raised-button-->
      <!--:label="item.missionStatusName"-->
      <!--class="demo-raised-button"-->
      <!--primary-->
      <!--@click='openperive=true'/>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText='加载中...'/>
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

  .portal-head {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
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

  .hctask {
    height: 100%;
    overflow: auto;
    padding-top: 95px;
    -webkit-overflow-scrolling: touch;
  }

  .hctaskhead {
    position: fixed;
    top: 56px;
    z-index: 300;
    width: 100%;
    height: 40px;
    display: flex;
    padding: 0 35px 0 18px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    color: #5A5E6F;
  }

  .hctaskhead span {
    display: inline-block;
  }

  .hctaskbody {
    padding-bottom: 0px;
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

  .alert-left {
    position: absolute;
    left: 0px;
    margin-left: 15px;
  }

  .alert-title {
    font-size: 20px;
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
  export default {
    data() {
      return {
        taskData: [],
        nowDate: dateTool.toDate(new Date(), 'yyyy-MM-dd'),
        userId: this.getUserId(),
        titletsklist: '',
        url: '',
        paramItem: {
          date: '',
          userId: '',
          missionStatus: 0,
          size: 20,
          page: 0,
        },
        loading: false,
        scroller: null
      }
    },
    mounted(){
      this.scroller = this.$refs['hctask'];
      let title = this.$route.params.title;
      this.titletsklist = title;
      if (title == '每日一巡') {
        this.url = GET_HC_STATISTIC;
        this.getHcTask(GET_HC_STATISTIC);
      }
      ;
      if (title == '每周一巡') {
        this.url = GET_WEEK_TASKLIST;
        this.getHcTask(GET_WEEK_TASKLIST)
      }
      ;
      if (title == '每月一巡') {
        this.url = GET_MONTH_TASKLIST;
        this.getHcTask(GET_MONTH_TASKLIST)
      }
      ;
      if (title == '每季一巡') {
        this.url = GET_YEAR_TASKLIST;
        this.getHcTask(GET_YEAR_TASKLIST)
      }
      ;
    },
    methods: {
      ...mapGetters({
        getUserId: 'getUserId',
      }),
      getHcTask(url) {
        this.$refs['hctask'].scrollTop = 0;
        this.paramItem.date = this.nowDate;
        this.paramItem.userId = this.userId
        this.$http.get(url, {params:this.paramItem}).then(res => {
          if (res.body.code == 200) {
            let data = res.body.data.content;
            data.forEach((val, index) => {
              val.title = this.titletsklist
            })
            this.taskData = res.body.data.content;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      backToMap() {
        if (this.titletsklist == '每日一巡') this.$router.push({name: 'hcStatistic', params: {row: 'one'}})
        if (this.titletsklist == '每周一巡') this.$router.push({name: 'hcStatistic', params: {row: 'two'}})
        if (this.titletsklist == '每月一巡') this.$router.push({name: 'hcStatistic', params: {row: 'thr'}})
        if (this.titletsklist == '每季一巡') this.$router.push({name: 'hcStatistic', params: {row: 'fou'}})

      },
      showtaskform(item) {
        if (item.title == '每日一巡') {
          this.$router.push({name: 'meiriyixunForm', params: item})
        }
        else if (item.title == '每周一巡') {
          this.$router.push({name: 'meizhouForm', params: item})
        }
        else if (item.title == '每月一巡') {
          this.$router.push({name: 'xiaofeishuiForm', params: item})
        }
        else if (item.title == '每季一巡') {
          this.$router.push({name: 'meijiForm', params: item})
        }
      },
      loadMore () {
        this.loading = true;
        this.paramItem.date = this.nowDate;
        this.paramItem.userId = this.userId;
        this.paramItem.page += 1;
        this.$http.get(this.url, {params:this.paramItem}).then(res => {
          if (res.body.code == 200) {
            this.loading = false
            let data = res.body.data.content;
            if (res.body.data.last && data.length == 0) {
              this.loading = false;
              return;
            }
            for (let i in data) {
              data[i].title = this.titletsklist
              this.taskData.push(data[i]);
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>
