<template>
  <div>
    <div class="alert-head" v-show="showHead">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">在管工业列表</span>
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
    <mu-drawer id="wushui" right :open="open">
      <div class="alert-head">
        <mu-icon class="alert-left" @click="open=false" value="keyboard_arrow_left" />
        <span class="alert-title">在管工业事件详情</span>
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
    export default {
        data() {
            return {
                eventList: [],
                open: false,
                showHead: true,
                tableData: [],
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
            getEvent(id) {
                this.eventList = [];
                let params = '';
                if (id != null) {
                    params = '&userId=' + id;
                }
                this.$http.get(GET_INDUSTRIAL + '?size=500' + params).then((res) => {
                    let data = res.body.data.content;
                    data.forEach((val, index) => {
                        val.datetime = dateTool.toDate(new Date(Number(val.datetime)), 'yyyy年MM月dd日')
                    })
                    this.eventList = data;
                }).catch((error) => {});
            },
            toggle(item) {
                this.open = true;
                //        eventBus.bus.emit('openDetailPage', item)
                this.tableData = [];
                this.$http.get(GET_INDUSTRIAL + item.id + '/details').then((res) => {
                    let obj = res.body.data;
                    let arr = [];
                    for (let param in obj) {
                        let dt = {};
                        switch (param) {
                            case 'enterpriseName':
                                dt.name = '企业名称';
                                dt.value = obj[param];
                                dt.show = true;
                                dt.sort = 1;
                                break;
                            case 'enterpriseAddr':
                                dt.name = '企业地址';
                                dt.value = obj[param];
                                dt.sort = 2;
                                dt.show = true
                                break;
                            case 'legalPersonName':
                                dt.name = '法人代表';
                                dt.value = obj[param];
                                dt.sort = 3;
                                dt.show = true
                                break;
                            case 'legalPersonTel':
                                dt.name = '法人代表联系电话';
                                dt.value = obj[param];
                                dt.sort = 4;
                                dt.show = true
                                break;
                            case 'envManager':
                                dt.name = '环保负责人';
                                dt.value = obj[param];
                                dt.sort = 5;
                                dt.show = true
                                break;
                            case 'envManagerTel':
                                dt.name = '环保负责人联系电话';
                                dt.value = obj[param];
                                dt.sort = 6;
                                dt.show = true
                                break;
                            case 'area':
                                dt.name = '面积';
                                dt.value = obj[param]?`${obj[param]}m²`:'';
                                dt.sort = 7;
                                dt.show = true
                                break;
                            case 'outputValue':
                                dt.name = '产值';
                                dt.value = obj[param]?`${obj[param]}万元`:'';
                                dt.sort = 8;
                                dt.show = true
                                break;
                            case 'peopleCount':
                                dt.name = '员工人数';
                                dt.value = obj[param]?`${obj[param]}人`:'';
                                dt.sort = 9;
                                dt.show = true
                                break;
                            case 'haveEnterpriseLicense':
                                dt.name = '营业执照';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.sort = 10;
                                dt.show = true
                                break;
                            case 'enterpriseLicense':
                                dt.name = '统一社会信用代码';
                                dt.value = obj[param];
                                dt.show = obj['haveEnterpriseLicense'] == '0' ? false : true;
                                dt.sort = 11;
                                break;
                            case 'industryType':
                                dt.name = '行业类型';
                                dt.value = obj[param];
                                dt.show = true;
                                dt.sort = 11.2;
                                break;
                            case 'haveApproval':
                                dt.name = '环保批文';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.sort = 12;
                                dt.show = true
                                break;
                            case 'approvalNo':
                                dt.name = '环保批文号';
                                dt.value = obj[param];
                                dt.show = obj['haveApproval'] == '0' ? false : true;
                                dt.sort = 13;
                                break;
                            case 'approvalTime':
                                dt.name = '审批时间';
                                dt.value = dateTool.toDate(new Date(Number(obj[param])), 'yyyy年MM月dd日');
                                dt.show = obj['haveApproval'] == '0' ? false : true;
                                dt.sort = 14;
                                break;
                            case 'approvalWater':
                                dt.name = '审批水量';
                                dt.value = obj[param]?`${obj[param]}吨`:'';
                                dt.show = obj['haveApproval'] == '0' ? false : true;
                                dt.sort = 15;
                                break;
                            case 'productTypesName':
                                dt.name = '产品类别';
                                dt.value = obj[param];
                                dt.sort = 16;
                                dt.show = true
                                break;
                            case 'craftsTypesName':
                                dt.name = '主要生产工艺';
                                dt.value = obj[param];
                                dt.sort = 17;
                                dt.show = true
                                break;
                            case 'haveProductWater':
                                dt.name = '生产废水';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.sort = 18;
                                dt.show = true
                                break;
                            case 'usingOfWater':
                                dt.name = '用水量';
                                dt.value = obj[param]?`${obj[param]}吨/日`:'';
                                dt.show = obj['haveProductWater'] == '0' ? false : true;
                                dt.sort = 19;
                                break;
                            case 'outOfWater':
                                dt.name = '废水排放量';
                                dt.value = obj[param]?`${obj[param]}吨/日`:'';
                                dt.show = obj['haveProductWater'] == '0' ? false : true;
                                dt.sort = 20;
                                break;
                            case 'outStatus':
                                dt.name = '废水达标情况';
                                if(obj[param] == 1){
                                    dt.value = '达标排放';
                                }
                                if(obj[param] == 0){
                                    dt.value = '未达标排放';
                                }
                                dt.show = obj['haveProductWater'] == '0' ? false : true;
                                dt.sort = 20;
                                break;

                            case 'pollutantsTypesName':
                                dt.name = '特征污染物';
                                dt.value = obj[param]
                                dt.show = obj['haveProductWater'] == '0' ? false : true;
                                dt.sort = 21;
                                break;
                            case 'nanotubesStatusName':
                                dt.name = '纳管情况';
                                dt.value = obj[param];
                                dt.sort = 22;
                                dt.show = true
                                break;
                            case 'finalDestination':
                                dt.name = '最终去向';
                                dt.value = obj[param] == 0 ?'污水厂':'河流';
                                dt.sort = 22.1;
                                dt.show = true
                                break;
                            case 'sewagePlant':
                                dt.name = '污水厂';
                                dt.value = obj[param];
                                dt.sort = 22.11;
                                dt.show = true
                                break;
                            case 'tributaries1':
                                dt.name = '一级支流';
                                dt.value = obj[param];
                                dt.sort = 22.2;
                                dt.show = true
                                break;
                            case 'tributaries2':
                                dt.name = '二级支流';
                                dt.value = obj[param];
                                dt.sort = 22.3;
                                dt.show = true
                                break;
                            case 'tributaries3':
                                dt.name = '三级支流';
                                dt.value = obj[param];
                                dt.sort = 22.4;
                                dt.show = true
                                break;
                            case 'mainStream':
                                dt.name = '干流';
                                dt.value = obj[param];
                                dt.sort = 22.5;
                                dt.show = true
                                break;
                            case 'waterCollectStatus':
                                dt.name = '废水收集情况';
                                dt.value = obj[param] == '1' ? '明管收集' : '未明管收集';;
                                dt.show = obj['haveProductWaterHandle'] == '0' ? false : true;
                                dt.sort = 23
                                break;
                            case 'waterCollectWayName':
                                dt.name = '废水收集方式';
                                dt.value = obj[param];
                                dt.show = obj['haveProductWaterHandle'] == '0' ? false : true;
                                dt.sort = 24
                                break;
                            case 'otherWaterCollectWay0':
                                dt.name = '其他废水收集方式';
                                dt.value = obj[param];
                                dt.show = (obj['haveProductWaterHandle'] == '0' && obj['outOfWater'] == '0') ? false : true;
                                dt.sort = 25
                                break;
                            case 'waterCollectValue':
                                dt.name = '废水收集有效容积';
                                dt.value = obj[param]?`${obj[param]}m³`:'';
                                dt.show = obj['haveProductWaterHandle'] == '0' ? false : true;
                                dt.sort = 26
                                break;
                            case 'currentWaterCollect':
                                dt.name = '现场废水贮存量';
                                dt.value = obj[param]?`${obj[param]}吨`:'';
                                dt.show = obj['haveProductWaterHandle'] == '0' ? false : true;
                                dt.sort = 27
                                break;

                            case 'haveWaterRopingProtocol':
                                dt.name = '废水拉运协议';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.show = true;
                                dt.sort = 28
                                break;
                            case 'waterRopingUnit':
                                dt.name = '废水拉运单位';
                                dt.value = obj[param];
                                dt.show = obj['haveWaterRopingProtocol'] == '0' ? false : true;
                                dt.sort = 29
                                break;
                            case 'waterRopingOnTime':
                                dt.name = '有效期限';
                                dt.value = dateTool.toDate(new Date(Number(obj[param])), 'yyyy年MM月dd日');
                                dt.show = obj['haveWaterRopingProtocol'] == '0' ? false : true;
                                dt.sort = 30;
                                break;
                            case 'waterRopingRecord2015':
                                dt.name = '2015年拉运记录';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.show = true;
                                dt.sort = 31;
                                break;
                            case 'waterRopingValue2015':
                                dt.name = '2015废水拉运量';
                                dt.value = obj[param]?`${obj[param]}吨`:'';
                                dt.show = obj['waterRopingRecord2015'] == '0' ? false : true;
                                dt.sort = 32
                                break;
                            case 'waterRopingRecord2016':
                                dt.name = '2016年拉运记录';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.show = true;
                                dt.sort = 33
                                break;
                            case 'waterRopingValue2016':
                                dt.name = '2016废水拉运量';
                                dt.value = obj[param]?`${obj[param]}吨`:'';
                                dt.show = obj['waterRopingRecord2016'] == '0' ? false : true;
                                dt.sort = 34
                                break;
                            case 'waterRopingRecord2017':
                                dt.name = '2017年拉运记录';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.show = true;
                                dt.sort = 35
                                break;
                            case 'waterRopingValue2017':
                                dt.name = '2017废水拉运量';
                                dt.value = obj[param]?`${obj[param]}吨`:'';
                                dt.show = obj['waterRopingRecord2017'] == '0' ? false : true;
                                dt.sort = 36
                                break;
                            case 'dangerProductStatus':
                                dt.name = '危废产生情况';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.show = true;
                                dt.sort = 37
                                break;
                            case 'dangerSpecies':
                                dt.name = '种类';
                                dt.value = obj[param];
                                dt.show = obj['dangerProductStatus'] == '0' ? false : true;
                                dt.sort = 38
                                break;
                            case 'productValue':
                                dt.name = '产生量';
                                dt.value = obj[param];
                                dt.show = obj['dangerProductStatus'] == '0' ? false : true;
                                dt.sort = 39
                                break;
                            case 'dangerProtocol':
                                dt.name = '危废处置协议';
                                dt.value = obj[param] == '0' ? '无' : '有';
                                dt.show = true;
                                dt.sort = 40
                                break;
                            case 'justUnit':
                                dt.name = '危废处置单位';
                                dt.value = obj[param];
                                dt.show = obj['dangerProtocol'] == '0' ? false : true;
                                dt.sort = 41
                                break;
                            case 'justUnitTime':
                                dt.name = '最近拉运时间';
                                dt.value = dateTool.toDate(new Date(Number(obj[param])), 'yyyy年MM月dd日');
                                dt.show = obj['dangerProtocol'] == '0' ? false : true;
                                dt.sort = 42
                                break;
                            case 'describe':
                                dt.name = '情况说明';
                                dt.value = obj[param];
                                dt.show = true;
                                dt.sort = 43
                                break;
                            case 'lawEnforcement':
                                dt.name = '是否需要执法整治';
                                dt.value = obj[param] ? '是' : '否';
                                dt.show = true;
                                dt.sort = 44
                                break;
                            case 'lawEnforcementDemandName':
                                if(obj['lawEnforcementDemand'].includes('0')){
                                    dt.value = obj[param] + ':'+obj['otherLawEnforcementDemand0'];
                                }else{
                                    dt.value = obj[param]
                                }
                                dt.name = '整治要求';
                                dt.show = true;
                                dt.sort = 44.1
                                break;
                            case 'gridId':
                                dt.name = '社区网格';
                                dt.value = item.gridName;
                                dt.show = true;
                                dt.sort = 45
                                break;
                            case 'userId':
                                dt.name = '调查人员';
                                dt.value = item.username;
                                dt.show = true;
                                dt.sort = 46
                                break;
                            case 'datetime':
                                dt.name = '调查时间';
                                dt.value = dateTool.toDate(new Date(obj[param]), 'yyyy年MM月dd日')
                                dt.show = true;
                                dt.sort = 47
                                break;
                            case 'type':
                                dt.name = '执法事件等级';
                                dt.value = obj[param] ? obj[param] : '';
                                dt.show = true;
                                dt.sort = 48
                                break;
                            case 'formImages':
                                this.formImages = obj[param];
                                dt.sort = 49;
                                break;
                            default:
                                dt = null;
                                break;
                        }
                        if (dt !== null) arr.push(dt);
                    }
                    let that = this;
                    this.tableData = arr.sort(that.compare("sort"));
                }).catch((error) => {});
            },
            compare(props) {
                return function(obj1, obj2) {
                    let value1 = obj1[props];
                    let value2 = obj2[props];
                    return value1 - value2; // 升序
                }
            },
            backToMap() {
                if (this.open) {
                    this.open = false;
                } else {
//          this.setMapShow(true);
                  this.$router.push("/home/heichouEvent");
                }
            }
        },
        mounted() {
            //      let height = window.innerHeight;
            //      this.$refs.tableWrap.style.height = height - 70 + 'px';
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
        width: 100%;
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
