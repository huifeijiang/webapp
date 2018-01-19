<template>
  <div class='newEventList'>
    <div class="alert-head" v-show="showHead">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">市小散乱污事件列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="event-title">
      <span>姓名</span>
      <span>类型</span>
      <span>时间</span>
      <span>地区</span>
    </div>
    <div class="event-wrap" ref="eventwrap">
      <div class="event-list" v-for="item in eventList" @click="toggle(item)">
        <span>{{item.username}}</span>
        <span>{{item.type}}</span>
        <span>{{(new Date(item.datetime).getMonth()+1)+'月'+(new Date(item.datetime).getDate())+'日'}}</span>
        <span>{{item.gridName}}</span>
      </div>
    </div>

    <mu-drawer id="wushui" right :open="open">
      <div class="alert-head">
        <mu-icon class="alert-left" @click="open=false" value="keyboard_arrow_left" />
        <span class="alert-title">市小散乱污事件详情</span>
        <span class="alert-right hidden">提交</span>
      </div>
      <div class="nothin"></div>
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
        this.$http.get(GET_WATER_EVENT_NEW + '?size=1000' + params).then((res) => {
          let data = res.body.data.content;
          this.eventList = data;
        }).catch((error) => {
        });
      },
      toggle(item){
        this.open = true;
        this.tableData = [];
        this.$http.get(GET_RIVER_EVENT_DETAIL_NEW + item.id + '/details').then((res) => {
          let obj = res.body.data;
          let arr = [];
          for (let param in obj) {
            let dt = {};
            switch (param) {
              case 'enterpriseName':
                dt.name = '单位名称';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 1;
                break;
              case 'enterpriseAddr':
                dt.name = '单位地址';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 2;
                break;
              case 'legalPersonName':
                dt.name = '法人代表';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 3;
                break;
              case 'legalPersonTel':
                dt.name = '法人代表联系电话';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 4;
                break;
              case 'envManager':
                dt.name = '环保责任人';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 5;
                break;
              case 'envManagerTel':
                dt.name = '环保责任人联系电话';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 6;
                break;
              case 'area':
                dt.name = '面积';
                dt.value = obj[param]?`${obj[param]}m²`:'';
                dt.show = true
                dt.sort = 7;
                break;
              case 'outputValue':
                dt.name = '产值';
                dt.value = obj[param]?`${obj[param]}万元`:'';
                dt.show = true
                dt.sort = 8
                break;
              case 'peopleCount':
                dt.name = '员工人数';
                dt.value = obj[param]?`${obj[param]}人`:'';
                dt.show = true
                dt.sort = 9
                break;
              case 'haveEnterpriseLicense':
                dt.name = '营业执照';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true
                dt.sort = 10
                break;
              case 'enterpriseLicense':
                dt.name = '统一社会信用代码';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 11
                break;
              case 'approvalProcedure':
                dt.name = '环保手续';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true
                dt.sort = 12
                break;
              case 'approvalNo':
                dt.name = '环保批文号';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 13
                break;
              case 'recordNo':
                dt.name = '登记备案号';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 14
                break;
              case 'industryType':
                dt.name = '行业类型';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 15
                break;
              case 'productTypesName':
                dt.name = '产品类型';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 16
                break;
              case 'craftsTypesName':
                dt.name = '主要生产工艺';
                dt.value = obj[param];
                dt.show = true
                dt.sort = 17
                break;
              case 'haveProductWater':
                dt.name = '生产废水';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true
                dt.sort = 18
                break;
              case 'usingOfWater':
                dt.name = '用水量';
                dt.value = obj[param]?`${obj[param]}吨/日`:'';
                dt.show = true;
                dt.sort = 19
                break;
              case 'outOfWater':
                dt.name = '废水排水量';
                dt.value = obj[param]?`${obj[param]}吨/日`:'';
                dt.show = true;
                dt.sort = 20
                break;
              case 'pollutantsTypesName':
                dt.name = '特征污染物';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 21
                break;
              case 'haveProductWaterHandle':
                dt.name = '生产废水处理及纳管情况';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true;
                dt.sort = 22
                break;
              case 'waterHandleStatus':
                dt.name = '生产废水处理情况';
                if (obj[param] == 0) {
                  dt.value = '未处理'
                } else if (obj[param] == 1) {
                  dt.value = '自建废水处理设施'
                } else {
                  dt.value = '拉运处理'
                }
                dt.show = true;
                dt.sort = 23
                break;
              case 'waterJustUnit':
                dt.name = '拉运单位';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 24
                break;
              case 'waterLastTime':
                dt.name = '最近一次拉运时间';
                if (!isNaN(obj[param]) && obj[param]) {
                  dt.value = (new Date(parseInt(obj[param]))).toLocaleDateString();
                } else {
                  dt.value = '';
                }
                dt.show = true;
                dt.sort = 25
                break;
              case 'waterProductStatus':
                dt.name = '废水排放达标情况';
                dt.value = obj[param] ? '达标排放' : '非达标排放';
                dt.show = true;
                dt.sort = 26
                break;
              case 'nanotubesStatus':
                dt.name = '纳管情况';
                if (obj[param] == 0) {
                  dt.value = '未纳管'
                } else if (obj[param] == 1) {
                  dt.value = '雨水管'
                } else {
                  dt.value = '污水管'
                }
                dt.show = true;
                dt.sort = 27
                break;
              case 'finalDestination':
                dt.name = '最终去向';
                dt.value = obj[param] ? '河流' : '污水厂';
                dt.show = true;
                dt.sort = 28
                break;
              case 'sewagePlant':
                dt.name = '污水厂';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 29
                break;
              case 'tributaries3':
                dt.name = '三级支流';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 30
                break;
              case 'tributaries2':
                dt.name = '二级支流';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 31
                break;
              case 'tributaries1':
                dt.name = '一级支流';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 32
                break;
              case 'mainStream':
                dt.name = '干流';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 33
                break;
              case 'dangerProductStatus':
                dt.name = '危废生产情况';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true;
                dt.sort = 34
                break;
              case 'dangerSpecies':
                dt.name = '种类';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 35
                break;
              case 'productValue':
                dt.name = '产生量';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 36
                break;
              case 'dangerProtocol':
                dt.name = '有无危废处置协议';
                dt.value = obj[param] ? '有' : '无';
                dt.show = true;
                dt.sort = 37
                break;
              case 'justUnit':
                dt.name = '危废处置单位';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 38
                break;
              case 'justUnitTime':
                dt.name = '最近一次拉运时间';
                if (!isNaN(obj[param]) && obj[param]) {
                  dt.value = (new Date(parseInt(obj[param]))).toLocaleDateString();
                } else {
                  dt.value = '';
                }
                dt.show = true;
                dt.sort = 39
                break;
              case 'lawEnforcement':
                dt.name = '是否需要执法整治';
                dt.value = obj[param] ? '是' : '否';
                dt.show = true;
                dt.sort = 40
                break;
              case 'lawEnforcementDemandName':
                dt.name = '整治要求';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 41
                break;
              case 'otherLawEnforcementDemand0':
                dt.name = '整治要求其他';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 42
                break;
              case 'describe':
                dt.name = '情况说明';
                dt.value = obj[param];
                dt.show = true;
                dt.sort = 43
                break;
              case 'gridId':
                dt.name = '社区网格';
                dt.value = item.gridName;
                dt.show = true;
                dt.sort = 44
                break;
              case 'datetime':
                dt.name = '上报时间';
//                dt.value = new Date(obj[param]).toLocaleDateString();
                dt.value = (new Date(obj[param]).getFullYear()) + '年' + (new Date(obj[param]).getMonth() + 1) + '月' + (new Date(obj[param]).getDate()) + '日';
                dt.show = true
                dt.sort = 45;
                break;
              case 'formImages':
                this.formImages = obj[param];
                break;
              default :
                dt = null;
                break;
            }
            arr.sort(function (a, b) {
              return a.sort - b.sort;
            });
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
      let height = window.innerHeight;
      let distance = 160;
//      this.$refs.tableWrap.style.height = height - 70 + 'px';
      let param = this.getUserId;
      let status = this.$route.params.status;
      if (status == true) {
        this.showHead = false;
        param = null;
        distance = 215;
      }
      this.$refs.eventwrap.style.height = height - distance + 'px';
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
    z-index: 80;
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

  .newEventList {
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
    display: flex;
    z-index: 80;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    border-bottom: 1px solid #efefef;
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

  .table-list-wrap {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    overflow-y: auto;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
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
    width: 49%;
    text-align: left;
  }

  .biao-right {
    width: 49%;
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
