<template>
  <div class="event-wrap">
    <head-dom v-show="showHead" v-on:back="backToHome" :type="'back'">任务列表</head-dom>
    <div class="nothin"></div>
    <div class="btns-wrap" :class="showHead?'margintop55':'margintop15'">
      <mu-tabs :value="activeTab">
        <mu-tab value="tab1" @click="handleTabChange('tab1',2)" :title="'待处理'+pendding"/>
        <mu-tab value="tab2" @click="handleTabChange('tab2',3)" :title="'已处理'+finish"/>
      </mu-tabs>
      <div class="aaa">
        <span class="width-50">企业</span>
        <span class="width-20">{{activeTab === 'tab1'?'巡查员':'执法员'}}</span>
        <span class="width-30">时间</span>
      </div>
    </div>
    <div class="news-wrap" ref="newsWrap" :class="showHead?'padd80':'paddbottom'">
      <div v-if="activeTab === 'tab1'">
        <div class="list-event border-1px" v-for="(item,index) in list" :key="index" @click="toggle(item,false)">
          <div class="item-name width-50">{{index+1}}.{{item.enterpriseName}}</div>
          <div class="item-name width-20">{{item.checker}}</div>
          <div class="item-name timesa width-30">{{item.checkTime != null ? new Date(item.checkTime).toLocaleDateString():''}}</div>
        </div>

      </div>
      <div v-else>
        <div class="list-event  border-1px" v-for="(item,index) in list" :key="index" @click="toggle(item,true)">
          <div class="item-name width-50">{{index+1}}.{{item.enterpriseName}}</div>
          <div class="item-name width-20">{{item.handler}}</div>
          <div class="item-name timesa width-30">{{new Date(item.handleTime).toLocaleDateString()}}</div>
        </div>
      </div>
    </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    <!-- <mu-drawer class="news-alert" right :open="open">
      
    </mu-drawer> -->
    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="环保主任事件详情">
      <handle-detail @toggleOne="backToPage" @toggleTwo="showEvent" :tableData="tableData" :done="eventDone"
                     :doneMess="doneDetail" :showButton="showHead" :detailImage="detailImage" slot="foot"></handle-detail>
    </autoformPreview>
    <!-- <div class="banlian" @click="showEvent" v-show="openperive">开始办理</div> -->
    

    <mu-drawer class="news-alert" right :open="opentwo">
      <div class="alert-head">
        <span class="alert-left" @click="backHandletwo">返回</span>
        <span class="alert-title">事件处理</span>
        <span class="alert-right" @click="showdialog">完成</span>
      </div>
      <div class="nothin"></div>
      <div class="select-event" ref="select">
        <p>*请选择办理情况</p>
        <div class="event-btn" v-for="item in eventBtn" @click="selectItem(item)">
          <mu-raised-button :label="item.name" :class="item.selected?'active-btn':''" fullWidth/>
        </div>
      </div>
      <div class="news-content" ref="newsContent">
        <div class="title">请上传办理图片</div>
        <photograph></photograph>
        <mu-dialog :open="textValueNull" title="提示">
          {{tip}}
          <mu-flat-button slot="actions" @click="close" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="submit" label="确定"/>
        </mu-dialog>

      </div>
      <p class="zhoumoc">处理情况描述：</p>
      <div class="dan">
        <mu-text-field hintText="请输入文字描述。" v-model="handleDescribe" multiLine :rows="3" :rowsMax="6" fullWidth/>
      </div>
    </mu-drawer>
    <mu-drawer class="news-alert" right :open="openthr">
      <div class="alert-head">
        <span class="alert-left" @click="toggleThr">返回</span>
        <span class="alert-title">选择详细</span>
        <span class="alert-right hidden">隐藏</span>
      </div>
      <div class="nothin"></div>
      <div class="alert-wrap">
        <div class="event-alert" v-for="item in eventBtnAlert" @click="selectMore(item)">
          <mu-raised-button :label="item.name" :class="item.selected?'active-btn':''" fullWidth/>
        </div>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
  import headDom from '../../UIcomponents/header/head';
  import {
    eventBus
  } from '../../components/eventBus/eventBus';
  import handleDetail from './handleEventDetail';
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import photograph from '../../UIcomponents/photoGraph/PhotoGraph';
  import {
    dateTool
  } from '../../gisComponets/tool/DateTool.js';
  import {
    formFillTool
  } from '../../UIcomponents/autoForm/tool/FormFillTool';
  import {
    formItemShowTool
  } from '../../UIcomponents/autoForm/tool/FormItemShowTool';
  import {
    huanbanzhurenData
  } from '../../UIcomponents/autoForm/data/huanbaozhuren.js';
  import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
  //import { news, notice } from './newsData.js';
  export default {
    components: {
      headDom,
      handleDetail,
      photograph,
      autoformPreview
    },
    created() {
//      this.newsData = news;
//      this.messageData = notice;
    },
    data() {
      return {
        handleDescribe: '',
        scroller: '',
        loading: false,
        showHead: true,
        tip: '请确定是否提交',
        activeTab: 'tab1',
//        newsData: [],
        messageData: [],
        open: false,
        opentwo: false,
        openthr: false,
        nowItem: null,
        textValueNull: false,
        imgList: [],
        eventBtn: [{
          name: '限期更改',
          selected: false
        }, {
          name: '立案查处',
          selected: false
        }, {
          name: '无违法违规行为',
          selected: false
        }],
        eventBtnAlert: [{
          name: '责令改正决定书',
          selected: false
        }, {
          name: '查封/扣押',
          selected: false
        }, {
          name: '移交行政拘留',
          selected: false
        }, {
          name: '涉嫌环境违法',
          selected: false
        },],
        selectedItem: null,
        tableData: [],
        pendding: "",
        finish: "",
        list: [],
        eventDone: false,
        images: [],
        doneDetail: {},
        detailImage: [],
        pageOne: 1,
        status: 2,
        openperive: false
      }
    },
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      })
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow'
      }),
      backToHome() {
        this.setMapShow(true);
        this.$router.push({name: 'home', params: {name: true}});

      },
      toggle(item, bool) {
        this.open = !this.open;
        this.nowItem = item;
        if (bool) {
          //已处理
          this.eventDone = true;
          this.getHB(item.id,true)
          
        } else {
          this.eventDone = false;
          this.getHB(item.id,false)
        }
        this.getCompany(item);
      },
      getHB(id,bool){
        this.openperive = true;
        this.$http.get(POST_HUANBAOZHUREN_REPORT + id + '/details').then((res) => {
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
          if(bool) this.showDetail();
        }).catch(err => {
        })
      },
      handleTabChange(val, status) {
        this.status = status;
        this.loading = false;
        this.pageOne = 1;
        this.$refs.newsWrap.scrollTop = 0;
        if (val != this.activeTab) {
          this.activeTab = val;
        }
        ;
        let userId = this.getUserId;
        if (!this.showHead) {
          userId = '';
        }
        this.$http.get(GET_HCZ_LIST + "?status=" + status + '&handlerId=' + userId + '&size=200').then(res => {
          let ress = res.body.data.content;
          this.list = ress;
        }).catch((err) => {
          console.log(err)
        });
      },
      backToPage(bool) {
        this.open = false;
        // this.getNums();
        // this.handleTabChange('tab1', 2);
      },
      close(e) {
        e.preventDefault();
        this.textValueNull = false;
      },
      backHandle: function (e) {
        e.preventDefault();
        if (this.open) {
          this.open = false;
        } else if (this.opentwo) {
          this.opentwo = false;
        } else if(this.openthr){
          this.openthr = false
        }else{
          this.backToHome();
        }
      },
      backHandletwo: function (e) {
        e.preventDefault();
        this.opentwo = false;

      },
      submit() {
        if (this.selectedItem == null) {
          this.textValueNull = false;
          return false;
        } else if (this.selectedItem == "立案查处,") {
          this.textValueNull = false;
          return false;
        } else {
          let nowItem = this.nowItem;
          let id = nowItem.id;
          let means = this.selectedItem;
          let handleDescribe = this.handleDescribe;
          let images = [];
          for (let key in this.imgList) {
            let item = this.imgList[key];
            let type = item.type;
            if (type === "plus") {
              continue;
            }
            images.push(item.src);
          }
          this.$http.post(POST_HCZ_SUB + id +'/handled', {
            means: means,
            images: images,
            handleDescribe: handleDescribe
          }).then(res => {
            let code = res.body.code;
            let msg = res.body.msg;
            if (code == "403") {
              this.tip = msg;
            }
            if (code == "200") {
              this.tip = "处理成功";
              this.opentwo = false;
              this.open = true;
              this.imgList = [];
              this.selectedItem = null;
              this.handleTabChange('tab1', 1);
              this.showDetail();
              this.handleDescribe = '';
            }
          }).catch((err) => {
            console.log(err)
          });
        }
        setTimeout(() => {
          this.textValueNull = false;
        }, 1000)
      },
      showDetail() {
        this.detailImage = [];
        this.eventDone = true;
        this.$http.get(GET_HC_HISTORY + this.nowItem.id +'/details').then((res) => {
          this.doneDetail = res.body.data;
          this.detailImage = res.body.data.images;
        }).catch((error) => {
        })
      },
      selectItem(item) {
        for (let i = 0; i < this.eventBtn.length; i++) {
          this.eventBtn[i].selected = false;
        }
        if (item.name == '立案查处') {
          this.openthr = true;
          item.selected = true;
          return;
        }
        item.selected = true;
        this.selectedItem = item.name;
      },
      selectMore(item) {
        item.selected = !item.selected;
      },
      toggleThr() {
        this.openthr = false;
        let str = '立案查处,';
        let that = this;
        for (let i = 0; i < that.eventBtnAlert.length; i++) {
          if (that.eventBtnAlert[i].selected == true) {
            str += that.eventBtnAlert[i].name + ',';
          }
        }
        this.selectedItem = str;
      },
      showEvent() {
        this.opentwo = true;
        eventBus.bus.emit('clearImage');
      },
      showdialog() {
        if (this.selectedItem == null) {
          this.tip = '请选择办理情况';
        } else if (this.selectedItem == "立案查处,") {
          this.tip = '请选择立案查处详情';
        } else {
          this.tip = '请确定是否提交';
        }
        this.textValueNull = true;
      },
      getCompany(item){
        try{
        this.tableData = [];
        this.$http.get(GET_HC_HISTORY + item.id + '/details').then((res) => {
          let obj = res.data.data;
          let arr = [];
          for (let param in obj) {
            let dt = {};
            switch (param) {
              case 'enterpriseName':
                dt.name = '单位名称';
                dt.value = obj[param];
                break;
              case 'enterpriseAddr':
                dt.name = '单位地址';
                dt.value = obj[param];
                break;
              case 'enterpriseLicense':
                dt.name = '营业执照';
                if (obj[param] == 'false') {
                  dt.value = '无'
                } else {
                  dt.value = obj[param];
                }
                break;
              case 'legalPersonName':
                dt.name = '法人代表';
                dt.value = obj[param];
                break;
              case 'legalPersonTel':
                dt.name = '法人代表联系电话';
                dt.value = obj[param];

                break;
              case 'enterpriseContactsName':
                dt.name = '企业联系人';
                dt.value = obj[param];
                break;
              case 'enterpriseContactsTel':
                dt.name = '企业联系人电话';
                dt.value = obj[param];
                break;
              case 'productTypeNames':
                dt.name = '可能产生废水的产品类别';
                dt.value = obj[param];             
                break;
              case 'craftNames':
                dt.name = '可能产生废水的主要生产工艺';
                dt.value = obj[param];
                break;
              case 'approvalNo':
                dt.name = '环保批文';
                dt.value = obj[param];
                break;
              case 'isProduceWastewater':
                dt.name = '生产废水';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'isOutWastewater':
                dt.name = '废水直排';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'isWastewaterFacility':
                dt.name = '废水处理设施';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'describe':
                dt.name = '情况说明';
                dt.value = obj[param];
                break;
              case 'isLawEnforcement':
                dt.name = '是否需要执法整治';
                dt.value = obj[param] ? '是' : '否';
                break;
              case 'gridId':
                dt.name = '社区网格';
                dt.value = item.gridName;
                break;
              case 'userId':
                dt.name = '巡查员';
                dt.value = item.username;
                break;
              case 'datetime':
                dt.name = '推送执法时间';
                dt.value = new Date(item.datetime).toLocaleDateString();
                break;
              case 'type':
                dt.name = '执法事件等级';
                dt.value = obj[param] ? obj[param] : '';
                break;
              default:
                dt = null;
                break;
            }
            if (dt != null) arr.push(dt);
          }
          this.tableData = arr;
        }).catch((error) => {
          console.log(error)
        });
      }catch(e) {
        console.log(e)  
      }
      },
      getNums() {
        let userId = this.getUserId;
        if (!this.showHead) {
          userId = '';
        }
        this.$http.get(GET_HCZ_TONGJI + '?handlerId=' + userId).then((res) => {
          let obj = res.body.data;
          this.finish = obj.finish;
          this.pendding = obj.pendding;
        }).catch((err) => {
          console.log(err)
        });
      },
      addImageList: function (imageList) {
        this.imgList = imageList;
      },
      loadMore() {
        this.loading = true;
        let page = this.pageOne;
        let userId = '';
        if (this.showHead) {
          userId = this.getUserId;
        }
        this.$http.get(GET_HCZ_LIST + "?status=" + this.status + '&handlerId=' + userId + '&size=40' + '&page=' + page).then(res => {
          let ress = res.body.data.content;
          if (res.body.data.last && ress.length == 0) {
            this.loading = false;
            return;
          }
          for (let i in ress) {
            this.list.push(ress[i]);
          }
          this.pageOne += 1;
          this.loading = false;
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    mounted() {
      let showHead = this.$route.params.status;
      if (showHead == true) {
        this.showHead = false;
      }
      this.scroller = this.$refs.newsWrap;
      let height = window.innerHeight;
//      this.$refs.newsWrap.style.height = height - 109 + 'px';
      this.getNums();
      document.addEventListener(eventBus.BACK_BUTTON, this.backHandle, false);
      this.handleTabChange('tab1', 2);
      eventBus.bus.addListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backHandle, false);
      eventBus.bus.removeListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
    }

  }
</script>

<style scoped>
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

  .event-wrap {
    position: relative;
    background: #fff;
    z-index: 80;
    height: 100%;
  }

  .aaa {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    background: #fff;
  }

  .aaa span {
    display: inline-block;
    text-align: center;
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

  .timesa {
    width: 35% !important;
  }

  .typeaa {
    width: 15% !important;
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

  .dan .mu-text-field-textarea {
    text-indent: 20px;
  }

  .dan .mu-text-field-hint {
    left: 0
  }

  .list-event {
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .title {
    border-bottom: 1px dashed #e3e5e9;
    text-indent: 20px;
    height: 35px;
    line-height: 35px;
  }

  .zhoumoc {
    height: 35px;
    line-height: 35px;
    text-indent: 20px;
    margin: 0;
  }

  .item-name {
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 33.33%;
  }
  .width-50 {
    width: 50%;
  }
  .width-30 {
    width: 30%;
  }
  .width-20 {
    width: 20%;
  }
  .btns-wrap {
    position: fixed;
    z-index: 80;
    top: 56px;
    width: 100%;
  }

  .margintop55 {
    /*margin-top: 65px;*/
  }

  .margintop15 {
    /*margin-top: 29px;*/
  }

  .news-btns {
    display: flex;
    width: 94%;
    margin: 0 auto;
    border: 1px solid #54A4D7;
    border-radius: 2px;
  }

  .btn-n {
    width: 50%;
    font-size: 14px;
    text-align: center;
    padding: 5px 0;
    color: #54A4D7;
  }

  .borright {
    border-right: 1px solid #54A4D7;
  }

  .active {
    background-color: #54A4D7;
    color: #fff;
  }

  .active-btn {
    background-color: #2196f3;
    color: #fff;
  }

  .nothin {
    height: 1px;
  }

  /*.news-tab {*/
  /*margin-top: 55px;*/
  /*}*/

  .news-wrap {
    width: 100%;
    height: 100% !important;
    overflow-y: auto;
    background-color: #fff;
    padding-top: 145px;
  }

  /*.news-list {*/
  /*width: 100%;*/
  /*padding: 5px 0;*/
  /*display: flex;*/
  /*display: -webkit-flex;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*border-bottom: 1px solid #ccc;*/
  /*}*/

  .news-list span {
    display: -webkit-box;
    max-width: 60%;
    flex-grow: 1;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .news-list .img-wrap {
    width: 32%;
    border-radius: 5px;
    margin-right: 5px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .img-wrap img {
    display: block;
    width: 100%;
  }

  .news-alert {
    width: 100%;
    z-index: 400;
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

  .alert-back {
    padding: 15px 5px;
    margin-left: 20px;
    color: #fff;
    font-size: 14px;
  }

  .news-content {
    margin: 0 auto;
    overflow-y: auto;
  }

  .alert-p {
    width: 100%;
    max-height: 97px;
    display: -webkit-box;
    padding-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .alert-img-title {
    font-size: 12px;
    color: #ccc;
  }

  .alert-img {
    padding: 8px;
    box-sizing: border-box;
    background-color: #ccc;
    border-radius: 5px;
    margin-bottom: 30px;
  }

  .alert-img img {
    display: block;
    width: 100%;
    border: none;
  }

  .news-detail {
    text-indent: 28px;
    line-height: 24px;
  }

  .select-event {
    margin-top: 55px;
  }

  .select-event p {
    height: 35px;
    line-height: 35px;
    text-indent: 20px;
    margin: 0;
  }

  .paddbottom {
    padding-bottom: 160px;
  }

  .hidden {
    visibility: hidden;
  }

  .alert-wrap {
    margin-top: 55px;
  }
  .banlian {
    position: fixed;
    left: 50%;
    bottom: 20px;
    width: 120px;
    margin-left: -60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color:  #30aafd;
    color: #fff;
    border-radius: 5px;
    z-index: 300;
  }
</style>
