<template>
    <div>
        <div class="top-tip">{{title}}</div>
        <div class="list-conn">
            <div class="li-list f_clear">
                <div class="name-le f_le">全体河长</div>
                <div class="num-ri f_ri">{{total}}</div>
            </div>
            <div class="li-list f_clear">
                <div class="name-le f_le">1、区级河长</div>
                <div class="num-ri f_ri">{{districtRiver}}</div>
            </div>

            <div class="li-list f_clear">

                <div class="name-le f_le">2、区级副河长</div>
                <div class="num-ri f_ri">{{districtDeputyRiver}}</div>
            </div>
            <div class="li-list f_clear">
                <div class="name-le f_le">3、街道级河长</div>
                <div class="num-ri f_ri">{{streetRiver}}</div>
            </div>
            <div class="li-list f_clear">
                <div class="name-le f_le">4、街道级副河长</div>
                <div class="num-ri f_ri">{{streetDeputyRiver}}</div>
            </div>
            <div class="li-list f_clear">
                <div class="name-le f_le">5、其他河长</div>
                <div class="num-ri f_ri">{{other}}</div>
            </div>
        </div>
    </div>
</template>
<script type='es6'>
import {eventBus} from '../eventBus/eventBus.js'
export default {
    data() {
        return {
            total : null, //全部
            districtRiver :null, //区级河长
            districtDeputyRiver :null, //区级副河长
            streetRiver :null, //街道级河长
            streetDeputyRiver :null, //街道级副河长，
            other: null //其他河长
        }
    },
    props: [
        'title',
        'id'
    ],
    methods: {

        getshajing(startTime, endTime) {
             this.$http.get(GET_HEZHANG_TONGJI + "?startTime=" + startTime + '&endTime=' + endTime ).then(res => {
                let ress = res.body.data;
                this.total = ress.total;
                this.districtRiver = ress.districtRiver;
                this.districtDeputyRiver = ress.districtDeputyRiver;
                this.streetRiver = ress.streetRiver;
                this.streetDeputyRiver = ress.streetDeputyRiver;
                this.other = ress.other;

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
    mounted(){
        let Nowdate = new Date();
            let StartTime = this.format(Nowdate);
            this.startTime = StartTime;

            this.NowTime = StartTime.split(" ")[0];
            let enddate = new Date(Nowdate.getTime() + 24 * 60 * 60 * 1000);
            let EndTime = this.format(enddate);

            this.endTime = EndTime;
            this.getshajing(this.startTime,this.endTime)
            eventBus.bus.on(eventBus.TONGJISHUJU, (start, end) => {
                this.getshajing(start,end);
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
  }

  .ims {
    width: 10px;
    float: right;
    margin: 7px 14px;
  }
</style>
