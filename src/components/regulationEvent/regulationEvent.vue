<template>
  <div class="drawer-content">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="leftEvent" value="keyboard_arrow_left" />
      <span class="alert-title">事件详情</span>
      <span class="alert-right">完成</span>
    </div>
    <!--<single-head leftTitle="返回" centerTitle="事件详情" @leftEvent="leftEvent"></single-head>-->

    <div class="center-wrap">
      <p class="title">处理进度</p>
      <div v-show="showButton" class="step-wrap">
        <span :class="detail.status>=1?'step-text green':'step-text'">待接收</span>
        <span class="step-line"></span>
        <span :class="detail.status>=2?'step-text green':'step-text'">待处理</span>
        <span class="step-line"></span>
        <span :class="detail.status>=3?'step-text green':'step-text'">已处理</span>
      </div>
      <div v-show="!showButton" class="step-wrap">
        <span class="step-text green">已退回</span>
      </div>
      <p class="title">事件详情</p>
      <div class="detail-wrap">
        <p>用户：{{detail.userName}}</p>
        <p>时间：{{detail.datetime}}</p>
        <p>地点：{{detail.address}}</p>
        <p>类型：{{detail.eventTypeName}}</p>
        <p>描述：{{detail.describe}}</p>
      </div>
      <p class="title">事件详情图片</p>
      <div class="image-wrap">
        <img v-for="item in detailImage" :src="item">
      </div>

      <div v-show="detail.status==3">
        <p class="title">处理详情</p>
        <div class="detail-wrap">
          <p>用户：{{done.userName}}</p>
          <p>时间：{{new Date(done.datetime).toLocaleString()}}</p>
          <p>地点：{{done.address}}</p>
          <p>类型：{{done.eventTypeName}}</p>
          <p>描述：{{done.describe}}</p>
        </div>
        <p class="title">处理详情图片</p>
        <div class="image-wrap">
          <img v-for="item in doneImage" :src="item">
        </div>
      </div>
    </div>

    <div v-show="showHandle" class="bottom-button">
      <div @touchstart="handle(false)" v-show="!status">
        <mu-raised-button label="退回" class="bon"/>
      </div>
      <div @touchstart="handle(true)" v-show="!status">
        <mu-raised-button label="接收" class="bon"/>
      </div>
      <div @touchstart="showOpenTwo" v-show="status">
        <mu-raised-button label="开始处理" class="bon"/>
      </div>

    </div>

  </div>
</template>

<script>
  import singleHead from '../../UIcomponents/singleHead/singleHead';
  import {eventBus} from '../../components/eventBus/eventBus';
  export default {
    data(){
      return {
        detail: {
          userName: '',
          datetime: '',
          address: '',
          eventTypeName: '',
          describe: '',
          status: 1
        },
        done: {
          userName: '',
          datetime: '',
          address: '',
          eventTypeName: '',
          describe: '',
          status: 1
        },
        detailImage: [],
        doneImage: [],
        showButton: true,
        showHandle: true,
        status: false,
        nowItem: {
          status: 1
        }
      }
    },
    components: {
      singleHead
    },
    methods: {
      leftEvent(){
        this.$emit('back');
      },
      handle(bool){
        if (bool) {
          this.nowItem.status = 2;
          this.status = true;
          this.handleEvent();
        } else {
          this.showButton = false;
          this.showHandle = false;
          this.nowItem.status = 4;
          this.backEvent();
        }
      },
      showOpenTwo(){
        this.$emit('showOpenTwo');
      },
      backEvent(){
        this.$http.post(POST_EVENT_BACK + this.nowItem.id + '/back').then((res) => {
          console.log(res);
        }).catch((error) => {
        })
      },
      handleEvent(){
        this.$http.post(POST_EVENT_HANDLE + this.nowItem.id + '/accept').then((res) => {
          console.log(res);
        }).catch((error) => {
        });
      },
      showDetail(item) {

      },
      getDetail(item){
        this.detailImage = [];
        this.doneImage = [];
        this.$http.get(GET_EVENT_DETAIL + item.id).then(res => {
          this.detailImage = res.body.data.images;
          this.doneImage = res.body.data.handleImages;
          this.done.userName = res.body.data.handlerName;
          this.done.datetime = res.body.data.handletime;
          this.done.describe = res.body.data.means;
          this.done.address = res.body.data.address;
          this.done.eventTypeName = res.body.data.eventTypeName;
        }).catch(err => {
        })
      }
    },
    mounted(){
      eventBus.bus.on(eventBus.GET_EVENT_NOW, (item) => {
        this.nowItem = item;
        this.showButton = true;
        this.showHandle = true;
        this.status = false;
        this.detail = item;
        if (item.status == 4) {
          this.showButton = false;
          this.showHandle = false;
        }
        if (item.status == 2) {
          this.status = true;
        }
        if (item.status == 3) {
          this.showButton = true;
          this.showHandle = false;
          this.showDetail(item);
        }
        this.getDetail(item);
      });
    }
  }
</script>

<style scoped>
  .drawer-content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .center-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 56px;
    padding-bottom: 55px;
    box-sizing: border-box;
    z-index: 1;
    overflow-y: auto;
  }

  .title {
    margin: 0;
    padding: 8px 0;
    text-indent: 20px;
    font-size: 14px;
    font-weight: bold;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
  }

  .step-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 5px 0;
  }

  .step-text {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    font-size: 12px;
    border: 1px solid #efefef;
    text-align: center;
    line-height: 50px;
    background-color: #ccc;
  }

  .green {
    background-color: #50dc8d;
    color: #fff;
  }

  .step-line {
    width: 20%;
    border: 1px solid #efefef;
  }

  .detail-wrap {
    padding: 5px 20px;
    box-sizing: border-box;
  }

  .detail-wrap p {
    margin: 0;
    padding: 5px 0;
    font-size: 14px;
  }

  .image-wrap {
    width: 96%;
    margin: 0 auto;
  }

  .image-wrap img {
    display: block;
    width: 100%;
  }

  .bottom-button {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 5;
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
  }

  .bon {
    margin: 0 3px;
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
    visibility: hidden;
  }
</style>
