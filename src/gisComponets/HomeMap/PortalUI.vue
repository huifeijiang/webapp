<template>
    <div>
        <div  v-powerCode="{code:'HOMEMAP_DATAPANEL',route:'/home/portal'}">
            <div class="top-btn">
                <div class="left-cont">
                    <!-- <p>当前巡查人数: {{walkerManSum}}</p>
                    <p>当日巡查事件: {{walkerEventSum}}</p> -->
                    <p>今日上线人数: {{walkerManSum}}</p>
                </div>
                <mu-raised-button @click="viewAll" class="demo-raised-button check-all">查看所有</mu-raised-button>
            </div>
            <!-- <div  class="top-btn" @click="viewAll">
                <div class="btn-ok">
                <span class="plo"><img src="static/v2images/group.png" class="group"/></span>
                <div class="left-cont">
                    <span class="mrl">当前巡查人数: <span class="colo">{{walkerManSum}}</span></span>
                    <span>当日巡查事件: <span class="colo">{{walkerEventSum}}</span></span>
                    <img src="../../../static/v2images/ic-back.png"/>
                </div>
                </div>
            </div> -->
        </div>

        <!--<mu-float-button v-show="isSelfListShow" class="demo-float-button selfList-btn" @click="eventList">事件列表
        </mu-float-button>-->



        <!--<div  v-powerCode="{code:'HZ_REPORT',route:'/home/portal'}" @click="shangBao" class="report-btn">-->
            <!--&lt;!&ndash; <span class="icon-ic-上报" style="font-size:55px"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span> &ndash;&gt;-->
            <!--<span>上报</span>-->
        <!--</div>-->
        <div v-powerCode="{code:'HOMEMAP_MAPTIPS',route:'/home/portal'}" class="maotips">
            <section class="mar" v-for="(item,index) in tips" :key="index">
                <div class="fang " :style="{background: item.color}"></div>
                <p class="narole">{{item.role}}</p>
            </section>
        </div>




        <!--<mu-float-button v-show="isPortalUIShow" @click="shangBao" class="demo-float-button report-btn">上报-->
        <!--</mu-float-button>-->


        <!--<mu-float-button v-show="isPortalUIShow" @click="shangBao" class="demo-float-button report-btn">-->
            <!--<img width="25px" src="../../../static/images/bengzhan.png" /> 上报-->
        <!--</mu-float-button>-->
        <!--<mu-float-button  v-powerCode="{code:'HZ_REPORT',route:'/home'}" class="report-btn" @click="shangBao">上报
        </mu-float-button> 取消上报按钮-->
        <!--<mu-float-button  v-powerCode="{code:'HZ_REPORT',route:'/home'}" class="report-btn" @click="open=true">河长会议
        </mu-float-button>-->
        <div class="maotips" v-show="false">
            <section class="mar" v-for="(item,index) in tips" :key="index">
                <div class="fang " :style="{background: item.color}"></div>
                <p class="narole">{{item.role}}</p>
            </section>
        </div>
        <!-- <mu-float-button v-powerCode="{code:'HOMEMAP_MAPTIPS',route:'/home/portal'}" @click="riverStatistic" class="demo-float-button report-btn">日常巡查统计
        </mu-float-button> -->
        <mu-float-button v-powerCode="{code:'HOMEMAP_MAPTIPS',route:'/home'}" @click="open=true" class="demo-float-button confurence-btn">会议巡河
        </mu-float-button>
        <mu-float-button v-show="isXunBanUIShow" @click="moveTorenwu" class="demo-float-button xunban-btn">任务办理
        </mu-float-button>
        <!-- <mu-float-button v-show="isPortalUIShow"  @click="processlists"  class="demo-float-button processlists-btn">流程任务
        </mu-float-button>
        <mu-float-button v-show="isPortalUIShow"  @click="process"  class="demo-float-button process-btn">流程上报
        </mu-float-button> -->

        <!--<mu-float-button v-show="isPortalUIShow"  @click="processlists"  class="demo-float-button processlists-btn">流程任务-->

        </mu-float-button>
        <!--企业端新闻-->
        <div class="qy-news" v-powerCode="{code:'QY_SHANGBAO'}" @click="shownews"></div>
        <!--企业端通告-->
        <div class="qy-news tonggap" v-powerCode="{code:'QY_SHANGBAO'}" @click="showtonggao"></div>
        <!--企业端河流-->
        <div class="qy-news qy-hl" v-powerCode="{code:'QY_SHANGBAO'}" @click="toqyhe">河流</div>
        <!--end-->
        <!-- <mu-float-button v-show="isPortalUIShow" @click="huiyixunhe" class="demo-float-button report-btn">会议巡河
            </mu-float-button> -->

        <!-- <mu-float-button v-show="isXunBanUIShow"  @click="moveTorenwu" class="demo-float-button xunban-btn">任务办理
        </mu-float-button> -->
        <mu-drawer right :open="open"   class="event-walker shequaa" id="xunhe">
            <head-dom v-on:back="open=false" >河长巡河</head-dom>
            <div class="alert-head">
                <div class="back" @click="open=false">
                    <img src="static/images/ic-return.png" alt="">
                </div>
                <span>河长巡河</span>
                <span></span>
            </div>
            <div>
           
                <div class="gate-box">
                    <div  class="boxsg" @click="shangBao">
                        <img src="static/v2images/ic-ry.png" alt="">
                        <p>河长上报</p>
                    </div>
                    <div  class="boxsg" @click="shangBao1" v-powerCode="{code:'QUJI_HZ'}">
                        <img src="static/v2images/ic-youyan.png" alt="">
                        <p>会议巡河发布</p>
                    </div>
                    <div  class="boxsg" @click="shangBao3" v-powerCode="{code:'QUJI_HZ'}">
                        <img src="static/v2images/ic-qcxl.png" alt="">
                        <p>会议巡河统计</p>
                    </div>
                    <div  class="boxsg" @click="shangBao4">
                        <img src="static/v2images/ic-rcxc.png" alt="">
                        <p>会议巡河列表</p>
                    </div>
                </div>
            </div>
        </mu-drawer>
    </div>
</template>


<script>


  import { mapGetters, mapActions, mapState } from 'vuex';
  import { getPosition } from '../../components/corSys/position';
  import { locateManagerCtrl } from '../locateManager/LocateManagerCtrl';
  import { mouseMoveByGra } from '../mouseMove/MouseMoveByGra';
  import { fileTool } from '../../components/corSys/fileTool';
  import { cwLogger } from '../../components/log/log';
  import { LayerData } from './LayerData';
  import { layerManager } from '../layermanager/LayerManagerCtrl';
  import { drawRoute } from '../drawRoute/DrawRoute';
  import { eventBus } from '../../components/eventBus/eventBus';
  import { baseMapManagerCtrl } from '../map/BaseMapManagerCtrl';
  import { mapHeightType } from '../HomeMap/MapHeightType';
  import { queryManagerCtrl } from '../mouseQuery/QueryManagerCtrl';
  import { mapUIAccessTool } from './MapUIAccessTool'
  import { dateTool } from '../tool/DateTool'
  import { roleClass } from '../../components/roleClass/roleClass'
  import headDom from '../../UIcomponents/header/head.vue'
    export default {
        components: {
            headDom
        },
        data(){
            return {
                
                open:false,
                walkerManSum: '',
                walkerEventSum: '',
                tips: [
                  {
                    'role': '河长',
                    'color': '#ba6bdf'
                  },
                  {
                    'role': '环管员',
                    'color': '#07B2E0'
                  },
                  {
                    'role': '段管员',
                    'color': '#FFE75A'
                  },
                  {
                    'role': '执法员',
                    'color': '#E3352F'
                  },
//                  {
//                    'role': '小散乱污',
//                    'color': '#405157'
//                  },

                ]
            }
        },
        props: {},
        methods: {

            ...mapActions({
                setMapShow: 'setMapShow',
                setBackUIShow: 'setBackUIShow',
            }),
            jump(router) {
				this.$router.push(router);
				
			},
            shangBao: function () {
                this.setMapShow(false);
                this.$router.push("/home/eventReport");
            },
            shangBao1: function () {
                this.setMapShow(false);
                this.$router.push("/home/faqimeet");
            },
            shangBao3: function () {
                this.setMapShow(false);
                this.$router.push("/home/huiyitongji");
            },
            shangBao4: function () {
                this.setMapShow(false);
                this.$router.push("/home/meetindex");
            },
            huiyixunhe(){
                this.setMapShow(false);
                this.$router.push("/home/meetindex");
            },
            viewAll: function () {
                this.setMapShow(false);
                // this.$router.push("/home/portal/hdevent");
                this.$router.push("/home/eventGate");
                // eventBus.bus.emit('tabActive');
            },
            riverStatistic(){
              this.setMapShow(false);
              this.$router.push("/home/riverStatistic");
            },
            portalManShow: function () {
                console.log(this.$router.currentRoute.path);
                console.log("start get");
                this.$http.get(GET_ALL_PEOPLE).then(function (response) {

//                    console.log(response, "response");
                    mouseMoveByGra.addMove(response.body.data.content)
                })


                //                    console.log(response, "response");
                mouseMoveByGra.addMove(response.body.data.content)
        },
        eventList: function() {
            this.setMapShow(false);
            // this.$router.push("/home/portal/walkerMan");
            this.$router.push('/home/walkerEventSingle');
        },
        moveTorenwu: function() {
            this.setMapShow(false);
            this.$router.push("/home/portal/regulationList");
        },
        process(){
            this.setMapShow(false);
            this.$router.push("/home/process");
        },
        processlists(){
            this.setMapShow(false);
            this.$router.push("/home/processlists");
        },

        getStatistic() {
            let that = this;
            if (this.getCode.some(function(val){return val == 'HEZHANG'}) && this.getPortalUIShow) {
                that.$http.get(GET_ONLINE_PEOPLE2).then(function(response) {
                    let data = response.body.data;
                    that.walkerManSum = data.total;
                });

                that.$http.get(GET_EVENT_STATISTIC).then(function(response) {
                    let data = response.body.data;
                    that.walkerEventSum = data.total;
                    let date = new Date();
                    let dateStr = dateTool.toDate(date, 'yyyy-MM-dd') + ' 00:00:00';
                    console.log(dateStr);
                    that.$http.get(GET_WATER_EVENT + '?size=1&startTime=' + dateStr).then((res) => {

                        that.walkerEventSum += res.body.data.totalElements;
                    })
                })
            }

        },
        refreshPanel: function() {
            setInterval(() => {
                this.getStatistic();

            }, 10000)
        },
        shownews() {
          this.setMapShow(false);
          this.$router.push("/home/qynews");
        },
        showtonggao() {
          this.setMapShow(false);
          this.$router.push("/home/qytonggao");
        },
        toqyhe() {
          this.setMapShow(false);
          this.$router.push("/home/qyrivers");
        }
    },
    computed: {
      ...mapGetters({
        getMapShow: 'getMapShow',
        getLayerUIShow: 'getLayerUIShow',
        getPortalUIShow: 'getPortalUIShow',
        getRiverHeight: 'getRiverHeight',
        getRiverUIShow: 'getRiverUIShow',
        getLocateUIShow: "getLocateUIShow",
        getBackUIShow: "getBackUIShow",
        getRole: 'getRole',
        getCode: 'getCode'
      }),
      isPortalUIShow: {
        get() {
          if (this.getPortalUIShow == true) {

            if (mapUIAccessTool.shangbao.includes(Number(this.getRole))) {
              return true;
            }
            else {
              return false;
            }
          }
          else {

            return false;
          }

        }
      },
      isViewAllUIShow: {
        get() {
          let that = this;
          if (this.getPortalUIShow == true) {
            let route = this.$router.currentRoute;
            if (mapUIAccessTool.viewAllList.includes(Number(this.getRole))) {

              if (route.path == "/home") {

              }
              else {
                that.portalManShow();
              }
              return true;

            }
          }
          else {
            mouseMoveByGra.removeMove();
            return false;
          }

        }
      },
      isSelfListShow: {
        get() {
          if (this.getPortalUIShow == true) {
            if (mapUIAccessTool.shangbaoList.includes(Number(this.getRole))) {
              return true;
            }
            else {
              return false
            }
          }
          else {
            return false;
          }
        }
      },
      isXunBanUIShow: {
        get() {
          if (this.getPortalUIShow == true) {

            if (mapUIAccessTool.xunchaban.includes(Number(this.getRole))) {
              return true;
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }

        }
      }
    },
    mounted() {
        console.log("mounted");
        let that = this;
        mouseMoveByGra.init();
        LayerData.staticsInterval = setInterval(() => {
            this.getStatistic();
        }, 10000)
        //            this.refreshPanel();

    },
    destroyed() {
        clearInterval(LayerData.staticsInterval);
        LayerData.staticsInterval = null;
    }
}
</script>

<style scoped lang="less">
    #xunhe{
        background:#fff;
        z-index:80;
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
    text-indent: -15px;
}
  .fang {
    width: 20px;
    height: 8px;
    margin: 4px auto;
    display: inherit;
  }
    .report-btn {
        position: fixed;
        right: 20px;
        bottom: 76px;
        z-index: 65;
    }
    .tongji-btn {
      position: fixed;
      left: 50%;
      bottom: 76px;
      z-index: 65;
    }
    .xunban-btn{
      position: fixed;
      right: 20px;
      bottom: 76px;
      z-index: 65;

    }
    .shangbao{
        position:fixed;
        right:20px;
        bottom:76px;
        z-index: 65;
    }
    .top-btn {
        position: fixed;
        left: 50%;
        top: 25px;
        width: 90%;
        height: 80px;
        margin-left: -45%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, .9);
        z-index: 65;
    }
    .center-title{
    font-size:18px;
  }
	.gate-wrap {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 72;
		background-color: #fff;
	}
	.gate-head {
		  position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 56px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    background-color: #4BAAF4;
	    box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
	    color: #fff;
	}
  .alert-left{
    position:absolute;
    left:15px;
  }
	.hidden {
		/*visibility: hidden;*/
    display: none;
	}
	.gate-box {
		height: auto;
		margin-top: 150px;
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}
	.boxsg {
		float: left;
		width: 33%;
		margin-bottom: 10px;
		text-align: center;
		img {
			width: 80%;
		}
		p {
			text-align: center;
		}
	}
    .left-cont {
        flex-grow: 1;
        margin-left: 20px;
    }

    .left-cont p {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .check-all {
        display: inline-block;
        width: 34%;
        height: 44px;
        line-height: 44px;
        margin-right: 20px;
        border: 1px solid #ccc;
        text-align: center;
        border-radius: 3px;
    }

    .selfList-btn {
        position: fixed;
        left: 50%;
        bottom: 76px;
        z-index: 65;
        margin-left: -28px;
    }


.report-btn {
    position: fixed;
    left: 50%;
    bottom: 75px;
    z-index: 65;
    width: 108px;
    height:60px;
    line-height: 53px;
    text-align: center;
    margin-left: -55px;
    border-radius: 50px;
    color: #fff;
    background: url("../../../static/v2images/shangbaobtn.png") no-repeat;
    background-size: 100% 100%;
}
.report-btn span {
    font-size: 16px;
    padding-left: 15px;
}
.group{
        width: 55px;
    border-style: none;
    border-radius: 42px;
}
.maotips {
    position: fixed;
    right: 20px;
    bottom: 65px;
    z-index: 65;
    width: 50px;
    padding:10px 0;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(223, 224, 230, 0.17);
    box-shadow: 0 0px 4px 0px rgba(118, 139, 155, 0.2266191123188406)
}

.narole {
    color: #767985;
    font-size: 12px;
    word-break: keep-all;
    width: 100%;
    text-align: center;
    overflow: hidden;
    transform: scale(0.8,0.8);
    -webkit-transform: scale(0.8,0.8);
    transform-origin: center top;
    -webkit-transform-origin: center center;
}


.report-btn {
  position: fixed;
  left: 50%;
  bottom: 76px;
  z-index: 65;
  width: 100px;
  margin-left: -50px;
  height: 52px;
  border-radius: 100px;
  background: #2196f3;
  box-shadow: 0 2px 4px 0px rgba(118, 139, 155, 0.5)
}
.confurence-btn{
    position: fixed;
    right: 20px;
    bottom: 76px;
    z-index: 80;
    background:#2196f3
}
.xunban-btn {
    position: fixed;
    right: 20px;
    bottom: 76px;
    z-index: 65;
}

.processlists-btn{
  position: fixed;
  left: 20px;
  bottom: 222px;
  z-index: 65;
}
.process-btn{
  position: fixed;
  left: 20px;
  bottom: 152px;
  z-index: 65;
}


.btn-ok{
    position: relative;
    width:100%;
    border-radius: 24px;
    height:100% ;
    background: rgba(5,170,244,0.8);
}
.mrl{
    margin-right: 10px
}
.plo{
    position: absolute;
    top: -16px;
    left: -8px;
    font-size:55px
}
.colo{
    color:#fdee14;
    font-size: 16px;
}

.check-all {
    display: inline-block;
    width: 34%;
    height: 44px;
    line-height: 44px;
    margin-right: 20px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 3px;
}

.selfList-btn {
    position: fixed;
    left: 50%;
    bottom: 76px;
    z-index: 65;
    margin-left: -28px;
}
.qy-news {
  position: fixed;
  left: 20px;
  top: 80px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-image: url('../../../static/v2images/ic-tong-g.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 60;
}
.tonggap {
  top: 145px;
  background-image: url('../../../static/v2images/ic-new-s.png');
}
.qy-hl {
  top: 205px;
  text-align: center;
  line-height: 55px;
  background: #fff;
}
</style>
