<template>
    <div>
        <mu-drawer class="step-alert" right :open="open">
            <div class="alert-head">
                <div class="back" @click="close">
                    <img src="static/images/ic-return.png" alt="">
                </div>
                <span class="font">事件详情</span>
                <span class="hidden">隐藏</span>
            </div>
            <div class="wrap">
                <!--swiper-->
                <div class="three-img" v-show="stepData.images.length!=0">
                    <mt-swipe :auto="5000">
                        <mt-swipe-item v-for="(item,index) in stepData.images" :key="index" @click.native="toggle(item)">
                            <div class="swp">
                                <img :src="item" />
                                <!-- <div class="shuomin ellipsis" >{{item}}</div> -->
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <!--swiper-->

                <div class="list">
                    <img src="static/v2images/ic-d-status.png" alt="">
                    <span class="list-grow">事件状态</span>
                    <span class="list-right">{{getEventStatus}}</span>
                </div>
                <div class="list">
                    <img src="static/v2images/ic-d-people.png" alt="">
                    <span class="list-grow">人员</span>
                    <span class="list-right">{{stepData.userName || ''}}</span>
                </div>
                <div class="list">
                    <img src="static/v2images/ic-d-time.png" alt="">
                    <span class="list-grow">时间</span>
                    <span class="list-right">{{stepData.datetime || ''}}</span>
                </div>
                <div class="list">
                    <img src="static/v2images/ic-d-pos.png" alt="">
                    <span class="list-grow">位置</span>
                    <span class="list-right">{{stepData.address || ''}}</span>
                </div>
                <div class="list">
                    <img src="static/v2images/shijianxx.png" alt="">
                    <span class="list-grow">事件类型</span>
                    <span class="list-right">{{stepData.eventTypeName || ''}}</span>
                </div>
                <div class="list">
                    <img src="static/v2images/ic-d-detail.png" alt="">
                    <span class="list-grow">事件详情</span>
                    <span class="list-right">{{stepData.describe || ''}}</span>
                </div>
                <!-- <div class="step-img">
                    <p>图片详情</p>
                    <img  v-for="item in stepData.images":src="item" alt="">
                </div> -->
                
                <div v-if="stepData.status==3">
                    <div class="event-title">
                        <p>处理详情</p>
                    </div>
                    <div class="list">
                        <img src="static/v2images/ic-peo.png" alt="">
                        <span class="list-grow">人员</span>
                        <span class="list-right">{{stepData.handlerName}}</span>
                    </div>
                    <div class="list">
                        <img src="static/v2images/ic-peo.png" alt="">
                        <span class="list-grow">时间</span>
                        <span class="list-right">{{new Date(stepData.handletime).toLocaleString('chinese',{hour12:false})}}</span>
                    </div>
                    
                    <div class="list">
                        <img src="static/v2images/ic-peo.png" alt="">
                        <span class="list-grow">位置</span>
                        <span class="list-right">{{stepData.address}}</span>
                    </div>
                    <div class="list">
                        <img src="static/v2images/ic-peo.png" alt="">
                        <span class="list-grow">事件类型</span>
                        <span class="list-right">{{stepData.eventTypeName}}</span>
                    </div>
                    <div class="list">
                        <img src="static/v2images/ic-peo.png" alt="">
                        <span class="list-grow">事件描述</span>
                        <span class="list-right">{{stepData.means}}</span>
                    </div>
                   
                    
                    <div class="step-img">
                        <p>处理详情图片</p>
                        <img v-for="item in stepData.handleImages" :src="item">
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
            },

        },
        computed:{
            getEventStatus(){
                switch(this.stepData.status) {
                    case '1':
                        return '待接收';
                    break;
                    case '2':
                        return '待处理';
                    break;
                    case '3':
                        return '已处理';
                    break;
                    default:
                        return '已退回';
                }   
            }
        },
        mounted(){
        }
    }
</script>
<style scoped>
    .three-img{
        width:100%;
        overflow: hidden;
    }
    @media screen and (min-width:414px) {
        .three-img{
            height: 260px;
        }
    }
    @media screen and (min-width:321px) and (max-width:413px){
        .three-img{
            height: 220px;
        }
    }
    @media screen and (max-width:320px) {
        .three-img{
            height: 210px;
        }
    }
    .step-alert{
        width: 100%;
        z-index: 88;
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
    .wrap {
        position: absolute;
        top:56px;
        bottom: 5px;
        left: 0;
        right: 0;
        background-color: #fff;
        overflow: auto;
    }
    .list {
        width: 94%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #efefef;
    }
    .list img {
        margin-right: 10px;
        width: 16px;
    }
    .list span {
        font-size: 14px;
        color: #5A5E6F;
    }
    .list-grow {
        flex-grow: 1;
    }
    .list-right {
        max-width: 60%;
    }
    .step-img {
        width: 94%;
        margin: 0 auto;
    }
    .step-img p {
        text-align: center;
        padding: 10px 0;
    }
    .step-img img {
        width: 100%;
        margin-bottom: 10px;
    }
    .event-title {
        text-align: center;
        padding: 10px 0;
    }
    .swp{
        width:100%;
        height: 100%;
        position: relative;
    }
    .swp .shuomin{
        position: absolute;
        bottom: 10px;
        width: 70%;
        height: 22px;
        color:#fff;
        left: 10px;
        line-height: 22px;
        overflow: hidden;
        letter-spacing: 1px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
    }
    .swp img{
        width: 100%;
    }
</style>