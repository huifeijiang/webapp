<template>
  <mu-drawer class="step-alert" right :open="opened">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">办理表单</span>
      <span class="alert-right"></span>
    </div>
    <div class="alert-body">
      <div class="nothin"></div>
      <div class="head">
        <p><strong>任务办理:</strong> {{taskDto.name}}</p>
        <p><strong>流程定义ID:</strong> {{taskDto.id}}</p>
      </div>
      <form class="alertbody form"  @submit.prevent='doSubmit()'>
        <div v-for='(item,index) in formlist' :key='index'>
          <div class="user-list" v-if='item.type.name=="text"||item.type.name=="long"'>
            <strong>{{item.name}}: </strong>
            <input class='ipt'  :name='item.id' :type='item.type.name' :value='item.value'
                   :required='item.required' :readable='item.readable' :writable='item.writable'/>
          </div>
          <div class="user-list" v-if='item.type.name=="date"'>
            <strong>{{item.name}}: </strong>
            <input  class='datetime' :name='item.id'
                           :value='item.value' :type="item.type.name" :required='item.required'
                           :readable='item.readable'
                           :writable='item.writable'/>
          </div>
          <div class="user-list" v-if='item.type.name=="enum"'>
            <strong>{{item.name}}: </strong>
            <select class='selected' :name='item.id'>
              <option v-for='(val, key, index)  in item.type.hashMap' :key='index' :value="key">{{val}}</option>
            </select>
          </div>
        </div>
        <input type='submit' value='提交' class='subButton'>
      </form>
    </div>
    <mu-dialog :open="dialogqs">
      <p class='sp'>{{tip}}</p>
    </mu-dialog>
  </mu-drawer>
</template>
<script type='es6'>
  import socialSelect from '../../UIcomponents/socialSelect/SocialSelect.vue';
  import {eventBus} from '../eventBus/eventBus.js';
  import banli from './banli.js';
  import 'mint-ui/lib/style.css';
  export default{
    data(){
      return {
        isadmin: true,
        dialogqs: false,
        taskDto: {},
        formlist: [],
        tip:''
      }
    },
    mounted(){
      eventBus.bus.on('datas', val=> {
        this.formlist = [];
        this.taskDto = val.taskDto
        this.formlist = val.formlist;
      })
    },
    props: ['opened', 'ided'],
    methods: {
    doSubmit(){
      var formdata=banli.formser('form');
      const url = POST_LIST + '/activiti/water/task/complete/' + this.$props.ided;
      this.$http.post(url,formdata).then(res=> {
        if (res.body.code == 200) {
          this.dialogqs = true;
          this.tip='提交成功!'
          let _this = this;
          setTimeout(() => {
            _this.dialogqs = false;
            _this.$parent.openperive=false;
            eventBus.bus.emit('backToTasklist',true)
          }, 2000);
        }else{
          this.dialogqs = true;
          this.tip='网络异常!'
          let _this = this;
          setTimeout(() => {
            _this.dialogqs = false;
          }, 2000);
        }
      })
      return false;
    },
    backToMap() {
      this.$parent.openperive = false
    },
   },
  }

</script>
<style scoped>
  .step-alert {
    width: 100%;
    z-index: 300;
  }
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 50;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
  }
  .head{
    color:#6a6e7b;
  }
  .nothin {
    height: 1px;
  }
  .alert-body {
    padding: 50px 10px 50px 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .head {
    padding: 15px 15px 0 15px;
    font-size: 16px;
  }
  .user-list {
    display: flex;
    width: 94%;
    margin: 0 auto;
    color: #6a6e7b;
    font-size: 14px;
    height: 55px;
    align-items: center;
    justify-content: space-between;
  }
  .sp {
    text-align: center;
  }
  .time input {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid transparent;
  }
  .selected, .ipt, .datetime {
    height: 60%;
    flex: 40%;
    outline: none;
    border: 1px solid #eee;
  }
  .subButton{
    float:right;
    margin-top:15px;
    background:transparent;
    border:none;
    outline:none;
    position:absolute;
    top:0;
    right:6px;
    z-index:50;
    color:#fff;
  }
</style>
