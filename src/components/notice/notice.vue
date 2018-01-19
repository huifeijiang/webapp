<template>
  <div class="notice">
    <div class="notice-head">
      <div class="alert-left" @click="backToMap">
        <img src="static/images/ic-return.png" alt="">
      </div>
      <span class="alert-title">通知</span>
      <span class="alert-right">隐藏</span>
    </div>

    <div class="notice-wrap">
      <div class="nothin"></div>
      <slot v-for="item in messages">
        <p class="notice-time-p"><span class="notice-time">{{formatTime(item.created)}}</span></p>
        <div class="notice-list">
          <div class="notice-title">{{item.title}}</div>
          <div class="notice-box">
            <img :src="item.titlePic" class="notice-img">
          </div>
          <div class="notice-more" @click="jump(item.id)">
            <span>查看全文</span>
            <i class="mu-bottom-item-icon mu-icon material-icons">keyboard_arrow_right</i>
          </div>
        </div>
      </slot>
    </div>

    <mu-drawer class="notice-drw" :open="open" right>
      <div class="notice-head">
        <div class="alert-left" @click="open=false">
          <img src="static/images/ic-return.png" alt="">
        </div>
        <span class="alert-title">通知</span>
        <span class="alert-right">隐藏</span>
      </div>
      <div class="news-content2" id="notice" ref="newsContent"></div>
    </mu-drawer>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {eventBus} from '../eventBus/eventBus.js';
  export default {
    data(){
      return {
        messages: [],
        open: false
      }
    },
    created(){
      this.$http.get(GET_NOTICE + '?size=100').then(res => {
        this.messages = res.body.data.content;
      }).catch(err => {
      });
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow'
      }),
      jump(id){
        this.open = true;
        this.$http.get(GET_NOTICEDETIL + "/" + id).then((res) => {
          document.getElementById('notice').innerHTML = res.body.data.content;
        }).catch(err => {
        })
      },
      backToMap(){
        this.setMapShow(true);
        this.$router.push('/home')
      },
      formatTime(time){
        let date = new Date(time);
        return date.getMonth() + '/' + date.getDate();
      }
    },
    mounted(){
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed(){
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style scoped>
  .notice-head {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    background-color: #4BAAF4;
    box-shadow: 0 2px 4px 0px rgba(142, 180, 211, .5);
    color: #fff;
  }

  .alert-left {

    padding: 12px;
  }

  .alert-left img {
    display: block;
    width: 10px;
  }

  .alert-right {
    margin-right: 20px;
    visibility: hidden;
  }

  .alert-title {
    font-size: 20px;
  }

  .notice-wrap {
    position: fixed;
    top: 56px;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    z-index: 90;
    overflow-y: auto;
  }

  .nothin {
    height: 1px;
  }

  .notice-list {
    width: 92%;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 1px solid #EDF0F9;
    box-shadow: 0px 6px 12px 0px rgba(216, 228, 238, 0.9);
    box-sizing: border-box;
    border-radius: 4px;
  }

  .notice-title {
    margin-bottom: 10px;
    font-size: 16px;
    color: #5A5E6F;
    letter-spacing: 1px;
  }

  .notice-box {
    width: 100%;
    height: 125px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .notice-img {
    display: block;
    width: 100%;
  }

  .notice-more {
    padding: 9px 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #ECEFF9;
  }

  .notice-more span {
    font-size: 14px;
    color: #4BAAF4;
    flex-grow: 1;
  }

  .notice-more i {
    font-size: 24px;
    color: #A8ACBC;
  }

  .notice-drw {
    width: 100%;
    z-index: 91;
  }

  .news-content2 {
    position: fixed;
    left: 3%;
    right: 3%;
    top: 56px;
    bottom: 0;
    margin: 0 auto;
    background: #fff;
    overflow: auto;
  }

  .notice-time-p {
    text-align: center;
  }

  .notice-time {
    display: inline-block;
    width: 56px;
    height: 18px;
    line-height: 18px;
    margin: 10px auto;
    border-radius: 4px;
    background-color: #CACDD9;
    color: #fff;
    font-size: 12px;
  }
</style>
