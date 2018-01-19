<template>
    <div class="event-wrap">
        <head-dom v-on:back="backToHome" :type="'back'">任务列表</head-dom>
        <div class="nothin"></div>

        <div class="btns-wrap">
            <div class="watch-list" @click="showBottomRange"><img src="static/v2images/jiancedian.png" class="icon-jian">
                <span class="flex-grow">事件状态</span>
                <span class="no-flex-grow">{{statusname}}</span> <img src="static/images/ic-go.png" alt="" class="rig">
            </div>
            <div class="allshi">{{statusname}}事件：{{totalElements}}</div>
            <!-- <div class="news-btns">
                    <a href="javascript:;" class="btn-n borright active" @click="handleTabChange('tab1',1)" ref="tab1">待接收{{Toreceive}}</a>
                    <a href="javascript:;" class="btn-n" @click="handleTabChange('tab1',2)" ref="tab2">待处理{{pendding}}</a>
                    <a href="javascript:;" class="btn-n" @click="handleTabChange('tab1',3)" ref="tab3">已处理{{finish}}</a>
                    <a href="javascript:;" class="btn-n" @click="handleTabChange('tab1',4)" ref="tab4">已退回{{Returned}}</a>
                </div> -->
        </div>

        <div class="news-wrap" ref="newsWrap">
            <div v-if="activeTab === 'tab1'">
                <div class="list-event border-1px">
                    <div class="item-name firs">姓名</div>
                    <div class="item-name">类型</div>
                    <div class="item-name">时间</div>
                    <div class="item-name">社区</div>
                </div>
                <div class="list-event border-1px" v-for="(item,index) in list" :key="index" @click="toggle(item,false)">
                    <div class="item-name firs">{{index+1}}.{{item.userName}}</div>
                    <div class="item-name">{{item.eventTypeName}}</div>
                    <div class="item-name">{{item.datetime.split(" ")[0]}}</div>
                    <div class="item-name">{{item.gridName}}</div>
                </div>
            </div>

        </div>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
        <mu-drawer class="news-alert" right :open="open">
            <regulation-event @back="open=false" @showOpenTwo="opentwo=true"></regulation-event>
        </mu-drawer>

        <mu-drawer class="news-alert" right :open="opentwo">
            <div class="alert-head">
                <span class="alert-left" @click="backHandletwo">返回</span>
                <span class="alert-title">事件处理</span>
                <span class="alert-right" @click="showdialog">完成</span>
            </div>
            <div class="nothin"></div>
            <mu-text-field
              @blur="getTextContent"
              v-model="value"
              :required=true
              hintText="请输入描述..."
              errorText="事件描述不可为空"
              :errorText="multiLineInputErrorText"
              @textOverflow="handleMultiLineOverflow"
              multiLine :rows="5" :rowsMax="5" :maxLength="200" required fullWidth class="keep-dis" />
            <div class="news-content" ref="newsContent">
                <div class="title">请上传办理图片</div>
                <photograph></photograph>
                <mu-dialog :open="textValueNull" title="提示">
                    {{tip}}
                    <mu-flat-button slot="actions" @click="close" primary label="取消" />
                    <mu-flat-button slot="actions" primary @click="submit" label="确定" />
                </mu-dialog>
            </div>
        </mu-drawer>
        <!--选择事件状态-->
        <simple-sheet v-model="eventStatusVmodel" @select="eventStatusChange"></simple-sheet>
        <!--end-->
    </div>
</template>

<script>
import headDom from '../../UIcomponents/header/head';
import regulationEvent from '../regulationEvent/regulationEvent';
import { eventBus } from '../../components/eventBus/eventBus';
import handleDetail from '../handleEventDetail/handleEventDetail';
import { mapActions, mapGetters } from 'vuex';
import photograph from '../../UIcomponents/photoGraph/PhotoGraph';
import simpleSheet from '../../UIcomponents/simpleSheet/simpleSheet.vue';
export default {
    components: {
        headDom,
        handleDetail,
        photograph,
        regulationEvent,
        simpleSheet
    },

    data() {
        return {
            statusname:'待处理',
            totalElements:'',
            eventStatusVmodel: {
                show: false,
                name: '事件状态',
                selected: '待处理',
                list: [{
                    name: '待接收',
                    selected: true
                }, {
                    name: '待处理',
                    selected: false
                }, {
                    name: '已处理',
                    selected: false
                }, {
                    name: '已退回',
                    selected: false
                }]
            },
            scroller: '',
            loading: false,
            multiLineInputErrorText: '',
            value: '',
            tip: '请确定是否提交',
            activeTab: 'tab1',
            defaultTab: 'tab1',
            newsData: [],
            messageData: [],
            open: false,
            opentwo: false,
            nowItem: null,
            textValueNull: false,
            imgList: [],
            selectedItem: null,
            tableData: [],
            pendding: "",
            finish: "",
            Toreceive: "",
            Returned: "",
            list: [],
            eventDone: false,
            images: [],
            doneMess: '',
            status: '',
            page: 1

        }
    },
    computed: {
        ...mapGetters({
            getUserId: 'getUserId'
        })
    },
    methods: {
        ...mapActions({
            setMapShow: 'setMapShow'
        }),
        showBottomRange() {
            this.eventStatusVmodel.show = true;
        },
        eventStatusChange(item) {
            this.statusname = item.name;
            this.noData = false;
            if (item.name == '待接收') {
                this.handleTabChange('tab1', 1)
            } if (item.name == '待处理') {
                this.handleTabChange('tab1', 2)
            }
            if (item.name == '已处理') {
                this.handleTabChange('tab1', 3)
            }
            if (item.name == '已退回') {
                this.handleTabChange('tab2', 4)
            }
        },
        getTextContent() {
            if (this.value == '') {
                //TODO 添加事件详情处理
                this.tip = '描述不能为空!';
                this.textValueNull = true;
                this.messageStatus = false;
                return false;
            }
            return true;
        },
        loadMore() {
            this.loading = true;
            let page = this.page;
            let userId = this.getUserId;

            this.$http.get(GET_ALL_EVENTS_LIST + "?status=" + this.status + '&handlerId=' + userId + '&size=40' + '&page=' + page).then(res => {
                let ress = res.body.data.content;
                if (res.body.data.last && ress.length == 0) {
                    this.loading = false;
                    return false;
                }
                for (let i in ress) {
                    this.list.push(ress[i]);
                }
                this.page += 1;
                this.loading = false;
            }).catch((err) => {
                console.log(err)
            });
        },
        handleInputOverflow(isOverflow) {
            this.inputErrorText = isOverflow ? '字数超出限制！' : ''
        },
        handleMultiLineOverflow(isOverflow) {
            this.multiLineInputErrorText = isOverflow ? '字数超出限制！' : ''
        },
        backToHome() {
            this.setMapShow(true);
//            this.$router.push("/home/portal");
          this.$router.push({name:'home',params:{name:true}});

        },
        toggle(item, bool) {
            this.open = !this.open;
            this.nowItem = item;
            eventBus.bus.emit(eventBus.GET_EVENT_NOW, item);
            if (bool) {
                //已处理
                this.eventDone = true;
                this.showDetail();
            } else {
                this.eventDone = false;
            }
        },
        handleTabChange(val, status) {
            this.status = status;
            // this.$refs.newsWrap.scrollTop = 0;
            // this.$refs[this.defaultTab].className = 'btn-n';
            // this.$refs['tab' + status].className = 'btn-n active';
            // this.defaultTab = 'tab' + status;
            let userId = this.getUserId;

            this.$http.get(GET_ALL_EVENTS_LIST + "?status=" + status + '&handlerId=' + userId + '&size=40&page=0').then(res => {
                let ress = res.body.data.content;
                this.totalElements = res.body.data.totalElements
                this.list = ress;
            }).catch((err) => {
                console.log(err)
            });
        },
        backToPage(bool) {
            this.open = bool;
        },
        close(e) {
            e.preventDefault();
            this.textValueNull = false;
        },
        backHandle: function(e) {
            e.preventDefault();
            this.open = false;
            this.opentwo = false;

        },
        backHandletwo: function(e) {
            e.preventDefault();
            this.opentwo = false;

        },
        submit() {
            let that = this;
            if (this.value == "") {
                this.textValueNull = false;
                return false;
            } else {
                let nowItem = this.nowItem;
                let id = nowItem.id;
                let images = [];
                for (let key in this.imgList) {
                    let item = this.imgList[key];
                    let type = item.type;
                    if (type === "plus") {
                        continue;
                    }
                    images.push(item.src);
                }

                this.$http.post(POST_EVENT_HANDLE + id + '/handle', { means: that.value, handleImages: images }).then((res) => {
                    let code = res.body.code;
                    let msg = res.body.msg;
                    if (code == "403") {
                        this.tip = msg;
                    }
                    if (code == "200") {
                        this.tip = "处理成功";
                        this.opentwo = false;
                        this.open = true;
                        this.nowItem.status = 3;
                        eventBus.bus.emit(eventBus.GET_EVENT_NOW, this.nowItem);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
            setTimeout(() => {
                this.textValueNull = false;
            }, 2000)


        },
        showEvent() {
            this.opentwo = true;
        },
        showdialog() {
            if (this.value == "") {
                this.tip = '描述不能为空';
            } else {
                this.tip = '请确定是否提交';
            }
            this.textValueNull = true;
        },
        getNums() {
            // pendding: "",
            // finish: "",
            // Toreceive:"",
            // Returned:"",
            let userId = this.getUserId;
            this.$http.get(GET_WALKER_STATISTIC + '?handlerId=' + userId).then((res) => {
                let obj = res.body.data;
                this.Toreceive = obj.waitreceive;
                this.finish = obj.handle;
                this.pendding = obj.pending;
                this.Returned = obj.sendback;
            }).catch((err) => {
                console.log(err)
            });
        },
        addImageList: function(imageList) {
            this.imgList = imageList;
        }
    },
    mounted() {
        this.scroller = this.$refs.newsWrap;
        let height = window.innerHeight;
        this.$refs.newsWrap.style.height = height - 109 + 'px';
        //this.$refs.newsContent.style.height = height - 115 + 'px';
        this.getNums();
        document.addEventListener(eventBus.BACK_BUTTON, this.backHandle, false);
        //
        this.handleTabChange('tab1', 1);
        eventBus.bus.addListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
    },
    destroyed() {
        document.removeEventListener(eventBus.BACK_BUTTON, this.backHandle, false);
        eventBus.bus.removeListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
    }

}
</script>

<style  scoped>
.event-result {
    display: flex;
    padding: 4px 0;
    align-items: center;
    color: #ACB0BF;
    font-size: 12px;
    border-bottom: 1px solid #EDF0F9;
}
.allshi{
    margin-top: 9px;
    text-indent: 12px;
}
.event-result .lig {
    margin-left: 10px;
    flex-grow: 1;
}

.event-result img {
    width: 12px;
    margin-right: 5px;
}

.event-result .rrig {
    margin-right: 10px;
}

.event-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 80;
    background: #fff;
}

@media(-webkit-min-device-pixel-ratio:1.5),
(min-device-pixel-ratio:1.5) {
    .border-1px:after {
        height: 1px;
        content: "";
        left: 0;
        width: 100%;
        border-top: 1px solid #e3e5e9;
        position: absolute;
        -webkit-transform: scaleY(0.7);
        transform: scaleY(0.7)
    }
}

@media(-webkit-min-device-pixel-ratio:2),
(min-device-pixel-ratio:2) {
    .border-1px:after {
        height: 1px;
        content: "";
        left: 0;
        width: 100%;
        border-top: 1px solid #e3e5e9;
        position: absolute;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5)
    }
}

.list-event {
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
}

.title {
    border-bottom: 1px dashed #e3e5e9;
    text-indent: 20px;
    height: 35px;
    line-height: 35px;
}

.firs {
    text-align: left !important;
    text-indent: 15px
}

.item-name {
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.btns-wrap {
    margin-top: 57px;
    padding-bottom: 10px;
}

.news-btns {
    display: flex;
    width: 94%;
    margin: 0 auto;
    border: 1px solid #54A4D7;
    border-radius: 2px;
}

.btn-n {
    width: 50%;
    font-size: 14px;
    text-align: center;
    padding: 5px 0;
    color: #54A4D7;
}

.borright {
    border-right: 1px solid #54A4D7;
}

.active {
    background-color: #54A4D7;
    color: #fff;
}

.active-btn {
    background-color: #2196f3;
    color: #fff;
}

.nothin {
    height: 1px;
}

.news-tab {
    margin-top: 55px;
}

.news-wrap {
    width: 100%;
    overflow-y: auto;
}

.news-list {
    width: 100%;
    padding: 5px 0;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}

.news-list span {
    display: -webkit-box;
    max-width: 60%;
    flex-grow: 1;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.news-list .img-wrap {
    width: 32%;
    border-radius: 5px;
    margin-right: 5px;
    overflow: hidden;
    box-sizing: border-box;
}

.img-wrap img {
    display: block;
    width: 100%;
}

.news-alert {
    width: 100%;
    z-index: 70;
}

.alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  justify-content: center;
  background-color: #2196f3;
}
.alert-left {
  position: absolute;
  left: 15px;
}

.alert-right {
  position: absolute;
  right: 15px;
}
.alert-back {
    padding: 15px 5px;
    margin-left: 20px;
    color: #fff;
    font-size: 14px;
}

.news-content {

    margin: 0 auto;
    overflow-y: auto;
}

.alert-p {
    width: 100%;
    max-height: 97px;
    display: -webkit-box;
    padding-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.alert-img-title {
    font-size: 12px;
    color: #ccc;
}

.alert-img {
    padding: 8px;
    box-sizing: border-box;
    background-color: #ccc;
    border-radius: 5px;
    margin-bottom: 30px;
}

.alert-img img {
    display: block;
    width: 100%;
    border: none;
}

.news-detail {
    text-indent: 28px;
    line-height: 24px;
}

.select-event {
    margin-top: 55px;
}

.select-event p {
    height: 35px;
    line-height: 35px;
    text-indent: 20px;
    margin: 0;
}
  .keep-dis{
    width:100%;
    overflow: hidden;
    height:180px;
    margin-bottom:0;
    padding:0 5px;
  }

</style>
