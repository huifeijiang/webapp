<template>
  <div class="maptip f_clear">
    <div class="mapre">
      <img class="imaaa" src="static/v2images/closeqq.png"/>
      <div class="maptip-le">杨角杨角杨角</div>
      <div class="maptop-ri">
        <div class="top-pp">
          <img class="spealll" src="static/v2images/telcall.png"/>
          <span class="clor"></span>
        </div>
        <div>
          <img class="twoa" src="static/v2images/dingweiq.png"/>
          <span class="clor">213123</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data(){
            return {}
        },
        props: {},
        methods: {},
        computed: {},
        mounted(){

        },
        destroyed(){

        }
    }
</script>

<style scoped>

  .f_clear:after {
    display: block;
    clear: both;
    content: ".";
    visibility: hidden;
    height: 0;
    line-height: 0;
    zoom: 1;
  }
  .maptip{
    width:220px;
    height:85px;
    position:fixed;
    z-index:90;
    background:#fff;
    top:90px;


  }
  .mapre{
    position:relative;
    width:100%;
    height:100%
  }
  .imaaa{
    position:absolute;
    right:5px;
    top:5px;
    width:16px;
  }
  .maptip-le{
    overflow: hidden;
    float:left;
    width:60px;
    height:100%;
    line-height:85px;
    text-align:center;
    font-size:16px;
    color:#626676

  }
  .maptop-ri{
    float:left;
    width:140px;
    margin-top: 15px;
    border-left: 1px solid #eceff9;
    padding-left: 11px;
  }
  .maptop-ri .twoa{
    width: 18px;
    vertical-align: middle;
  }
  .top-pp{
    margin-bottom:5px;
    margin-left: 2px;
  }
  .maptop-ri .spealll{
    width:16px;
    vertical-align: middle;
  }
  .clor{
    color:#a8acbc;
    font-size:14px;
  }

</style>
