<template>
  <div class='huanbaozhuren'>
    <div class="alert-head" v-show="showHead">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">环保主任上报列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="event-title event-list">
      <span class='sp'>企业</span>
      <!--<span>类型</span>-->
      <span class='datetime'>时间</span>
      <span class='spa'>地区</span>
    </div>
    <div class="event-wrap aadd" ref="eventwrap">
      <div class="event-list" v-for="item in eventList" @click="toggle(item)">
        <span class='sp'>{{item.enterpriseName}}</span>
        <!--<span class='sp'>{{item.type}}</span>-->
        <span class='datetime'>{{item.datetime}}</span>
        <span class='spa'>{{item.gridName}}</span>
      </div>
    </div>

    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title="环保主任事件详情" :backId='backId'></autoformPreview>
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
  export default {
    data() {
      return {
        eventList: [],
        open: false,
        showHead: true,
        tableData: [],
        formImages: [],
        openperive: false,
        backId:''
      }
    },
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      })
    },
    components: {
      autoformPreview
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      getEvent(id) {
        this.eventList = [];
        let params = '';
        if (id != null) {
          params = '&userId=' + id+'&noMissionStatus=0';
        }
        this.$http.get(GET_HUANBAOZHUREN_REPORT + '?size=5000' + params).then((res) => {
          let data = res.body.data.content;
          data.forEach((val, index) => {
            val.datetime = dateTool.toDate(new Date(Number(val.datetime)), 'yyyy年MM月dd日')
          })
          this.eventList = data;
        }).catch((error) => {
        });
      },
      showDetail(){
        this.openperive = true;
        this.tableData = [];
        let itemId = this.$route.params.id
        this.$http.get(POST_HUANBAOZHUREN_REPORT + itemId + '/details').then((res) => {
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
        }).catch(err => {
        })
      },
      toggle(item) {
        this.openperive = true;
        this.tableData = [];
        this.nowItem = item;
        this.$http.get(POST_HUANBAOZHUREN_REPORT + item.id + '/details').then((res) => {
          let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
          delete res.body.data.pushHandleTime
          let obj = res.body.data;
          //填充表单
          formFillTool.fillForm(formClone, obj);
          //初始化父子关系
          formFillTool.initForm(formClone);
          //设置父子关系展示
          formItemShowTool.setShowByParent(formClone);
          //抛出详情展示事件
          eventBus.bus.emit(eventBus.LAMPYULAN, formClone);
        }).catch(err => {
        })
      },
      compare(props) {
        return function (obj1, obj2) {
          let value1 = obj1[props];
          let value2 = obj2[props];
          return value1 - value2; // 升序
        }
      },
      backToMap() {
        if (this.open) {
          this.open = false;
        } else {
          this.$router.push("/home/heichouEvent");
        }
      }
    },
    mounted() {
      let distance = 160;
      let param = this.getUserId;
      let status = this.$route.params.status;
      if (status == true) {
        this.showHead = false;
        param = null;
        distance = 215;
      }
      this.getEvent(param);
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
      if(this.$route.params.id){
        this.showDetail();
        this.backId = this.$route.params.id
      }
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style scoped>
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
    background-color: #4BAAF4;
    box-shadow: 0 2px 4px 0px rgba(142, 180, 211, .5);
    color: #fff;
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
    font-size: 20px;
  }

  .huanbaozhuren {
    height: 100%;
    position: relative;
    z-index: 80;
  }

  .event-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    top: 56px;
    z-index: 80;
    align-items: center;
    font-size: 16px;
    background: #fff;
  }

  .event-wrap {
    width: 100%;
    height: 100% !important;
    padding-top: 102px;
    overflow-y: auto;
    background: #fff;
  }

  .hidden {
    visibility: hidden;
  }

  .onthin {
    height: 1px;
  }

  .datetime {
    width: 35%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }
  .event-list {
    width: 100%;
    padding: 10px 5px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }

  .event-list .sp {
    width: 50%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .event-list .spa{
    display: inline-block;
    text-align: center;
    width: 20%;
  }
  .table-list span {
    font-size: 14px;
    color: #6a6e7b;
  }

  .form-images-wrap p {
    font-size: 14px;
  }

  .form-images-wrap img {
    width: 100%;
  }
</style>
