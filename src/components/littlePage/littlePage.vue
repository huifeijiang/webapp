<template>
    <div class="wrap lam">
        <div class="alert-head">
            <span class="alert-left" @click="backToMap">返回</span>
            <span class="alert-title">小散乱污</span>
            <span class="alert-right" @click="validate">预览</span>
        </div>
        <div class="nothin"></div>
        <div class="form-wrap" ref="formwrap">
            <slot v-for="(item,index) in formData">
                <div class="form-list" v-if="item.type == 1">
                    <p><span v-if="item.important === true" class="importants">*</span><span>{{item.name}}</span></p>
                    <div>
                        <mu-text-field class="little-text" v-model="item.value" hintText="请输入"/>
                    </div>
                </div>

                <div class="form-list flex-clo" v-else-if="item.type == 2">
                    <p>{{item.name}}</p>
                    <div class="text-area">
                        <mu-text-field v-if="item.name=='情况说明'" @focus="textFocus" @blur="textBlur" :hintText="item.hintText" v-model="item.value" class="text-area-flied" multiLine
                                       :rows="3" :rowsMax="3"/>
                        <mu-text-field v-else :hintText="item.hintText" v-model="item.value" class="text-area-flied" multiLine
                           :rows="3" :rowsMax="3"/>
                    </div>
                </div>

                <div v-else-if="item.type == 3">
                    <div class="form-list" @click="showBottomSheetAct(item,index)">
                        <p>
                            <span v-if="item.important === true" class="importants">*</span><span class="flex-grow">{{item.name}}</span>
                        </p>
                            <span>{{item.value}}</span>
                            <i class="mu-icon material-icons">chevron_right</i>
                    </div>
                </div>

                <div v-else-if="item.type == 4">
                    <event-list ref="productResulInPolution" :eventTypeList="productResulInPolution.datas" :selectMore="true" :listTitle="productResulInPolution.title" @selected="getProdResult"></event-list>
                </div>
                <div v-else-if="item.type == 5">
                    <event-list ref="techResultInPolution" :eventTypeList="techResultInPolution.datas" :selectMore="true" :listTitle="techResultInPolution.title" @selected="getProdResult"></event-list>
                </div>
                
                <div v-else-if="item.type == 6">
                    <div class="form-list" @click="showBottomSheetAct(item,index)">
                        <p>
                            <span v-if="item.important === true" class="importants">*</span><span class="flex-grow">{{item.name}}</span>
                        </p>
                            <span style="min-width:100px;text-align:right;">{{item.default=='yes'?'有':item.value}}</span>
                            <i class="mu-icon material-icons">chevron_right</i>
                    </div>
                    <div class="text-radio" v-show="item.default=='yes' && item.showInput">
                        <mu-text-field v-model="item.inputValue" hintText="请输入" />
                    </div>
                </div>

                <div v-else>
                    <socialSelect @itemSelect="itemSelect"></socialSelect>
                </div>
            </slot>

            <!-- <a href="javascript:;" class="submit-btn">提交表单</a> -->
        </div>
        <!--底部弹窗选择UI组件-->
        <bottom-sheet v-model="bottomSheetObject" @select="selectSheQu"></bottom-sheet>
        <!--end-->
        <mu-dialog :open="confirem" title="提示">
            请确认是否提交？
            <mu-flat-button slot="actions" @click="isAccess(false)" primary label="取消"/>
            <mu-flat-button slot="actions" @click="isAccess(true)" primary label="确定"/>
        </mu-dialog>
        <mu-dialog :open="dialog" title="提示">
            提交成功！
            <mu-flat-button label="确定" slot="actions" primary @click="backToEvent"/>
        </mu-dialog>
        <mu-dialog :open="submitDialog" title="提示">
            {{submitMess}}
            <mu-flat-button label="确定" slot="actions" primary @click="submitDialog = false"/>
        </mu-dialog>
        <!--预览-->
        <littlepreview :openyulan="openperive"></littlepreview>
        <!--end-->
    </div>
</template>

<script type='es6'>
    import eventList from '../eventReport/eventList.vue';
    import {eventBus} from '../eventBus/eventBus';
    import {mapGetters, mapActions, mapState} from 'vuex';
    import {getPosition} from '../corSys/position';
    import socialSelect from '../../UIcomponents/socialSelect/SocialSelect.vue';
    import littlepreview from './littlepreview.vue'
    import bottomSheet  from '../../UIcomponents/bottomSheet/bottomSheet.vue';

    export default {
        components: {
            eventList,
            socialSelect,
            littlepreview,
            bottomSheet
        },
        data() {
            return {
                bottomSheetObject:{
                    show:false,
                    default:'a',
                    radios: [],
                    name: '',
                    value: ''
                },
                bottomSheetIndex:0,
                openperive:false,
                confirem:false,
                submitDialog:false,
                submitMess:'',
                formData: [
                    {type: 1, name: '单位名称', value: '',important:true},
                    {type: 1, name: '单位地址', value: '',important:true},
                    {
                        type: 6, radios: [
                            {label: '无',value: 'no'},
                            {label: '有', value: 'yes'}
                        ],
                        name: '营业执照', default: 'no', value: '',show:true,showInput:true,inputValue:''
                    },
                    {type: 1, name: '法人代表', value: ''},
                    {type: 1, name: '法人代表联系电话', value: ''},
                    {type: 1, name: '企业联系人', value: ''},
                    {type: 1, name: '企业联系人电话', value: ''},
                    {
                        type: 3, radios: [
                            {label: '无', value: 'no'},
                            {label: '有', value: 'yes'}
                        ], 
                        name: '生产废水', default: 'no', value: '',important:true,show:true
                    },
                    {type: 4, name: '可能产生废水的产品类别', ranges: []},
                    {type: 5, name: '可能产生废水的主要生产工艺', ranges: []},
                    {
                        type: 6, radios: [
                            {label: '无', value: 'no'},
                            {label: '有', value: 'yes'}
                        ], name: '环保批文', default: 'no', value: '',showInput:true,show:true,inputValue:''
                    },
                    {
                        type: 3, radios: [
                            {label: '无', value: 'no'},
                            {label: '有', value: 'yes'}
                        ], name: '废水直排', default: 'no', value: '',show:true
                    },
                    {
                        type: 3, radios: [
                            {label: '无', value: 'no'},
                            {label: '有', value: 'yes'}
                        ], name: '废水处理设施', default: 'no', value: ''
                    },
                    {type: 2, name: '情况说明', value: '', hintText: '请输入情况说明，非必填'},
                    {
                        type: 3, radios: [
                            {label: '否', value: 'no'},
                            {label: '是', value: 'yes'}
                        ], name: '是否需要执法整治', default: 'no', value: '',show:true
                    },

                    {type: 7, name: '选择社区', ranges: [], needCallback:true}
                ],
                open: false,
                productResulInPolution: {
                    title: '可能产生废水的产品类别',
                    datas: [],
                    result:[]
                },
                techResultInPolution:{
                    title:'可能产生废水主要生产的工艺',
                    datas:[],
                    result:[]
                },
                shequ:{
                    title:'*社区选择',
                    datas:[],
                    result:[]
                },
                longitude:'',
                latitude :'',
                dialog:false,
                nowItem:{
                    title:'',
                    datas:[]
                },
                resultId:-1,
                gridname:''
            }
        },
        watch:{
            bottomSheetObject(val){
                this.formData[this.bottomSheetIndex] = val;
            }   
        },
        methods: {
            showBottomSheetAct(item, index){
                item.show = true;
                this.bottomSheetObject = Object.assign({},item);
                this.bottomSheetIndex  = index;
                if(item.name == '选择社区') {
                    this.getSheQu();
                }
                if(item.name == '生产废水') {

                }
            },
            ...mapActions({
                setMapShow: 'setMapShow',
            }),
            ...mapGetters({
                getLatitude: 'getLatitude',
                getLongitude:'getLongitude',
            }),
            radioChange(item, value) {
                item.default = value;
            },
            toggle(item) {
                this.open = true;
                this.nowItem.title = item.name;
                if (item.name == '可能产生废水的产品类别') {
                    this.getRange();
                } else if(item.name == '可能产生废水主要生产的工艺'){
                    this.getProduct();
                }else{
                    this.getSheQu();
                }
            },
            getRange() {
                this.productResulInPolution.datas = [];
                this.$http.get(GET_WATER_RANGE).then((res) => {
                    let temp = res.body.data;
                    let newArr = [];
                    for (let i = 0; i < temp.length; i++) {
                        let obj = {
                            id: temp[i].id,
                            name: temp[i].name,
                            checked: false
                        }
                        newArr.push(obj);
                    }
                    this.productResulInPolution.datas = newArr.reverse();
                }).catch((err) => {
                    console.log(err)
                });
            },
            getProduct() {
                this.techResultInPolution.datas = [];
                this.$http.get(GET_WATER_PRODUCT).then((res) => {
                    let temp = res.body.data;
                    let newArr = [];
                    for (let i = 0; i < temp.length; i++) {
                        let obj = {
                            id: temp[i].id,
                            name: temp[i].name,
                            checked: false
                        }
                        newArr.push(obj);
                    }
                    this.techResultInPolution.datas = newArr.reverse();

                }).catch((err) => {
                    console.log(err)
                });
            },
            getSheQu(){
                this.shequ.datas = [];
                this.$http.get(GET_RIVER_LIST+'?size=500').then((res) => {
                    let temp = res.body.data.content;
                    let newArr = [];
                    for (let i = 0; i < temp.length; i++) {
                        let obj = {
                            id: temp[i].id,
                            label: temp[i].name,
                            value: temp[i].name,
                            checked: false
                        }
                        newArr.push(obj);
                    }
                    this.shequ.datas = newArr.reverse();
                    this.$set(this.bottomSheetObject, 'radios', newArr.reverse());
                }).catch((err) => {
                    console.log(err)
                });
            },
            backToMap() {
                if(this.openperive){
                    this.openperive = false
                }else if(this.$refs.productResulInPolution[0].open){
                    this.$refs.productResulInPolution[0].open = false
                }else if(this.$refs.techResultInPolution[0].open){
                    this.$refs.techResultInPolution[0].open = false
                }else if(this.$route.params.tittle == '每日一巡'){
                    this.$router.push("/home/hcstatistic");
                }
                else{
                    this.setMapShow(true);
                    this.$router.push("/home/portal");
                }
            },
            backToEvent(){
                this.$router.push("/home/littleEvent");
            },
            getData() {
                this.open = false;
                for (let i = 0; i < this.formData.length; i++) {
                    if (this.formData[i].name == this.productResulInPolution.title) {
                        this.formData[i].ranges = this.productResulInPolution.datas;
                    }
                }
            },
            getProdResult(type,result){
                if(type == this.productResulInPolution.title){
                    this.productResulInPolution.result = result;
                }
                if(type == this.techResultInPolution.title ){
                    this.techResultInPolution.result = result;
                }
                if(type == this.shequ.title){
                    result.splice(0,result.length-1);
                    let id = result[0];
                    for(let i=0;i<this.shequ.datas.length;i++){
                        this.shequ.datas[i].checked = false;
                    }
                    for(let i=0;i<this.shequ.datas.length;i++){
                        if(this.shequ.datas[i].id == id){
                            this.shequ.datas[i].checked = true;
                            break;
                        }
                    }
                    this.shequ.result = result;
                    console.log(result, this.shequ.result)
                }
            },
            getTechResult(type,result){
                if(type){
                    console.log('ttt',result);
                }
            },
            submit() {
                let params = {}
               
                for (let i = 0; i < this.formData.length; i++) {
                    switch (this.formData[i].name) {
                        case '单位名称':
                            params['enterpriseName'] = this.formData[i].value;
                            break;
                        case '单位地址':
                            params['enterpriseAddr'] = this.formData[i].value;
                            break;
                        case '营业执照':
                            if (this.formData[i].default == 'no') {
                                params['enterpriseLicense'] = '无';
                            } else {
                                params['enterpriseLicense'] = this.formData[i].inputValue;
                            }
                            break;
                        case '法人代表':
                            params['legalPersonName'] = this.formData[i].value;
                            break;
                        case '法人代表联系电话':
                            params['legalPersonTel'] = this.formData[i].value;
                            break;
                        case '企业联系人':
                            params['enterpriseContactsName'] = this.formData[i].value;
                            break;
                        case '企业联系人电话':
                            params['enterpriseContactsTel'] = this.formData[i].value;
                            break;
                        case '可能产生废水的产品类别':
                            let ids = '';
                            params['productTypes'] = this.productResulInPolution.result.join(',');
                            break;
                        case '可能产生废水的主要生产工艺':
                            let id = '';
                            params['crafts'] = this.techResultInPolution.result.join(',');
                            break;
                        case '环保批文':
                            if (this.formData[i].default == 'no') {
                                params['approvalNo'] = '';
                            } else {
                                params['approvalNo'] =  this.formData[i].inputValue;
                            }
                            break;
                        case '生产废水':
                            if (this.formData[i].default == 'no') {
                                params['isProduceWastewater'] = false;
                            } else {
                                params['isProduceWastewater'] = true;
                            }
                            break;
                        case '废水直排':
                            if (this.formData[i].default == 'no') {
                                params['isOutWastewater'] = false;
                            } else {
                                params['isOutWastewater'] = true;
                            }
                            break;
                        case '废水处理设施':
                            if (this.formData[i].default == 'no') {
                                params['isWastewaterFacility'] = false;
                            } else {
                                params['isWastewaterFacility'] = true;
                            }
                            break;
                        case '是否需要执法整治':
                            if (this.formData[i].default == 'no') {
                                params['isLawEnforcement'] = false;
                            } else {
                                params['isLawEnforcement'] = true;
                            }
                            break;
                        case '情况说明':
                            params['describe'] = this.formData[i].value;
                            break;
                    }
                }
                params["longitude"] = this.getLongitude();
                params["latitude"]  = this.getLatitude();
                params["gridId"]  = this.resultId;
                params["gridname"] = this.gridname;
                params["productResulInPolutionname"] = this.$refs.productResulInPolution[0].resultList.join(",");
                params["techResultInPolutionname"] = this.$refs.techResultInPolution[0].resultList.join(",");
                if( params['isProduceWastewater']){
                    if(!params['productTypes']){
                        this.submitDialog = true
                        this.submitMess = '请选择可能产生废水的产品类别';
                        return false
                    }
                    if(!params['crafts']){
                        this.submitDialog = true
                        this.submitMess = '请选择可能产生废水的主要生产工艺';
                        return false
                    }
                }
                 eventBus.bus.emit(eventBus.LIRRLEYULAN,params)
                 this.openperive = true;
            },
            validate(){
                let bool = true;
                for (let i = 0; i < this.formData.length; i++) {
                    switch (this.formData[i].name) {
                        case '单位名称':
                            if(this.formData[i].value=='')  bool = false;
                            this.submitMess = '请输入单位名称！';
                            break;
                        case '单位地址':
                            if(this.formData[i].value=='')  bool = false;
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
                    if(!bool){
                        break;
                    }
                }
            //    if(this.shequ.result.length == 0){
            //        bool = false;
            //        this.submitMess = '请选择社区！';
            //    }

                if(this.resultId == -1){
                    bool = false;
                    this.submitMess = '请选择社区！';
                }
                if(bool){
                    this.submit();
                }else{
                    this.submitDialog = true;
                }
            },
            isAccess(bool){
                if(bool){
                    this.submit();
                }
                this.confirem = false;
            },
            itemSelect(info){
                 this.resultId = info.id;
                 this.gridname = info.cname;
            },
            selectSheQu(item) {
                this.resultId = item.id;
                this.gridname = item.label;
            },
            textFocus(){
                this.$refs.formwrap.className = 'form-wrap transtop';
            },
            textBlur(){
                this.$refs.formwrap.className = 'form-wrap';
            }
        },
        mounted() {
            let height = window.innerHeight;
            this.$refs.formwrap.style.height = height - 64 + 'px';
            //获取数据
            this.getRange();
            this.getProduct();
            this.getSheQu();

            //返回按钮
            document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
        },
        destroyed(){
            document.removeEventListener(eventBus.BACK_BUTTON,this.backToMap,false);
        }
    }
</script>

<style scoped>
    .transtop{
        transform: translateY(-175px);
        -webkit-transform: translateY(-175px);
        transition:  .3s
    }
    .wrap{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 80;
        background-color: #fff;
    }
    .importants{
        color: #FFB400;
        font-size: 16px;
        margin-right: 5px;
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
        background-color: #4BAAF4;
        box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
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

    .form-wrap, .range-wrap {
        width: 100%;
        margin-top: 55px;
        overflow-y: auto;
        transition:  .3s
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

    .mu-text-field {
        margin-bottom: 0px;
        min-height: 33px;
        width: 235px;
    }

    .form-list p {
        width: 100%;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .text-area, .text-radio {
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
    .submit-btn {
        display: block;
        width: 218px;
        height: 42px;
        line-height: 42px;
        margin: 20px auto;
        text-align: center;
        font-size: 18px;
        color: #fff;
        border-radius: 20px;
        background-color: #4BAAF4;
        box-shadow: 0px 4px 7px 0px #C9E1F3;
    } 
</style>
