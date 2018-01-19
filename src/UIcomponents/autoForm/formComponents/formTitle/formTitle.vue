<template>
  <div v-formValidate="{itemValue:item}" v-show="item.isShow" class='form-list formtitle'>
    <span><i v-if="item.isRequire" class='icon-color'>*</i>{{item.label}}</span>
  </div>
</template>

<script>
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
            formType:'formTitle',
            label:'',
          }
        }
      },
    },
    methods: {},
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
