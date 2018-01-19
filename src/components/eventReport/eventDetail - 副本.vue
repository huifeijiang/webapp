<template>
    <div>
        <mu-drawer class="step-alert" right :open="open">
            <div class="alert-head">
                <div class="back" @click="close">
                    <img src="static/images/ic-return.png" alt="">
                </div>
                <span>事件详情</span>
                <span class="hidden">隐藏</span>
            </div>
            <div ref="eventBox" class="event-detail-container">
                <div class="nothin"></div>
                <div class="step-content margin55" ref="stepcontent">
                    <div class="event-title">
                        处理进度
                    </div>
                    <div class="step-wrap">
                        <slot v-if="stepData.status<=3">
                            <span :class="stepData.status>=1 ?'step-text green':'step-text'">待接收</span>
                            <span class="step-line"></span>
                            <span :class="stepData.status>=2 ?'step-text green':'step-text'">待处理</span>
                            <span class="step-line"></span>
                            <span :class="stepData.status>=3 ?'step-text green':'step-text'">已处理</span>
                        </slot>
                        <slot v-else>
                            <span class="step-text green">已退回</span>
                        </slot>
                    </div>
                    <div class="event-title">
                        事件详情
                    </div>
                    <div class="step-p">
                        <p>用户 : {{stepData.userName || ''}}</p>
                        <p>时间 : {{stepData.datetime || ''}}</p>
                        <p>位置 ： {{stepData.address || ''}}</p>
                        <p>事件类型 : {{stepData.eventTypeName || ''}}</p>
                        <p>事件详情 : {{stepData.describe || ''}}</p>
                    </div>
                    <div class="event-title">
                        事件详情图片
                    </div>
                    <div class="step-img">
                        <img  v-for="item in stepData.images":src="item" alt="">
                    </div>
                    <div class="step-p" v-show="getDeatilImage">
                        <p>暂无图片</p>
                    </div>
                    <div v-show="stepData.status==3">
                        <div class="event-title">
                            处理详情
                        </div>
                        <div class="step-p">
                            <p>用户：{{stepData.handlerName}}</p>
                            <p>时间：{{new Date(stepData.handletime).toLocaleString('chinese',{hour12:false})}}</p>
                            <p>地点：{{stepData.address}}</p>
                            <p>类型：{{stepData.eventTypeName}}</p>
                            <p>描述：{{stepData.means}}</p>
                        </div>
                        <div class="event-title">
                            处理详情图片
                        </div>
                        <div class="step-img">
                            <img v-for="item in stepData.handleImages" :src="item">
                        </div>
                        <div class="step-p" v-show="getHandleImage">
                            <p>暂无图片</p>
                        </div>
                        <div class="paddbottom"></div>
                    </div>
                </div>
            </div>
        </mu-drawer>
    </div>
</template>
<script>
    export default{
        data(){
            return {
            }
        },
        props:['stepData','stepType','open'],
        methods:{
            close(){
                this.$emit('closeDetail')
            }
        },
        computed:{
            getDeatilImage(){
                if(this.stepData.images == null || this.stepData.images == undefined||this.stepData.images.length==0){
                    return true;
                }
                return false;
            },
            getHandleImage(){
                if(this.stepData.handleImages == null || this.stepData.handleImages == undefined||this.stepData.handleImages.length==0){
                    return true;
                }
                return false;
            }
        },
        mounted(){
            //动态计算高度
            let height = window.innerHeight;
            // this.$refs.eventBox.style.height =height - 56 + 'px';
        }
    }
</script>
<style scoped>
    .nothin{
        height: 1px;
    }
    .margin55{
        margin-top: 55px;
    }
    .step-wrap{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        padding: 5px 0;
        border-bottom: 1px solid #efefef;
    }
    .step-text{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        font-size: 12px;
        border:1px solid #efefef;
        text-align: center;
        line-height:50px;
        background-color: #ccc;
    }
    .green{
        background-color: #50dc8d;
        color: #fff;
    }
    .step-img{
        width: 92%;
        margin: 5px auto;
        border-radius: 5px;
        border: 5px solid #efefef;
    }
    .step-img img{
        width: 100%;
    }
    .step-p{
        padding: 5px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
    }
    .step-p p{
        margin-top: 3px;
        margin-bottom: 3px;
        font-size: 14px;
    }
    .step-line{
        width: 20%;
        border:1px solid #efefef;
    }
    .btns-wrap{
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
    }
    .news-btns{
        display: flex;
        width: 94%;
        margin: 0 auto;
        border:1px solid #54A4D7;
        border-radius: 2px;
    }
    .btn-n{
        width: 33.3333%;
        font-size: 14px;
        text-align: center;
        padding: 5px 0;
        color: #54A4D7;
        border-right:1px solid #54A4D7;
    }
    .noborder{
        border-right:none;
    }
    .active{
        background-color: #54A4D7;
        color: #fff;
    }
    .guan-wrap,.step-content{
        width: 100%;
        overflow-y: auto;
    }
    .flex-grow{
        flex-grow: 1;
    }
    .count-span{
        margin-right: 10px;
    }
    .watch-data{

    }
    .watch-list{
        display: flex;
        padding: 10px 0;
        align-items: center;
        border-bottom: 1px solid #efefef;
        justify-content: space-between;
    }
    .watch-list span{
        font-size: 14px;
        color: #6a6e7b;
        margin-left: 10px;
    }
    .watch-list img{
        width: 9px;
        margin-right: 10px;
    }
    .recent-event{
        border-bottom: 1px solid #efefef;
    }
    .event-title{
        padding: 4px 0;
        color: #54A4D7;
        padding-left: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
    }
    .recent-event p{
        width: 100%;
        text-indent: 10px;
        color: #6a6e7b;
        margin-top: 4px;
        margin-bottom: 4px;
    }
    .event-btns{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 5px 0;
    }
    .watch-alert{
        width: 100%;
        z-index: 58;
    }
    .step-alert{
        width: 100%;
        z-index: 59;
    }
    .alert-head{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 50;
        background: linear-gradient(left,#30aafd, #2eccfc);
        background: -webkit-linear-gradient(left,#30aafd, #2eccfc);
        background: -moz-linear-gradient(left,#30aafd, #2eccfc);
        background: -o-linear-gradient(left,#30aafd, #2eccfc);
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }
    .back{
        margin-left: 15px;
        padding: 12px;
    }
    .back img{
        display: block;
        width: 10px;
    }
    .alert-head span{
        font-size: 20px;
        font-weight: bold;
        color: #fff;
    }
    .hidden{
        visibility: hidden;
        margin-right: 15px;
    }
    .watch-content{
        width:100%;
        margin-top: 65px;
        overflow-y: auto;
    }
    .watch-pos{
        width: 100%;
        padding-top:5px;
        padding-bottom: 5px;
        padding-left: 10px;
        box-sizing: border-box;
        color: #6a6e7b;
        font-size: 14px;
        border-bottom: 1px solid #efefef;
        background-color: #fff;
    }
    .watch-pos:nth-child(2n-1){
        background-color: #efefef;
        border-bottom: 1px solid #fff;
    }
    .mu-raised-button-primary{
        background-color: #54A4D7;
    }
    .walker-wrap{
        padding: 15px;
    }
    .mu-td a{
        color: rgba(0,0,0,.87);
    }
    .mu-th,.mu-th{
        padding-right: 0;
        padding-left: 0;
        text-align: center;
        height: 40px;
    }
    .mu-tr{
        height: 40px;
    }
    .echarts{
        margin: 0 auto;
        margin-top: 10px;
    }
    .event-detail-container{
        overflow-y: auto;
        overflow-x: hidden;
    }
    .paddbottom{
        padding-bottom: 60px;
    }
</style>