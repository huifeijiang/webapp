<template>
	<div class="head-dom">
		<span :class="showBack?'':'hidden'" @click="backFun" class="lpd">{{backTitle}}</span>
		<span>{{title}}</span>
		<span :class="showSubm?'':'hidden'" @click="subFun"  class="rpd">{{submitTitle}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: [String, Number],
				default: '标题'
			},
			backTitle: {
				type: String,
				default: '返回'
			},
			submitTitle: {
				type: String,
				default: '提交'
			},
			showBack: {
				type: Boolean,
				default: true
			},
			showSubm: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			backFun() {
				this.$emit('back');
			},
			subFun() {
				this.$emit('submit');
			}
		}
	}
</script>

<style scoped>
	.head-dom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 55px;
		background-color: #4baaf4;
		color: #fff;
	}
	.lpd {
		padding-left: 15px;
	}
	.rpd {
		padding-right: 15px;
	}
	.hidden {
		visibility: hidden;
	}
</style>