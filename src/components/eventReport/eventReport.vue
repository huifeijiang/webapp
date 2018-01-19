<template>
    <div>
        <head-dom v-on:back="backToMap" :type="'submit'" @confirm="confirmData">事件上报</head-dom>
        <div class="report-wrap">
            <div class="bg-col">
                <mu-text-field 
                    @blur = "getTextContent"
                    v-model="value"
                    :required = true
                    hintText="事件描述"
                    errorText="事件描述不可为空"
                    :errorText="multiLineInputErrorText"
                    @textOverflow="handleMultiLineOverflow"
                    multiLine :rows="5" :rowsMax="5"
                     required fullWidth class="keep-dis textarea"/>
                <PhotoGraph></PhotoGraph>
            </div>
            <mu-dialog :open="textValueNull" title="提示">
                {{alertMessage}}
                <mu-flat-button label="确定" slot="actions" primary @click="closeDialog"/>
            </mu-dialog>
            
            <div class="bg-col">
                <event-list class="shangbao" :type="'back'" :icon="'description'" :eventTypeList = "eventTypeList" :listTitle="typeEvent"  @selected="getSelected"></event-list>
                <socialSelect @itemSelect="itemSelect"></socialSelect>
            </div>
            <!--<event-list :selectMore="false" :icon="'pin_drop'" :eventTypeList = "riverParaList" :listTitle="typeLocate" @selected="getSelected"  class="jd-list"></event-list>-->
            <mu-divider />

            <mu-dialog :open="dialog" title="提示" >
                {{submitMessage}}
                <mu-flat-button slot="actions" @click="dialog=false" primary label="取消"/>
                <mu-flat-button slot="actions" primary @click="postData" label="确定"/>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import {cameraGetPicture,galleryGetPicture} from '../corSys/camera';
    import { mapGetters,mapActions,mapState} from 'vuex';
    import {eventBus} from '../eventBus/eventBus'
    import headDom from '../../UIcomponents/header/head';
    import MuRow from "../../../node_modules/muse-ui/src/grid/row";
    import eventList from './eventList.vue';
    import {getPosition} from '../corSys/position';
    import {locateManagerCtrl} from '../../gisComponets/locateManager/LocateManagerCtrl'
    import PhotoGraph from '../../UIcomponents/photoGraph/PhotoGraph.vue';
    import socialSelect from '../../UIcomponents/socialSelect/SocialSelect.vue';


    export default {
        components:{
            MuRow,
            headDom,
            eventList,
            PhotoGraph,
            socialSelect
        },
        data () {
            return {
                notifications:'',
                sounds:'',
                videoSounds:'',
                input: '',
                inputErrorText: '',
                multiLineInput: '',
                multiLineInputErrorText: '',
//                bottomSheet: false,
                imgList:[],
                open: false,
                docked: true,
                eventTypeList:[],
                riverParaList:[],
                eventType:'',
                eventTypeId:'',
                location:'',
                type1:'专业巡查事件',
                typeEvent:'事件类型',
                typeLocate:'所在位置',
                value:'',
                longitude:'',
                latitude:'',
                disable:false,
                textValueNull:false,
                alertMessage:'描述不能为空!',
                messageStatus:false,
                gridId:'',
                dialog:false,
                submitMessage:'确认提交？'
            }
        },
        computed:{
            ...mapGetters({
                getUserId:'getUserId'
            })
        },
        methods:{
            closeDialog(){
                this.textValueNull = false;
                if(this.messageStatus){
                    this.$router.push("/home");
                    this.setMapShow(true);
                    this.disable = false;
                    this.messageStatus = false;
                }
            },
            ...mapActions({
                setMapShow: 'setMapShow',
            }),
            getSelected(type,info){
                console.log(type,info)
                if(type == this.typeEvent){
                    this.eventTypeId = info.id;
                }else if(type == this.typeLocate){
                    this.location = info.name;
                    this.gridId = info.id;
                }
            },
            getTextContent(){
                if(this.value == ''){
                    //TODO 添加事件详情处理
                    this.alertMessage = '描述不能为空!';
                    this.textValueNull = true;
                    this.messageStatus = false;
                    return false;
                }
                return true;
            },
            handleInputOverflow (isOverflow) {
                this.inputErrorText = isOverflow ? '字数超出限制！' : ''
            },
            handleMultiLineOverflow (isOverflow) {
                this.multiLineInputErrorText = isOverflow ? '字数超出限制！' : ''
            },
           
            backToMap(e){
                if(e){
                    e.preventDefault();
                }
                var _this = this;
                MessageBox.confirm('退出此次编辑?').then(action => {
                    sessionStorage.removeItem('user');
                    _this.$router.push("/home");
                    _this.setMapShow(true);
                });
                
            },
            confirmData(){
                let textIsNull = this.getTextContent();
                if(!textIsNull){
                    return;
                }
                if(this.eventTypeId == ''){
                    this.alertMessage = '请选择事件类型!';
                    this.textValueNull = true;
                    return;
                }
                if(this.location == ''){
                    this.alertMessage = '请选择社区!';
                    this.textValueNull = true;
                    return;
                }
                this.dialog = true;
            },
            postData(){
                this.dialog = false;
                let that = this;
                let obj = {};
                //删除imgList中的plus
                obj.images = [];
                for(let key in that.imgList){
                    let item = that.imgList[key];
                    let type = item.type;
                    if(type === "plus"){
//                        that.imgList.splice(key,1);
//                        break;
                         continue;
                    }
                    obj.images.push(item.src);
                }

                obj.describe = that.value || "未填写";
                obj.eventTypeId = that.eventTypeId || 101;
                obj.longitude = this.longitude || '113.918646'; //经度
                obj.latitude  = this.latitude || '22.558919';  //纬度
                obj.address  = this.location;
                obj.userId = this.getUserId;
                obj.gridId = this.gridId;
                this.$http.post(POST_EVENT_DETAIL,obj).then(function (reponse) {
                    if(reponse.body.code == 200){
                        this.alertMessage = '提交成功!';
                        this.messageStatus = true;
                        this.textValueNull = true;
                    }
                })
            },
          geteventTypeList() {
              this.$http.get(GET_EVENT_TYPE).then(function (response) {
                let data = response.body.data.content;
                for(let item of data){
                  let obj = {};
                  obj.name = item.name;
                  obj.id   = item.eventId;
                  this.eventTypeList.push(obj);
                }

            });
          },
          getRiverPosition() {

              this.$http.get(GET_ALL_JD).then(function (response) {
                let data = response.body.data.content;
                for(let item of data){
                  let obj = {};
                  obj.name = item.name;
                  obj.id   = item.id;
                  this.riverParaList.push(obj);
                }
                  getPosition(this.getPositionDetail);
              });
           },
          getPositionDetail(info) {
            this.longitude = info.coords.longitude;
            this.latitude  = info.coords.latitude;
            locateManagerCtrl.getJDByLongitude(this.latitude,this.longitude);
          },
          addImageList:function (imageList) {
             this.imgList = imageList;
          },
          getSocialId(obj){
             for(let item of this.riverParaList)
             {
                if(item.name == obj.name)
                {
                    obj.id = item.id;
                    break;
                }
             }
          },
          itemSelect(info){
            this.location = info.cname;
            this.gridId = info.id;
          }
        },
        mounted(){
            let that = this;

            document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);

            this.geteventTypeList();
            this.getRiverPosition();

            //获取定位

           eventBus.bus.addListener(eventBus.PHOTOGRAPH_IMAGE,this.addImageList);

            //获取社区信息
            eventBus.bus.once(eventBus.JD_INFO,function (data) {
                console.log('data',data)
                if(data.length == 0 || !data){
                    getPosition(that.getPositionDetail);
                }else{

                    for(let item of data){
                        let obj = {};
                        obj.name = item;
                        that.getSocialId(obj);
                        that.riverParaList.unshift(obj);
                    }
                }
            })
        },
        destroyed(){
            document.removeEventListener(eventBus.BACK_BUTTON,this.backToMap,false);
            eventBus.bus.removeListener(eventBus.PHOTOGRAPH_IMAGE,this.addImageList);
        }
    }
</script>
<style lang="less">
    .report-wrap {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 56px;
        background-color: #F9FCFF;
    }
    .bg-col {
        background-color: #fff;
    }
    div.jd-list div.event-walker div.mu-list:first-child{
        margin-top: 50px;
    }
    .keep-dis{
        margin-top: 60px;
        padding: 0 22px;
    }
    .mu-drawer.event-walker{
        width: 100%;
        transition-duration:.6s;
    }
    div.fix{
        clear:both;
        overflow: hidden;
        padding-top: 20px;
    }
    div.mu-item.show-left{
        padding-left: 50px;
    }
    div.mu-item-right{
        right: 2px;
    }
    .textarea{
      //  text-indent: 22px;
    }
</style>
