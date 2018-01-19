<template>
  <div v-formValidate="{itemValue:item}" v-show="item.isShow">
    <div :class="item.dictionary.length == 2 && item.dictionary[0].label.length < 4  ? 'form-list':'speall form-list'">
      <span class=" flex-grow"><i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</span>
      <slot v-for="radio in item.dictionary">
        <mu-radio :label="radio.label" :name="item.label" :nativeValue="radio.value" v-model="item.value"
                  @change="radioChange(radio)" class="demo-radio"/>
      </slot>
    </div>
    <div class="text-radio" v-show="getShow">
      <mu-text-field @blur="blurFun" v-model="item.modalValue" hintText="请输入"/>
    </div>
  </div>

</template>

<script>

  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool';

  export default {
    components: {},
    data(){
      return {
          getShow:false,
          value:''
      }
    },
    props: {
      item: {
        type: Object,
        default: function () {
          return {
            formType: 'formRadioText',
            label: '',
            value: '',
            modalValue: '',
            modalCValue: "",
            isRequire: '',
            dictionary: []
          }
        }
      },
    },
    methods: {
      radioChange(radio) {
        if (radio.isText == false) {
          this.getShow = false
          this.item.modalValue = radio.value;
        } else {
          this.getShow = true
          this.item.modalValue = this.value;
        }
        this.item.modalCValue = radio.label;
        eventBus.bus.emit(eventBus.FORM_BLUR, this.item);
      },
      blurFun: function () {
        eventBus.bus.emit(eventBus.FORM_BLUR, this.item);
      },
    },
//    computed: {
//      getShow: {
//        get(){
//          let flag = "";
//          for (let dic of this.item.dictionary) {
//            if (dic.isText == false) {
//              flag = dic.value;
//            }
//          }
//          return this.item.value != flag;
//        },
//      }
//    },
    mounted(){
      if(this.item.modalValue == 'true'){
            this.getShow = true ;
            this.value = this.item.modalValue
      }
      eventBus.bus.addListener(eventBus.AUTO_FORM_SHOW, (obj) => {
        if (formItemShowTool.isShowFormItem(this.item)) {
          this.item.isShow = true;
        } else {
          this.item.isShow = false;
        }
      })
    },
    destroyed(){

    }
  }
</script>

<style lang="less" scoped>
  @import "../../autoForm.less";
</style>
