<template>
    <!-- 巡查事件 -->
    <div>
        <head-dom v-on:back="backToMap" :type="'back'">事件上报</head-dom>
        <walker-event :type="result" :static="true" class="report-dis"></walker-event>
    </div>
</template>
<script>
    import headDom from '../../UIcomponents/header/head.vue';
    import walkerEvent from '../walkerEvent/walkerEvent.vue';
    import {eventBus} from '../eventBus/eventBus';
    import { mapGetters,mapActions,mapState} from 'vuex';
    export default{
        data(){
            return{
                result:true
            }
        },
        components:{
            walkerEvent,
            headDom
        },
        methods:{
            ...mapActions({
                setMapShow: 'setMapShow',
            }),
            backToMap(e){
                if(e){
                    e.preventDefault();
                }
                this.$router.push("/home/portal");
                this.setMapShow(true);
            },
        },
        mounted(){
            //返回按钮
            document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);

        },
        destroyed(){
            document.removeEventListener(eventBus.BACK_BUTTON,this.backToMap,false);
        }
    }
</script>
<style>
    .report-dis{
        padding-top: 50px;
    }
</style>
