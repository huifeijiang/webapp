<template>
  <div class="fuzzy">
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left" />
      <span class="alert-title">企业查询</span>
    </div>
    <div class='search-body'>
      <div class="search-style">
        <input type="text" v-model ="paramItem.name"  placeholder="请输入企业名称..." @keyup='getSearchList'>
        <i class="material-icons searchIcon">search</i>
      </div>
      <div class="search-content" ref='scrollerbody'>
        <mu-list
          v-for="(item,index) in result"
          :key="index"
          :value='item.id'
          class="search-list"
          :class = '{active:item.active}'
          @click.native='toReportForm(item)'
          >{{item.enterpriseName}}</mu-list>
      </div>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText='加载中...'/>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {routeCodeTool} from '../CodeRouteTool';
  export default{
        data(){
            return {
              result:[],
              paramItem:{
                  name:'',
                  page:0,
                  size:100
                },
              loading:false,
              scroller:null,
            }
        },
        mounted(){
          this.scroller = this.$refs['scrollerbody'];
        },
        computed: {
          ...mapGetters({
            getCode: 'getCode',
          })
        },
        methods: {
          ...mapActions({
            setMapShow: 'setMapShow',
          }),
          //获取搜索后的列表
          getSearchList(){
            this.$refs['scrollerbody'].scrollTop = 0;
             this.$http.get(GET_FUZZY_SEARCH, {params:this.paramItem}).then(res => {
                 if(res.body.code == 200) {
                   let data = res.body.data.content;
                   for(let item of data){
                       item.active = false
                   }
                   this.result = data;

                 }
             }).catch(err => {})
          },
          //点击列表项进入表单上报
          toReportForm(item){
              for(let key of this.result){
                  key.active =false
              }
              item.active = true
              let   backroute = this.$route.params.backroute;
              let   toRoutefuzzy = this.$route.params.toRoutefuzzy;
              let   routename = ''
              if(toRoutefuzzy){
                routename = toRoutefuzzy
              }else {
                routename = backroute
              }
             this.$router.push({name:routename,params:{id:item.id}})
          },
          //上拉加载更多
          loadMore () {
            this.loading = true;
            this.paramItem.page += 1;
            this.$http.get(GET_FUZZY_SEARCH, {params:this.paramItem}).then(res => {
              if (res.body.code == 200) {
                this.loading = false
                let data = res.body.data.content;
                if (res.body.data.last && data.length == 0) {
                  this.loading = false;
                  return;
                }
                this.result = res.body.data.content;
              }
            }).catch(err => {
              console.log(err)
            })
          },
          //返回键
          backToMap(){
            this.setMapShow(true);
            this.$router.push({name:'home',params:{name:true}});
          },
        }
    }
</script>
<style scoped>
  .fuzzy{
    width: 100%;
    height: 100%;
    position:relative;
    top:0;
    z-index:80;
    background-color: #fff;
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
  .alert-title {
    font-size: 18px;
  }
  .search-body{
    padding-top:66px;
    text-align:center;
    width:100%;
    height:100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .search-style{
    position:fixed;
    width:100%;
    z-index:81;
    top:56px;
    background:#fff;
    padding:8px 5px 0;
  }
  .search-style input{
    display: block;
    width: 100%;
    height:40px;
    color: #000;
    box-sizing: border-box;
    border: 1px solid #eceff9;
    border-radius:4px;
    outline: none;
    background: url("../../../static/images/ic-search.png") no-repeat 10px center,15px 15px;
    caret-color: #a8acbc;
    padding-left:9%;
    box-sizing: border-box;
  }
  .searchIcon{
    position:absolute;
    left: 13px;
    top:50%;
    margin-top:-8px;
  }
  .search-content{
    margin:53px 5px 0;
    border-radius:4px;
  }
  .search-list{
    text-align:left;
    padding:10px 10px;
    color:#333;
    border-top:1px solid #eee;
    border-left:1px solid #eee;
    border-right:1px solid #eee;
  }
  .active{
    background:rgb(75, 170, 244);
    color:#fff;
  }
</style>
