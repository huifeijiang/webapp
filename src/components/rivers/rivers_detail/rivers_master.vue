<template>
	<div class="wapp">
		<div class="timeline-item" ref="timeline">

			<div class="timewrap" ref="timelinewrap">
				<div class="timeline-wrap">
					<div class="timeline quji">
						<div class="tl-title">
							<div class="tlll">区级</div>
						</div>
						<slot v-for="item in riverMess.part">
							<p class="text-p">{{item.txt}}</p>
						</slot>
					</div>
					<div class="timeline jiedaoji">
						<div class="" v-for="item in street">
							<div class="line" ref="line"></div>
							<div class="jidao">
								<div class="tlll">街道级</div>
							</div>
							<div class="tl-title">
								<div class="radius-outer">
									<span class="radius"></span>
								</div>
								<span class="tl-title-span">{{item.name}}</span>
							</div>
							<p class="text-p">{{item.master}}</p>
							<p class="text-p">{{item.master_f}}</p>
							<slot v-for="li in item.part">
								<p class="text-p type-2">{{li.name}}</p>
								<p class="text-p type-3" v-for="child in li.mans">
									<a :href="'tel:'+child.tel">{{child.name}}</a>
									<span></span>
								</p>
							</slot>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { eventEmitter } from '../river_event.js';
export default {
	data() {
		return {
			riverMess: {
				part: [],
				street: []
			},
			streetMan: [],
			open: false,
			nowItem: '',
			activeTab: 'tab1',
			street: []
		}
	},
	computed: {
		...mapGetters({
			getNowRiver: 'getNowRiver'
		})
	},
	methods: {
		toggle(item) {
			this.open = !this.open;
			this.nowItem = item;
		},
		handleTabChange(val) {
			this.activeTab = val
		},
		getRiverMess(id) {
			var that = this;
			this.$http.get(GET_RIVER_REACHS + id + '/managers/?size=100').then((res) => {
				let riverMess = [];
				let streetMan = []
				let rd = res.body.data.content;
				//重置street
				this.street = [];

				for (let i = 0; i < rd.length; i++) {
					switch (parseInt(rd[i].managerLevel)) {
						case 2:
							riverMess.unshift({
								type: 1,
								txt: '区级河长:' + rd[i].name
							});
							break;
						case 3:
							if (riverMess.length <= 1) {
								riverMess.push({
									type: 1,
									txt: '区级副河长:' + rd[i].name
								});
							} else {
								riverMess.splice(1, 0, {
									type: 1,
									txt: '区级副河长:' + rd[i].name
								});
							}
							break;
						case 4:
							riverMess.push({
								type: 1,
								txt: '河务专员:' + rd[i].name
							});
							break;
						case 5:
							try {
								var bool = false;
								for (let a = 0; a < this.street.length; a++) {
									if (this.street[a].name == rd[i].street) {
										this.street[a].master = '街道级河长:' + rd[i].name
										bool = true;
										break;
									}
								}
								if (!bool) {
									this.street.push({
										name: rd[i].street,
										type: 1,
										master: '街道级河长:' + rd[i].name,
										part: []
									});
								}
							} catch (e) { }
							break;
						case 6:
							try {
								var bl = false;
								for (let b = 0; b < this.street.length; b++) {
									if (this.street[b].name == rd[i].street) {
										this.street[b].master_f = '街道级副河长:' + rd[i].name
										bl = true;
										break;
									}
								}
								if (!bl) {
									this.street.push({
										name: rd[i].street,
										type: 1,
										masterf_: '街道级副河长:' + rd[i].name,
										part: []
									});
								}
							} catch (e) { }
							break;
					}
				}
				this.riverMess.part = riverMess;
				this.streetMan = streetMan;

				this.$http.get(GET_RIVER_REACHS + 'admin?riverId=' + id + '&size=100').then((res) => {
					let people = res.body.data.content;
					//重置part
					for (let r = 0; r < that.street.length; r++) {
						that.street[r].part = []
					}
					//提取数据
					for (let a = 0; a < that.street.length; a++) {
						for (let b = 0; b < people.length; b++) {
							if (that.street[a].name == people[b].street) {
								let boolA = false;
								for (let c = 0; c < that.street[a].part.length; c++) {
									if (that.street[a].part[c].name == people[b].gridName) {
										that.street[a].part[c].mans.push({
											type: 3,
											tel: people[b].tel,
											name: (people[b].roleName == '环管员') ? '环管员:' + people[b].name : (people[b].roleName == '段管员') ? '段管员:' + people[b].name : '段长:' + people[b].name
										});
										boolA = true;
									}
								}
								if (!boolA) {
									that.street[a].part.push({
										type: 2,
										name: people[b].gridName,
										mans: [{
											type: 3,
											tel: people[b].tel,
											name: (people[b].roleName == '环管员') ? '环管员:' + people[b].name : (people[b].roleName == '段管员') ? '段管员:' + people[b].name : '段长:' + people[b].name
										}]
									});
								}

							}
						}
					}

				}).catch((error) => { });

			}).catch((error) => { });
		}
	},
	mounted() {
		let height = window.innerHeight;

		//this.$refs.line.style.height = height -206+'px'
		//请求数据
		eventEmitter.on('river_detail', (item) => {
			this.$refs.timelinewrap.scrollTop = 0;
			this.getRiverMess(item.id);
		});
		let river = this.getNowRiver
		this.getRiverMess(river.id);
	}
}
</script>

<style lang="less" scoped>
.nothin {
	height: 1px;
}

.wapp {
	position: absolute;
	left: 0;
	right: 0;
	top: 107px;
	bottom: 5px;
	overflow: auto;
	background: #f9fcff
}

.river-head {
	height: 56px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #efefef;
}

.river-head img {
	display: block;
	margin-left: 10px;
	width: 28px;
}

.river-head p {
	margin-left: 10px;
	font-size: 20px;
}

.timeline-item {
	position: relative;
	width: 90%;
	margin: 0 auto;
	height: 100%
}

.quji,
.jiedaoji {
	border: 1px solid #EDF0F9;
	border-radius: 5px;
	box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .05);
	background: #fff
}
.jiedaoji{
	margin-bottom: 40px
}
.jiedaoji .timeline-wrap {
	position: relative;
}

.line {
	position: absolute;
	top: 33px;
	bottom: 21px;
	z-index: 3;
	left: 28px;
	width: 1px;
	border-left: 1px solid #efefef;
}

.jidao {
	position: absolute;
	width: 64px;
	height: 24px;
	background: #FFB118;
	border-radius: 2px;
	text-align: center;
	line-height: 24px;
	top: -12px;
	left: 11px;
	color: #fff
}

.jiedaoji {
	margin-top: 30px
}

.tlll {
	width: 100%;
	text-align: center
}

.quji .tl-title {
	position: absolute;
	width: 64px;
	height: 24px;
	background: #FFB118;
	border-radius: 2px;
	text-align: center;
	line-height: 24px;
	top: -12px;
	left: 11px;
	color: #fff
}

.timewrap {
	position: absolute;
	left: 0;
	top: 30px;
	z-index: 2;
	width: 100%;
}

.timeline {
	position: relative;
	z-index: 2;
	padding: 20px 0px 15px 20px;
}

.tl-title {
	display: flex;
	align-items: center;
}

.radius-outer {
	width: 16px;
	height: 16px;
	z-index: 4;
	border-radius: 8px;
	background-color: rgba(33, 150, 243, 0.5);
}

.radius {
	display: inline-block;
	width: 6px;
	height: 6px;
	border-radius: 3px;
	background-color: #2196f3;
	vertical-align: top;
	margin-top: 5px;
	margin-left: 5px;
}

.tl-title-span {
	color: #2196f3;
	margin-left: 5px;
}

.text-p {
	text-indent: 21px;
	margin-top: 5px;
	margin-bottom: 5px;
	color: #6a6e7b;
}

.text-p a {
	color: #6a6e7b;
}

.type-2 {
	// text-indent: 42px;
	color: #A0A0AA;
	// background: url("../../../../static/images/level_6.png") no-repeat;
	background-size: 11px 14px;
	background-position: 21px center;
}

.type-3 span {
	display: inline-block;
	width: 14px;
	height: 14px;
	background: url("../../../../static/images/ic-phone.png") no-repeat;
	background-size: 14px 14px;
	background-position: right center;
	vertical-align: top;
	margin-top: 3px;
	margin-left: 3px;
}
</style>