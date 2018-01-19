<template>
  <div class="layer-wrap">
    <div class="layerIcon">
      <div class="mrb" v-if="url !== null">
        <span :class="url+' rive'"></span>
      </div>
      <img v-else src="static/v2images/tuliaa.png" class="tuliaa">
      <label>{{title}}</label>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data(){
      return {

      }
    },
    props: {
      title:{
        type:String,
        default:''
      },
      url: {
        type:String,
        default:''
      },

    },
    methods: {},
    computed: {},
    mounted(){

    },
    destroyed(){

    }
  }
</script>

<style lang="less" scoped>
  .layer-wrap {
    border-radius: 4px;
    background-color: rgba(255,255,255,.9);
    box-shadow: 0px 0px 4px 0px rgba(118,139,155,0.2);
  }
  .layerIcon {
    width: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid rgba(184,227,238,.5);
  }
  .no-border{
    border-bottom: none;
  }
  .layerIcon img {
    margin-top: 3px;
    vertical-align:middle;
  }

  .layerIcon label{
    transform: scale(0.9,0.9);
    -webkit-transform: scale(0.9,0.9);
    transform-origin: center top;
    -webkit-transform-origin: center center;
    font-size: 10px;
    color: #4BAAF4;
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
  }
  .mrb {
    margin: 0 auto;
    padding-top: 5px;
    margin-bottom:-5px; 
  }
  .rive {
    font-size: 20px;
  }
  .tuliaa {
    display: block;
    width: 22px;
    padding-top: 5px;
    margin: 0 auto;
  }
</style>
