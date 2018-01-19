<template>
	<div class="gate-wrap">
		<div class="gate-head">
			<mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
			<span class='center-title'>巡查统计</span>
			<span class="hidden">隐藏</span>
		</div>

		<div class="gate-box">
			<div v-for="item in buttons" class="boxsg" @click="jump(item)">
				<img :src="item.icon" alt="">
				<p>{{item.name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { eventBus } from  '../eventBus/eventBus.js';
	export default {
		data() {
			return {
				buttons: [{
					icon: 'static/v2images/ic-ry.png',
					router: '/home/walkerMan',
					name: '人员统计'
				},{
					icon: 'static/v2images/ic-youyan.png',
					router: '/home/riverStatistic',
					name: '日常巡查统计'
				},{
					icon: 'static/v2images/ic-qcxl.png',
					router: '/home/portal/xslw',
					name: '专项巡查统计'
				},{
					icon: 'static/v2images/ic-rcxc.png',
					router: '/home/portal/qiyetongji',
					name: '企业上报统计'
				}]
			}
		},
		methods: {
			...mapActions({
				setMapShow: 'setMapShow'
			}),
			backToMap(e) {
				if (e) {
			        e.preventDefault();
			    }
			    this.$router.push("/home/portal");
			    this.setMapShow(true);
			},
			jump(item) {
				this.$router.push(item.router);
				if(item.name == '专项巡查统计') {
					eventBus.bus.emit('tabActive');
				}
			}
		},
		mounted() {
			document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
		},
  		destroyed() {
   			document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
  		}
	}
</script>

<style lang="less" scoped>
  .center-title{
    font-size:18px;
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
	.gate-head {
		  position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 56px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    background-color: #4BAAF4;
	    box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
	    color: #fff;
	}
  .alert-left{
    position:absolute;
    left:15px;
  }
	.hidden {
		/*visibility: hidden;*/
    display: none;
	}
	.gate-box {
		width: 100%;
		height: auto;
		margin-top: 150px;
		&:after {
			content: '';
			display: block;
			clear: both;
		}
	}
	.boxsg {
		float: left;
		width: 33%;
		margin-bottom: 10px;
		text-align: center;
		img {
			width: 80%;
		}
		p {
			text-align: center;
		}
	}
</style>
