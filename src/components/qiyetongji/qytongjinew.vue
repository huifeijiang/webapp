<template>
	<div class="gate-wrap">
		<head-dom 
			title="企业上报统计"
			:showSubm="false"
			@back="back">
		</head-dom>
		<div class="title-hd">
			<span>企业上报</span>
			<span>{{dateTime}}</span>
		</div>
		<div class="content">
			<table-cell 
				:datas="reportOfTotal" 
				:showHistory="true" 
				@history="historyFuc('', false)">
			</table-cell>

			<slot v-for="(item, index) in street">
				<div class="title-hd" @click="toggle(item)">
					<span>{{item.name}}</span>
					<span>{{dateTime}}</span>
				</div>
				<table-cell 
					:key="index"
					:datas="item.list" 
					@history="historyFuc(item.id, true)"
					@today="todayFuc(item)"
					:showHistory="true" 
					:showToday="true" 
					v-show="item.show">
				</table-cell>
			</slot>

		</div>
		<mu-drawer :open="open" class="dea"  right> 
			<history @back="open=false" :id="historyId" :show="showDetail" @toToday="setToday"></history>
		</mu-drawer>
		<mu-drawer :open="opentwo" class="dea"  right> 
			<tongji-detail @back="opentwo=false" :date="date" :id="id"></tongji-detail>
		</mu-drawer>
	</div>
</template>

<script>
	import headDom from '../../UIcomponents/head/head.vue';
	import moment from 'moment';
	import tableCell from './tableCell.vue';
	import history from './history.vue';
	import tongjiDetail from './tongjiDetail.vue';
	import { eventBus } from '../eventBus/eventBus.js';
	import { mapActions } from 'vuex';
	export default {
		components: {
			headDom,
			tableCell,
			history,
			tongjiDetail
		},
		data() {
			return {
				open: false,
				opentwo: false,
				reportOfTotal: {},
				street: [{
					name: '新安街道',
					id: '1',
					show: false,
					list: {}
				},{
					name: '西乡街道',
					id: '2',
					show: false,
					list: {}
				},{
					name: '航城街道',
					id: '7',
					show: false,
					list: {}
				},{
					name: '福永街道',
					id: '6',
					show: false,
					list: {}
				},{
					name: '福海街道',
					id: '8',
					show: false,
					list: {}
				},{
					name: '沙井街道',
					id: '5',
					show: false,
					list: {}
				},{
					name: '新桥街道',
					id: '9',
					show: false,
					list: {}
				},{
					name: '松岗街道',
					id: '3',
					show: false,
					list: {}
				},{
					name: '燕罗街道',
					id: '10',
					show: false,
					list: {}
				},{
					name: '石岩街道',
					id: '4',
					show: false,
					list: {}
				}],
				date: '',
				id: '',
				historyId: '',
				showDetail: false
			}
		},
		computed: {
			dateTime() {
				return moment().format('YYYY年MM月DD日');
			},
			getToday() {
				return moment().format('YYYY-MM-DD');
			}
		},
		created() {
			this.getData('')
		},
		methods: {
			...mapActions({
				setMapShow: 'setMapShow'
			}),
			back(e) {
			    this.setMapShow(false);
        		this.$router.push("/home/eventGate");
			},
			historyFuc(id, showDetail) {
				this.open = true;
				this.historyId = id;
				this.id = id;
				this.showDetail = showDetail;
			},
			todayFuc(item) {
				this.opentwo = true;
				this.date = this.getToday;
				this.id   = item.id;
			},
			setToday(item) {
				this.date = item.date;
				this.opentwo = true;
			},
			toggle(item) {
				item.show = !item.show;
				if(item.show) {
					this.getData(item.id, item);
				}
			},
			getData(id, item) {
				this.$http.get(GET_DAILY_STATISTIC+'?streetId=' + id).then( res => {
					if(item === undefined) {
						this.reportOfTotal = res.body.data[0];
					}else {
						this.$set(item, 'list', res.body.data[0])
					}
					
				}).catch( err => {})
			}
		}
	}
</script>

<style lang="less" scoped>
  @import  './qytongji.less';
</style>
