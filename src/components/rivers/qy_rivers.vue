<template>
	<div class="qy-rv">
        <div class="rv-head">
            <span @click="nativeBack">返回</span>
            <span>河流列表</span>
            <span class="hidden">隐藏</span>
        </div>
		<div class="river-head">
			<input class="search" type="text" v-model="search" placeholder="输入河流相关关键字">
		</div>
		<div class="river-title">
			<img class="river-title-icon ml" src="static/v2images/shuihui.png" alt="">
			<span class="shui">水质类型说明</span>
			<img class="river-title-level" src="static/v2images/shuizhi.png" alt="">
		</div>
		<div class="river-content">
			<div class="river-list  f_clear" v-for="(item,index) in earchData" :key="index+'rl'" @click="showDrawer(item,index)">
                <div class="baohan f_le"><div :class="[(getColor(item.polutionLevel,index)),('leve')]" ><div class="xianzhi">{{item.name}}</div></div></div>
                    <div class="left-mess f_ri border-1px" >
					<p class="topa"><span class="left-mess-tit">{{item.name}}</span></p>
					<!-- <p class="left-mess-hezhang">{{item.manager}}</p> -->
                    </div>
                    <!-- <span :class="getColor(item.polutionLevel,index)"> -->
                    <!-- <span ><i class="icon-water"></i>{{getLevel(item.polutionLevel,index)}}</span> -->
                    <img  src="static/images/ic-go.png" alt="">
            </div>
            <div class="noreiver"><img v-show="earchData.length == 0" src="static/v2images/noriver.png" class="no-river-img" /></div>
		</div>
		<mu-drawer class="list-alert" right :open="open" >

            <div class="alert-head">
                <div class="back" @click="backHandle">
                    <img src="static/images/ic-return.png" alt="">
                </div>
                <span>{{nowItem.name}}</span>
                <span  class="mu-icon material-icons filter-icon " :class="{'visible-hidden':filterFlag}" @click="showFilter()">find_replace</span>
            </div>
		   	<div class="nothin"></div>
			<mu-tabs class="padding-top rivers-tab" :value="activeTab" @change="handleTabChange">
			  	<mu-tab value="/qyrivers/strajy" title="一河一策"/>
			  	<mu-tab value="/qyrivers/view" title="一河一景"/>
			</mu-tabs>
            <mu-drawer right :open="openFilter" @close="toggle2(true)" class="filter">
                <mu-appbar title="类型"/>
                <mu-list>
                    <mu-list-item
                            v-for="(item,index) in projectType"
                            :title="item.name" @click="showFilter(item)"
                            :key="index">
                        <mu-switch :value="item.value ? true : false" label="" slot="right"  @change="showFilter(item)"/>
                    </mu-list-item>
                </mu-list>
            </mu-drawer>
			<div class="sub-route">
				<router-view></router-view>
			</div>
	  	</mu-drawer>
	</div>
</template>

<script>

    import {mapGetters, mapActions, mapState} from 'vuex';
    import {locateManagerCtrl} from '../../gisComponets/locateManager/LocateManagerCtrl';
    import {layerManager} from '../../gisComponets/layermanager/LayerManagerCtrl';
    import {mapHeightType} from '../../gisComponets/HomeMap/MapHeightType';
    import {eventEmitter} from './river_event.js';
    import {LayerData} from '../../gisComponets/HomeMap/LayerData';
    import {eventBus} from '../../components/eventBus/eventBus';

    export default {
        data(){
            return {
                open: false,
                openFilter: false,
                activeTab: '/qyrivers/strajy',
                nowItem: {
                    name: '茅洲河'
                },
                projectType:[],
                docked: true,
                filterFlag:true,
                search:''
            }
        },
        computed:{
            ...mapGetters({
                getDocumentRiverObj: 'getDocumentRiverObj',
                getDocumentTab:'getDocumentTab',
                getRivers:'getRivers'
            }),
            earchData: function() {
                var search = this.search;
                if (search) {
                    return this.getRivers.filter(function(getRivers) {
                        return Object.keys(getRivers).some(function(key) {
                            return String(getRivers[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }

                return this.getRivers;
            }
        },
        methods: {
            ...mapActions({
                setMapShow: 'setMapShow',
                setLayerUIShow: 'setLayerUIShow',
                setPortalUIShow: 'setPortalUIShow',
                setRiverHeight: 'setRiverHeight',
                setDocumentRiverObj:'setDocumentRiverObj',
                setRivers:'setRivers',
                setNowRiver:'setNowRiver'
            }),
            toggle2 (flag) {
                this.openFilter = !this.openFilter
                this.docked = !flag
            },
            showDrawer(item,index){
                // if(index > 9){
                //     return;
                // }
                //隐藏底部nav
                this.$store.state.rivers.showNav = false;
                //end    
                this.open = true;
                this.nowItem = item;
                this.setNowRiver(item);
                this.setDocumentRiverObj(item);
                console.log(this.activeTab);
                this.activeTab = '/qyrivers/strajy';
                if(this.activeTab == "/rivers/document")
                {
                  if(this.getDocumentTab == "tab1")
                  {
                    this.setMapShow(true);
                    this.setRiverHeight(mapHeightType.riverDocument);
                    this.setLayerUIShow(false);
                    this.setPortalUIShow(false);
                    locateManagerCtrl.zoomByExpresstion(mapConfig.mapId,"河流","name = '" +  this.getDocumentRiverObj.name + "'" )  ;
                  }

                }
                this.$router.push('/home/qyrivers');
                eventEmitter.emit('river_detail',item);
            },

            handleTabChange(val){
                this.activeTab = val;
                this.filterFlag = true;

                this.$router.push('/home' + val);
                if(val === '/rivers/build'){
                    //一河一建的过滤先隐藏
                    this.filterFlag = true;
                }
                if (val == "/rivers/document") {
                    this.setMapShow(true);
                    this.setRiverHeight(mapHeightType.riverDocument);
                    this.setLayerUIShow(false);
                    this.setPortalUIShow(false);
                    LayerData.showPortalLayer();
                    locateManagerCtrl.zoomByExpresstion(mapConfig.mapId,"河流","name = '" +  this.getDocumentRiverObj.name + "'" )  ;
                }
                else {

                    let graphicLayers  = layerManager.setGraphicLayer(mapConfig.mapId,"河流");
                    graphicLayers.clear();
                    this.setMapShow(false);
                    this.setRiverHeight(mapHeightType.main);
                }

            },
            getLevel(level,index){
                // if(index > 9){
                //     return '';
                // }
                if (level == 1) {
                    return '不黑不臭';
                } else if(level==2){
                    return '轻度黑臭';
                }else{
                    //3
                    return '重度黑臭';
                }
            },
            getColor(level,index){
                // if(index > 9){
                //     return 'level_null';
                // }
                if (level == 1) {
                    return 'level_1';
                } else if (level == 2) {
                    return 'level_2';
                } else {
                    //3
                    return 'level_3';
                }
            },
            showFilter(item){
                this.openFilter = !this.openFilter;
                if(item){
                    item.value = Math.abs(item.value - 1);
                }

            },
            backHandle:function () {
                //显示底部nav
                this.$store.state.rivers.showNav = true;
                //end    
              this.open = false
              this.setMapShow(false);
              this.setRiverHeight(mapHeightType.main);
            },
            nativeBack(e){
                this.setMapShow(true);
                this.$router.push('/home');
            }
        },
        mounted(){
            let that = this;
            
            function getProjectType() {
                that.$http.get(GET_PROJECT_TYPE).then(function (response) {
                    that.projectType = response.body.data;
                })
            }
            function getRiverInfo() {
                that.$http.get(GET_RIVER_INFO).then(function (response) {
                    let rivers = response.body.data.content;
                    that.setRivers(rivers);
                })
            }
            if(this.$store.state.rivers.firstComing){
                getProjectType();
                getRiverInfo();
                this.$store.state.rivers.firstComing = false;
            }

            document.addEventListener(eventBus.BACK_BUTTON,this.nativeBack,false);
        },
        destroyed(){
            document.removeEventListener(eventBus.BACK_BUTTON,this.nativeBack,false);
        }
    }
</script>

<style scoped>
    .qy-rv {
       position: fixed;
       left:0;
       right: 0;
       top: 0;
       bottom: 5px;
       z-index: 200;
       overflow:hidden;
       background-color: #fff;
    }
    .rv-head {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        background-color: #30aafd;
        color: #fff;
        border-bottom: 1px solid #efefef;
    }
     .rv-head span {
        padding-left: 10px;
     }
    .river-page {
        /*height: 100%;*/
    }

    .nothin {
        height: 1px;
    }
    .ml{
        margin-left: 10px
    }
    .river-head {
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(left, #30aafd, #2eccfc);
        background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
        background: -moz-linear-gradient(left, #30aafd, #2eccfc);
        background: -o-linear-gradient(left, #30aafd, #2eccfc);
    }
    .leve{
        width:42px;
        height: 42px;
        border-radius: 50%;
        color:#fff;
        font-size: 12px;
        word-break: break-all;
    }
    .xianzhi{
        width:27px;
        height: 42px;
        overflow: hidden;
        margin:0 auto;
        text-align: center;
        line-height: 42px;
    }
    .search {
        display: inline-block;
        width: 94%;
        color: #fff;
        line-height: 16px;
        padding: 10px 35px;
        border-radius: 25px;
        box-sizing: border-box;
        border: none;
        outline: none;
        background-color: rgba(255, 255, 255, .1);
        background-image: url("../../../static/images/ic-search.png");
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 15px 15px;
    }

    .river-title {
        padding: 10px 0;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        background-color: #fff;
    }

    .river-title .shui {
        color: #A8ACBC;
        font-size: 14px;
        margin: 0 40px 0 3px;
    }

    .river-title-icon {
        width: 28px;
        margin-left: 18px;
    }
    .noreiver{
        width: 100%;
        text-align: center;
        margin-top: 90px;
    }
    .river-title-level {
        width: 150px;
        margin-right: 10px;
        height: 22px;
    }

    .river-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 160px;
        bottom: 5px;
        overflow-y: auto;
    }

    .river-list {
        position: relative;
        width: 94%;
        margin: 0 auto;
        height: 55px;
        /* border-bottom: 1px solid #efefef; */
    }
    .river-list img{
        position: absolute;
        right: 0;
        top:20px
    }
    @media screen and (min-width:414px) {
		.left-mess {
            width: 86% !important; 
        }
	}
    .left-mess {
        width: 85%;
        height: 55px;
        position: relative;
    }
    .baohan{
        margin-top:7px;
    }
    .left-mess-hezhang {
        font-size: 14px;
        color: #A8ACBC;
    }

    .left-mess p {
        margin-top: 0;
        margin-bottom: 0;
    }
    .topa{
        margin-top: 16px !important
    }
    .river-list img {
        width: 9px;
        margin-left: 10px;
    }

    .list-alert {
        width: 100%;
        z-index: 59;
    }

    .sub-route {
        width: 100%;
        background: #f9fcff;
    }

    .padding-top {
        margin-top: 55px;
        border-bottom: 1px solid #efefef;
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
    .visible-hidden{
        visibility: hidden;
    }
    .hidden {
        visibility: hidden;
        margin-right: 15px;
    }

    .left-mess-tit {
        color: #5A5E6F ;
        font-size: 16px;
    }

    .left-mess-txt {
        color: #ccc;
        font-size: 14px;
    }

    .left-mess-txt span {
        display: inline-block;
        padding-left: 14px;

    }

    .level_1 {
        background: #4FCFBC;
    }

    .level_2 {
         background: #FFB400 
    }

    .level_3 {
        
        background: #F36487
    }
    .level_null{
        color:#F7FBFA;
    }
    .mu-tab-link {
        background-color: #fff;
        color: #6a6e7b;
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .mu-tab-active {
        color: #50A2D6;
    }
    .filter-icon{
        padding: 15px;
    }
    .filter{
        z-index: 999;
    }
    .filter-switch{
        padding: 12px 16px 12px 16px;
        font-size: 16px;

    }
    div.mu-switch-wrapper{
        display: flex;
        justify-content: space-between;
    }
    .no-river-img {
    }
</style>
