<template>
  <div class='huanbaoreport'>
    <autoForm :title="title"
              :formRetureFun=formRetureFun
              :autoFormSuccessRoute="autoFormSuccessRoute"
              :serviceUrl="getServiceUrl"
              :serviceUrlId='serviceUrlId'
              :formData="form"
              :draftName="draftName"
              :draftId="draftId"
    ></autoForm>
    <mu-dialog :open="show" title='填报方式'  dialogClass='huanbaodialog' ref='huanbaodialog'>
      <img src='../../../../static/v2images/ic-close-x.png' @click='closeDialog'></img>
      <div class='base-div' @click="toggle(item)" v-for='item in threeWay' :key='item.type'
           :class='{active:item.active}'>{{item.title}}
      </div>
    </mu-dialog>
  </div>
</template>

<script>

  import autoForm from '../autoForm.vue';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {huanbanzhurenData} from '../data/huanbaozhuren.js';
  import {formFillTool} from '../tool/FormFillTool';
  import {formDraftTool} from '../tool/FormDraftTool';
  import {formItemShowTool} from '../tool/FormItemShowTool';
  import alert from '../../alert/alert.vue';
  import {eventBus} from '../../../components/eventBus/eventBus';
  export default {
    components: {
      autoForm,
      alert
    },
    data(){
      return {
        title: "环保主任上报表单",
        serviceUrl: POST_HUANBAOZHUREN_REPORT,
        serviceUrlId: '',
        form: [],
        autoFormSuccessRoute: "huanbaozhurenEvent",
        draftName: "huanbaozhurenEvent",
        draftId: "huanbaozhurenEvent",
        draftType: '1',
        show: false,
        id: '',
        threeWay: [
          {
            title: '重新填报表单',
            type: 1,
            active: false,
          },
          {
            title: '进入上次草稿',
            type: 2,
            active: false,
          },
          {
            title: '导入历史数据',
            type: 3,
            active: false,
          },
        ]
      }
    },
    computed: {
      getServiceUrl() {
        return this.serviceUrl + this.id + '/reported?x=';
      }
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      //弹窗选择出发对应的函数
      toggle(item){
        for (let key of this.threeWay) {
          key.active = false;
        }
        item.active = true;
        if (item.type == 1) this.newReport();item.active = false;
        if (item.type == 2) this.toDraft();item.active = false;
        if (item.type == 3) this.getData();item.active = false;
      },
      //新上报
      newReport(){
        this.show = false;
      },
      //上次草稿
      toDraft(){
        this.show = false
        this.draftId = this.$route.params['id'];
        let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
        formFillTool.initForm(formClone, null);
        let draftForm = formDraftTool.getDraftByNameAndId(this.draftName, this.draftId, this.draftType);
        if (draftForm != null) {
          formFillTool.setFormParent(draftForm);
          this.form = draftForm;
        } else {
          this.form = formClone;
        }
      },
      //历史填充
      getData() {
        this.show = false
        this.$http.get(POST_HUANBAOZHUREN_REPORT + this.id + '/history').then((res) => {
          let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
          delete res.body.data.datetime;
          let obj = res.body.data;
          //填充表单
          formFillTool.fillForm(formClone, obj);
          //初始化父子关系
          formFillTool.initForm(formClone);
          //设置父子关系展示
          formItemShowTool.setShowByParent(formClone);
          //抛出详情展示事件
          eventBus.bus.emit(eventBus.LAMPYULAN, formClone);
          this.form = formClone;
        }).catch(err => {
        })
      },
      //返回键
      formRetureFun: function () {
        this.setMapShow(true);
        this.$router.push({name: 'home', params: {name: true}});
      },
      //关闭弹窗
      closeDialog(){
        this.show = false;
        return;
      },
    },
    mounted(){
      let load = this.$route.params.load;
      this.draftId = this.$route.params.id;
      this.id = this.$route.params.id;
      this.serviceUrlId = this.$route.params.id;
      //初始化一张新表单
      let formClone = formFillTool.formClone(huanbanzhurenData.huanbanzhurenDataJson.form);
      formFillTool.initForm(formClone, null);
      this.form = formClone;
      //进入后自动开启选择弹窗
      if (load === true) {
        this.show = true;
      }
    },
    destroyed(){}
  }
</script>

<style scoped>
  .huanbaodialog img{
    position:absolute;
    left:50%;
    bottom:-43px;
    margin-left:-12px;
  }
  .base-div {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #efefef;
  }
  .base-div.active {
    color:#fff;
    background-color: #4baaf4;
  }
</style>
