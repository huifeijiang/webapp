<template>
  <div class='lampevent'>
     <div :class="this.$route.params.isadmin ? 'alert-head zin7444' :'alert-head zin74'">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">汽修事件列表</span>
      <span></span>
    </div>
    <div class="nothin"></div>
    <carEvent class="walker"></carEvent>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import headDom from '../../UIcomponents/header/head';
import carEvent from './carEvent.vue';
import {eventBus} from '../eventBus/eventBus';
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      setMapShow: 'setMapShow',
    }),
    backToMap(e) {
      console.log(11)
      if(this.$children[1].open){
					this.$children[1].open = false;
				}else{
					this.setMapShow(true);
          this.$router.push("/home/heichouEvent");
				}
    }
  },
  components: {
    headDom,
    carEvent
  },
  mounted(){
    document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false)
//    console.log(this.$children[1].open )
  },
  destroyed(){
     document.removeEventListener(eventBus.BACK_BUTTON,this.backToMap,false);
  }
}
</script>

<style scoped>
  .nothin{
    height: 1px;
  }
  .alert-title{
    margin-left:-20px
  }
  .walker{
    margin-top: 32px;
  }
.alert-head {
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
  left: 15px;
}
  .alert-title {
    font-size: 18px;
  }
/*.nothin{*/
  /*height: 1px;*/
/*}*/
.zin74{
  z-index: 74;
}
.zin7444{
  z-index: 74;
  display: none
}
</style>
