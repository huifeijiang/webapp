<template>
	<div class="wrap">
		
		<div class="head">
			<span class="left" @click="backtohome">返回</span>
			<span>事件列表</span>
			<span class="hidden">隐藏</span>
		</div>
		
		<div class="container">
			<div class="list" v-for="item in list">
				<span class="name">{{item.name}}</span>
				<span class="butn" @click="showgmap(item)">地图显示</span>
			</div>
		</div>
		
		<!--弹出层-->
		<transition name="fade">	
			<div class="alert" v-show="showAlert">
				<div class="head">
					<span class="left" @click="showAlert=false">返回</span>
					<span>地图</span>
					<span class="hidden">隐藏</span>
				</div>

				<div class="gmapwrap">
					<div id="gmap" class="gmap"></div> 
					<div class="search" @click="mask=true">导航</div>
				</div>

				<!--mask-->
				<transition name="mask">
					<div class="mask" v-show="mask" @click="mask=false">
						<div class="select" @click="mask=false">
							<div class="opt" @click="toamap">高德地图</div>
							<div class="opt" @click="tobmap">百度地图</div>
						</div>
					</div>
				</transition>
				<!--end-->
			</div>
		</transition>	
		<!--end-->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: 'aa事件',
					slong: 113.9531,
					slati: 22.5401,
					elong: 113.9731,
					elati: 22.5201,
					company: 'aaa公司'
				},{
					name: 'bb事件',
					slong: 113.9531,
					slati: 22.5401,
					elong: 113.9781,
					elati: 22.5201,
					company: 'bbb公司' 
				},{
					name: 'cc事件',
					slong: 113.9531,
					slati: 22.5401,
					elong: 113.9811,
					elati: 22.5201,
					company: 'ccc公司' 
				}],
				showAlert: false,
				mask: false,
				map: null,
				drving: null,
				result: null,
				nowItem: null
			}
		},
		methods: {
			backtohome() {
				this.$router.push('/home');
			},
			showgmap(item) {
				this.showAlert = true;
				this.nowItem = item;
				if(!this.map) this.showMap(item);
				this.renderPath(item);
			},
			showMap(item) {
				var self = this;
				var promise = new Promise((resolve, reject) => {
					self.map = new AMap.Map('gmap',{
			            resizeEnable: true,
			            zoom: 12,
			            center: [113.9809, 22.5958]
			        });

			        AMap.plugin(['AMap.ToolBar','AMap.Scale', 'AMap.Geolocation'], function(){
				        self.map.addControl(new AMap.ToolBar());
				        self.map.addControl(new AMap.Scale());
				        self.map.addControl(new AMap.Geolocation());
					});

			        AMap.plugin('AMap.Driving',function(){
			            self.drving = new AMap.Driving({
			                map: self.map
			            });
			            resolve(true);
			        });
				}); 
				
				promise.then( res => {
					self.renderPath(item);
				}).catch( err => {});
		        
			},
			renderPath(item) {
				var self = this;
				this.drving.search(
					[item.slong, item.slati],
					[item.elong, item.elati],
					function(status, result) {
						self.result = result;
					});
				this.renderTip(item);
			},
			renderTip(item) {
				var info = [];
			   	// info.push("<div><img src='http://webapi.amap.com/images/autonavi.png'</div>");
			   	info.push("<div style='padding:2px 4px'><b>"+item.company+"</b></div>");
			   	var infoWindow = new AMap.InfoWindow({
			       	content: info.join("<br>")  //使用默认信息窗体框样式，显示信息内容
			   	});
			   	infoWindow.open(this.map, [item.elong, item.elati]);
			},
			toamap() {
				this.drving.searchOnAMAP({
	                origin: this.result.origin,
	                destination: this.result.destination
	            });
			},
			tobmap() {
				var item = this.nowItem;
				window.location.href = 'http://api.map.baidu.com/direction?origin=latlng:'+item.slati+','+item.slong+'&destination=latlng:'+item.elati+','+item.elong+'&mode=driving&output=html&src=app';
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.wrap {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #fff;
		z-index: 80;
	}
	.head {
	    width: 100%;
	    height: 56px;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    background: linear-gradient(left, #30aafd, #2eccfc);
	    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
	    background: -o-linear-gradient(left, #30aafd, #2eccfc);
	    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
	    color: #fff;
	}
	.hidden {
		visibility: hidden;
		margin-right: 10px;
	}
	.left {
		margin-left: 10px;
	}
	.container {
		position: absolute;
		left: 0;
		right: 0;
		top: 56px;
		bottom: 0;
		overflow-y: auto;
	}
	.list {
		display: flex;
		width: 100%;
		height: 45px;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	.name {
		flex-grow: 1;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-indent: 10px;
	}
	.butn {
		display: inline-block;
		width: 80px;
		min-width: 80px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		margin: 0 5px;
		border-radius: 4px;
		background-color: #30aafd;
		color: #fff;
		font-size: 14px;
	}
	.alert {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color:#fff;
		z-index: 5;
		transition: all ease .3s;
	}
	.gmapwrap {
		position: absolute;
		left: 0;
		top: 56px;
		right: 0;
		bottom: 0;
		background-color: #efefef;
	}
	.gmap {
		width: 100%;
		height: 100%;
	}
	.search {
		position: absolute;
		left: 50%;
		bottom: 20px;
		width: 120px;
		height: 45px;
		line-height: 45px;
		margin-left: -60px;
		color: #fff;
		text-align: center;
		border-radius: 25px;
		background-color: #30aafd;
		z-index: 10;
	}
	.mask {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 10000;
		background-color: rgba(0, 0, 0, .2);
		transition: all ease .3s;
	}
	.select {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 5;
		background-color: #fff;
		transition: all ease .3s;
	}
	.opt {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.opt:nth-child(1) {
		border-bottom: 1px solid #efefef;
	}
 	.fade-enter-active, .fade-leave-active {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
	}
	.mask-enter-active, .mask-leave-active {
		background-color: rgba(0, 0, 0, .2);
	}
 	.mask-enter-active .select, .mask-leave-active .select {
		transform: translateY(100%);
		-webkit-transform: translateY(100%);
	}
</style>