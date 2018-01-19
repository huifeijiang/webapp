<template>
  <mu-drawer class="step-alert ffff" right :open="openyulan">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" v-show='!isShowSubmit'/>
      <span class="alert-left" @click="backToMap" v-show='isShowSubmit'>返回</span>
      <span class="alert-title" v-if='isShowSubmit'>预览</span>
      <span class="alert-title" v-if='!isShowSubmit'>{{title}}</span>
    </div>
    <div class='event-detail-container'>
      <div class="step-content">
        <div v-show="item.isShow&&!item.noParent" v-for="item in formData" class="user-list">
          <span v-show="item.formType != 'formPhotoGraph'">{{item.label}}</span>
          <p v-if="item.formType == 'formRadio'
          || item.formType == 'formSelect' || item.formType == 'formSocialSelct' || item.formType == 'formSelectText' || item.formType == 'formEventList'"
             :class='differ'>
            <span>{{item.modalCValue}}</span>
          </p>
          <slot v-if="item.formType == 'formPhotoGraph'&&item.noParent == false">
            <div class="done-img" v-for="imgSrc in item.modalValue">
              <img :src="imgSrc">
            </div>
          </slot>
          <p v-if="item.formType == 'formTextArea'" :class='differ'>
            <span>{{item.modalValue}}</span>
          </p>
          <p v-if="item.formType == 'formText'||item.formType == 'formDate'" :class='differ'>
            <span>{{item.modalCValue}}</span>
          </p>
          <p v-if="item.value == item.modalValue && item.formType == 'formRadioText'" :class='differ'>
            <span>{{item.modalCValue}}</span>
          </p>
          <p v-if="item.value != item.modalValue && item.formType == 'formRadioText'" :class='differ'>
            <span>{{item.modalValue}}</span>
          </p>
        </div>
        <slot v-for="item in formData">
          <div v-if="item.formType == 'formPhotoGraph'&&item.noParent == true">
            <p class="picLabel">处理图片详情</p>
            <div class="done-img" v-for="imgSrc in item.modalValue">
              <img :src="imgSrc">
            </div>
          </div>
        </slot>
        <a href="javascript:;" v-if="isShowSubmit" class="submit-btn" @click="show">提交表单</a>
        <div class="slot-fit">
          <slot name="foot"></slot>
        </div>
      </div>
    </div>
    <mu-dialog :open="confirem" title="提示">
      提交后则无法修改！
      请确认是否提交？
      <mu-flat-button slot="actions" @click="close()" primary label="取消"/>
      <mu-flat-button slot="actions" @click="submit()" primary label="确定"/>
    </mu-dialog>
    <mu-dialog :open="submitDialog" title="提示">
      {{submitMess}}
      <mu-flat-button label="确定" slot="actions" primary @click="toeEvent"/>
    </mu-dialog>
  </mu-drawer>
</template>
<script>
  import {eventBus} from '../../components/eventBus/eventBus';
  import headDom from '../../UIcomponents/header/head';
  import {formFillTool} from './tool/FormFillTool';
  import {formType} from './tool/FormType';
  import {formDraftTool} from './tool/FormDraftTool';
  import {mapGetters, mapActions, mapState} from 'vuex';
  export default {
    components: {
      headDom
    },
    data() {
      return {
        submitDialog: false,
        submitMess: '',
        confirem: false,
        formData: [],
        differ: 'spanStyle',
      }
    },
    props: {
      openyulan: {
        type: Boolean,
        default: false
      },
      serviceUrl: {
        type: String,
        default: ''
      },
      serviceUrlId: {
        type: String,
        default: ''
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
      isShowSubmit: {
        type: Boolean,
        default: true
      },
      draftName: {
        type: String,
        default: ''
      },
      draftId: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      backId:{
          type:String,
          default:''
      }
    },
    created() {
      if (this.title == '环保主任事件详情') {
        this.differ = 'spanQY'
      }
      eventBus.bus.on(eventBus.LAMPYULAN, (data) => {
          this.formData = data;
      })
    },
    mounted(){
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    methods: {
      backToMap() {
       if(this.backId){
           this.$router.push('/home/qiyeReport')
       }else{
          this.$parent.openperive = false;
       }
      },
      close() {
        this.confirem = false
      },
      show() {
        this.confirem = true
      },
      getRadioTextShowTrue(item){
        let flag = false;
        let _dic = {};
        for (let dic of item.dictionary) {
          if (dic.isText == false) {
            _dic = dic;
          }
        }
        if (_dic.value == item.modalValue) {
          flag = true;
        }
        return flag;
      },
      submit() {
        let imageItem = formFillTool.getPhotoItem(this.formData);
        if (imageItem != null && imageItem.length != 0) {
          let flag = 0;
          let length = imageItem.length;
          let that = this
          //递归提交图片
          function upload(flag, length, imageItem, that) {
            let images = imageItem[flag].modalValue;
            if(String(images).indexOf('base64') != -1){
              that.changeImageType(images).then(val => {
                imageItem[flag].modalValue = JSON.parse(JSON.stringify(val));
                flag++;
                if (flag < length) {
                  upload(flag, length, imageItem, that);
                }
                if (flag == length) {
                  that.formSubmitHandle();
                  return;
                }
              });
            }else{
              that.formSubmitHandle();
            }
          }
          upload(flag, length, imageItem, that);
        } else {
          this.formSubmitHandle();
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
      formSubmitHandle(){
        let submitObj = formFillTool.formSubmit(this.formData);
        formFillTool.formSetLongitude(submitObj, this.getLongitude, this.getLatitude);
        let newUrl = this.serviceUrl;
        if (this.serviceUrlId != '') {
          newUrl = newUrl + this.serviceUrlId;
        }
        this.$http.post(newUrl, submitObj).then((res) => {
          if (res.body.code == 200) {
            this.confirem = false
            this.submitDialog = true;
            this.submitMess = "提交成功";
            formDraftTool.removeDraftByNameAndId(this.draftName, this.draftId);
          }else{
            this.submitDialog = true;
            this.submitMess = '网络异常,请稍后重试!'
          }
        }).catch((err) => {
          this.submitDialog = true;
          this.submitMess = err.body.msg
        });
      },
      toeEvent(){
        if (this.autoFormSuccessRoute != "") {
          this.$router.push({name: this.autoFormSuccessRoute, params: this.autoFormSuccessParam});
        } else {
          this.submitDialog = false;
        }
      }
    },
    computed: {
      ...mapGetters({
        getLatitude: 'getLatitude',
        getLongitude: 'getLongitude',
      }),
    },
  }

</script>
<style scoped>
  .step-alert {
    width: 100%;
    z-index: 220;
  }

  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    z-index: 80;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }

  .alert-title {
    font-size: 18px;
  }

  .event-detail-container {
    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
    height: 100%;
  }

  .step-content {
    height: 100%;
    overflow: auto;
    padding-top: 55px;
    background: #fff;
  }

  .user-list {
    display: flex;
    width: 94%;
    margin: 0 auto;
    color: #6a6e7b;
    font-size: 14px;
    padding: 10px 0;
    border-top: 1px solid #efefef;
    align-items: center;
    justify-content: space-between;
  }

  .picLabel {
    margin: 0 auto;
    font-size: 16px;
    font-weight: 400;
    padding: 0 18px;
    height: 35px;
    line-height: 35px;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #ccc;
    background-color: #efefef;
  }

  .done-img {
    width: 100%;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
  }

  .done-img img {
    display: block;
    width: 100%;
    display: flex;
    padding: 6px 3px;
  }

  .submit-btn {
    display: block;
    width: 218px;
    height: 42px;
    line-height: 42px;
    margin: 20px auto;
    text-align: center;
    font-size: 18px;
    color: #fff;
    border-radius: 20px;
    background-color: #4BAAF4;
    box-shadow: 0px 4px 7px 0px #C9E1F3;
  }

  .spanStyle {
    width: 64%;
    display: flex;
    justify-content: flex-end;
  }

  .spanQY {
    width: 53%;
    display: flex;
    justify-content: flex-end;
  }

  .spanStyle span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .slot-fit {
    width: 100%;
    margin-top: 20px;
  }
</style>
