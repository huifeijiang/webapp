<template>
  <mu-drawer class="step-alert fix-move" right :open="open">
    <div class="portal-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">现场检查记录表</span>
      <span></span>
    </div>
    <div class="table-list-wrap">
      <div class="table-list" v-for="item in tableDatas" v-show='item.show'>
        <span class="biao-left">{{item.name}}</span>
        <span class="biao-right">{{item.value}}</span>
      </div>
    </div>
  </mu-drawer>
</template>
<script>
  import {
    eventBus
  } from '../eventBus/eventBus';
  export default {
    data() {
      return {
        tableDatas: [],
      }
    },
    mounted(){
      eventBus.bus.on('xcdetail', val => {
        this.tableDatas = val;
      })
    },
    props: ['open'],
    watch: {
      tableDatas(val){
        this.tableDatas = val;
      }
    },
    methods: {
      backToMap() {
        this.$emit('closeDetails');
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
    z-index: 205;
    padding-top: 55px;
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

  .event-list span {
    width: 25%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }

  .table-list-wrap{
    width: 100%;
    position: fixed;
    top: 56px;
    bottom: 10px;
    overflow: auto;
  }

  .table-list {
    display: flex;
    width: 100%;
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
</style>
