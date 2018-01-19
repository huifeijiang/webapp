<template>
  <mu-drawer class="step-alert" right :open="open">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">事件详情</span>
      <span class="alert-right">提交</span>
    </div>
    <div class='event-detail-container'>
      <div class="nothin"></div>
      <div class="step-content">
        <div class="user-list">
          <span>单位名称</span>
          <span>{{this.dataTemp.enterpriseName}}</span>
        </div>
        <div class="user-list">
          <span>单位地址</span>
          <span>{{this.dataTemp.enterpriseAddr}}</span>
        </div>
        <div class="user-list">
          <span>单位是否存在</span>
          <span>{{this.dataTemp.exist?'是':'否'}}</span>
        </div>
        <div class="user-list">
          <span>企业联系人</span>
          <span>{{this.dataTemp.enterpriseContactsName}}</span>
        </div>
        <div class="user-list">
          <span>企业联系人电话</span>
          <span>{{this.dataTemp.enterpriseContactsTel}}</span>
        </div>
        <div class="user-list">
          <span>法人代表</span>
          <span>{{this.dataTemp.legalPersonName}}</span>
        </div>
        <div class="user-list">
          <span>基本灶头数量</span>
          <span>{{this.dataTemp.rangCount}}</span>
        </div>
        <div class="user-list">
          <span>是否属于6灶台及以上</span>
          <span>{{this.dataTemp.sixRangCount?'是':'否'}}</span>
        </div>
        <div class="user-list" v-if='this.dataTemp.sixRangCount'>
          <span>在线监测系统</span>
          <span>{{this.dataTemp.monitorOnline?'有':'无'}}</span>
        </div>
        <div class="user-list">
          <span>油烟净化设施</span>
          <span>{{this.dataTemp.cleanFacilityStatus}}</span>
        </div>
        <div class="user-list">
          <span>油烟监测</span>
          <span>{{lam}}</span>
        </div>
        <div class="user-list" >
          <span>环保审批或备案</span>
          <span>{{this.dataTemp.approvalNo}}</span>
        </div>
        <!-- <div class="user-list" v-if='this.dataTemp.haveApproval'>
          <span>环保批文号</span>
           <span>{{this.dataTemp.approvalNo}}</span>
        </div> -->
        <div class="user-list" >
          <span>燃料类型</span>
          <span>{{this.dataTemp.fuleTypeName}}</span>
        </div>
        <div class="user-list" >
          <span>排气口方式</span>
          <span>{{this.dataTemp.exhaustWayName}}</span>
        </div>
        <div class="user-list" >
          <span>油烟净化设施维护频次</span>
          <span>{{this.dataTemp.mainFreqName}}</span>
        </div>
        <div class="user-list" >
          <span>情况说明</span>
          <span>{{this.dataTemp.describe}}</span>
        </div>
        <div class="user-list" >
          <span>巡查社区</span>
          <span>{{this.dataTemp.gridName}}</span>
        </div>
        <div class="user-list" >
          <span>巡查人员</span>
          <span>{{this.dataTemp.reporterName}}</span>
        </div>
        <div class="user-list" >
          <span>执法等级</span>
          <span>{{this.dataTemp.level}}</span>
        </div>
        <div class="user-list" >
          <span>巡查时间</span>
          <span>{{new Date(this.dataTemp.updated).toLocaleString('chinese',{hour12:false})}}
              </span>
        </div>

      </div>
    </div>
  </mu-drawer>
</template>
<script type='es6'>
  import headDom from '../../UIcomponents/header/head';
  export default {
    components: {
      headDom
    },
    data(){
      return {}
    },
    mounted(){
      this.change();
    },
    computed:{
      lam:function(){
        return  this.dataTemp.lampblackCon?`${this.dataTemp.lampblackCon}m³`:''

      }
    },
    methods: {
      backToMap(){
        this.$parent.open = false
      },
      change(){
        let way=this.dataTemp.exhaustWayName;
        switch(way){
          case 0:
            '其他';
            break;
          case 1:
            '下水道';
            break;
          case 2:
            '高空排放';
            break;
          case 3:
            '低空排放';
            break;
          case 4:
            '公共烟道';
            break;
        }
      },
    },
    props:['open','dataTemp']
  }
</script>
<style scoped>
  .step-alert{
    width: 100%;
    z-index: 999;
  }
  .alert-head{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    background: linear-gradient(left,#30aafd, #2eccfc);
    background: -webkit-linear-gradient(left,#30aafd, #2eccfc);
    background: -moz-linear-gradient(left,#30aafd, #2eccfc);
    background: -o-linear-gradient(left,#30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  }
  .alert-left{
    position:absolute;
    left:15px;
  }
  .alert-right{
    visibility:hidden;
  }
  .event-detail-container{
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 55px;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .step-content{
    width: 100%;
    padding:0 10px;
  }
  .user-list {
    display: flex;
    width: 100%;
    margin: 0 auto;
    color: #6a6e7b;
    font-size: 14px;
    height: 45px;
    border-bottom: 1px solid #efefef;
    align-items: center;
    justify-content: space-between;
  }
  .nothin{
    height: 1px;
  }
</style>
