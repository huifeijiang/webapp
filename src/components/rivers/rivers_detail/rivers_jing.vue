<template>
	<div>
		<div class="text-cont" ref="textCont">
			<iframe  class="iframe" :src="htmlUrl" frameborder="0"></iframe>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import {eventEmitter} from '../river_event.js';
	export default {
		data(){
			return {
				htmlUrl:''
			}
		},
		computed:{
			...mapGetters({
				getNowRiver:'getNowRiver'
			})
		},
		mounted(){
			let height = window.innerHeight;
			//获取当前河流
			let river = this.getNowRiver;
			this.htmlUrl = 'static/river_jing_html/'+river.id+'.html'; 
			eventEmitter.on('river_detail',(item) => {
				this.htmlUrl = 'static/river_jing_html/'+item.id+'.html'; 
			});
		}
	}
</script>
<style scoped>
	.jing-wrap{
		padding: 4px 0;
	    color: #54A4D7;
	    padding-left: 10px;
	    box-sizing: border-box;
	    border-bottom: 1px solid #efefef;
	}
	.text-cont{
		width: 94%;
		margin: 0 auto;
		position: absolute;
		top: 110px;
		left: 0;
		right: 0;
		overflow: auto;
		bottom: 5px;
	}
	.text-cont p{
		text-indent: 28px;
		color: #6a6e7b;
		line-height: 24px;
	}
	.text-img{
		padding: 8px;
		margin: 20px auto;
	    box-sizing: border-box;
	    border:4px solid #ccc;
	    border-radius: 5px;
	}
	.text-img img{
		width: 100%;
		border: none;
	}
	.iframe{
		width: 100%;
		height: 100%;
	}
</style>