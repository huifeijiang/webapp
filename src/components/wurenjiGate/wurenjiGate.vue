<template>
	<div class="gate-wrap">
		<div class="alert-head">
          <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
	      	<span class="alert-title">无人机</span>
	      	<span class="alert-right hidden">提交</span>
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
					router: '/home/nowVideo',
					name: '实时视频'
				},{
					icon: 'static/v2images/ic-youyan.png',
					router: '/home/historyVideo',
					name: '历史视频'
				},{
					icon: 'static/v2images/ic-qcxl.png',
					router: '/home/wurenji',
					name: '疑似违法记录'
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
			    this.$router.push("/home");
			    this.setMapShow(true);
			},
			jump(item) {
				this.$router.push(item.router);
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
