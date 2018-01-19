<template>
  <div v-formValidate="{itemValue:item}" v-show="item.isShow">
    <div  class="form-list" @click="showBottomSheetAct(item)">
      <span class="flex-grow"><i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</span>
      <span class="text-right">{{item.modalCValue}}</span>
      <i class="mu-icon material-icons">chevron_right</i>
    </div>
    <buttonSheetText :changeItem="change" v-model="bottomSheetVmodel"></buttonSheetText>
  </div>
</template>

<script>

  import buttonSheetText from '../../../bottomSheet/buttonSheetText.vue';
  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool';

  export default {
    components: {
      buttonSheetText
    },
    data(){
      return {
        bottomSheetVmodel: {
          show: false
        },
      }
    },
    props: {
      item: {
        type: Object,
        default: function () {
          return {
            formType: 'formSelectText',
            value: '',
            label: '',
            modalValue: '',
            modalCValue: "",
            isRequire: '',
            selfDefine: {
              selectMore: true,
            },
            dictionary: [],
          }
        }
      },
    },
    methods: {
      showBottomSheetAct(item){
        item.show = true;
        this.bottomSheetVmodel = Object.assign({}, item);
      },
      change(model){
        let newModalValue = "";
        let newModalCValue = "";
        for (let modelitem of model.dictionary) {
          if (modelitem.isActive) {
            if (modelitem.isText) {
                if(modelitem.text){
                  if (modelitem.label.indexOf('(') != -1) {
                    let unit = modelitem.label.split('(')[1].split(")")[0];
                    newModalCValue += modelitem.label + modelitem.text + unit + ",";
                  }else{
                    newModalCValue += modelitem.label + modelitem.text+",";
                  }
                }
                newModalValue += modelitem.value +'-'+ modelitem.text + ",";
            } else {
              newModalCValue += modelitem.label + ",";
              newModalValue += modelitem.value + ",";
            }
          }
        }
        if (newModalValue != "") {
          newModalValue = newModalValue.substring(0, newModalValue.length - 1);
          newModalCValue = newModalCValue.substring(0, newModalCValue.length - 1);
        }
        this.item.modalValue = newModalValue;
        this.item.modalCValue = newModalCValue;
        eventBus.bus.emit(eventBus.AUTO_FORM_SHOW, this.item);
        if (this.item.formName != undefined) {
          eventBus.bus.emit(eventBus.FORM_BLUR, this.item);
        }
      }
    },
    computed: {},
    mounted(){
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

<style scoped>
  @import  "../../autoForm.less";
</style>
