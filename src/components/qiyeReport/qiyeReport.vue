<template>
  <div class="dayli">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class='alert-title'>今日任务</span>
      <span class="hidden">隐藏</span>
    </div>
    <div class="nothin"></div>
    <div class="list">
      <span class="le">企业名称</span>
      <span class="re">状态</span>
    </div>
    <div class="content" ref="content">
      <div class="list" v-for="item in list" @click="jump(item)">
        <span class="le">{{item.enterpriseName}}</span>
        <span class="rb" v-if="item.missionStatus">已上报</span>
        <span class="bb" v-else>待上报</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  import bindScrollAction from '../scrollPlugin/scrollPlugin.js';
  export default {
    data() {
      return {
        list: [],
        page: 0,
        needLoad: true
      }
    },
    created() {
      this.getList();
    },
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      })
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
      backToMap() {
        this.setMapShow(true);
        this.$router.push("/home");
      },
      getList() {
        if (!this.needLoad) return false;
        //status 0表示带巡查,1表示待确认,2表示已经巡查
        let date = new Date();
        let year = date.getFullYear();
        let mon = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        date = year + '-' + mon + '-' + day;
        this.$http.get(GET_HUANBAOZHUREN_REPORT + '?size=15&page=' + this.page + '&date=' + date + '&userId=' + this.getUserId).then(res => {
          let content = res.body.data.content;
          if (content.length == 0) {
            this.needLoad = false;
            return false;
          }
          this.list = this.list.concat(content);
          this.page += 1;
        }).catch(err => {
        });
      },
      jump(item) {
//        if(item.missionStatus != 0) return ;
//				this.$router.push({name: 'huanbaozhurenReport', params: {load: true, id: item.id}});
        if (item.missionStatus != 0) {
          this.$router.push({name: 'huanbaozhurenEvent', params: {id: item.id}});
        } else {
          this.$router.push({name: 'huanbaozhurenReport', params: {load: true, id: item.id}});
        }
      }
    },
    mounted() {
      bindScrollAction(this.$refs.content, this.getList);
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style scoped>
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8EB4D3;
    z-index: 50;
    box-shadow: 0 2px 4px 0px rgba(142, 180, 211, .5);
    color: #fff;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-title {
    font-size: 20px;
  }

  .dayli {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
  }

  .nothin {
    width: 100%;
    height: 56px;
  }

  .list {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #efefef;
    padding: 10px;
  }

  .le {
    width: 80%;
    text-align: left;
  }

  .re {
    width: 20%;
    text-align: center;
  }

  .rb {
    width: 20%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 4px;
    background-color: #2eccfc;
    color: #fff;
  }

  .bb {
    width: 20%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 4px;
    background-color: #fb363e;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 104px;
    bottom: 5px;
    overflow-y: auto;
  }
</style>
