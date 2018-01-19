<template>
  <mu-drawer class="step-alert ffff" right :open="openyulan">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">预览</span>
      <span class="alert-right" @click="show">提交</span>
    </div>
    <div class='event-detail-container'>
      <div class="nothin"></div>
      <div class="step-content margin55">
        <div class="user-list">
          <span>单位名称</span>
          <span>{{dataTemp.enterpriseName}}</span>
        </div>
        <div class="user-list">
          <span>单位地址</span>
          <span>{{dataTemp.enterpriseAddr}}</span>
        </div>
        <div class="user-list">
          <span>单位是否存在</span>
          <span>{{dataTemp.exist?'是':'否'}}</span>
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
          <span>法人代表</span>
          <span>{{dataTemp.legalPersonName}}</span>
        </div>
        <div class="user-list">
          <span>基本灶头数量</span>
          <span>{{dataTemp.rangCount}}</span>
        </div>
        <div class="user-list">
          <span>是否属于6灶台及以上</span>
          <span>{{dataTemp.sixRangCount?'是':'否'}}</span>
        </div>
        <div class="user-list" v-if='dataTemp.sixRangCount'>
          <span>在线监测系统</span>
          <span>{{dataTemp.monitorOnline?'有':'无'}}</span>
        </div>
        <div class="user-list">
          <span>油烟净化设施</span>
          <span>{{cleanFacility}}</span>
        </div>
        <div class="user-list">
          <span>油烟监测(m³)</span>
          <span>{{dataTemp.lampblackCon}}</span>
        </div>
        <div class="user-list">
          <span>环保审批或备案</span>
          <span>{{dataTemp.approvalNo}}</span>
        </div>
        <!-- <div class="user-list" v-if='this.dataTemp.haveApproval'>
                  <span>环保批文号</span>
                   <span>{{this.dataTemp.approvalNo}}</span>
                </div> -->
        <div class="user-list">
          <span>燃料类型</span>
          <span>{{fuleType}}</span>
        </div>
        <div class="user-list">
          <span>排气口方式</span>
          <span>{{exhaustWay}}</span>
        </div>
        <div class="user-list">
          <span>油烟净化设施维护频次</span>
          <span>{{mainFreq}}</span>
        </div>
        <div class="user-list">
          <span>情况说明</span>
          <span>{{dataTemp.describe}}</span>
        </div>
        <div class="user-list">
          <span>巡查社区</span>
          <span>{{dataTemp.gridname}}</span>
        </div>

      </div>
    </div>
    <mu-dialog :open="confirem" title="提示">
      请确认是否提交？
      <mu-flat-button slot="actions" @click="close()" primary label="取消" />
      <mu-flat-button slot="actions" @click="submit()" primary label="确定" />
    </mu-dialog>
    <mu-dialog :open="submitDialog" title="提示">
            {{submitMess}}
            <mu-flat-button label="确定" slot="actions" primary @click="submitDialog = false" />
    </mu-dialog>
  </mu-drawer>
</template>
<script type='es6'>
import { eventBus } from '../eventBus/eventBus';
import headDom from '../../UIcomponents/header/head';
export default {
  components: {
    headDom
  },
  data() {
    return {
      submitDialog:false,
      submitMess:'',
      confirem: false,
      exhaustWay: '',
      cleanFacility: '',
      fuleType: '',
      dataTemp: null,
      mainFreq: '',
    }
  },
  props: [
    'openyulan',
  ],
  created() {
    eventBus.bus.on(eventBus.LAMPYULAN, (data) => {
      this.dataTemp = data;
      if (data.exhaustWay == 0) { this.exhaustWay = '其他'; }
      if (data.exhaustWay == 1) { this.exhaustWay = '下水道'; }
      if (data.exhaustWay == 2) { this.exhaustWay = '高空排放'; }
      if (data.exhaustWay == 3) { this.exhaustWay = '低空排放'; }
      if (data.exhaustWay == 4) { this.exhaustWay = '公共烟道'; }

      if (data.cleanFacility == 0) { this.cleanFacility = '已安装运行正常' }
      if (data.cleanFacility == 1) { this.cleanFacility = '已安装运行异常' }
      if (data.cleanFacility == 2) { this.cleanFacility = '未安装' }

      if (data.fuleType == 1) { this.fuleType = '清洁(电、天然气等)' }
      if (data.fuleType == 2) { this.fuleType = '非清洁' }

      if (data.mainFreq == 0) { this.mainFreq = '无'; }
      if (data.mainFreq == 1) { this.mainFreq = '1次/年'; }
      if (data.mainFreq == 2) { this.mainFreq = '1次/半年'; }
      if (data.mainFreq == 3) { this.mainFreq = '1次/1季度'; }
      if (data.mainFreq == 4) { this.mainFreq = '1次/2个月'; }

    })
  },
  methods: {
    backToMap() {
      this.$parent.openperive = false
    },
    close() {
      this.confirem = false
    },
    show() {
      this.confirem = true
    },
    submit() {
      this.$http.post(POST_LAMPBLACK, this.dataTemp).then((res) => {
        if (res.body.code == 200) {
          this.confirem = false
          this.submitDialog = true;
          this.submitMess = "提交成功"
        }
      }).catch((err) => {
          this.submitDialog = true;
          this.submitMess = err.body.msg
      });
    }

  },

}

</script>
<style scoped>
.step-alert {
  width: 100%;
  z-index: 200;
}

.alert-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  background: linear-gradient(left, #30aafd, #2eccfc);
  background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
  background: -moz-linear-gradient(left, #30aafd, #2eccfc);
  background: -o-linear-gradient(left, #30aafd, #2eccfc);
  box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
}

.event-detail-container {
  overflow-y: auto;
  overflow-x: hidden;
}

.margin55 {
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #fff;
  z-index: 73;
}

.user-list {
  display: flex;
  width: 94%;
  margin: 0 auto;
  color: #6a6e7b;
  font-size: 14px;
  height: 55px;
  border-bottom: 1px solid #efefef;
  align-items: center;
  justify-content: space-between;
}

.nothin {
  height: 1px;
}
</style>
