<template>
    <div class="SAS">
        <p class="sas-p">项目详情</p>
        <div class="tab-content" v-show="getBuildTab == 'tab2'">
            <div class="table-list-wrapa" ref="tableWrap">
                <slot v-for="(param,key) in tableData2">
                    <div class="table-list" v-if="map[key]">
                        <span class="setWidth" >{{map[key]}}</span>
                        <span class="setWidth">{{param}}</span>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { tableData } from '../rivers_detail/tableData.js';
    import headDom from '../../../UIcomponents/header/head';
    import { mapGetters,mapActions,mapState} from 'vuex';
    import {mapHeightType} from '../../../gisComponets/HomeMap/MapHeightType'
    export default {
        components:{
            headDom
        },
        data(){
            return {
                tableData:[],
                activeTab:"tab2",
                map:{
                    "id": "id",
                    "type": "项目类别",
                    "subPrjName": "子项名称",
                    "name": "序号",
                    "riverId":"河流编号",
                    "task": "工作任务",
                    "completionDeadline": "完成时限",
                    "responsibilityAreaLeader": "责任区领导",
                    "responsibilityStreetLeader": "责任街道领导",
                    "responsibilityDepartmentLeader": "责任部门领导",
                    "firstParty": "甲方",
                    "firstPartyResponsibilityLeader": "责任领导",
                    "firstPartyContact": "甲方联系人",
                    "firstPartyContactNumber": "甲方联系电话",
                    "secondParty": "乙方",
                    "secondPartyResponsibilityLeader": "乙方责任领导",
                    "secondPartyContact": "乙方联系人",
                    "secondPartyContactNumber": "乙方联系电话",
                    "workProgress": "工作进展",
                    "completionRate": "完成率",
                    "status": "状态评价"
                }
            }
        },
        props:['tableData2'],
        computed:{
            ...mapGetters({
                getBuildTab:'getBuildTab',
                getNowRiver:'getNowRiver',
            })
        },
        methods:{
            ...mapActions({
                setMapShow: 'setMapShow',
                setLayerUIShow:'setLayerUIShow',
                setPortalUIShow:'setPortalUIShow',
                setRiverHeight:'setRiverHeight',
                setBuildTab:'setBuildTab'
            }),

            handleTabChange (val) {
            	  this.setBuildTab(val);
                if(val!=this.activeTab){
                    if(this.activeTab != 'tab1') this.$refs[this.activeTab].className = 'btn-n';
                    else this.$refs[this.activeTab].className = 'btn-n borright';
                    this.$refs[val].className = 'btn-n active';
                    this.activeTab = val;
                }
                if(val == "tab1") {
                    this.setMapShow(true);
                    this.setRiverHeight(mapHeightType.riverBuild);
                    this.setLayerUIShow(false);
                    this.setPortalUIShow(false);
                }
                else {
                    this.setMapShow(false);
                }

            },
            getRiverDetail(riverId = '1') {
                let that = this;
                let url = baseUrl + "/rivers/"+ riverId +"/details";
                this.$http.get(url).then(res =>{
                    that.tableData = res.body.data;
                }).catch(error =>{
                    console.log("请求错误",error);
                });
            }
        },
        mounted(){
            let height = window.innerHeight;
            //this.$refs.tableWrap.style.height = height - 170 + 'px';
            this.handleTabChange('tab2');
            let river = this.getNowRiver;
            let riverId = river.id;

        }
    }
</script>

<style scoped>
    .SAS .tab-content{
        /*position: absolute;
        top:55px;
        bottom: 0;
        left: 3%;
        right: 3%;
        overflow: auto;*/
    }
    .sas-p {
        padding: 10px 0;
        text-indent: 10px;
        font-size: 16px;
        background-color: #efefef;
        border-bottom: 1px solid #efefef;
    }
    .news-btns{
        display: flex;
        width: 94%;
        margin: 0 auto;
        border:1px solid #54A4D7;
        border-radius: 2px;
    }
    .btn-n{
        width: 50%;
        font-size: 14px;
        text-align: center;
        padding: 5px 0;
        color: #54A4D7;
    }
    .borright{
        border-right:1px solid #54A4D7;
    }
    .active{
        background-color: #54A4D7;
        color: #fff;
    }
    .setWidth{
        vertical-align: middle;
        max-width: 60%;
    }
    .reidealt .table-list-wrap{
        width: 92%;
        position: absolute;
        top: 56px;
        left: 0;
        right: 0;
        bottom:56px;
        overflow: auto;
    }
    .table-title{
        font-size: 16px;
        padding: 10px 0;
        border-bottom: 1px solid #efefef;
        font-weight: bold;
    }
    .table-list{
        display: flex;
        width: auto;
        padding: 10px 0;
        border-bottom: 1px solid #efefef;
        justify-content: space-between;
    }
    .table-list span{
        font-size: 14px;
        color: #6a6e7b;
    }
</style>
