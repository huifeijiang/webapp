<template>
    <div class="cw-tabs-wrap">
        <div class="cw-tabs">
            <div class="scrolls">
                <mu-flat-button label="小散乱污" class="demo-flat-button" :class = "{active:threeStarus}" @click="focused('小散乱污')" primary/>
                <mu-flat-button label="油烟事件" class="demo-flat-button" :class = "{active:four}" @click="focused('油烟事件')" primary/>
                <mu-flat-button label="餐饮事件" class="demo-flat-button" :class = "{active:five}" @click="focused('餐饮事件')" primary/>
                <mu-flat-button label="汽修事件" class="demo-flat-button" :class = "{active:six}" @click="focused('汽修事件')" primary/>
            </div>
        </div>
    </div>

</template>
<script>
    import {eventBus} from '../../components/eventBus/eventBus';
    export default{
        data(){
            return {
                width:"57%",
                threeStarus:true,
                four:false,
                five:false,
                six:false,
                sev:false
            }
        },
        props:['leftText','rightText' ],
        methods:{
            focused (val) {
                console.log(val)
                this.threeStarus = false;
                this.four = false;
                this.five = false;
                this.six = false
                this.sev = false;
                if(val == '小散乱污'){
                    this.threeStarus = true;
                    this.$emit("changeTabs",'小散乱污');
                }
                if(val == "油烟事件"){
                    this.four = true;
                    this.$emit("changeTabs",'油烟事件');
                }
                if(val == "餐饮事件"){
                    this.five = true;
                    this.$emit("changeTabs",'餐饮事件');
                }
                if(val == "汽修事件"){
                    this.six = true;
                    this.$emit("changeTabs",'汽修事件');
                }
                if(val == "企业事件"){
                    this.sev = true;
                    this.$emit("changeTabs",'企业事件');
                }
            },
        },
        mounted(){
            eventBus.bus.on('tabActive',()=>{
                this.threeStarus = true;
                this.four = false;
                this.five = false;
                this.six = false
                this.sev = false;
            });
        }
    }
</script>
<style lang="less">
    .cw-tabs-wrap{
        margin-top: 56px;
        height: 45px;
        position: relative;
        box-shadow: 0px 0px 2px 0px #D8E4EE ;
    }
    .scrolls{
       overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        display: -webkit-box;
    }
    .cw-tabs{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: inline-block;
        height: 45px;
        overflow-x: auto;
    }
    .vertical-line{
        width: 0;
        height: 100%;
        display: inline-block;
        border-right: 1px solid #2196f3;
    }
    .cw-tabs .demo-flat-button{
        display: list-item;
        vertical-align: top;
        overflow: hidden;
        border-radius: 0;
        font-size: 14px;
        color: #767985;
    }
    .demo-flat-button.active{
        color: #4BAAF4;
        background-color: #fff;
        border-bottom: 2px solid #4BAAF4;
    }
</style>