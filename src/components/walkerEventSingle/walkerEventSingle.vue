<template>
	<div>
		<head-dom :type="'back'" v-on:back="backToMap">巡查事件</head-dom>
		<div class="nothin"></div>
		<walker-event class="walker topff" :type="true"></walker-event>
	</div>
</template>
<script>
	import headDom from '../../UIcomponents/header/head';
	import walkerEvent from '../walkerEvent/walkerEvent.vue';
	import { mapActions} from 'vuex';
	export default{
		components:{
			headDom,
			walkerEvent
		},
		methods:{
			...mapActions({
				setMapShow:'setMapShow'
			}),
			backToMap(e){
				if(e){
                    e.preventDefault();
                }
				this.setMapShow(true);
				this.$router.push('/home/portal');
			}
		}
	}
</script>

<style >
	.nothin{
		height: 1px;
	}
	.walker{
		margin-top: 32px;
	}
	.topff{
		margin-top: 56px !important;
	}
	.topff .list-conss{
		top:121px !important;
	}
</style>