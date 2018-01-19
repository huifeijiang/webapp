<template>
    <div class="xuncharen">
        <div class="gate-head">
            <mu-icon class="alert-left" @click="backToMap" value="keyboard_arrow_left"/>
            <span>人员统计</span>
            <span class="hidden">隐藏</span>
        </div>
        <div class="hei50"></div>
        <!--河长人员-->
            <street-template :list="hezhang" type="0" @getRange="getMasterRange" @getPeople="getMasterPeople"></street-template>
        <!--end-->

        <!--环管员-->
            <street-template :list="huanguanyuan" type="8"></street-template>
        <!--end-->

        <!--执法-->
            <street-template :list="zhifayuan" type="9"></street-template>
        <!--end-->

        <!--段管员-->
            <people-template :list="duanguanyuan"></people-template>
        <!--end-->

        <!--其他-->
            <people-template :list="other"></people-template>
        <!--end-->

    </div>
</template>

<script>
    import bindScrollAction from '../scrollPlugin/scrollPlugin.js';
    import peopleTemplate from './peopleTemplate.vue';
    import streetTemplate from './streetTemplate.vue';
    import { mapActions } from 'vuex';
    import { eventBus } from  '../eventBus/eventBus.js';
    export default {
        components: {
            peopleTemplate,
            streetTemplate
        },
        data() {
            return {
                onLine: {},
                total: '',
                list: [],
                hezhang: [],
                huanguanyuan: [],
                duanguanyuan: [],
                zhifayuan: [],
                other: [],
                masterRangeMap: {
                    '1': '区级河长',
                    '2': '街道级河长',
                    '3': '河务专员',
                    '4': '河务联络员'
                }
            }
        },
        created() {
            //获取 人数
            this.loadPeopleCount();
        },
        methods: {
            ...mapActions({
                setMapShow: 'setMapShow'
            }),
            toggle(item, index) {
                item.showChild = !item.showChild;
            },
            loadMore(dom) {
                if(dom.scrollHeight == 0) return;
            },
            loadDuanguanyuan() {
                this.$http.get(GET_PEOPLE_DUANGUANYUAN).then((res) => {
                    let duanguanyuan = res.body.data;
                    this.$set(this.duanguanyuan[0], 'list', duanguanyuan.content);
                }).catch({})
            },
            loadOther() {
                this.$http.get(GET_PEOPLE_QITA).then((res) => {
                    let qita = res.body.data;
                    this.$set(this.other[0], 'list', qita.content);
                }).catch({})
            },
            getMasterRange(item) {
                var that = this;
                this.$http.get(GET_PEOPLE_FENLEI).then((res) => {
                    let content = res.body.data;
                    let arr = [];
                    for(let i=0; i<content.length; i++) {
                        arr.push({
                            name: that.masterRangeMap[content[i].level],
                            level: content[i].level,
                            count:'今日上线:'+content[i].online,
                            show: false,
                            list: []
                        });
                    }
                    this.$set(item, 'list', arr);
                }).catch({})
            },
            getMasterPeople(item) {
                if(item.list.length != 0) {
                    return;
                }
                this.$http.get(GET_PEOPLE_FENLEI_DE + '?level=' + item.level).then((res) => {
                    let data = res.body.data.content;
                    let arr = [];
                    for(let i=0; i<data.length; i++) {
                        arr.push({
                            name: data[i].name,
                            tel:  data[i].tel,
                            roleName: data[i].roleName,
                            status: data[i].onlinestatus,
                        })
                    }

                    this.$set(item, 'list', arr);
                }).catch({})
            },
            loadPeopleCount() {
                let riverMaster  = [];
                let bp           = [];
                let huanguanyuan = [];
                let zhifayuan    = [];
                let other        = [];
                this.$http.get(GET_PEOPLE_SHULIANG).then( res => {
                    let data = res.body.data.data;
                    riverMaster.push({
                        name: '河长',
                        count: '今日上线:'+data.riverManager.online,
                        show: false,
                        list: []
                    });
                    huanguanyuan.push({
                        name: '环管员',
                        count: '今日上线:'+data.patroler.online,
                        show: false,
                        list: []
                    });
                    zhifayuan.push({
                        name: '执法员',
                        count: '今日上线:'+data.handler.online,
                        show: false,
                        list: []
                    });
                    bp.push({
                        name: '段管员',
                        count: '今日上线:'+data.bp.online,
                        show: false,
                        list: []
                    });
                    other.push({
                        name: '其他',
                        count: '今日上线:'+data.other.online,
                        show: false,
                        list: []
                    });
                    this.duanguanyuan = bp;
                    this.hezhang      = riverMaster;
                    this.huanguanyuan = huanguanyuan;
                    this.zhifayuan    = zhifayuan;
                    this.other        = other;
                    //load具体人数
                    this.loadDuanguanyuan();
                    this.loadOther();
                }).catch( err => {})
            },
            backToMap(e) {
                if (e) {
                    e.preventDefault();
                }
                this.setMapShow(false);
                this.$router.push("/home/eventGate");
            }
        },
        mounted() {
            document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
        },
        destroyed() {
            document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
        }
    }
</script>

<style scoped>
    .xuncharen {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 90;
        width: 100%;
        height: 100%;
    }
    .gate-head {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4BAAF4;
        box-shadow: 0 2px 4px 0px rgba(142,180,211, .5);
        color: #fff;
        z-index: 10;
    }
    .alert-left{
      position:absolute;
      left:15px;
    }
    .gate-head span {
        font-size: 16px;
        font-weight: bold;
    }
    .gate-head .hidden {
        visibility: hidden;
    }
    .hei50 {
        height: 56px;
    }
</style>
