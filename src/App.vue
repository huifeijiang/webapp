<template>
  <div class="router-view">
    <router-view></router-view>
    <alert v-model="getShowTips" @confirm="close">VPN已断开,请重新连接！</alert>
  </div>
</template>

<script>
import alert from './UIcomponents/alert/alert'
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  name: 'app',
  components: {
      alert
  },
  data(){
    return{

    }

  },
  computed: {
      ...mapGetters({
        getShowTips: 'getShowTips',
    }),
  },
  methods: {
      ...mapActions({
        setShowTips: 'setShowTips'
      }),
      close(){
        this.setShowTips(false)
      }
  },
  mounted(){
//    console.log(this.$store.state.login)
  }
}
</script>
<style scoped>
    .router-view{
      	width: 100%;
      	height: 100%;
    }
</style>
