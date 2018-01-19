<template>
    <div class="layer-wrap">
        <div class="layerIcon" v-for="(item,index) in [1,2,3]" :class="index==2?'no-border':''">
          <img src="../../../../static/v2images/map.png">
          <label>地图主题</label>
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
    background-color: #fff;
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
    font-size: 10px;
    color: #4BAAF4;
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
  }

</style>
