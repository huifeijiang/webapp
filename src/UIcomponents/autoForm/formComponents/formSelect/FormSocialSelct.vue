<template>
  <div v-show="item.isShow" v-formValidate="{itemValue:item}">
    <SocialSelect :modalValue="item.modalValue"  @itemSelect="itemSelect"> </SocialSelect>
  </div>
</template>

<script>

  import SocialSelect from  '../../../socialSelect/SocialSelect.vue';
  import {eventBus} from  '../../../../components/eventBus/eventBus'
  import {formItemShowTool} from '../../tool/FormItemShowTool';
  export default {
    components: {
      SocialSelect
    },
    data(){
      return {}
    },
    props: {
      item:{
        type:Object,
        default: function () {
          return {
            formType:'formSocialSelect',
            label:'',
            value:'',
            modalValue:'',
            modalCValue: "",
            isRequire:'',
            dictionary:[]

          }
        }
      },

    },
    methods: {
      itemSelect(info) {
        this.item.modalCValue = info.cname;
        this.item.modalValue = info.id;
        if(this.item.formName != undefined){
          eventBus.bus.emit(eventBus.FORM_BLUR,this.item);
        }
      },

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

<style>

</style>
