<template>
	<transition name="fade">
		<div v-show="visible" class="x-alert">
			<div class="x-alert-wrap" :style="getWidth">
				<div class="x-message">
					<div>
						<p v-if="showHead" class="x-p1">{{title}}</p>
						<slot v-else name="header"></slot>
					</div>
					<div class="x-alert-content">
						<slot></slot>
					</div>
					<div v-if="showFoot">
						<div v-if="isCancelable" class="x-buttons">
							<a href="javascript:;" @click="cancelHandle(false)" class="x-bor">{{cancel}}</a>
							<a href="javascript:;" @click="cancelHandle(true)">{{confirm}}</a>
						</div>
						<div v-else>
							<a href="javascript:;" @click="hide">{{confirm}}</a>
						</div>
					</div>
					<slot v-else name="footer"></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props:{
			value:{
				type: Boolean,
                default: false
			},
			cancelable:{
				type:Boolean,
				default:false
			},
			width:{
				type:[String,Number],
				default:'60%'
			},
			title:{
				type:String,
				default:'提示',
				required:false
			},
			confirm:{
				type:String,
				default:'确定',
				required:false
			},
			cancel:{
				type:String,
				default:'取消',
				required:false
			}
		},
		data(){
			return {
				visible:this.value,
				showHead:true,
				showFoot:true
			}
		},
		methods:{
			hide(){
				this.$emit('input',false);
				this.$emit('confirm');
			},
			cancelHandle(bool){
				this.$emit('input',false);
				if(bool) this.$emit('confirm');
				else this.$emit('cancel');
			}
		},
		computed:{
			getWidth(){
				return {width: this.$props.width};
			},
			isCancelable(){
				return this.$props.cancelable;
			}
		},
		watch:{
			value(val){
				this.visible = val;
			}
		},
		mounted(){
			if(this.$slots.header !== undefined){
				this.showHead = false;
			}
			if(this.$slots.footer !== undefined){
				this.showFoot = false;
			}
		}
	}
</script>

<style lang="less" scoped>
.x-alert{
	position: fixed;
	left: 0;
	top: 0;
	right:0;
	bottom:0;
	z-index: 1000;
	background: rgba(0,0,0,.6);
	transition: all .3s ease;
	.x-alert-wrap{
		position: fixed;
	    z-index: 5000;
	    top: 50%;
	    left: 50%;
	    width: 68%;
	    transform:translate(-50%,-50%);
	}
	
	.x-message{
	    width: 100%;
	    background-color: #fff;
	    border-radius: 3px;
	    overflow: hidden;
	    transition: all .3s ease;
	   
	    a{
	    	display: block;
	    	text-align: center;
	    	text-decoration: none;
	    	padding: 10px 0;
	    	color: #0e90d2;
	    	font-size: 16px;
	    	border-top:1px solid #ddd;
	    }
	    .x-buttons{
	    	display: flex;
	    	display:-webkit-flex;
	    	align-items:center;
	    	a{
	    		width: 50%;
	    		display: block;
	    		color: #4BAAF4;
	    		font-size: 16px;
	    	}
	    	.x-bor{
	    		border-right: 1px solid #ddd;
	    	}
	    }
	}
}
 .x-p1{
    padding: 10px 0;
    font-size: 18px;
    font-weight: 700;
    color: #5A5E6F;
    text-align: center;
}
.x-alert-content{
	text-align: center;
	padding: 5px 5px;
}

.fade-enter, .fade-leave-active {
  	background: rgba(0,0,0,0)
}
.fade-enter .x-message, .fade-leave-active .x-message{
  	-webkit-transform: scale(.8);
  	transform: scale(.8);
  	opacity: 0;
}

</style>
