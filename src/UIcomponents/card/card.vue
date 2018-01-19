<template>
    <div>
		<div class="topcard-con">
			<div class="top-title" 

            :type="nativeType"
            :class="['top-bc-'+type]">
				<slot name="title"></slot>
			</div>
            <slot name="contant" class="card-contant"></slot>
		</div>
    </div>
</template>

<script>
	export default {
		props:{
			nativeType:String,
            type:{
                type:String,
                default:'default',
                validator(value){
                    return [
                        'default',
                        'danger',
                        'primary'
                    ].indexOf(value) > -1;
                }
            }
		},
		data(){
			return {
			}
		},
		watch:{
			
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.topcard-con{
        position:relative;
        background:#fff;
        border-radius:4px;
        height:auto;
        box-shadow:0px 1px 6px 0px #D8e4ee;
        width:90%;
        margin:0 auto;
        bottom:90px;
        padding:20px 12px 10px 12px
    }
    .top-title{
        position: absolute;
        width:64px;
        height:24px;
        border-radius:2px;
        text-align:center;
        line-height:24px;
        top:-12px;
        left:12px;
        color:#fff;
        font-size:12px
    }
    .topcard-con .top-bc-default {
        background:#8c8fd6
    }
    .topcard-con .top-bc-danger {
        background:#72ccbd
    }
    .topcard-con .top-bc-primary {
        background:#a4cc62
    }
</style>