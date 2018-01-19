<template>
	<div class="wurenji">
		<div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">事件列表</span>
	    <span class="alert-right hidden">提交</span>
	    </div>
	    <div class="nothin"></div>
		<div class="list listwrap">
			<span class="l">序号</span>
			<span class="r">任务名称</span>
			<span class="r">时间</span>
		</div>
		<div class="wrap" ref="wrap">
			<div class="list" v-for="(item, index) in list" @click="toggle(item)">
				<span class="l">{{index+1}}</span>
				<span class="r">{{item.missionName}}</span>
				<span class="r">{{item.datetime.split(' ')[0]}}</span>
			</div>
		</div>

		<mu-drawer class="dra" :open="open" right>
			<div class="alert-head">
            <mu-icon class="alert-left" @click="open=false" value="keyboard_arrow_left" />
		      	<span class="alert-title">无人机巡检任务详情</span>
		      	<span class="alert-right hidden">提交</span>
		    </div>
		    <div class="content">
		    	<div>
		    		<p>疑似违法违规标注目标:</p>
		    		<img v-for="item in detail.recordImages" :src="item" alt="">
		    	</div>
				<div>
					<p>疑似目标违法信息描述:</p>
					<p>{{detail.describe}}</p>
				</div>
				<div>
					<p>位置坐标信息:</p>
					<p>纬度: {{detail.latitude}}</p>
					<p>经度: {{detail.longitude}}</p>
					<div class="nob"></div>
				</div>
		    </div>
		    <div class="button" @click="jump">地图定位</div>
		</mu-drawer>
		<mu-dialog :open="dialog" :title="message"></mu-dialog>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	import {eventBus} from '../eventBus/eventBus';
	import bindScrollAction from '../scrollPlugin/scrollPlugin';
	import {locateManagerCtrl} from '../../gisComponets/locateManager/LocateManagerCtrl.js';
	export default {
		data() {
			return {
				list: [],
				open: false,
				page: 0,
				needLoad: true,
				detail: {},
				dialog: false,
				message: ''
			}
		},
		created() {
			this.initData();
		},
    computed: {
      ...mapGetters({
        getCode: 'getCode',
      })
    },
		methods: {
			...mapActions({
		        setMapShow: 'setMapShow',
		    }),
		    backToMap() {
          if(this.getCode.indexOf('HEZHANG') != -1){
            			  this.$router.push("/home/wurenjiGate");
          }else{
            this.setMapShow(true);
            this.$router.push({name:'home',params:{name:true}});
          }
        },
			toggle(item) {
				this.detail = {};
				this.message = '加载中...';
				this.dialog = true;
				this.$http.get(GET_WURENJI_FZLIST_XQ + item.id + '/details').then( res => {
					this.dialog = false;
					this.open = true;
					this.detail = res.body.data;
				}).catch( err => {
					this.message = '加载失败';
					setTimeout(() => {
						this.dialog = false;
					},1000)
				});
			},
			jump() {
				this.setMapShow(true);
				this.$router.push("/home");
				locateManagerCtrl.zoomByLongitude(this.detail.latitude, this.detail.longitude);
			},
			initData() {
				if(!this.needLoad) return;
				this.$http.get(GET_WURENJI_FZLIST + '?size=10&page=' + this.page).then( res => {
					if(res.body.data.content.length == 0) {
						this.needLoad = false;
						return;
					}else {
						this.list = this.list.concat(res.body.data.content);
						this.page += 1;
					}
				}).catch( err => {})
			}
		},
		mounted() {
			bindScrollAction(this.$refs.wrap, this.initData);
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
	    z-index: 81;
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
		/*position: absolute;*/
		/*left: 0;*/
		/*top: 97px;*/
		/*right: 0;*/
		/*bottom: 10px;*/
    height:100%;
		overflow-y: auto;
    z-index:80;
    padding-top:96px;
	}
  .listwrap{
    position:fixed;
    top:56px;
    z-index:81;
    background:#fff;
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
		bottom: 1px;
		z-index: 10;
		overflow-y: auto;
		div {
			padding: 5px 0;
			border-bottom: 1px solid #efefef;
		}
		p {
			text-indent: 24px;
			margin-bottom: 5px;
		}
		img {
			display: block;
			width: 98%;
			margin: 0 auto;
		}
	}
	.button	{
		position: absolute;
		left: 50%;
		bottom: 20px;
		width: 160px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin-left: -80px;
		border-radius: 5px;
		background-color: #4baaf4;
		color: #fff;
		z-index: 12;
	}
	.content .nob {
		height: 50px;
		border-bottom: none;
	}
</style>
