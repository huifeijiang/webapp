<template>
  <div class="uwrap">
    <div class="user-head" @click="toUserPage">
      <img :src="getHead" class="user-img">
      <div class="user-mess">
        <p class="u1">{{getUserName}}</p>
        <p class="u2">{{getJueSe}}</p>
      </div>
      <img src="static/v2images/ic-back.png" class="user-go">
    </div>
    <p class="duban-title">任务督办列表</p>

    <div class="duban-wrap" ref="duban">
      <div class="list" v-for="(item, index) in userList">
        <div :class="getClass(item.status)">{{item.status}}</div>
        <span class="list-name">{{item.name}}</span>
        <img src="static/v2images/xunban.png" @click="showDetail(item,index)">
      </div>
    </div>

    <mu-dialog :open="open" dialogClass="udialog">
      <div class="dialog-title">
        操作
      </div>
      <div class="dialog-con">
        <span class="wat" @click="setStatus('待办')">待办</span>
        <span @click="setStatus('完成')">完成</span>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import {roleClass, roleMap} from '../roleClass/roleClass.js';
  import {eventBus} from '../eventBus/eventBus';
  export default {
    data(){
      return {
        imgsrc: "static/v2images/touxiang.png",
        activeTab: 'tab1',
        open: false,
        version: APP_VERSION,
        userList: [
          {name: '堤防--墙基', status: '待办'},
          {name: '堤防--砌石墙体', status: '待办'},
          {name: '堤防--混凝土墙体', status: '待办'},
          {name: '堤防--墙体伸缩缝', status: '待办'},
          {name: '堤防--泄水孔', status: '待办'},
          {name: '堤防--排水管道', status: '待办'},
          {name: '堤防--导渗设施', status: '待办'},
          {name: '堤防--周边环境', status: '待办'},
          {name: '土质边坡--坡顶', status: '待办'},
          {name: '土质边坡--坡身', status: '待办'},
          {name: '土质边坡--坡脚', status: '待办'},
          {name: '土质边坡--周边环境', status: '待办'},
          {name: '河床', status: '待办'},
          {name: '绿化景观', status: '待办'},
          {name: '附属设施', status: '待办'},
          {name: '四害消杀及白蚁防治', status: '待办'}

        ],
        tableItems: ['姓名', '性别', '角色', '负责流域'],
        userMessage: {
          name: '张明星',
          sex: '男',
          role: '河管员',
          charge: []
        },
        nowItem: {
          name: ''
        },
        nowItemIndex: 0
      }
    },
    created(){
      let code = this.getCode;
      if (code.some((val) => {
          return val == 'HEZHANG'
        }) ||
      code.some((val) => {
        return val == 'NXC_EVENTLIST'
      }
    )
    )
      {
        return;
      }
    else
      {
        this.$router.replace('/home/userset');
      }
    },
    computed: {
      ...mapGetters({
        getHead: 'getHead',
        getUserName: 'getUserName',
        getRole: 'getRole',
        getTel: 'getTel',
        getNormalStatus: 'getNormalStatus',
        getCode: 'getCode',
        getJueSe: 'getJueSe'
      })
    },
    methods: {
      ...mapActions({
        setNormalStatus: 'setNormalStatus',
        setToken: 'setToken'
      }),
      handleTabChange (val) {
        if (val != this.activeTab) {
          if (this.activeTab != 'tab1') this.$refs[this.activeTab].className = 'btn-n';
          else this.$refs[this.activeTab].className = 'btn-n borright';
          this.$refs[val].className = 'btn-n active';
          this.activeTab = val;
        }
      },
      getClass(str){
        if (str == '完成') {
          return 'status-bt done';
        } else if (str == '督办中') {
          return 'status-bt doing';
        } else {
          return 'status-bt wating';
        }
      },
      showDetail(item, index){
        this.open = true;
        this.nowItem = item;
        this.nowItemIndex = index;
      },
      btClass(str){
        if (str == this.nowItem.status) {
          if (str == '完成') {
            return 'demo-bt done';
          } else if (str == '督办中') {
            return 'demo-bt doing';
          } else {
            return 'demo-bt wating';
          }
        } else {
          return 'demo-bt';
        }
      },
      btPrimary(str){
        if (str == this.nowItem.status) {
          return true;
        } else {
          return false;
        }
      },
      setStatus(str){
        this.open = false;
        this.userList[this.nowItemIndex].status = str;
      },
      setCheck(val){
        this.setNormalStatus(val)
      },
      //退出登录
      LoginOut(){
        this.$router.push('/');
        //将Token设置为null
        this.setToken(null);
      },
      //修改密码
      ModifyPassword(){
        this.$router.push('/home/ModifyPassword');
      },
      backToMap() {
        this.$router.push("/home/user");
      },
      toUserPage(){
        this.$router.push('/home/userset')
      },
      getRoleName1() {
        let getCode = this.getCode;
        if (getCode.indexOf('HEZHANG') > -1) {
          this.roleName = '河长';
        } else if (getCode.indexOf('HC_ZHIFA') > -1) {
          this.roleName = '河长';
        } else if (getCode.indexOf('YY_EVENTLIST') > -1) {
          this.roleName = '油烟巡查员';
        }
        else if (getCode.indexOf('CAT_REPORT') > -1) {
          this.roleName = '环水巡查网格员';
        }
        else if (getCode.indexOf('HC_ZHIFA') > -1) {
          this.roleName = '环水执法网格员';
        }
        else {
          this.roleName = '整治员';
        }
      }
    },
    mounted(){
//            console.log(this.getHead)
      let that = this;
      let height = window.innerHeight;

      if (this.getCode.some((val) => {return val == 'HEZHANG'}))
      {
        this.userList = [
          {name: '建立部门协作联动机制', status: '待办'},
          {name: '建立河长工作会议制度', status: '待办'},
          {name: '建立河长定期巡查制度', status: '待办'},
          {name: '建立流域统筹协调机制', status: '待办'},
          {name: '建立日常督查督办机制', status: '待办'},
          {name: '建立信息共享互动机制', status: '待办'}
        ];
      }
    else
      {
        this.$refs.duban.style.bottom = 86 + 'px';
      }

      //获取角色信息
      (function () {
        let url = GET_USER_INFO + '?accessToken=' + that.$store.state.login.accessToken;
        that.$http.get(url).then(function (response) {
          if(response.body.code == 200){
            let data = response.body.data;
            if (data.length > 0 ) {
              let chargeList = data[0].gridName;
              that.userMessage.charge.push(chargeList);
            }
          }
        });
      })();
      //监听返回按钮
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }
</script>

<style scoped>
  .uwrap {
  }

  .user-head {
    display: flex;
    padding: 21px 0;
    background-color: #4BAAF4;
    align-items: center;
  }

  .user-img {
    width: 82px;
    margin-left: 15px;
    height: 82px;
    border-radius: 50%;
  }

  .user-mess {
    flex-grow: 1;
    margin-left: 12px;
  }

  .user-mess .u1 {
    color: #fff;
    font-size: 20px;
  }

  .user-mess .u2 {
    color: #fff;
    font-size: 14px;
  }

  .user-go {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    margin-right: 15px;
  }

  .duban-title {
    width: 100%;
    padding: 4px 15px;
    box-sizing: border-box;
    font-size: 12px;
    color: #ACB0BF;
  }

  .duban-wrap {
    position: absolute;
    z-index: 90;
    top: 150px;
    bottom: 56px;
    /* width: 92%; */
    left: 0;
    /* margin-left: -46%; */
    padding: 0 5px;
    overflow: auto;
    right: 0;
    background: #fff;
  }

  .duban-wrap .list {
    width: 100%;
    display: flex;
    padding: 15px 11px;
    margin-bottom: 9px;
    align-items: center;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ECEFF9;
    background-color: #fff;
  }

  .list-name {
    flex-grow: 1;
    font-size: 16px;
    color: #626676;
    margin-left: 8px;
  }

  .list img {
    width: 35px;
  }

  .status-bt {
    display: inline-block;
    padding: 2px 3px;
    font-size: 10px;
    color: #4FCFBC;
    border-radius: 2px;
  }

  .done {
    color: #4FCFBC;
    border: 1px solid #4FCFBC;
  }

  .wating {
    color: #FFB400;
    border: 1px solid #FFB400;
  }

  .dialog {
    background-color: #ccc;
    padding: 0;
  }

  .dialog-title {
    display: block;
    width: 100%;
    padding: 20px 0;
    font-size: 18px;
    color: #5A5E6F;
    text-align: center;
    border-bottom: 1px solid #ECEFF9;
  }

  .dialog-con {
    width: 100%;
  }

  .dialog-con span {
    width: 50%;
    padding: 9px 0;
    float: left;
    text-align: center;
    font-size: 16px;
    color: #4FCFBC;
    border-left: 1px solid #ECEFF9;
    box-sizing: border-box;
  }

  .dialog-con .wat {
    color: #FFB400;
    border-left: none;
  }
</style>
