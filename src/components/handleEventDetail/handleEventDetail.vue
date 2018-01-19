<template>
	<div class="wrap">
		<div class="alert-head">
            <mu-icon class="alert-left" @click="back" value="keyboard_arrow_left" />
            <span class="alert-title">事件详情</span>
            <span class="alert-right hidden">提交</span>
        </div>
        <div class="nothin"></div>
        <div class="range-wrap aasd" ref="rangewrap">
        	<div class="table-list" v-for="item in tableData">
                <span class="biao-left">{{item.name}}</span>
                <span class="biao-right">{{item.value}}</span>
            </div>
        </div>
        <mu-raised-button v-show="!isDone&&showButton" label="开始办理" class="demo-raised-button" primary @click="deal" />
        <div v-show="isDone">
            <p class="done-p">处理详情</p>
            <div class="done-mess">
                <p>处理: <span>{{doneMess.handler}}</span></p>
                <p>时间: <span>{{new Date(doneMess.handletime).toLocaleString('chinese',{hour12:false})}}</span></p>
                <p>地点: <span>{{doneMess.gridname}}</span></p>
                <p>处理情况: <span>{{doneMess.means}}</span></p>
                <p>描述: <span>{{doneMess.handleDescribe}}</span></p>
            </div>
            <p class="done-p" v-show="showImage">处理图片详情</p>
            <div class="done-img" v-for="item in detailImage">
                <img :src="item">
            </div>
        </div>
	</div>
</template>

<script>
	export default {
        data(){
            return {
                showImage:true
            }
        },
        props:['tableData','done','doneMess','showButton','detailImage'],
		methods:{
			back(){
				this.$emit("toggleOne",false);
			},
			deal(){
				this.$emit("toggleTwo",false);
			}
		},
        computed:{
            isDone(){
                return this.$props.done;
            }
        },
		mounted(){
			let height = window.innerHeight;
			this.$refs.rangewrap.style.height = height - 56 +'px';
		},
        watch:{
            doneMess(val){
                console.log(val,999)
                if(val != null){
                    if(val.images.length == 0){
                        this.showImage = false;
                    }else{
                        this.showImage = true;
                    }
                }
            }
        }
	}
</script>

<style scoped>
    .aasd{
        padding:0 10px
    }
    .wrap{
        z-index: 80;
    }
	.alert-head {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        background: linear-gradient(left, #30aafd, #2eccfc);
        background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
        background: -moz-linear-gradient(left, #30aafd, #2eccfc);
        background: -o-linear-gradient(left, #30aafd, #2eccfc);
        box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
        color: #fff;
    }

    .alert-left {
      position:absolute;
       left: 15px;
    }

    .alert-right {
      position:absolute;
      right: 15px;
    }

    .alert-title {
        font-size: 20px;
    }

    .nothin {
        height: 1px;
    }

    .form-wrap, .range-wrap {
        width: 100%;
        margin-top: 55px;
        overflow-y: auto;
    }
   .table-list{
        display: flex;
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        border-bottom: 1px solid #efefef;
        justify-content: space-between;
    }
    .table-list span{
        font-size: 14px;
        color: #6a6e7b;
    }
    .biao-left{
        width: 49%;
        text-align: left;
    }
    .biao-right{
        width: 49%;
        text-align:right;
    }
    .demo-raised-button{
    	position: fixed;
    	left: 50%;
    	bottom:10px;
    	margin-left: -45px;
    }
    .hidden{
        visibility: hidden;
    }
    .done-p{
        margin: 0 auto;
        padding: 5px;
        text-indent: 20px;
        font-size: 16px;
        font-weight: 400;
        border-top:1px solid #efefef;
        border-bottom: 1px solid #ccc;
        background-color: #efefef;
    }
    .done-mess{
        padding: 0 20px;
    }
    .done-img{
        width: 90%;
        margin: 0 auto;
        border-radius: 5px;
        overflow:hidden;
    }
    .done-img img{
        display: block;
        width: 100%;
    }
</style>
