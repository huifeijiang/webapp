<template>
  <div class="layer-wrap">
    <div class="layerIcon">
      <!-- <img :src="url"> -->
      <div class="mrb">
        <span class="icon-ic-rive rive"></span>
      </div>
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
    background-color: #4BAAF4;
    box-shadow: 0px 0px 4px 0px rgba(118,139,155,0.2);
  }
  .layerIcon {
    width: 50px;
    height: 50px;
    line-heiht:50px;
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
    color:white;
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
  }
  .mrb {
    margin: 0 auto;
    padding-top: 7px;
    margin-bottom:-5px; 
  }
  .rive {
    font-size: 20px;
  }
</style>
