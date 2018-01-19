<template>
	<mu-appbar class="public-title-txt" id="hdbk">
        <mu-icon-button
                v-if="type == 'back'"
                icon="keyboard_arrow_left"
                slot="left" @click="backFunc"
                :class="{'head-hidden' : false}"
        />

        <mu-icon-button
                v-if="type == 'back'"
                icon="find_replace"
                slot="right" @click="backFunc"
                :class="{'head-hidden' : true}"
        />
        <mu-flat-button
                v-if="type == 'submit'"
                label="取消"
                slot="left"
                :class="{'head-hidden' : false} "
                @click="backFunc"
        />
		<slot></slot>
        <mu-flat-button
                v-if="type == 'submit'"
                label="提交"
                slot="right"
                :class="{'head-hidden' : false}"
                @click="confirm"
        />
	</mu-appbar>
</template>
<style>
	.public-title-txt{
		position: fixed;
		left: 0;
		top:0;
		z-index: 50;
		text-align: center;
	}
	.mu-appbar{
		background-color: #4BAAF4;
        box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
	}
    #hdbk {
        background-color: #4BAAF4;
        box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
    }
    .mu-icon-button{
        padding-left: 0;
    }
    .head-hidden{
        visibility: hidden;
    }
</style>
<script>
    export default{
        data(){
            return {

            }
        },
        props:['type'],
        methods:{
            backFunc(){
                this.$emit("back");
            },
            confirm(){
                this.$emit("confirm");
            }
        }
    }
</script>

