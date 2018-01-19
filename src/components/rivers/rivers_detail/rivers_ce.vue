<template>
	<div class="aaad">
		<div class="nothin"></div>
		<div class="line-wrap">
			<div class="tabs-btn">
				<a href="javascript:;" class="btns tab1 tab1active" @click="active('tab1')" ref="tab1"></a>
				<a href="javascript:;" class="btns tab2" @click="active('tab2')" ref="tab2"></a>
				<a href="javascript:;" class="btns tab3" @click="active('tab3')" ref="tab3"></a>
				<a href="javascript:;" class="btns tab4 " @click="active('tab4')" ref="tab4"></a>
			</div>
		</div>
		<div class="tabs-wrap" ref="tabswrap">
			<div class="tab-content" v-if="activeTab=='tab1'">
				<p v-for="item in getWords">{{item}}</p>
			</div>
			<div class="tab-content" v-else-if="activeTab=='tab2'">
				<p v-for="item in getWords">{{item}}</p>
			</div>
			<div class="tab-content" v-else-if="activeTab=='tab3'">
				<p v-for="item in getWords">{{item}}</p>
			</div>
			<div class="tab-content" v-else>
				<p v-for="item in getWords">{{item}}</p>
			</div>
		</div>

	</div>
</template>

<script>
import { rivers_ce } from './rivers_ce_bk.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			activeTab: 'tab1'
		}
	},
	computed: {
		...mapGetters({
			getNowRiver: 'getNowRiver'
		}),
		getWords() {
			let nowRiver = this.getNowRiver;
			let riverWords;
			if(!nowRiver) {
				riverWords = rivers_ce['1'];
			}else {
				riverWords = rivers_ce[nowRiver.id];
			}
			
			if (this.activeTab == 'tab1') {
				return riverWords.river_management_strategy.split('<br>');
			} else if (this.activeTab == 'tab2') {
				return riverWords.standard.split('<br>');
			} else if (this.activeTab == 'tab3') {
				return riverWords.technical_solution.split('<br>');
			} else {
				return riverWords.technology_innovation.split('<br>');
			}
		}
	},
	methods: {
		active(val) {
			this.$refs.tabswrap.scrollTop = 0;
			if (val == 'tab1') {
				this.$refs[this.activeTab].className = 'btns '+this.activeTab;
				this.$refs[val].className = 'btns tab1active';
				this.activeTab = val;
			}
			if (val == 'tab2') {
				this.$refs[this.activeTab].className = 'btns '+this.activeTab;
				this.$refs[val].className = 'btns tab2active';
				this.activeTab = val;
			}
			if (val == 'tab3') {
				this.$refs[this.activeTab].className = 'btns '+this.activeTab;
				this.$refs['tab3'].className = 'btns tab3active';
				this.activeTab = val;
			}
			if (val == 'tab4') {
				this.$refs[this.activeTab].className = 'btns '+this.activeTab;
				this.$refs[val].className = 'btns tab4active';
				this.activeTab = val;
			}
		},
	},
	mounted() {
		let height = window.innerHeight;
		//this.$refs.tabswrap.style.height = height - 216 + 'px';
	}
}
</script>

<style scoped>
.nothin {
	height: 1px;
}
.tab1{
	background: url("../../../../static/v2images/zhihe.png")center center no-repeat;
	background-size: 81px;
}
.tab1active{
	background: url("../../../../static/v2images/zhiheactive.png")center center no-repeat;
	background-size: 81px;
}
.tab2{
	background: url("../../../../static/v2images/biaozhun.png")center center no-repeat;
	background-size: 81px;
}
.tab2active{
	background: url("../../../../static/v2images/biaozhunactive.png") center center no-repeat;
	background-size: 81px;
}
.tab3{
	background: url("../../../../static/v2images/jishu.png") center center no-repeat;
	background-size: 81px;
}
.tab3active{
	background: url("../../../../static/v2images/jishuactive.png") center center no-repeat;
	background-size: 81px;
}
.tab4{
	background: url("../../../../static/v2images/keji.png") center center no-repeat;
	background-size: 81px;
}
.tab4active{
	background: url("../../../../static/v2images/kejiactive.png") center center no-repeat;
	background-size: 81px;
}
.tabs-btn {
	display: flex;
	width: 94%;
	margin: 5px auto;
	border-radius: 2px;
}

.tabs-btn a {
	display: inline-block;
	width: 25%;
	height:40px;
	text-align: center;
	font-size: 14px;
}

.tabs-btn .noborder {
	border-right: none;
}



.mu-tabs {
	color: #333;
	background-color: #fff;
}

.mu-tab-link {
	min-height: 35px;
	height: 35px;
	color: #333;
}

.mu-tab-active {
	color: #2196f3;
}

.line-wrap {
	border-bottom: 1px solid #efefef;
}

.aaad .tabs-wrap {
	position: absolute;
	left:3%;
	right: 3%;
	bottom:0;
	background: #fff;
	z-index: 74;
	top: 159px;
	overflow: auto;
}

.tab-content p {
	font-size: 14px;
	text-indent: 28px;
	line-height: 24px;
}
</style>