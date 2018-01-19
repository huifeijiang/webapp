<template>
  <event-list :modalValue="modalValue" class="shangbao"  :selectMore="false" :icon="'place'" :eventTypeList = "riverParaList" :listTitle="typeLocate" @selected="selectChange"></event-list>
</template>

<script>
    import {cameraGetPicture,galleryGetPicture} from '../../components/corSys/camera';
    import { mapGetters,mapActions,mapState} from 'vuex';
    import eventList from '../../components/eventReport/eventList.vue';
    import {getPosition} from '../../components/corSys/position';
    import {locateManagerCtrl} from '../../gisComponets/locateManager/LocateManagerCtrl';
    import {eventBus} from '../../components/eventBus/eventBus';
    import {socialSelectInstance} from './SocialSelectInstance';

    export default {
        components: {
            eventList,
        },
        props: {
          modalValue: {
            type:String,
            default: ""
            }
        },
        data(){
            return {
                typeLocate: '选择社区',
                riverParaList: [],

            }
        },
        methods: {
            getRiverPosition() {

                this.$http.get(GET_ALL_JD).then(function (response) {
                    let data = response.body.data.content;
                    for (let item of data) {
                        let obj = {};
                        obj.name = item.name;
                        obj.cname = item.name;
                        obj.id = item.id;
                        obj.checked  = false;
                        this.riverParaList.push(obj);
                    }
                    getPosition(this.getPositionDetail);
                });
            },
            getPositionDetail(info) {
                this.longitude = info.coords.longitude;
                this.latitude = info.coords.latitude;
                locateManagerCtrl.getJDByLongitude(this.latitude, this.longitude);
            },
            getSocialId(obj){
                for (let item of this.riverParaList) {
                    if (item.cname == obj.cname) {

                        obj.id = item.id;
                        break;
                    }
                }
            },
            selectChange(type, info){
                if (socialSelectInstance.jd == null) {
                    socialSelectInstance.jd = new Object();

                    this.riverParaList.unshift(socialSelectInstance.jd);
                }
                socialSelectInstance.jd.id = info.id;
                socialSelectInstance.jd.cname = info.cname;
                socialSelectInstance.jd.name = info.cname + "   (最近选择)";

                this.$emit("itemSelect", info);
            },

        },
        computed: {},
        mounted(){

            let that = this;
            this.getRiverPosition();

            eventBus.bus.once(eventBus.JD_INFO, function (data) {
                console.log('data', data)
                if (data.length == 0 || !data) {
//          getPosition(that.getPositionDetail);
                } else {

                    for (let item of data) {
                        let obj = {};
                        obj.name = item + "   (所在位置)";
                        console.log('所在位子-----', item)
                        obj.cname = item;
                        that.getSocialId(obj);
                        obj.checked  = false;
                        that.riverParaList.unshift(obj);
                    }
                }

                if (socialSelectInstance.jd != null) {
                    that.riverParaList.unshift(socialSelectInstance.jd);
                }
            })
        },
        destroyed(){

        }
    }
</script>

<style>

</style>
