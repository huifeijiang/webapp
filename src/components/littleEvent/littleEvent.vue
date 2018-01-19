<template>
  <div>
    <div class="alert-head" v-show="showHead">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">小散乱污事件列表</span>
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
        <span>{{item.username}}</span>
        <span>{{item.type}}</span>
        <span>{{(new Date(item.datatime).getMonth()+1)+'月'+(new Date(item.datatime).getDate())+'日'}}</span>
        <span>{{item.gridName}}</span>
      </div>
    </div>
    <mu-drawer id="wushui" right :open="open">
      <div class="alert-head">
        <mu-icon class="alert-left" @click="open=false" value="keyboard_arrow_left" />
        <span class="alert-title">小散乱污事件详情</span>
        <span class="alert-right hidden">提交</span>
      </div>
      <div class="table-list-wrap" ref="tableWrap">
          <div class="table-list" v-for="item in tableData" v-show='item.show'>
            <span class="biao-left">{{item.name}}</span>
            <span class="biao-right">{{item.value}}</span>
          </div>
          <div class="form-images-wrap">
            <p>图片详情</p>
            <img v-for="i in formImages" :src="i" alt="">
          </div>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  import {dateTool} from '../../gisComponets/tool/DateTool.js';

  export default {
    data(){
      return {
        eventList: [],
        open: false,
        tableData: [],
        showHead: true,
        formImages: []
      }
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
      getEvent(id){
        this.eventList = [];
        let params = '';
        if (id != null) {
          params = '&userId=' + id;
        }
        this.$http.get(GET_WATER_EVENT + '?size=1000' + params).then((res) => {
          let data = res.body.data.content;
          this.eventList = data;
        }).catch((error) => {
        });
      },
      toggle(item){
        this.open = true;
        this.tableData = [];
        this.$http.get(GET_RIVER_EVENT_DETAIL + item.id + '/details').then((res) => {
          let obj = res.body.data;
          let arr = [];
          for (let param in obj) {
            let dt = {};
            switch (param) {
              case 'enterpriseName':
                dt.name = '单位名称';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'enterpriseAddr':
                dt.name = '单位地址';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'enterpriseLicense':
                dt.name = '营业执照';
                dt.value = obj[param]=='false'?'无':obj[param];
                dt.show = true
                break;
              case 'industryType':
                dt.name = '行业类型';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'legalPersonName':
                dt.name = '法人代表';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'legalPersonTel':
                dt.name = '法人代表联系电话';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'enterpriseContactsName':
                dt.name = '企业联系人';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'enterpriseContactsTel':
                dt.name = '企业联系人电话';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'productTypeNames':
                dt.name = '可能产生废水的产品类别';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'craftNames':
                dt.name = '可能产生废水的主要生产工艺';
                dt.value = obj[param];
                dt.show = true
                break;
              case 'approvalNo':
                dt.name = '环保批文';
                dt.value = obj[param]=='false'?'无':obj[param];
                dt.show = true
                break;
              case 'isProduceWastewater':
                dt.name = '生产废水';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true
                break;
              case 'usingOfWater':
                if (obj['isProduceWastewater']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '用水量';
                dt.value = obj[param]?`${obj[param]}吨/日`:'';
                break;
              case 'outOfWater':
                if (obj['isProduceWastewater']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '排水量';
                dt.value = obj[param]?`${obj[param]}吨/日`:'';
                break;
              case 'isOutWastewater':
                if (obj['isProduceWastewater']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废水直排';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'isWastewaterFacility':
                if (obj['isProduceWastewater']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废水处理设施';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'waterHandleTypeName':
                if (obj['isProduceWastewater'] && obj['isWastewaterFacility']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废水处理方式';
                dt.value = obj[param];
                break;
              case 'wastewaterOutStatus':
                if (obj['isProduceWastewater']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '现状污水排放情况';
                dt.value = obj[param];
                break;
              case 'produceGas':
                dt.name = '生产废气';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true;
                break;
              case 'outGas':
                if (obj['produceGas']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废气直排';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'gasFacility':
                if (obj['produceGas']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废气处理设施';
                dt.value = obj[param] ? '有' : '无';
                break;
              case 'gasFacilityTypeName':
                if (obj['produceGas']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废气处理设施类型';
                dt.value = obj[param];
                break;
              case 'gasFacilityFreqName':
                if (obj['produceGas']) {
                  dt.show = true
                } else {
                  dt.show = false
                }
                dt.name = '废气处理设施维护频次';
                dt.value = obj[param];
                break;
              case 'finalDestination':
                dt.name = '最终去向';
                dt.value = obj[param];
                dt.show = true;
                break;
              case 'describe':
                dt.name = '情况说明';
                dt.value = obj[param];
                dt.show = true;
                break;
              case 'isLawEnforcement':
                dt.name = '是否需要执法整治';
                dt.value = obj[param] ? '是' : '否';
                dt.show = true;
                break;
              case 'riverName':
                dt.name = '附近河流';
                dt.value = obj[param]? obj[param]:'不清楚';
                dt.show = true;
                break;
              case 'gridId':
                dt.name = '社区网格';
                dt.value = item.gridName;
                dt.show = true;
                break;
              case 'userId':
                dt.name = '调查人员';
                dt.value = item.username;
                dt.show = true;
                break;
              case 'datatime':
                dt.name = '调查时间';
//                dt.value = (new Date(item.datatime).toLocaleString('chinese', {hour12: false}));
                dt.value = dateTool.toDate(new Date(item.datatime),'yyyy年MM月dd日');
                dt.show = true;
                break;
              case 'type':
                dt.name = '执法事件等级';
                dt.value = obj[param] ? obj[param] : '';
                dt.show = true;
                break;
              case 'formImages':
                this.formImages = obj[param]
                break;
              default :
                dt = null;
                break;
            }
            if (dt !== null) arr.push(dt);

          }
          this.tableData = arr;

        }).catch((error) => {
        });
      },
      backToMap(){
        if (this.open) {
          this.open = false;
        } else {
//          this.setMapShow(true);
          this.$router.push("/home/heichouEvent");
        }
      }
    },
    mounted(){
      let distance = 160;
      let param = this.getUserId;
      let status = this.$route.params.status;
      if (status == true) {
        this.showHead = false;
        param = null;
        distance = 215;
      }
      //this.$refs.eventwrap.style.height = height - distance + 'px';
      this.getEvent(param);
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
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

  .table-list-wrap {
    width: 100%;
    height:100%;
    overflow-y: auto;
    padding-top: 55px;
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

  .event-list span {
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

  .table-title {
    font-size: 16px;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    font-weight: bold;
  }

  .table-list {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #efefef;
    justify-content: space-between;
  }

  .table-list span {
    font-size: 14px;
    color: #6a6e7b;
  }

  .biao-left {
    /*width: 49%;*/
    text-align: left;
  }

  .biao-right {
    width: 69%;
    text-align: right;
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
