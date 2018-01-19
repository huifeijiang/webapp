<template>
	<div class="newss">
		<head-dom type="back" @back="backToMap">新闻</head-dom>
		
		<div class="three-img">
			<mt-swipe :auto="5000">
  				
				<mt-swipe-item v-for="(item,index) in swiperDatas" :key="index" @click.native="toggle(item)">
					<div class="swp">
					  	<img :src="item.titlePic" />
					  	<div class="shuomin ellipsis" >{{item.title}}</div>
					</div>
				</mt-swipe-item>
			</mt-swipe>
		</div>	
		
	  	<div class="news-wrap" ref="newsWrap">
	  		<div v-if="activeTab === 'tab1'">
			    <div class="news-list border-1px f_clear" v-for="item in newsData" @click="toggle(item)">
			    	
			    	<div class="img-wrap">
			    		<img :src="item.titlePic" alt="">
			    	</div>
					<div class="rig-con">
						<div class="titlef">{{item.title}}</div>
						<div class="bottom-con f_clear">
							<div class="name ellipsis f_le">宝安环水局</div>
							<div class="timee f_ri">{{new Date(item.created).toLocaleString('chinese',{hour12:false})}}</div>	
						</div>
					</div>
			    </div>
			</div>
			<div v-else>
			   	
			</div>
			<!--下拉刷新-->
			<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
			<!--end-->
	  	</div>

	  	<mu-drawer class="news-alert" right :open="open" @close="toggle()">
		    <div class="alert-head">
		    	<div class="alert-leftr" @click="open=false">
		    		<img src="static/images/ic-return.png" alt="">
		    	</div>
				<span class="alert-title" >新闻</span>
				<span class="hidden">隐藏</span>
		    </div>
		    <div class="news-content2" id="newsContent" ref="newsContent">
        </div>


	  	</mu-drawer>

	</div>
</template>

<script>
	import headDom from '../../UIcomponents/header/head';
  	import {eventBus} from '../../components/eventBus/eventBus.js';
  	import {mapActions} from 'vuex';
	export default {
		components:{
			headDom
		},
		data(){
			return {
				activeTab: 'tab1',
				newsData:[],
				messageData:[],
				open: false,
				nowItem:{
					title:'',
					source:'',
					time:'',
					image:'static/images/1.jpg',
					context:'s'
				},
				scroller:null,
				loading:false,
				page:0,
				needLoad:true,
				swiperDatas:[]
			}
		},
		methods:{
			...mapActions({
				setMapShow: 'setMapShow'
			}),
			toggle(item){
		      	this.open = !this.open;
		      	this.nowItem = item;
		      	this.$refs.newsContent.scrollTop = 0;
				//this.$refs.newsContent.appendChild(item.content);
            	if(item.content ==  undefined || item.content == ''){
              		this.$http.get(GET_NEWDETIL + "/"+  item.id ).then(function (reponse) {
		                if(reponse.body.code == 200){
		                  	let data  = reponse.body.data;
		                  	this.$refs.newsContent.innerHTML = data.content;
		                  	item.content = data.content;
		                }
	             	})
            	}else{
	              	this.$refs.newsContent.innerHTML = item.content;
	            }
		    },
			handleTabChange(val) {
		      	this.$refs.newsWrap.scrollTop = 0;
		      	if(val!=this.activeTab){
		      		if(this.activeTab != 'tab1') this.$refs[this.activeTab].className = 'btn-n';
		      		else this.$refs[this.activeTab].className = 'btn-n borright';
		      		this.$refs[val].className = 'btn-n active';
		      		this.activeTab = val;
		      	}
		      	if(this.newsData.length == 0 && val == 'tab1'){
            		this.queryList('news');
            	}
	            if(this.messageData.length == 0 && val == 'tab2'){
	              	this.queryList('report');
	            }
		    },
		   	backHandle:function (e) {
	         	e.preventDefault();
	         	this.open = false;
	      	},
	      	queryList(value) {
		        let that = this;
		        this.$http.get(GET_NEWS + '?size=10&page='+this.page).then(function (reponse) {
			        if(reponse.body.code == 200){
			        	that.page += 1;
			            let content  = reponse.body.data.content;
			            console.log(content,666)
			           	that.swiperDatas = content.slice(0,3);
			            if(value == 'news'){
			              that.newsData = content;
			            }else{
			              that.messageData = content;
			            }
			        }
		        }).catch(err => {});
	      	},
	      	loadMore(){
	      		if(!this.needLoad) {
	      			return ;
	      		}
	      		this.loading = true;
	      		this.$http.get(GET_NEWS + "?size=10&page="+this.page).then( (reponse) => {
	      			let content  = reponse.body.data.content;
	      			
	      			if(content.length == 0){
	      				this.needLoad = false;
	      				this.loading = false;
	      			}
	      			for(let i=0;i<content.length;i++){
	      				this.newsData.push(content[i])
	      			}
	      			this.loading = false;
	      			this.page += 1;
	      		}).catch(err => {});
	      	},
	      	backToMap() {
	      		this.setMapShow(true);
	      		this.$router.push('/home');
	      	}
		},
		mounted(){
			this.scroller = this.$refs.newsWrap;
			this.queryList('news');
			let height = window.innerHeight;
      		document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
		},
    	destroyed(){
     		document.removeEventListener(eventBus.BACK_BUTTON,this.backToMap,false);
    	}
	}
</script>

<style  scoped>
	.newss {
		position: fixed;
		left: 0;
		top:0;
		width: 100%;
		height: 100%;
		z-index: 80;
		background-color: #fff;
	}
	/* @media screen and (min-width:414px) and (max-width:1200px){ */
	@media screen and (min-width:414px) {
		.three-img{
			height: 200px;
		}
		.news-wrap{
			top:260px !important
		}
	}
	@media screen and (min-width:321px) and (max-width:413px){
		.three-img{
			height: 160px;
		}
		.news-wrap{
			top:227px !important
		}
	}
	@media screen and (max-width:320px) {
		.three-img{
			height: 150px;
		}
		.news-wrap{
			top:210px !important
		}
	}
	.btns-wrap{
		margin-top: 65px;
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
	.timee{
		width: 38%;
		overflow: hidden;
		height: 20px;
		text-align: right;
	}
	.three-img{
		width:100%;
		
		overflow: hidden;
		margin-top: 56px
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
	.nothin{
		height: 1px;
	}
	.news-tab{
		margin-top: 55px;
	}
	.news-wrap{
		width: 100%;
		overflow-y: auto;
		position: absolute;
		top:260px;
		bottom: 10px;

	}
	
	.news-list{
		width: 100%;
		padding: 10px 3%;
		/* display: flex; */
		position: relative;
	}
	.rig-con{
		width:65%;
		float: right;
		
	}
	.rig-con .name {
			width:62%
		}
	.bottom-con{
		position:absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color:#ACB0BF
	}
	.titlef{
		line-height: 22px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
		color:#626676;
		font-size: 16px;
	}
	.swp{
		width:100%;
		height: 100%;
		position: relative;
	}
	.swp .shuomin{
		position: absolute;
		bottom: 10px;
		width: 70%;
		height: 22px;
		color:#fff;
		left: 10px;
		line-height: 22px;
		overflow: hidden;
		letter-spacing: 1px;
		font-family: PingFangSC-Medium;
		font-size: 16px;
	}
	.swp img{
		width: 100%;
	}
	.rig-con{
		height:75px;
		position: relative;
		
	}
	.news-list span{
		display:-webkit-box;
		max-width: 60%;
		flex-grow: 1;
		margin-left: 10px;
		overflow:hidden;
		text-overflow:ellipsis;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:3;
	}
	.news-list .img-wrap{
		width: 32%;
    	height:75px;
		border-radius: 2px;
		overflow: hidden;
		box-sizing: border-box;
		float: left;
	}
	.img-wrap img{
		display: block;
		width: 100%;
	}
	.news-alert{
		width: 100%;
		z-index: 72;
	}
	.alert-head{
		position: fixed;
		left: 0;
		top:0;
		width: 100%;
		height: 56px;
		display: flex;
		display: -webkit-flex;
		align-items:center;
		background-color: #2196f3;
	}
	.alert-back{
		padding: 15px 0;
		width: 42px;
		color: #fff;
		text-align: right;
		font-size: 14px;
		display: inline-block;
	}
	.news-content2{
		left: 3%;
		right:3%;
		margin: 0 auto;
		position: absolute;
		top:56px;
		bottom: 0;
		background: #fff;
		overflow: auto;
	}
	.alert-p{
		width: 100%;
		max-height: 97px;
		display:-webkit-box;
		padding-top: 10px;
		margin-bottom: 10px;
		font-size: 20px;
		font-weight: bold;
		overflow:hidden;
		text-overflow:ellipsis;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:3;
	}
	.alert-img-title{
		font-size: 12px;
		color: #ccc;
	}
	.newss .alert-title{
		margin-left: -20px
	}
	.alert-img{
		padding: 8px;
		box-sizing: border-box;
		background-color: #ccc;
		border-radius: 5px;
		margin-bottom: 30px;
	}
	.alert-img img{
		display: block;
		width: 100%;
		border: none;
	}
	.news-detail{
		text-indent: 28px;
		line-height: 24px;
	}
	.alert-leftr{
		padding: 12px;
    	margin-left: 20px;
	}
	.alert-leftr img {
		display: block;
    	width: 10px;
	}
</style>
