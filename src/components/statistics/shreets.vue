<template>
    <div>
      <div class="top-tip" @click="showa">{{title}}
        <img src="static/images/ic-go.png" :class="show?'tran90 ims':'ims'"/>
      </div>
      <div class="list-conn" v-show="show">
      <div class="li-list f_clear">
        <div class="name-le f_le">巡查企业数</div>
        <div class="num-ri f_ri">{{totla}}</div>
      </div>
      <div class="li-list f_clear">
        <div class="name-le f_le">发现问题企业数</div>
        <div class="num-ri f_ri">{{problem}}</div>
      </div>

      <div class="li-list f_clear">
        <div class="name-le f_le">开展执法企业数</div>
        <div class="num-ri f_ri">{{finish}}</div>
      </div>
      <div class="li-list f_clear">
        <div class="name-le f_le">未发现违法行为</div>
        <div class="num-ri f_ri">{{normal}}</div>
      </div>
      <div class="li-list f_clear">
        <div class="name-le f_le">限期整改</div>
        <div class="num-ri f_ri">{{handling}}</div>
      </div>
      <div class="li-list f_clear">
        <div class="name-le f_le">立案查处</div>
        <div class="num-ri f_ri">{{investigation}}</div>
      </div>
      <div class="ma10">
        <div class="li-list f_clear">
          <div class="name-le f_le">立案查处-责令改正违法行为</div>
          <div class="num-ri f_ri">{{correct}}</div>
        </div>
        <div class="li-list f_clear">
          <div class="name-le f_le">立案查处-查封扣押</div>
          <div class="num-ri f_ri">{{sealed}}</div>
        </div>
        <div class="li-list f_clear">
          <div class="name-le f_le">立案查处-移交行政拘留</div>
          <div class="num-ri f_ri">{{detention}}</div>
        </div>
        <div class="li-list f_clear">
          <div class="name-le f_le">立案查处-涉嫌环境犯罪</div>
          <div class="num-ri f_ri">{{illegal}}</div>
        </div>
      </div>

    </div>
    </div>
</template>

<script>
  import {
    eventBus
  } from '../eventBus/eventBus.js'
  export default {
    data() {
      return {
        totla: null, //巡查企业数
        pendding: null, //累计未开展执法企业数
        finish: null, //开展执法企业数
        problem: null, //发现问题企业数
        investigation: null, //立案查处
        normal: null, //无违法违规行为
        handling: null, //限期更改
        correct: null, //责令改正决定书
        sealed: null, //查封/扣押
        detention: null, //移交行政拘留
        illegal: null, //涉嫌环境违法
      }
    },
    props: [
      'title',
      'id',
      'show'
    ],
    methods: {
      showa(){
        this.$emit('showown');
      },
      getshajingTongji(startTime, endTime) {
        this.$http.get(GET_STATICS_NUM + "?startTime=" + startTime + '&endTime=' + endTime + '&streetId=' + this.id).then(res => {
          let ress = res.body.data;
//                    console.log(ress, "ddddd")
          this.totla = ress.totla;
          //this.pendding = ress.pendding;
          this.finish = ress.finish;
          this.problem = ress.problem;

        }).catch((err) => {
          console.log(err)
        });
      },
      getshajing(startTime, endTime) {
        this.$http.get(GET_EVENT_MEAN + "?startTime=" + startTime + '&endTime=' + endTime + '&streetId=' + this.id).then(res => {
          let ress = res.body.data[0];
          this.investigation = ress.investigation; //立案查处
          this.normal = ress.normal; //无违法违规行为
          this.handling = ress.handling; //限期更改
          this.correct = ress.correct; //责令改正决定书
          this.sealed = ress.sealed; //查封/扣押
          this.detention = ress.detention; //移交行政拘留
          this.illegal = ress.illegal; //涉嫌环境违法

        }).catch((err) => {
          console.log(err)
        });
      },
      format(datetime) {
        let startTime = '';
        let year = datetime.getFullYear();
        let month = datetime.getMonth() + 1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        let date = datetime.getDate();
        if (date >= 0 && date <= 9) {
          date = "0" + date;
        }
        return year + '-' + month + '-' + date + " 00:00:00"
      },

    },
    mounted() {
      let Nowdate = new Date();
      let StartTime = this.format(Nowdate);
      this.startTime = StartTime;

      this.NowTime = StartTime.split(" ")[0];
      let enddate = new Date(Nowdate.getTime() + 24 * 60 * 60 * 1000);
      let EndTime = this.format(enddate);

      this.endTime = EndTime;
      this.getshajing(this.startTime, this.endTime)
      this.getshajingTongji(this.startTime, this.endTime);
      eventBus.bus.on(eventBus.TONGJISHUJU, (start, end) => {
        this.getshajing(start, end);
        this.getshajingTongji(start, end);
      })
    }
  }
</script>

<style lang="less" scoped>

  .ma10 .li-list {
    padding-left: 10px
  }
  .top-tip {
    height: 40px;
    line-height: 40px;
    background: #fff;
    color: #000;
    text-indent: 10px;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
    color: #666666;
    padding-left:5px;
  }

  .num-ri {
    margin-right: 20px
  }

  /*.time .mu-text-field-hint {*/
    /*left: 10px*/
  /*}*/

  /*.time .mu-text-field {*/
    /*min-height: auto;*/
    /*margin-bottom: -10px;*/
  /*}*/

  /*.time .mu-text-field-input {*/
    /*text-align: center*/
  /*}*/

  .letime input {
    text-align: right;
    width: 100%;
  }

  .get-week span {
    display: inline-block;
    width: 35px;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
    border: 1px solid #4BAAF4;
    font-size: 14px;
    color: #4BAAF4;
    text-align: center;
  }

  .street-sel span {
    font-size: 16px;
    color: #767985;
  }

  .street-list span {
    font-size: 16px;
    color: #5A5E6F;
  }

  .street-list img {
    width: 22.5px;
  }

  .street-list .sel-l {
    color: #4BAAF4;
  }

  .li-list {
    border-bottom: 1px solid #ccc;
    height: 42px;
    line-height: 42px;
    background: #fff;
    color: #767985;
    text-indent: 10px;
    font-size: 15px;
    padding-left:5px;
  }

  .ims {
    width: 10px;
    float: right;
    margin: 7px 14px;
  }
</style>
