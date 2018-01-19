<template>
  <div class='draftlist'>
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">草稿箱</span>
    </div>
    <div class="event-title">
      <span class='base sp1'>序号</span>
      <span class='base name1'>企业名称</span>
      <span class='base datetime1'>时间</span>
      <span class='base sp2'>操作</span>
    </div>
    <div class="event-wrap aadd" ref="eventwrap">

      <div class="event-list" v-for="(item,index) in draftList" :key='index' >
        <div @click='report(item)'>
          <span class='base sp'>{{index+1}}</span>
          <span class='base name'>{{item.enterpriseName}}</span>
          <span class='base datetime'>{{item.dateTime}}</span>
        </div>
        <span class='base del' @click="deleteDraft(index,item.guid)">删除</span>
      </div>
    </div>
    <autoformPreview :isShowSubmit="false" :openyulan="openperive"></autoformPreview>
    <mu-dialog :open="draftFlag" title="提示">
      确定删除?
      <mu-flat-button slot="actions" @click="draftFlag = false" primary label="取消"/>
      <mu-flat-button slot="actions" @click="sure()" primary label="确定"/>
    </mu-dialog>
  </div>
</template>
<script>
  import {formDraftTool} from  './tool/FormDraftTool';
  import {formFillTool} from './tool/FormFillTool';
  import autoformPreview from './autoformPreview.vue'
  import {
    dateTool
  } from '../../gisComponets/tool/DateTool.js';
 import {mapGetters, mapActions, mapState} from 'vuex';
  import {routeCodeTool} from '../../components/CodeRouteTool';

  export default{
    data(){
      return {
        draftList: [],
        openperive: false,
        draftFlag: false,
        index:null,
        guid:null,
        backroute:''
      }
    },
    components: {
      autoformPreview
    },
    mounted(){
      this.getDraft();
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow'
      }),
      deleteDraft(index,guid){
        this.draftFlag = true;
        this.guid = guid;
        this.index = index
      },
      getDraft(){
        let draftId = this.$route.params.id;
        let draftName = this.$route.params.routeName;
        if(!draftName){
          draftName = this.$route.params.draftname
        } else{
          draftName = this.$route.params.routeName;
        }
        let obj = formDraftTool.getDraftByNameAndId(draftName,draftId);
        for (let item in obj){
          let resultObj = {}
          resultObj.dateTime = dateTool.toDate(new Date(Number(item.split('-')[1])), 'yyyy.MM.dd hh:mm:ss');
          resultObj.guid = item;
          for(let key of obj[item]){
            if(key.formName == 'enterpriseName'){
              resultObj['enterpriseName'] = key.modalValue;
            }
          }
          this.draftList.push(resultObj);
        }
      },
      sure(){
        this.draftFlag = false;
        let draftname = this.$route.params.draftname;
        let draftName = this.$route.params.routeName;
        if(draftname){
          formDraftTool.removeDraftByNameAndId(draftname, this.guid);
        }
        else if(draftName){
          formDraftTool.removeDraftByNameAndId(draftName, this.guid);
        }
        this.draftList.splice(this.index, 1);
      },
      report(item){
        let toRoute = this.$route.params.toRoute;
        if(toRoute){
          this.$router.push({name: toRoute, params: {itemId: item.guid}});
        }
      },
      backToMap(){
        if (this.$route.params.backRoute) {
          let backRoute = this.$route.params.backRoute.split('/')[2];
          this.$router.push({name: backRoute, params: {item: backRoute}});
        } else {
          this.setMapShow(true);
          this.$router.push({name: 'home', params: {name: true}});
        }
      }
    }
  }
</script>
<style scoped lang='less'>
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8EB4D3;
    z-index: 50;
    box-shadow: 0 2px 4px 0px rgba(142, 180, 211, .5);
    color: #fff;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-title {
    font-size: 20px;
  }

  .draftlist {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 80;
    background: #fff;
  }
  .datetime {
    width: 30%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }

  .event-title {
    width: 100%;
    position: fixed;
    top: 56px;
    z-index: 50;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
    background: #fff;
  }

  .event-wrap {
    width: 100%;
    overflow-y: auto;
    height:100%;
    padding-top:96px;
  }

  .event-list {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
    padding: 10px 1%;
  }
  .event-list div{
    width:100%;
  }
  .base {
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }

  .sp {
    width: 10%;
  }

  .name {
    width: 40%;
  }

  .datetime {
    width: 45%;
  }
  .del{
    width: 20%;
    color:#fff;
    background:#2196f3;
    padding:6px 10px;
  }
  .sp1 {
    width: 15%;
  }

  .name1 {
    width: 30%;
  }

  .datetime1 {
    width: 40%;
  }
  sp2{
    width: 20%;
  }

</style>
