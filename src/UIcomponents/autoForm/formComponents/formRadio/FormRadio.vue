<template>
  <div v-show="item.isShow" v-formValidate="{itemValue:item}"
       :class="item.dictionary.length == 2 && item.dictionary[0].label.length < 4  ? 'form-list':'speall form-list'">
   <span class="flex-grow"> <i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</span>
    <slot v-for="radio in item.dictionary">
      <mu-radio :label="radio.label" :name="item.label" :nativeValue="String(radio.value)" v-model="item.modalValue" @change="radioChange(radio)" class="demo-radio" />
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">


  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool';

	export default {
		components: {},
		data(){
			return {


      }
		},
		props: {

      item:{
        type:Object,
        default: function () {
          return {
            formType:'formRadio',
            value:'',
            label:'',
            modalValue:'',
            modalCValue: "",
            isRequire:'',
            dictionary:[],
          }
        }
      },
    },
		methods: {
      radioChange(radio) {
        this.item.modalValue = radio.value;
        this.item.modalCValue = radio.label;
        eventBus.bus.emit(eventBus.AUTO_FORM_SHOW,this.item);
        eventBus.bus.emit(eventBus.FORM_BLUR,this.item);
      }
    },
		computed: {},
		mounted(){
        eventBus.bus.addListener(eventBus.AUTO_FORM_SHOW,(obj)=>{
          if(formItemShowTool.isShowFormItem(this.item)) {
          this.item.isShow = true;
        }else{
          this.item.isShow = false;
        }
      })

		},
		destroyed(){

		}
	}
</script>

<style  lang="less" scoped>
  @import  "../../autoForm.less";
</style>
