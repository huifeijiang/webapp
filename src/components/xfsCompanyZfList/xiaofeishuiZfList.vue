<template>
  <div class="zhifa">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">小废水企业执法列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="btns-wrap">
      <mu-tabs :value="activeTab">
        <mu-tab value="tab1" @click="handleTabChange('tab1',1)" title="待整治"/>
        <mu-tab value="tab2" @click="handleTabChange('tab2',2)" title="待验收"/>
        <mu-tab value="tab3" @click="handleTabChange('tab3',3)" title="已办结"/>
      </mu-tabs>
      <div class="aaa">
        <span>序号</span>
        <span>企业名称</span>
        <span v-show='activeTab == "tab1"'>巡查员</span>
        <span v-show='activeTab == "tab1"'>上报时间</span>
        <span v-show='activeTab != "tab1"'>执法员</span>
        <span v-show='activeTab == "tab3"'>验收时间</span>
        <span v-show='activeTab == "tab2"'>整治时间</span>
      </div>
    </div>
    <div class="news-wrap">
      <div v-if="activeTab === 'tab1'" class='listwrap'>
        <div class="list-event border-1px" v-for="(item,index) in events" :key="index" @click="toggle(item)">
          <div class="item-name ">{{index+1}}</div>
          <div class="item-name ">{{item.enterpriseName}}</div>
          <div class="item-name ">{{item.username}}</div>
          <div class="item-name ">{{item.datetime}}</div>
        </div>
      </div>
      <div v-else-if="activeTab === 'tab2'" class='listwrap'>
        <div class="list-event border-1px" v-for="(item,index) in events" :key="index" @click="toggle(item)">
          <div class="item-name ">{{index+1}}</div>
          <div class="item-name ">{{item.enterpriseName}}</div>
          <div class="item-name ">{{item.handler}}</div>
          <div class="item-name ">{{item.handleTime}}</div>
        </div>
      </div>
      <div v-else-if="activeTab === 'tab3'" class='listwrap'>
        <div class="list-event border-1px" v-for="(item,index) in events" :key="index" @click="toggle(item)">
          <div class="item-name ">{{index+1}}</div>
          <div class="item-name ">{{item.enterpriseName}}</div>
          <div class="item-name ">{{item.handler}}</div>
          <div class="item-name ">{{item.checkedTime}}</div>
        </div>
      </div>
    </div>
    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="事件详情"></autoformPreview>
    <div class="buttons" v-show="openperive && !open" @click="open=true">开始办理</div>
    <mu-drawer class="drw" :open="open" right>
      <div class="alert-head">
        <span class="alert-left " @click="closeAll(activeTab)" v-show='activeTab!="tab3"'>返回</span>
        <mu-icon class="alert-left" @click="closeAll(activeTab)" value="keyboard_arrow_left" v-show='activeTab=="tab3"'/>
        <span class="alert-title">整治</span>
        <span class="alert-right" :class="{hidden:activeTab=='tab3'}" @click="subForm">提交</span>
      </div>
      <div class="drw-body">
        <p>排查发现的环保问题</p>
        <div class='checkboxes'>
          <mu-checkbox name="group" nativeValue="1" v-model="list" label="未签订收运处置合同或合同过期" :disabled='activeTab != "tab1"'/>
          <mu-checkbox name="group" nativeValue="2" v-model="list" label="不交运或运量不足" :disabled='activeTab != "tab1"'/>
          <mu-checkbox name="group" nativeValue="3" v-model="list" label="收运公司运输过程中抛洒外溢或非法倾倒" :disabled='activeTab != "tab1"'/>
          <mu-checkbox name="group" nativeValue="4" v-model="list" label="接收处理单位不按时接运" :disabled='activeTab != "tab1"'/>
          <mu-checkbox name="group" nativeValue="5" v-model="list" label="接收处理单位为进行有效处理超标排放" :disabled='activeTab != "tab1"'/>
          <mu-checkbox name="group" nativeValue="0" v-model="list" label="其他问题" :disabled='activeTab != "tab1"'/>
        </div>
        <div v-show="activeTab == 'tab1'">
          <p>整治要求:</p>
          <textarea class="textarea" v-model="handleDemand" :disabled='activeTab != "tab1"' placeholder='请输入...'></textarea>
          <p>验收标准:</p>
          <textarea class="textarea" v-model="checkStandard" :disabled='activeTab != "tab1"' placeholder='请输入...'></textarea>
        </div>
        <div v-show="activeTab != 'tab1'">
          <p>验收意见:</p>
          <textarea class="textarea" v-model="checkOpinion" :disabled='activeTab == "tab3"' placeholder='请输入...'></textarea>
          <p>验收结果:</p>
          <mu-radio label="合格" name="group" nativeValue="1" v-model="value" :disabled='activeTab == "tab3"'/>
          <mu-radio label="不合格" name="group" nativeValue="0" v-model="value" :disabled='activeTab == "tab3"'/>
        </div>
        <!--<div class="buttons rds" v-show="status==1" @click="zhengzhi">确认提交整治要求</div>-->
        <!--<div class="buttons rds" v-show="status==2" @click="jieban">确认结办</div>-->
      </div>
    </mu-drawer>
    <mu-dialog :open="openSubmit" title="提示">
      {{submitTitle}}
      <mu-flat-button slot="actions" primary @click="cancel" label="取消"/>
      <mu-flat-button slot="actions" primary @click="confirm" label="确定"/>
    </mu-dialog>
    <mu-dialog :open="textValueNull" title="提示">
      {{tip}}
      <mu-flat-button slot="actions" primary @click="textValueNull = false" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import {
    eventBus
  } from '../eventBus/eventBus';
  import {
    formFillTool
  } from '../../UIcomponents/autoForm/tool/FormFillTool';
  import {
    formItemShowTool
  } from '../../UIcomponents/autoForm/tool/FormItemShowTool';
  import {
    xiaosanluanwuData
  } from '../../UIcomponents/autoForm/data/shixiaoshanlw.js';
  import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
  import {
    dateTool
  } from '../../gisComponets/tool/DateTool.js';
  export default {
    data() {
      return {
        tab: 'tab1',
        events: [],
        openperive: false,
        open: false,
        list: [],
        listMap: {
          "其他问题": "0",
          "未签订收运处置合同或合同过期": "1",
          "不交运或运量不足": "2",
          "收运公司运输过程中抛洒外溢或非法倾倒": "3",
          "接收处理单位不按时接运": "4",
          "接收处理单位为进行有效处理超标排放": "5"
        },
        value: '0',
        status: 1,
        nowItem: null,
        handleDemand: '',
        checkStandard: '',
        checkOpinion: '',
        activeTab: 'tab1',
        tip: '',
        textValueNull: false,
        openSubmit: false,
        submitTitle: ''
      }
    },
    components: {
      autoformPreview
    },
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      })
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      handleTabChange(val, status) {
        this.activeTab = val;
        if (val == 'tab1') {
          this.getEvent(status);
        }
        if (val == 'tab2') {
          this.getEvent(status);
        }
        if (val == 'tab3') {
          this.getEvent(status);
        }
      },
      backToMap() {
        this.$router.push("/home/zhifaList");
      },
      getEvent(status) {
        //status :0无需整治,1待整治,2待验收,3已办结
        let id = '';
        if (status == 1) {
          id = '&handlerId=' + this.getUserId;
        } else if (status == 2) {
          id = '&checkerId=' + this.getUserId;
        }
        ;
        this.$http.get(GET_XFSZF_LIST + '?size=1000&status=' + status + id).then(res => {
          let data = res.body.data.content;
          data.forEach((val) => {
            val.datetime = val.datetime ? dateTool.toDate(new Date(val.datetime), 'MM月dd日') : ''
            val.handleTime = val.handleTime ? dateTool.toDate(new Date(val.handleTime), 'MM月dd日') : ''
            val.checkedTime = val.checkedTime ? dateTool.toDate(new Date(val.checkedTime), 'MM月dd日') : ''
          })
          this.events = data;
        }).catch(err => {
        })
      },
//      format(date) {
//        let dat = new Date(date);
//        return (dat.getMonth() + 1) + '月' + dat.getDate() + '日';
//      },
      toggle(item) {
        this.tableData = [];
        this.nowItem = item;
        this.$http.get(GET_WASTEWATER_COMDETAIL + item.id + '/details').then((res) => {
          this.openperive = true;
          let bool = false;
          if (res.body.data.status != 1) {
            this.open = true;
            bool = true;
          } else {
            this.status = 1;
            this.list = [];
            this.handleDemand = '';
            this.checkStandard = '';
            this.checkOpinion = '';
            this.value = '';
          }
          let formClone = formFillTool.formClone(xiaosanluanwuData.xiaosanluanwuDataJson.form);
          let obj = res.body.data;
          //填充表单
          formFillTool.fillForm(formClone, obj);
          //初始化父子关系
          formFillTool.initForm(formClone);
          //设置父子关系展示
          formItemShowTool.setShowByParent(formClone);
          //抛出详情展示事件
          eventBus.bus.emit(eventBus.LAMPYULAN, formClone);
           if(bool) {
            this.status = res.body.data.status;
            let arr = res.body.data.findIssueName.split(',');
            arr.forEach((item) => {
              this.list.push(this.listMap[item])
            });
            this.handleDemand = res.body.data.handleDemand;
            this.checkStandard = res.body.data.checkStandard;
            this.checkOpinion = res.body.data.checkOpinion;
            this.value = String(res.body.data.checkResult);
          }
        }).catch(err => {
        })
      },
      subForm(){
        if(this.activeTab === 'tab1'){
          if (this.list.length == 0) {
            this.tip = "请选择排查发现的环保问题!";
            this.textValueNull = true;
            return false
          } else if (this.checkStandard == '') {
            this.tip = "请填写验收标准！";
            this.textValueNull = true;
            return false
          } else if (this.handleDemand == '') {
            this.tip = "请填写整治要求！";
            this.textValueNull = true
            return false
          }else {
            this.submitTitle = '确认提交?'
            this.openSubmit = true;
          }
        }
        else if(this.activeTab === 'tab2'){
          if (!this.checkOpinion) {
            this.tip = "请输入验收意见！";
            this.textValueNull = true
            return false;
          } else if (this.value == 'null') {
            this.tip = "请选择验收结果！";
            this.textValueNull = true
            return false;
          } else {
            this.submitTitle = '确认提交?'
            this.openSubmit = true;
          }
        }
      },
      zhengzhiSubmit(){
        this.$http.patch(PATCH_XFSZF_FORM + this.nowItem.id + '/handled', {
          handleDemand: this.handleDemand,
          findIssue: this.list.join(','),
          checkStandard: this.checkStandard
        }).then(res => {
          if (res.body.code == 200) {
            this.openperive = false;
            this.open = false;
            this.openSubmit = false;
            this.handleTabChange('tab2', 2);
          } else {
            alert('出错了');
            this.openperive = false;
          }
        }).catch(err => {
        })
      },
      jiebanSubmit(){
        this.$http.patch(PATCH_XFSYS_FORM + this.nowItem.id + '/checked', {
          checkOpinion: this.checkOpinion,
          checkResult: this.value
        }).then(res => {
          if (res.body.code == 200) {
            this.openperive = false;
            this.open = false;
            this.openSubmit = false;
            this.handleTabChange('tab3', 3);
          } else {
            alert('出错了');
            this.openperive = false;
          }
        }).catch(err => {
        })
      },
      confirm() {
        if (this.activeTab == 'tab1') this.zhengzhiSubmit()
        if (this.activeTab == 'tab2') this.jiebanSubmit()
      },
      cancel(){
        this.openSubmit = false;
      },
      closeAll(activeTab) {
        if (activeTab == 'tab1') {
          this.openperive = true;
        } else {
          this.openperive = false;
        }
        this.open = false;
      }
    },
    mounted() {
      this.getEvent(1);
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style lang="less" scoped>
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    background-color: #2196f3;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }

  .alert-title {
    font-size: 18px;
  }

  .aaa {
    width: 100%;
    height: 40px;
    background-color: #efefef;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .aaa span {
    display: inline-block;
    text-align: center;
    font-weight: 500;
    width: 25%;
  }

  .news-wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-top: 144px;
    background-color: #fff;
  }

  .btns-wrap {
    width: 100%;
    position: fixed;
    top: 56px;
    z-index: 50;
  }

  .listwrap {
    height: 100%;
    overflow: auto;
  }

  .list-event {
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
    justify-content: space-around;
  }

  .item-name {
    width: 100%;
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (-webkit-min-device-pixel-ratio: 1.5),
  (min-device-pixel-ratio: 1.5) {
    .border-1px:after {
      height: 1px;
      content: "";
      left: 0;
      width: 100%;
      border-top: 1px solid #e3e5e9;
      position: absolute;
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7)
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),
  (min-device-pixel-ratio: 2) {
    .border-1px:after {
      height: 1px;
      content: "";
      left: 0;
      width: 100%;
      border-top: 1px solid #e3e5e9;
      position: absolute;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5)
    }
  }

  .active {
    background-color: #54A4D7;
    color: #fff;
  }

  .active-btn {
    background-color: #2196f3;
    color: #fff;
  }

  .zhifa {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 72;
    background-color: #fff;
  }

  /*.active {*/
  /*background-color: #2196f3;*/
  /*color: #fff;*/
  /*}*/

  .buttons {
    position: fixed;
    left: 50%;
    bottom: 10px;
    width: 100px;
    margin-left: -50px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background-color: #2196f3;
    z-index: 201;
  }

  /*.rds {*/
  /*width: 140px;*/
  /*margin-left: -70px;*/
  /*border-radius: 25px;*/
  /*}*/

  .drw {
    width: 100%;
    z-index: 202;
  }

  .hidden {
    visibility: hidden;
  }

  .drw-body {
    width: 100%;
    margin-top: 56px;
    padding: 10px;

  p {
    margin-bottom: 8px;
  }

  }

  .textarea {
    width: 100%;
    height: 60px;
    outline: none;
    padding: 5px;
  }

  .radioStyle {
    font-size: 14px;
  }
</style>
