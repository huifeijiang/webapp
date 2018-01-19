<template>
    <div>
        <div class="btns-wrap">
            <div class="news-btns">
                <a href="javascript:;" class="btn-n borright" :class="tab=='tab1'?'active':''" @click="toggleTab('tab1')">待办理</a> 
                <a href="javascript:;" class="btn-n" :class="tab=='tab2'?'active':''" @click="toggleTab('tab2')">已办理</a>
            </div>
        </div>
        
        <div class="range-sell">
            <span>项目</span>
            <span>类型</span>
            <span>进展</span>
            <span>状态</span>
        </div>

        <div v-show="tab=='tab1'" class="river-content">
            <div class="banli-list" v-for="(item, index) in data" @click="banli(item)">
                <span>{{(index+1) + '.' + item.serialNumber}}</span>
                <span>{{item.type}}</span>
                <span>{{item.completionRate}}</span>
                <span>{{item.statusEvaluation}}</span>   
            </div>
		</div>
        
        <div v-show="tab=='tab2'" class="river-content">
            <div class="banli-list" v-for="(item, index) in done"  @click="jilu(item)">
                <span>{{(index+1) + '.' + item.serialNumber}}</span>
                <span>{{item.type}}</span>
                <span>{{item.completionRate}}</span>
                <span>{{item.statusEvaluation}}</span>    
            </div>
        </div>
        
        <mu-drawer right :open="openTwo" class="table-detail">
            <mu-appbar>
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="openTwo=false"/>
                <p  class="drawer-title-p" slot="default">{{sserialNumber}}</p>
                <span class="drawer-title-span" slot="right" @click="chuli">办理</span>
            </mu-appbar>
            <div class="table-detail-ww">
                <textarea class="textarea" placeholder="请填写办理内容(非必填)..." rows="6" v-model="describe"></textarea>
                <river-build-detail :tableData2="selectedData"></river-build-detail>
            </div>
            <mu-dialog :open="dialog" title="Alert Dialog">
                <p class="dialog-p" slot="title">办理成功</p>
                <div class="dialog-div" slot="actions">
                    <mu-flat-button label="确定"  primary @click="backPage"/>
                </div>
            </mu-dialog>
        </mu-drawer>
    
        <mu-drawer right :open="open" class="table-detail">
            <mu-appbar>
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="open=false"/>
                <p  class="drawer-title-p" slot="default">办理记录</p>
                <span class="drawer-title-span hidden" slot="right">办理</span>
            </mu-appbar>
            <div class="table-detail-ww">
                <!--办理详情-->
                <div class="usb">
                    <p class="rar-p">办理详情</p>
                    <div class="usb-w">
                        <span>办理内容:</span>
                        <span>{{doneData.name}}</span>
                    </div>
                    <div class="usb-w">
                        <span>办理时间:</span>
                        <span>{{doneData.completionDeadline}}</span>
                    </div>
                </div>
                <!--end-->
                
                <!--经办详情-->
                <div class="usb">
                    <p class="rar-p">经办详情</p>
                    <div class="usb-w">
                        <span>经办人:</span>
                        <span>{{doneData.handler}}</span>
                    </div>
                    <div class="usb-w">
                        <span>办理内容:</span>
                        <span>{{doneData.handleDescribe}}</span>
                    </div>
                    <div class="usb-w">
                        <span>办理时间:</span>
                        <span>{{format(doneData.handletime)}}</span>
                    </div>
                </div> 
                <!--end-->
                <river-build-detail :tableData2="doneData"></river-build-detail>
            </div> 
        </mu-drawer>

    </div>
</template>
<script>
    import riverBuildDetail from "./river_build_detail.vue";
    import {mapGetters, mapActions, mapState } from 'vuex';
    import {mapHeightType} from '../../../gisComponets/HomeMap/MapHeightType'
    export default{
        components:{
            riverBuildDetail
        },
        data(){
            return {
                sserialNumber:'',
                data: [],
                done: [],
                describe: '',
                selectedData: {},
                doneData: {},
                tab:'tab1',
                open: false,
                openTwo: false,
                dialog: false
            }
        },
        created() {
            //获取待办理
            this.getProjectStatus();
        },
        computed:{
            ...mapGetters({
                getNowRiver:'getNowRiver',
                getBuildTab:'getBuildTab',
            })
        },
        methods: {
            ...mapActions({
                setMapShow: 'setMapShow',
                setLayerUIShow: 'setLayerUIShow',
                setPortalUIShow: 'setPortalUIShow',
                setRiverHeight: 'setRiverHeight',
                setProjectId:'setProjectId'
            }),
            getDetail(id,sserialNumber){
                this.sserialNumber = sserialNumber;
                this.open = true;
                let selectedId = id;
                this.setProjectId(id);
                this.setMapShow(false);
                this.setRiverHeight(mapHeightType.main);
                this.setLayerUIShow(false);
                this.setPortalUIShow(false);
                this.getProjectDetail(selectedId);
            },
            toggle() {
                if(this.open){
                    this.setMapShow(false);
                }else{
                    this.setMapShow(true);
                }
                this.open = !this.open
            },
            getProjectStatus() {
                let that = this;
                let riverId = that.getNowRiver.id;
                that.$http.get(GET_PROJECT_STATUS + '/' + riverId + '/projects?status=0').then(function (response) {
                    that.data = response.body.data.content;
                });
            },
            getDone() {
                let that = this;
                let riverId = that.getNowRiver.id;
                that.$http.get(GET_PROJECT_STATUS + '/' + riverId + '/projects?status=1').then(function (response) {
                    that.done = response.body.data.content;
                });
            },
            getProjectDetail(projectId) {
                let that = this;
                this.$http.get(GET_PROJECT_DETAIL + projectId + '/details').then(function (response) {
                    that.selectedData = response.body.data;
                });
            },
            toggleTab(str) {
                this.tab = str;
                if(str == 'tab2') {
                    this.getDone();
                }
            },
            banli(item) {
                this.openTwo = true;
                this.sserialNumber = item.serialNumber;
                this.getProjectDetail(item.id);
            },
            jilu(item) {
                this.open = true;
                this.$http.get(GET_PROJECT_DETAIL + item.id + '/details').then( (response) => {
                    this.doneData = response.body.data;
                });
            },
            chuli() {
                let id = this.selectedData.id;
                this.$http.patch(PATCH_EVENT + id,{
                    describe: this.describe
                }).then( res => {
                    if(res.body.code == 200) {
                        this.dialog = true;
                    }
                }).catch( err => {})
            },
            backPage() {
                this.dialog  = false;
                this.openTwo = false;
                this.describe= '';
            },
            format(time) {
                let date = new Date(time);
                return date.toLocaleString();
            }
        }
    }
</script>
<style lang="less" scoped>
    .table-detail {
        width: 100%;
        z-index: 59;
    }
    .river-content {
        position:absolute;
        top:190px;
        border-top: 1px solid #efefef;
        bottom: 5px;
        left:0;
        right:0;
        overflow-y: auto;
        background-color: #fff;
    }
    .table-detail-ww {
        position: absolute;
        left: 0;
        right: 0;
        top: 55px;
        bottom: 5px;
        overflow-y: auto;        
    }
    .btns-wrap {
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
    }
    .news-btns {
        display: flex;
        width: 94%;
        margin: 0 auto;
        border: 1px solid #54A4D7;
        border-radius: 2px;
    }
    .news-btns .btn-n {
        width: 50%;
        font-size: 14px;
        text-align: center;
        padding: 5px 0;
        color: #54A4D7;
    }
    .news-btns .borright {
        border-right: 1px solid #54A4D7;
    }
    .news-btns .active {
        background-color: #54A4D7;
        color: #fff;
    }
    .banli-list ,.range-sell {
        display: flex;
        padding: 5px 0;
        justify-content: space-around;
        background-color: #fff;
    }
    .banli-list {
        padding: 10px 0;
        border-bottom: 1px solid #efefef;
    }
    .banli-list span,.range-sell span {
        width: 25%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .drawer-title-p {
        text-align: center;
    }
    .drawer-title-span {
        font-size: 16px;
        padding: 10px 10px;
    }
    .textarea {
        width: 100%;
        outline: none;
        border: none;
    }
    .hidden {
        visibility: hidden;
    }
    .usb {
        border-bottom: 1px solid #efefef;
    }
    .usb-w {
        width: 90%;
        margin: 0 auto;
        display: flex;
    }
    .usb-w span {
        min-width: 65px;
    }
    .rar-p {
        padding: 10px 0;
        text-indent: 10px;
        font-size: 16px;
        background-color: #efefef;
        border-bottom: 1px solid #efefef;
    }
    .dialog-p {
        width: 100%;
        text-align: center;
    }
    .dialog-div {
        width: 100%;
        text-align: center;
    }
</style>
