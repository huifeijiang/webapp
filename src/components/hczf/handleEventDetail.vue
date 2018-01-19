<template>
    <div class="wrap">
      <div class="alert-head">
        <mu-icon class="alert-left" @click="back" value="keyboard_arrow_left" />
        <span class="alert-title">事件详情</span>
        <span class="alert-right hidden">提交</span>
      </div>
      <div class="nothin"></div>
      <!--<div class="range-1111" :class="showButton?'pb':'inn'" ref="rangewrap">-->
        <!--<div class="table-list" v-for="item in tableData" v-show="item.show">-->
          <!--<span class="biao-left">{{item.name}}</span>-->
          <!--<span class="biao-right">{{item.value}}</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<mu-raised-button v-show="!isDone&&showButton" label="开始办理" class="demo-raised-button" primary @click="deal"/>-->
      <!--<div v-show="isDone">-->
        <!--<p class="done-p">处理详情</p>-->
        <!--<div class="done-mess">-->
          <!--<p>处理: <span>{{doneMess.handler}}</span></p>-->
          <!--<p>时间: <span>{{new Date(doneMess.handletime).toLocaleDateString()}}</span></p>-->
          <!--<p>地点: <span>{{doneMess.gridname}}</span></p>-->
          <!--<p>处理情况: <span>{{doneMess.means}}</span></p>-->
          <!--<p>描述: <span>{{doneMess.handleDescribe}}</span></p>-->
        <!--</div>-->
        <!--<p class="done-p" v-show="showImage">处理图片详情</p>-->
        <!--<div class="done-img" v-for="item in detailImage">-->
          <!--<img :src="item">-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="nothin"></div>-->
      <div class="wrap-body">
       <!--  <div class="range-wrap" ref="rangewrap">
          <div class="table-list" v-for="item in tableData">
            <span class="biao-left">{{item.name}}</span>
            <span class="biao-right">{{item.value}}</span>
          </div>
        </div> -->
        <mu-raised-button v-show="!isDone&&showButton" label="开始办理" class="demo-raised-button" primary @click="deal"/>
        <div v-show="isDone">
          <p class="done-p">处理详情</p>
          <div class="done-mess">
            <p>处理: <span>{{doneMess.handler}}</span></p>
            <p>时间: <span>{{new Date(doneMess.handleTime).toLocaleDateString()}}</span></p>
            <p>地点: <span>{{doneMess.gridname}}</span></p>
            <p>处理情况: <span>{{doneMess.means}}</span></p>
            <p>描述: <span>{{doneMess.handleDescribe}}</span></p>
          </div>
          <p class="done-p" v-show="showImage">处理图片详情</p>
          <div class="done-img" v-for="item in detailImage">
            <img :src="item">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        showImage: true
      }
    },
    props: ['tableData', 'done', 'doneMess', 'showButton', 'detailImage'],
    methods: {
      back(){
        this.$emit("toggleOne", false);
      },
      deal(){
        this.$emit("toggleTwo", false);
      }
    },
    computed: {
      isDone(){
        return this.$props.done;
      }
    },
    mounted(){
      console.log(this.tableData)
    },
    watch: {
      doneMess(val){
        if (val != null) {
          if (val.images.length == 0) {
            this.showImage = false;
          } else {
            this.showImage = true;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .wrap {
    position:relative;
    top:0;
    width:100%;
    height: 400px;
    z-index: 40;
  }

  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    background: linear-gradient(left, #30aafd, #2eccfc);
    background: -webkit-linear-gradient(left, #30aafd, #2eccfc);
    background: -moz-linear-gradient(left, #30aafd, #2eccfc);
    background: -o-linear-gradient(left, #30aafd, #2eccfc);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
    color: #fff;
  }
  .alert-left{
    position:absolute;
    left:15px;
  }
  .alert-right {
    position:absolute;
    right:15px;
  }
  .wrap-body{
    width:100%;
    height:100%;
    overflow-y: auto;
    position:absolute;
    z-index:30;
    top:0;

  }
  .range-wrap {
    padding: 0 10px;
  }

  .alert-title {
    font-size: 20px;
  }

  .alert-title {
    font-size: 20px;
  }

  .form-wrap, .range-wrap {
    width: 100%;
    padding-top: 55px;
    overflow-y: auto;
  }

  /*.margintop15.range-wrap {*/
    /*padding: 0 5px;*/
    /*margin-bottom: 80px;*/

  /*}*/
  .table-list {
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding: 10px 0;
    border-top: 1px solid #efefef;
    justify-content: space-between;
  }

  .table-list span {
    font-size: 14px;
    color: #6a6e7b;
  }

  .biao-left {
    width: 49%;
    text-align: left;
  }

  .biao-right {
    width: 49%;
    text-align: right;
  }

  .demo-raised-button {
    position: fixed;
    left: 50%;
    bottom: 10px;
    margin-left: -45px;
  }

  .hidden {
    visibility: hidden;
  }

  .done-p {
    margin: 0 auto;
    padding: 5px;
    text-indent: 10px;
    font-size: 16px;
    font-weight: 400;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #ccc;
    background-color: #efefef;
  }

  .done-mess {
    padding: 10px;
  }

  .done-mess p {
    margin-top: 7px;
  }

  .done-img {
    width: 100%;
    /*margin: 0 auto;*/
    padding:10px;
    overflow: hidden;
  }

  .done-img img {
    display: block;
    width: 100%;
    border-radius:5px;
  }
</style>
