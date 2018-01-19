<template>
	<transition name="fade">
		<div class="alert" v-show="model.show">
			<div class="alert-wrap">
				<div class="alert-title">{{model.title}}</div>
				<slot></slot>
			</div>
			<a href="javascript:;" class="a-close" @click="close">
				<img src="static/v2images/ic-close-a.png" alt="">
			</a>
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
				this.model =val;
			}
		},
		methods:{
			close(){
				this.model.show = false;
				this.$emit('input', Object.assign({}, this.model));
			}
		}
	}
</script>
<style scoped>
	.alert {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .5);
		-webkit-transition: all .3s ease;
				transition: all .3s ease;
		z-index: 99;
	}
	.alert-wrap {
		position: absolute;
		left: 50%;
		top: 20%;
		width: 88%;
		margin-left: -44%;
		background-color: #fff;
		border-radius: 4px;
		border-radius: 1px solid #ccc;
		-webkit-transition: all .3s ease;
				transition: all .3s ease;
	}
	.alert-title {
		font-size: 20px;
		color: #5A5E6F;
		padding: 17px 0;
		text-align: center;
		border-bottom: 1px solid #EDF0F9;
	}

	.a-close {
		position: absolute;
		left: 50%;
		height: 100px;
		bottom: 10px;
		line-height: 150px;
		text-align: center;
		width: 100px;
		margin-left: -50px;
	}
	.a-close img {
		width: 42px;
	}
	.fade-enter, .fade-leave-active {
  		background: rgba(0,0,0,0)
	}
	.fade-enter .alert-wrap, .fade-leave-active .alert-wrap {
	  	-webkit-transform: scale(.8);
	  	transform: scale(.8);
	  	opacity: 0;
	}
</style>