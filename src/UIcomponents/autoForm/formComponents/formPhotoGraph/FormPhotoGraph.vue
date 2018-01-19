<template>
  <div v-show="item.isShow" class='form-list'>
    <PhotoGraph :imagesId='item.formName' :imageValue='modalValue'></PhotoGraph>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoGraph from '../../../photoGraph/PhotoGraph.vue';
  import {eventBus} from '../../../../components/eventBus/eventBus';
  import {formItemShowTool} from '../../tool/FormItemShowTool';
  export default {
    components: {
      PhotoGraph
    },
    data(){
      return {
        modalValue:[]
      }
    },
    props: {
      item: {
        type: Object,
        default: function () {
          return {
            formType: 'formPhotoGraph',
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
    watch:{
      item(val){
        if( val.isShow && (val.modalValue.length != 0)){
         this.modalValue = val.modalValue
        }
      }
    },
    methods: {
      addImageList: function (imageList, imageid) {
        if (this.item.formName == imageid) {
          this.item.modalValue = [];
          for (let key in imageList) {
            let item = imageList[key];
            let type = item.type;
            if (type === "plus") {
              continue;
            }
            this.item.modalValue.push(item.src);
          }
        }
      },
    },
    mounted(){
      eventBus.bus.addListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
      eventBus.bus.addListener(eventBus.PHOTOGRAPH_DELETE, this.addImageList);
      eventBus.bus.addListener(eventBus.AUTO_FORM_SHOW, (obj) => {
        if (formItemShowTool.isShowFormItem(this.item)) {
          this.item.isShow = true;
        } else {
          this.item.isShow = false;
        }
      })
    },
    destroyed(){
      eventBus.bus.removeListener(eventBus.PHOTOGRAPH_IMAGE, this.addImageList);
    }
  }
</script>

<style scoped>

</style>
