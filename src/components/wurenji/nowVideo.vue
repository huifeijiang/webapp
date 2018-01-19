<template>
	<div class="wurenji">
		<div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">实时视频</span>
	    <span class="alert-right hidden">提交</span>
	    </div>
	    <div class="nothin"></div>
		<div class="list">
			<span class="l">序号</span>
			<span class="r">任务名称</span>
			<span class="r">时间</span>
		</div>
		<div class="wrap">
			<div class="list" v-for="(item, index) in list" @click="toggle(item)">
				<span class="l">{{index+1}}</span>
				<span class="r">{{item.name}}</span>
				<span class="r">{{item.time}}</span>
			</div>
		</div>

		<mu-drawer class="dra" :open="open" right>
			<div class="alert-head">
        <mu-icon class="alert-left" @click="open=false" value="keyboard_arrow_left" />
        <span class="alert-title">无人机巡检任务</span>
        <span class="alert-right hidden">提交</span>
		    </div>
		    <div class="content">

		    </div>
		</mu-drawer>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	import {eventBus} from '../eventBus/eventBus';
	export default {
		data() {
			return {
				list: [{
					name: 'xxxx',
					time: '2017-11-12'
				}, {
					name: 'xxxx',
					time: '2017-11-12'
				}],
				open: false
			}
		},
		methods: {
			...mapActions({
		        setMapShow: 'setMapShow',
		    }),
		    backToMap() {
          		this.$router.push("/home/wurenjiGate");
			},
			toggle(item) {
				this.open = true;
			},
			jump() {
				this.setMapShow(true);
			}
		},
		mounted() {
			document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    	},
	    destroyed(){
	      	document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
	    }
	}
</script>

<style lang="less" scoped>
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
	.wurenji {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    z-index: 72;
	    background-color: #fff;
	  }

	.hidden {
	    visibility: hidden;
	}

	.nothin {
	    height: 56px;
	}
	.list {
		display: flex;
		align-items: center;
		height: 40px;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		span {
			width: 50%;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.l {
			width: 20%;
		}
		.r {
			width: 40%;
		}
	}
	.wrap {
		position: absolute;
		left: 0;
		top: 97px;
		right: 0;
		bottom: 10px;
		overflow-y: auto;
	}
	.dra {
		width: 100%;
		z-index: 90;
	}
	.content {
		position: absolute;
		left: 0;
		top: 56px;
		right: 0;
		bottom: 5px;
		z-index: 10;
		overflow-y: auto;
	}

</style>
