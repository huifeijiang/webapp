<template>
  <div class="zhifa">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">市小散乱污执法列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="tab">
      <div class="tab-cell" v-for="item in tabs" :class="item.active?'active':''" @click="change(item)">{{item.name}}
      </div>
    </div>
    <div class="tab-header">
      <span>序号</span>
      <span>公司名称</span>
      <span>{{people}}</span>
      <span>{{timemer}}</span>
    </div>
    <div class="tab-wrap">
      <div class="tab-body" v-for="(item, index) in events" @click="toggle(item)">
        <span>{{index+1}}</span>
        <span>{{item.enterpriseName}}</span>
        <span>{{isHandler? item.handler : item.username }}</span>
        <span>{{format(item)}}</span>
      </div>
    </div>

    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="事件详情"></autoformPreview>
    <div class="buttons" v-show="openperive" @click="open=true">开始办理</div>

    <mu-drawer class="drw" :open="open" right>
      <div class="alert-head">
        <span class="alert-left " @click="closeAll" v-show='status!=3'>返回</span>
        <mu-icon class="alert-left" @click="closeAll" value="keyboard_arrow_left"
                 v-show='status==3'/>
        <span class="alert-title">整治</span>
        <span class="alert-right" v-show="status == 1" @click="zhengzhi(true)">提交</span>
        <span class="alert-right" v-show="status == 2" @click="jieban(true)">提交</span>
      </div>
      <div class="drw-body">
        <p>排查发现的环保问题</p>
        <div class='checkboxes'>
          <mu-checkbox name="group" nativeValue="1" v-model="list" label="未建先批" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="2" v-model="list" label="废水直排" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="3" v-model="list" label="不符合产业政策和规划布局要求" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="4" v-model="list" label="排放去向未能精准到三级支流" :disabled="status>=2"/>
          <mu-checkbox name="group" nativeValue="0" v-model="list" label="其他问题" :disabled="status>=2"/>
        </div>
        <div v-show="status==1">
          <p>整治要求:</p>
          <textarea class="textarea" v-model="handleDemand" :disabled="status>=2" placeholder='请输入...'></textarea>
          <p>验收标准:</p>
          <textarea class="textarea" v-model="checkStandard" :disabled="status>=2" placeholder='请输入...'></textarea>
        </div>
        <div v-show="status!=1">
          <p>验收意见:</p>
          <textarea class="textarea" v-model="checkOpinion" :disabled="status>=3" placeholder='请输入...'></textarea>
          <p>验收结果:</p>
          <mu-radio label="合格" name="group" nativeValue="1" v-model="value" :disabled="status>=3"/>
          <mu-radio label="不合格" name="group" nativeValue="0" v-model="value" :disabled="status>=3"/>
        </div>
        <!-- <div class="buttons rds"  v-show="status==1" @click="zhengzhi(true)">确认提交整治要求</div>
              <div class="buttons rds"  v-show="status==2" @click="jieban(true)">确认结办</div> -->

        <alert v-model="alert" @confirm="queren" @cancel="alert=false" cancelable>确认提交?</alert>
        <alert v-model="messModel" @confirm="messModel=false">{{messMeage}}</alert>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  import {formFillTool} from '../../UIcomponents/autoForm/tool/FormFillTool';
  import {formItemShowTool} from '../../UIcomponents/autoForm/tool/FormItemShowTool';
  import {xiaosanluanwuData} from '../../UIcomponents/autoForm/data/shixiaoshanlw.js';
  import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
  import alert from '../../UIcomponents/alert/alert.vue';
  export default {
    data() {
      return {
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
        alert: false,
        alertStatus: 1,//1整治操作，2结办操作,
        messModel: false,
        messMeage: '',
        people: '巡查员',
        timemer: '上报时间',
        events: [],
        openperive: false,
        open: false,
        isHandler: false,
        list: [],
        listMap: {
          "其他问题": "0",
          "未批先建": "1",
          "废水直排": "2",
          "不符合产业政策和规划布局要求": "3",
          "排放去向未能精准到三级支流": "4"
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
      autoformPreview,
      alert
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
        this.$router.push("/home/zhifaList");
      },
      change(item) {
        if (typeof item === 'number') {
          this.tabs.forEach(function (val) {
            val.active = false;
          });
          this.tabs[item - 1].active = true;
          this.people = '执法员';
          this.timemer = '上报时间';
          this.getEvent(item);
          return;
        }
        if (item.active) return;
        this.tabs.forEach(function (val) {
          val.active = false;
        });
        item.active = true;
        if (item.status == 1) {
          this.isHandler = false;
          this.people = '巡查员';
          this.timemer = '上报时间';
        } else {
          this.isHandler = true;
          this.people = '执法员';
          this.timemer = item.status == 2 ? '整治时间' : '验收时间';
        }
        this.getEvent(item.status);
      },
      getEvent(status) {
        //status :0无需整治,1待整治,2待验收,3已办结
        let id = '';
        if (status == 1) {
          id = '&handlerId=' + this.getUserId;
        } else if (status == 2) {
          id = '&checkerId=' + this.getUserId;
        };
        this.status = status
        this.$http.get(GET_WATER_EVENT_NEW + '?size=1000&status=' + status + id).then(res => {
          this.events = res.body.data.content;
        }).catch(err => {
        })
      },
      format(item) {
        let dat;
        if (item.status == 1) {
          dat = new Date(item.datetime);
        } else if (item.status == 2) {
          dat = new Date(item.handleTime);
        } else {
          dat = new Date(item.checkedTime);
        }
        return (dat.getMonth() + 1) + '月' + dat.getDate() + '日';
      },
      toggle(item) {
        this.tableData = [];
        this.nowItem = item;

        this.$http.get(GET_RIVER_EVENT_DETAIL_NEW + item.id + '/details').then((res) => {
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
            this.statusTitle = '整治';
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

          if (bool) {
            this.status = res.body.data.status;
            let arr = res.body.data.findIssueName.split(',');
            arr.forEach((item) => {
              this.list.push(this.listMap[item])
            })
            this.handleDemand = res.body.data.handleDemand;
            this.checkStandard = res.body.data.checkStandard;
            this.checkOpinion = res.body.data.checkOpinion || '';
            this.value = res.body.data.checkResult + '' || '';
          }
        }).
        catch(err => {}
        )
      },
      zhengzhi(bool) {
        if (this.handleDemand == '' || this.checkStandard == '' || this.list.length == 0) {
          this.messModel = true;
          this.messMeage = '不允许提交空内容!';
          return;
        }
        if (bool === true) {
          this.alert = true;
          this.alertStatus = 1;
          return;
        }
        this.$http.patch(PATCH_LITTLE_POLLUTE + this.nowItem.id + '/handled', {
          handleDemand: this.handleDemand,
          findIssue: this.list.join(','),
          checkStandard: this.checkStandard
        }).then(res => {
          if (res.body.code == 200) {
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
      jieban(bool) {
        if (this.checkOpinion == '' || this.value == '') {
          this.messModel = true;
          this.messMeage = '不允许提交空内容!';
          return;
        }
        if (bool === true) {
          this.alert = true;
          this.alertStatus = 2;
          return;
        }
        this.$http.patch(PATCH_LITTLE_POLLUTE + this.nowItem.id + '/checked', {
          checkOpinion: this.checkOpinion,
          checkResult: this.value
        }).then(res => {
          if (res.body.code == 200) {
            this.openperive = false;
            this.open = false;
            this.change(3);
          } else {
            alert('出错了');
            this.openperive = false;
          }
        }).catch(err => {
        })
      },
      queren() {
        console.log(this.alertStatus)
        if (this.alertStatus == 1) {
          this.zhengzhi(false);
        } else {
          this.jieban(false);
        }
      },
      closeAll() {
        this.open = false;
        if (this.status !== 1) {
          this.openperive = false;
        }
      }
    },
    mounted() {
      this.getEvent(1);
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
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
  .tab-header, .tab-body {
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    padding: 5px;

  p {
    margin-bottom: 8px;
  }

  }
  .textarea {
    width: 100%;
    height: 60px;
    outline: none;
    padding-left: 10px;
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
</style>
