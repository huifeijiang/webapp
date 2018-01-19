<template>
	<div class="event-wrap">
		<head-dom v-show="showHead" v-on:back="backToHome" :type="'back'">任务列表</head-dom>
		<div class="nothin"></div>
		<div class="event-status" @click="eventStatusVmodel.show=true" :class="this.$route.params.status ? '' :'mr56'">
			<img class="icon-jian" src="static/v2images/status.png" />
			<span class="flex-grow">事件状态</span>
			<span>{{eventStatusVmodel.selected}}</span>
			<img class="rig" src="static/images/ic-go.png" alt="">
		</div>
		<div class="event-result" @click="eventShuomin.show=true">
			<span class="lig">{{eventStatusVmodel.selected == '待处理' ? '待处理事件：' + pendding : '已处理事件：'+newfinish }}</span>
			<img src="static/v2images/tipsw.png" alt="">
			<span class="rrig">事件等级:A、B、C、D、E</span>
		</div>
		<div class="list-wrap" ref="scroller">
			<div class="list-content">
				<div class="list" v-for="(item,index) in list" @click="toggle(item, (eventStatusVmodel.selected == '待处理')?false:true )">
					<div class="list-level" :style="getColor(item.type)">{{item.type}}</div>
					<div class="list-detail">
						<div class="detail-left">
							<p class="p1">{{item.username}}</p>
							<p class="p2">{{new Date(item.datatime).toLocaleString('chinese', {hour12: false})}}</p>
						</div>
						<span>{{item.gridName}}</span>
					</div>
				</div>
			</div>
			<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
		</div>
		<!--事件详情-->
		<mu-drawer class="news-alert" right :open="open">
			<handle-detail @toggleOne="backToPage" @toggleTwo="showEvent" :tableData="tableData" :done="eventDone" :doneMess="doneDetail" :showButton="showHead" :detailImage="detailImage"></handle-detail>
		</mu-drawer>
		<!--end-->
		<mu-drawer class="news-alert" right :open="opentwo">
			<div class="alert-head">
        <span class="alert-left"  @click="backHandletwo">返回</span>
				<span class="alert-title">事件处理</span>
				<span class="alert-right" @click="showdialog">完成</span>
			</div>
			<div class="nothin"></div>
			<div class="select-event hhh" ref="select">
				<p>*请选择办理情况</p>
				<div class="event-btn" v-for="item in eventBtn" @click="selectItem(item)">
					<mu-raised-button :label="item.name" :class="item.selected?'active-btn':''" fullWidth/>
				</div>
			</div>
			<div class="news-content" ref="newsContent">
				<div class="uploadtitle">请上传办理图片</div>
				<photograph></photograph>
				<mu-dialog :open="textValueNull" title="提示">
					{{tip}}
					<mu-flat-button slot="actions" @click="close" primary label="取消" />
					<mu-flat-button slot="actions" primary @click="submit" label="确定" />
				</mu-dialog>

			</div>
			<p class="zhoumoc">处理情况描述：</p>
			<div class="dan">
				<mu-text-field hintText="请输入文字描述。" v-model="handleDescribe" multiLine :rows="3" :rowsMax="6" fullWidth/>
			</div>
		</mu-drawer>
		<mu-drawer class="news-alert " right :open="openthr">
			<div class="alert-head">
        <mu-icon class="alert-left" @click="toggleThr" value="keyboard_arrow_left" />
				<span class="alert-title">选择详细</span>
				<span class="alert-right hidden">隐藏</span>
			</div>
			<div class="nothin"></div>
			<div class="alert-wrap mr56">
				<div class="event-alert" v-for="item in eventBtnAlert" @click="selectMore(item)">
					<mu-raised-button :label="item.name" :class="item.selected?'active-btn':''" fullWidth/>
				</div>
			</div>
		</mu-drawer>
		<!--选择事件状态-->
		<simple-sheet class="bbbb" v-model="eventStatusVmodel" @select="eventStatusChange"></simple-sheet>
		<!--end-->

		<!--事件类型说明-->
		<alert-type v-model="eventShuomin">
			<div class="shuom-list" v-for="item in eventShuomin.list">
				<div class="list-level" :style="getColor(item.type)">{{item.type}}</div>
				<div>{{item.detail}}</div>
			</div>
		</alert-type>
		<!--end-->
	</div>
</template>

<script>
import headDom from '../../UIcomponents/header/head';
import { eventBus } from '../../components/eventBus/eventBus';
import { news, notice } from './newsData.js';
import handleDetail from '../handleEventDetail/handleEventDetail';
import { mapActions, mapGetters } from 'vuex';
import photograph from '../../UIcomponents/photoGraph/PhotoGraph';
import simpleSheet from '../../UIcomponents/simpleSheet/simpleSheet.vue';
import alertType from '../../UIcomponents/alertType/alertType.vue';

//import { news, notice } from './newsData.js';

export default {
	components: {
		headDom,
		handleDetail,
		photograph,
		simpleSheet,
		alertType
	},
	created() {
		this.newsData = news;
		this.messageData = notice;
	},
	data() {
		return {
			handleDescribe: '',
			scroller: '',
			noData:false,
			loading: false,
			showHead: true,
			tip: '请确定是否提交',
			activeTab: 'tab1',
			newsData: [],
			messageData: [],
			open: false,
			opentwo: false,
			openthr: false,
			nowItem: null,
			textValueNull: false,
			imgList: [],
			eventBtn: [
				{ name: '限期更改', selected: false },
				{ name: '立案查处', selected: false },
				{ name: '无违法违规行为', selected: false }
			],
			eventBtnAlert: [
				{ name: '责令改正决定书', selected: false },
				{ name: '查封/扣押', selected: false },
				{ name: '移交行政拘留', selected: false },
				{ name: '涉嫌环境违法', selected: false },
			],
			selectedItem: null,
			tableData: [],
			pendding: "",
			newfinish: "",
			list: [],
			eventDone: false,
			images: [],
			doneDetail: {},
			detailImage: [],
			pageOne: 1,
			status: 1,
			eventStatusVmodel:{
				show:false,
				name:'事件状态',
				selected:'待处理',
				list:[{
					name:'待处理',
					selected:true
				},{
					name:'已处理',
					selected:false
				}]
			},
			eventShuomin:{
				show:false,
				title:'事件等级类型说明',
				list:[{
					type:'A',
					detail:'生产废水且废水直排'
				},{
					type:'B',
					detail:'生产废水,没有废水直排,无环保批文'
				},{
					type:'C',
					detail:'生产废水,没有废水直排,无环保批文,无废水处理设施'
				},{
					type:'D',
					detail:'生产废水,没有废水直排,有环保批文,有废水处理设施'
				},{
					type:'E',
					detail:'无生产废水'
				}]
			},
			isAdmin: false
		}
	},
	computed: {
		...mapGetters({
			getUserId: 'getUserId'
		})
	},
	methods: {
		getColor(type) {
			if(type == 'A') {
				return { background : '#F36487'}
			}else if(type == 'B') {
				return { background : '#FFB400'}
			}else if(type == 'C') {
				return { background : '#4FCFBC'}
			}else if(type == 'D') {
				return { background : '#ba6bdf'}
			}else {
				return { background : '#64a5f3'}
			}
		},
		eventStatusChange(item){
			this.noData = false;
			if(item.name == '待处理') {
				this.handleTabChange('tab1',1)
			}else {
				this.handleTabChange('tab2',2)
			}
		},
		...mapActions({
			setMapShow: 'setMapShow'
		}),
		backToHome() {
			this.setMapShow(true);
//			this.$router.push("/home/portal");
      this.$router.push({name:'home',params:{name:true}});

    },
		toggle(item, bool) {
			this.open = !this.open;
			this.nowItem = item;
			if (bool) {
				//已处理
				this.eventDone = true;
				this.showDetail();
			} else {
				this.eventDone = false;
			}
			this.getCompany(item);
		},
		handleTabChange(val, status) {
			this.status = status;
			this.loading = false;
			this.pageOne = 1;
			if (val != this.activeTab) {
				this.activeTab = val;
			};
			let userId = this.getUserId;
			if (!this.showHead) {
				userId = '';
			}
			this.$http.get(GET_EVENT_SMALLSANLIEBIAO + "?status=" + status + '&handlerId=' + userId + '&size=40').then(res => {
				let ress = res.body.data.content;
				this.list = ress;
				this.newfinish = res.body.data.totalElements
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
			if (this.open) {
				this.open = false;
			} else if (this.opentwo) {
				this.opentwo = false;
			} else {
				this.backToHome();
			}
		},
		backHandletwo: function(e) {
			e.preventDefault();
			this.opentwo = false;

		},
		submit() {
			if (this.selectedItem == null) {
				this.textValueNull = false;
				return false;
			} else if (this.selectedItem == "立案查处,") {
				this.textValueNull = false;
				return false;
			} else {
				let nowItem = this.nowItem;
				let id = nowItem.id;
				let means = this.selectedItem;
				let handleDescribe = this.handleDescribe;
				let images = [];
				for (let key in this.imgList) {
					let item = this.imgList[key];
					let type = item.type;
					if (type === "plus") {

						continue;
					}
					images.push(item.src);
				}
				this.$http.post(GET_EVENT_SMALLSANCLICK + id, { means: means, images: images, handleDescribe: handleDescribe }).then(res => {
					let code = res.body.code;
					let msg = res.body.msg;
					if (code == "403") {
						this.tip = msg;
					}
					if (code == "200") {
						this.tip = "处理成功";
						this.opentwo = false;
						this.open = true;
						this.imgList = [];
						this.selectedItem = null;
						this.handleTabChange('tab1', 1);
						this.showDetail();
						this.handleDescribe = '';
					}
				}).catch((err) => {
					console.log(err)
				});
			}
			setTimeout(() => {
				this.textValueNull = false;
			}, 2000)


		},
		showDetail() {
			this.detailImage = [];
			this.eventDone = true;
			this.$http.get(GET_DIRTY_EVENT + this.nowItem.id + '/details').then((res) => {
				this.doneDetail = res.body.data;
				this.detailImage = res.body.data.images;
			}).catch((error) => { })
		},
        selectItem(item) {
            console.log(item)
            for (let i = 0; i < this.eventBtn.length; i++) {
                this.eventBtn[i].selected = false;
            }
            if (item.name == '立案查处') {
                this.openthr = true;
                item.selected = true;
                return;
            }
            item.selected = true;
            this.selectedItem = item.name;
        },
		selectMore(item) {
			item.selected = !item.selected;
		},
		toggleThr() {
			this.openthr = false;
			let str = '立案查处,';
			let that = this;
			for (let i = 0; i < that.eventBtnAlert.length; i++) {
				if (that.eventBtnAlert[i].selected == true) {
					str += that.eventBtnAlert[i].name + ',';
				}
			}
			this.selectedItem = str;
		},
		showEvent() {
			this.opentwo = true;
			eventBus.bus.emit('clearImage');
		},
		showdialog() {
			if (this.selectedItem == null) {
				this.tip = '请选择办理情况';
			} else if (this.selectedItem == "立案查处,") {
				this.tip = '请选择立案查处详情';
			} else {
				this.tip = '请确定是否提交';
			}
			this.textValueNull = true;
		},
		getCompany(item) {
			this.tableData = [];
			this.$http.get(GET_RIVER_EVENT_DETAIL + item.id + '/details').then((res) => {
				let obj = res.body.data;
				let arr = [];
				for (let param in obj) {
					let dt = {};
					switch (param) {
						case 'enterpriseName':
							dt.name = '单位名称';
							dt.value = obj[param];
							break;
						case 'enterpriseAddr':
							dt.name = '单位地址';
							dt.value = obj[param];
							break;
						case 'enterpriseLicense':
							dt.name = '营业执照';
							dt.value = obj[param];
							break;
						case 'legalPersonName':
							dt.name = '法人代表';
							dt.value = obj[param];
							break;
						case 'legalPersonTel':
							dt.name = '法人代表联系电话';
							dt.value = obj[param];

							break;
						case 'enterpriseContactsName':
							dt.name = '企业联系人';
							dt.value = obj[param];
							break;
						case 'enterpriseContactsTel':
							dt.name = '企业联系人电话';
							dt.value = obj[param];
							break;
						case 'productTypeNames':
							dt.name = '可能产生废水的产品类别';
							dt.value = obj[param];
							break;
						case 'craftNames':
							dt.name = '可能产生废水的主要生产工艺';
							dt.value = obj[param];
							break;
						case 'approvalNo':
							dt.name = '环保批文';
							dt.value = obj[param];
							break;
						case 'isProduceWastewater':
							dt.name = '生产废水';
							dt.value = obj[param] ? '有' : '无';
							break;
						case 'isOutWastewater':
							dt.name = '废水直排';
							dt.value = obj[param] ? '有' : '无';
							break;
						case 'isWastewaterFacility':
							dt.name = '废水处理设施';
							dt.value = obj[param] ? '有' : '无';
							break;
						case 'describe':
							dt.name = '情况说明';
							dt.value = obj[param];
							break;
						case 'isLawEnforcement':
							dt.name = '是否需要执法整治';
							dt.value = obj[param] ? '是' : '否';
							break;
						case 'gridId':
							dt.name = '社区网格';
							dt.value = item.gridName;
							break;
						case 'userId':
							dt.name = '调查人员';
							dt.value = item.username;
							break;
						case 'datatime':
							dt.name = '调查时间';
							dt.value = new Date(item.datatime).toLocaleString('chinese', { hour12: false });
							break;
						case 'type':
							dt.name = '执法事件等级';
							dt.value = obj[param] ? obj[param] : '';
							break;
						default:
							dt = null;
							break;
					}
					if (dt != null) arr.push(dt);
				}
				this.tableData = arr;
			}).catch((error) => { });
		},
		getNums() {
			let userId = this.getUserId;
			if (!this.showHead) {
				userId = '';
			}
			this.$http.get(GET_EVENT_SMALLSAN + '?userId=' + userId).then((res) => {
				let obj = res.body.data;
				this.finish = obj.finish;
				this.pendding = obj.pendding;
			}).catch((err) => {
				console.log(err)
			});
		},
		addImageList: function(imageList) {
			this.imgList = imageList;
		},
		loadMore() {
			if(this.noData){
				return;
			}
			this.loading = true;
			let page = this.pageOne;
			let userId = '';
			if (this.showHead) {
				userId = this.getUserId;
			}
			this.$http.get(GET_EVENT_SMALLSANLIEBIAO + "?status=" + this.status + '&handlerId=' + userId + '&size=40' + '&page=' + page).then(res => {
				let ress = res.body.data.content;
				if (res.body.data.last && ress.length == 0) {
					this.loading = false;
					this.noData = true;
					return;
				}
				for (let i in ress) {
					this.list.push(ress[i]);
				}
				this.pageOne += 1;
				this.loading = false;
			}).catch((err) => {
				console.log(err)
			});
		}
	},
	mounted() {
		let showHead = this.$route.params.status;
		if (showHead == true) {
			this.showHead = false;
		}
		this.scroller = this.$refs.scroller;
		this.getNums();
		document.addEventListener(eventBus.BACK_BUTTON, this.backHandle, false);
		console.log(8999)
		this.handleTabChange('tab1', 1);
		console.log(101010)
		eventBus.bus.addListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
	},
	destroyed() {
		document.removeEventListener(eventBus.BACK_BUTTON, this.backHandle, false);
		eventBus.bus.removeListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
	}

}
</script>

<style  scoped>
.event-status {
	display: flex;
	align-items: center;
	padding: 14px 0;
	border-bottom: 1px solid #EDF0F9;
	font-size: 16px;
	color: #626676;

}
.mr56{
	margin-top:56px;
}
.event-status img {
	margin-left: 3%;
}
.event-status .flex-grow {
	flex-grow: 1;
	margin-left: 5px;
}
.event-status .rig {
	width: 8px;
	margin-right: 10px;
}
.event-result {
	display: flex;
	padding: 4px 0;
	align-items: center;
	color: #ACB0BF;
	font-size: 12px;
	border-bottom: 1px solid #EDF0F9 ;
}
.event-result .lig {
	margin-left: 10px;
	flex-grow: 1;
}
.event-result img {
	width: 16px;
	margin-right: 5px;
}
.event-result .rrig {
	margin-right: 10px;
}
.active-btn {
	background-color: #2196f3;
	color: #fff;
}
.list-wrap {
	position: absolute;
	left: 0;
	right: 0;
	top: 154px;
	bottom: 0;
	background:#fff;
	z-index:80;
	overflow: auto;
}
.news-content{
	padding-top:15px;
}
.hhh{
	margin-top:56px
}
.hhh>p{
	padding-left:8px;
	padding-bottom:8px;
}
.uploadtitle,.zhoumoc{
	padding-left:8px;
}
.list {
	padding: 6px 0;
}
.list-level {
	float: left;
	width: 42px;
	height: 42px;
	min-width: 42px;
	margin: 0 14px;
	line-height: 42px;
	text-align: center;
	border-radius: 50%;
	font-size: 16px;
	color: #fff;
	background-color: #F36487;
}
.list-detail {
	float: right;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 82%;
	height: 42px;
	padding-bottom: 5px;
	border-bottom: 1px solid #EDF0F9;
}
@media screen and (max-width: 375px){
	.list-detail {
		width: 80%;
	}
}
@media screen and (max-width: 320px){
	.list-detail {
		width: 78%;
	}
}
.list-detail .p1 {
	font-size: 16px;
	color: #5A5E6F;
}
.list-detail .p2 {
	font-size: 14px;
	color: #A8ACBC;
	margin-top: -5px;
}
.list-detail span {
	font-size: 15px;
	color: #626676;
	margin-right: 10px;
}
.list:after {
	content: '';
	display: block;
	clear: both;
}
.news-alert {
	width: 100%;
	z-index: 80;
}
.shuom-list {
	display: flex;
	width: 92%;
	margin: 0 auto;
	align-items: center;
	padding: 10px 0;
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
</style>
