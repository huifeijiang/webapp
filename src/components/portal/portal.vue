<template>
  <div>
    <div class="portal-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
      <span class="alert-title">巡查</span>
      <img src="static/v2images/tongji.png" class="alert-right tj" v-powerCode="{code:'HEZHANG'}" @click="goPage">
    </div>
    <cw-tab v-on:changeTabs="responseTab"></cw-tab>
    <div class="router-wrap" ref="wrap">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
  import cwTab from '../../UIcomponents/cwTab/cwTab.vue'
  import headDom from '../../UIcomponents/header/head';
  import {eventBus} from  '../../components/eventBus/eventBus.js';
  import { mapGetters,mapActions,mapState} from 'vuex';
  export default {
    data(){
      return {
        threeText: '小散乱污',
        four: '油烟事件',
        five:'餐饮事件',
        six:'汽修事件'
      }
    },
    components: {
      headDom,
      cwTab
    },
    computed: mapGetters([
      'getRole'
    ]),
    methods: {
      ...mapActions({
      setMapShow: 'setMapShow',
    }),
    responseTab(val){
      if (val == this.threeText) {
        this.$router.push({name: 'xslw', params: {status: true}});
      }
      if (val == this.four) {
        this.$router.push({name: 'lampblackevent', params: {isadmin: true}});
      }
      if (val == this.five) {
        this.$router.push({name: 'cateringevent', params: {isadmin: true}});
      }
      if (val == this.six) {
        this.$router.push({name: 'careevent', params: {isadmin: true}});
      }
    },
    backToMap(e){
      if (e) {
        e.preventDefault();
      }
//     this.$router.push("/home/portal");
     this.$router.push("/home/eventGate");
     this.setMapShow(false);
    },
    goPage(){
      this.$router.push('/home/statistics')
    }
  },
  mounted()
  {
    let height = window.innerHeight;
    this.$refs.wrap.style.height = height - 175 + 'px';
    document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
  }
  ,
  destroyed()
  {
    document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
  }
  }
</script>
<style  scoped>
  .avoid-fixed {
    padding-top: 56px;
  }

  .walker-wrap {
    text-align: center;
  }

  .router-wrap {
    overflow: hidden;
  }

  .portal-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    background-color: #4BAAF4;
    box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
    color: #fff;
  }

  .alert-left {
    position:absolute;
    left:15px;
  }

  .alert-right {
    position:absolute;
    right: 10px;
  }
  .tj {
    width: 26px;
  }
  .alert-title {
    font-size: 20px;
  }

  .hidden {
    visibility: hidden;
  }
</style>
