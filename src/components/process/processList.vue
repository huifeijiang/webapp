<template>
  <div class="process">
    <div v-show="isadmin">
      <div class="portal-head zin74">
          <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
          <span class="alert-title">工作流程</span>
          <span></span>
      </div>
      <div class="nothin"></div>
    </div>
    <div class="processtable">
      <mu-table  :showCheckbox="false" :fixedHeader='true' :height='auto'>
        <mu-thead class='theads'>
          <mu-tr>
            <mu-th>流程定义ID</mu-th>
            <mu-th>流程定义名称</mu-th>
            <mu-th>版本号</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for='(item,index) in processList' :key='index'>
            <mu-th>{{item.deploymentId}}</mu-th>
            <mu-th>{{item.name}}</mu-th>
            <mu-th>{{item.version}}</mu-th>
            <mu-th><mu-flat-button label="启动" class="demo-flat-button" secondary @click='start(item.name,item.version,item.id)'/></mu-th>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <startlog :opened='openInfo'></startlog>
  </div>
</template>
<script type='es6'>
  import { mapGetters, mapActions, mapState } from 'vuex';
  import eventList from '../eventReport/eventList.vue';
  import startlog from './startProcess.vue';
  export default{
    data(){
      return {
        isadmin: true,
        processList: [],
        openInfo: {
          id: '',
          name: '',
          version: '',
          open: false
        },
      }
    },
    mounted(){
      this.getProcesslist();
    },
    components: {
      startlog
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      getProcesslist(){
        this.$http.post(POST_PROCESS_LIST, {emulateJSON: true}).then(res=> {
          if (res.body.code == 200) {
            this.processList = res.body.data;
          }
        })
      },
      backToMap() {
        this.setMapShow(true);
        this.$router.push("/home");
      },
      start(name, version, id){
        this.openInfo.open = true;
        this.openInfo.name = name;
        this.openInfo.id = id;
        this.openInfo.version = version;
      },
    }
  }
</script>
<style scoped>
  .process{
    height:581px;
  }
  .zin74{
    z-index: 74;
  }
  .portal-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: center;
    z-index: 101;
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
    margin-left:15px;
  }

  .alert-title {
    font-size: 20px;
  }
  .nothin {
    height: 1px;
  }
  .processtable{
    padding-top:70px;
    overflow:auto;
    height:100%;
  }
  .processtable th{
    padding:0;
  }
 .demo-flat-button{
   display:inline-block;
 }

</style>
