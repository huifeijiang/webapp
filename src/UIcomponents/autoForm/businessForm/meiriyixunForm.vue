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
    ></autoForm>
  </div>
</template>

<script>
  import autoForm from '../autoForm.vue';
  import {meiriyixunData} from '../data/meiriyixunData';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {formFillTool} from '../tool/FormFillTool';
  import {formDraftTool} from '../tool/FormDraftTool';
  export default {
    components: {
      autoForm
    },
    data(){
      return {
        title: "日常巡查",
        serviceUrl: POST_HC_TASKDTAIL,
        form: [],
        autoFormSuccessRoute: "dailytask",
        serviceUrlId: '',
        autoFormSuccessParam: {
          title: "每日一巡"
        },
        draftName: "meiriyixun",
        draftId: "",
        draftType: '1'
      }
    },
    props: {},
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      formRetureFun: function () {
        this.$router.push({name: this.autoFormSuccessRoute, params: this.autoFormSuccessParam});
      }
    },
    computed: {},
    mounted(){
      let formClone = formFillTool.formClone(meiriyixunData.meiriyixunDataJson.form);
      this.serviceUrlId = this.$route.params.id;
      formFillTool.initForm(formClone, null);
      this.draftId = this.$route.params.id;
      let draftForm = formDraftTool.getDraftByNameAndId(this.draftName, this.draftId,this.draftType);
      if (draftForm != null) {
        formFillTool.setFormParent(draftForm);
        this.form = draftForm;
      } else {
        if (this.serviceUrlId) {
          this.$http.get(GET_QIYE_AUTOFILL + this.serviceUrlId + '/history').then(res => {
            if (res.body.code == 200) {
              formFillTool.fillForm(formClone, res.body.data);
              this.form = formClone;
            }
          }).catch(err => {
          })
        } else {
          this.form = formClone
        }
      }

    },
    destroyed(){

    }
  }
</script>

<style>

</style>
