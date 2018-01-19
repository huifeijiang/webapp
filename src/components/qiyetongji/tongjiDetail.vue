<template>
	<div class="dewrap">
		<head-dom 
			title="企业上报"
			:showSubm="false"
			@back="back">
		</head-dom>
		<div class="tabs">
			<span :class="act=='tab1'?'act':''" @click="getData('tab1')">已上报</span>
			<span :class="act=='tab2'?'act':''" @click="getData('tab2')">待上报</span>
		</div>
		<div class="tab-tit bc">
			<span class="xh">序号</span>
			<span class="cm">企业名称</span>
			<span class="na">环保主任</span>
		</div>
		<div class="content top140">
			<div class="dewrap">
				<div class="com-wrap" ref="com">
					<div class="tab-tit" v-for="(item, index) in list" @click="toggle(item)">
						<span class="xh">{{index+1}}</span>
						<span class="cm">{{item.enterpriseName}}</span>
						<span class="na">{{item.username}}</span>
					</div>
				</div>
			</div>
		</div>
		<autoformPreview :isShowSubmit="false" :openyulan="openperive" title="环保主任事件详情"></autoformPreview>
	</div>
</template>

<script>
	import headDom from '../../UIcomponents/head/head.vue';
	import { eventBus } from '../eventBus/eventBus.js';
	import bindScrollAction from '../scrollPlugin/scrollPlugin.js';
	import { formFillTool } from '../../UIcomponents/autoForm/tool/FormFillTool';
    import { formItemShowTool } from '../../UIcomponents/autoForm/tool/FormItemShowTool';
    import { huanbanzhurenData } from '../../UIcomponents/autoForm/data/huanbaozhuren.js';
    import autoformPreview from '../../UIcomponents/autoForm/autoformPreview.vue';
	export default {
		components: {
			headDom,
			autoformPreview
		},
		data() {
			return {
				act: 'tab1',
				open: false,
				list: [],
				openperive: false
			}
		},
		props: {
			date: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: ''
			}
		},
		methods: {
			back() {
				this.act = 'tab1';
				this.$emit('back');
			},
			setAct(str) {
				this.act = str;
			},
			getData(str) {
				if(!(this.act == str)) {
					this.setAct(str);
					if(str == 'tab1') {
						//获取已上报
						this.getList(true)
					}else {
						//获取待上报
						this.getList(false)
					}
				}
			},
			getList(status) {
				let sts = ''
				if(status) {
					//已上报
					sts = '?noMissionStatus=0'
				}else {
					sts = '?missionStatus=0'
				}
				this.$http.get(GET_HUANBAOZHUREN_REPORT + sts + '&streetId=' + this.$props.id + '&size=1000' + '&date=' + this.$props.date).then( res => {
					if((this.act=='tab1' && sts == '?noMissionStatus=0') || (this.act=='tab2' && sts == '?missionStatus=0')) {
						this.list = res.body.data.content;
					} else {
						console.log('eee')
					}
				}).catch( err => {

				})
			},
			toggle(item) {
				if(this.act == 'tab2') return false;
				this.showItem(item);
			} ,
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
		watch: {
			date(val) {
				this.getList(true)
			},
			id(val) {
				this.getList(true)
			}
		},
		mounted() {
			console.log(this.$props.date, this.$props.id,'mountd')
			bindScrollAction(this.$refs.com, function() {
				console.log(1)
			});
		}
	}
</script>

<style lang="less" scoped>
  @import  './qytongji.less';
</style>