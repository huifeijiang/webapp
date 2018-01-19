<template>
  <div>
    <autoForm :title="title"
              :formRetureFun=formRetureFun
              :autoFormSuccessRoute="autoFormSuccessRoute"
              :serviceUrl="serviceUrl"
              :formData="form"
              :draftName="draftName"
              :draftId="draftId"
    ></autoForm>
  </div>
</template>

<script>

  import autoForm from '../autoForm.vue';
  import {xiaosanluanwuData} from '../data/shixiaoshanlw';
  import {formFillTool} from '../tool/FormFillTool';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {formDraftTool} from '../tool/FormDraftTool';

  export default {
    components: {
      autoForm
    },
    data(){
      return {
        title: "市小散乱污",
        serviceUrl: POST_WATER_DATA_NEW,
        form: [],
        autoFormSuccessRoute: "newlittleEvent",
        draftName: "shilittlePage",
        draftId: "shilittlePage",
        draftType:'n'
      }
    },
    props: {},
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      formRetureFun: function () {
        let searchid = this.$route.params.id;
        if(searchid){
          this.$router.push({name:'fuzzySearch',params:{backroute:this.$route.name}});
        }else{
          this.setMapShow(true);
          this.$router.push({name:'home',params:{name:true}});
        }
      }
    },
    computed: {},
    mounted(){
      let formClone = formFillTool.formClone(xiaosanluanwuData.xiaosanluanwuDataJson.form);
      formFillTool.initForm(formClone, null);
      let searchid = this.$route.params.id;
      //直接从草稿箱
      let itemId = this.$route.params.itemId;
      if(itemId){
        //市表单
        let draftForm = formDraftTool.getDraftByNameAndId(this.draftName,itemId,this.draftType);
        if(draftForm != null){
          formFillTool.setFormParent(draftForm);
          this.form = draftForm;
        }
      }
      else if (searchid) {
        this.$http.get(GET_FUZZY_DETAIL + searchid + '/details').then(res => {
          if (res.body.code == 200) {
            formFillTool.fillForm(formClone, res.body.data);
            this.form = formClone;
          }
        })
      }
      else {
        this.form = formClone;
      }
    },
    destroyed(){

    }
  }
</script>

<style>

</style>
