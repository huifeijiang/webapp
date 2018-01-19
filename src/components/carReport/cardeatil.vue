<template>
  <mu-drawer class="step-alert" right :open="open">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">汽修事件详情</span>
      <span class="alert-right"></span>
    </div>
    <div class='event-detail-container'>
      <div class="nothin"></div>
      <div class="step-content">
        <div class="user-list">
          <span>单位名称</span>
          <span>{{dataTemp.enterpriseName}}</span>
        </div>
        <div class="user-list">
          <span>单位地址</span>
          <span>{{dataTemp.enterpriseAddr}}</span>
        </div>
        <div class="user-list">
          <span>营业执照</span>
          <span>{{dataTemp.enterpriseLicense=='false'?'无':dataTemp.enterpriseLicense}}</span>
        </div>
        <div class="user-list">
          <span>法人代表</span>
          <span>{{dataTemp.legalPersonName}}</span>
        </div>
        <div class="user-list">
          <span>法人代表电话</span>
          <span>{{dataTemp.legalPersonTel}}</span>
        </div>
        <div class="user-list">
          <span>企业联系人</span>
          <span>{{dataTemp.enterpriseContactsName}}</span>
        </div>
        <div class="user-list">
          <span>企业联系人电话</span>
          <span>{{dataTemp.enterpriseContactsTel}}</span>
        </div>
        <div class="user-list">
          <span>环保手续</span>
          <span>{{dataTemp.approvalProcedureName}}</span>
        </div>
        <div class="user-list" v-show="dataTemp.approvalProcedure == 1">
          <span>环保批文号</span>
          <span>{{dataTemp.approvalNo}}</span>
        </div>
        <div class="user-list" v-show="dataTemp.approvalProcedure == 2">
          <span>登记备案号</span>
          <span>{{dataTemp.recordNo}}</span>
        </div>
        <div class="user-list">
          <span>排水许可证</span>
          <span>{{dataTemp.drainageLicense=='false'?'无':dataTemp.drainageLicense}}</span>
        </div>
        <div class="user-list">
          <span>规模等级</span>
          <span>{{dataTemp.scaleSizeName}}</span>
        </div>
        <div class="user-list">
          <span>占地面积</span>
          <span>{{area}}</span>
        </div>
        <div class="user-list">
          <span>喷漆工艺</span>
          <span>{{dataTemp.sprayPaint?'有':'无'}}</span>
        </div>
        <div class="user-list" v-show="dataTemp.sprayPaint">
          <span>油漆使用情况</span>
          <span>{{dataTemp.newPaintStatus}}%</span>
        </div>
        <div class="user-list">
          <span>废气处理设施</span>
          <span>{{dataTemp.gasFacility?'有':'无'}}</span>
        </div>
        <div v-show="dataTemp.gasFacility">
          <div class="user-list">
            <span>运行情况</span>
            <span>{{dataTemp.cleanFacility?'正常运行':'异常运行'}}</span>
          </div>
          <div class="user-list">
            <span>废气处理设施类型</span>
            <span>{{dataTemp.gasFacilityTypeName}}</span>
          </div>
          <div class="user-list">
            <span>废气处理设施维护频次</span>
            <span>{{dataTemp.gasFacilityFreqName}}</span>
          </div>
        </div>
        <div class="user-list">
          <span>建筑红线内分流情况</span>
          <span>{{dataTemp.shuntStatusName}}</span>
        </div>
        <div class="user-list">
          <span>预处理设施</span>
          <span>{{dataTemp.haveFacilitie?'有':'无'}}</span>
        </div>
        <div v-show="dataTemp.haveFacilitie">
          <div class="user-list">
            <span>化粪池</span>
            <span>{{dataTemp.septicTank}}个</span>
          </div>
          <div class="user-list">
            <span>沉沙池</span>
            <span>{{dataTemp.gritChamberFacility}}个</span>
          </div>
        </div>
        <div class="user-list">
          <span>周边管网建设情况</span>
          <span>{{dataTemp.pipeStatusName}}</span>
        </div>
        <div class="user-list" v-show='dataTemp.pipeStatus != "不清楚"'>
          <span>建筑红外线外污水接驳去向</span>
          <span>{{dataTemp.directionName}}</span>
        </div>
        <div class="user-list">
          <span>用水量</span>
          <span>{{useWater}}</span>
        </div>
        <div class="user-list">
          <span>污水排放量</span>
          <span>{{outWater}}</span>
        </div>
        <div class="user-list">
          <span>最终去向</span>
          <span>{{dataTemp.finalDestination}}</span>
        </div>
        <div class="user-list">
          <span>情况说明</span>
          <span>{{dataTemp.describe}}</span>
        </div>
        <div class="user-list">
          <span>附近河流</span>
          <span>{{dataTemp.riverName?dataTemp.riverName:'不清楚'}}</span>
        </div>
        <div class="user-list">
          <span>巡查社区</span>
          <span>{{dataTemp.gridName}}</span>
        </div>
        <div class="user-list">
          <span>巡查人员</span>
          <span>{{dataTemp.username}}</span>
        </div>
        <div class="user-list">
          <span>巡查时间</span>
          <span>{{new Date(dataTemp.created).toLocaleString('chinese',{hour12:false})}}
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
  import {eventBus} from '../eventBus/eventBus';

  export default {
    components: {
      headDom
    },
    props: ['open', 'dataTemp'],
    data() {
      return {
        formData: []
      }
    },
    computed:{
        area:function(){
            return this.dataTemp.area?`${this.dataTemp.area}m²`:'';
        },
        useWater:function(){
            return this.dataTemp.usingOfWater?`${this.dataTemp.usingOfWater}吨/日`:'';
        },
        outWater:function(){
              return this.dataTemp.outOfWater?`${this.dataTemp.outOfWater}吨/日`:'';
        }

    },
    methods: {
      backToMap() {
        this.$parent.open = false
      },
    }
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

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-title {
    font-size: 18px;
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

  .nothin {
    height: 1px;
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

  .form-images-wrap img {
    width: 100%;
  }
</style>
