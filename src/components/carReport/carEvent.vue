<template>
  <!-- 巡查事件 -->
  <div class='event'>
    <mu-row gutter class="walker-wrap"></mu-row>
    
    <section ref="table" :class="this.$route.params.isadmin ? 'posaa' :'posaaaposaaa'">
      <!--<mu-table :fixedHeader="fixedHeader" :showCheckbox="false" >
                <mu-thead slot="header">
                  <mu-tr>
                    <mu-th class="width-20">姓名</mu-th>
                    <mu-th class="width-50">等级</mu-th>
                    <mu-th class="width-30">时间</mu-th>
                    <mu-th class="width-30">地区</mu-th>
                  </mu-tr>
                </mu-thead>
                <mu-tbody>
                  <mu-tr v-for="(item,index) in wait.data" v-show="activeTab == 'tab1'" :key="index"
                         >
                        <span class="rewrite-row" @click="rowClick(item)">
                            <mu-td class="width-20 over-hidden">{{index + 1}}.{{item.reporterName}}</mu-td>
                            <mu-td class="width-50 over-hidden">{{item.level}}</mu-td>
                            <mu-td
                              class="width-30 over-hidden">{{new Date(item.created).toLocaleString('chinese', {hour12: false})}}</mu-td>
                            <mu-td class="width-30 over-hidden">{{item.gridName}}</mu-td>
                        </span>
                  </mu-tr>
                  <mu-tr v-for="(item,index) in finish.data" v-show="activeTab == 'tab2'" :key="index" @click="rowClick(item)">
                        <span class="rewrite-row">
                            <mu-td class="width-20">{{index + 1}}.{{key.reporterName}}</mu-td>
                            <mu-td class="width-50 over-hidden">{{key.level}}</mu-td>
                            <mu-td class="width-30">{{new Date(item.created).toLocaleString('chinese', {hour12: false})}}</mu-td>
                            <mu-td class="width-30">{{key.gridName}}</mu-td>
                        </span>
                  </mu-tr>
                </mu-tbody>
              </mu-table>
              -->
      <div class="watch-list" @click="eventStatusVmodel.show=true">
        <img class="icon-jian" src="static/v2images/status.png" />
        <span class="flex-grow">事件状态</span>
        <span class="no-flex-grow">{{eventStatusVmodel.selected}}</span>
        <img class="rig" src="static/images/ic-go.png" alt="">
      </div>
      <div class="event-result" @click="eventShuomin.show=false">
			<span class="lig">{{statusname}}:{{ totalElements}}</span>
			<!-- <img src="static/v2images/tipsw.png" alt="">
        <span class="rrig">事件等级:A、B、C、D、E</span> -->
		</div>
      
      <div class="list-wrap" ref="scroller">
        <div class="list-content">
          <div class="list" v-for="(item,index) in wait.data" @click="rowClick(item)">
            <div class="list-level" :style="getColor(item.level)">{{item.level=='无'?'':item.level}}</div>
            <div class="list-detail">
              <div class="detail-left">
                <p class="p1">{{item.username}}</p>
                <p class="p2">{{new Date(item.created).toLocaleString('chinese', {hour12: false})}}</p>
              </div>
              <span>{{item.gridName}}</span>
            </div>
          </div>
        </div>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
      </div>
    </section>
    <!--事件类型说明-->
    <alert-type v-model="eventShuomin">
      <div class="shuom-list" v-for="item in eventShuomin.list">
        <div class="list-level" :style="getColor(item.type)">{{item.type}}</div>
        <div>{{item.detail}}</div>
      </div>
    </alert-type>
    <!--end-->
    <simple-sheet v-model="eventStatusVmodel" @select="eventStatusCall"></simple-sheet>
    <cardeatil :open="open" :dataTemp="dataTemp" @closeDetail="closeDrawer" ref="deatil"></cardeatil>
  </div>
</template>
<script type='es6'>
  import cwTab from '../../UIcomponents/cwTab/cwTab.vue'
  import {getPosition} from '../corSys/position';
  import cardeatil from './cardeatil.vue';
  import dateTool from '../../gisComponets/tool/DateTool.js';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import simpleSheet from '../../UIcomponents/simpleSheet/simpleSheet.vue';
  import alertType from '../../UIcomponents/alertType/alertType.vue';
  export default {
    data() {
      return {
         eventShuomin: {
          show: false,
          title: '事件等级类型说明',
          list: [{
            type: 'A',
            detail: '生产废水且废水直排'
          }, {
            type: 'B',
            detail: '生产废水,没有废水直排,无环保批文'
          }, {
            type: 'C',
            detail: '生产废水,没有废水直排,无环保批文,无废水处理设施'
          }, {
            type: 'D',
            detail: '生产废水,没有废水直排,有环保批文,有废水处理设施'
          }, {
            type: 'E',
            detail: '无生产废水'
          }]
        },
        nodata:false,
        statusname: '全部',
        totalElements: '',
        loadingText: '正在加载中...',
        loading: false,
        scroller: '',
        open: false,
        activeTab: 'tab1',
        wait: {
          data: [],
          total: ""
        },
        finish: {
          data: "",
          total: ""
        },
        fixedHeader: true,
        height: '',
        total: '',
        dataTemp: {},
        page:0,
        eventStatusVmodel: {
          show: false,
          name: '事件状态',
          list: [{
              name: '上报事件',
              selected: true
            },
            {
              name: '核查事件',
              selected: false
            }
          ],
          selected: '全部'
        }
      }
    },
    components: {
      cwTab,
      cardeatil,
      simpleSheet,
      alertType
    },
    computed: {
      ...mapGetters({
        getUserId: 'getUserId'
      })
    },
    //props:['static','customHeight','type'],
    methods: {
      getColor(type) {
        if (type == 'A') {
          return {
            background: '#F36487'
          }
        } else if (type == 'B') {
          return {
            background: '#FFB400'
          }
        } else if (type == 'C') {
          return {
            background: '#4FCFBC'
          }
        } else if (type == 'D') {
          return { background : '#ba6bdf'}
        } else {
          return { background : '#64a5f3'}
        }
      },
      eventStatusCall(item) {
        this.wait.data = []
        this.statusname = item.name;
        switch (item.name) {
          case '上报事件':
            if (this.$route.params.isadmin) {
              const url1 = GET_CAR_LIST + '?size=50&page=0';
              this.getEventList(url1, this.wait);
            } else {
              const url1 = GET_CAR_LIST + '?size=50&userId=' + this.getUserId + '&page=' + this.page;
              this.getEventList(url1, this.wait);
            }
            break;
          case '核查事件':
            this.wait.data=[];
            this.totalElements = 0
            break;
        }
      },
      showBottomRange() {
        this.eventStatusVmodel.show = true;
      },
      handleTabChange(val) {
        this.loadingText = "正在加载中...";
        this.activeTab = val
      },
      rowClick(data) {
        this.open = true;
        let url = GET_CAR_DETAIL + "/v1/carRepairs/" + data.id + '/details';
        this.$http.get(url).then((res) => {
          this.dataTemp = res.body.data;
        });
      },
      closeDrawer() {
        this.open = !open;
      },
      backToMap() {
        this.$router.push("/home");
      },
      getEventList(url, list) {
        this.loadingText = "正在加载中...";
        this.$http.get(url).then(function (res) {
          let ress = res.body.data.content;
          //list.data = res.body.data.content;
          list.total = res.body.data.totalElements
          this.totalElements = res.body.data.totalElements
          if (res.body.data.last && ress.length == 0) {
            this.loading = false;
            this.nodata = true
            return;
          }
          for (let i in ress) {
            this.wait.data.push(ress[i]);
          }
          this.loading = false;
        })
      },
      loadMore() {
        this.loadingText = "正在加载中...";
        this.loading = true
        this.page  += 1
        if (this.$route.params.isadmin) {
          const url1 = GET_CAR_LIST + '?size=50&page='+this.page;
          this.getEventList(url1, this.wait);
        }else{
          const url1 = GET_CAR_LIST + '?size=50&userId=' + this.getUserId+'&page='+this.page;
          this.getEventList(url1, this.wait);
        }
      }
    },
    mounted() {
      this.scroller = this.$refs.scroller;
      console.log('this.$route.status--------------', this.$route.params.isadmin)
      if (this.$route.params.isadmin) {
          const url1 = GET_CAR_LIST +  '?size=50&page='+this.page;
          this.getEventList(url1, this.wait);
      }else{
        const url1 = GET_CAR_LIST + '?size=50&userId=' + this.getUserId+'&page='+this.page;
        this.getEventList(url1, this.wait);
      }
      


    }
  }
</script>
<style scoped>
  td.over-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span.rewrite-row {
    vertical-align: inherit;
    display: block;
    overflow: hidden;
  }

  .posaaaposaaa {
    position: absolute;
    top: 56px;
    left:0;
    right:0;
    bottom: 0;
    z-index: 73;
    background: #fff;
    overflow: auto;
  }
.posaa{
  position: absolute;
    top: 103px;
    left:0;
    right:0;
    bottom: 0;
    z-index: 73;
    background: #fff;
    overflow: auto;
}
  .zin74 {
    z-index: 74;
    position: fixed;
  }
  .list-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 80px;
    bottom: 0;
    overflow: auto;
  }
  
  .list {
    padding: 6px 0;
  }
  
  .list-level {
    float: left;
    width: 42px;
    height: 42px;
    margin: 0 14px;
    line-height: 42px;
    text-align: center;
    border-radius: 50%;
    font-size: 16px;
    color: #fff;
    background-color: #F36487;
  }
  
  .list-detail {
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 82%;
    height: 42px;
    padding-bottom: 5px;
    border-bottom: 1px solid #EDF0F9;
  }
  
  @media screen and (max-width: 375px) {
    .list-detail {
      width: 80%;
    }
  }
  
  @media screen and (max-width: 320px) {
    .list-detail {
      width: 78%;
    }
  }
  
  .list-detail .p1 {
    font-size: 16px;
    color: #5A5E6F;
  }
  
  .list-detail .p2 {
    font-size: 14px;
    color: #A8ACBC;
    margin-top: -5px;
  }
  
  .list-detail span {
    font-size: 15px;
    color: #626676;
    margin-right: 10px;
  }
  
  .list:after {
    content: '';
    display: block;
    clear: both;
  }
  .event-result {
	display: flex;
	padding: 4px 0;
	align-items: center;
	color: #ACB0BF;
	font-size: 12px;
	border-bottom: 1px solid #EDF0F9;
}
.event-result .lig {
	margin-left: 10px;
	flex-grow: 1;
}
.event-result img {
	width: 16px;
	margin-right: 5px;
}
.event-result .rrig {
	margin-right: 10px;
}
  .allshi {
    padding: 5px 0;
    font-size: 12px;
    text-indent: 12px;
    color: #A8ACBC;
  }
  
  .icon-jian {
    margin-left: 3%;
  }
  
  .flex-grow {
    flex-grow: 1;
  }
  
  .watch-list .rig {
    width: 9px;
    margin-right: 10px;
  }
  
  .watch-list {
    background: #fff;
    display: flex;
    padding: 14px 0;
    align-items: center;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
  }
  
  .watch-list span {
    font-size: 16px;
    color: #6a6e7b;
    margin-left: 5px;
    flex-grow: 1;
  }
  
  .watch-list .no-flex-grow {
    flex-grow: 0;
    margin-right: 10px;
  }

  .list-detail .p1 {
	font-size: 16px;
	color: #5A5E6F;
}
.list-detail .p2 {
	font-size: 14px;
	color: #A8ACBC;
	margin-top: -5px;
}
.list-detail span {
	font-size: 15px;
	color: #626676;
	margin-right: 10px;
}
.list:after {
	content: '';
	display: block;
	clear: both;
}
.news-alert {
	width: 100%;
	z-index: 80;
}
.shuom-list {
	display: flex;
	width: 92%;
	margin: 0 auto;
	align-items: center;
	padding: 10px 0; 
}
.list-detail {
	float: right;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 82%;
	height: 42px;
	padding-bottom: 5px;
	border-bottom: 1px solid #EDF0F9;
}
@media screen and (max-width: 375px){
	.list-detail {
		width: 80%;
	}
}
@media screen and (max-width: 320px){
	.list-detail {
		width: 78%;
	}
}
.list-level {
	float: left;
	width: 42px;
	height: 42px;
	min-width: 42px;
	margin: 0 14px;
	line-height: 42px;
	text-align: center;
	border-radius: 50%;
	font-size: 16px;
	color: #fff;
	background-color: #F36487;
}
</style>
