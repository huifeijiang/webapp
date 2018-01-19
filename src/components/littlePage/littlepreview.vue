<template>
    <div>
        <mu-drawer id="wushui" right :open="openyulan">
            <div class="alert-head">
                <span class="alert-left" @click="backToMap">返回</span>
                <span class="alert-title">预览</span>
                <span class="alert-right hidden">提交</span>
            </div>
            <div class="nothin"></div>
            <div class="table-list-wrap" ref="tableWrap">
                <div class="table-list" v-for="item in tableData">
                    <span class="biao-left">{{item.name}}</span>
                    <span class="biao-right">{{item.value}}</span>
                </div>
                <a href="javascript:;" class="submit-btn" @click="show">提交表单</a>
            </div>
        </mu-drawer>

        <!-- <mu-dialog :open="confirem" title="提示">
            请确认是否提交？
            <mu-flat-button slot="actions" @click="close()" primary label="取消" />
            <mu-flat-button slot="actions" @click="submit()" primary label="确定" />
        </mu-dialog> -->
        <alert-sheet    v-model="confirem"
                        width="260px"
                        @confirm="submit()"
                        @cancel="close()"
                        title="确定提交表单吗？"
                        cancelable
        ></alert-sheet>

        <mu-dialog :open="submitDialog" title="提示">
            {{submitMess}}
            <mu-flat-button label="确定" slot="actions" primary @click="submitDialog = false" />
        </mu-dialog>
    </div>
</template>

<script>
import { eventBus } from '../eventBus/eventBus';
import alertSheet from '../../UIcomponents/alert/alert.vue';
export default {
    data() {
        return {
            eventList: [],
            tableData: [],
            showHead: true,
            confirem:false,
            submitDialog:false,
            submitMess:'',
            dataTemp:[]
        }
    },
    props: ['openyulan'],
    components:{
        alertSheet
    },
    methods: {
        backToMap() {
            this.$parent.openperive = false
        },
        submit() {
            this.$http.post(POST_WATER_DATA, this.dataTemp).then((res) => {
                if (res.body.code == 200) {
                this.confirem = false
                this.submitDialog = true;
                this.submitMess = "提交成功";
                 this.$router.push("/home/littleEvent");
            }
            }).catch((err) => {
                this.submitDialog = true;
                this.submitMess = err.body.msg
            });
        },
        close() {
            this.confirem = false
        },
        show() {
            this.confirem = true
        },
    },
    mounted() {
        eventBus.bus.on(eventBus.LIRRLEYULAN, (data) => {
            this.dataTemp = data;
            let obj = data;
            let arr = [];
            for (let param in obj) {
                let dt = {};
                switch (param) {
                    case 'enterpriseName':
                        dt.name = '单位名称';
                        dt.value = obj[param];
                        break;
                    case 'enterpriseAddr':
                        dt.name = '单位地址';
                        dt.value = obj[param];
                        break;
                    case 'enterpriseLicense':
                        dt.name = '营业执照';
                        dt.value = obj[param];
                        break;
                    case 'legalPersonName':
                        dt.name = '法人代表';
                        dt.value = obj[param];
                        break;
                    case 'legalPersonTel':
                        dt.name = '法人代表联系电话';
                        dt.value = obj[param];
                        break;
                    case 'enterpriseContactsName':
                        dt.name = '企业联系人';
                        dt.value = obj[param];
                        break;
                    case 'enterpriseContactsTel':
                        dt.name = '企业联系人电话';
                        dt.value = obj[param];
                        break;

                    case 'approvalNo':
                        dt.name = '环保批文';
                        dt.value = obj[param];
                        break;
                    case 'isProduceWastewater':
                        dt.name = '生产废水';
                        dt.value = obj[param] ? '有' : '无';
                        break;
                    case 'productResulInPolutionname':
                        dt.name = '可能产生废水的产品类别';
                        dt.value = obj[param];
                        break;
                    case 'techResultInPolutionname':
                        dt.name = '可能产生废水的主要生产工艺';
                        dt.value = obj[param];
                        break;
                    case 'isOutWastewater':
                        dt.name = '废水直排';
                        dt.value = obj[param] ? '有' : '无';
                        break;
                    case 'isWastewaterFacility':
                        dt.name = '废水处理设施';
                        dt.value = obj[param] ? '有' : '无';
                        break;
                    case 'describe':
                        dt.name = '情况说明';
                        dt.value = obj[param];
                        break;
                    case 'isLawEnforcement':
                        dt.name = '是否需要执法整治';
                        dt.value = obj[param] ? '是' : '否';
                        break;
                    case 'gridname':
                        dt.name = '社区网格';
                        dt.value = obj[param];
                        break;

                    default:
                        dt = null;
                        break;
                }
                if (dt != null) arr.push(dt);
            }
            this.tableData = arr;
        })
    },

}
</script>

<style scoped>
#wushui {
    width: 100%;
    background-color: #fff;
    z-index: 80;
}
.hidden {
    visibility: hidden;
}
.alert-head {
    /*position: fixed;*/
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 50;
    background-color: #4BAAF4;
    box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
    color: #fff;
}

.alert-left {
    margin-left: 20px;
}

.alert-right {
    margin-right: 20px;
}

.alert-title {
    font-size: 20px;
}

.hidden {
    visibility: hidden;
}

.onthin {
    height: 1px;
}

.event-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    border-bottom: 1px solid #efefef;
}

.event-wrap {
    width: 100%;
    overflow-y: auto;
}

.event-list {
    width: 100%;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #efefef;
}

.event-list span {
    width: 25%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
}

.table-list-wrap {
    position: absolute;
    left: 4%;
    top: 56px;
    right: 4%;
    bottom: 0;
    overflow: auto;
}

.table-title {
    font-size: 16px;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    font-weight: bold;
}

.table-list {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
}

.table-list span {
    font-size: 14px;
    color: #6a6e7b;
}

.biao-left {
    width: 49%;
    text-align: left;
}

.biao-right {
    width: 49%;
    text-align: right;
}
.submit-btn {
    display: block;
    width: 218px;
    height: 42px;
    line-height: 42px;
    margin: 20px auto;
    text-align: center;
    font-size: 18px;
    color: #fff;
    border-radius: 20px;
    background-color: #4BAAF4;
    box-shadow: 0px 4px 7px 0px #C9E1F3;
}
</style>
