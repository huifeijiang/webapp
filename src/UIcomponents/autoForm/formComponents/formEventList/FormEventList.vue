<template>
  <div v-formValidate="{itemValue:item}" v-show="item.isShow" >
    <eventList
      :modalValue="item.modalValue"
      :servicesUrl="item.selfDefine.serviceUrl"
      :selectMore="item.selfDefine.selectMore"
      :listTitle="item.label"
      @selectedMore="getProdResult"
      @selected='getResult'
      :isRquired='item.isRequire'
      ></eventList>
  </div>

</template>

<script type="text/ecmascript-6">

  import eventList from '../../../../components/eventReport/eventList.vue';
  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool';

	export default {
		components: {
      eventList
    },
		data(){
			return {}
		},
		props: {
      item:{
        type:Object,
        default: function () {
          return {
            formType:'formEventList',
            value:'',
            label:'',
            modalValue:'',
            modalCValue: "",
            isRequire:'',
            selfDefine:{
              selectMore:true,
              serviceUrl:"",
            },
            dictionary:[],
          }
        }
      },
    },
		methods: {
      getProdResult(type,result,resultList){
         this.item.modalValue = result.join(',');
         this.item.modalCValue = resultList.join(',');
         if(this.item.formName != undefined){
          eventBus.bus.emit(eventBus.FORM_BLUR,this.item);
         }
      },
      getResult (type,result) {
        this.item.modalValue = result.id;
        this.item.modalCValue = result.name;
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

<style>

</style>
