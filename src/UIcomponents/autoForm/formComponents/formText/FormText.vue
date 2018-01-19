<template>
  <div v-formValidate="{itemValue:item}" v-show="item.isShow" class='form-list'>
    <span><i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</span>
    <div class="inliblock">
        <mu-text-field class="little-text"  @blur="blurFun"   v-model="item.modalValue" hintText="请输入" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool';

	export default {
		components: {


    },
		data(){
			return {

      }
		},
		props: {

      item:{
        type:Object,
        default: function () {
          return {
          	formType:'formText',
            label:'',
            modalValue:'',
            isRequire:''

          }
        }
      },
    },
		methods: {
      blurFun:function () {
         if(this.item.formName != undefined){
           eventBus.bus.emit(eventBus.FORM_BLUR,this.item);
         }

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
