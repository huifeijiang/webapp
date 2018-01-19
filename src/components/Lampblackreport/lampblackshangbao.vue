<template>
    <div class="wrap lam">
        <div class="alert-head">
            <span class="alert-left" @click="backToMap">返回</span>
            <span class="alert-title">油烟企业</span>
            <span class="alert-right" @click="validate">预览</span>
        </div>
        <div class="nothin"></div>
        <div class="form-wrap" ref="formwrap">
            <slot v-for="(item,index) in formData">
                <div class="form-list" v-if="item.type == 1">
                    <span>{{item.name}}</span>
                    <div>
                        <mu-text-field class="little-text" v-model="item.value" hintText="请输入" />
                    </div>
                </div>

                <div class="form-list flex-clo" v-else-if="item.type == 2">
                    <p>{{item.name}}</p>
                    <div class="text-area">
                        <mu-text-field v-if="item.name=='情况说明'" @focus="textFocus" @blur="textBlur" :hintText="item.hintText" v-model="item.value" class="text-area-flied" multiLine :rows="3" :rowsMax="3" />
                        <mu-text-field v-else :hintText="item.hintText" v-model="item.value" class="text-area-flied" multiLine :rows="3" :rowsMax="3" />
                    </div>
                </div>

                <div v-else-if="item.type == 3">
                     <div class="form-list" :class="item.class" @click="showBottomSheetAct(item,index)">
                        <p>
                            <span v-if="item.important === true" class="importants">*</span><span class="flex-grow">{{item.name}}</span>
                        </p>
                            <span class="text-right">{{item.value}}</span>
                            <i class="mu-icon material-icons">chevron_right</i>
                    </div>
                </div>

                <div v-else-if="item.type == 4">
                    <div :class='item.class +" form-list"'>
                        <span class=" flex-grow">{{item.name}}</span>
                        <slot v-for="radio in item.radios">
                            <mu-radio :label="radio.label" :name="item.name" :nativeValue="radio.value" v-model="item.default" @change="radioChange(item,radio.value)" class="demo-radio" />
                        </slot>
                    </div>
                    <div class="text-radio" v-show="item.default=='yes' && item.showInput">
                        <mu-text-field v-model="item.value" hintText="请输入" />
                    </div>
                </div>

                <div v-else>
                    <!--<event-list  :eventTypeList="shequ.datas" :selectMore="true" :listTitle="shequ.title" :singleType="true" @selected="getProdResult"></event-list>-->
                    <socialSelect @itemSelect="itemSelect"></socialSelect>
                </div>
            </slot>

        </div>
        <!-- <mu-dialog :open="confirem" title="提示">
            请确认是否提交？
            <mu-flat-button slot="actions" @click="isAccess(false)" primary label="取消" />
            <mu-flat-button slot="actions" @click="isAccess(true)" primary label="确定" />
        </mu-dialog> -->
        <mu-dialog :open="dialog" title="提示">
            提交成功！
            <mu-flat-button label="确定" slot="actions" primary @click="backToEvent" />
        </mu-dialog>
        <mu-dialog :open="submitDialog" title="提示">
            {{submitMess}}
            <mu-flat-button label="确定" slot="actions" primary @click="submitDialog = false" />
        </mu-dialog>
        <lampblackpreview :openyulan="openperive" ></lampblackpreview>

        <!--底部弹窗选择层-->
        <bottom-sheet v-model="bottomSheetVmodel"></bottom-sheet>
        <!--end-->
    </div>
</template>

<script type='es6'>
import eventList from '../eventReport/eventList.vue';
import { eventBus } from '../eventBus/eventBus';
import { mapGetters, mapActions, mapState } from 'vuex';
import { getPosition } from '../corSys/position';
import socialSelect from '../../UIcomponents/socialSelect/SocialSelect.vue';
import lampblackpreview from './lampblackpreview'
import bottomSheet  from '../../UIcomponents/bottomSheet/bottomSheet.vue';
export default {
    components: {
        eventList,
        socialSelect,
        lampblackpreview,
        bottomSheet
    },
    data() {
        return {
            bottomSheetVmodel:{
                show:false
            },
            bottomSheetIndex:0,
            openperive:false,
            params:{},
            confirem: false,
            submitDialog: false,
            submitMess: '',
            formData: [
                { type: 1, name: '*单位名称', value: '' },
                { type: 2, name: '*单位地址', value: '', hintText: '请输入单位地址' },
                {
                    type: 3, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ],
                    name: '单位是否存在', default: 'no', showInput: false, value: ''
                },

                // {type: 1, name: '法人代表联系电话', value: ''},
                { type: 1, name: '企业联系人', value: '' },
                { type: 1, name: '企业联系人电话', value: '' },
                { type: 1, name: '法人代表', value: '' },
                { type: 1, name: '基本灶头数量', value: '' },
                {
                    type: 4, radios: [
                        { label: '否', value: 'no' },
                        { label: '是', value: 'yes' }
                    ], name: '是否属于6灶台及以上', default: 'no', showInput: false, value: ''
                },
                {
                    type: 4, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ], name: '在线监测系统', default: 'no', showInput: false, value: ''
                },
                {
                    type: 3, radios: [
                        { label: '已安装运行正常', value: '0' },
                        { label: '已安装运行异常', value: '1' },
                        { label: '未安装', value: '2'},
                    ], name: '油烟净化设施', default: '2', showInput: false, value: '', class: ''
                },
                {
                    type: 4, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ], name: '油烟监测(m³)', default: 'no', showInput: true, value: ''
                },
                {
                    type: 4, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ], name: '环保审批或备案', default: 'no', showInput: true, value: ''
                },
                // {
                //     type: 3, radios: [
                //         { label: '无', value: 'no' },
                //         { label: '有', value: 'yes' }
                //     ], name: '环保批文号', default: 'no', showInput: true, value: ''
                // },
                {
                    type: 3, radios: [
                        { label: '清洁(电、天然气等)', value: '1' },
                        { label: '非清洁', value: '2' }
                    ], name: '燃料类型', default: '2', showInput: false, value: ''
                },
                {
                    type: 3, radios: [
                        { label: '下水道', value: '1' },
                        { label: '高空排放', value: '2' },
                        { label: '低空排放', value: '3' },
                        { label: '公共烟道', value: '4' },
                        { label: '其他', value: '0' }
                    ], name: '排气口方式', default: '0', showInput: false, value: '', class: ''
                },
                {
                    type: 3, radios: [
                        { label: '1次/年', value: '1' },
                        { label: '1次/半年', value: '2' },
                        { label: '1次/1季度', value: '3' },
                        { label: '1次/2个月', value: '4' },
                        { label: '无', value: '0'}
                    ], name: '油烟净化设施维护频次', default: '0', showInput: false, value: '', class: ''
                },
                { type: 2, name: '情况说明', value: '', hintText: '请输入情况说明，非必填' },

                { type: 6, name: '选择社区', ranges: [] }
            ],
            open: false,


            shequ: {
                title: '*社区选择',
                datas: [],
                result: []
            },
            longitude: '',
            latitude: '',
            dialog: false,
            nowItem: {
                title: '',
                datas: []
            },
            resultId: -1,
            showonlinexit: false,  //在线监测系统
            showonhuanbao:false,
            shequname:''
        }
    },
    watch:{
        bottomSheetVmodel(val){
            this.formData[this.bottomSheetIndex] = val;
        }
    },
    methods: {
        showBottomSheetAct(item, index){
            item.show = true;
            this.bottomSheetVmodel = Object.assign({},item);
            this.bottomSheetIndex  = index;
        },
        ...mapActions({
            setMapShow: 'setMapShow',
        }),
        ...mapGetters({
            getLatitude: 'getLatitude',
            getLongitude: 'getLongitude',
        }),
        radioChange(item, value) {


            item.default = value;
            if (item.name == "是否属于6灶台及以上") {

                if (item.default == "yes") {
                    document.getElementsByName("在线监测系统")[0].parentNode.parentNode.parentNode.style.display = 'block';
                } else {
                    document.getElementsByName("在线监测系统")[0].parentNode.parentNode.parentNode.style.display = 'none';
                    this.showonlinexit = true
                }
            }
            // if (item.name == "环保审批或备案") {

            //     if (item.default == "yes") {
            //         document.getElementsByName("环保批文号")[0].parentNode.parentNode.parentNode.style.display = 'block';
            //     } else {
            //         document.getElementsByName("环保批文号")[0].parentNode.parentNode.parentNode.style.display = 'none';
            //         this.showonhuanbao = true
            //     }
            // }
        },
        toggle(item) {
            // this.open = true;
            // this.nowItem.title = item.name;
            // if (item.name == '可能产生废水的产品类别') {
            //     this.getRange();
            // } else if(item.name == '可能产生废水主要生产的工艺'){
            //     this.getProduct();
            // }else{
            //     this.getSheQu();
            // }
        },

        getSheQu() {
            this.shequ.datas = [];
            this.$http.get(GET_RIVER_LIST + '?size=500').then((res) => {
                let temp = res.body.data.content;
                let newArr = [];
                for (let i = 0; i < temp.length; i++) {
                    let obj = {
                        id: temp[i].id,
                        name: temp[i].name,
                        checked: false
                    }
                    newArr.push(obj);
                }
                this.shequ.datas = newArr.reverse();
            }).catch((err) => {
                console.log(err)
            });
        },
        backToMap() {
            if(this.openperive){
                this.openperive = false
            }else{
                this.setMapShow(true);
                this.$router.push("/home/portal");
            }
        },
        backToEvent() {
            this.$router.push("/home/littleEvent");
        },

        submit() {

            for (let i = 0; i < this.formData.length; i++) {
                switch (this.formData[i].name) {
                    case '*单位名称':
                        this.params['enterpriseName'] = this.formData[i].value;
                        break;
                    case '*单位地址':
                        this.params['enterpriseAddr'] = this.formData[i].value;
                        break;
                    case '单位是否存在':
                        if (this.formData[i].default == 'no') {
                            this.params['exist'] = false;
                        } else {
                            this.params['exist'] = true;
                        }
                        break;
                    case '油烟净化设施维护频次':
                        this.params['mainFreq'] = this.formData[i].default;
                        break;
                    case '法人代表':
                        this.params['legalPersonName'] = this.formData[i].value;
                        break;
                    case '基本灶头数量':
                        this.params['rangCount'] = this.formData[i].value;
                        break;
                    case '企业联系人':
                        this.params['enterpriseContactsName'] = this.formData[i].value;
                        break;
                    case '企业联系人电话':
                        this.params['enterpriseContactsTel'] = this.formData[i].value;
                        break;
                    case '是否属于6灶台及以上':
                        if (this.formData[i].default == 'no') {
                            this.params['sixRangCount'] = false;
                        } else {
                            this.params['sixRangCount'] = true;
                        }
                        break;
                    case '在线监测系统':
                        if (this.formData[i].default == 'no') {
                            this.params['monitorOnline'] = false;
                        } else {
                            if (this.showonlinexit) {
                                this.params['monitorOnline'] = false;
                            } else {
                                this.params['monitorOnline'] = true;
                            }

                        }
                        break;
                    case '油烟监测设施':
                            this.params['cleanFacility'] = this.formData[i].default;
                        break;
                    case '油烟监测(m³)':
                        if (this.formData[i].default == 'no') {
                            this.params['lampblackCon'] = "无";
                        } else {
                            this.params['lampblackCon'] = this.formData[i].value;
                        }
                        break;
                    case '环保审批或备案':
                        if (this.formData[i].default == 'no') {
                            this.params['approvalNo'] = "无";
                        } else {
                           this.params['approvalNo'] = this.formData[i].value;
                        }
                        break;

                    case '燃料类型':
                        console.log(this.formData[i].default)
                        this.params['fuleType'] = this.formData[i].default;
                        break;
                    case '排气口方式':
                        this.params['exhaustWay'] = this.formData[i].default;
                        break;

                    case '情况说明':
                        this.params['describe'] = this.formData[i].value;
                        break;

                }
            }
            this.params["longitude"] = this.getLongitude();
            this.params["latitude"] = this.getLatitude();
            this.params["gridId"] = this.resultId;
            this.params['gridname'] = this.shequname
            // this.$http.post(POST_LAMPBLACK, this.params).then((res) => {
            //     if (res.body.code == 200) {
            //         //成功
            //         this.dialog = true;
            //         this.backToMap();
            //     }

            // }).catch((err) => {
            //     this.submitMess = err.body.msg
            //     this.submitDialog = true;
            // });
        },
        validate() {
            let bool = true;
            for (let i = 0; i < this.formData.length; i++) {
                switch (this.formData[i].name) {
                    case '*单位名称':
                        if (this.formData[i].value == '') bool = false;
                        this.submitMess = '请输入单位名称！';
                        break;
                    case '*单位地址':
                        if (this.formData[i].value == '') bool = false;
                        this.submitMess = '请输入单位地址！';
                        break;
                    // case '法人代表':
                    //     if(this.formData[i].value=='')  bool = false;
                    //     this.submitMess = '请输入法人代表！';
                    //     break;
                    // case '法人代表联系电话':
                    //     if(this.formData[i].value=='')  bool = false;
                    //     this.submitMess = '请输入法人代表联系电话！';
                    //     break;
                    // case '企业联系人':
                    //     if(this.formData[i].value=='')  bool = false;
                    //     this.submitMess = '请输入企业联系人！';
                    //     break;
                    // case '企业联系人电话':
                    //     if(this.formData[i].value=='')  bool = false;
                    //     this.submitMess = '请输入企业联系人电话！';
                    //     break;
                }
                if (!bool) {
                    break;
                }
            }

            if(this.resultId == -1){
              bool = false;
              this.submitMess = '请选择社区！';
            }
            if (bool) {
                this.confirem = true;
                this.submit()
                this.openperive = true;
                eventBus.bus.emit(eventBus.LAMPYULAN,this.params)
            } else {
                this.submitDialog = true;
            }

        },
        isAccess(bool) {
            if (bool) {
                this.submit();
            }
            this.confirem = false;
        },
        itemSelect(info) {
            this.shequname = info.cname;
            this.resultId = info.id;
        },
        textFocus() {
            this.$refs.formwrap.className = 'form-wrap transtop';
        },
        textBlur() {
            this.$refs.formwrap.className = 'form-wrap';
        }
    },
    mounted() {
        document.getElementsByName("在线监测系统")[0].parentNode.parentNode.parentNode.style.display = 'none';
        //document.getElementsByName("环保批文号")[0].parentNode.parentNode.parentNode.style.display = 'none';
        let height = window.innerHeight;
        //this.$refs.formwrap.style.height = height - 64 + 'px';
        //获取数据
        //this.getRange();
        //this.getProduct();
        this.getSheQu();

        //返回按钮
        document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed() {
        document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
}
</script>

<style scoped>
.transtop {
    transform: translateY(-175px);
    -webkit-transform: translateY(-175px);
    transition: .3s
}

.wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 80;
    background-color: #fff;
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
    margin-left: 10px;
}

.alert-right {
    margin-right: 10px;
}

.alert-title {
    font-size: 20px;
}

.nothin {
    height: 1px;
}

.form-wrap{
    /*position:absolute;*/
    /*left:0;*/
    /*right:0;*/
    /*top: 56px;*/
    /*bottom:0;*/
    overflow-y: auto;
    transition: .3s
}

.form-title {
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
    margin-top: 0px;
    margin-bottom: 0px;
}

.form-list {
    width: 100%;
    display: flex;
    padding: 5px 10px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
}

.flex-clo {
    flex-direction: column;
}

.speall .flex-grow {
    width: 100%;
    flex-grow: initial;
    display: inline-block;
}

.speall {
    width: 100%;

    display: inherit;
    padding: 5px 10px;
    box-sizing: border-box;
    /* -webkit-box-pack: justify; */
    /* -webkit-justify-content: space-between; */
    /* justify-content: space-between; */
    /* -webkit-box-align: center; */
    /* -webkit-align-items: center; */
    /* align-items: center; */
    border-bottom: 1px solid #efefef;
}



.mu-text-field {
    margin-bottom: 0px;
    min-height: 33px;
}

.form-list p {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
}

.text-area,
.text-radio {
    width: 100%;
}

.text-area-flied {
    width: 100%;
}

.icons {
    font-size: 20px;
}

.flex-grow {
    flex-grow: 1;
}

.demo-radio {
    margin-right: 10px;
}

.wushui {
    width: 100%;
    z-index: 60;
}

.hidden {
    visibility: hidden;
}

.text-range {
    padding: 3px 10px;
    box-sizing: border-box;
}

.range-list {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
}
.text-right {
    min-width: 124px;
    text-align: right;
}
</style>
