<template>
	<div class="gate-wrap">
		<div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">企业上报统计</span>
      <span class="alert-right hidden">提交</span>
	    </div>
		<div class="nothin"></div>
		<div class="tab">
			<div :class="active == 'tab1' ? 'active' : ''" @click="toggle('tab1')">今日上报详情</div>
			<div :class="active == 'tab2' ? 'active' : ''" @click="toggle('tab2')">历史上报详情</div>
		</div>

		<div class="time" v-show="active=='tab2'">
			<p @click="chooseTime">点击选择时间:{{nowTime}}</p>
			<mt-datetime-picker ref="pickerstart" v-model="pickerVisiblestart" type="date" :startDate="minDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
        	</mt-datetime-picker>
		</div>

		<div class="search">
			<input type="text" placeholder="请输入关键字..." v-model="text" @focus="searchRadio=true" @blur="reset" @input="searching" >
			<div class="search-list" v-show="searchRadio" ref="search">
				<p v-for="item in searchList" @click="showItem(item)">{{item.enterpriseName}}</p>
			</div>
		</div>


		 <div class="result-wrap">

			<div class="street" v-for="item in street" @click="show(item)">
				<p>{{item.name}}</p>
				<div v-show="item.show">
					<div class="street-fl">
						<span class="lt">序号</span>
						<span class="bg">企业名称</span>
						<span class="lt">环保主任</span>
					</div>
					<div class="street-fl" v-for="(sub,index) in item.list" @click.stop="showItem(sub)">
						<span class="lt">{{index+1}}</span>
						<span class="bg">{{sub.enterpriseName}}</span>
						<span class="lt">{{sub.reporter}}</span>
					</div>
				</div>
			</div>
		</div>

		<autoformPreview :isShowSubmit="false" :openyulan="openperive" title="环保主任事件详情"></autoformPreview>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import { eventBus } from  '../eventBus/eventBus.js';
	import bindScrollAction from './bindScroll.js';
	import { formFillTool } from '../../UIcomponents/autoForm/tool/FormFillTool';
    import { formItemShowTool } from '../../UIcomponents/autoForm/tool/FormItemShowTool';
    import { huanbanzhurenData } from '../../UIcomponents/autoForm/data/huanbaozhuren.js';
    import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
	export default {
		components: {
			autoformPreview
		},
		data() {
			return {
				active: 'tab1',
				text: '',
				searchRadio: false,
				searchList: [],
				pickerVisiblestart: '',
				nowTime: '',
				page: 0,
				needLoad: true,
				minDate: new Date('2017-01-01'),
				openperive: false,
				street: [{
					name: '新安街道',
					show: false,
					list: []
				},{
					name: '西乡街道',
					show: false,
					list: []
				},{
					name: '航城街道',
					show: false,
					list: []
				},{
					name: '福永街道',
					show: false,
					list: []
				},{
					name: '福海街道',
					show: false,
					list: []
				},{
					name: '沙井街道',
					show: false,
					list: []
				},{
					name: '新桥街道',
					show: false,
					list: []
				},{
					name: '松岗街道',
					show: false,
					list: []
				},{
					name: '燕罗街道',
					show: false,
					list: []
				},{
					name: '石岩街道',
					show: false,
					list: []
				}],
				streetMap: {
					'新安街道': [],
					'福海街道': [],
					'西乡街道': [],
					'航城街道': [],
					'福永街道': [],
					'沙井街道': [],
					'新桥街道': [],
					'松岗街道': [],
					'燕罗街道': [],
					'石岩街道': []
				},
				timer: null
			}
		},
		created() {
			this.initData();
		},
		methods: {
			...mapActions({
				setMapShow: 'setMapShow'
			}),
			backToMap(e) {
				if (e) {
			        e.preventDefault();
			    }
			    this.setMapShow(false);
        		this.$router.push("/home/eventGate");
			},
			toggle(str) {
				this.active = str;
				if(str == 'tab2') {
					this.initData(true);
				}else {
					this.initData(false);
				}
			},
			searching() {
				if(this.text == '') {
					this.searchList = [];
					return;
				};
        		this.page = 0;
        		clearInterval(this.timer);
        		this.timer = null;
        		this.timer = setTimeout(() => {
					this.getData(this.text,this.page)
        		}, 300);
			},
			reset() {
				// this.searchRadio = false;
				// this.searchList = [];
				// this.text = '';
				// this.page = 0;
			},
			show(item) {
				item.show = !item.show;
			},
			showDetail() {
				console.log(1)
			},
			chooseTime() {
				this.$refs.pickerstart.open();
			},
			handleConfirm() {
            	this.nowTime = this.format(this.pickerVisiblestart,'start');
            	this.initData(false,this.nowTime);
        	},
        	format(datetime,type) {
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
	            if(type == 'start'){
	                return year + '-' + month + '-' + date
	            }else if(type == 'end'){
	                return year + '-' + month + '-' + date
	            }
        	},
        	getData(str,page) {
        		this.needLoad = true;
        		let date = '';
        		if(this.active == 'tab2') {
        			if(this.pickerVisiblestart == ''){
        				alert('请选择时间');
        				return;
        			}
        			date = '&date=' +　this.format(this.pickerVisiblestart,'start');
        		}
        		this.$http.get(GET_HUANBAOZHUREN_REPORT + '?name=' + str + '&size=10&page=' + page + date).then( res => {
        			if(res.body.data.content.length == 0) {
        				this.needLoad = false;
        			}
        			this.searchList = res.body.data.content;

        		}).catch( err => {})
        	},
        	initData(bool,ddtt) {
        		//重置map
        		for(let o in this.streetMap) {
        			this.streetMap[o] = [];
        		}

        		let datetime = new Date();
        		let year = datetime.getFullYear();
	            let month = datetime.getMonth() + 1;
	            if (month >= 1 && month <= 9) {
	                month = "0" + month;
	            }
	            let date = datetime.getDate();
	            if (date >= 0 && date <= 9) {
	                date = "0" + date;
	            }
	            let dateStr = '&date=' + year + '-' + month + '-' + date;
	            if(bool === true) {
	            	dateStr = '';
	            }
	            if(ddtt) {
	            	dateStr = '&date=' + ddtt;
	            }
        		this.$http.get(GET_HUANBAOZHUREN_REPORT + '?name=&size=100' + '&noMissionStatus=0' + dateStr).then( res => {
        			let datas = res.body.data.content;
	                for(let i=0; i<datas.length; i++) {
	                  if(datas[i].streetName) {
	                    this.streetMap[datas[i].streetName].push(datas[i]);
	                  }
	                }
	                for(let o in this.streetMap) {
	                  for(let a=0; a<this.street.length; a++) {
	                    if(o == this.street[a].name) {
	                      this.$set(this.street[a], 'list', this.streetMap[o]);
	                      this.street[a].show = true;
	                      break;
	                    }
	                  }
	                }
	                for(let i=0; i<this.street.length; i++) {
        				if(this.street[i].list.length ==0) this.street[i].show = false;
        			}
        		}).catch( err => {})
        	},
        	loadmore() {
				if(!this.needLoad) return;
				this.page += 1;
				let date = '';
        		if(this.active == 'tab2') {
        			if(this.pickerVisiblestart == ''){
        				alert('请选择时间');
        				return;
        			}
        			date = '&date=' +　this.format(this.pickerVisiblestart,'start');
        		}
        		this.$http.get(GET_HUANBAOZHUREN_REPORT + '?name=' + this.text + '&size=10&page=' + this.page + date).then( res => {
        			if(res.body.data.content.length == 0) {
        				this.needLoad = false;
        				return ;
        			}
        			this.searchList = this.searchList.concat(res.body.data.content);

        		}).catch( err => {})
			},
        	showItem(item) {
        		this.openperive = true;
                this.$http.get(POST_HUANBAOZHUREN_REPORT + item.id + '/details').then((res) => {
                	this.searchRadio = false;
					this.searchList = [];
					this.text = '';
					this.page = 0;

                    let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
                    let obj = res.body.data;
                    //填充表单
                    formFillTool.fillForm(formClone, obj);
                    //初始化父子关系
                    formFillTool.initForm(formClone);
                    //设置父子关系展示
                    formItemShowTool.setShowByParent(formClone);
                    //抛出详情展示事件
                    eventBus.bus.emit(eventBus.LAMPYULAN, formClone);

                }).catch(err => {})
        	}
		},
		mounted() {
			bindScrollAction(this.$refs.search, this.loadmore);
			document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
		},
  		destroyed() {
   			document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
  		}
	}
</script>

<style lang="less" scoped>
  .alert-title{
    font-size: 18px;
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
    z-index:81;
  }
  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }
	.hidden {
		visibility: hidden;
	}
	.nothin {
		height: 1px;
	}
	.tab {
		display: flex;
		align-items: center;
		width: 100%;
		height: 40px;
		margin-top: 56px;
		background-color: #333;
		div {
			width: 50%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-right: 1px solid #efefef;
			border-bottom: 1px solid #efefef;
			background-color: #fff;
		}
		div:last-child {
			border-right: none;
		}
		.active {
			color: #fff;
			background-color: #4BAAF4;
		}
	}
	.time {
		height: 30px;
		line-height: 30px;
    padding:0 10px;
	}
	.search {
		position: relative;
		width: 100%;
		padding: 5px;
		input {
			width: 100%;
			height: 30px;
			line-height: 30px;
			border: 1px solid #efefef;
			outline: none;
      padding-left:10px;
		}
		z-index: 2;
		.search-list {
			position: absolute;
			left: 0;
			top: 35px;
			width: 100%;
			max-height: 270px;
			overflow-y: auto;
			background-color: #fff;
			p{
				width: 100%;
				height: 30px;
				line-height: 30px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			p:nth-child(2n-1) {
				background-color: rgba(0, 0, 0, 0.05);
			}
		}
	}
	.result-wrap {
		position: absolute;
		left: 0;
		top: 170px;
		right: 0;
		bottom: 1px;
		overflow-y: auto;
	}
	.street {
		width: 100%;
		height: auto;
		p {
			height: 35px;
			line-height: 35px;
			text-indent: 24px;
			background-color: #efefef;
			border-bottom: 1px solid #bebebe;
		}
	}
	.street-fl {
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #bebebe;
		span {
			text-align: center;
			font-size: 14px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.lt {
			width: 24%;
		}
		.bg {
			width: 52%;
		}
	}
</style>
