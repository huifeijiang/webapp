<template>
    <div>
        <div class="btns-wrap">
            <div class="news-btns">
                <a href="javascript:;" class="btn-n tab1active" @click="handleTabChange('tab1')" ref="tab1"></a>
                <a href="javascript:;" class="btn-n tab2" style="display:none" @click="handleTabChange('tab2')" ref="tab2"></a>
                <a href="javascript:;" class="btn-n tab3" style="display:none" @click="handleTabChange('tab3')" ref="tab3"></a>
            </div>
        </div>

        <div class="guan-wrap" ref="guanwrap">
            <div class="watch-data" v-show="activeTab=='tab1'">
                <!-- 1 -->
                <div class="watch-list" @click="toggle('选择监测点',1)">
                    <img class="icon-jian" src="static/v2images/jiancedian.png" />
                    <span class="flex-grow">监测点</span>
                    <span class="no-flex-grow">{{checkPointVmodel.selected}}</span>
                    <img class="rig" src="static/images/ic-go.png" alt="">
                </div>
                <div class="recent-event">
                    <div class="event-title flex-box">
                        <span class="leflex">最近一次数据:</span>
                        <span class="ri3">{{recentEvent.time}}</span>
                    </div>
                    
                    
                </div>
                <div class="watch-list aaa" v-for="(item,index) in recentEvent.eventList" :key="index">
                        <img class="icon-jian" :src="'static/v2images/iconsmalls' +index+'.png'" />
                        <span>{{item.name}}</span>
                        <div class="ri3">{{item.value}}</div>
                    </div>
                <div class="history-event">
                    <div class="event-title">
                        <span class="leflex">历史监测数据</span>
                    </div>
                    <div class="scoll">
                    <div class="history">
                        <div class="item-a" @click="showEchartData('流速')">
                            <img :src="'static/v2images/iconsmalls0.png'" />
                            <p>流速</p>
                        </div>
                        <div class="item-a" @click="showEchartData('透明度')" > 
                            <img :src="'static/v2images/iconsmalls1.png'" />
                            <p>透明度</p>
                        </div> 
                        <div class="item-a" @click="showEchartData('溶解氧')">
                            <img :src="'static/v2images/iconsmalls2.png'" />
                            <p>溶解氧</p>
                        </div> 
                        <div class="item-a" @click="showEchartData('氧化还原电位')">
                            <img :src="'static/v2images/iconsmalls3.png'" />
                            <p>氧化还..</p>
                        </div>
                        <div class="item-a" @click="showEchartData('氨氮')" >
                            <img :src="'static/v2images/iconsmalls4.png'" />
                            <p>氨氮</p>
                        </div> 
                        <div class="item-a" @click="showEchartData('化学需氧量')">
                            <img :src="'static/v2images/iconsmalls5.png'" />
                            <p>化学需..</p>
                        </div> 
                        <div class="item-a" @click="showEchartData('总磷')" >
                            <img :src="'static/v2images/iconsmalls6.png'" />
                            <p>总磷</p>
                        </div> 
                        <div class="item-a" @click="showEchartData('氟化物')">
                            <img :src="'static/v2images/iconsmalls7.png'" />
                            <p>氟化物</p>
                        </div>  
                    </div> 
                    </div>
                    <!-- <div class="event-btns">
                        <mu-raised-button label="流速" primary @click="showEchartData('流速')" />
                        <mu-raised-button label="透明度" primary @click="showEchartData('透明度')" />
                        <mu-raised-button label="溶解氧" primary @click="showEchartData('溶解氧')" />
                    </div>
                    <div class="event-btns">
                        <mu-raised-button label="氧化还.." primary @click="showEchartData('氧化还原电位')" />
                        <mu-raised-button label="氨氮" primary @click="showEchartData('氨氮')" />
                        <mu-raised-button label="化学需.." primary @click="showEchartData('化学需氧量')" />
                    </div>
                    <div class="event-btns">
                        <mu-raised-button label="总磷" primary @click="showEchartData('总磷')" />
                        <mu-raised-button label="氟化物" primary @click="showEchartData('氟化物')" />
                        <mu-raised-button label="氟化物" class="no" primary/>
                    </div> -->
                    <!-- echarts -->
                    <div class="echarts" ref="tubiao"></div>
                </div>
            </div>
            <div v-show="activeTab=='tab2'">
                <!-- 2 -->
                <div class="watch-list abd">
                    <img class="icon-jian" src="static/v2images/online.png" />
                    <span class="flex-grow">在岗人员</span>
                    <span class="no-flex-grow">{{watchData.length}}</span>
                    <img class="rig" src="static/images/ic-go.png" alt="">
                </div>
                <div class="watch-list abd">
                    <img class="icon-jian" src="static/v2images/noonline.png" />
                    <span class="flex-grow">休息人员</span>
                    <span class="no-flex-grow">0</span>
                    <img class="rig" src="static/images/ic-go.png" alt="">
                </div>
               <!-- <div v-for="item in tab.watchManList" class="watch-list" @click="toggle(item,2)">
                    <span class="flex-grow">{{item}}</span>
                    <span class="count-span">{{getManCount(item)}}</span>
                    <img src="static/images/ic-go.png" alt="">
                </div>
                -->
            </div>
            <div v-show="activeTab=='tab3'">
                <!-- 3 -->
                <!--<div v-for="item in tab.eventData" class="watch-list" @click="sendItem(item.id)">
                    <span class="flex-grow">{{item.name}}</span>
                    <span class="count-span">{{item.count}}</span>
                    <img src="static/images/ic-go.png" alt="">
                </div>-->
                <div class="watch-list" @click="showBottomRange">
                    <img class="icon-jian" src="static/v2images/status.png" />
                    <span class="flex-grow">事件状态</span>
                    <span class="no-flex-grow">{{eventStatusVmodel.selected}}</span>
                    <img class="rig" src="static/images/ic-go.png" alt="">
                </div>
                <div class="allshi">{{statusname}}事件：{{totalElements}}</div>
                <div class="list-conss">
                    <div class="list-shijian" v-for="(item,index) in allEvents.data" :key="index" @click="sendItem(item.id)">   
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
                            <img src="static/v2images/zanwu.png" class="f_le imaad"/>
                            <div class="f_le rire">
                                <div class="report">上报人员：{{item.userName}}</div>
                                <div class="report">
                                    <img src="static/v2images/dingwei.png"/>
                                    <span>{{item.gridName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>

        <mu-drawer class="watch-alert" right :open="open">
            <div class="alert-head">
                <div class="back" @click="open=false">
                    <img src="static/images/ic-return.png" alt="">
                </div>
                <span>{{nowTitle}}</span>
                <span class="hidden">隐藏</span>
            </div>
            <div class="nothin"></div>
            <div class="watch-content" ref="watchcontent">
                <!-- 监测站数据 -->
               <!--  <slot v-if="drawerType==1">
                    <div class="watch-pos" v-for="item in watchList" @click="selectPoint(item,null)">{{item.name}}</div>
                </slot>
 -->
                <!-- 在岗/休息人员 -->
                <slot v-if="drawerType==2">
                    <table-dom :data="watchData" :isFive="true" :getItem="routeHandle" v-if="nowTitle=='在岗人员'" :noRowClick="true"></table-dom>
                    <table-dom :data="[]" :isFive="true" :getItem="routeHandle" v-if="nowTitle=='休息人员'"></table-dom>
                </slot>
                <!-- 事件数据 -->
                <slot v-else>
                    <table-dom :data="allEvents.data" :isFive="false" :getItem="getItem" v-if="nowTitle=='全部'"></table-dom>
                    <table-dom :data="unallocated.data" :isFive="false" :getItem="getItem" v-if="nowTitle=='待分拨'"></table-dom>
                    <table-dom :data="pendding.data" :isFive="false" :getItem="getItem" v-if="nowTitle=='待处理'"></table-dom>
                    <table-dom :data="processed.data" :isFive="false" :getItem="getItem" v-if="nowTitle=='已处理'"></table-dom>
                </slot>
            </div>
        </mu-drawer>

        <mu-drawer class="step-alert" right :open="step">
            <div class="alert-head">
                <div class="back" @click="step=false">
                    <img src="static/images/ic-return.png" alt="">
                </div>
                <span>事件详情</span>
                <span class="hidden">隐藏</span>
            </div>
            <div class="nothin"></div>
            <div class="step-content margin55" ref="stepcontent">
                <div class="event-title">
                    处理进度
                </div>
                <div class="step-wrap">
                    <span :class="stepType>=1?'step-text green':'step-text'">待分拨</span>
                    <span class="step-line"></span>
                    <span :class="stepType>=2?'step-text green':'step-text'">待处理</span>
                    <span class="step-line"></span>
                    <span :class="stepType>=3?'step-text green':'step-text'">已处理</span>
                </div>
                <div class="event-title">
                    事件详情
                </div>
                <div class="step-p">
                    <p>{{stepData.name}}</p>
                    <p>{{stepData.time}}</p>
                    <p>{{stepData.place}}</p>
                    <p>{{stepData.type}}</p>
                    <p>{{stepData.detail}}</p>
                </div>
                <div class="event-title">
                    事件详情
                </div>
                <div class="step-img">
                    <img src="static/images/1.jpg" alt="">
                </div>
            </div>

        </mu-drawer>

        <event-detail :open="open" :stepData="dataTemp" @closeDetail="closeDrawer"></event-detail>
        <!--底部弹出选择监测点-->
        <simple-sheet v-model="checkPointVmodel" @select="bottomSelect"></simple-sheet>
        <!--end-->

        <!--弹出选择事件状态-->
        <simple-sheet v-model="eventStatusVmodel" @select="eventStatusCall"></simple-sheet>
        <!--end-->
    </div>
</template>

<script>
import eventDetail from '../../eventReport/eventDetail.vue';
import tableDom from './table.vue';
import { mapGetters, mapActions, mapState } from 'vuex';
import { drawRoute } from '../../../gisComponets/drawRoute/DrawRoute'
import echarts from 'echarts';
import { setEchartOption } from './echartsData';
import { eventEmitter } from '../river_event.js';
import { eventBus } from '../../../components/eventBus/eventBus';
import simpleSheet from '../../../UIcomponents/simpleSheet/simpleSheet.vue';
export default {
    components: {
        tableDom,
        simpleSheet,
        eventDetail,
        
        
    },
    data() {
        return {
            dataTemp:'',
            totalElements:null,
            statusname:'全部',
            open: false,
            step: false,
            activeTab: 'tab1',
            recentEvent: {
                time: '2017年4月1日',
                eventList: []
            },
            watchList: [
                { name: '' }
            ],
            nowTitle: '',
            watchData: [],
            tab: {
                watchManList: ['在岗人员', '休息人员'],
                eventData: [{ name: '全部', count: 142 }, { name: '待分拨', count: 31 }, {
                    name: '待处理',
                    count: 16
                }, { name: '已处理', count: 83 }]
            },
            drawerType: 0,
            eventListData: [
                { name: '张明星1', job: '水体黑臭', time: '7月1日', place: '沙井社段' },
                { name: '张明星2', job: '水体黑臭', time: '7月1日', place: '沙井社段' },
                { name: '张明星3', job: '水体黑臭', time: '7月1日', place: '沙井社段' },

            ],
            allEvents: {
                name: '全部',
                data: "",
                total: ""
            },
            unallocated: {
                name: '待分拨',
                data: "",
                total: ""
            },
            pendding: {
                name: '待处理',
                data: "",
                total: ""
            },
            processed: {
                name: '已处理',
                data: "",
                total: ""
            },
            stepType: 1,
            stepData: {
                name: '张明星',
                time: '2017年7月1日 17:24',
                place: '茅洲河沙井阶段',
                type: '黑臭水体',
                detail: '河流表面异味大，河水浑浊不清，有少量垃圾，需要清理并且开一辆环保车过来把垃圾运走。'
            },
            mPoint: {
                name: '选择监测点'
            },
            //图表数据
            echartDataObject: {
                "流速": [],
                "透明度": [],
                "溶解氧": [],
                "氧化还原电位": [],
                "氨氮": [],
                "化学需氧量": [],
                "总磷": [],
                "氟化物": [],
                date: []
            },
            checkPointVmodel:{
                show:false,
                name:'选择监测点',
                list:[],
                selected:''
            },
            firstBottom:true,
            eventStatusVmodel:{
                show:false,
                name:'事件类型',
                list:[{
                    name:'全部',
                    selected:true
                },
                {
                    name:'待接收',
                    selected:false
                },
                {
                    name:'待处理',
                    selected:false
                },
                {
                    name:'已处理',
                    selected:false
                },
                {
                    name:'已退回',
                    selected:false
                }],
                selected:'全部'
            }
        }
    },
    computed: {
        ...mapGetters({
            getRivers: 'getRivers',
            getNowRiver: 'getNowRiver'
        })
    },
    methods: {
        ...mapActions({
            setMapShow: 'setMapShow',
            setBackUIShow: 'setBackUIShow',
            setPortalUIShow: 'setPortalUIShow',
            setLayerUIShow: 'setLayerUIShow',
            setRiverUIShow: 'setRiverUIShow',
            setLocateUIShow: 'setLocateUIShow'
        }),
        sendItem(id) {
                let that = this;
                this.open = !this.open;
                let url = GET_EVENT_DETAIL + id;
                this.$http.get(url).then(function (response) {
                    this.dataTemp = response.body.data;
                });
            },
        closeDrawer() {
                this.open = !this.open;
            },
        handleTabChange(val) {
            if (val == 'tab1') {
                this.$refs[this.activeTab].className = 'btn-n ' + this.activeTab;
                this.$refs[val].className = 'btn-n tab1active';
                this.activeTab = val;
            }
            if (val == 'tab2') {
                this.$refs[this.activeTab].className = 'btn-n ' + this.activeTab;
                this.$refs[val].className = 'btn-n tab2active';
                this.activeTab = val;
            }
            if (val == 'tab3') {
                this.$refs[this.activeTab].className = 'btn-n ' + this.activeTab;
                this.$refs['tab3'].className = 'btn-n tab3active';
                this.activeTab = val;
            }

        },
        toggle(str, type) {

            console.log(type)
            //请求数据
            if (type == 1) {
                //监测点
                this.checkPointVmodel.show = true;
                if(this.firstBottom) {
                    this.getPoint();
                }
                return ;
            }

            this.drawerType = type;
            this.open = true;
            this.nowTitle = str;
            if (['全部', '待分拨', '待处理', '已处理'].some(function(val) {
                return str == val
            })) {
                switch (str) {
                    case '全部':
                        this.stepType = 3;
                        break;
                    case '待接收':
                        this.stepType = 1;
                        break;
                    case '待处理':
                        this.stepType = 2;
                        break;
                    case '已处理':
                        this.stepType = 3;
                        break;
                }
             }
            
            
        },
        getManCount(str) {
            if (str == '休息人员') {
                return 0;
            } else {
                return this.watchData.length;
            }
        },
        getItem(item) {
            this.step = true;
        },
        selectPoint(item, id) {
            let riverID;
            this.open = false;
            if (item != null) {
                this.mPoint = item;
                riverID = item.id
            } else {
                riverID = id;
            }

            this.$http.get(GET_RIVER_POINT_HISTORY + riverID + '/history?startDate=&endDate=&size=100').then((res) => {
                let backData = res.body.data.content;
                backData.reverse();
                backData.splice(6);
                backData.reverse();
                this.echartDataObject.date = new Array();
                this.echartDataObject = {
                    "流速": [],
                    "透明度": [],
                    "溶解氧": [],
                    "氧化还原电位": [],
                    "氨氮": [],
                    "化学需氧量": [],
                    "总磷": [],
                    "氟化物": [],
                    date: []
                }
                for (let i = 0; i < backData.length; i++) {
                    this.echartDataObject['流速'].push(backData[i].transparency);
                    this.echartDataObject['透明度'].push(backData[i].flowVelocity);
                    this.echartDataObject['溶解氧'].push(backData[i].dissolvedOxygen);
                    this.echartDataObject['氧化还原电位'].push(backData[i].oxidationReductionPotential);
                    this.echartDataObject['氨氮'].push(backData[i].ammoniaNitrogen);
                    this.echartDataObject['化学需氧量'].push(backData[i].chemicalOxygenDemand);
                    this.echartDataObject['总磷'].push(backData[i].totalPhosphorus);
                    this.echartDataObject['氟化物'].push(backData[i].fluoride);
                    let date = backData[i].acquisitionTime.split(' ')[0].toString().split('.');
                    this.echartDataObject.date.push(date[1] + '-' + date[2]);
                }
                let nearly = backData[backData.length - 1];
                let nrtime = nearly.acquisitionTime;
                nrtime = nrtime.split(' ')[0].toString().split('.');
                if (nrtime[0] < 2017) {
                    let date = new Date();
                    this.recentEvent.time = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + ((date.getDate() - 10) <= 0 ? '1' : (date.getDate() - 10)) + ' 10:54';
                } else {
                    this.recentEvent.time = nearly.acquisitionTime;
                }
                var arr = new Array();
                arr.push({ name: '流速', value: nearly.transparency + 'M/S' });
                arr.push({ name: '透明度', value: nearly.flowVelocity + 'cm' });
                arr.push({ name: '溶解氧:', value: nearly.dissolvedOxygen + 'mg/L' });
                arr.push({ name: '氧化还原电位:', value: nearly.oxidationReductionPotential + 'mV' });
                arr.push({ name: '氨氮:', value: nearly.ammoniaNitrogen + 'mg/L' });
                arr.push({ name: '化学需氧量:', value: nearly.chemicalOxygenDemand + 'mg/L' });
                arr.push({ name: '总磷:', value: nearly.totalPhosphorus + 'mg/L' });
                arr.push({ name: '氟化物:', value: nearly.fluoride + 'mg/L' });
                this.$set(this.recentEvent, 'eventList', arr);
                //初始化图标
                var chart = echarts.init(this.$refs.tubiao);
                setEchartOption(chart, '流速', this.echartDataObject['流速'], this.echartDataObject.date, echarts);
            }).catch(function(error) {
            });
        },
        routeHandle(item) {
            this.setMapShow(true);
            this.setBackUIShow(true);
            this.setLayerUIShow(false);
            this.setLocateUIShow(false);
            this.setPortalUIShow(false);
            let coords = [
                { x: 100016.1168964446, y: 22569.044376236656 },
                { x: 99926.15838319424, y: 22547.87766723657 },
                { x: 99760.79346913108, y: 22385.15859179842 },
                { x: 99825.61651544383, y: 22157.61647004751 },
            ]
            drawRoute.addRoute(coords);
        },
        getPoint() {
            let nowRiver = this.getNowRiver;
            if (nowRiver.id != undefined) {
                this.$http.get(GET_RIVER_POINT + nowRiver.id + '/monitorPoints').then(function(res) {
                    let data = res.data.data.content;
                    this.checkPointVmodel.selected = data[0].name;
                    let arr = [];
                    for(let i=0;i<data.length;i++){
                        arr.push({
                            id:data[i].id,
                            name:data[i].name,
                            riverId:data[i].riverId,
                            status:data[i].status,
                            selected:false
                        });
                    }
                    this.$set(this.checkPointVmodel, 'list', arr);
                    if(this.firstBottom){
                        this.firstBottom = false;
                        this.selectPoint(data[0],null);
                    }
                }).catch(function(error) {
                    //请求错误
                    console.log('请求监测点失败')
                });
            }
        },
        showEchartData(str) {
            let chart = echarts.init(this.$refs.tubiao);
            setEchartOption(chart, str, this.echartDataObject[str], this.echartDataObject.date, echarts);
        },

        routeHandle(item) {
            this.setMapShow(true);
            this.setBackUIShow(true);
            this.setLayerUIShow(false);
            this.setLocateUIShow(false);
            this.setPortalUIShow(false);
            this.$http.get(GET_ROUTE).then(function(response) {
                let routers = response.body.data.content;
                drawRoute.addRoute(routers);
            });
        },
        getOnLinePeople() {
            this.$http.get(GET_ONLINE_PEOPLE).then((res) => {
                let peoples = res.body.data.content;
                this.watchData = peoples;
            }).catch((error) => {
            });
        },
        nativeBack(e) {
            e.preventDefault();
            this.open = false;
        },
        getEventList(url, list, index) {
            this.$http.get(url).then(function(response) {
                list.data = response.body.data.content;
                this.totalElements = response.body.data.totalElements;
                this.tab.eventData[index].count = response.body.data.totalElements;
            })
        },
        getall(status){
            let url2 = GET_ALL_EVENTS_LIST + "?size=1000&status="+status;
            this.getEventList(url2, this.allEvents, 0);
        },
        bottomSelect(item){
            this.selectPoint(item,null)
        },
        showBottomRange(){
            this.eventStatusVmodel.show = true;
        },
        eventStatusCall(item){
            this.statusname = item.name;
            switch(item.name){
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
        }
    },
    mounted() {
        let that = this;
        //请求监测点
        this.getPoint();

        let height = window.innerHeight;
        let width = window.innerWidth;
        this.$refs.guanwrap.style.height = height - 180 + 'px';
        this.$refs.watchcontent.style.height = height - 136 + 'px';
        this.height = height - 140 + 'px';
        this.$refs.stepcontent.style.height = height - 126 + 'px';

        //设置echarts容器长宽
        this.$refs.tubiao.style.width = parseInt(width * 0.95) + 'px';
        this.$refs.tubiao.style.height = 300 + 'px';


        //获取全部事件数据
        let url = GET_ALL_EVENTS_LIST + "?size=3000";
        // let url2 = GET_ALL_EVENTS_LIST + "?size=1000&status=1";
        // let url3 = GET_ALL_EVENTS_LIST + "?size=1000&status=2";
        // let url4 = GET_ALL_EVENTS_LIST + "?size=100&status=3";

        

        this.getEventList(url, that.allEvents, 0);
        // getEventList(url2, that.allEvents, 1);
        // getEventList(url3, that.allEvents, 2);
        // getEventList(url4, that.allEvents, 3);

        document.addEventListener(eventBus.BACK_BUTTON, this.nativeBack, false);
    },
    destroyed() {
        document.removeEventListener(eventBus.BACK_BUTTON, this.nativeBack, false);
    }
}
</script>

<style lang="less" scoped>
.list-conss{
    position:absolute;
    bottom:0;
    top:238px;
    left:0;
    right:0;
    margin-top:10px;
    overflow:auto

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
        color:#A8ACBC;
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
.nothin {
    height: 1px;
}
.allshi{
    padding:5px 0;
    font-size:12px;
    text-indent:12px;
    color:#A8ACBC
}
.margin55 {
    margin-top: 55px;
}
.aaa img{
    width:20px
}
.no {
    visibility: hidden;
}

.step-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 5px 0;
    border-bottom: 1px solid #efefef;
}

.step-text {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    font-size: 12px;
    border: 1px solid #efefef;
    text-align: center;
    line-height: 50px;
    background-color: #ccc;
}

.green {
    background-color: #50dc8d;
    color: #fff;
}

.step-img {
    width: 92%;
    margin: 5px auto;
    border-radius: 5px;
    border: 5px solid #efefef;
}

.step-img img {
    width: 100%;
}

.step-p {
    padding: 5px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
}

.step-p p {
    margin-top: 3px;
    margin-bottom: 3px;
    font-size: 14px;
}

.step-line {
    width: 20%;
    border: 1px solid #efefef;
}

.btns-wrap {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
}

.news-btns {
    display: flex;
    width: 94%;
    align-items:center;
    justify-content:space-around;
    margin: 0 auto;
    border-radius: 2px;
}

.btn-n {
    height: 47px;
    width: 30%;
    font-size: 14px;
    text-align: center;
}

.noborder {
    border-right: none;
}

.tab1 {
    background: url("../../../../static/v2images/jiance.png")center center no-repeat;
    background-size: 120px;
}

.tab1active {
    background: url("../../../../static/v2images/jianceactive.png")center center no-repeat;
    background-size: 120px;
}

.tab2 {
    background: url("../../../../static/v2images/peoshuju.png")center center no-repeat;
     background-size: 120px;
}

.tab2active {
    background: url("../../../../static/v2images/peoshujuactive.png") center center no-repeat;
     background-size: 120px;
}

.tab3 {
    background: url("../../../../static/v2images/timeshuju.png") center center no-repeat;
     background-size: 120px;
}

.tab3active {
    background: url("../../../../static/v2images/timeshujuactive.png") center center no-repeat;
     background-size: 120px;
}

.icon-jian {
    margin-left: 3%;
}

.guan-wrap,
.step-content {
    width: 100%;
    overflow-y: auto;
}

.flex-grow {
    flex-grow: 1;
}
.watch-list .no-flex-grow {
    flex-grow: 0;
    margin-right: 10px;
    
}
.count-span {
    margin-right: 10px;
}

.watch-data {}

.leflex {
    flex-grow: 1;
    margin-left: 3%;
}

.ri3 {
    margin-right: 3%
}

.watch-list {
    background:#fff;
    display: flex;
    padding: 10px 0;
    align-items: center;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
}

.watch-list span {
    font-size: 14px;
    color: #6a6e7b;
    margin-left: 5px;
    flex-grow: 1;
}
.item-a{
    width: 60px;
    height: 80px;
    float: left;
    margin-left: 10px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(223, 224, 230, 0.17);
    box-shadow: 0 0px 4px 0px rgba(118, 139, 155, 0.22661);
    text-align:center
}
.history-event{
    position: relative;
}
.abd img{
    width:18px
}
.scoll{
    display: -webkit-box;
    overflow: scroll;
    width: 100%;
}
.item-a img{
    margin-top: 8px;
    width:26px
}

.item-a p{
    text-align: center
}
.history{
    padding: 10px 0;
    overflow-x: auto;
    width: 568px;
}
.watch-list .rig {
    width: 9px;
    margin-right: 10px;
}

.recent-event {
    border-bottom: 1px solid #efefef;
}

.event-title {
    font-size: 14px;
    height: 30px;
    color: #A8ACBC;
    background: #f9fcff;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
}
.flex-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.recent-event p {
    width: 100%;
    text-indent: 10px;
    color: #6a6e7b;
    margin-top: 4px;
    margin-bottom: 4px;
}

.event-btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 5px 0;
}

.watch-alert {
    width: 100%;
    z-index: 58;
}

.step-alert {
    width: 100%;
    z-index: 59;
}

.alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 50;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
}

.back {
    margin-left: 15px;
    padding: 12px;
}

.back img {
    display: block;
    width: 10px;
}

.alert-head span {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
}

.hidden {
    visibility: hidden;
    margin-right: 15px;
}

.watch-content {
    width: 100%;
    margin-top: 65px;
    /*overflow-y: auto;*/
}

.watch-pos {
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    box-sizing: border-box;
    color: #6a6e7b;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
}

.watch-pos:nth-child(2n-1) {
    background-color: #efefef;
    border-bottom: 1px solid #fff;
}

.mu-raised-button-primary {
    background-color: #54A4D7;
}

.walker-wrap {
    padding: 15px;
}

.mu-td a {
    color: rgba(0, 0, 0, .87);
}

.mu-th,
.mu-th {
    padding-right: 0;
    padding-left: 0;
    text-align: center;
    height: 40px;
}

.mu-tr {
    height: 40px;
}

.echarts {
    margin: 0 auto;
    margin-top: 10px;
}
</style>
