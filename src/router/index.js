import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/home';
import login from '../components/login';

import index from '../components/index/index';
import news from '../components/news/news';
import qynews from '../components/qynews/qynews';
import qytonggao from '../components/qytonggao/qytonggao';
import portal from '../components/portal/portal';
import rivers from '../components/rivers/rivers';
import qyrivers from '../components/rivers/qy_rivers';
import user from '../components/user/user';
import eventReport from '../components/eventReport/eventReport.vue'
import littlePage from '../components/littlePage/littlePage.vue'
import littleEvent from '../components/littleEvent/littleEvent.vue'
import zaiguanqiyelist from '../components/zaiguanqiye/zaiguanqiye.vue'
import newlittleEvent from '../components/newlittleEvent/newlittleEvent.vue'


import riverBuild from '../components/rivers/river_build/river_build.vue';
import reportResult from '../components/eventReport/reportResult.vue'
import riversMaster from '../components/rivers/rivers_detail/rivers_master';
import riversCe from '../components/rivers/rivers_detail/rivers_ce.vue';
import riversPeople from '../components/rivers/rivers_detail/rivers_people';
import walkerMan from '../components/walkerMan/walkerMan.vue';
import walkerEvent from '../components/walkerEvent/walkerEvent.vue'
import walkerEventSingle from '../components/walkerEventSingle/walkerEventSingle.vue'
import userCenter from '../components/user/userCenter.vue';
import ModifyPassword from '../components/user/ModifyPassword.vue';
import userChief from '../components/user/userChief.vue'
import riversGuan from '../components/rivers/rivers_detail/rivers_guan';
import riversJing from '../components/rivers/rivers_detail/rivers_jing';
//任务办理 -- 任务列表
import handleEvent from '../components/handleEvent/handleEvent.vue';
import xiaoshan from '../components/xiaoshan/xiaoshan.vue';
import handleEventDetail from '../components/handleEventDetail/handleEventDetail';
//整治员办
import regulationList from '../components/regulationList/regulationList';
import regulationEvent from '../components/regulationEvent/regulationEvent';
Vue.use(Router)
//数据统计
import statistics from '../components/statistics/statistics';
//油烟上报
import lampblackshangbao from '../components/Lampblackreport/lampblackshangbao'
//油烟事件
import lampblackevent from '../components/Lampblackreport/lampblackevent'
//会议巡河meetingriver
import meetingriver from '../components/eventReport/meetingriver.vue'
import meetindex from '../components/eventReport/meetindex.vue'
import faqimeet from '../components/eventReport/faqimeet.vue'
import huiyitongji from '../components/eventReport/huiyitongji.vue'
//hc4个一巡入口
import hcStatistic from '../components/hcStatistic/hcStatistic.vue';
//hc巡查列表
import dailytask from '../components/hcStatistic/dailyTask.vue';
//hc每日一巡历史记录
import hcHistory from '../components/hcStatistic/hcHistory.vue';
//hc巡查表单
// import autoForm from '../UIcomponents/autoForm/autoForm.vue';
import canyinForm from '../UIcomponents/autoForm/businessForm/canyinForm.vue';
import meiriyixunForm from '../UIcomponents/autoForm/businessForm/meiriyixunForm.vue';
import xiaofeishuiForm from '../UIcomponents/autoForm/businessForm/xiaofeishuiForm.vue';
import qiuXiuForm from '../UIcomponents/autoForm/businessForm/qiuXiuForm.vue';
import xiaosanluanwuForm from '../UIcomponents/autoForm/businessForm/xiaosanluanwuForm.vue';
import meizhouForm from '../UIcomponents/autoForm/businessForm/meizhouForm.vue';
import meijiForm from '../UIcomponents/autoForm/businessForm/meijiForm.vue';
import zaiguanqiye from '../UIcomponents/autoForm/businessForm/zaiguanqiye.vue'
import huanbaozhurenReport from '../UIcomponents/autoForm/businessForm/huanbaozhurenReport.vue'
import huanbaozhurenEvent from '../components/huanbaozhurenEvent/huanbaozhurenEvent.vue'
import shixiaoshanlw from '../UIcomponents/autoForm/businessForm/shixiaoshanlw.vue';
//草稿箱
import draftList from '../UIcomponents/autoForm/autoFormDraftList.vue'
//汽修洗车上报
import carshangbao from '../components/carReport/carshangbao.vue'
import careevent from '../components/carReport/careevent.vue'
//黑臭水体餐饮上报
import cateringshangbao from '../components/catering/cateringshangbao'
import cateringevent from '../components/catering/cateringevent'
import userset from '../components/user/userset.vue'
//黑臭事件列表页面
import heichouEvent from '../components/heichouEvent/heichouEvent.vue';
//通知页面
import notice from '../components/notice/notice.vue';
//事件流程
// import process from '../components/process/processList';
// import processlists from '../components/processlists/tasklist.vue';
// import banliprocess from '../components/processlists/banliprocess.vue';
//河长每日一巡统计
import riverStatistic from '../components/riverStatistic/riverStatistic.vue';

//hc执法
import hchandleEvent from '../components/hczf/handleEvent'
import eventGate from '../components/eventGate/eventGate';
import wurenjiGate from '../components/wurenjiGate/wurenjiGate';

//小废水企业排查
import xiaofeishuiCompany from '../UIcomponents/autoForm/businessForm/xiaofeishuiCompany.vue';
import xiaofeishuiCompanyList from '../components/xiaofeishuiCompanyList/xiaofeishuiCompanyList.vue';
//小废水企业执法列表
import xfsZflist from '../components/xfsCompanyZfList/xiaofeishuiZfList';

//在管工业执法
import zaiguanzhifa from '../components/zaiguanzhifa/zaiguanzhifaEvent.vue'
//执法列表
import zhifaList from '../components/zhifaList/zhifaList.vue';
import zhifaDetail from '../components/zhifaDetail/zhifaDetail.vue';

import qiyetongji from '../components/qiyetongji/qytongjinew.vue';
import wurenji from '../components/wurenji/wurenji.vue';
import nowVideo from '../components/wurenji/nowVideo.vue';
import historyVideo from '../components/wurenji/historyVideo.vue';
//专项巡查(市区)的模糊查询
import fuzzySearch from '../components/fuzzySearch/fuzzySearch.vue'
import dailyEventList from '../components/hcStatistic/component/dailyEventList.vue';
import qiyeReport from '../components/qiyeReport/qiyeReport.vue';
export default new Router({
    routes: [{
            path: '/',
            component: login
        },
        {
            name: 'home',
            path: '/home',
            component: home,
            children: [{
                    path: 'draftList',
                    name: 'draftList',
                    component: draftList
                }, {
                    path: 'fuzzySearch',
                    name: 'fuzzySearch',
                    component: fuzzySearch
                },
                {
                    path: 'xfsZflist',
                    name: 'xfsZflist',
                    component: xfsZflist
                }, {
                    path: 'xiaofeishuiCompanyList',
                    name: 'xiaofeishuiCompanyList',
                    component: xiaofeishuiCompanyList
                },
                {
                    path: 'xiaofeishuiCompany',
                    name: 'xiaofeishuiCompany',
                    component: xiaofeishuiCompany
                },
                // {
                //   path: 'autoForm',
                //   name: 'autoForm',
                //   component: xiaofeishuiForm
                // },
                {
                    path: 'meizhouForm',
                    name: 'meizhouForm',
                    component: meizhouForm

                },
                {
                    path: 'meijiForm',
                    name: 'meijiForm',
                    component: meijiForm

                },
                {
                    path: 'meiriyixunForm',
                    name: 'meiriyixunForm',
                    component: meiriyixunForm
                },
                {
                    path: 'xiaofeishuiForm',
                    name: 'xiaofeishuiForm',
                    component: xiaofeishuiForm
                },
                {
                    path: 'zaiguanzhifa',
                    name: 'zaiguanzhifa',
                    component: zaiguanzhifa
                },
                {
                    path: 'zaiguanqiye',
                    name: 'zaiguanqiye',
                    component: zaiguanqiye
                }, {
                    path: 'huanbaozhurenReport',
                    name: 'huanbaozhurenReport',
                    component: huanbaozhurenReport
                },
                {
                    path: 'huanbaozhurenEvent',
                    name: 'huanbaozhurenEvent',
                    component: huanbaozhurenEvent
                },
                {
                    path: 'carshangbao',
                    name: 'carshangbao',
                    component: qiuXiuForm
                },
                {
                    path: 'dailytask',
                    name: 'dailytask',
                    component: dailytask
                },
                {
                    path: 'dailyEventList',
                    name: 'dailyEventList',
                    component: dailyEventList
                },
                {
                    path: 'hcHistory',
                    name: 'hcHistory',
                    component: hcHistory,
                },
                {
                    path: 'hcStatistic',
                    name: 'hcStatistic',
                    component: hcStatistic,
                },
                {
                    path: 'qiyeReport',
                    name: 'qiyeReport',
                    component: qiyeReport,
                },
                {
                    path: 'riverStatistic',
                    name: 'riverStatistic',
                    component: riverStatistic,
                },
                // {
                //   path:'carshangbao',
                //   name:'carshangbao',
                //   component:carshangbao
                // },

                {
                    path: 'lampblackshangbao',
                    component: lampblackshangbao
                },

                {
                    path: 'cateringshangbao',
                    name: 'cateringshangbao',
                    component: canyinForm
                },

                {
                    path: 'statistics',
                    component: statistics
                },
                {
                    path: '/',
                    component: index
                },

                {
                    path: 'news',
                    component: news
                },
                {
                    path: 'qynews',
                    component: qynews
                },
                {
                    path: 'qytonggao',
                    component: qytonggao
                },
                {
                    path: 'eventReport',
                    component: eventReport
                },
                {
                  path: 'huiyitongji',
                  component: huiyitongji
                },
                {
                    path: 'meetingriver',
                    component: meetingriver
                },
                {
                    path: 'meetindex',
                    component: meetindex
                },
                {
                    path: 'faqimeet',
                    component: faqimeet
                },
                {
                    path: 'handleEvent',
                    component: handleEvent
                },
                {
                    path: 'hchandleEvent',
                    component: hchandleEvent
                },
                {
                    path: 'littlePage',
                    name: 'littlePage',
                    component: xiaosanluanwuForm
                },
                {
                    path: 'shilittlePage',
                    name: 'shilittlePage',
                    component: shixiaoshanlw
                },
                {
                    path: 'littleEvent',
                    name: 'littleEvent',
                    component: littleEvent
                }, {
                    path: 'zaiguanqiyelist',
                    name: 'zaiguanqiyelist',
                    component: zaiguanqiyelist
                },
                {
                    path: 'newlittleEvent',
                    name: 'newlittleEvent',
                    component: newlittleEvent
                },
                {
                    path: 'reportResult',
                    component: reportResult
                },
                {
                    path: 'walkerEventSingle',
                    component: walkerEventSingle
                },
                {
                    path: 'heichouEvent',
                    component: heichouEvent
                },
                {
                    path: 'zhifaList',
                    name: 'zhifaList',
                    component: zhifaList
                }, {
                    path: 'zhifaDetail',
                    name: 'zhifaDetail',
                    component: zhifaDetail
                }, {
                    path: 'wurenji',
                    name: 'wurenji',
                    component: wurenji
                }, {
                    path: 'nowVideo',
                    name: 'nowVideo',
                    component: nowVideo
                }, {
                    path: 'historyVideo',
                    name: 'historyVideo',
                    component: historyVideo
                },
                {
                    path: 'cateringevent',
                    name: 'cateringeventh',
                    component: cateringevent
                },
                {
                    path: 'careevent',
                    name: 'careeventh',
                    component: careevent
                },
                {
                    path: 'portal',
                    component: portal,
                    children: [{
                            path: 'lampblackevent',
                            name: 'lampblackevent',
                            component: lampblackevent
                        },
                        {
                            path: 'cateringevent',
                            name: 'cateringevent',
                            component: cateringevent
                        },
                        {
                            path: 'careevent',
                            name: 'careevent',
                            component: careevent
                        }, {
                            path: 'walkerEvent',
                            component: walkerEvent
                        },
                        {
                            path: 'regulationList',
                            component: regulationList
                        },
                        {

                            path: 'littleEvent',
                            name: 'littleEvent_sub',
                            component: littleEvent
                        },
                        {
                            path: 'hdevent',
                            name: 'handleEvent_sub',
                            component: handleEvent
                        },
                        {
                            path: 'xslw',
                            name: 'xslw',
                            component: xiaoshan
                        },
                        {
                            path: 'qiyetongji',
                            name: 'qiyetongji',
                            component: qiyetongji
                        },
                        {
                            path: 'huanbaozhurenEvent',
                            name: 'hbzrEvent',
                            component: huanbaozhurenEvent
                        }
                    ]
                },
                {
                    path: 'rivers',
                    component: rivers,
                    children: [{
                            path: '/',
                            component: riversMaster
                        },
                        {
                            path: 'document',
                            component: riversPeople
                        },
                        {
                            path: 'strajy',
                            component: riversCe
                        },
                        {
                            path: 'build',
                            component: riverBuild
                        },
                        {
                            path: 'management',
                            component: riversGuan
                        },
                        {
                            path: 'view',
                            component: riversJing
                        }
                    ]
                },
                {
                    path: 'qyrivers',
                    component: qyrivers,
                    children: [{
                        path: '/',
                        component: riversCe
                    }, {
                        path: 'strajy',
                        component: riversCe
                    }, {
                        path: 'view',
                        component: riversJing
                    }]
                },
                {
                    path: 'ModifyPassword',
                    component: ModifyPassword
                },
                {
                    path: 'user',
                    component: user,
                    children: [{
                        path: 'userChief',
                        component: userChief
                    }, {
                        path: 'userCenter',
                        component: userCenter
                    }]
                },
                {
                    path: 'userset',
                    component: userset
                },
                {
                    path: 'notice',
                    component: notice
                },
                {
                    path: 'walkerMan',
                    component: walkerMan
                }, {
                    path: 'eventGate',
                    name: 'eventGate',
                    component: eventGate
                }, {
                    path: 'wurenjiGate',
                    name: 'wurenjiGate',
                    component: wurenjiGate
                }
            ]
        }
    ]
})