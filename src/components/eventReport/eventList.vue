<template>
  <div class='eventlist'>
    <!--页面列表-->
    <mu-list>
      <mu-list-item :title="listTitle" :afterText="selectMore? '':selected" @click="toggle()">
        <mu-icon :value="icon" slot="left" v-if="!selectMore&&icon"/>
        <mu-icon value="chevron_right" slot="right"/>
        <i v-show="isRquired&&!icon" class='icon-color basei'>*</i>
      </mu-list-item>
      <mu-divider/>
      <div class="reslut-list" v-show="resultList.length > 0">
        <span class="result-list" v-for="item in resultList">{{item}}</span>
        <mu-divider/>
      </div>
    </mu-list>
    <!--延伸列表-->
    <mu-drawer right :open="open" :docked="docked" @close="toggle()" class="event-walker shequaa">
      <head-dom v-on:back="toggle" :type="'back'">{{listTitle}}</head-dom>
      <div class="sheqq"><input type="text" v-model="search" placeholder="输入搜索相关关键字" class="searchaa"></div>
      <div ref="cwListBox" class="cw-list-container cwab">

        <mu-list v-for="(item,index) in earchData" :key="index"
                 :class="index == 0 ?'jd-list-item'+index : ''"></mu-list>

        <div ref="cwListBox" class="cw-list-container">
          <div v-for="(item,index) in earchData"  @click="handleSelect(item)">
            <!-- <img :src="item.checked?iconOn:iconOff"> -->
            <div v-show='item.name == undefined ? false:true' class="cw-list">
              <span class="icon-ic-sed sed" :class="item.checked?'seled':'unseled'" >
                <span data-v-4432b4b4="" class="path1"></span>
                <span data-v-4432b4b4="" class="path2"></span>
              </span>
              <span :class="item.checked?'active':''">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </mu-drawer>
  </div>
</template>
<script>
  import headDom from '../../UIcomponents/header/head';
  import {
    eventBus
  } from '../eventBus/eventBus.js';
  export default {
    components: {
      headDom,
    },
    data() {
      return {
        sounds: '',
        notifications: '',
        videoSounds: '',
        docked: false,
        selected: '',
        open: false,
        lastDom: null,
        iconOff: 'static/v2images/ic-gouxuan.png',
        iconOn: 'static/v2images/ic-gouxuan-h.png',
        search: '',
        resultList: [],
        resultIdList: [],
      }
    },
    computed: {
      earchData: function () {
        var search = this.search.trim();
        if (search) {
          return this.eventTypeList.filter(function (eventTypeList) {
            return Object.keys(eventTypeList).some(function (key) {
              return String(eventTypeList[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        for (let item of this.eventTypeList) {
          let arr = this.modalValue.split(",");
          if (arr.includes(String(item.id))) {
            item.checked = true;
            if (!this.selectMore) {
              this.selected = item.name
            }
          }

        }
        return this.eventTypeList;
      }
    },
    props: {
      eventTypeList: {
        type: Array,
        default(){
          return [];
        },
        required: false,
      },
      modalValue: {
        type: String,
        default: "",
        required: false
      },
      servicesUrl: {
        type: String,
        required: false,
      },
      listTitle: {
        type: String,
        required: false,
      },
      icon: {
        type: String,
        required: false,
      },
      selectMore: {
        type: Boolean,
        required: false,
        default: false
      },
      singleType: {
        type: Boolean,
        default: false
      },
      isRquired: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      toggle(flag) {
        this.open = !this.open;
        this.docked = !flag;
        this.showicon = false;
        this.spanitem = this.producename
        eventBus.bus.emit('producedata', this.producedatas)
      },
      watchnone() {
        this.tlt = true
        if (this.isActive == true) {
          this.isActive = false;
          this.wu.value = '';
        } else {
          this.isActive = true;
          this.wu.value = '无';
        }
      },
      produce(id, name){
        this.tlt = true;
        this.producedatas = id
        this.producename = name
      },

      handleSelect(item) {
        this.selected = item.name;
        if (this.$props.selectMore) {
          //多选
          item.checked = !item.checked;

          if (item.checked) {
            //选中
            this.resultIdList.push(item.id);
            this.resultList.push(item.name);
          } else {
            //移除
            let index;
            for (let a = 0; a < this.resultIdList.length; a++) {
              if (this.resultIdList[a] == item.id) {
                index = a;
                break;
              }
            }
            this.resultIdList.splice(index, 1);
            this.resultList.splice(index, 1);
          }

          this.$emit("selectedMore", this.listTitle, this.resultIdList, this.resultList);
        } else {
          let datas = this.$props.eventTypeList;
          for (let i = 0; i < datas.length; i++) {
            datas[i].checked = false;
          }
          item.checked = true;
          this.toggle();
          this.$emit("selected", this.listTitle, item);
          // let temp = item.checked;
          // let datas = this.$props.eventTypeList;
          // for(let i=0;i<datas.length;i++){
          //     datas[i].checked = false;
          // }
          // this.resultIdList = [];
          // if(temp){
          //     item.checked = false;
          // }else{
          //     item.checked = true;
          //     this.resultIdList.push(item.id);
          // }
          // this.resultList = [];
          // this.resultList.push(item.name);
          // this.$emit("selected",this.listTitle,this.resultIdList);
        }
      },
      handleToggle(info){

        this.selected = info.name;
        if (!this.selectMore) {
          this.toggle();
          this.$emit("selected", this.listTitle, info);
        } else {
          let dom = this.$refs[info.id + 'dom'][0].$el;
          if (this.resultList.indexOf(info.name.toString()) < 0) {
            if (this.$props.singleType) {
              this.resultList = [info.id];
            } else {
              this.resultList.push(info.id);
            }
            this.resultIdList.push(info.id);
          }
          if (dom.className == 'cw-row-selected') {
            dom.className = '';
            let index = this.resultList.indexOf(info.name.toString());
            this.resultList.splice(index, 1);
            this.resultIdList.splice(index, 1);
          } else {
            if (this.$props.singleType) {
              if (this.lastDom == null) {
                this.lastDom = dom;
              } else {
                this.lastDom.className = '';
                this.lastDom = dom;
              }
            }
            dom.className = 'cw-row-selected';
          }
          this.$emit("selected", this.listTitle, this.resultIdList);
        }
        console.log(this.resultList)
      },
      getData(option){
        this.$http.get(baseUrl + this.servicesUrl).then((res) => {
          let temp = res.body.data;
          let arr1 = new Array();
          if (temp.content != undefined) {
            arr1 = temp.content;
          } else {
            arr1 = temp;
          }
          arr1.push(option);
          for (let i = 0; i < arr1.length; i++) {
            let obj = {
              id: arr1[i].id,
              name: arr1[i].name,
              checked: false
            }
            let arr = this.modalValue.split(",");

            if (arr.includes(String(obj.id))) {
              obj.checked = true;
              this.resultIdList.push(obj.id);
              this.resultList.push(obj.name);
            }
            this.eventTypeList.push(obj);
          }
        })
      }
    },
    mounted() {
      this.search = "";
      var mulists = document.querySelectorAll('.forlist');
      for (let i = 0; i < mulists.length; i++) {
        mulists[i].onclick = function () {
          for (var j = 0; j < mulists.length; j++) {
            mulists[j].className = 'mu-list forlist';
          }
          this.className += ' active'
        }
      }

      if (!this.servicesUrl) {
        for (let item of this.eventTypeList) {
          let arr = this.modalValue.split(",");
          if (arr.includes(String(item.id))) {
            item.checked = true;
          }
        }
      } else {
        if (this.servicesUrl.indexOf('rivers') != -1) {
          this.getData({id: '0', name: '不清楚'})
        }else{
          this.getData({})
        }
      }
//      this.$watch('servicesUrl', testFunc);
    }
  }
</script>

<style lang="less" scoped>
  .mu-list {
    padding: 0;
  }

  div.mu-list {
    padding: 0;
  }

  .cw-list-container {
    overflow-y: scroll;
  }

  .result-list {
    padding: 2px 10px;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #54AEF5;
    margin: 2px 10px;
    border: 1px solid #54AEF5;
    border-radius: 4px;
  }

  .nothin {
    height: 1px;
  }

  .cw-list-container {
    margin-top: 0px;
  }

  .cw-list {
    display: flex;
    width: 94%;
    margin: 0 auto;
    padding: 14px 0;
    align-items: center;
    border-bottom: 1px solid #ECEFF9;
  }

  .cw-list img {
    margin-right: 10px;
  }

  .active {
    color: #4BAAF4;
  }

  .shequaa {
    z-index: 80 !important
  }

  .sheqq {
    position: fixed;
    top: 60px;
    left: 0%;
    right: 0%;
    height: 52px;
    border-bottom: 1px solid #eceff9;
  }

  .searchaa {
    display: inline-block;
    width: 94%;
    margin-left: 3%;
    color: #000;
    line-height: 16px;
    padding: 14px 32px;
    border-radius: 25px;
    box-sizing: border-box;
    border: 1px solid #eceff9;
    outline: none;
    background-color: rgba(255, 255, 255, .1);
    background-image: url("../../../static/images/ic-search.png");
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 15px 15px;
    caret-color: #a8acbc;
  }

  .searchaa::placeholder {
    color: #a8acbc
  }

  .cwab {
    position: absolute;
    top: 112px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }

  .cw-row-selected {
    background-color: #2196f3;
  }

  .cw-row-selected .mu-item-title {
    color: white;
  }

  .sed {
    font-size: 22px;
    /*margin-right: 14px;*/
  }
  .icon-ic-sed{
    width:35px;
    height:100%;
  }
  .icon-ic-sed .seled .path1::before {
    color: rgb(75, 170, 244);
  }
  .icon-ic-sed .path2:before{
    margin-left:-32px;
  }
  .seled .path2:before {
    color: rgb(255, 255, 255);
  }

  .unseled .path1:before {
    color: #e4e4e4;
  }

  .unseled .path2:before {
    color: #fff;
  }
  .basei{
    position:absolute;
    left:5px;
    top:17px;
  }
</style>
