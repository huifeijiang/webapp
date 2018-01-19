<template>
    <div v-show="item.isShow">
      <div  class="form-list" @click="showBottomSheetAct(item)">
         <span class="flex-grow">{{item.label}}</span>
        <span class="text-right">{{item.modalCValue}}</span>
        <i class="mu-icon material-icons">chevron_right</i>
      </div>
      <bottom-sheet :changeItem="change" v-model="bottomSheetVmodel"></bottom-sheet>
    </div>
</template>

<script>

  import bottomSheet  from '../../../bottomSheet/bottomSheet.vue';
  import {eventBus} from '../../../../components/eventBus/eventBus';

	export default {
		components: {
      bottomSheet

    },
		data(){
			return {
        bottomSheetVmodel:{
          show:false
        },

      }
		},
		props: {

      item:{
        type:Object,
        default: function () {
          return {
            formType:'formSelect',
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

      showBottomSheetAct(item){
        item.show = true;
        this.bottomSheetVmodel = Object.assign({},item);
        this.bottomSheetVmodel.radios = item.dictionary;

      },
      change(selectitem){
         this.item.modalValue = selectitem.value;
         this.item.modalCValue = selectitem.label;
         eventBus.bus.emit(eventBus.AUTO_FORM_SHOW,this.item);

      }
    },
		computed: {

    },
		mounted(){

		},
		destroyed(){

		}
	}
</script>

<style  lang="less" scoped>
  @import  "../../autoForm.less";

</style>
