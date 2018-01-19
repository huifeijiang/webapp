<template>
  <div class="wrap lam">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">{{title}}</span>
      <mu-icon-menu class="alert-right" icon="more_vert" :anchorOrigin="rightTop" :targetOrigin="rightTop">
        <mu-menu-item title="预览" @click="test"/>
        <mu-menu-item title="存草稿" @click = 'addDraft()'/>
      </mu-icon-menu>
      <!--<span class="alert-right" @click="test">预览</span>-->
    </div>
    <div class="nothin"></div>
    <div class="form-wrap" ref="formwrap">
      <slot v-for="(item,index) in formData">
        <component v-bind:is="item.formType" :item="item"></component>
      </slot>
    </div>
    <mu-dialog :open="dialog" title="提示">
      提交成功！
      <mu-flat-button label="确定" slot="actions" primary/>
    </mu-dialog>

    <mu-dialog :open="submitDialog" title="提示">
      {{submitMess}}
      <mu-flat-button label="确定" slot="actions" primary @click="submitDialog = false"/>
    </mu-dialog>

    <autoformPreview :serviceUrlId="serviceUrlId"
                     :autoFormSuccessRoute="autoFormSuccessRoute"
                     :autoFormSuccessParam="autoFormSuccessParam"
                     :isShowSubmit="true"
                     :serviceUrl="serviceUrl"
                     :openyulan="openperive"
                     :draftName="draftName"
                     :draftId="draftId"
    ></autoformPreview>
    <mu-dialog :open="draftFlag" title="提示">
      是否存为草稿
      <mu-flat-button slot="actions" @click="closeDraft()" primary label="取消"/>
      <mu-flat-button slot="actions" @click="submitDraft()" primary label="确定"/>
    </mu-dialog>
    <mu-dialog :open="draftSucFlag" title="提示">
      存草稿成功
      <mu-flat-button label="确定" slot="actions" primary @click="draftOk"/>
    </mu-dialog>
  </div>
</template>

<script>

  import {formDataJson} from './data/canyinData';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import FormText from './formComponents/formText/FormText.vue';
  import FormTextArea from './formComponents/formTextArea/FormTextArea.vue';
  import FormSelect from './formComponents/formSelect/FormSelect.vue';
  import FormRadio from './formComponents/formRadio/FormRadio.vue';
  import FormRadioText from './formComponents/formRadio/FormRadioText.vue';
  import {eventBus} from '../../components/eventBus/eventBus';
  import autoformPreview from './autoformPreview.vue';
  import {formCheckTool} from './tool/FormCheckTool';
  import {formFillTool} from './tool/FormFillTool';
  import {formDraftTool} from './tool/FormDraftTool';
  import FormSocialSelct from './formComponents/formSelect/FormSocialSelct.vue';
  import FormEventList from './formComponents/formEventList/FormEventList.vue';
  import FormSelectText from './formComponents/formSelect/FormSelectText.vue';
  import FormPhotoGraph from './formComponents/formPhotoGraph/FormPhotoGraph.vue';
  import FormDate  from  './formComponents/formDate/FormDate.vue'
  import FormTitle  from  './formComponents/formTitle/formTitle.vue';
  import autoFormDraftList from './autoFormDraftList.vue'
  export default {
    components: {
      formText: FormText,
      formTextArea: FormTextArea,
      formSelect: FormSelect,
      formRadio: FormRadio,
      formRadioText: FormRadioText,
      formSocialSelct: FormSocialSelct,
      formEventList: FormEventList,
      formSelectText: FormSelectText,
      formPhotoGraph: FormPhotoGraph,
      formDate: FormDate,
      formTitle: FormTitle,
      autoformPreview: autoformPreview,
      autoFormDraftList:autoFormDraftList

    },
    data(){
      return {
        rightTop: {horizontal: 'right', vertical: 'top'},
        openperive: false,
        submitDialog: false,
        submitMess: '',
        dialog: false,
        draftFlag: false,
        draftSucFlag: false,
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      serviceUrl: {
        type: String,
        default: ''
      },
      serviceUrlId: {
        type: String,
        default: ''
      },
      formRetureFun: {
        type: Function,

      },
      autoFormSuccessRoute: {
        type: String,
        default: ''
      },
      autoFormSuccessParam: {
        type: Object,
        default: function () {
          return {}
        }
      },

      formData: {
        type: Array,
        default(){
          return [];
        }
      },
      draftName: {
        type: String,
        default: ''
      },
      draftId: {
        type: String,
        default: ''
      },
      draftType: {
        type: String,
        default: ''
      }

    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      backToMap: function () {
        if (this.openperive) {
          this.openperive = false
        } else {
          this.formRetureFun()
        }
      },
      test: function () {
        let result = formCheckTool.check(this.formData);
        if (!result.flag) {
          this.submitMess = result.submitMess;
          this.submitDialog = true;
        } else {
          this.openperive = true;
          formFillTool.isShowUnit(this.formData)
          eventBus.bus.emit(eventBus.LAMPYULAN, this.formData);
        }
      },
      submitDraft(){
        this.draftFlag = false;
        this.draftSucFlag = true;
        //每次存草稿之前都清除上次的草稿
        localStorage.removeItem('draftIdMap');
        //存草稿时上传了本地图片,进行base64转码后继续存草稿
        let imageItem = formFillTool.getPhotoItem(this.formData);
        if (imageItem != null && imageItem.length != 0) {
          let flag = 0;
          let length = imageItem.length;
          let that = this
          function upload(flag, length, imageItem, that) {
            let images = imageItem[flag].modalValue;
            that.changeImageType(images).then(val => {
              imageItem[flag].modalValue = JSON.parse(JSON.stringify(val));
              flag++;
              if (flag < length) {
                upload(flag, length, imageItem, that);
              }
              if (flag == length) {
                formDraftTool.setDraftByNameAndId(that.draftName, that.draftId, that.formData,that.draftType);
                return;
              }
            });
          }
          upload(flag, length, imageItem, that);
        }else{
          formDraftTool.setDraftByNameAndId(this.draftName, this.draftId, this.formData,this.draftType);
        }
      },
      changeImageType(images){
        return this.$http.post(FORM_IMAGE_UPLOAD, {images: images}).then((res) => {
          if (res.body.code == 200) {
            return res.body.data
          }
        }).catch((err) => {
          this.submitDialog = true;
          this.submitMess = err.body.msg
        });
      },
      closeDraft(){
        this.draftFlag = false;
      },
      draftOk(){
        this.draftSucFlag = false;
        if(this.serviceUrlId == ''){
          this.$router.push({name:'draftList',params:{draftname:this.draftName,id:this.draftId,backRoute:this.$route.path}})
        }else{
          return;
        }
      },
      addDraft(){
        this.draftFlag = true;
      },
    },
    computed: {},
    mounted(){
      let height = window.innerHeight;
      this.$refs.formwrap.style.height = height - 64 + 'px';
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
      document.removeEventListener(eventBus.BACK_BUTTON,this.backToMap,false);
    }
  }
</script>

<style lang="less" scoped>
  @import './autoForm.less';
</style>
