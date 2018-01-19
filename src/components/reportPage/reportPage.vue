<template>
  <div class='report'>
    <div class="report-page">
      <div class="notany"></div>
      <!--日常巡查-->
      <div class="richang" v-powerCode="{code:'RICHANG_REPORT'}">
        <p class="zhuan-xiang">日常巡查</p>
        <div class="ri-box-wrap">
          <div class="ri-box" v-for="item in ri" :class="item.class" @click="jumpHard(item)">
            <a href="javascript:;">
              <img :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--专项巡查(区)-->
      <div class="report-page-ul" v-powerCode="{code:'XSXC_REPORT'}">
        <p class="zhuan-xiang" v-powerCode="{code:'XSXC_REPORT'}">专项巡查(区)</p>
        <div class="ri-box-wrap">
          <div class="ri-box" v-for="item in events" :class="item.class" @click="jumpRoute(item)"
               v-powerCode="item.powerCode">
            <a href="javascript:;">
              <img :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--专项巡查（市）-->
      <div class="richang" v-powerCode="{code:'RICHANG_REPORT'}">
        <p class="zhuan-xiang">专项巡查(市)</p>
        <div class="ri-box-wrap ri3">
          <div class="ri-box" v-for="item in shi" :class="item.class" @click="jumpShi(item)">
            <a href="javascript:;">
              <img :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--企业巡查-->
      <div class="qiye" v-powerCode="{code:'QY_SHANGBAO'}">
        <div class="ri-box-wrap ri4">
          <div class="ri-box" v-for="item in qiye" :class="item.class" @click="jumpQiye(item)">
            <a href="javascript:;">
              <img :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
      </div>
      <!--执法端巡查-->
      <div class="report-page-ul qiye2" v-powerCode="{code:'HC_ZX_ZHIFA'}">
        <div class="ri-box-wrap ri5">
          <div class="ri-box" v-for="item in events" :class="item.class" @click="jumpRouteZF(item)"
               v-powerCode="item.powerCode">
            <a href="javascript:;">
              <img :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--end-->
      <div class="close-page">
        <img src="static/v2images/ic-close-x.png" @click="closePage">
      </div>
    </div>
    <mu-dialog :open="show" title='填报方式' dialogClass='huanbaodialog' ref='huanbaodialog'>
      <img src='../../../static/v2images/ic-close-x.png' @click='closeDialog'></img>
      <div class='base-div' @click="toggle(item)" v-for='item in threeWay' :key='item.type'
           :class='{active:item.active}'>{{item.title}}
      </div>
    </mu-dialog>
  </div>
</template>

<script>

  import {routeCodeTool} from '../CodeRouteTool';
  import {mapActions} from 'vuex';
  export default {
    props: {
      showSpace: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        isShow: false,
        isShowchoice: false,
        eventRoute: '',
        powerCodes: '',
        routeName: '',
        events: [
          {
            icon: 'static/v2images/ic-xiaosan.png',
            name: '小散乱污',
            class: 'move-in',
            powerCode: {code: 'XSXC_REPORT'},
            draftName: 'littlePage',
            router: '/home/littlePage'
          },
          // {icon:'static/v2images/ic-xiaosan.png',name:'一般巡查',class:'move-in',powerCode:{code:'NXC_REPORT'}},
          {icon: 'static/v2images/ic-youyan.png', name: '油烟上报', class: 'move-in', powerCode: {code: 'YY_REPORT'}},
          {
            icon: 'static/v2images/ic-qcxl.png',
            name: '汽修上报',
            class: 'move-in',
            powerCode: {code: 'CAR_REPORT'},
            draftName: 'careevent',
            router: '/home/carshangbao'
          },
          {
            icon: 'static/v2images/ic-cy.png',
            name: '餐饮上报',
            class: 'move-in',
            powerCode: {code: 'CAT_REPORT'},
            draftName: 'cateringevent',
            router: '/home/cateringshangbao'
          },
//					{icon:'static/v2images/ic-cy.png',name:'疑似违法记录上报',class:'move-in',powerCode:{code:'CAT_REPORT'}, router:'/home/wurenji'},
          // {icon:'static/v2images/ic-cy.png',name:'日常巡查',class:'move-in',powerCode:{code:'RICHANG_REPORT'}},
          {
            icon: 'static/v2images/ic-rcxc.png',
            name: '日常执法',
            class: 'move-in',
            powerCode: {code: 'HC_RC_ZHIFA'},
            router: '/home/hchandleEvent'
          },
          {
            icon: 'static/v2images/ic-zxcx.png',
            name: '专项执法',
            class: 'move-in',
            powerCode: {code: 'HC_ZX_ZHIFA'},
            router: '/home/handleEvent'
          },
          {
            icon: 'static/v2images/ic-xiaosan.png',
            name: '整治执法',
            class: 'move-in',
            powerCode: {code: 'HC_HZ_ZHIFA'},
            router: '/home/portal/regulationList'
          },
          {
            icon: 'static/v2images/ic-zxcx.png',
            name: '专项执法（市）',
            class: 'move-in',
            powerCode: {code: 'HC_ZX_ZHIFA'},
            router: '/home/zhifaList'
          },

        ],
        shievent: [
          {
            icon: 'static/v2images/ic-rcxc.png',
            name: '在管工业执法',
            class: 'move-in',
            powerCode: {code: 'HC_RC_ZHIFA'},
            router: '/home/zaiguanzhifa'
          },
          {
            icon: 'static/v2images/ic-zxcx.png',
            name: '专项执法',
            class: 'move-in',
            powerCode: {code: 'HC_ZX_ZHIFA'},
            router: '/home/handleEvent'
          },
          {
            icon: 'static/v2images/ic-xiaosan.png',
            name: '整治执法',
            class: 'move-in',
            powerCode: {code: 'HC_HZ_ZHIFA'},
            router: '/home/portal/regulationList'
          },
        ],
        qiye: [
          {
            icon: 'static/v2images/ic-qysb.png',
            name: '企业上报',
            class: 'move-in',
            powerCode: {code: 'QY_SHANGBAO'},
            router: '/home/qiyeReport'
          },
          {
            icon: 'static/v2images/ic-qysb.png',
            name: '今日上报',
            class: 'move-in',
            powerCode: {code: 'QY_SHANGBAO'},
            router: null
          }
        ],
        ri: [{
          icon: 'static/v2images/ic-mr.png',
          name: '每日一巡',
          class: 'move-in',
          row: 'one'
        }, {
          icon: 'static/v2images/ic-mz.png',
          name: '每周一巡',
          class: 'move-in',
          row: 'two'
        }, {
          icon: 'static/v2images/ic-my.png',
          name: '每月一巡',
          class: 'move-in',
          row: 'thr'
        }, {
          icon: 'static/v2images/ic-mj.png',
          name: '每季一巡',
          class: 'move-in',
          row: 'fou'
        }],
        shi: [{
          icon: 'static/v2images/ic-cy.png',
          name: '在管企业',
          class: 'move-in',
          router: '/home/zaiguanqiye',
          draftName: 'zaiguanqiyelist'
        }, {
          icon: 'static/v2images/ic-cy.png',
          name: '小废水企业',
          class: 'move-in',
          router: '/home/xiaofeishuiCompany',
          draftName: 'xiaofeishuiCompanyList'
        }, {
          icon: 'static/v2images/ic-cy.png',
          name: '小散乱污',
          class: 'move-in',
          router: '/home/shilittlePage',
          draftName: 'shilittlePage'
        }],
        show:false,
        threeWay: [
          {
            title: '新表单填报',
            type: 1,
            active: false,
          },
          {
            title: '历史填报导入',
            type: 2,
            active: false,
          },
          {
            title: '进入草稿列表',
            type: 3,
            active: false,
          },
        ]
      }
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow'
      }),
      closePage(){
        this.setClass('move-out');
        setTimeout(() => {
          this.$emit('close');
          this.setClass('move-in');
          this.setMapShow(true);
        }, 0);
      },
      setClass(cls){
        for (let i = 0; i < this.events.length; i++) {
          this.events[i].class = cls;
        }
      },
      //弹窗选择出发对应的函数
      toggle(item){
        for (let key of this.threeWay) {
          key.active = false;
        }
        item.active = true;
        if (item.type == 1) this.reportEvent();item.active = false;
        if (item.type == 2) this.searchCom();item.active = false;
        if (item.type == 3) this.draftReportEvent();item.active = false;
      },
      //关闭弹窗
      closeDialog(){
        this.show = false;
        return;
      },
      //专项巡查(区)
      jumpRoute(item){
        this.show = true
        this.eventRoute = item.router;
        this.routeName = item.draftName;
      },
      //专项巡查(市)
      jumpShi(item) {
        this.show = true
        this.eventRoute = item.router;
        this.routeName = item.draftName;
      },
      //日常巡查
      jumpHard(item) {
        this.$emit('close');
        this.$router.push({name: 'hcStatistic', params: {row: item.row}});
      },
      //企业巡查
      jumpQiye(item){
        this.$emit('close');
        this.$router.push(item.router);
      },
      jumpRouteZF(item){
        this.$emit('close');
        this.$router.push(item.router);
      },
      //直接上报
      reportEvent(){
        this.show = false
        localStorage.removeItem('searchId')
        this.$emit('close');
        this.$router.push(this.eventRoute)
      },
      //历史填报
      searchCom(){
        this.show = false
        this.$emit('close');
        let eventroute = this.eventRoute.split('/')[2];
        this.$router.push({name: 'fuzzySearch', params: {toRoutefuzzy: eventroute}})
      },
      //草稿列表
      draftReportEvent(){
        this.show = false
        this.$emit('close');
        let eventroute = this.eventRoute.split('/')[2];
        this.$router.push({name: 'draftList', params: {toRoute: eventroute, routeName: this.routeName}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .report-page {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 99;
    overflow: hidden;
  }

  .report {
    width: 100%;
    height: 100%;
  }
  .huanbaodialog img{
    position:absolute;
    left:50%;
    bottom:-43px;
    margin-left:-12px;
  }
  .base-div {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #efefef;
  }
  .base-div.active {
    color:#fff;
    background-color: #4baaf4;
  }
  .qiye {
    margin-top: 200px;
    position: relative;
  }

  .notany {
    height: 1px;
  }

  .zhuan-xiang {
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .ri-box-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    list-style: none;

  .ri-box {
    width: 25%;
    height: auto;
    margin-bottom: 50px;
    opacity: 0;
    position: relative;

  a {
    display: block;
    width: 100%;
    height: auto;
    text-align: center;
  }

  img {
    display: block;
    margin: 0 auto 12px;
    width: 65px;
  }

  span {
    font-size: 16px;
    color: #5A5E6F;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis; /*文字隐藏后添加省略号*/
    white-space: nowrap;
  }

  }
  }
  .ri3 {

  .ri-box {
    width: 33%;
  }

  }
  .ri4 {

  .ri-box {
    width: 50%;
  }

  }
  .ri5 {

  .ri-box {
    width: 50%;
  }

  }
  .report-page-ul {
    width: 100%;

  .box-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    list-style: none;

  div {
    width: 33%;
    height: auto;
    margin-bottom: 20px;
    opacity: 0;

  a {
    display: block;
    width: 100%;
    height: auto;
    text-align: center;
  }

  img {
    display: block;
    margin: 0 auto 12px;;
    width: 65px;
  }

  span {
    font-size: 16px;
    color: #5A5E6F;
  }

  }
  }
  .shi-box-wrap {

  div {
    width: 50%;
  }

  }

  }
  .close-page {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 58px;
    box-shadow: 0px 0px 9px 0px rgba(200, 218, 232, 0.5);

  img {
    display: block;
    padding: 17px;
    margin: 0 auto;
  }

  }

  .qiye2 {
    margin-top: 150px;
  }

  .move-in {
    -webkit-animation: cd-move-in 0.4s ease 0.1s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.1s forwards;
    animation: cd-move-in 0.4s ease 0.1s forwards;

  &
  :nth-of-type(2) {
    -webkit-animation: cd-move-in 0.4s ease 0.2s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.2s forwards;
    animation: cd-move-in 0.4s ease 0.2s forwards;
  }

  &
  :nth-of-type(3) {
    -webkit-animation: cd-move-in 0.4s ease 0.3s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.3s forwards;
    animation: cd-move-in 0.4s ease 0.3s forwards;
  }

  &
  :nth-of-type(4) {
    -webkit-animation: cd-move-in 0.4s ease 0.4s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.4s forwards;
    animation: cd-move-in 0.4s ease 0.4s forwards;
  }

  &
  :nth-of-type(5) {
    -webkit-animation: cd-move-in 0.4s ease 0.5s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.5s forwards;
    animation: cd-move-in 0.4s ease 0.5s forwards;
  }

  &
  :nth-of-type(6) {
    -webkit-animation: cd-move-in 0.4s ease 0.6s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.6s forwards;
    animation: cd-move-in 0.4s ease 0.6s forwards;
  }

  &
  :nth-of-type(7) {
    -webkit-animation: cd-move-in 0.4s ease 0.7s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.7s forwards;
    animation: cd-move-in 0.4s ease 0.7s forwards;
  }

  &
  :nth-of-type(8) {
    -webkit-animation: cd-move-in 0.4s ease 0.8s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.8s forwards;
    animation: cd-move-in 0.4s ease 0.8s forwards;
  }

  &
  :nth-of-type(9) {
    -webkit-animation: cd-move-in 0.4s ease 0.9s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.9s forwards;
    animation: cd-move-in 0.4s ease 0.9s forwards;
  }

  }
  .move-out {
    opacity: 1;
    -webkit-animation: cd-move-out 0.4s ease 0.1s forwards;
    -moz-animation: cd-move-out 0.4s ease 0.1s forwards;
    animation: cd-move-out 0.4s ease 0.1s forwards;

  &
  :nth-of-type(2) {
    -webkit-animation: cd-move-out 0.4s ease 0.2s forwards;
    -moz-animation: cd-move-out 0.4s ease 0.2s forwards;
    animation: cd-move-out 0.4s ease 0.2s forwards;
  }

  &
  :nth-of-type(3) {
    -webkit-animation: cd-move-out 0.4s ease 0.3s forwards;
    -moz-animation: cd-move-out 0.4s ease 0.3s forwards;
    animation: cd-move-out 0.4s ease 0.3s forwards;
  }

  &
  :nth-of-type(4) {
    -webkit-animation: cd-move-out 0.4s ease 0.4s forwards;
    -moz-animation: cd-move-out 0.4s ease 0.4s forwards;
    animation: cd-move-out 0.4s ease 0.4s forwards;
  }

  &
  :nth-of-type(5) {
    -webkit-animation: cd-move-out 0.4s ease 0.3s forwards;
    -moz-animation: cd-move-out 0.4s ease 0.3s forwards;
    animation: cd-move-out 0.4s ease 0.3s forwards;
  }

  &
  :nth-of-type(6) {
    -webkit-animation: cd-move-in 0.4s ease 0.2s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.2s forwards;
    animation: cd-move-in 0.4s ease 0.2s forwards;
  }

  &
  :nth-of-type(7) {
    -webkit-animation: cd-move-in 0.4s ease 0.1s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.1s forwards;
    animation: cd-move-in 0.4s ease 0.1s forwards;
  }

  &
  :nth-of-type(8) {
    -webkit-animation: cd-move-in 0.4s ease 0.0s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.0s forwards;
    animation: cd-move-in 0.4s ease 0.0s forwards;
  }

  &
  :nth-of-type(9) {
    -webkit-animation: cd-move-in 0.4s ease 0.0s forwards;
    -moz-animation: cd-move-in 0.4s ease 0.0s forwards;
    animation: cd-move-in 0.4s ease 0.0s forwards;
  }

  }

  @-webkit-keyframes cd-move-in {
    0% {
      opacity: 1;
      -webkit-transform: translateY(100vh);
    }
    65% {
      -webkit-transform: translateY(-1.5vh);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0vh);
    }
  }

  @-moz-keyframes cd-move-in {
    0% {
      opacity: 1;
      -moz-transform: translateY(100vh);
    }
    65% {
      -moz-transform: translateY(-1.5vh);
    }
    100% {
      opacity: 1;
      -moz-transform: translateY(0vh);
    }
  }

  @keyframes cd-move-in {
    0% {
      opacity: 1;
      -webkit-transform: translateY(100vh);
      -moz-transform: translateY(100vh);
      -ms-transform: translateY(100vh);
      -o-transform: translateY(100vh);
      transform: translateY(100vh);
    }
    65% {
      -webkit-transform: translateY(-1.5vh);
      -moz-transform: translateY(-1.5vh);
      -ms-transform: translateY(-1.5vh);
      -o-transform: translateY(-1.5vh);
      transform: translateY(-1.5vh);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0vh);
      -moz-transform: translateY(0vh);
      -ms-transform: translateY(0vh);
      -o-transform: translateY(0vh);
      transform: translateY(0vh);
    }
  }

  @-webkit-keyframes cd-move-out {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0vh);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(100vh);
    }
  }

  @-moz-keyframes cd-move-out {
    0% {
      opacity: 1;
      -moz-transform: translateY(0vh);
    }
    100% {
      opacity: 0;
      -moz-transform: translateY(100vh);
    }
  }

  @keyframes cd-move-out {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0vh);
      -moz-transform: translateY(0vh);
      -ms-transform: translateY(0vh);
      -o-transform: translateY(0vh);
      transform: translateY(0vh);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(100vh);
      -moz-transform: translateY(100vh);
      -ms-transform: translateY(100vh);
      -o-transform: translateY(100vh);
      transform: translateY(100vh);
    }
  }
</style>
