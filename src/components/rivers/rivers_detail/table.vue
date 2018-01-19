<template>
    <div>
        <mu-table :fixedHeader="fixedHeader" :showCheckbox="false" :height="height" @rowClick="sendItem">
            <mu-thead slot="header" ref="tbhead">
                <mu-tr v-if="isFive">
                    <mu-th>人员</mu-th>
                    <mu-th>岗位</mu-th>
                    <mu-th>巡查区域</mu-th>
                    <mu-th>定位</mu-th>
                </mu-tr>
                <mu-tr v-else>
                    <mu-th>姓名</mu-th>
                    <mu-th>类型</mu-th>
                    <mu-th>时间</mu-th>
                    <mu-th>地区</mu-th>
                </mu-tr>
            </mu-thead>
            <mu-tbody>
                <slot v-if="isFive">
                    <mu-tr v-for="(item,index) in data" :key="index+'on'">
                        <mu-td><a :href="'tel:'+item.tel">{{item.name}}</a></mu-td>
                        <mu-td>{{item.roleName}}</mu-td>
                        <mu-td>{{item.gridName}}</mu-td>
                        <!--<mu-td>轨迹</mu-td>-->
                        <mu-td>
                            <mu-icon value="location_on" color="blue"/>
                        </mu-td>
                    </mu-tr>
                </slot>
                <slot v-else>
                    <mu-tr v-for="(item,index) in data" :key="index+'on'">
                        <mu-td>{{item.userName}}</mu-td>
                        <mu-td class="hideText">{{item.eventTypeName}}</mu-td>
                        <mu-td>{{item.datetime.replace('2017-', '')}}</mu-td>
                        <mu-td>{{item.gridName}}</mu-td>
                    </mu-tr>
                </slot>
            </mu-tbody>
        </mu-table>
        <event-detail :open="open" :stepData="dataTemp" @closeDetail="closeDrawer"></event-detail>
    </div>
</template>
<script>
    import eventDetail from '../../eventReport/eventDetail.vue';

    export default {
        components: {
            eventDetail,
        },
        data() {
            return {
                height: '485px',
                fixedHeader: true,
                open: false,
                dataTemp:''
            }
        },
        props: ['data', 'isFive', 'getItem', 'arcGis', 'noRowClick'],
        methods: {
            sendItem() {
                if(this.$props.noRowClick === true) return;
                let that = this;
                this.open = !this.open;
                let id = arguments[0];
                let url = GET_EVENT_DETAIL + this.data[id].id;
                this.$http.get(url).then(function (response) {
                    that.dataTemp = response.body.data;
                });
            },
            closeDrawer() {
                this.open = !this.open;
            },
        },
        mounted() {
            let height = window.innerHeight;
            this.height = (height - 152 + 'px').toString();
        }
    }
</script>
<style scoped>
    td.hideText {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .walker-wrap {
        padding: 15px;
    }

    .mu-td a {
        color: rgba(0, 0, 0, .87);
    }

    .mu-th, .mu-th {
        padding-right: 0;
        padding-left: 0;
        text-align: center;
        height: 40px;
    }

    .mu-tr {
        height: 40px;
    }
</style>
