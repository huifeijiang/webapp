<template>
	<div>
		<div class="btns-wrap">
			<div class="news-btns">
				<a href="javascript:;" class="btn-n borright active" @click="handleTabChange('tab1')" ref="tab1">一张图</a>
				<a href="javascript:;" class="btn-n" @click="handleTabChange('tab2')" ref="tab2">一张表</a>
			</div>
			<!-- <a href="javascript:;" class="btn-n" @click="handleTabChange('tab2')" ref="tab2">一张表</a> -->
		</div>

		<div class="tab-content" v-show="activeTab == 'tab1'">
		</div>
		<div class="tab-content kkkkk" v-show="activeTab == 'tab2'">
			<div class="" ref="tableWrap">
				<slot v-for="(item,index) in tableData">
					<div class="watch-list" @click="showlist(item)">
                    	<img class="icon-jian" :src="'static/v2images/ic-' +  index+'.png'" />
                    	<span class="flex-grow table-title">{{item.bianhao+' '+item.title}}</span>
                    	<img :class="item.show?'tran90 rig':'rig'" src="static/images/ic-go.png" alt="">
                	</div>
					<div v-show="item.show" class="table-list" v-for="param in item.params">
						<span class="biao-left">{{param.bianhao +' ' +param.value}}</span>
						<span class="biao-right">{{param.amount +' ' +param.danwei}}</span>
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	import { tableData } from './tableData.js';
  	import { mapGetters,mapActions,mapState} from 'vuex';
  	import {mapHeightType} from '../../../gisComponets/HomeMap/MapHeightType';
  	import {locateManagerCtrl} from '../../../gisComponets/locateManager/LocateManagerCtrl';
  	import {eventEmitter} from '../river_event.js';
	export default {
		data(){
			return {
				activeTab:'tab1',
				tableData:[],
				stepType:''
			}
		},
		computed:{
			...mapGetters({
       			 getDocumentRiverObj: 'getDocumentRiverObj',
       			 getRivers:'getRivers',
       			 getNowRiver:'getNowRiver'
      		})
		},
		methods:{
      		...mapActions({
		        setMapShow: 'setMapShow',
		        setLayerUIShow:'setLayerUIShow',
		        setPortalUIShow:'setPortalUIShow',
		        setRiverHeight:'setRiverHeight',
		        setDocumentTab:'setDocumentTab',
	      	}),
			handleTabChange (val) {
      	     	this.setDocumentTab(val);
		      	if(val!=this.activeTab){
		      		if(this.activeTab != 'tab1') this.$refs[this.activeTab].className = 'btn-n';
		      		else this.$refs[this.activeTab].className = 'btn-n borright';
		      		this.$refs[val].className = 'btn-n active';
		      		this.activeTab = val;
		      	}
		      	if(val == "tab1") {
	                this.setMapShow(true);
	                this.setRiverHeight(mapHeightType.riverDocument);
	                this.setLayerUIShow(false);
	                this.setPortalUIShow(false);
	                locateManagerCtrl.zoomByExpresstion(mapConfig.mapId,"河流","name = '" +  this.getDocumentRiverObj.name + "'" )  ;
            	}else {
              		this.setMapShow(false);
            	}
		    },
		    getRiverTable(id){
		    	this.$http.get(GET_RIVER_DETAIL+ id +'/details').then((res) => {
					console.log(tableData)
					let arr = [];
					for(let i=0;i<res.body.data.length;i++){
						arr.push(Object.assign({},res.body.data[i],{'show':false}))
					}
					this.tableData = arr
				}).catch(function(error){});
		    },
			showlist(item){
				item.show = !item.show;
				console.log(item)
			}
		},
		mounted(){
			let height = window.innerHeight;
			this.$refs.tableWrap.style.height = height - 170 + 'px';
			//一张表
			var riverId = null;
			let rivers = this.getRivers;
			let nowRiver = this.getNowRiver;
			for(let i=0;i<rivers.length;i++){
				if(nowRiver.name == rivers[i].name){
					riverId = rivers[i].id;
					break;
				}
			}
			if(riverId != null){
				this.getRiverTable(riverId);
			}
			//监听drawer show
			eventEmitter.on('river_detail',(item) => {
				this.getRiverTable(item.id);
			});
		}
	}
</script>

<style scoped>
.tran90{
	transform: rotate(90deg);
	fill: #3190e8;
	margin-right: 4px;
}
	.watch-list .no-flex-grow {
    flex-grow: 0;
    margin-right: 10px;
    
	}
	.watch-list img{
		width:20px
	}
	.watch-list .rig {
    width: 9px;
}
	.watch-list {
    background:#fff;
	padding:0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
}

.watch-list span {
    font-size: 14px;
    color: #6a6e7b;
    margin-left: 5px;
    flex-grow: 1;
}
	.btns-wrap{
		margin-top: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #efefef;
	}
	.news-btns{
		display: flex;
		width: 94%;
		margin: 0 auto;
		border:1px solid #54A4D7;
		border-radius: 2px;
	}
	.kkkkk{
		position: absolute;
		left: 3%;
		right: 3%;
		top: 163px;
		bottom: 5px;
		overflow: auto;
	}
	.kkkkk .table-list-wrap{
		top: 0
	}
	.btn-n{
		width: 50%;
		font-size: 14px;
		text-align: center;
		padding: 5px 0;
		color: #54A4D7;
	}
	.borright{
		border-right:1px solid #54A4D7;
	}
	.active{
		background-color: #54A4D7;
		color: #fff;
	}
	.table-list-wrap{
		margin: 0 auto;
		overflow-y: auto;
	}
	.table-title{
		font-size: 16px;
	    padding: 10px 0;
	    font-weight: bold;
	}
	.table-list{
		display: flex;
		width: auto;
		padding: 10px 0;
		border-bottom: 1px solid #efefef;
		justify-content: space-between;
	}
	.table-list span{
		font-size: 14px;
		color: #6a6e7b;
	}
	.biao-left{
		width: 49%;
		text-align: left;
	}
	.biao-right{
		width: 60%;
		text-align:right;
	}
</style>
