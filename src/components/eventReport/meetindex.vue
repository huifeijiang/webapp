<template>
  <div class="meinde cass">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">会议/巡河</span>
      <span class="alert-right">
        <!--<mu-icon-menu icon="more_vert" slot="bottom">
          <mu-menu-item title="发起" @click="tofaqi"/>
          <mu-menu-item title="记录" @click="torecord"/>
        </mu-icon-menu>-->
      </span>
    </div>
    <div class="nothin"></div>

    <div class="btns-wrap">
      <div class="news-btns">
      <a href="javascript:;" :class="[ button1 ? activeclass : cl]" @click="handleTabChange('tab1',1)"
           ref="tab1">已提交</a>
        <a href="javascript:;" :class="[ button ? activeclass : cl]" @click="handleTabChange('tab1',2)"
           ref="tab1">待开会议</a>
        <a href="javascript:;" :class="[ buttontwo ? activeclass : cl]" @click="handleTabChange('tab1',3)" ref="tab1">已开会议</a>
      </div>
    </div>

    <div class="user-cont" ref="usercont">
      <slot v-if="activeTab=='tab1'">
        <div class="user-list" v-for="(item,index)  in list" :key="index">
        <div v-if="status == 1" @click="deatil(item.id)" class="tteme">
          
            <div class='left-text ellipsis'>{{index + 1}}、{{item.typeName}}:{{item.riverNames}}</div>
          </div>
          <div v-if="item.status == 2" @click="deatil(item.id)" class="tteme">
            <div class='left-text ellipsis'>{{index + 1}}、{{item.type}}:{{item.meetingName}}</div>
            <div class="right-btn" v-if="item.participation == null">待回复</div>
            <div class="right-btn" v-if="item.participation == true">参加</div>
            <div class="right-btn" v-if="item.participation == false">请假</div>
          </div>
          <div v-else-if="item.status == 3" @click="jiyao(item.meetingId)" class="tteme">
            <div class='left-text ellipsis'>{{index + 1}}、{{item.type}}:{{item.meetingName}}</div>
            <div class="right-btn" v-if="item.participation == null">待回复</div>
            <div class="right-btn" v-if="item.participation == true">参加</div>
            <div class="right-btn" v-if="item.participation == false">请假</div>
          </div>
        </div>
      </slot>

      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" :loadingText="loadingText"
                          class="iscrolldd"/>
    </div>
    <mu-drawer class="news-alert" right :open="open">

      <div class="alert-head ">
        <span class="alert-left" @click="open=false">返回</span>
        <span class="alert-title">会议详情</span>
        <span class="alert-right" style="margin-right: 20px" @click="showtip"
              v-if="datas.participation == null &&  status !=1">提交</span>
        <span class="alert-right" style="margin-right: 20px" @click="showtip"
              v-else="datas.participation != null &&  status !=1"></span>
      </div>
      <div class="news-content" id="newsContent">
        <div class="mt15">主题：{{datas.theme}}</div>
        <div class="mt15">时间：{{new Date(datas.datetime).toLocaleString('chinese', {hour12: false})}}</div>
        <div class="mt15">地点：{{datas.site}}</div>
        <div class="mt15">人员：{{datas.peopleRemark}}</div>

        <div class="mt15" v-if="datas.type == 1">模式：会议</div>
        <div class="mt15" v-if="datas.type == 2">模式：巡河</div>
        <div class="mt15" v-if="datas.type == 3">模式：会议+巡河</div>
        <div class="mt15">内容：{{datas.content}}</div>
        <div v-if="datas.participation == null && status !=1">
          <div class="" >
            <a href="javascript:;" :class="[  button3 ? activeclass : cl]" @click="btnclick(1)">参加</a>
            <a href="javascript:;" :class="[ button4 ? activeclass : cl]" @click="btnclick(2)">请假</a>
          </div>

          <div class="mt15" v-show="button4">请假原因：</div>
          <textarea class="ttsx"  placeholder="请输入请假原因。" v-show="button4" v-model="textjia"></textarea>
        </div>
        <div v-else-if='datas.participation != null'>
          <div>
            <a href="javascript:;" :class="[  datas.participation == true ? activeclass : cl]">参加</a>
            <a href="javascript:;" :class="[ datas.participation == false ? activeclass : cl]">请假</a>
            <div v-show="datas.participation == false">
              <div class="mt15">请假原因：</div>
              <textarea class="ttsx" v-model="datas.reason" disabled></textarea>
            </div>

          </div>
        </div>
        <div style="margin-top:20px">【备注：详细公务活动时间、地点以正式通知为准】</div>
      </div>
    </mu-drawer>

    <mu-drawer class="news-alert" right :open="openjiyao">

      <div class="alert-head ">
        <span class="alert-left" @click="openjiyao=false">返回</span>
        <span class="alert-title" style="margin-left: -20px">会议纪要</span>
        <span class="alert-right" style="margin-right: 20px" @click="showtip"></span>
      </div>
      <div class="meetNam">{{meetingName}}</div>
      <div class="news-content" id="meetjiyao" ref="meetjiyao">

      </div>
    </mu-drawer>
    <mu-dialog :open="confirem" title="提示">
      {{tips}}
      <mu-flat-button slot="actions" primary label="取消" @click="close"/>
      <mu-flat-button slot="actions" @click="commit" primary label="确定"/>
    </mu-dialog>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  import Divider from "../../../node_modules/vux/src/components/divider/index.vue";
  export default {

    components: {Divider},
    data() {
      return {
        textjia: '',
        meetingName: '',
        datas: {
          theme: '',
          datetime: '',
          site: '',
          peopleRemark: '',
          type: '',
          content: '',
          reason: '',
          participation: ''

        },
        loadingText: '正在加载中...',
        tips: '请确定是否提交',
        scroller: "",
        loading: false,
        activeTab: 'tab1',
        open: false,
        openjiyao: false,
        activeclass: 'active btn-n borright',

        cl: 'btn-n borright',
        open: false,
        button1:'true',
        button: '',
        button3: '',
        button4: '',
        buttontwo: '',
        confirem: false,
        status: '1',
        page: 0,
        size: 15,
        list: [],
        noticeId: ''

      }
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
      showtip() {
        this.confirem = true
      },
      close() {
        this.confirem = false
      },
      deatil(id) {
        this.loadingText = "正在加载中..."
        this.open = true;
        this.noticeId = id;
        if(this.status == 1){
          this.$http.get(GET_MEET_DETEAL2 + id ).then(res => {
            if (res.body.code == 200) {
              console.log(res.body.data.content)
              this.datas = res.body.data
            }
          })
        }else{
          this.$http.get(GET_MEET_DETEAL + id + '/details').then(res => {
            if (res.body.code == 200) {
              console.log(res.body.data.content)
              this.datas = res.body.data
            }
          })
        }
      },
      jiyao(id) {
        this.loadingText = "正在加载中..."
        this.openjiyao = true;
        this.$http.get(GET_MEERING_JIYAO + "?meetingId=" + id).then(reponse => {
          if (reponse.body.code == 200) {
            let data = reponse.body.data;
            this.$refs.meetjiyao.innerHTML = ""
            this.$refs.meetjiyao.innerHTML = data.content;
            this.meetingName = reponse.body.data.meetingName
          }
        })

      },
      backToMap() {
        if (this.open) {
          this.open = false
        } else if (this.openjiyao) {
          this.openjiyao = false
        } else {
          this.setMapShow(true);
          this.$router.push("/home");
        }
      },
      torecord() {
        this.$router.push("/home/meetingriver");
      },
      tofaqi() {
        this.$router.push("/home/faqimeet");
      },
      getMeete() {
        let params = {
          status: this.status,
          page: this.page,
          size: this.size,
          userId: this.getUserId
        }
        this.$http.get(GET_MEETING_LIST, {params: params}).then(res => {
          let ress = res.body.data.content;

          if (res.body.data.last && ress.length == 0) {
            this.loading = true;
            this.loadingText = '没有更多数据'
            return false;
          }
          for (let i in ress) {
            this.list.push(ress[i]);
          }
          this.loading = false;
          })
        
        
      },
      one(){
          let params = {
            userId:this.getUserId,
            page: this.page,
            size: this.size
          }
          console.log(params);
          this.$http.get(GET_MEETING_LISTTWO, {params: params}).then(res => {
            let ress = res.body.data.content;

            if (res.body.data.last && ress.length == 0) {
              this.loading = true;
              this.loadingText = '没有更多数据'
              return false;
            }
            for (let i in ress) {
              this.list.push(ress[i]);
            }
            this.loading = false;
          })
        },
      btnclick(btn) {
        if (btn == 1) {
          this.button3 = true;
          this.button4 = false;
          this.participation = true;
          this.textjia = ""
        } else {
          this.button4 = true;
          this.button3 = false;
          this.participation = false;
        }
      },
      handleTabChange(val, btn) {

        if (btn == 2) {
          this.button = true;
          this.buttontwo = false
          this.button1 = false
          this.status = btn;

        } else if (btn == 3)  {
          this.buttontwo = true;
          this.button = false;
          this.button1 = false
          this.status = btn;
        }else if(btn == 1){
          this.status = btn;
          this.button1 = true
          this.button = false
          this.buttontwo = false
          this.list =[]
          let params = {
            userId:this.getUserId,
            page: this.page,
            size: this.size
          }
          console.log(params);
          this.$http.get(GET_MEETING_LISTTWO, {params: params}).then(res => {
            let ress = res.body.data.content;

            if (res.body.data.last && ress.length == 0) {
              this.loading = true;
              this.loadingText = '没有更多数据'
              return false;
            }
            for (let i in ress) {
              this.list.push(ress[i]);
            }
            this.loading = false;
          })
          return false
        }
        this.activeTab = val;
        
        this.page = 0;
        this.loading = false;
        this.loadingText = '正在加载中...'

        this.list = []
        let params = {
          status: this.status,
          page: 0,
          size: this.size,
          userId: this.getUserId
        }
        this.$http.get(GET_MEETING_LIST, {params: params}).then(res => {
          let ress = res.body.data.content;
          for (let i in ress) {
            this.list.push(ress[i]);
          }
        })
      },
      loadMore() {
        this.loading = true;
        this.page += 1;
        if(this.status ==1){
          this.one();
        }else{
          this.getMeete();
        }
        
      },
      commit() {
        let params = {
          participation: this.participation,
          reason: this.textjia
        }
        this.$http.patch(POST_HUIDAMEETING + this.noticeId, params).then(res => {
          if (res.body.code == 200) {
            this.tips = "提交成功"
            this.confirem = false;
            this.open = false;
            this.handleTabChange('tab1', 2)
          }

        }).catch((err) => {
          if (err.body.code == 400) {
            this.tips = err.body.msg
          }
          console.log(err)
        });
      }
    },
    mounted() {
      this.one()
      this.scroller = this.$refs.usercont
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style lang="less" scoped>
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
    z-index: 76;
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

  .news-alert {
    width: 100%;
    z-index: 80;
  }

  .tteme {
    width: 100%;
  }

  .news-content {
    padding: 0 6%;

  .mt15 {
    margin-top: 20px;
  }

  }

  .news-content .btn-n {
    margin-top: 15px;
    width: 25%;
    display: inline-block;
    border: 1px solid #ccc;
    color: #000;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  #meetjiyao {
    position: absolute;
    top: 96px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  }

  .news-content textarea {
    margin-top: 15px;
    height: 100px;
    border: 1px solid #DADADA;
    background: #fff;
    color: #888;
    margin-bottom: 16px;
    margin-right: 6px;
    outline: 0 none;
    padding: 3px 3px 3px 5px;
    width: 100%;
    font-size: 14px;
    line-height: 15px;
    box-shadow: inset 0px 1px 4px #ECECEC;
    -moz-box-shadow: inset 0px 1px 4px #ECECEC;
    -webkit-box-shadow: inset 0px 1px 4px #ECECEC;
  }

  .news-content .active {
    background-color: #54A4D7;
    border: 1px solid #54A4D7;
    color: #fff;
  }

  .raised-button {
    margin-top: 15px;
  }

  .left-text {
    float: left;
    width: 70%;
    height: 55px;
    overflow: hidden;
    line-height: 55px;
  }

  .user-cont .mu-infinite-scroll {
    padding-bottom: 0;
  }

  .right-btn {
    margin-top: 7px;
    width: 22%;
    float: right;
    text-align: center;
    background: #5bc0de;
    color: #fff;
    border-radius: 10px;
    padding: 10px 0;
  }

  .nothin {
    height: 1px;
  }

  .a-normal {
    color: #6a6e7b;
  }

  .usermess {
    width: 92%;
    margin: 0 auto;
  }

  .usermess p {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .cass .btns-wrap {
    margin-top: 68px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }

  .margintop .bor-tom-none {
    border: none;
    margin-top: 20px
  }

  .news-btns {
    display: flex;
    width: 94%;
    margin: 0 auto;
    border: 1px solid #54A4D7;
    border-radius: 2px;
  }

  .meetNam {
    position: absolute;
    top: 56px;
    left: 0;
    text-align: center;
    right: 0;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
  }

  .btn-n {
    width: 50%;
    font-size: 14px;
    text-align: center;
    padding: 5px 0;
    color: #54A4D7;
  }

  .active {
    background-color: #54A4D7;
    color: #fff;
  }

  .user-cont {
    width: 100%;
    overflow-y: auto;
    width: 100%;
    overflow-y: auto;
    position: absolute;
    top: 116px;
    bottom: 0;
    z-index: 80;
    background: #fff;
  }

  .margintop {
    margin-top: 56px;
  }

  .mess-detail {
    width: 92%;
    margin: 0 auto;
    margin-top: 55px;
    overflow-y: auto;
  }

  .user-list {
    display: flex;
    width: 94%;
    margin: 0 auto;
    color: #6a6e7b;
    font-size: 14px;
    height: 55px;
    border-bottom: 1px solid #efefef;
    align-items: center;
    justify-content: space-between;
  }

  .seclet-status {
    width: 94%;
    margin: 0 auto;
  }

  .status-bt {
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    background-color: #2196f3;
  }

  .done {
    background-color: #5cb85c;
  }

  .doing {
    background-color: #54A4D7;
  }

  .wating {
    background-color: #5bc0de;
  }

  .hidden {
    visibility: hidden;
    margin-right: 15px;
  }

  .demo-bt {
    border: 1px solid #ccc;
  }

  .dialog-title {
    padding-top: 10px;
    text-align: center;
  }

  .dialog-btn {
    display: flex;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
  }
</style>
