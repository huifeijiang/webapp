<template>
    <!-- 巡查事件 -->
    <div>
    
        <mu-row gutter class="walker-wrap" v-show="!static">
        </mu-row>
        <!--
                <mu-tabs :value="activeTab" @change="handleTabChange">
                    <mu-tab value="tab2" :title="'待接收 '+(unallocated.total || '0')"/>
                    <mu-tab value="tab3" @active="" :title="'待处理 '+(pendding.total || '0')"/>
                    <mu-tab value="tab4" @active="" :title="'已处理 '+(processed.total || '0')"/>
                    <mu-tab value="tab1" :title="'已退回 '+(allEvents.sendback|| '0')"/>
                </mu-tabs>
                <mu-table ref="table"
                          :fixedHeader="fixedHeader"
                          :showCheckbox = "false"
                          :height="height"
                >
                    <mu-thead slot="header">
                        <mu-tr>
                            <mu-th class="width-20">人员</mu-th>
                            <mu-th class="width-50">事件类型</mu-th>
                            <mu-th class="width-30">日期</mu-th>
                        </mu-tr>
                    </mu-thead>
                    <mu-tbody>
                        <mu-tr v-for = "(item,index) in allEvents.data" v-show="activeTab == 'tab1'"  :key="index">
                            <span @click="rowClick(item)" class="rewrite-row">
                                <mu-td class="width-20 over-hidden">{{index+1}}.{{item.userName}}</mu-td>
                                <mu-td class="width-50 over-hidden">{{item.eventTypeName}}</mu-td>
                                <mu-td class="width-30 over-hidden">{{item.datetime}}</mu-td>
                            </span>
        
                        </mu-tr>
                        <mu-tr v-for = "(key,index) in unallocated.data" v-show="activeTab == 'tab2'" :key="index" @click="rowClick(key)">
                            <span @click="rowClick(key)" class="rewrite-row">
                                <mu-td class="width-20">{{index+1}}.{{key.userName}}</mu-td>
                                <mu-td class="width-50 over-hidden">{{key.eventTypeName}}</mu-td>
                                <mu-td class="width-30">{{key.datetime}}</mu-td>
                            </span>
                        </mu-tr>
                        <mu-tr v-for = "(key1,index) in pendding.data" v-show="activeTab == 'tab3'" :key="index">
                            <span @click="rowClick(key1)" class="rewrite-row">
                                <mu-td class="width-20">{{index+1}}.{{key1.userName}}</mu-td>
                                <mu-td class="width-50 over-hidden">{{key1.eventTypeName}}</mu-td>
                                <mu-td class="width-30">{{key1.datetime}}</mu-td>
                            </span>
                        </mu-tr>
                        <mu-tr v-for = "(key2,index) in processed.data" v-show="activeTab == 'tab4'" :key="index">
                            <span @click="rowClick(key2)" class="rewrite-row">
                                <mu-td class="width-20">{{index+1}}.{{key2.userName}}</mu-td>
                                <mu-td class="width-50 over-hidden">{{key2.eventTypeName}}</mu-td>
                                <mu-td class="width-30">{{key2.datetime}}</mu-td>
                            </span>
                        </mu-tr>
                    </mu-tbody>
                </mu-table>
                -->
        <div class="watch-list" @click="showBottomRange">
            <img class="icon-jian" src="static/v2images/status.png" />
            <span class="flex-grow">事件状态</span>
            <span class="no-flex-grow">{{eventStatusVmodel.selected}}</span>
            <img class="rig" src="static/images/ic-go.png" alt="">
        </div>
        <div class="allshi">{{statusname}}事件：{{totalElements}}</div>
        <div class="list-conss">
            <div class="list-shijian" v-for="(item,index) in allEvents.data" :key="index" @click="rowClick(item)">
                <div class='top-tips f_clear'>
                    <div class="f_le">{{item.eventTypeName}}</div>
                    <div class="f_ri">
                        <span class="timess">{{item.datetime.replace('2017-', '')}}</span>
                        <span v-if="item.status == 0" class="status status0">待分配</span>
                        <span v-if="item.status == 1" class="status status1">待接收</span>
                        <span v-if="item.status == 2" class="status status2">待处理</span>
                        <span v-if="item.status == 3" class="status status3">已处理</span>
                        <span v-if="item.status == 4" class="status ">已退回</span>
                    </div>
                </div>
                <div class="f_clear bot">
                    <img src="static/v2images/zanwu.png" class="f_le imaad" />
                    <div class="f_le rire">
                        <div class="report">上报人员：{{item.userName}}</div>
                        <div class="report">
                            <img src="static/v2images/dingwei.png" />
                            <span>{{item.gridName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <event-detail :open="open" :stepData="dataTemp" @closeDetail="closeDrawer"></event-detail>
        <!--弹出选择事件状态-->
        <simple-sheet v-model="eventStatusVmodel" @select="eventStatusCall"></simple-sheet>
    </div>
</template>

<script>
    import cwTab from '../../UIcomponents/cwTab/cwTab.vue'
    import {
        getPosition
    } from '../corSys/position';
    import eventDetail from '../eventReport/eventDetail.vue';
    import simpleSheet from '../../UIcomponents/simpleSheet/simpleSheet.vue';
    export default {
        data() {
            return {
                totalElements: '',
                statusname: '全部',
                open: false,
                activeTab: 'tab2',
                allEvents: {
                    data: "",
                    sendback: ""
                },
                unallocated: {
                    data: "",
                    total: ""
                },
                pendding: {
                    data: "",
                    total: ""
                },
                processed: {
                    data: "",
                    total: ""
                },
                fixedHeader: true,
                fixedFooter: true,
                height: '',
                total: '',
                total1: '',
                total2: '',
                total3: '',
                dataTemp: {},
                eventStatusVmodel: {
                    show: false,
                    name: '事件状态',
                    list: [{
                            name: '全部',
                            selected: true
                        },
                        {
                            name: '待接收',
                            selected: false
                        },
                        {
                            name: '待处理',
                            selected: false
                        },
                        {
                            name: '已处理',
                            selected: false
                        },
                        {
                            name: '已退回',
                            selected: false
                        }
                    ],
                    selected: '全部'
                }
            }
        },
        components: {
            cwTab,
            eventDetail,
            simpleSheet
        },
        props: ['static', 'customHeight', 'type'],
        methods: {
            getEventList(url, list) {
                this.$http.get(url).then(function(response) {
                    list.data = response.body.data.content;
                    this.totalElements = response.body.data.totalElements;
                })
            },
            getall(status) {
                let url2 = GET_ALL_EVENTS_LIST + "?size=1000&status=" + status;
                this.getEventList(url2, this.allEvents, 0);
            },
            eventStatusCall(item) {
                this.statusname = item.name;
                switch (item.name) {
                    case '全部':
                        this.getall("");
                        break;
                    case '待接收':
                        this.getall(1);
                        break;
                    case '待处理':
                        this.getall(2);
                        break;
                    case '已处理':
                        this.getall(3);
                        break;
                    case '已退回':
                        this.getall(4);
                        break;
                }
            },
            showBottomRange() {
                this.eventStatusVmodel.show = true;
            },
            getPosition(gisInfo) {
                console.log("event", gisInfo);
            },
            responseTab(val) {
                console.log("event", val);
            },
            handleTabChange(val) {
                this.activeTab = val
            },
            rowClick(data) {
                let that = this;
                this.open = true;
                let url = GET_EVENT_DETAIL + data.id;
                this.$http.get(url).then((response) => {
                    this.dataTemp = response.body.data;
                    console.log(this.dataTemp, 5555)
                });
            },
            closeDrawer() {
                this.open = !this.open;
            },
            getDetail(e) {
                console.log(e);
            }
        },
        mounted() {
            let that = this;
            //            let url = "../static/simulateData/walker-event.json";
            //待分配 ：0  待处理：2 已处理：3
            let url = GET_ALL_EVENTS_LIST + "?size=100000&status=";
            // let url2 = GET_ALL_EVENTS_LIST + "?size=100000&status=1";
            // let url3 = GET_ALL_EVENTS_LIST + "?size=100000&status=2";
            // let url4 = GET_ALL_EVENTS_LIST + "?size=100000&status=3";
    
            // function getEventList(url, list) {
            //     that.$http.get(url).then(function(response) {
            //         list.data = response.body.data.content;
            //     })
            // }
            this.getEventList(url, that.allEvents);
            // getEventList(url2, that.unallocated);
            // getEventList(url3, that.pendding);
            // getEventList(url4, that.processed);
    
            // function getEventStatistics(url) {
            //     that.$http.get(url).then(function(response) {
            //         let data = response.body.data;
            //         that.allEvents.sendback = data.sendback;
            //         that.unallocated.total = data.waitreceive;
            //         that.pendding.total = data.pending;
            //         that.processed.total = data.handle;
            //     })
            // }
            //getEventStatistics(GET_WALKER_STATISTIC);
            if (this.type) {
                let height = window.innerHeight;
                console.log(height)
                this.height = height - 216 + 'px';
            } else {
                let height = window.innerHeight;
                this.height = height - 290 + 'px';
            }
        }
    }
</script>

<style lang="less" scoped>
.allshi{
    padding:5px 0;
    font-size:12px;
    text-indent:12px;
    color:#A8ACBC;
    background-color: #f9fcff;

}
.list-conss{
    position:absolute;
    bottom:0;
    top:172px;
    left:0;
    right:0;
    margin-top:10px;
    overflow:auto;
    background-color: #f9fcff;;
    z-index:80;
}

.list-shijian{
    .f_ri .status1{
        border:1px solid #FFB400;
        color:#FFB400
    }
    .f_ri .status2{
        border:1px solid #F36487;
        color:#F36487
    }
    .f_ri .status3{
        border:1px solid #98CF4F;
        color:#98CF4F
    }

    border:1px solid #efefef;
    background:#fff;
    margin: 0 10px 7px 10px;
    padding: 0 10px;
    border-radius:4px;
    .top-tips {
        padding: 8px 0;
        
    }
    .imaad{
        width:50px;
        height:50px;
        vertical-align: middle;
    }
    .top-tips .f_le{
        font-size:16px;
        color: #626676;
    }
    .rire{
        margin: 2px 0 0 8px;
    }
    .report{
        font-size:14px;
        color:#A8ACBC;
        img{
            vertical-align: middle;
            width: 18px;
        }
    }
    .timess{
        font-size:12px;
        color:#ACB0BF;
    }
    .bot{
        margin-bottom:9px
    }
    .status{
        margin-left:5px;
        display:inline-block;
        border:1px solid #ccc;
        font-size:12px;
        color:#A8ACBC;
        padding: 1px 5px;
        border-radius:4px;
    }
}
    span.rewrite-row {
        vertical-align: inherit;
    }
    
    td.over-hidden {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    span.rewrite-row {
        display: block;
        overflow: hidden;
    }
</style>
