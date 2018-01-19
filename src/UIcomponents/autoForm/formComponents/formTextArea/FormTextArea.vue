<template>
    <div v-formValidate="{itemValue:item}" v-show="item.isShow" class="form-list flex-clo">
      <p id="textArea"><i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</p>
      <div class="text-area">
        <mu-text-field   v-model="item.modalValue" @blur="blurFun" :hintText="'请输入'" class="text-area-flied" multiLine :rows="3" :rowsMax="3" />
      </div>
    </div>
</template>

<script>
  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool'

	export default {
		components: {},
		data(){
			return {}
		},
		props: {
      item:{
        type:Object,
        default: function () {
          return {
            formType:'formTextArea',
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

<style lang="less" scoped>
  @import  "../../autoForm.less";
</style>
