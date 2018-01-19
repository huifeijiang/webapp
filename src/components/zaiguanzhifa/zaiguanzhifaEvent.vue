<template>
  <div class="zhifa">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">在管企业执法列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="tab">
      <div class="tab-cell" v-for="item in tabs" :class="item.active?'active':''" @click="change(item)">{{item.name}}
      </div>
    </div>
    <div class="tab-header">
      <span>序号</span>
      <span>公司名称</span>
      <span v-show='conllor == 1'>巡查员</span>
      <span v-show='conllor == 1'>上报时间</span>
      <span v-show='conllor != 1'>执法员</span>
      <span v-show='conllor == 2'>整治时间</span>
      <span v-show='conllor == 3'>验收时间</span>
    </div>
    <div class="tab-wrap">
      <div class="tab-body" v-for="(item, index) in events" @click="toggle(item)">
        <span>{{index+1}}</span>
        <span>{{item.enterpriseName}}</span>
        <span v-show='conllor == 1'>{{item.username}}</span>
        <span v-show='conllor == 1'>{{format(item.datetime)}}</span>
        <span v-show='conllor != 1'>{{item.handler}}</span>
        <span v-show='conllor == 2'>{{format(item.handleTime)}}</span>
        <span v-show='conllor == 3'>{{format(item.checkedTime)}}</span>
      </div>
    </div>

    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="事件详情"></autoformPreview>
    <div class="buttons" v-show="openperive" @click="open=true">开始办理</div>

    <mu-drawer class="drw" :open="open" right>
      <div class="alert-head">
        <span class="alert-left " @click="closeAll"  v-show="status!=3">返回</span>
        <mu-icon class="alert-left" @click="closeAll" value="keyboard_arrow_left" v-show="status==3" />
        <span class="alert-title">整治</span>
        <span class="alert-right"  v-show="status==1" @click="zhengzhi">提交</span>
        <span class="alert-right"  v-show="status==2" @click="jieban">提交</span>
      </div>
      <div class="drw-body">
        <p>排查发现的环保问题</p>
        <div class='checkboxes'>
          <mu-checkbox name="group" nativeValue="1" v-model="list" label="废水处理设施达标能力不足" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="2" v-model="list" label="虚假纳管" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="3" v-model="list" label="虚假达标" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="4" v-model="list" label="超标排量" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="5" v-model="list" label="排放去向未能精准到三级支流" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="0" v-model="list" label="其他问题" :disabled="status>=2"/>
        </div>
        <div v-show='status == 1'>
          <p>整治要求:</p>
          <textarea class="textarea" v-model="handleDemand" :disabled="status>=2" placeholder='请输入...'></textarea>
          <p>验收标准:</p>
          <textarea class="textarea" v-model="checkStandard" :disabled="status>=2" placeholder='请输入...'></textarea>
        </div>
        <div v-show="status !=1">
          <p>验收意见:</p>
          <textarea class="textarea" v-model="checkOpinion" :disabled="status>=3" placeholder='请输入...'></textarea>
          <p>验收结果:</p>
          <mu-radio label="合格" name="group" nativeValue="1" v-model="value" :disabled="status>=3"/>
          <mu-radio label="不合格" name="group" nativeValue="0" v-model="value" :disabled="status>=3"/>
        </div>
        <!-- <div class="buttons rds" v-show="status==1" @click="zhengzhi">确认提交整治要求</div> -->
        <!-- <div class="buttons rds" v-show="status==2" @click="jieban">确认结办</div> -->
      </div>
    </mu-drawer>
    <mu-dialog :open="textValueNull" title="提示">
      {{tip}}
      <mu-flat-button slot="actions" primary @click="textValueNull = false" label="确定"/>
    </mu-dialog>
    <mu-dialog :open="openSubmit" title="提示">
      {{submitTitle}}
      <mu-flat-button slot="actions" primary @click="openSubmit = false" label="取消"/>
      <mu-flat-button slot="actions" primary @click="submit" label="确定"/>
    </mu-dialog>
    <mu-dialog :open="jiebanshow" title="提示">
      确认提交?
      <mu-flat-button slot="actions" primary @click="jiebanshow = false" label="取消"/>
      <mu-flat-button slot="actions" primary @click="jiebansubit" label="确定"/>
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
    zaiguanqiyeData
  } from '../../UIcomponents/autoForm/data/zaiguanqiye.js';
  import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
  export default {
    data() {
      return {
        jiebanshow: false,
        openSubmit: false,
        submitTitle: '',
        conllor: '1',
        textValueNull: false,
        tip: '',
        tab: 'tab1',
        tabs: [{
          name: '待整治',
          active: true,
          status: 1
        }, {
          name: '待验收',
          active: false,
          status: 2
        }, {
          name: '已办结',
          active: false,
          status: 3
        }],
        events: [],
        openperive: false,
        open: false,
        list: [],
        listMap: {
          "其他问题": "0",
          "废水处理设施达标能力不足": "1",
          "虚假纳管": "2",
          "虚假达标": "3",
          "超标排量": "4",
          "排放去向未能精准到三级支流": '5'
        },
        value: '0',
        status: 1,
        nowItem: null,
        handleDemand: '',
        checkStandard: '',
        checkOpinion: ''
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
      backToMap() {
        this.setMapShow(true);
        this.$router.push("/home/zhifaList");
      },
      change(item) {
        if (typeof item === 'number') {
          this.tabs.forEach(function (val) {
            val.active = false;
          });
          this.tabs[item - 1].active = true;
          this.getEvent(item);
          return;
        }
        if (item.active) return;
        this.tabs.forEach(function (val) {
          val.active = false;
        });
        item.active = true;
        this.conllor = item.status;
        console.log(this.conllor)
        this.getEvent(item.status);
      },
      getEvent(status) {
        //status :0无需整治,1待整治,2待验收,3已办结
        let id = '';
        if (status == 1) {
          id = '&handlerId=' + this.getUserId;
        } else if (status == 2) {
          id = '&checkerId=' + this.getUserId;
        }
        this.status = status;
        this.$http.get(POST_INDUSTRIAL + '?size=1000&status=' + status + id).then(res => {
          this.events = res.body.data.content;
        }).catch(err => {
        })

      },
      format(date) {
        let dat = new Date(date);
        return (dat.getMonth() + 1) + '月' + dat.getDate() + '日';
      },
      toggle(item) {
        this.tableData = [];
        this.nowItem = item;

        this.$http.get(GET_INDUSTRIAL + item.id + '/details').then((res) => {
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

          let formClone = formFillTool.formClone(zaiguanqiyeData.zaiguanqiyeDataJson.form);
          let obj = res.body.data;
          //填充表单
          formFillTool.fillForm(formClone, obj);
          //初始化父子关系
          formFillTool.initForm(formClone);
          //设置父子关系展示
          formItemShowTool.setShowByParent(formClone);
          //抛出详情展示事件
          eventBus.bus.emit(eventBus.LAMPYULAN, formClone);

          if (bool) {
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
      zhengzhi() {
        if (this.list.length == 0) {
          this.tip = "请选择排查发现环保问题！";
          this.textValueNull = true;
          return false
        }
        if (this.checkStandard == '') {
          //     checkStandard:'',
          // handleDemand:'',
          this.tip = "请填写验收标准！";
          this.textValueNull = true;
          return false
        }
        if (this.handleDemand == '') {
          this.tip = "请填写整治要求！";
          this.textValueNull = true
          return false
        }
        this.submitTitle = '确认提交?'
        this.openSubmit = true;

      },
      submit(){
        this.$http.patch(GET_INDUSTRIAL + this.nowItem.id + '/handled', {
          handleDemand: this.handleDemand,
          findIssue: this.list.join(','),
          checkStandard: this.checkStandard
        }).then(res => {
          if (res.body.code == 200) {
            this.openSubmit = false;
            this.openperive = false;
            this.open = false;
            this.change(2);
          } else {
            alert('出错了');
            this.openperive = false;
          }
        }).catch(err => {
        })
      },
      jieban() {

        if (this.checkOpinion == null || this.checkOpinion == "") {
          this.tip = "请输入验收意见！";
          this.textValueNull = true
          return false
        }
        if (this.value == 'null') {
          this.tip = "请选择验收结果！";
          this.textValueNull = true
          return false
        }

        this.jiebanshow = true;

      },
      jiebansubit(){
        this.$http.patch(GET_INDUSTRIAL + this.nowItem.id + '/checked', {
          checkOpinion: this.checkOpinion,
          checkResult: this.value
        }).then(res => {
          if (res.body.code == 200) {
            this.openperive = false;
            this.open = false;
            this.jiebanshow = false;
            this.change(3);
          } else {
            alert('出错了');
            this.openperive = false;
          }
        }).catch(err => {
        })
      },
      closeAll() {
        if (this.conllor == 1) {
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
  .zhifa {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 72;
    background-color: #fff;
  }

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    margin-top: 56px;
    border-bottom: 1px solid #efefef;

  .tab-cell {
    width: 33.3%;
    border-right: 1px solid #efefef;
    line-height: 40px;
    text-align: center;
  }

  .tab-cell:last-child {
    border-right: none;
  }

  .active {
    background-color: #2196f3;
    color: #fff;
  }

  }
  .tab-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 131px;
    bottom: 1px;
    z-index: 10;
    overflow-y: auto;
  }

  .tab-header,
  .tab-body {
    display: flex;
    width: 100%;
    height: 35px;
    justify-content: space-between;

  span {
    width: 25%;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    border-bottom: 1px solid #efefef;
  }

  }

  .buttons {
    position: fixed;
    left: 50%;
    bottom: 20px;
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

  .rds {
    width: 140px;
    margin-left: -70px;
    border-radius: 25px;
  }

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
    p{
      margin-bottom:8px;
    }
  }

  .textarea {
    width: 100%;
    height: 60px;
    outline: none;
    padding-left:10px;
  }

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

</style>
