<template>
  <div class="startProcess">
    <mu-dialog :open="opened.open">
      <p>流程定义名称: {{opened.name}}</p>
      <p>版本号: {{opened.version}}</p>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="starting" label="启动"/>
    </mu-dialog>
    <mu-dialog :open="dialog1">
      <p  class='sp'>流程已启动</p>
    </mu-dialog>
  </div>
</template>
<script type='es6'>
  export default{
    data(){
      return {
        dialog1:false,
        lab:true,
        id:'',
        name:'',
        version: '',
      }
    },
    mounted(){},
    methods: {
      close(){
        this.opened.open=false;
        this.dialog1=false;
      },
      starting(){
        this.opened.open=false;
        this.$http.get(GET_LIST+'/activiti/process/process-instance/start/'+this.$props.opened.id).then(res=>{
            if(res.body.code==200){
              this.dialog1=true
              let _this = this;
              setTimeout(() => {
                _this.dialog1=false;
              }, 2000);
            }
        })
      },
    },
    props:['opened'],
    watch:{
      opened(val){
        this.id=val.id;
        this.name=val.name;
        this.version=val.version;
      }
    }
  }

</script>
<style scoped>
  .sp{
    text-align:center;
    z-index:100;
  }
</style>
