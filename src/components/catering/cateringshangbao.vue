<template>
    <div class="wrap lam canyin">
        <div class="alert-head">
            <span class="alert-left" @click="backToMap">返回</span>
            <span class="alert-title">餐饮</span>
            <span class="alert-right" @click="validate">预览</span>
        </div>
        <div class="nothin"></div>
        <div class="form-wrap" ref="formwrap">
            <slot v-for="(item,index) in formData">
                <div :class='item.class +" form-list"' v-if="item.type == 1">
                    <span>{{item.name}}</span>
                    <div class="inliblock">
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
                    <div class="form-list" @click="showBottomSheetAct(item,index)">
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
        <cateringpreview :openyulan="openperive"></cateringpreview>

        <!--底部弹窗选择层-->
        <bottom-sheet v-model="bottomSheetVmodel"></bottom-sheet>
        <!--end-->
    </div>
</template>

<script>
import eventList from '../eventReport/eventList.vue';
import { eventBus } from '../eventBus/eventBus';
import { mapGetters, mapActions, mapState } from 'vuex';
import { getPosition } from '../corSys/position';
import socialSelect from '../../UIcomponents/socialSelect/SocialSelect.vue';
import cateringpreview from './cateringpreview'
import bottomSheet  from '../../UIcomponents/bottomSheet/bottomSheet.vue';
export default {
    components: {
        eventList,
        socialSelect,
        cateringpreview,
        bottomSheet
    },
    data() {
        return {
            bottomSheetVmodel:{
                show:false
            },
            bottomSheetIndex:0,
            openperive: false,
            params: {},
            confirem: false,
            submitDialog: false,
            submitMess: '',
            formData: [
                { type: 1, name: '*单位名称', value: '' },
                { type: 2, name: '*单位地址', value: '', hintText: '请输入单位地址' },
                {
                    type: 4, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ], name: '*营业执照', default: '',showInput:true, value: '',show:true
                },

                { type: 1, name: '*法人代表', value: '' },
                { type: 1, name: '*法人代表电话', value: '' },
                { type: 1, name: '企业联系人', value: '' },
                { type: 1, name: '企业联系人电话', value: '' },

                // { type: 1, name: '******基本灶头数量(个)', value: '' },
                {
                    type: 4, radios: [
                        { label: '审批批文', value: '1' },
                        { label: '登记备案', value: '2' },
                        { label: '无手续', value: '0' },
                    ], name: '*环保手续', default: '',  value: '', class: 'speall',show:true
                },
                { type: 1, name: '环保批文号', value: '', class: 'piwen' },
                { type: 1, name: '登记备案号', value: '', class: 'beian' },


                {
                    type: 4, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ], name: '*排水许可证', default: '',showInput:true,  value: '',show:true
                },
                { type: 1, name: '*基本灶头数量(个)', value: '' },
                {
                    type: 3, radios: [
                        { label: '未安装', value: 1 },
                        { label: '已安装', value: 2 }
                    ], name: '*在线监测系统', default: '',value: '',show:true
                },
                {
                    type: 3, radios: [
                        { label: '已安装运行正常', value: '0' },
                        { label: '已安装运行异常', value: '1' },
                        { label: '未安装', value: '2'},
                    ], name: '*油烟净化系统', default: '',  value: '', class: 'speall',show:true
                },
                {
                    type: 3, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                    ], name: '*油烟监测报告', default: '',  value: '',show:true
                },
                {
                    type: 3, radios: [
                        { label: '清洁(电、天然气等)', value: '1' },
                        { label: '非清洁', value: '2' }
                    ], name: '*燃料类型', default: '', value: '',show:true
                },
                {
                    type: 3, radios: [
                        { label: '下水道排放', value: '1' },
                        { label: '高空排放', value: '2' },
                        { label: '低空排放', value: '3' },
                        { label: '其他', value: '0' }
                    ], name: '*排气口方式', default: '', value: '', class: 'speall',show:true
                },

                {
                    type: 3, radios: [
                        { label: '雨污合流', value: '1' },
                        { label: '雨污分流', value: '2' },
                        
                    ], name: '*建筑红线内分流情况', default: '', value: '',show:true 
                },
                {
                    type: 4, radios: [
                        { label: '无', value: 'no' },
                        { label: '有', value: 'yes' }
                        
                    ], name: '*预处理设施', default: '', value: '',show:true
                },
                { type: 1, name: '*化粪池(级／个)', value: '',class:'hua' },
                { type: 1, name: '*隔油池(级／个)', value: '',class:'ge' },
                { type: 1, name: '*沉沙池(级／个)', value: '',class:'chen' },
                // {
                //     type: 3, radios: [
                //         { label: '无', value: 'no' },
                //         { label: '有', value: 'yes' }
                //     ], name: '*隔油隔渣设施', default: '', showInput: false, value: ''
                // },
                {
                    type: 4, radios: [
                        { label: '有市政污水管网', value: '1' },
                        { label: '无市政污水管网', value: '0' },
                    ], name: '*周边管网建设情况', default: '', value: '', class: 'speall',show:true
                },
                {
                    type: 4, radios: [
                        { label: '市政污水管网', value: '1' },
                        { label: '市政雨水管网', value: '2' },
                        
                        { label: '直排入河', value: '4' },
                    ], name: '*建筑红线外污水接驳去向1', default: '', value: '', class: 'speall tmdone',show:true
                },
                {
                    type: 4, radios: [
                        { label: '雨污合流管网', value: '3' },
                        { label: '直排入河', value: '4' },
                    ], name: '*建筑红线外污水接驳去向2', default: '',  value: '', class: 'speall tmdtwo',show:true
                },
                // {
                //     type: 3, radios: [
                //         { label: '无', value: 'no' },
                //         { label: '有', value: 'yes' }
                //     ], name: '化粪池', default: '', showInput: false, value: ''
                // },


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
            showonlinexit: false,  //*在线监测系统
            showonhuanbao: false,
            shequname: ''
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
            if (item.name == "*环保手续") {

                if (item.default == "1") {
                    document.getElementsByClassName("piwen")[0].style.display = '';
                    document.getElementsByClassName("beian")[0].style.display = 'none';
                }
                else if (item.default == "2") {
                    document.getElementsByClassName("piwen")[0].style.display = 'none';
                    document.getElementsByClassName("beian")[0].style.display = '';
                } else {
                    document.getElementsByClassName("piwen")[0].style.display = 'none';
                    document.getElementsByClassName("beian")[0].style.display = 'none';
                }
            };
            if (item.name == "*周边管网建设情况") {
                this.params['direction'] = ""
                if (item.default == "1" || item.default == "2") {
                    document.getElementsByClassName("tmdone")[0].style.display = '';
                    document.getElementsByClassName("tmdtwo")[0].style.display = 'none';
                }
                else {
                    document.getElementsByClassName("tmdone")[0].style.display = 'none';
                    document.getElementsByClassName("tmdtwo")[0].style.display = '';
                }
            }
            if (item.name == "*预处理设施") {
                console.log(item.default)
                if (item.default == 'no') {
                    document.getElementsByClassName("hua")[0].style.display = 'none';
                    document.getElementsByClassName("ge")[0].style.display = 'none';
                    document.getElementsByClassName("chen")[0].style.display = 'none';
                    
                   
                }
                else {

                    document.getElementsByClassName("hua")[0].style.display = '';
        document.getElementsByClassName("ge")[0].style.display = '';
        document.getElementsByClassName("chen")[0].style.display = '';
                }
            }
        },
        toggle(item) {

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
            if (this.openperive) {
                this.openperive = false
            } else {
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
                    case '*营业执照':
                        if (this.formData[i].default == 'no') {
                            this.params['enterpriseLicense'] = "无";
                        } else if (this.formData[i].default == 'yes') {
                            if (this.formData[i].value == "") {
                                this.params['enterpriseLicense'] = "有";
                            } else {
                                this.params['enterpriseLicense'] = this.formData[i].value;
                            }

                        } else {
                            this.params['enterpriseLicense'] = "";
                        }
                        break;
                    case '*环保手续':
                        this.params['approvalProcedure'] = this.formData[i].default;
                        break;
                    //  { type: 1, name: '环保批文号', value: '',class: 'piwen' },
                    // { type: 1, name: '登记备案号', value: '',class: 'beian'},
                    case '环保批文号':
                        this.params['approvalNo'] = this.formData[i].value;
                        break;
                    case '登记备案号':
                        this.params['recordNo'] = this.formData[i].value;
                        break;
                    case '*法人代表':
                        this.params['legalPersonName'] = this.formData[i].value;
                        break;
                    //*法人代表电话
                    case '*法人代表电话':
                        this.params['legalPersonTel'] = this.formData[i].value;
                        break;
                    case '*基本灶头数量(个)':
                        this.params['rangCount'] = this.formData[i].value;
                        break;
                    case '企业联系人':
                        this.params['enterpriseContactsName'] = this.formData[i].value;
                        break;
                    case '企业联系人电话':
                        this.params['enterpriseContactsTel'] = this.formData[i].value;
                        break;

                    //化粪池
                    // case '化粪池':
                    //     if (this.formData[i].default == 'no') {
                    //         this.params['septicTank'] = false;
                    //     } else {
                    //         this.params['septicTank'] = true;
                    //     }
                    //     break;
                    case '*隔油隔渣设施':

                        if (this.formData[i].default == 'no') {
                            this.params['separationFacility'] = false
                        } else if (this.formData[i].default == 'yes') {
                            this.params['separationFacility'] = true
                        } else {
                            this.params['separationFacility'] = "";
                        }
                        break;
                    //pipeStatus
                    case '*周边管网建设情况':
                        this.params['pipeStatus'] = this.formData[i].default;
                        break;
                    case '*建筑红线外污水接驳去向1':
                        this.params['direction1'] = this.formData[i].default;
                        break;
                    case '*建筑红线外污水接驳去向2':
                        this.params['direction2'] = this.formData[i].default;
                        break;
                    case '*排水许可证':

                        if (this.formData[i].default == 'no') {
                            this.params['drainageLicense'] = "无";
                        } else if (this.formData[i].default == 'yes') {
                            if (this.formData[i].value == "") {
                                this.params['drainageLicense'] = "有";
                            } else {
                                this.params['drainageLicense'] = this.formData[i].value;
                            }

                        } else {
                            this.params['drainageLicense'] = "";
                        }
                        break;


                    case '情况说明':
                        this.params['describe'] = this.formData[i].value;
                        break;
                    case '*在线监测系统':
                        
                        if (this.formData[i].default == 1) {
                            this.params['monitorOnline'] = false
                        } else if (this.formData[i].default == 2) {
                            this.params['monitorOnline'] = true
                        } else {
                            this.params['monitorOnline'] = "";
                        }
                        break;
                    case '*油烟净化系统':
                            this.params['cleanFacility'] = this.formData[i].default;
                        break;
                   
                    case '*油烟监测报告':
                        
                        if (this.formData[i].default == 'no') {
                            this.params['lampblackReport'] = false
                        } else if (this.formData[i].default == 'yes') {
                            this.params['lampblackReport'] = true
                        } else {
                            this.params['lampblackReport'] = "";
                        }
                        break;
                    case '*燃料类型':
                        this.params['fuleType'] = this.formData[i].default;
                        break;
                    case '*排气口方式':
                        this.params['exhaustWay'] = this.formData[i].default;
                        break;
                    case '*建筑红线内分流情况':
                        this.params['shuntStatus'] = this.formData[i].default;
                        break;
                    case '*预处理设施':
                        
                        if (this.formData[i].default == 'no') {
                            this.params['haveFacilitie'] = false
                        } else if (this.formData[i].default == 'yes') {
                            this.params['haveFacilitie'] = true
                        } else {
                            this.params['haveFacilitie'] = "";
                        }
                        break;
                    case '*化粪池(级／个)':
                        this.params['septicTank'] = this.formData[i].value;
                        break;
                    case '*隔油池(级／个)':
                        this.params['separationFacility'] = this.formData[i].value;
                        break;
                    case '*沉沙池(级／个)':
                        this.params['gritChamberFacility'] = this.formData[i].value;
                        break;
                }
            }
            //污水流向  direction; 
            if (this.params['pipeStatus'] == "0") {
                this.params['direction'] = this.params['direction2']
            } else {
                this.params['direction'] = this.params['direction1']
            }
        
            console.log("this.params['separationFacility']", this.params['separationFacility'] == '')
            console.log("this.params['direction']", this.params['direction'])
            this.params["longitude"] = this.getLongitude();
            this.params["latitude"] = this.getLatitude();
            this.params["gridId"] = this.resultId;
            this.params['gridname'] = this.shequname;
            if (this.params['approvalProcedure'] == 1) {
                this.params['recordNo'] = null
            }
            if (this.params['approvalProcedure'] == 2) {
                this.params['approvalNo'] = null
            }
            if (this.params['approvalProcedure'] == 0) {
                this.params['approvalNo'] = null
                this.params['recordNo'] = null
            }
            if (this.params['enterpriseLicense'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入营业执照';
                return false
            }
            if (this.params['legalPersonName'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入法人代表';
                return false
            }
            if (this.params['legalPersonTel'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入法人代表电话';
                return false
            }
            if (isNaN(this.params['legalPersonTel'])) {
                this.submitDialog = true
                this.submitMess = '法人代表电话请输入数字格式';
                return false
            }
            if (this.params['approvalProcedure'] == '') {
                this.submitDialog = true
                this.submitMess = '请选择环保手续';
                return false
            }
            if (this.params['drainageLicense'] == '') {
                this.submitDialog = true
                this.submitMess = '请选择排水许可';
                return false
            }
            if (this.params['rangCount'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入基本灶头数';
                
                return false
            }
            if(isNaN(this.params['rangCount'])){
                this.submitDialog = true
                this.submitMess = '基本灶头数请输入数字';
                return false
            }
            

            if (this.params['pipeStatus'] == '') {
                this.submitDialog = true
                this.submitMess = '请选择周边管网建设情况';
                return false
            }

            if (this.params['direction'] == '') {
                this.submitDialog = true
                this.submitMess = '请选择建筑红外线外污水接驳去向';
                return false
            }
            ///////
            if (this.params['monitorOnline'] === '' ) {
                this.submitDialog = true
                this.submitMess = '请选择在线监测系统';
                return false
            }

            if (this.params['cleanFacility'] === '' ) {
                this.submitDialog = true
                this.submitMess = '请选择油烟净化系统';
                return false
            }

            if (this.params['lampblackReport'] === '' ) {
                this.submitDialog = true
                this.submitMess = '请选择油烟监测报告';
                return false
            }
            if (this.params['fuleType'] === '' ) {
                this.submitDialog = true
                this.submitMess = '请选择燃料类型';
                return false
            }
            if (this.params['exhaustWay'] === '') {
                this.submitDialog = true
                this.submitMess = '请选择排气口方式';
                return false
            }

            if (this.params['shuntStatus'] === '') {
                this.submitDialog = true
                this.submitMess = '请选择建筑红线内分流情况';
                return false
            }
            if (this.params['haveFacilitie'] === '') {
                this.submitDialog = true
                this.submitMess = '请选择预处理设施';
                return false
            }
if(this.params['haveFacilitie']){
            
             if (this.params['septicTank'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入化粪池';
                
                return false
            }
            if(isNaN(this.params['septicTank'])){
                this.submitDialog = true
                this.submitMess = '化粪池请输入数字';
                return false
            }

            if (this.params['separationFacility'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入隔油池';
                
                return false
            }
            if(isNaN(this.params['separationFacility'])){
                this.submitDialog = true
                this.submitMess = '隔油池请输入数字';
                return false
            }
            if (this.params['gritChamberFacility'] == '') {
                this.submitDialog = true
                this.submitMess = '请输入沉沙池';
                
                return false
            }
            if(isNaN(this.params['gritChamberFacility'])){
                this.submitDialog = true
                this.submitMess = '沉沙池请输入数字';
                return false
            }
}else{
    this.params['septicTank'] = ''
    this.params['gritChamberFacility'] = ''
    this.params['gritChamberFacility'] = ''
}
            // if (this.params['septicTank'] == '') {
            //     this.submitDialog = true
            //     this.submitMess = '请选择是否有化粪池';
            //     return false
            // }
            this.openperive = true;
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


                }
                if (!bool) {
                    break;
                }
            }

            if (this.resultId == -1) {
                bool = false;
                this.submitMess = '请选择社区！';
            }
            if (bool) {
                this.confirem = true;
                this.submit()
                console.log(this.params)
                eventBus.bus.emit(eventBus.LAMPYULAN, this.params)
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
        document.getElementsByClassName("hua")[0].style.display = 'none';
        document.getElementsByClassName("ge")[0].style.display = 'none';
        document.getElementsByClassName("chen")[0].style.display = 'none';
        document.getElementsByClassName("piwen")[0].style.display = 'none';
        document.getElementsByClassName("beian")[0].style.display = 'none';
        document.getElementsByClassName("tmdone")[0].style.display = 'block';
        document.getElementsByClassName("tmdtwo")[0].style.display = 'none';
        let height = window.innerHeight;
        this.$refs.formwrap.style.height = height - 64 + 'px';
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

.inliblock {
    display: inline-block;
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
    justify-content: space-between;
    z-index: 50;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    color: #fff;
}

.alert-left {
    margin-left: 20px;
}

.alert-right {
    margin-right: 20px;
}

.alert-title {
    font-size: 20px;
}

.nothin {
    height: 1px;
}

.form-wrap,
.range-wrap {
    width: 100%;
    margin-top: 55px;
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
    height: 30px;
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
    width: 220px;
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
