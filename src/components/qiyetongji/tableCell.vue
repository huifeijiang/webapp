<template>
	<div>
		<table class="cellb">
			<tr>
				<td>企业巡查总数</td>
				<td>{{datas.total}}</td>
			</tr>
			<tr>
				<td>已上报</td>
				<td>{{datas.doReport}}</td>
			</tr>
			<tr>
				<td>待上报</td>
				<td>{{datas.notReport}}</td>
			</tr>
			<tr>
				<td>完成率</td>
				<td>{{(datas.doReport/datas.total) | toBfen}}</td>
			</tr>
		</table>
		<div class="btns">
			<div class="history" v-show="showHistory" @click="emitEvent(false)">查看历史记录</div>
			<div class="today" v-show="showToday" @click="emitEvent(true)">查看今日详情</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			datas: {
				type: Object,
				default: () => {}
			},
			showToday: {
				type: Boolean, 
				default: false
			},
			showHistory: {
				type: Boolean, 
				default: false
			}
		},
		methods: {
			emitEvent(bool) {
				if(bool) this.$emit('today');
				else this.$emit('history');
			}
		},
		filters: {
			toBfen(value) {
				return Math.round(value*100) + '%';
			}
		}
	}
</script>

<style lang="less" scoped>
	.cellb {
		width: 100%;
		border-collapse: collapse;
		tr {
			width: 100%;
			background-color: #fff;
			td {
				width: 50%;
				border: 1px solid #efefef;
				box-sizing: border-box;
				height: 30px;
				line-height: 30px;
				text-align: center;
			}
		}
		tr:first-child {
			background-color: #4baaf4;
		}
	}
	.btns {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.history, .today{
			width: 40%;
			height: 35px;
			line-height: 35px;
			text-align: center;
			color: #fff;
			background-color: #4baaf4;
			border-radius: 5px;
		}
	}
</style>