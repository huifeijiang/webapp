<template>
  <div class="tasklist">
    <div v-show="isadmin">
      <div class="portal-head1">
        <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
        <span class="alert-title">流程办理列表</span>
        <span></span>
      </div>
      <div class="nothin"></div>
    </div>
    <div class="processtable">
      <mu-table  :showCheckbox="false" :fixedHeader='true'>
        <mu-thead>
          <mu-tr>
            <mu-th>流程定义名称</mu-th>
            <mu-th>发起时间</mu-th>
            <mu-th>办理人</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for='(item,index) in tasklist' :key='index'>
            <mu-th>{{item.name}}</mu-th>
            <mu-th>{{item.createTime}}</mu-th>
            <mu-th>{{item.assignee}}</mu-th>
            <mu-th v-if='item.assignee==null'>
              <mu-flat-button label="签收" class="demo-flat-button" secondary @click='assign(item.id)'/>
            </mu-th>
            <mu-th v-if='item.assignee!=null'>
              <span  class='bl' @click.prevent='assigned(item.id)'>办理</span>
              <span  @click.prevent='fassigned(item.id)'>反签收</span>
            </mu-th>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <mu-dialog :open="dialogqs">
      <p  class='sp'>流程已签收</p>
    </mu-dialog>
    <banliprocess :opened='openperive' :ided='id'></banliprocess>
  </div>
</template>
<script type='es6'>
  import {mapGetters, mapActions, mapState } from 'vuex';
  import {dateTool} from '../../gisComponets/tool/DateTool.js';
  import socialSelect from '../../UIcomponents/socialSelect/SocialSelect.vue';
  import { getPosition } from '../corSys/position';
  import banliprocess from './banliprocess.vue';
  import {eventBus} from '../eventBus/eventBus.js'
  export default{
    data(){
      return {
        isadmin: true,
        dialogqs: false,
        tasklist: [],
        openperive:false,
        id:'',
        dataInfo:{}
      }
    },
    components: {
      banliprocess,
      socialSelect,
    },
    mounted(){
      this.getTask();
      eventBus.bus.on('backToTasklist',val=>{
        if(val){
          this.getTask();
        }
      })
    },
    methods: {
      ...mapActions({
         setMapShow: 'setMapShow',
      }),
      getTask(){
        this.$http.post(POST_LIST + '/activiti/water/task/list').then(res=> {
          if (res.body.code == 200) {
            let data = res.body.data;
            data.forEach((val, index)=> {
              let date = new Date(val.createTime)
              val.createTime = dateTool.toDate(date, 'yy/MM/dd hh:mm:ss');
            })
            this.tasklist = data;
          }
        })
      },
      assign(id){
        this.dialogqs = true
        this.$http.post(POST_LIST + '/activiti/water/task/claim/' + id).then(res=> {
          if (res.body.code == 200) {
            let _this = this;
            setTimeout(() => {
              _this.dialogqs = false;
              this.getTask();
            }, 3000);
          }
        })
      },
      assigned(id){
        this.$http.post(POST_LIST+'/activiti/water/task/getform/'+ id).then(res=> {
          if (res.body.code == 200) {
            this.dataInfo = res.body.data;
            this.openperive=true;
            this.id=id
            eventBus.bus.emit('datas',this.dataInfo)
          }
        })
      },
      fassigned(id){
        this.$http.get(GET_LIST+'/activiti/water/task/unclaim/'+id).then(res=>{
          if(res.body.code==200){
            this.getTask();
          }
        })
      },
      backToMap() {
        if(this.openperive){
          this.openperive = false
        }else{
          this.setMapShow(true);
          this.$router.push("/home");
        }
      },
    }
  }
</script>
<style scoped>
  .tasklist{
    height:581px;
  }
  .sp{
    text-align:center;
    z-index:100;
  }
  .portal-head1 {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: center;
    z-index: 61;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    color: #fff;
  }

  .alert-left {
    position: absolute;
    left: 0px;
    top:28px;
    transform:translateY(-50%);
    margin-left:15px;
  }

  .alert-title {
    font-size: 20px;
  }
  .nothin {
    height: 1px;
  }
  .demo-flat-button{
    display:inline-block;
  }
  .bl{
    color:#30aafd;
  }
  .bl+span{
    color:orange;
  }
  .tasklist .processtable{
    padding-top:70px;
    overflow:auto;
    height:100%;
  }
  .tasklist .processtable th{
    padding:0;
  }

</style>
