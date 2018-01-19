<template>
  <div class="zhifa">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">执法列表</span>
      <span class="alert-right hidden">提交</span>
    </div>
    <div class="nothin"></div>
    <div class="list" v-for="item in list" @click="jump(item)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  export default {
    data() {
      return {
        list: [{
          name: '在管企业执法',
          router: '/home/zaiguanzhifa'
        }, {
          name: '小废水企业执法',
          router: '/home/xfsZflist'
        }, {
          name: '小散乱污执法',
          router: '/home/zhifaDetail'
        }]
      }
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      backToMap() {
        this.setMapShow(true);
//        this.$router.push("/home/portal");
        this.$router.push({name:'home',params:{name:true}});

      },
      jump(item) {
        if (item.router) this.$router.push(item.router);
      }
    },
    mounted() {
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style scoped>
  .zhifa {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 72;
    background-color: #fff;
  }
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    background-color: #2196f3;
  }
  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }
  .alert-title {
    font-size: 18px;
  }


  .hidden {
    visibility: hidden;
  }

  .nothin {
    height: 56px;
  }

  .list {
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-bottom: 1px solid #efefef;
    font-size: 16px;
    background-color: #d9d9d9;
  }
</style>
