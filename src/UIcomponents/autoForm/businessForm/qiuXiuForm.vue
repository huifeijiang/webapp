<template>
  <div>
    <autoForm :title="title"
              :formRetureFun=formRetureFun
              :autoFormSuccessRoute="autoFormSuccessRoute"
              :serviceUrl="serviceUrl"
              :formData="form"
              :draftName="draftName"
              :draftId="draftId"
    >
    </autoForm>
  </div>
</template>

<script>

  import autoForm from '../autoForm.vue';
  import {qixiuData} from '../data/qixiuData';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {formFillTool} from '../tool/FormFillTool';
  import {formDraftTool} from '../tool/FormDraftTool';

  export default {
    components: {
      autoForm
    },
    data(){
      return {
        title:"汽修汽车",
        serviceUrl:POST_CAR_REPORT,
        form:[],
        autoFormSuccessRoute:"careevent",
        draftName:"careevent",
        draftId:"careevent",
        draftType:'n'
      }
    },
    props: {},
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      formRetureFun:function () {
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
      let formClone = formFillTool.formClone(qixiuData.qixiuDataJson.form);
      formFillTool.initForm(formClone,null);
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
      else if(searchid){
        this.$http.get(GET_FUZZY_DETAIL + searchid+'/details').then(res => {
          if (res.body.code == 200){
          let data = {}
          for(let key in res.body.data){
            if(key.includes('cre')){
              let newKey = key.slice(3);
              newKey = newKey.substring(0,1).toLowerCase() + newKey.substring(1);
              data[newKey] = res.body.data[key];
            }
          }
          formFillTool.fillForm(formClone,data);
          this.form = formClone;
        }
      })
      }
      else{
        this.form = formClone;
      }

    },
    destroyed(){

    }
  }
</script>

<style>

</style>
