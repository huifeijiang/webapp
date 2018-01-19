<template>
  <div class="daily-wrap">
    <div class="hhhd">
      <span @click="back">返回</span>
      <span>每日一巡</span>
      <span class="hidden">隐藏</span>
    </div>
    <div class="btns">
      <span :class="ac=='tab1'?'acs':''" @click="change('tab1')">待确认</span>
      <span :class="ac=='tab2'?'acs':''" @click="change('tab2')">待巡查</span>
      <span :class="ac=='tab3'?'acs':''" @click="change('tab3')">已巡查</span>
    </div>

    <div class="content" ref="content">
      <div class="lan">
        <span class="xh">序号</span><span class="mc">企业名称</span><span :class="ac=='tab3'?'hidden':''">环保主任</span>
      </div>
      <div class="lan" v-for="(item, index) in list" @click="toggle(item)">
        <span class="xh">{{index+1}}</span>
        <span class="mc">{{item.enterpriseName}}</span>
        <slot v-if="ac=='tab3'">
          <span v-if="item.status!=0" class="blueb"></span>
          <span v-else class="redb"></span>
        </slot>
        <slot v-else>
          <span>{{item.username}}</span>
        </slot>
      </div>
    </div>

    <mu-drawer class="dra" :open="open" right>
      <div class="alert-head zd">
        <span class="al" @click.stop="open=false">返回</span>
        <span>每日一巡</span>
        <span class="hidden">隐藏</span>
      </div>
      <div class="rwp">
        <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="环保主任上报详情"></autoformPreview>
      </div>
      <!--复查 & 确认并提交-->
      <div class="secq" v-show="ac=='tab1'">
        <div class="secqb" @click="fucha">复查</div>
        <div class="secqb" @click="qrtj">确认并提交</div>
      </div>
      <!--end-->
      <!--推送执法-->
      <div class="secq" v-show="ac=='tab3'">
        <div v-show="nowItem.status == 0" class="secqb" @click="tszf">推送执法</div>
      </div>
      <!--end-->
    </mu-drawer>

    <mu-drawer class="dra" :open="fm" right>
      <autoForm title="环保主任上报表单"
                :formRetureFun="formRetureFun"
                :autoFormSuccessRoute="autoFormSuccessRoute"
                :serviceUrl="getUrl"
                :formData="form"
                :draftName="draftName"
                :draftId="getDraftId"
      ></autoForm>
    </mu-drawer>
    <alert v-model="dialog"
           :title="dialogTitle"
           @confirm="dialogConfirm"
           @cancel="dialogCancel"
           cancelable>{{dialogContext}}
    </alert>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {eventBus} from '../../eventBus/eventBus';
  import alert from '../../../UIcomponents/alert/alert.vue';
  import bindScrollAction from '../../scrollPlugin/scrollPlugin.js';
  import {dateTool} from '../../../gisComponets/tool/DateTool.js';
  import {formFillTool} from '../../../UIcomponents/autoForm/tool/FormFillTool';
  import {formItemShowTool} from '../../../UIcomponents/autoForm/tool/FormItemShowTool';
  import {huanbanzhurenData} from '../../../UIcomponents/autoForm/data/huanbaozhuren.js';
  import autoformPreview from '../../../UIcomponents/autoForm/autoformPreview.vue';
  import autoForm from '../../../UIcomponents/autoForm/autoForm.vue';
  import {formDraftTool} from '../../../UIcomponents/autoForm/tool/FormDraftTool';
  export default {
    components: {
      alert,
      autoformPreview,
      autoForm
    },
    data() {
      return {
        ac: 'tab1',
        list: [],
        nowItem: {
          id: 0,
          status: 0
        },
        open: false,
        fm: false,
        dialog: false,
        dialogTitle: '',
        dialogContext: '',
        confirmFun: null,
        cancelFun: null,
        status: 1,
        needLoad: true,
        page: 0,
        openperive: false,
        serviceUrl: POST_HUANBAOZHUREN_REPORT,
        form: [],
        autoFormSuccessRoute: "huanbaozhurenEvent",
        draftName: "huanbaozhurenEvent",
        draftId: "huanbaozhurenEvent",
        draftType: '1'
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      }),
      getUrl() {
        return this.serviceUrl + this.nowItem.id + '/rechecked';
      },
      getDraftId() {
        return '' + this.nowItem.id;
      }
    },
    methods: {
      back() {
        this.$router.push({name: 'hcStatistic', params: {row: 'one'}})
      },
      change(str) {
        if (str == this.ac) return false;
        this.ac = str;
        this.page = 0;
        this.needLoad = true;
        this.list = [];
        if (str == 'tab1') {
          this.status = 1
        } else if (str == 'tab2') {
          this.status = 0
        } else {
          this.status = 2
        }
        this.getList();
      },
      toggle(item) {
        if (this.ac == 'tab2') return false;
        this.open = true;
        this.nowItem = item;
        //获取详情
        this.openperive = true;
        this.$http.get(POST_HUANBAOZHUREN_REPORT + item.id + '/details').then((res) => {
          if (res.body.code == 200) {
            let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
            let obj = res.body.data;
            //填充表单
            formFillTool.fillForm(formClone, obj);
            //初始化父子关系
            formFillTool.initForm(formClone);
            //设置父子关系展示
            formItemShowTool.setShowByParent(formClone);
            //抛出详情展示事件
            eventBus.bus.emit(eventBus.LAMPYULAN, formClone);
            if (this.ac == 'tab1') {
              this.form = formClone;
            }
          }
        }).catch(err => {
        })
      },
      qrtj() {
        this.showDialog('是否确认提交', '', function () {
          this.tijiao();
        }, function () {
          this.dialog = false;
        });
      },
      tszf() {
        this.showDialog('是否推送执法', '', function () {
          this.zhifa(true);
        }, function () {
          this.zhifa(false);
          // this.dialog = false;
        });
      },
      fucha() {
        this.fm = true;
      },
      formRetureFun() {
        this.fm = false;
      },
      dialogConfirm() {
        if (typeof this.confirmFun === 'function') this.confirmFun();
      },
      dialogCancel() {
        if (typeof this.cancelFun === 'function') this.cancelFun();
      },
      showDialog(title, context, confirmFun, cancelFun) {
        this.dialog = true;
        this.dialogTitle = title;
        this.dialogContext = context;
        this.confirmFun = confirmFun;
        this.cancelFun = cancelFun;
      },
      getList() {
        if (!this.needLoad) return false;
        //status 0表示带巡查,1表示待确认,2表示已经巡查
        let date = new Date();
        let year = date.getFullYear();
        let mon = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        date = year + '-' + mon + '-' + day;
        this.$http.get(GET_HUANBAOZHUREN_REPORT + '?size=15&page=' + this.page + '&missionStatus=' + this.status + '&date=' + date + '&checkerId=' + this.getUserId).then(res => {
          let content = res.body.data.content;
          if (content.length == 0) {
            this.needLoad = false;
            return false;
          }
          this.list = this.list.concat(content);
          this.page += 1;
        }).catch(err => {
        });
      },
      tijiao() {
        this.$http.post(POST_HUANBAOZHUREN_REPORT + this.nowItem.id + '/confirmed').then((res) => {
          if (res.body.code == 200) {
            this.open = false;
            this.ac = 'tab3';
            this.status = 2;
            this.page = 0;
            this.list = [];
            this.getList();
          }
        }).catch(err => {
        })
      },
      zhifa(bool) {
        this.$http.patch(POST_HUANBAOZHUREN_REPORT + this.nowItem.id + '/handled/confirmed', {
          handle: bool
        }).then((res) => {
          if (res.body.code == 200) {
            this.open = false;
            this.ac = 'tab3';
            this.status = 2;
            this.page = 0;
            this.list = [];
            this.getList();
          }
        }).catch(err => {
        })
      }
    },
    mounted() {
      bindScrollAction(this.$refs.content, this.getList);
      document.addEventListener(eventBus.BACK_BUTTON, this.back, false);

      let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
      formFillTool.initForm(formClone, null);
      let draftForm = formDraftTool.getDraftByNameAndId(this.draftName, this.draftId, this.draftType);
      if (draftForm != null) {
        formFillTool.setFormParent(draftForm);
        this.form = draftForm;
      } else {
        this.form = formClone;
      }
    },
    destroyed(){
      document.removeEventListener(eventBus.BACK_BUTTON, this.back, false);
    }
  }
</script>

<style lang="less" scoped>
  .hhhd {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #30aafd;
    padding-left: 15px;

  span {
    color: #fff;
  }

  }
  .daily-wrap {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 75;
  }

  .al {
    margin-left: 10px;
    margin-right: -10px;
  }

  .thone {
    width: 100%;
    height: 56px;
  }

  .btns {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #efefef;

  span {
    width: 33.3%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-right: 1px solid #efefef;
  }

  span:last-child {
    border-right: none;
  }

  .acs {
    background-color: #30aafd;
    color: #fff;
  }

  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 5px;
    overflow-y: auto;
  }

  .cont {
    top: 56px;
    bottom: 70px;
  }

  .auto-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .lan {
    display: flex;
    width: 100%;
    padding: 5px 0;
    align-items: center;
    border-bottom: 1px solid #efefef;

  span {
    text-align: center;
  }

  .xh {
    width: 10%;
  }

  .mc {
    width: 65%;
    white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  }

  }
  .dra {
    width: 100%;
    z-index: 80;
  }

  .secq {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 300;
  }

  .secqb {
    width: 90px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    background-color: #30aafd;
    color: #fff;
  }

  .redb {
    display: inline-block;
    width: 10px;
    max-width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }

  .blueb {
    display: inline-block;
    width: 10px;
    max-width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: blue;
  }

  .zd {
    z-index: 300;
  }
  .rwp {
    position: absolute;
    left: 0;
    top: 55px;
    right: 0;
    bottom: 100px;
    overflow-y: auto;
  }
</style>
