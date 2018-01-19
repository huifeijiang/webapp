<template>
    <div class='eventlist'>
        <!--页面列表-->
        <mu-list class='mulist'>
                <mu-list-item :title="listTitle" :afterText="selectMore? '':selected" @click="toggle()" v-if='listTitle == "生产经营情况"'>
                        <mu-icon :value="icon" slot="left" v-if="!selectMore"/>
                        <mu-icon value="chevron_right" slot="right" v-show='showicon'/>
                        <span class='spanli' v-show='showicon?false:true'>{{spanitem}}</span>
                </mu-list-item>
                <mu-list-item :title="listTitle" :afterText="selectMore? '':selected" @click="toggle()" v-else>
                    <mu-icon :value="icon" slot="left" v-if="!selectMore"/>
                    <mu-icon value="chevron_right" slot="right"/>
                </mu-list-item>
                <mu-divider/>
            <!--<div class="reslut-list" v-show="resultList.length > 0" v-if="selectMore">
                <p class="result-list" v-for="item in resultList">{{item}}</p>
                <mu-divider/>
            </div>-->
        </mu-list>
        <!--延伸列表-->
        <mu-drawer right :open="open" :docked="docked" @close="toggle()" class="event-walker shequaa">
            <head-dom v-on:back="toggle" :type="'back'">{{listTitle}}</head-dom>
            <div class="sheqq"><input type="text" v-model="search" placeholder="输入搜索相关关键字" class="searchaa"></div>
            <div ref="cwListBox" class="cw-list-container cwab" v-if='listTitle=="监控设施"'>
                <div class="form-list" v-for="(item,index) in datas" :key="index">
                        <span>{{item.name}}</span>
                        <div class='type-list'>
                            <mu-text-field class='little-text' v-model="item.value" hintText="请输入" :disabled='disable'/>
                        </div>           
                </div>
                 <mu-list-item :title="wu.name" class="form-list" :class='{active:isActive}' @click.native="watchnone" v-model='wu.value'/>
            </div>
            <div ref="cwListBox" class="cw-list-container cwab" v-else-if='listTitle=="生产经营情况"'>
                <mu-list class='forlist' v-for="(item,index) in produceData" :key="index"  @click.native='produce(item)'>
                    <mu-list-item :title="item.type" />
                    <mu-divider/>
                </mu-list>
            </div>
            <div ref="cwListBox" class="cw-list-container cwab" v-else>
                <mu-list  v-for="(item,index) in earchData" :key="index" :class="index == 0 ?'jd-list-item'+index : ''">
                    <mu-list-item :title="item.name" :ref="item.id+'dom'" @click="handleToggle(item)"/>
                    <mu-divider/>
                </mu-list>
            </div>
            
        </mu-drawer>
    </div>
</template>
<script type='es6'>
    import headDom from '../../UIcomponents/header/head';
    import {
        eventBus
    } from '../eventBus/eventBus.js';
    export default {
        components: {
            headDom,
        },
        data() {
            return {
                sounds: '',
                notifications: '',
                videoSounds: '',
                docked: false,
                selected: '',
                disable:false,
                open: false,
                isActive: false,
                tlt: false,
                showicon:true,
                resultList: [],
                resultIdList: [],
                produceData:[{
                    id:1,
                    type:'正常生产'
                },
                    {
                        id:2,
                        type:'停产'
                    },
                    {
                        id:3,
                        type:'关停'
                    },
                    {
                        id:4,
                        type:'搬迁'
                    }],
                producedatas:'',
                producename:'',
                lastDom: null,
                search: '',
                spanitem:'',
                wu:{
                    name:'无',
                    value:''
                },
                datas: [{
                    name: 'PH',
                    value: ''
                }, {
                    name: '流量(t)',
                    value: ''
                }, {
                    name: 'COD(mg/l)',
                    value: ''
                }, {
                    name: '铜(mg/l)',
                    value: ''
                }, {
                    name: '镍(mg/l)',
                    value: ''
                }, {
                    name: '铬(mg/l)',
                    value: ''
                }, {
                    name: '总磷(mg/l)',
                    value: ''
                }, {
                    name: '氨氮(mg/l)',
                    value: ''
                }, {
                    name: '设备异常',
                    value: ''
                }]
            }
        },
        computed: {
            earchData: function() {
                var search = this.search.trim();
                if (search) {
                    return this.eventTypeList.filter(function(eventTypeList) {
                        return Object.keys(eventTypeList).some(function(key) {
                            return String(eventTypeList[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.eventTypeList;
            }
        },
        props: {
            eventTypeList: {
                type: Array,
                required: false,
            },
            listTitle: {
                type: String,
                required: false,
            },
            icon: {
                type: String,
                required: false,
            },
            selectMore: {
                type: Boolean,
                required: false,
                default: false
            },
            singleType: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggle(flag) {
                this.open = !this.open;
                this.docked = !flag;
                //this.produce();
            },
            watchnone() {
                this.tlt = true
                if (this.isActive == true) {
                    this.isActive = false;
                    this.wu.value='';
                    this.disable = false;
                } else {
                    this.isActive = true;
                    this.disable = true;
                    this.datas.forEach((val,index) =>{
                        val.value=''
                    })
                    this.wu.value = '无';
                }
            },     
            produce(val){
                this.tlt = true;
                this.producedatas = val.id
                this.producename = val.type;
                this.open = false;
                if(val.id != ''){
                    this.showicon = false;
                    this.spanitem = val.type;
                }else{
                    this.showicon = true;
                    this.spanitem = '';
                    val.id ='';
                }
                eventBus.bus.emit('producedata',val.id);
            },
            handleToggle(info) {
                this.selected = info.name;
                if (!this.selectMore) {
                    this.toggle();
                    this.$emit("selected", this.listTitle, info);
                } else {
                    let dom = this.$refs[info.id + 'dom'][0].$el;
                    if (this.resultList.indexOf(info.name.toString()) < 0) {
                        if (this.$props.singleType) {
                            this.resultList = [info.name];
                        } else {
                            this.resultList.push(info.name);
                        }
                        this.resultIdList.push(info.id);
                    }
                    if (dom.className == 'cw-row-selected') {
                        dom.className = '';
                        let index = this.resultList.indexOf(info.name.toString());
                        this.resultList.splice(index, 1);
                        this.resultIdList.splice(index, 1);
                    } else {
                        if (this.$props.singleType) {
                            if (this.lastDom == null) {
                                this.lastDom = dom;
                            } else {
                                this.lastDom.className = '';
                                this.lastDom = dom;
                            }
                        }
                        dom.className = 'cw-row-selected';
                    }
                    this.$emit("selected", this.listTitle, this.resultIdList);
                }
            }
        },
        mounted() {
            this.search = "";
            var mulists =document.querySelectorAll('.forlist');
            for(let i=0;i<mulists.length;i++){
                mulists[i].onclick=function(){
                    for(var j=0;j<mulists.length;j++){
                        mulists[j].className = 'mu-list forlist';
                    }
                    this.className +=' active'
                }
            }
        }
    }
</script>
<style lang="less">
    div.mu-list {
        padding: 0;
    }
   
    .form-list {
        width: 100%;
        display: flex;
        padding: 5px 10px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #efefef;
    }
    
    .form-list.active {
        background-color: #2196f3;
        color: #fff;
    }
   .spanli{
       position:absolute;
       right:10px;
       top:50%;
       transform:translateY(-50%);
   }
    div.mu-list.active{
        background-color: #2196f3;
        // color: #fff;
    }
    // div.mu-list .mu-item{
    //     color:#333;
    // }
    .cwab.mu-list.active  .mu-item{
        color: #fff;
    }
    .type-list {
        width: 62%;
    }
    
    .mu-text-field {
        margin-bottom: 0px;
        min-height: 33px;
    }
    
    .little-text .mu-text-field-content {
        height: 48px;
    }
    
    .little-text .mu-text-field-hint {
        height: 48px;
        line-height: 48px;
    }
    
    .little-text.mu-text-field {
        width: 100%;
        margin-bottom: 0;
    }
    
    .little-text .mu-text-field-input {
        border-bottom: none!important;
        height: 48px;
        line-height: 48px;
    }
    
    div.cw-list-container {
        overflow-y: scroll;
    }
    
    .mulist .mu-item-title {
        font-size: 16px;
    }
    
    .mulist .mu-item {
        padding: 10px;
    }
    
    .titlep {
        margin: 0;
        padding: 0;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        width: 100%;
        background-color: #ddd;
        font-size: 16px;
        font-weight: 500;
        padding-left: 12px;
    }
    
    p.result-list {
        padding: 16px;
        display: inline-block;
        vertical-align: middle;
        height: 50px;
    }
    
    .shequaa {
        z-index: 80 !important
    }
    
    .sheqq {
        position: fixed;
        top: 60px;
        left: 0%;
        right: 0%;
        height: 52px;
        border-bottom: 1px solid #eceff9;
    }
    
    .searchaa {
        display: inline-block;
        width: 94%;
        margin-left: 3%;
        color: #000;
        line-height: 16px;
        padding: 14px 32px;
        border-radius: 25px;
        box-sizing: border-box;
        border: 1px solid #eceff9;
        outline: none;
        background-color: rgba(255, 255, 255, .1);
        background-image: url("../../../static/images/ic-search.png");
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 15px 15px;
        caret-color: #a8acbc;
    }
    
    .searchaa::placeholder {
        color: #a8acbc
    }
    
    .cwab {
        position: absolute;
        top: 112px;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
    
    .cw-row-selected {
        background-color: #2196f3;
    }
    
    .cw-row-selected .mu-item-title {
        color: white;
    }
</style>