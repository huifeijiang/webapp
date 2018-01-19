<template>
  <div class="food_container">
    <div class="alert-head">
      <span class="alert-left" @click="backToMap">返回</span>
      <span class="alert-title">会议/巡河统计</span>
      <span class="alert-right"></span>
    </div>
   
  
    <section class="shop_list_container" ref="shop_list_container">
      <mu-table ref="table" :fixedHeader="fixedHeader" :showCheckbox="false" >
        <mu-thead slot="header">
          <mu-tr>
            <mu-th class="width-30">河流</mu-th>
            <mu-th class="width-30 over-hidden">召开总数</mu-th>
            <mu-th class="width-30 over-hidden">本月召开数</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(item,index) in list" :key="index" :class="item.currentTotal == 0 ? 'red':item.currentTotal == 1?'yellow':item.currentTotal >=2 ?'blue':''">
                  <mu-td class="width-30 over-hidden">{{item.riverName}}</mu-td>
                  <mu-td class="width-30 over-hidden">{{item.total}}</mu-td>
                  <mu-td class="width-30 over-hidden">{{item.currentTotal}}</mu-td>
          </mu-tr>

        </mu-tbody>
      </mu-table>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" :loadingText="loadingText"/>
    </section>

  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {eventBus} from '../eventBus/eventBus';
  import { dateTool } from '../../gisComponets/tool/DateTool.js'
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
      ...mapActions({
        setMapShow: 'setMapShow',
      }),
     
      backToMap() {
        this.setMapShow(true);
        this.$router.push("/home");
      },
      getOwn(){
        var date=new Date();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        if(month == 12){
          var nextmonth = '01';
          var nextyear = year +1
        }else{
          
          var nextmonth = month +1 
          console.log(nextmonth<10)
          if(nextmonth<10){
            nextmonth = '0'+nextmonth 
          }
        }
        let params = {
          startTime:year+'-'+(date.getMonth() + 1)+'-01'+ ' 00:00:00',
          endTime:nextyear+'-'+(nextmonth)+'-01'+ ' 00:00:00',
          userId:this.getUserId,
          
        }
        console.log(params);
        this.$http.get(GET_HUIYITONGJI, {params: params}).then(res => {
          this.list = res.data.data;
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
  .red{
    background:red;
  }
  .yellow{
    background:#ffff00
  }
  .blue{
    background:#9900ff
  }
  .shop_list_container {
    position: absolute;
    top: 56px;
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
