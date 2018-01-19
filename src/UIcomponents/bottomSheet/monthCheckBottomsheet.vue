<template>
    <transition-group name="fade">
        <div v-show="model.show" class="bottom-sheet" key='1'>
            <div class="bottom-wrap">
                <div class="bottom-title">
                    <span>{{model.name}}</span>
                </div>
                <img src="static/v2images/ic-close-x.png" class="bottom-close" @click="hide">
                <div class="options-wrap">
                    <div
                        class="options"
                        v-for="item in model.radios"
                        @click="select(item)"
                        :class="item.value == model.default ? 'active':''">
                        {{item.label}}
                    </div>
                </div>
            </div>
        </div>
        <div v-show="monthmodel.isshow" class="bottom-sheet" key='2'>
            <div class="bottom-wrap">
                <div class="bottom-title">
                    <span>{{monthmodel.name}}</span>
                </div>
                <img src="static/v2images/ic-close-x.png" class="bottom-close" @click="hidemonth();selectItem2(monthmodel)">
                <div class="options-wrap">
                    <div
                            class="options"
                            v-for="item in monthmodel.radios"
                            @click="selectmore(item)"
                            :class='{active:item.isActive}'>
                        {{item.label}}
                    </div>
                    <mu-text-field class="qita" v-show='monthmodel.showqita' v-model="qita"
                                   hintText="请输入"/>
                </div>
            </div>
        </div>
        <!--<div v-show="monthyesmodel.isyesshow" class="bottom-sheet" key='3'>-->
            <!--<div class="bottom-wrap">-->
                <!--<div class="bottom-title">-->
                    <!--<span>{{monthyesmodel.name}}</span>-->
                <!--</div>-->
                <!--<img src="static/v2images/ic-close-x.png" class="bottom-close" @click="hidemonthyes(monthyesmodel);selectItem(monthyesmodel)">-->
                <!--<div class="options-wrap">-->
                    <!--<div-->
                            <!--class="options"-->
                            <!--v-for="item in monthyesmodel.radios"-->
                            <!--@click="selectyesmore(item)"-->
                            <!--&gt;-->
                        <!--{{item.label}}-->
                    <!--</div>-->
                    <!--<mu-text-field class="qita" v-show='yesshow' v-model="you"-->
                                   <!--hintText="请输入"/>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </transition-group>
</template>

<script>
    export default {
        props: {
            value: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            monthbottommodel: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            monthyes: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            selectItem:{
                type:Function
            },
            selectItem2:{
                type:Function
            }
        },
        data(){
            return {
                model: this.value,
                monthmodel: this.monthbottommodel,
//                monthyesmodel:this.monthyes,
                isActive: false,
//                yesshow:false,
                qita:'',
//                you:''
            }
        },
        watch: {
            value(val){
                this.model = val;
            },
            monthbottommodel(val){
                this.monthmodel = val
                console.log(val,'000000000000000000000000')
            },
//            monthyes(val){
//                this.monthyesmodel = val
//                this.you = this.monthyesmodel.value;
//            }
        },
        methods: {
            hide(item){
                this.model.show = false;
                this.model.spanshow = true;
                this.$emit('input', Object.assign({}, this.model));
                if (this.model.needCallback === true) this.$emit('select', item);
            },
            select(item){
                if (item.value != 'yes' && item.value != 'no') {
                    this.model.value = item.label;
                    this.model.default = item.value;
                } else {
                    this.model.default = item.value;
                    this.model.value = this.model.default ;
                }
                this.hide(item);
            },
            hidemonth(){
                this.monthmodel.isshow = false;
                this.monthmodel.qita = this.qita;
//              this.monthmodel.spanshow = true;
            },
            selectmore(item){
                this.monthmodel.isshow = true;
                if (item.isActive) {
                    item.isActive = false;
                    let index = this.monthmodel.result.indexOf(item.label.toString());
                    if (item.label == '其他') {
                        this.monthmodel.showqita = false;
                    }
                    this.monthmodel.result.splice(index,1)
                } else {
                    item.isActive = true;
                    if (item.label == '其他') {
                        this.monthmodel.showqita = true;
                    }
                    this.monthmodel.result.push(item.value);
                }
            },
//            hidemonthyes(monthyesmodel){
//                monthyesmodel.isyesshow = false;
////                monthyesmodel.spanshow = true;
//                if( monthyesmodel.value != "false")
//                {
//                    monthyesmodel.value = this.you;
//                }
//            },
//            selectyesmore(item){
//                this.monthyesmodel.isyesshow = true;
//                if(item.value == "true"){
//                    this.monthyesmodel.value = "";
//                    if(this.you == "false"){
//                        this.you = "";
//                    }
//                    this.yesshow = true;
//                }else{
//                    this.monthyesmodel.value = "false"
//                    this.yesshow = false;
//                }
//            }
        }
    }
</script>

<style scoped>
    .qita{
        width:100%;
        padding-left:29px;
        overflow:hidden;
    }
    .bottom-sheet {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 100;
        overflow: hidden;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }

    .bottom-wrap {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 96%;
        margin-left: -48%;
        background-color: #fff;
        border-radius: 12px 12px 0px 0px;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }

    .options-wrap {
        width: 100%;
        max-height: 246px;
        overflow-y: auto;
    }

    .bottom-title {
        display: flex;
        justify-content: center;
        padding: 16px 0;
        border-bottom: 1px solid #ECEFF9;
    }

    .bottom-title span {
        font-size: 20px;
        color: #626676;
    }

    .bottom-close {
        position: absolute;
        right: 12px;
        top: 12px;
        padding: 8px;
    }

    .options {
        width: 94%;
        padding: 20px 0;
        margin: 0 auto;
        font-size: 16px;
        color: #5A5E6f;
        text-indent: 20px;
        border-bottom: 1px solid #ECEFF9;
    }

    .active {
        color: #4BAAF4;
    }

    .fade-enter, .fade-leave-active {
        background: rgba(0, 0, 0, 0);
    }

    .fade-enter .bottom-wrap, .fade-leave-active .bottom-wrap {
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
    }
</style>