<template>
  <div>
    <autoForm :formRetureFun=formRetureFun
              :autoFormSuccessParam="autoFormSuccessParam"
              :autoFormSuccessRoute="autoFormSuccessRoute"
              :serviceUrlId="serviceUrlId"
              :title="title"
              :serviceUrl="serviceUrl"
              :formData="form"
              :draftName="draftName"
              :draftId="draftId"
              :draftType='draftType'
    ></autoForm>
  </div>
</template>

<script>

  import autoForm from '../autoForm.vue';
  import {xiaofeishuiData} from '../data/xiaofeishuiData';
  import {formFillTool} from '../tool/FormFillTool';
  import {formDraftTool} from '../tool/FormDraftTool';

  export default {
    components: {
      autoForm
    },
    data(){
      return {
        title: "小废水企业每月一报表",
        serviceUrl: POST_MONTH_HISTORY,
        form: [],
        serviceUrlId: '',
        autoFormSuccessRoute: "dailytask",
        autoFormSuccessParam: {
          title: "每月一巡"
        },
        draftName: "xiaofeishui",
        draftId: "xiaofeishui",
        draftType: '1'
      }
    },
    props: {},
    methods: {
      formRetureFun: function () {
        this.$router.push({name: this.autoFormSuccessRoute, params: this.autoFormSuccessParam});
      }
    },
    computed: {},
    mounted(){
      let formClone = formFillTool.formClone(xiaofeishuiData.xiaofeishuiDataJson.form);
      formFillTool.initForm(formClone, null);
      this.form = formClone;
      this.serviceUrlId = this.$route.params.id;
      this.draftId = this.$route.params.id;
      let draftForm = formDraftTool.getDraftByNameAndId(this.draftName, this.draftId,this.draftType);
      if (draftForm != null) {
        formFillTool.setFormParent(draftForm);
        this.form = draftForm;
      }
      else {
        this.$http.get(GET_MONTHFORM_HISTORY + this.serviceUrlId + '/history').then(res => {
          if (res.body.code == 200) {
            formFillTool.fillForm(formClone, res.body.data);
            this.form = formClone;
          }
        }).catch(err => {
        })
      }
    },
    destroyed(){

    }
  }
</script>

<style>

</style>
