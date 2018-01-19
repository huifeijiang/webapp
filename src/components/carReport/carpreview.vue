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
          <span>{{enterpriseName}}</span>
        </div>
        <div class="user-list">
          <span>单位地址</span>
          <span>{{dataTemp.enterpriseAddr}}</span>
        </div>
        <div class="user-list">
          <span>营业执照</span>
          <span>{{dataTemp.enterpriseLicense}}</span>
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
          <span>{{shouxu}}</span>
        </div>
        <div class="user-list" v-show="shouxunum == 1">
          <span>环保批文号</span>
          <span>{{dataTemp.approvalNo}}</span>
        </div>
        <div class="user-list" v-show="shouxunum == 2">
          <span>登记备案号</span>
          <span>{{dataTemp.recordNo}}</span>
        </div>
        <div class="user-list">
          <span>排水许可证</span>
          <span>{{dataTemp.drainageLicense }}</span>
        </div>
        <div class="user-list">
          <span>建筑红线内分流情况</span>
          <span>{{shuntStatus}}</span>
        </div>
        <div class="user-list">
          <span>规模等级</span>
          <span>{{scaleLevel}}</span>
        </div>

         <div class="user-list">
          <span>喷漆工艺</span>
          <span>{{dataTemp.sprayPaint?'有':'无'}}</span>
        </div>
        <div v-show="dataTemp.sprayPaint">
        <div class="user-list">
          <span>水性漆使用情况</span>
          <span>{{dataTemp.paintStatus?'有':'无'}}</span>
        </div>
        <div class="user-list">
          <span>废气处理设施</span>
          <span>{{cleanFacility}}</span>
        </div>
        </div>



        <div class="user-list">
          <span>预处理设施</span>
          <span>{{dataTemp.haveFacilitie?'有':'无'}}</span>
        </div>
        <div v-show="dataTemp.haveFacilitie"><div class="user-list">
          <span>化粪池</span>
          <span>{{dataTemp.septicTank}}个</span>
        </div>
        <div class="user-list">
          <span>隔油池</span>
          <span>{{dataTemp.separationFacility}}个</span>
        </div>
        <div class="user-list">
          <span>沉沙池</span>
          <span>{{dataTemp.gritChamberFacility}}个</span>
        </div>
        </div>
        <div class="user-list">
          <span>周边管网建设情况</span>
          <span>{{pipeStatus}}</span>
        </div>
        <div class="user-list">
          <span>建筑红外线外污水接驳去向</span>
          <span>{{direction}}</span>
        </div>
         <div class="user-list">
          <span>污水排放量</span>
          <span>{{dataTemp.sewage}}立方米/天</span>
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
      提交后则无法修改！请确认是否提交？
      <mu-flat-button slot="actions" @click="close()" primary label="取消" />
      <mu-flat-button slot="actions" @click="submit()" primary label="确定" />
    </mu-dialog>
    <mu-dialog :open="submitDialog" title="提示">
            {{submitMess}}
            <mu-flat-button label="确定" slot="actions" primary @click="toeEvent" />
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
      direction:'',
      confirem: false,
      exhaustWay: '',
      pipeStatus:'',
      cleanFacility: '',
      fuleType: '',
      dataTemp: null,
      mainFreq: '',
      shouxunum:null,
      shouxu:'',
      scaleLevel:null,
      enterpriseName:'',
       shuntStatus:'',
       cleanFacility:''
    }
  },
  props: [
    'openyulan',
  ],
  created() {
    eventBus.bus.on(eventBus.LIRRLEYULAN, (data) => {
      console.log(data)
      this.dataTemp = data;
      this.shouxunum = data.approvalProcedure
      this.enterpriseName = data.enterpriseName
      if(data.direction == ""){ this.direction = ""}
      if(this.shouxunum  == 0){ this.shouxu = "无手续"}
      if(this.shouxunum  == 1){ this.shouxu = "审批批文"}
      if(this.shouxunum  == 2){ this.shouxu = "登记备案"}
       if(data.shuntStatus == 1){ this.shuntStatus = "雨污合流 "}
      if(data.shuntStatus == 2){ this.shuntStatus = "雨污分流"}
      switch(data.scaleSize){
        case '1':
            this.scaleLevel='汽车4S店';
              break;
        case '2':
          this.scaleLevel= '修理店(含洗车)';
              break;
        case '3':
          this.scaleLevel= '修理店(不含洗车)';
            break;
        case '4':
          this.scaleLevel= '洗车场';
            break;

      }
      switch(data.cleanFacility){
        case '3':
        this.cleanFacility='有(正常运行)';
              break;
        case '4':
        this.cleanFacility='有(异常运行)';
              break;
        case '5':
        this.cleanFacility='无';
              break;
      }
      switch(data.direction){

        case '1':
          this.direction='市政污水管网';
          break;
        case '2':
          this.direction= '市政雨水管网';
          break;
        case '3':
          this.direction= '雨污合流管网';
          break;
        case '4':
          this.direction= '直排入河';
          break;
      }
      switch(data.pipeStatus){
        case '0':
          this.pipeStatus='无污水管网';
          break;
        case '1':
          this.pipeStatus= '污水管网';
          break;
        case '2':
          this.pipeStatus= '雨污合流管网';
          break;
      }
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
      this.$http.post(POST_CAR_REPORT, this.dataTemp).then((res) => {
        if (res.body.code == 200) {
          this.confirem = false
          this.submitDialog = true;
          this.submitMess = "提交成功"
        }
      }).catch((err) => {
          this.submitDialog = true;
          this.submitMess = err.body.msg
      });
    },
    toeEvent(){
      this.$router.push('/home/portal/careevent')
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
