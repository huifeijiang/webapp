<template>
	<transition name="fade-top">
	<div v-show="show" class="wrap-gg">
		<head-dom
			title="公告牌详情"
			:showSubm="false"
			@back="handleClose">
		</head-dom>
		<div class="content">
			<div class="gg-awa">
				<div class="left-gg">
					<h2>{{detail.riverName}}</h2>
					<p>全长: {{detail.riverLength}}</p>
					<p>起点: {{detail.riverStart}}</p>
					<p>终点: {{detail.riverEnd}}</p>
				</div>
				<div class="right-gg" @click="handleImage">
					<img :src="detail.imageUrl" >
					<div class="behd">水系图</div>
				</div>
			</div>	

			<div class="gg-lis" v-for="item in peoples">
				<h3 class="lis-tit" :class="'lis-tit'+item.name">{{item.name | nameFilter}}</h3>
				<div class="lis-dea-wrap">
					<div class="lis-dea" v-for="peo in item.list">
						<img src="static/v2images/gg4.png" class="lis-img">
						<div class="lis-left">
							<p>{{peo.name}}</p>
							<span>{{peo.tip}}</span>
						</div>
						<span class="flexg"></span>
						<a class="lis-right" :href="'tel:'+peo.tel">{{peo.tel}}</a>
					</div>
				</div>
			</div>

			<div class="gg-lis">
				<h3 class="lis-tit lis-tit4">河长职责</h3>
				<p class="lis-txt">{{detail.duty | dutyFilter}}</p>
			</div>
			<div class="gg-lis">
				<h3 class="lis-tit lis-tit5">治理目标</h3>
				<p class="lis-txt">{{detail.target}}</p>
			</div>

			<div class="gg-lis">
				<h3 class="lis-tit lis-tit6">联系部门</h3>
				<div class="lis-dea">
					<div class="lis-left">
						<p class="lis-txtp">{{detail.contactDepartment}}</p>
					</div>
					<a  class="lis-right" :href="'tel:'+detail.contactNumber">{{detail.contactNumber}}</a>
				</div>
			</div>
		</div>
		<transition name="sle">	
			<div class="img-wrap" v-show="showBig">
				<div class="img-close" @click="showBig=false"></div>
				<img :src="detail.imageUrl">
			</div>
		</transition>
	</div>
	</transition>
</template>

<script>
	import headDom from '../../UIcomponents/head/head.vue';
	export default {
		components: {
			headDom
		},
		data() {
			return {
				showBig: false,
				//人员示例数据结构
				people: [{
					name: '区级河长',
					list: [{
						name: '梁侃',
						tip: '环水局领导',
						tel: 13122225555
					}]
				},{
					name: '街道级河长',
					list: [{
						name: '魏树强',
						tip: '环水局领导',
						tel: 13122225555
					}]
				},{
					name: '社区级河长',
					list: [{
						name: '魏树强',
						tip: '环水局领导',
						tel: 13122225555
					}]
				}]
			}
		},
		props: {
			value: {
				type: Boolean,
				default:false
			},
			peoples: {
				type: Array,
				default: () => []
			},
			detail: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			show() {
				return this.value;
			}
		},
		filters: {
			dutyFilter(value) {
				if (value == '') {
					return '统筹、协调、督导水资源保护、水安全保障、水污染防治、水环境治理、水生态修复、水域岸线管理保护、执法监管等方面相关工作'
				} else {
					return value;
				}
			},
			nameFilter(value) {
				if (value == 1) {
					return '区级河长';
				} else if (value ==2) {
					return '街道级河长';
				} else {
					return '社区级河长';
				}
			}
		},
		methods: {
			handleClose() {
				this.$emit('input', false);
			},
			handleImage() {
				this.showBig = true;
			}
		}
	}
</script>

<style scoped>
	.wrap-gg {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 80;
		background-color: rgb(249,252,255);
		transition: all .45s cubic-bezier(.23,1,.32,1);	
		-webkit-transition: all .45s cubic-bezier(.23,1,.32,1);
		
	}
	.fade-top-enter, .fade-top-leave-active {
		-webkit-transform: translateY(100%); 
		transform: translateY(100%);
	}
	.sle-enter, .sle-leave-active {
		transform: scale(.45);
		-webkit-transform: scale(.45);
		opacity: 0;
	} 
	.content {
		position: absolute;
		left: 0;
		right: 0;
		top: 55px;
		bottom: 0;
		overflow-y: auto;
		background-color:  
	}
	.lis-dea-wrap {
		padding: 0px 12px;
	}
	.gg-awa {
		padding: 13.5px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ECEFF9;
		margin-bottom: 10px;
		background-color: #fff;
	}
	.left-gg {
		flex-grow: 1
	}
	.left-gg h2 {
		font-size: 22px;
		color: #626676; 
		font-weight: normal;
	}
	.left-gg p {
		color: rgba(98,102,118,.8);
	}
	.right-gg {
		position: relative;
		min-width: 96px;
		width: 96px;
		height: 96px;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #ECEFF9;
	}
	.right-gg img {
	 	width: 100%;
	 	height: 100%;
	}
	.behd {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 23.5px;
		background-color: rgba(0, 0, 0, .45);
		text-align: center;
		line-height: 23.5px;
		color: rgba(255, 255, 255, .8);
		border-radius: 0px 0px 8px 8px;
		z-index: 3;
	}
	.gg-lis {
		border-bottom: 1px solid #ECEFF9;
		margin-bottom: 10px;
		background-color: #fff;
	}
	.lis-tit {
		padding: 9px 12px;
		font-size: 14px;
		color: #626676;
		font-weight: normal;
		border-bottom: 1px solid #ECEFF9;
		background-size: 23px 23px;
		background-position: 12px center; 
		text-indent: 30px;
		background-repeat: no-repeat;
	}
	.lis-left {
		flex:1;
	}
	.lis-left p {
		color: #626676;
		font-size: 16px;
		font-weight: 600;
	}
	.flexg {
		flex-grow: 1;
	}
	.lis-left span {
		display: block;
		width: 120px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #A8ACBC;
		font-size: 12px;
	}
	.lis-tit1 {
		background-image: url('../../../static/v2images/gg1.png');			
	}
	.lis-tit2 {
		background-image: url('../../../static/v2images/gg3.png');	
	}
	.lis-tit3 {
		background-image: url('../../../static/v2images/gg2.png');
	}
	.lis-tit4 {
		background-image: url('../../../static/v2images/gg6.png');			
	}
	.lis-tit5 {
		background-image: url('../../../static/v2images/gg8.png');	
	}
	.lis-tit6 {
		background-image: url('../../../static/v2images/gg7.png');
	}
	.lis-img {
		width: 39px;
		height: 39px;
		min-width: 39px;
		margin-right: 10px;
	}
	.lis-txt {
		font-size: 14px;
		padding:10px 12px;
	}
	.lis-left .lis-txtp {
		font-size: 14px;
		font-weight: normal;
		color: #5A5E6F;
		padding-left: 12px;
	}
	.lis-dea {
		padding:10px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ECEFF9;
	}
	.lis-dea:last-child {
		border-bottom:none;
	}
	.lis-right {
		min-width: 130px;
		width: 130px;
		color: #ACB0BF;
		background: url('../../../static/v2images/gg5.png') no-repeat 0 center;
		background-size: 16px 16px;
		text-indent: 22px;
	}
	.img-wrap {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		background-color: rgba(0, 0, 0, .8);
		transition: all .45s cubic-bezier(.23,1,.32,1);
	}
	.img-wrap img {
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
	.img-close {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 30px;
		height: 30px;
		background: url('../../../static/v2images/ic-close-a.png') no-repeat;
		background-size: 100% 100%;
		z-index: 3;
	}
</style>