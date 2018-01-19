<template>
	<div class="alert-head">
        <span class="alert-left" :class="(getLeft=='隐藏')?'hidden':''" @click="leftEvent">{{getLeft}}</span>
        <span class="alert-title">{{centerTitle}}</span>
        <span class="alert-right" :class="(getRight=='隐藏')?'hidden':''" @click="rightEvent">{{getRight}}</span>
    </div>
</template>

<script>
	export default{
		props:{
			leftTitle:{
				type:String,
				default:''
			},
			centerTitle:{
				type:String,
				default:''
			},
			rightTitle:{
				type:String,
				default:''
			}
		},
		methods:{
			leftEvent(){
				this.$emit('leftEvent');
			},
			rightEvent(){
				this.$emit('rightEvent');
			}
		},
		computed:{
			getLeft(){
				if(this.$props.leftTitle != '') return this.$props.leftTitle;
				else return '隐藏';
			},
			getRight(){
				if(this.$props.rightTitle != '') return this.$props.rightTitle;
				else return '隐藏';
			}
		}
	}
</script>

<style scoped>
	.alert-head {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 50;
        background: linear-gradient(left, #30aafd, #2eccfc);
        background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
        background: -moz-linear-gradient(left, #30aafd, #2eccfc);
        background: -o-linear-gradient(left, #30aafd, #2eccfc);
        box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
        color: #fff;
    }

    .alert-left {
        margin-left: 20px;
        padding: 10px 0 10px 0;
    }

    .alert-right {
        margin-right: 20px;
    }

    .alert-title {
        font-size: 20px;
    }
    .hidden{
		visibility: hidden;
    }
</style>