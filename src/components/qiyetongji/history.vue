<template>
	<div class="dewrap">
		<head-dom
			title="历史记录"
			:showSubm="false"
			@back="back">
		</head-dom>
		<div class="timee">
			<div class="tie">
				<p @click="openPicker('start')">开始时间:{{startDateShow}}</p>
				<p @click="openPicker('end')">结束时间:{{endDateShow}}</p>
			</div>
			<span class="btns ss" @click="search">查询</span>
		</div>
		<div class="content top55">
			<slot v-for="(item,index) in list">
				<div>
					<p class="his-p">{{item.date}}</p>
					<table-cell
						:key="index"
						:datas="item">
					</table-cell>
					<div class="detail-btn" v-show="show" @click="toToday(item)">查看详情</div>
				</div>

			</slot>
		</div>
		<!-- <mt-datetime-picker ref="pickerstart" v-model="pickerVisiblestart" type="date" :startDate="minDate"
                        year-format="{value}年" month-format="{value}月" date-format="{value}日"
                        @confirm="handleConfirm">
	    </mt-datetime-picker>
	    <mt-datetime-picker ref="pickerend" v-model="pickerVisibleend" type="date" :startDate="minDate"
	                        year-format="{value}年" month-format="{value}月" date-format="{value}日"
	                        @confirm="handleConfirmend">
	    </mt-datetime-picker> -->
		<mt-popup class='otherPicker' v-model="popupVisible" position="bottom">
			<div class='pop-div'>
			<span class='pop-le' @click='popupVisible=false'>取消</span>
			<span class='pop-le' @click='getOtherInfo("false")'>确定</span>
			</div>
			<mt-picker :slots='dailySlots' @change='storeDateData'></mt-picker>
		</mt-popup>
		<mu-dialog :open="textValueNull" title="提示">
			结束时间不能小于开始时间!
			<mu-flat-button slot="actions" primary @click="close" label="确定"/>
		</mu-dialog>
	    <alert v-model="showAlert" width="76%">{{message}}</alert>
	</div>
</template>

<script>
	import headDom from '../../UIcomponents/head/head.vue';
	import tableCell from './tableCell.vue';
	import moment from 'moment';
	import {eventBus} from '../eventBus/eventBus.js';
	import alert from '../../UIcomponents/alert/alert.vue';
	import { dateTool } from '../../gisComponets/tool/DateTool.js';
	import { getPreMonth, getIndex, selectorContent, getYearWeek, selectorDailyContent } from '../riverStatistic/timeHelper'


	export default {
		components: {
			headDom,
			tableCell,
			alert
		},
		props: {
			id: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			const currentDay = dateTool.toDate(new Date(), 'yyyy-MM-dd');
			const prevDay = dateTool.toDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
			const prevMonth = getPreMonth(currentDay);
			const currentMonth = dateTool.toDate(new Date(), 'yyyy-MM');
			const fullYear = new Date().getFullYear()
			const Month = new Date().getMonth() + 1
			const day = dateTool.toDate(new Date(), 'yyyy-MM-dd').split('-')[2]
			return {
				currentDay,
				prevDay,
				prevMonth,
				currentMonth,
				fullYear,
				Month,
				day,
				textValueNull: false,
				pickerVisiblestart: '',
				pickerVisibleend: '',
				popupVisiblestart:false,
				popupVisibleend:false,
				popupVisible: false,
				timeParams: '',
				startDate: '',
				endDate: '',
				time: '',
				minDate: new Date('2017-01-01'),
				list: [],
				showAlert: false,
				message: '',
				dailySlots: [{
					flex: 1,
					values: [],
					className: 'slot1',
					textAlign: 'center'
				}, {
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}, {
					flex: 1,
					values: [],
					className: 'slot3',
					textAlign: 'center'
				}],
				startDateParam: '',
				endDateParam: '',
				startDateShow: '',
				endDateShow: '',
				startTime: null,
        		endTime: null,
        		minDate: new Date('2017-01-01'),
			}
		},
		methods: {
			close(){
				this.textValueNull = false;
			},
			back() {
				this.$emit('back');
			},
			open(bool) {
				if(bool) this.$refs.pickerstart.open()
				else this.$refs.pickerend.open()
			},
			showAlertAct(message) {
				this.showAlert = true;
				this.message = message;
			},
			handleConfirm(val) {
	        	this.startDate = moment(new Date(val)).format('YYYY-MM-DD')
	      	},
	      	handleConfirmend(val) {
	        	this.endDate = moment(new Date(val)).format('YYYY-MM-DD')
	      	},
	      	validate() {
	      		// let start = moment().max(this.startDate, this.endDate)
	      		if(this.startDateShow == '' || this.endDateShow == '') {
	      			return false;
	      		}
	      		let s = moment(this.startDateShow).format('x');
	      		let e = moment(this.endDateShow).format('x');
	      		if(s>=e) {
	      			return false
	      		}
	      		return true;
	      	},
	      	getData(id, start, end) {
	      		this.$http.get(GET_DAILY_STATISTIC+'?streetId=' + id+'&startDate=' + start + '&endDate=' + end).then( res => {
					this.list = res.body.data;
				}).catch( err => {})
	      	},
	      	search() {
	      		if(!this.validate()) {
	      			this.showAlertAct('请输入时间，其中结束时间要大于开始时间！')
	      			return false;
	      		}
	      		this.getData(this.$props.id, this.startDateShow, this.endDateShow);
	      	},
	      	toToday(item) {
	      		this.$emit('toToday', item)
			},
			//打开选择器
			openPicker(status) {
				this.timeParams = status;
				this.popupVisible = true;
				this.pickerContent();
			},
			//选择器自定义内容
			pickerContent(){
				let initMonth = 0, initYear = 0;
				this.dailySlots[0].values = ['2017年', '2018年', '2019年', '2020年'];
				selectorDailyContent(this.dailySlots, '月', 12, '日')
				this.dailySlots[1].defaultIndex = getIndex(this.dailySlots[1].values, this.Month + '月')
				this.dailySlots[0].defaultIndex = getIndex(this.dailySlots[0].values, this.fullYear + '年')
				this.dailySlots[2].defaultIndex = getIndex(this.dailySlots[2].values, this.day + '日')
			},
			//查询
			submitCheck(){

			},
			 //时间展示并查询
			getOtherInfo(bool) {
				const startTimeStamp = new Date(this.startDateParam).getTime()
				const endTimeStamp = new Date(this.endDateParam).getTime();
				let issmall = startTimeStamp - endTimeStamp;
				if (issmall > 0) {
					this.textValueNull = true;
					return;
				} else {
					this.popupVisible = false;
					bool ? this.submitCheck() : ''
				}
			},
			storeDateData(picker, values){
				for (let val of values) {
					if (val != undefined) {
						let resultStr = String(values[0]) + String(values[1]);
						let dayStr = String(values[0]) + String(values[1]) + String(values[2]);
						let resultDayStr = ''
						try{
							resultDayStr = dayStr.substr(0, 4) + '-' + dayStr.substr(5, 2) + '-' + dayStr.substr(8, 2)
						}catch(e){}

						if (this.timeParams == 'start') {
							this.startDateShow = resultDayStr;
							this.startDateParam = resultDayStr;
						} else if (this.timeParams == 'end') {
							this.endDateShow = resultDayStr;
							this.endDateParam = resultDayStr;
						}
					}
				}
			},

			format(datetime, type) {
				let startTime = '';
				let year = datetime.getFullYear();
				let month = datetime.getMonth() + 1;
				if (month >= 1 && month <= 9) {
				month = "0" + month;
				}
				let date = datetime.getDate();
				if (date >= 0 && date <= 9) {
				date = "0" + date;
				}
				if (type == 'start') {
				return year + '-' + month + '-' + date + " 00:00:00"
				} else if (type == 'end') {
				return year + '-' + month + '-' + date + " 23:59:59"
				}

			},
		},
		mounted() {
			let Nowdate = new Date();
			this.pickerVisibleend = Nowdate;
			this.pickerVisiblestart = Nowdate;
			let StartTime = this.format(Nowdate, 'start');
			this.startTime = StartTime;
			// this.NowTime = StartTime.split(" ")[0];
			this.startDateShow = StartTime.split(" ")[0];
			this.startDateParam = StartTime.split(" ")[0];
			console.dirxml(this.startDateShow);
			let enddate = new Date(Nowdate.getTime() + 24 * 60 * 60 * 1000);
			let EndTime = this.format(enddate, 'start');
			this.endTime = EndTime;
			// this.checkendTime = StartTime.split(" ")[0];
			this.endDateShow = EndTime.split(" ")[0];
			this.endDateParam = EndTime.split(" ")[0];
			let height = window.innerHeight;
			document.addEventListener(eventBus.BACK_BUTTON, this.backToHome, false);
		},
		watch: {
			id(val) {
				this.list = [];
			}
		}
	}
</script>

<style lang="less" scoped>
  @import  './qytongji.less';
  .otherPicker {
    width: 100%;
  }

  .pop-div {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }

  .pop-le {
    color: #30aafd;
    font-size: 16px;
  }
</style>
