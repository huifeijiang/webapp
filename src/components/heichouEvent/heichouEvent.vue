<template>
	<div class="heichou">
		<div class="alert-head">
          <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
	        <!--<span class="alert-left" @click="backToMap">返回</span>-->
	        <span class="alert-title">选择事件类型</span>
	        <span class="alert-right"></span>
	    </div>
	    <div class="cont">
			<div class='list-it' v-powerCode="item.powerCode" v-for="item in eventlists" @click="eventlist(item)">{{item.name}}</div>
	        <!-- <div class='list-it' @click="littleBtn">小散乱污事件列表</div>
	        <div class='list-it' @click="tocanyinlist">餐饮事件列表</div>
	        <div class='list-it' @click="tocarlist">汽车修理事件列表</div> -->
	    </div>
	</div>
</template>

<script>
	import { eventBus } from '../eventBus/eventBus';
	import { mapGetters, mapActions, mapState } from 'vuex';
	import {routeCodeTool} from '../CodeRouteTool';
	export default {
		data(){
			return {
				eventlists:[
					{name:'小散乱污事件列表',powerCode:{code:'XSXC_EVENTLIST'}},
					{name:'日常巡查事件列表',powerCode:{code:'NXC_EVENTLIST'}},
					{name:'油烟上报事件列表',powerCode:{code:'YY_EVENTLIST'}},
					{name:'汽车修理事件列表',powerCode:{code:'CAR_EVENTLIST'},router:'/home/careevent'},
					{name:'餐饮事件列表',powerCode:{code:'CAT_EVENTLIST'},router:'/home/cateringevent'},
					{name:'在管工业列表',powerCode:{code:'CAT_EVENTLIST'},router:'/home/zaiguanqiyelist'},
					{name:'小废水企业排查列表',powerCode:{code:'CAT_EVENTLIST'},router:'/home/xiaofeishuiCompanyList'},
					{name:'小散乱污(市)事件列表',powerCode:{code:'CAT_EVENTLIST'},router:'/home/newlittleEvent'},
					{name:'疑似违法记录事件列表',powerCode:{code:'CAT_EVENTLIST'},router:'/home/newlittleEvent'},
					{name:'企业上报事件列表',powerCode:{code:'QY_EVENTLIST'},router:'/home/huanbaozhurenEvent'}
				]
			}
		},
		methods:{
			...mapActions({
				setMapShow: 'setMapShow',
			}),
			backToMap() {
		      	this.$router.push('/home');
		    },
		    littleBtn:function(){
		        this.setMapShow(false);
		        this.$router.push("/home/littleEvent");
		    },
		    tocanyinlist(){
		      	this.setMapShow(false);
		      	this.$router.push("/home/portal/cateringevent");
		    },
		    tocarlist(){
		      	this.setMapShow(false);
		      	this.$router.push('/home/portal/careevent')
			},
			eventlist(item){
				this.setMapShow(false);
				if(item.router){
					this.$router.push(item.router)
				}else{
					routeCodeTool.pushEventRoute(this.$router,item.powerCode.code);
				}
			}
		},
		mounted() {
	    	this.setMapShow(true);
	    	document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
	  	},
	  	destroyed() {
	    	document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
	  	}
	}
</script>

<style scoped>
	.heichou {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 80;
	}
	.alert-head {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		background-color: #4BAAF4;
    box-shadow: 0px 4px 7px 0px #C9E1F3;
	}
  .alert-title{
    font-size:18px;
  }
  .alert-left{
    position:absolute;
    left:15px;
  }
	.list-it {
	  	width: 100%;
	  	text-align: center;
	  	height: 45px;
	  	line-height: 45px;
	  	color: #5A5E6F;
	 	border-bottom: 1px solid #ECEFF9
	}

	.cont {
	  	position: absolute;
	  	top: 56px;
	  	left: 0;
	  	right: 0;
	  	bottom: 0;
	  	background: #fff;
	  	overflow: auto;
	}
</style>
