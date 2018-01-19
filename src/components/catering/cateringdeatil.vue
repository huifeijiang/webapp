<template>
  <mu-drawer class="step-alert" right :open="open">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">餐饮事件详情</span>
      <span class="alert-right"></span>
    </div>
    <div class='event-detail-container'>
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
          <span>营业执照</span>
          <span>{{this.dataTemp.enterpriseLicense=='false'?'无':this.dataTemp.enterpriseLicense}}</span>
        </div>
        <div class="user-list">
          <span>法人代表</span>
          <span>{{this.dataTemp.legalPersonName}}</span>
        </div>
        <div class="user-list">
          <span>法人代表电话</span>
          <span>{{this.dataTemp.legalPersonTel}}</span>
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
          <span>环保手续</span>
          <span>{{this.dataTemp.approvalProcedureName}}</span>
        </div>
        <div class="user-list" v-show="this.dataTemp.approvalProcedure == 1">
          <span>环保批文号</span>
          <span>{{this.dataTemp.approvalNo}}</span>
        </div>
        <div class="user-list" v-show="this.dataTemp.approvalProcedure == 2">
          <span>登记备案号</span>
          <span>{{this.dataTemp.recordNo}}</span>
        </div>
        <div class="user-list">
          <span>排水许可证</span>
          <span>{{this.dataTemp.drainageLicense=='false'?'无':this.dataTemp.drainageLicense}}</span>
        </div>
        <div class="user-list">
          <span>基准灶头数</span>
          <span>{{this.dataTemp.rangCount}}个</span>
        </div>

        <div class="user-list">
          <span>在线监测系统</span>
          <span>{{dataTemp.monitorOnline?'已安装':'未安装'}}</span>
        </div>
        <div class="user-list">
          <span>油烟净化设施</span>
          <span>{{this.dataTemp.cleanFacilityStatus}}</span>
        </div>
        <div class="user-list">
          <span>油烟净化设施维护频次</span>
          <span>{{this.dataTemp.mainFreqName}}</span>
        </div>
        <div class="user-list">
          <span>油烟监测报告</span>
          <span>{{this.dataTemp.lampblackReport?'有':'无'}}</span>
        </div>
        <div v-show='dataTemp.lampblackReport'>
          <div class="user-list">
            <span>油烟浓度</span>
            <span>{{lam}}</span>
          </div>
          <div class="user-list">
            <span>检测时间</span>
            <span>{{monitorTime}}</span>
          </div>
        </div>
        <div class="user-list">
          <span>燃料类型</span>
          <span>{{this.dataTemp.fuleTypeName}}</span>
        </div>
        <div class="user-list">
          <span>建筑红线内分流情况</span>
          <span>{{this.dataTemp.shuntStatusName}}</span>
        </div>
        <div class="user-list">
          <span>排气口方式</span>
          <span>{{this.dataTemp.exhaustWayName}}</span>
        </div>
        <div class="user-list">
          <span>用水量</span>
          <span>{{useWater}}</span>
        </div>
        <div class="user-list">
          <span>建筑红线内分流情况</span>
          <span>{{this.dataTemp.shuntStatusName}}</span>
        </div>
        <div class="user-list">
          <span>周边管网建设情况</span>
          <span>{{this.dataTemp.pipeStatusName}}</span>
        </div>
        <div class="user-list" v-show='this.dataTemp.pipeStatus != "不清楚"'>
          <span>建筑红外线外污水接驳去向</span>
          <span>{{this.dataTemp.directionName}}</span>
        </div>
        <div class="user-list">
          <span>预处理设施</span>
          <span>{{this.dataTemp.haveFacilitie?'有':'无'}}</span>
        </div>
        <div v-show="dataTemp.haveFacilitie">
          <div class="user-list">
            <span>化粪池</span>
            <span>{{this.dataTemp.septicTank}}个</span>
          </div>
          <div class="user-list">
            <span>隔油池</span>
            <span>{{this.dataTemp.separationFacility}}个</span>
          </div>
        </div>
        <div class="user-list">
          <span>最终去向</span>
          <span>{{this.dataTemp.finalDestination}}</span>
        </div>
        <div class="user-list">
          <span>情况说明</span>
          <span>{{this.dataTemp.describe}}</span>
        </div>
        <div class="user-list">
          <span>附近河流</span>
          <span>{{riverName}}</span>
        </div>
        <div class="user-list">
          <span>巡查社区</span>
          <span>{{this.dataTemp.gridName}}</span>
        </div>
        <div class="user-list">
          <span>巡查人员</span>
          <span>{{this.dataTemp.username}}</span>
        </div>
        <div class="user-list">
          <span>巡查时间</span>
          <span>{{new Date(this.dataTemp.created).toLocaleString('chinese',{hour12:false})}}
          </span>
        </div>
        <div class="form-images-wrap">
          <p>图片详情</p>
          <img v-for="i in this.dataTemp.formImages" :src="i" alt="">
        </div>
      </div>
    </div>
  </mu-drawer>
</template>
<script>
import headDom from '../../UIcomponents/header/head';
import {dateTool} from '../../gisComponets/tool/DateTool.js';
export default {
  components: {
    headDom
  },
  data() {
    return {}
  },
  mounted() {
    this.change();
  },
  computed:{
    monitorTime:function(){
        let date = new Date(Number(this.dataTemp.monitorTime))
        return dateTool.toDate(date,'yyyy年MM月dd日')
    },
    riverName:function(){
        return this.dataTemp.riverName?this.dataTemp.riverName:'不清楚'
    },
    lam:function(){
        return this.dataTemp.lampblackCon?`${this.dataTemp.lampblackCon}mg/m³`:''
    },
    useWater:function(){
        return this.dataTemp.usingOfWater?`${this.dataTemp.usingOfWater}吨/日`:''
    }
  },
  methods: {
    backToMap() {
      this.$parent.open = false
    },
    change() {
      let way = this.dataTemp.exhaustWayName;
      switch (way) {
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
  props: ['open', 'dataTemp']
}
</script>
<style scoped>
.step-alert {
  width: 100%;
  z-index: 999;
}

.alert-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background: linear-gradient(left, #30aafd, #2eccfc);
  background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
  background: -moz-linear-gradient(left, #30aafd, #2eccfc);
  background: -o-linear-gradient(left, #30aafd, #2eccfc);
  box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
}
.alert-left{
  position:absolute;
  left:15px;
}
.alert-title{
  font-size:18px;
}
.event-detail-container {
  height: 100%;
}

.step-content {
  height: 100%;
  overflow: auto;
  padding-top: 55px;
  background: #fff;
}

.user-list {
  display: flex;
  width: 94%;
  margin: 0 auto;
  color: #6a6e7b;
  font-size: 14px;
  height: 45px;
  border-top: 1px solid #efefef;
  align-items: center;
  justify-content: space-between;
}

.form-images-wrap {
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
   background:#efefef;

}
  .form-images-wrap p {
    font-size: 14px;
  }
  .form-images-wrap img{
    width: 100%;
  }
</style>
