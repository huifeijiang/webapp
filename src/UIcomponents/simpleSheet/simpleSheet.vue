<template>
	<transition name="fade">
		<div v-show="model.show" class="bottom-sheet">
			<div class="bottom-wrap">
				<div class="bottom-title">
					<span>{{model.name}}</span>
				</div>
				<img  src="static/v2images/ic-close-x.png" class="bottom-close" @click="hide">
				<div 	class="options" 
						v-for="(item,index) in model.list" 
						@click="select(item,index)"  
						:class="item.selected ? 'active':''"
				>{{item.name}}</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props:{
			value:{
				type:Object,
				default:function() {
			        return {}
			    }
			}
		},
		data(){
			return {
				model:this.value
			}
		},
		watch:{
			value(val){
				this.model = val;
			}
		},
		methods:{
			hide(){
				this.model.show = false;
				this.$emit('input',Object.assign({}, this.model));
			},
			select(item,index){
				for(let i=0;i<this.model.list.length;i++){
					this.model.list[i].selected = false;
				}
				this.model.list[index].selected = true;
				this.model.selected = item.name;
				this.model.show = false;
				this.$emit('input',Object.assign({}, this.model));
				this.$emit('select',Object.assign({}, item));
			}
		}
	}
</script>

<style scoped>
	.bottom-sheet {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,.5);
		z-index: 100;
		overflow: hidden;
		-webkit-transition: all .3s ease;
				transition: all .3s ease;
	}	
	.bottom-wrap {
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 96%;
		margin-left: -48%;
		background-color: #fff;
		border-radius: 12px 12px 0px 0px;
		-webkit-transition: all .3s ease;
				transition: all .3s ease;
	}
	.bottom-title {
		display: flex;
		justify-content: center;
		padding: 16px 0;
		border-bottom: 1px solid #ECEFF9;
	}
	.bottom-title span {
		font-size: 20px;
		color: #626676;
	}
	.bottom-close {
		position: absolute;
		right: 12px;
		top: 12px;
		padding: 8px;
	}
	.options {
		width: 94%;
		padding: 20px 0;
		margin: 0 auto;
		font-size: 16px;
		color: #5A5E6f;
		text-indent: 20px;
		border-bottom: 1px solid #ECEFF9;
	}
	.active {
		color: #4BAAF4;
	}
	.fade-enter, .fade-leave-active {
  		background: rgba(0,0,0,0);
	}
	.fade-enter .bottom-wrap, .fade-leave-active .bottom-wrap{
	  	-webkit-transform: translateY(100%);
	  	transform: translateY(100%);
	}
</style>