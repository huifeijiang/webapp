<template>
  <mu-drawer class="step-alert fix-move" right :open="open">
    <div class="portal-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">现场检查记录表</span>
      <span></span>
    </div>
    <div class="range-wrap" ref="rangewrap">
      <div class="table-list" v-for="item in dataTemps">
        <span class="biao-left">{{item.name}}</span>
        <span class="biao-right">{{item.value}}</span>
      </div>
    </div>
    <div>
      <p class="done-p">处理详情</p>
      <div class="done-mess">
        <p>处理: <span>{{doneMess.handler}}</span></p>
        <p>时间: <span>{{new Date(doneMess.handleTime).toLocaleDateString()}}</span></p>
        <p>地点: <span>{{doneMess.gridname}}</span></p>
        <p>处理情况: <span>{{doneMess.means}}</span></p>
        <p>描述: <span>{{doneMess.handleDescribe}}</span></p>
      </div>
      <p class="done-p" v-show="doneMess.images == []?false:true">处理图片详情</p>
      <div class="done-img" v-for="item in doneMess.images">
        <img :src="item">
      </div>
    </div>
  </mu-drawer>
</template>

<script>
  import {
    eventBus
  } from '../eventBus/eventBus';
  export default {
    data(){
      return {
        doneMess: {},
        dataTemps: [],
      }
    },
    mounted(){
      eventBus.bus.on('zfdetail', val => {
        this.doneMess = val.doneMesses
        this.dataTemps = val.dataTemp
      })
    },
    props: ['open'],
    watch: {
      dataTemps(val){
        this.dataTemps = val;
      },
      doneMess(val){
        this.doneMess = val;
      }
    },
    methods: {
      backToMap(){
        this.$emit("closezdDetails");
      },
    },
  }
</script>

<style scoped>
  .fix-move {
    height: 718px;
  }

  .step-alert {
    width: 100%;
    z-index: 210;
    padding-top: 56px;
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


  .range-wrap {
    padding: 0 5px;
    margin-bottom: 24px;
  }

  .table-list {
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
  }

  .table-list span {
    font-size: 14px;
    color: #6a6e7b;
  }

  .biao-left {
    width: 49%;
    text-align: left;
  }

  .biao-right {
    width: 49%;
    text-align: right;
  }

  .done-p {
    margin: 0 auto;
    padding: 5px;
    text-indent: 20px;
    font-size: 16px;
    font-weight: 400;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #ccc;
    background-color: #efefef;
  }

  .done-mess {
    padding: 0 20px;
  }

  .done-mess p {
    margin-top: 7px;
  }

  .done-img {
    width: 90%;
    margin: 10px auto;
    border-radius: 5px;
    overflow: hidden;
  }

  .done-img img {
    display: block;
    width: 100%;
  }
</style>
