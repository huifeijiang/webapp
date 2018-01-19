<template>
  <div class="food_container">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">我发起的会议/巡河</span>
      <span class="alert-right"></span>
    </div>
    <section class="sort_container">

      <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'sort'}">发起类型</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'sort'" class="sort_detail_type">
            <ul class="sort_list_container" @click="sorttype($event)">
              <li class="sort_list_li">
                <p data="1" :class="{sort_select: type == 1}">
                  <span>会议</span>
                  <svg v-if="type == 0">

                  </svg>
                </p>
              </li>
              <li class="sort_list_li">

                <p data="2" :class="{sort_select: type == 2}">
                  <span>巡河</span>
                  <svg v-if="type == 5">

                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <p data="3" :class="{sort_select: type == 3}">
                  <span>会议+巡河</span>
                </p>
              </li>

            </ul>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
        <div class="sort_item_container" @click="chooseType('activity')">
          <span :class="{category_title: sortBy == 'activity'}">会议阶段</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li">
                <p data="1" :class="{sort_select: sortByType == 1}">
                  <span>待通知</span>
                </p>
              </li>
              <li class="sort_list_li">
                <p data="2" :class="{sort_select: sortByType == 2}">
                  <span>待开会</span>
                </p>
              </li>
              <li class="sort_list_li">
                <p data="3" :class="{sort_select: sortByType == 3}">
                  <span>已开会</span>
                </p>
              </li>
              <li class="sort_list_li">
                <p data="4" :class="{sort_select: sortByType == 4}">
                  <span>已督办</span>
                </p>
              </li>
            </ul>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="shop_list_container" ref="shop_list_container">
      <mu-table ref="table" :fixedHeader="fixedHeader" :showCheckbox="false" >
        <mu-thead slot="header">
          <mu-tr>
            <mu-th class="width-20">序号</mu-th>
            <mu-th class="width-50 over-hidden">类型</mu-th>
            <mu-th class="width-30 over-hidden">河流</mu-th>
            <mu-th class="width-30 over-hidden">阶段</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(item,index) in list" :key="index">

                  <mu-td class="width-20 over-hidden">{{index + 1}}</mu-td>
                  <mu-td class="width-50 over-hidden">{{item.typeName}}</mu-td>
                  <mu-td
                    class="width-30 over-hidden">{{item.riverNames}}</mu-td>
                  <mu-td class="width-30 over-hidden">{{item.statusName}}</mu-td>
          </mu-tr>

        </mu-tbody>
      </mu-table>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" :loadingText="loadingText"/>
    </section>

  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  export default {
    data() {
      return {
        page:0,
        size:15,
        loadingText: '正在加载...',
        scroller: '',
        loading: false,
        sortBy: '', // 筛选的条件
        sortByType: null, // 根据何种方式排序
        type:null,
        fixedHeader: true,
        height: '',
        list:[]
      }
    },


    components: {},
    computed:{
      ...mapGetters({
        getUserId:'getUserId'
      })
    },
    methods: {

      async chooseType(type) {
        if (this.sortBy !== type) {
          this.sortBy = type;
          //food选项中头部标题发生改变，需要特殊处理

        } else {
          //再次点击相同选项时收回列表
          this.sortBy = '';
          if (type == 'food') {
            //将foodTitle 和 headTitle 进行同步
            this.foodTitle = this.headTitle;
          }
        }
      },
      //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
      sortList(event) {
        this.sortByType = event.target.getAttribute('data');
        console.log(this.sortByType)
        this.sortBy = '';
        this.list = [];
        this.page = 0;
        this.loading = false;
        this.loadingText = '正在加载...'
        this.getOwn();

      },
      sorttype(event){
          this.type = event.target.getAttribute('data');
          console.log(this.type)
          this.sortBy = '';
          this.list = [];
          this.page = 0;
          this.loading = false;
          this.loadingText = '正在加载...'
          this.getOwn();
      },
      backToMap() {
        this.$router.push("/home/meetindex");
      },
      getOwn(){
        let params = {
          type:this.type,
          userId:this.getUserId,
          status: this.sortByType,
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
      loadMore() {
        this.loading = true
        this.page ++;
        this.getOwn();
      },

    },
    mounted() {
      this.getOwn();
      this.scroller = this.$refs.shop_list_container
      document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    },
    destroyed() {
      document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
    }
  }

</script>

<style lang="less" scoped>

  .shop_list_container {
    position: absolute;
    top: 97px;
    z-index: 72;
    background: #fff;
    bottom: 0;
    overflow: auto;
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
  .food_container {
    padding-top: 3.6rem;
    /*.alert-head {*/
      /*position: fixed;*/
      /*z-index: 80*/
    /*}*/
  }

  .sort_container {
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    position: fixed;
    top: 56px;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 75;
    box-sizing: border-box;
    .sort_item {
      color: #444;
      width: 50%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      .sort_item_container {
        width: 100%;
        height: 100;
        position: relative;
        z-index: 14;
        background-color: #fff;
        box-sizing: border-box;
        .sort_item_border {
          height: 40px;
          border-right: 0.025rem solid #f1f1f1;
        }
      }
      .sort_icon {
        vertical-align: middle;
        transition: all .3s;
        fill: #666;
      }

    }
  }
  
    .choose_type {
      .sort_item_container {

        .category_title {
          color: #3190e8;
        }
        .sort_icon {
          transform: rotate(180deg);
          fill: #3190e8;
        }
      }
    }
    .showlist-enter-active, .showlist-leave-active {
      transition: all .3s;
      transform: translateY(0);
    }
    .showlist-enter, .showlist-leave-active {
      opacity: 0;
      transform: translateY(-100%);
    }
    .sort_detail_type {
      width: 100%;
      position: absolute;
      display: flex;
      left: 0;
      border-top: 0.025rem solid #f1f1f1;
      background-color: #fff;
    }
    .category_container {
      .category_left {
        flex: 1;
        background-color: #f1f1f1;
        height: 16rem;
        overflow-y: auto;
        span {
          line-height: 1.8rem;
        }
        .category_left_li {
          .category_icon {
            vertical-align: middle;
          }
          .category_count {
            background-color: #f1f1f1;
            padding: 0 .1rem;
            border: 0.025rem solid #f1f1f1;
            border-radius: 0.8rem;
            vertical-align: middle;
            margin-right: 0.25rem;
          }
          .category_arrow {
            vertical-align: middle;
          }
        }
        .category_active {
          background-color: #fff;
        }
      }
      .category_right {
        flex: 1;
        background-color: #fff;
        padding-left: 0.5rem;
        height: 16rem;
        overflow-y: auto;
        .category_right_li {
          height: 1.8rem;
          line-height: 1.8rem;
          padding-right: 0.5rem;
          border-bottom: 0.025rem solid #f1f1f1;
          span {
            color: #666;
          }
        }
        .category_right_choosed {
          span {
            color: #3190e8;
          }
        }
      }
    }
    .sort_list_container {
      width: 100%;
      padding: 0;
      margin: 0;
      text-indent: 20px;
      .sort_list_li {
        height: 40px;
        display: flex;
        align-items: center;
        svg {
          margin: 0 .3rem 0 .8rem;
        }
        p {
          line-height: 40px;
          flex: auto;
          text-align: left;
          border-bottom: 0.025rem solid #f1f1f1;
          align-items: center;
          span {
            color: #666;
          }
        }
        .sort_select {
          span {
            color: #3190e8;
          }
        }
      }
    }
    .filter_container {
      flex-direction: column;
      align-items: flex-start;
      background-color: #fff;

      .filter_ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.5rem;
        background-color: #fff;
        .filter_li {



          .activity_svg {
            margin-right: .25rem;
          }
          .selected_filter {
            color: #3190e8;
          }
        }
      }

  }

  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }

  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }

  .back_cover {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 73;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .over-hidden{
    overflow: hidden;
  }
</style>
