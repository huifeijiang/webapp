<template>
  <div>
    <div class="alert-head" v-show="showHead">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">小废水企业排查列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="event-title">
      <span>姓名</span>
      <span>类型</span>
      <span>时间</span>
      <span>地区</span>
    </div>
    <div class="event-wrap aadd" ref="eventwrap">
      <div class="event-list" v-for="item in eventList" @click="toggle(item)">
        <span class='sp'>{{item.username}}</span>
        <span class='sp'>{{item.type}}</span>
        <span class='datetime'>{{item.datetime}}</span>
        <span class='sp'>{{item.gridName}}</span>
      </div>
    </div>
    <autoformPreview :isShowSubmit="false" :openyulan="openperive" title='小废水企业排查详情'></autoformPreview>
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
  import {formFillTool} from '../../UIcomponents/autoForm/tool/FormFillTool';
  import {formItemShowTool} from '../../UIcomponents/autoForm/tool/FormItemShowTool';
  import {xiaofeishuiCompanyData} from '../../UIcomponents/autoForm/data/xiaofeishuiCompanyData';
  import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';


  export default {
    data() {
      return {
        eventList: [],
        open: false,
        showHead: true,
        formImages: [],
        openperive: false,
      }
    },
    components: {
      autoformPreview: autoformPreview
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
      getEvent(id) {
        this.eventList = [];
        let params = '';
        if (id != null) {
          params = '&userId=' + id;
        }
        this.$http.get(GET_WASTEWATER_COMLIST + '?size=500' + params).then((res) => {
          let data = res.body.data.content;
          data.forEach((val, index) => {
            val.datetime = dateTool.toDate(new Date(Number(val.datetime)), 'yyyy年MM月dd日')
          })
          this.eventList = data;
        }).catch((error) => {
        });
      },
      toggle(item) {
          //点击当前行打开当前行的详情页
        this.openperive = true;
        let formClone = formFillTool.formClone(xiaofeishuiCompanyData.xiaofeishuiCompanyDataJson.form);
        this.$http.get(GET_WASTEWATER_COMDETAIL + item.id + '/details').then((res) => {
          let obj = res.body.data;
          //填充表单
          formFillTool.fillForm(formClone, obj);
          //初始化父子关系
          formFillTool.initForm(formClone);
          //设置父子关系展示
          formItemShowTool.setShowByParent(formClone);
          //抛出详情展示事件
          eventBus.bus.emit(eventBus.LAMPYULAN, formClone);
        }).catch((error) => {
        });
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
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style scoped>
  #wushui {
    width: 100%;
    background-color: #fff;
    z-index: 80;
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
    background-color: #4BAAF4;
    box-shadow: 0 2px 4px 0px rgba(142, 180, 211, .5);
    color: #fff;
  }

  .alert-left {
    position:absolute;
    left: 15px;
  }

  .alert-right {
    position:absolute;
    right: 15px;
  }

  .alert-title {
    font-size: 20px;
  }

  .aadd {
    position: absolute;
    top: 96px;
    left: 0;
    right: 0;
    overflow: auto;
    background: #fff;
    z-index: 80;
    bottom: 0;
  }

  .hidden {
    visibility: hidden;
  }

  .onthin {
    height: 1px;
  }

  .table-list-wrap {
    width: 92%;
    margin: 0 auto;
    position: absolute;
    overflow-y: auto;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .datetime {
    width: 30%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }

  .event-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 56px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    border-bottom: 1px solid #efefef;
  }

  .event-wrap {
    width: 100%;
    overflow-y: auto;
  }

  .event-list {
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #efefef;
  }

  .event-list .sp {
    width: 25%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }

  /*.table-list-wrap {*/
    /*width: 92%;*/
    /*margin: 0 auto;*/
    /*overflow-y: auto;*/
    /*max-height: 100%;*/
  /*}*/

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
